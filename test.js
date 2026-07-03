import assert from 'node:assert';
import test from 'node:test';
import { getColumnRanges, generateGrid, generateBingoNumbers } from './src/utils/bingo.js';
import { mulberry32 } from './src/utils/random.js';

test('getColumnRanges - default 75', () => {
  const ranges = getColumnRanges(75);
  assert.deepStrictEqual(ranges.B, [1, 15]);
  assert.deepStrictEqual(ranges.I, [16, 30]);
  assert.deepStrictEqual(ranges.N, [31, 45]);
  assert.deepStrictEqual(ranges.G, [46, 60]);
  assert.deepStrictEqual(ranges.O, [61, 75]);
});

test('getColumnRanges - 90', () => {
  const ranges = getColumnRanges(90);
  assert.deepStrictEqual(ranges.B, [1, 18]);
  assert.deepStrictEqual(ranges.I, [19, 36]);
  assert.deepStrictEqual(ranges.N, [37, 54]);
  assert.deepStrictEqual(ranges.G, [55, 72]);
  assert.deepStrictEqual(ranges.O, [73, 90]);
});

test('generateGrid - Structure and Constraints', () => {
  const rng = mulberry32(12345);
  const grid = generateGrid(rng, 75);

  // Checks structure
  assert.ok(grid.B && grid.I && grid.N && grid.G && grid.O);
  assert.strictEqual(grid.B.length, 5);
  assert.strictEqual(grid.I.length, 5);
  assert.strictEqual(grid.N.length, 5);
  assert.strictEqual(grid.G.length, 5);
  assert.strictEqual(grid.O.length, 5);

  // Center must be FREE
  assert.strictEqual(grid.N[2], 'FREE');

  // Numbers must be sorted (excluding FREE in N)
  const isSorted = (arr) => arr.every((val, i) => i === 0 || val >= arr[i - 1]);
  assert.ok(isSorted(grid.B));
  assert.ok(isSorted(grid.I));
  assert.ok(isSorted(grid.G));
  assert.ok(isSorted(grid.O));

  // Check column number ranges
  grid.B.forEach(n => assert.ok(n >= 1 && n <= 15));
  grid.I.forEach(n => assert.ok(n >= 16 && n <= 30));
  grid.N.forEach((n, idx) => {
    if (idx !== 2) assert.ok(n >= 31 && n <= 45);
  });
  grid.G.forEach(n => assert.ok(n >= 46 && n <= 60));
  grid.O.forEach(n => assert.ok(n >= 61 && n <= 75));
});

test('generateBingoNumbers - Determinism', () => {
  const cards1 = generateBingoNumbers(42, 75);
  const cards2 = generateBingoNumbers(42, 75);
  const cardsDifferent = generateBingoNumbers(43, 75);

  // Same seed/cardId generates identical cards
  assert.deepStrictEqual(cards1, cards2);

  // Different seed/cardId generates different cards
  assert.notDeepStrictEqual(cards1, cardsDifferent);
});

test('generateBingoNumbers - Uniqueness of 5000 cards', () => {
  const quantity = 5000;
  const hashes = new Set();
  
  for (let i = 1; i <= quantity; i++) {
    const grids = generateBingoNumbers(i, 75);
    const serialized = JSON.stringify(grids);
    assert.strictEqual(hashes.has(serialized), false, `Collision detected at card ID ${i}`);
    hashes.add(serialized);
  }
  
  assert.strictEqual(hashes.size, quantity);
});

test('generateGrid - Structure and Constraints for 90 Numbers', () => {
  const rng = mulberry32(54321);
  const grid = generateGrid(rng, 90);

  // Checks structure
  assert.ok(grid.B && grid.I && grid.N && grid.G && grid.O);
  assert.strictEqual(grid.B.length, 5);
  assert.strictEqual(grid.I.length, 5);
  assert.strictEqual(grid.N.length, 5);
  assert.strictEqual(grid.G.length, 5);
  assert.strictEqual(grid.O.length, 5);

  // Center must be FREE
  assert.strictEqual(grid.N[2], 'FREE');

  // Check column ranges for 90 number option
  grid.B.forEach(n => assert.ok(n >= 1 && n <= 18));
  grid.I.forEach(n => assert.ok(n >= 19 && n <= 36));
  grid.N.forEach((n, idx) => {
    if (idx !== 2) assert.ok(n >= 37 && n <= 54);
  });
  grid.G.forEach(n => assert.ok(n >= 55 && n <= 72));
  grid.O.forEach(n => assert.ok(n >= 73 && n <= 90));
});

