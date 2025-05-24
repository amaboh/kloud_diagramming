import * as path from 'path';

export interface WatchOptions {
  debounceMs?: number;
  ignorePatterns?: string[];
}

export class FileWatcher {
  private watcher: any;
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor(
    private filePath: string,
    private callback: () => Promise<void>,
    private options: WatchOptions = {}
  ) {}

  async start(): Promise<void> {
    const chokidar = await import('chokidar');

    const watchPath = path.resolve(this.filePath);
    const watchDir = path.dirname(watchPath);

    // Watch the file and its directory for changes
    this.watcher = chokidar.watch(
      [watchPath, `${watchDir}/**/*.ts`, `${watchDir}/**/*.js`],
      {
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/.git/**',
          ...(this.options.ignorePatterns || []),
        ],
        ignoreInitial: true,
        persistent: true,
      }
    );

    this.watcher.on('change', (changedPath: string) => {
      console.log(
        `📝 File changed: ${path.relative(process.cwd(), changedPath)}`
      );
      this.debouncedCallback();
    });

    this.watcher.on('add', (addedPath: string) => {
      console.log(`➕ File added: ${path.relative(process.cwd(), addedPath)}`);
      this.debouncedCallback();
    });

    this.watcher.on('unlink', (removedPath: string) => {
      console.log(
        `➖ File removed: ${path.relative(process.cwd(), removedPath)}`
      );
      this.debouncedCallback();
    });

    this.watcher.on('error', (error: Error) => {
      console.error('🚨 Watch error:', error);
    });

    console.log(
      `👁️  Watching ${path.relative(process.cwd(), watchPath)} for changes...`
    );
    console.log('📋 Press Ctrl+C to stop watching');

    // Keep the process alive
    return new Promise((resolve) => {
      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping file watcher...');
        this.stop().then(resolve);
      });
    });
  }

  async stop(): Promise<void> {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    if (this.watcher) {
      await this.watcher.close();
      this.watcher = null;
    }
  }

  private debouncedCallback(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(async () => {
      try {
        await this.callback();
      } catch (error: any) {
        console.error('🚨 Callback error:', error.message);
      }
    }, this.options.debounceMs || 500);
  }
}
