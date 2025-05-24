import { defaultTheme, type Theme } from './default';
import { darkTheme } from './dark';

export { defaultTheme, type Theme } from './default';
export { darkTheme } from './dark';

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
};

export function getTheme(name: string): Theme {
  return themes[name as keyof typeof themes] || defaultTheme;
}
