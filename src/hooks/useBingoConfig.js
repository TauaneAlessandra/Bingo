import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from '../utils/useDebounce';

const STORAGE_KEY = 'bringo-config-v2';

export const DEFAULT_CONFIG = {
  title: '',
  subtitle: '',
  attractions: '',
  rules: '',
  exclusiveDate: '',
  prizes: ['', '', '', ''],
  numberRange: 75,
  accentColor: '#ffffff',
  textColor: '#000000',
  warningColor: '#dc2626',
  centerSpaceType: 'star',
  sponsorsTitle: '',
  realizadoPorTitle: '',
  qrCodeTitle: '',
  confira: '',
  cardValue: '',
  multiColor: true,
  titleFont: 'Outfit',
  titleColor: '#000000',
  titleShadow: '',
  titleSize: '24px',
  titlePreset: 'default',
  subtitleFont: '',
  subtitleColor: '',
  subtitleSize: '',
  attractionsFont: '',
  attractionsColor: '',
  attractionsSize: '',
  rulesFont: '',
  rulesColor: '',
  rulesSize: '',
  confiraFont: '',
  confiraColor: '',
  confiraSize: '',
  exclusiveDateFont: '',
  exclusiveDateColor: '',
  exclusiveDateSize: '',
  cardValueFont: '',
  cardValueColor: '',
  cardValueSize: '',
  grid1Color: '#3b82f6',
  grid2Color: '#10b981',
  grid3Color: '#e11d48',
  grid4Color: '#8b5cf6',
  grid5Color: '#ea580c',
  grid6Color: '#db2777',
  gridNumberFont: 'mono',
  gridBackgroundStyle: 'soft',
  gridNumberSize: '18px',
  gridLabelSize: '11px',
};

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConfigToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded — silent fail
  }
}

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

  // ── Debounced save to localStorage (300ms) ──
  const debouncedSaveStorage = useDebouncedCallback((cfg) => {
    saveConfigToStorage(cfg);
  }, 300);

  // ── Save config when config changes (debounced) ──
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
