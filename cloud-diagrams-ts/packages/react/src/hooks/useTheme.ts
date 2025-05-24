import { useState, useCallback, useEffect } from 'react';
import { ThemeDefinition } from '@cloud-diagrams/core';

export interface UseThemeReturn {
  theme: string | ThemeDefinition;
  setTheme: (theme: string | ThemeDefinition) => void;
  availableThemes: string[];
  isDark: boolean;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
}

const AVAILABLE_THEMES = ['default', 'dark', 'light'];
const STORAGE_KEY = 'cloud-diagrams-theme';

export const useTheme = (
  initialTheme?: string | ThemeDefinition
): UseThemeReturn => {
  // Get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  }, []);

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(
    getSystemTheme
  );

  // Initialize theme from localStorage or initialTheme
  const getInitialTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return stored; // If it's just a string
        }
      }
    }
    return initialTheme || 'default';
  }, [initialTheme]);

  const [theme, setThemeState] = useState<string | ThemeDefinition>(
    getInitialTheme
  );

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((newTheme: string | ThemeDefinition) => {
    setThemeState(newTheme);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  }, []);

  const isDark = useCallback(() => {
    if (typeof theme === 'string') {
      if (theme === 'auto') {
        return systemTheme === 'dark';
      }
      return theme === 'dark';
    }
    // For custom theme objects, check if they have a dark mode indicator
    return (theme as any)?.mode === 'dark' || false;
  }, [theme, systemTheme])();

  const toggleTheme = useCallback(() => {
    if (typeof theme === 'string') {
      if (theme === 'light') {
        setTheme('dark');
      } else if (theme === 'dark') {
        setTheme('light');
      } else {
        // If it's 'default' or 'auto', toggle based on current appearance
        setTheme(isDark ? 'light' : 'dark');
      }
    } else {
      // For custom theme objects, create a toggled version
      const newTheme = {
        ...theme,
        mode: isDark ? 'light' : 'dark',
      };
      setTheme(newTheme);
    }
  }, [theme, isDark, setTheme]);

  return {
    theme,
    setTheme,
    availableThemes: AVAILABLE_THEMES,
    isDark,
    toggleTheme,
    systemTheme,
  };
};
