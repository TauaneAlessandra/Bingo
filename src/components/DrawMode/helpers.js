import { getColumnRanges } from '../../utils/bingo';

export function getColumnForNumber(n, numberRange) {
  const ranges = getColumnRanges(numberRange);
  for (const [col, [min, max]] of Object.entries(ranges)) {
    if (n >= min && n <= max) return col;
  }
  return 'O';
}

export function buildPool(numberRange) {
  const pool = [];
  for (let i = 1; i <= numberRange; i++) pool.push(i);
  return pool;
}

// Fisher-Yates shuffle
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
