import { describe, it, expect } from 'vitest';
import { mulberry32 } from '../random.js';

describe('mulberry32', () => {
  it('returns a function (RNG)', () => {
    const rng = mulberry32(12345);
    expect(typeof rng).toBe('function');
  });

  it('produces values in the range [0, 1)', () => {
    const rng = mulberry32(99999);
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });

  it('is deterministic — same seed produces same sequence', () => {
    const rng1 = mulberry32(42);
    const rng2 = mulberry32(42);
    for (let i = 0; i < 10; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  it('produces different sequences for different seeds', () => {
    const rng1 = mulberry32(1);
    const rng2 = mulberry32(2);
    // At least one value should differ in the first 10
    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());
    expect(seq1).not.toEqual(seq2);
  });

  it('advances state on each call (not a constant function)', () => {
    const rng = mulberry32(777);
    const values = new Set(Array.from({ length: 20 }, () => rng()));
    // All 20 values should be distinct
    expect(values.size).toBe(20);
  });
});
