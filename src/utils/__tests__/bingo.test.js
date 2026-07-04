import { describe, it, expect } from 'vitest';
import { getColumnRanges, generateGrid, generateBingoNumbers } from '../bingo.js';
import { mulberry32 } from '../random.js';

// ── getColumnRanges ──────────────────────────────────────────────────────────

describe('getColumnRanges', () => {
  it('returns correct ranges for 75 numbers (default)', () => {
    const ranges = getColumnRanges(75);
    expect(ranges.B).toEqual([1, 15]);
    expect(ranges.I).toEqual([16, 30]);
    expect(ranges.N).toEqual([31, 45]);
    expect(ranges.G).toEqual([46, 60]);
    expect(ranges.O).toEqual([61, 75]);
  });

  it('returns correct ranges for 90 numbers', () => {
    const ranges = getColumnRanges(90);
    expect(ranges.B).toEqual([1, 18]);
    expect(ranges.I).toEqual([19, 36]);
    expect(ranges.N).toEqual([37, 54]);
    expect(ranges.G).toEqual([55, 72]);
    expect(ranges.O).toEqual([73, 90]);
  });

  it('defaults to 75 when no argument is provided', () => {
    const ranges = getColumnRanges();
    expect(ranges.B).toEqual([1, 15]);
  });

  it('defaults to 75 for unknown number ranges', () => {
    const ranges = getColumnRanges(99999);
    expect(ranges.B).toEqual([1, 15]);
  });
});

// ── generateGrid ─────────────────────────────────────────────────────────────

describe('generateGrid', () => {
  const rng75 = () => mulberry32(12345);
  const rng90 = () => mulberry32(54321);

  it('generates a grid with 5 columns and 5 rows for 75 numbers', () => {
    const grid = generateGrid(rng75(), 75);
    expect(grid.B).toHaveLength(5);
    expect(grid.I).toHaveLength(5);
    expect(grid.N).toHaveLength(5);
    expect(grid.G).toHaveLength(5);
    expect(grid.O).toHaveLength(5);
  });

  it('places FREE at center of N column (index 2)', () => {
    const grid = generateGrid(rng75(), 75);
    expect(grid.N[2]).toBe('FREE');
  });

  it('numbers in column B are within [1, 15] for 75 range', () => {
    const grid = generateGrid(rng75(), 75);
    grid.B.forEach(n => expect(n).toBeGreaterThanOrEqual(1));
    grid.B.forEach(n => expect(n).toBeLessThanOrEqual(15));
  });

  it('numbers in column O are within [61, 75] for 75 range', () => {
    const grid = generateGrid(rng75(), 75);
    grid.O.forEach(n => expect(n).toBeGreaterThanOrEqual(61));
    grid.O.forEach(n => expect(n).toBeLessThanOrEqual(75));
  });

  it('columns are sorted in ascending order (excluding FREE)', () => {
    const grid = generateGrid(rng75(), 75);
    const isSorted = (arr) => arr.every((val, i) => i === 0 || val >= arr[i - 1]);
    expect(isSorted(grid.B)).toBe(true);
    expect(isSorted(grid.I)).toBe(true);
    expect(isSorted(grid.G)).toBe(true);
    expect(isSorted(grid.O)).toBe(true);
  });

  it('numbers in column B are within [1, 18] for 90 range', () => {
    const grid = generateGrid(rng90(), 90);
    grid.B.forEach(n => expect(n).toBeGreaterThanOrEqual(1));
    grid.B.forEach(n => expect(n).toBeLessThanOrEqual(18));
  });

  it('numbers in column O are within [73, 90] for 90 range', () => {
    const grid = generateGrid(rng90(), 90);
    grid.O.forEach(n => expect(n).toBeGreaterThanOrEqual(73));
    grid.O.forEach(n => expect(n).toBeLessThanOrEqual(90));
  });

  it('N column has exactly 4 non-FREE numbers (no extra elements)', () => {
    const grid = generateGrid(rng75(), 75);
    const nonFree = grid.N.filter(v => v !== 'FREE');
    expect(nonFree).toHaveLength(4);
  });
});

// ── generateBingoNumbers ─────────────────────────────────────────────────────

describe('generateBingoNumbers', () => {
  it('generates 4 grids per card', () => {
    const cards = generateBingoNumbers(1, 75);
    expect(cards).toHaveLength(4);
  });

  it('is deterministic for the same cardId and range', () => {
    const cards1 = generateBingoNumbers(42, 75);
    const cards2 = generateBingoNumbers(42, 75);
    expect(cards1).toEqual(cards2);
  });

  it('generates different cards for different cardIds', () => {
    const cards1 = generateBingoNumbers(42, 75);
    const cards2 = generateBingoNumbers(43, 75);
    expect(cards1).not.toEqual(cards2);
  });

  it('generates unique cards for 1000 consecutive IDs', () => {
    const hashes = new Set();
    for (let i = 1; i <= 1000; i++) {
      const grids = generateBingoNumbers(i, 75);
      const hash = JSON.stringify(grids);
      expect(hashes.has(hash)).toBe(false);
      hashes.add(hash);
    }
    expect(hashes.size).toBe(1000);
  });

  it('works correctly with 90 number range', () => {
    const cards = generateBingoNumbers(1, 90);
    expect(cards).toHaveLength(4);
    cards.forEach(grid => {
      expect(grid.N[2]).toBe('FREE');
      grid.B.forEach(n => expect(n).toBeLessThanOrEqual(18));
      grid.O.forEach(n => expect(n).toBeGreaterThanOrEqual(73));
    });
  });
});
