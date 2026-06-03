/**
 * Shared theme persistence helpers.
 * Storage key: 'kd-dark'
 *   '1' → dark mode
 *   '0' → light mode
 *   absent → follow system preference
 */
export const THEME_KEY = 'kd-dark';

export function getStoredTheme(): boolean | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === '1') return false; // dark → isLight = false
  if (stored === '0') return true;  // light → isLight = true
  return null; // fallback to system
}

export function saveTheme(isLight: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, isLight ? '0' : '1');
}

export function resolveInitialTheme(): boolean {
  const stored = getStoredTheme();
  if (stored !== null) return stored;
  // Default to dark (false = dark)
  if (typeof window !== 'undefined') {
    return !window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}
