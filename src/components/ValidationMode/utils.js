export const COL_COLORS = {
  B: '#3b82f6',
  I: '#8b5cf6',
  N: '#10b981',
  G: '#f59e0b',
  O: '#ef4444',
};

export const COLS = ['B', 'I', 'N', 'G', 'O'];

/**
 * Check if a grid has won (all 5 cells in any row, col, or diagonal marked)
 * @param {Object} grid
 * @param {Set<number>} drawnNumbers
 * @returns {boolean}
 */
export function checkGridWin(grid, drawnNumbers) {
  // Check rows
  for (let r = 0; r < 5; r++) {
    if (COLS.every(c => {
      const val = grid[c][r];
      return val === 'FREE' || drawnNumbers.has(val);
    })) return true;
  }
  // Check columns
  for (const col of COLS) {
    if (grid[col].every(v => v === 'FREE' || drawnNumbers.has(v))) return true;
  }
  // Check diagonals
  const diag1 = COLS.every((c, i) => { const v = grid[c][i]; return v === 'FREE' || drawnNumbers.has(v); });
  const diag2 = COLS.every((c, i) => { const v = grid[c][4 - i]; return v === 'FREE' || drawnNumbers.has(v); });
  return diag1 || diag2;
}
