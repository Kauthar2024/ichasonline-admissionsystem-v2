// Tiny persisted store used while the officer/admin endpoints do not exist.
// Data lives in localStorage so decisions survive a page reload.
// Bump VERSION when a seed changes shape so stale data is discarded.
const VERSION = 'v1';
const PREFIX = `mock:${VERSION}:`;

export function createMockCollection<T>(name: string, seed: () => T[]) {
  const key = PREFIX + name;
  let cache: T[] | null = null;

  return {
    all(): T[] {
      if (cache) return cache;
      try {
        const raw = localStorage.getItem(key);
        if (raw) return (cache = JSON.parse(raw) as T[]);
      } catch {
        // fall through to the seed
      }
      return (cache = seed());
    },
    save(items: T[]) {
      cache = items;
      try {
        localStorage.setItem(key, JSON.stringify(items));
      } catch {
        // storage unavailable: data stays in memory only
      }
    },
  };
}

export function resetMockData() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('mock:'))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
  window.location.reload();
}
