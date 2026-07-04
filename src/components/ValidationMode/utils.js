/**
 * Colors mapped to each Bingo column letter for visual styling.
 * @type {Readonly<Record<'B'|'I'|'N'|'G'|'O', string>>}
 */
export const COL_COLORS = Object.freeze({
  B: '#3b82f6',
  I: '#8b5cf6',
  N: '#10b981',
  G: '#f59e0b',
  O: '#ef4444',
});

/**
 * Bingo column identifiers.
 * @type {ReadonlyArray<'B'|'I'|'N'|'G'|'O'>}
 */
export const COLS = Object.freeze(['B', 'I', 'N', 'G', 'O']);

/**
 * Checks if a specific bingo grid has won based on drawn numbers.
 * A win condition is met when any full row, column, or diagonal is filled (or marked FREE).
 *
 * @param {Record<'B'|'I'|'N'|'G'|'O', Array<number|string>>} grid - The 5x5 bingo grid configuration.
 * @param {Set<number>} drawnNumbers - The set of currently drawn numbers.
 * @returns {boolean} True if the grid meets any win condition, otherwise false.
 */
export function checkGridWin(grid, drawnNumbers) {
  if (!grid || !drawnNumbers) return false;

  // Check rows
  for (let r = 0; r < 5; r++) {
    if (COLS.every(c => {
      const val = grid[c]?.[r];
      return val === 'FREE' || drawnNumbers.has(val);
    })) return true;
  }

  // Check columns
  for (const col of COLS) {
    if (grid[col]?.every(v => v === 'FREE' || drawnNumbers.has(v))) return true;
  }

  // Check diagonals
  const diag1 = COLS.every((c, i) => {
    const v = grid[c]?.[i];
    return v === 'FREE' || drawnNumbers.has(v);
  });

  const diag2 = COLS.every((c, i) => {
    const v = grid[c]?.[4 - i];
    return v === 'FREE' || drawnNumbers.has(v);
  });

  return diag1 || diag2;
}

