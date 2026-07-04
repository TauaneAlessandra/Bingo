import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from '../utils/useDebounce';
import { DEFAULT_CONFIG, STORAGE_KEY, loadConfig, saveConfigToStorage } from './configDefaults';

export { DEFAULT_CONFIG };

export function useBingoConfig() {
  const [config, setConfig] = useState(() => {
    const loaded = loadConfig() || {};
    if (loaded.accentColor === '#f59e0b') {
      loaded.accentColor = '#ffffff';
    }
    if (loaded.prizes && (loaded.prizes[0] === '01 MIXER' || loaded.prizes[0] === '01 MIXER'.toUpperCase())) {
      loaded.prizes = ['', '', '', ''];
    }
    return {
      ...DEFAULT_CONFIG,
      ...loaded,
    };
  });

  const debouncedSaveStorage = useDebouncedCallback((cfg) => {
    saveConfigToStorage(cfg);
  }, 300);

  useEffect(() => {
    debouncedSaveStorage(config);
  }, [config, debouncedSaveStorage]);

  const updateConfig = useCallback((patch) => {
    setConfig(prev => ({ ...prev, ...patch }));
  }, []);

  const addPrize = useCallback(() => {
    setConfig(prev => {
      if (prev.prizes.length >= 6) return prev;
      return { ...prev, prizes: [...prev.prizes, ''] };
    });
  }, []);

  const removePrize = useCallback((idx) => {
    setConfig(prev => {
      if (prev.prizes.length <= 1) return prev;
      return { ...prev, prizes: prev.prizes.filter((_, i) => i !== idx) };
    });
  }, []);

  const updatePrize = useCallback((idx, val) => {
    setConfig(prev => {
      const next = [...prev.prizes];
      next[idx] = val.toUpperCase();
      return { ...prev, prizes: next };
    });
  }, []);

  const resetAll = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    config,
    updateConfig,
    addPrize,
    removePrize,
    updatePrize,
    resetAll,
  };
}
