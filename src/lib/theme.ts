/**
 * Shared theme persistence helpers.
 *
 * Storage key: 'kd-dark'
 * The key name reflects the stored value, not the React state variable name.
 *
 *   Stored '1' → user chose dark mode  → isLight = false
 *   Stored '0' → user chose light mode → isLight = true
 *   Key absent  → follow system preference (prefers-color-scheme)
 *
 * Note: `isLight` (boolean) is the runtime state.
 *       The storage key 'kd-dark' stores the inverse: '1' = dark, '0' = light.
 */
export const THEME_KEY = 'kd-dark';

export function getStoredTheme(): boolean | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === '1') return false; // stored 'dark' → isLight = false
  if (stored === '0') return true;  // stored 'light' → isLight = true
  return null; // no preference stored — fall back to system
}

export function saveTheme(isLight: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, isLight ? '0' : '1');
}

export function resolveInitialTheme(): boolean {
  const stored = getStoredTheme();
  if (stored !== null) return stored;
  return false; // Default to dark mode
}
