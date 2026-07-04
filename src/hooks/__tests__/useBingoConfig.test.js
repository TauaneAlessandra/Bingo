import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBingoConfig, DEFAULT_CONFIG } from '../useBingoConfig.js';

// localStorage is mocked globally in src/test/setup.js

describe('useBingoConfig', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ── DEFAULT_CONFIG ────────────────────────────────────────────────────────

  describe('DEFAULT_CONFIG', () => {
    it('has all required configuration keys', () => {
      expect(DEFAULT_CONFIG).toHaveProperty('title');
      expect(DEFAULT_CONFIG).toHaveProperty('numberRange');
      expect(DEFAULT_CONFIG).toHaveProperty('accentColor');
      expect(DEFAULT_CONFIG).toHaveProperty('prizes');
      expect(DEFAULT_CONFIG).toHaveProperty('multiColor');
    });

    it('has 4 empty prizes by default', () => {
      expect(DEFAULT_CONFIG.prizes).toHaveLength(4);
      expect(DEFAULT_CONFIG.prizes.every(p => p === '')).toBe(true);
    });

    it('has numberRange of 75 by default', () => {
      expect(DEFAULT_CONFIG.numberRange).toBe(75);
    });
  });

  // ── Initial State ─────────────────────────────────────────────────────────

  describe('initial state', () => {
    it('returns DEFAULT_CONFIG when localStorage is empty', () => {
      const { result } = renderHook(() => useBingoConfig());
      expect(result.current.config.numberRange).toBe(75);
      expect(result.current.config.multiColor).toBe(true);
    });

    it('merges saved config from localStorage with DEFAULT_CONFIG', () => {
      localStorage.setItem(
        'bringo-config-v2',
        JSON.stringify({ title: 'Bingo da ADC', numberRange: 90 })
      );
      const { result } = renderHook(() => useBingoConfig());
      expect(result.current.config.title).toBe('Bingo da ADC');
      expect(result.current.config.numberRange).toBe(90);
      // Other keys still have defaults
      expect(result.current.config.multiColor).toBe(true);
    });

    it('handles corrupted localStorage data gracefully', () => {
      localStorage.setItem('bringo-config-v2', 'NOT_VALID_JSON');
      const { result } = renderHook(() => useBingoConfig());
      // Should fall back to DEFAULT_CONFIG without throwing
      expect(result.current.config.numberRange).toBe(75);
    });

    it('migrates legacy accentColor #f59e0b to #ffffff', () => {
      localStorage.setItem(
        'bringo-config-v2',
        JSON.stringify({ accentColor: '#f59e0b' })
      );
      const { result } = renderHook(() => useBingoConfig());
      expect(result.current.config.accentColor).toBe('#ffffff');
    });

    it('migrates legacy prizes with old sample data', () => {
      localStorage.setItem(
        'bringo-config-v2',
        JSON.stringify({ prizes: ['01 MIXER', '02 BATEDEIRA'] })
      );
      const { result } = renderHook(() => useBingoConfig());
      expect(result.current.config.prizes).toEqual(['', '', '', '']);
    });
  });

  // ── updateConfig ──────────────────────────────────────────────────────────

  describe('updateConfig', () => {
    it('updates a single config key', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ title: 'Novo Título' });
      });
      expect(result.current.config.title).toBe('Novo Título');
    });

    it('updates multiple config keys at once', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ title: 'A', numberRange: 90 });
      });
      expect(result.current.config.title).toBe('A');
      expect(result.current.config.numberRange).toBe(90);
    });

    it('does not wipe other config keys on partial update', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ title: 'Parcial' });
      });
      // multiColor must remain unchanged
      expect(result.current.config.multiColor).toBe(DEFAULT_CONFIG.multiColor);
    });
  });

  // ── addPrize ──────────────────────────────────────────────────────────────

  describe('addPrize', () => {
    it('adds an empty prize to the list', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.addPrize();
      });
      expect(result.current.config.prizes).toHaveLength(5);
      expect(result.current.config.prizes[4]).toBe('');
    });

    it('does not add more than 6 prizes', () => {
      const { result } = renderHook(() => useBingoConfig());
      // Add until max
      act(() => {
        result.current.addPrize(); // 5
        result.current.addPrize(); // 6
        result.current.addPrize(); // should be ignored — still 6
      });
      expect(result.current.config.prizes).toHaveLength(6);
    });
  });

  // ── removePrize ───────────────────────────────────────────────────────────

  describe('removePrize', () => {
    it('removes a prize by index', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ prizes: ['A', 'B', 'C', 'D'] });
      });
      act(() => {
        result.current.removePrize(1); // Remove 'B'
      });
      expect(result.current.config.prizes).toEqual(['A', 'C', 'D']);
    });

    it('does not remove the last remaining prize', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ prizes: ['Único'] });
      });
      act(() => {
        result.current.removePrize(0);
      });
      expect(result.current.config.prizes).toHaveLength(1);
    });
  });

  // ── updatePrize ───────────────────────────────────────────────────────────

  describe('updatePrize', () => {
    it('updates a prize value by index and uppercases it', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updatePrize(0, '01 mixer');
      });
      expect(result.current.config.prizes[0]).toBe('01 MIXER');
    });

    it('leaves other prizes unchanged', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ prizes: ['A', 'B', 'C', 'D'] });
      });
      act(() => {
        result.current.updatePrize(2, 'novo');
      });
      expect(result.current.config.prizes[0]).toBe('A');
      expect(result.current.config.prizes[1]).toBe('B');
      expect(result.current.config.prizes[2]).toBe('NOVO');
      expect(result.current.config.prizes[3]).toBe('D');
    });
  });

  // ── resetAll ──────────────────────────────────────────────────────────────

  describe('resetAll', () => {
    it('resets config to DEFAULT_CONFIG values', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.updateConfig({ title: 'Changed', numberRange: 90 });
      });
      act(() => {
        result.current.resetAll();
      });
      expect(result.current.config.title).toBe(DEFAULT_CONFIG.title);
      expect(result.current.config.numberRange).toBe(DEFAULT_CONFIG.numberRange);
    });

    it('removes the config key from localStorage', () => {
      const { result } = renderHook(() => useBingoConfig());
      act(() => {
        result.current.resetAll();
      });
      expect(localStorage.getItem('bringo-config-v2')).toBeNull();
    });
  });
});
