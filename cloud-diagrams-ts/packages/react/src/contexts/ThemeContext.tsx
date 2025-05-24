import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeDefinition } from '@cloud-diagrams/core';

export interface ThemeContextValue {
  theme: string | ThemeDefinition;
  setTheme: (theme: string | ThemeDefinition) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext };
