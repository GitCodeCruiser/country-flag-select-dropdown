/**
 * Convert ISO 3166-1 alpha-2 code to emoji flag
 * Uses Unicode Regional Indicator Symbols (no images needed)
 */
export function getFlagEmoji(code) {
  if (!code || typeof code !== 'string' || code.length !== 2) return '🏳';
  try {
    return String.fromCodePoint(
      ...code.toUpperCase().split('').map(c => c.charCodeAt(0) + 127397)
    );
  } catch {
    return '🏳';
  }
}

/**
 * Normalize string for search (lowercase + strip diacritics)
 */
export function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Generate a short random unique ID
 */
export function uid() {
  return 'cfs-' + Math.random().toString(36).slice(2, 8);
}

/**
 * Inject CSS string into <head> once
 */
export function injectStyles(css) {
  if (typeof document === 'undefined') return;
  const id = 'cfs-global-styles';
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.insertBefore(el, document.head.firstChild);
}
