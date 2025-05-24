export interface Theme {
  name: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  fonts: {
    family: string;
    size: {
      small: string;
      medium: string;
      large: string;
    };
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
}

export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    background: '#ffffff',
    text: '#333333',
    primary: '#007acc',
    secondary: '#6c757d',
    accent: '#28a745',
    border: '#dee2e6'
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