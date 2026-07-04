import { describe, it, expect } from 'vitest';
import { checkGridWin, COL_COLORS, COLS } from '../../components/ValidationMode/utils.js';

// Sample grid fixture
const SAMPLE_GRID = {
  B: [1, 2, 3, 4, 5],
  I: [16, 17, 18, 19, 20],
  N: [31, 32, 'FREE', 34, 35],
  G: [46, 47, 48, 49, 50],
  O: [61, 62, 63, 64, 65],
};

// ── checkGridWin ──────────────────────────────────────────────────────────────

describe('checkGridWin', () => {
  // ── Constants ──

  it('COL_COLORS contains entries for all 5 columns', () => {
    expect(Object.keys(COL_COLORS)).toEqual(['B', 'I', 'N', 'G', 'O']);
  });

  it('COLS has all 5 column identifiers in order', () => {
    expect(COLS).toEqual(['B', 'I', 'N', 'G', 'O']);
  });

  it('COL_COLORS is frozen (immutable)', () => {
    expect(Object.isFrozen(COL_COLORS)).toBe(true);
  });

  // ── Guard clauses ──

  it('returns false for null grid', () => {
    expect(checkGridWin(null, new Set([1, 2, 3]))).toBe(false);
  });

  it('returns false for null drawnNumbers', () => {
    expect(checkGridWin(SAMPLE_GRID, null)).toBe(false);
  });

  it('returns false for an empty set of drawn numbers', () => {
    expect(checkGridWin(SAMPLE_GRID, new Set())).toBe(false);
  });

  // ── Row wins ──

  it('detects a row win on row 0 (B1, I16, N31, G46, O61)', () => {
    const drawn = new Set([1, 16, 31, 46, 61]);
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(true);
  });

  it('detects a row win on row 4 (B5, I20, N35, G50, O65)', () => {
    const drawn = new Set([5, 20, 35, 50, 65]);
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(true);
  });

  it('does NOT trigger win for a partial row (missing one number)', () => {
    const drawn = new Set([1, 16, 31, 46]); // Missing O61
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(false);
  });

  // ── Column wins ──

  it('detects a column win on column B (1, 2, 3, 4, 5)', () => {
    const drawn = new Set([1, 2, 3, 4, 5]);
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(true);
  });

  it('detects a column win on column N (FREE counts as drawn)', () => {
    // N column: 31, 32, FREE, 34, 35 — only non-FREE need to be drawn
    const drawn = new Set([31, 32, 34, 35]);
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(true);
  });

  // ── Diagonal wins ──

  it('detects main diagonal win (top-left to bottom-right)', () => {
    // Positions: B[0]=1, I[1]=17, N[2]=FREE, G[3]=49, O[4]=65
    const drawn = new Set([1, 17, 49, 65]); // FREE is implicit
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(true);
  });

  it('detects anti-diagonal win (top-right to bottom-left)', () => {
    // Positions: B[4]=5, I[3]=19, N[2]=FREE, G[1]=47, O[0]=61
    const drawn = new Set([5, 19, 47, 61]);
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(true);
  });

  // ── No false positives ──

  it('returns false for many drawn numbers that do not form a line', () => {
    // Scattered numbers, no complete line
    const drawn = new Set([1, 17, 34, 49, 65, 2, 18, 33, 47, 62]);
    expect(checkGridWin(SAMPLE_GRID, drawn)).toBe(false);
  });

  it('handles a grid with all numbers drawn (blackout)', () => {
    const allNums = new Set([
      1, 2, 3, 4, 5,
      16, 17, 18, 19, 20,
      31, 32, 34, 35,
      46, 47, 48, 49, 50,
      61, 62, 63, 64, 65,
    ]);
    expect(checkGridWin(SAMPLE_GRID, allNums)).toBe(true);
  });
});
