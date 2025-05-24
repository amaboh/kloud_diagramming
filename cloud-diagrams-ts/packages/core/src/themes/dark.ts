import type { Theme } from './default';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#4fc3f7',
    secondary: '#9e9e9e',
    accent: '#66bb6a',
    border: '#424242'
  },
  fonts: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    size: {
      small: '12px',
      medium: '14px',
      large: '16px'
    }
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24
  }
}; 