import * as fs from "fs-extra";
import * as path from "path";
import { EventEmitter } from "events";

export class FileWatcher extends EventEmitter {
  private watchers: Map<string, fs.FSWatcher> = new Map();
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private readonly debounceDelay = 300; // ms

  /**
   * Watch a file for changes
   */
  async watch(
    filePath: string,
    callback: () => void | Promise<void>
  ): Promise<void> {
    const absolutePath = path.resolve(filePath);

    // Check if file exists
    if (!(await fs.pathExists(absolutePath))) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Stop existing watcher if any
    this.stopWatching(absolutePath);

    // Create new watcher
    const watcher = fs.watch(absolutePath, (eventType, filename) => {
      if (eventType === "change") {
        this.handleFileChange(absolutePath, callback);
      }
    });

    // Store watcher
    this.watchers.set(absolutePath, watcher);

    // Handle watcher errors
    watcher.on("error", (error) => {
      console.error(`File watcher error for ${filePath}:`, error);
      this.emit("error", error);
    });

    // Also watch the directory for file renames/moves
    const dirPath = path.dirname(absolutePath);
    const dirWatcher = fs.watch(dirPath, (eventType, filename) => {
      if (filename === path.basename(absolutePath) && eventType === "rename") {
        // File was renamed or moved, check if it still exists
        fs.pathExists(absolutePath).then((exists) => {
          if (!exists) {
            console.warn(`Watched file ${filePath} was moved or deleted`);
            this.stopWatching(absolutePath);
          }
        });
      }
    });

    // Store directory watcher with a different key
    this.watchers.set(`${absolutePath}:dir`, dirWatcher);

    console.log(`Watching ${filePath} for changes...`);
  }

  /**
   * Handle file change with debouncing
   */
  private handleFileChange(
    filePath: string,
    callback: () => void | Promise<void>
  ): void {
    // Clear existing timer
    const existingTimer = this.debounceTimers.get(filePath);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = setTimeout(async () => {
      try {
        await callback();
      } catch (error) {
        console.error("Error in file change callback:", error);
        this.emit("error", error);
      } finally {
        this.debounceTimers.delete(filePath);
      }
    }, this.debounceDelay);

    this.debounceTimers.set(filePath, timer);
  }

  /**
   * Stop watching a specific file
   */
  stopWatching(filePath: string): void {
    const absolutePath = path.resolve(filePath);

    // Stop file watcher
    const watcher = this.watchers.get(absolutePath);
    if (watcher) {
      watcher.close();
      this.watchers.delete(absolutePath);
    }

    // Stop directory watcher
    const dirWatcher = this.watchers.get(`${absolutePath}:dir`);
    if (dirWatcher) {
      dirWatcher.close();
      this.watchers.delete(`${absolutePath}:dir`);
    }

    // Clear debounce timer
    const timer = this.debounceTimers.get(absolutePath);
    if (timer) {
      clearTimeout(timer);
      this.debounceTimers.delete(absolutePath);
    }
  }

  /**
   * Stop watching all files
   */
  stopAll(): void {
    // Close all watchers
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }
    this.watchers.clear();

    // Clear all timers
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
  }

  /**
   * Get list of watched files
   */
  getWatchedFiles(): string[] {
    return Array.from(this.watchers.keys())
      .filter((key) => !key.endsWith(":dir"))
      .map((key) => path.relative(process.cwd(), key));
  }
}
