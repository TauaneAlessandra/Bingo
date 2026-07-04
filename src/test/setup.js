import '@testing-library/jest-dom';

// ── LocalStorage mock ──────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// ── IndexedDB mock (minimal stub) ──────────────────────────────────────────
// Full IndexedDB mock is provided per-test via vi.mock in test files.
// This global stub prevents "indexedDB is not defined" errors in modules
// that are imported but not directly tested.
if (!globalThis.indexedDB) {
  globalThis.indexedDB = {
    open: () => ({
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
    }),
    deleteDatabase: () => ({
      onsuccess: null,
      onerror: null,
    }),
  };
}
