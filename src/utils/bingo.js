import { mulberry32 } from './random';

// Column ranges for each number range
export function getColumnRanges(numberRange = 75) {
  if (numberRange === 90) {
    return {
      B: [1, 18],
      I: [19, 36],
      N: [37, 54],
      G: [55, 72],
      O: [73, 90],
    };
  }
  // Default: 1-75
  return {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75],
  };
}

// Generate a single bingo grid using the provided rng
// The center cell (col N, row index 2) is always FREE
export function generateGrid(rng, numberRange = 75) {
  const ranges = getColumnRanges(numberRange);

  const generateColumn = (min, max, pickCount = 5) => {
    const pool = [];
    for (let i = min; i <= max; i++) pool.push(i);

    const result = [];
    for (let i = 0; i < pickCount; i++) {
      const index = Math.floor(rng() * pool.length);
      result.push(pool.splice(index, 1)[0]);
    }
    return result.sort((a, b) => a - b);
  };

  const grid = {
    B: generateColumn(ranges.B[0], ranges.B[1]),
    I: generateColumn(ranges.I[0], ranges.I[1]),
    N: generateColumn(ranges.N[0], ranges.N[1]),
    G: generateColumn(ranges.G[0], ranges.G[1]),
    O: generateColumn(ranges.O[0], ranges.O[1]),
  };

  // Insert FREE space at center of N column (row index 2)
  grid.N.splice(2, 0, 'FREE');
  // Remove last element so N column stays 5 items
  grid.N = grid.N.slice(0, 5);

  return grid;
}

// Generate 4 independent BINGO grids for a card, each with unique numbers.
// Uses a single seeded RNG shared across all 4 grids so numbers are
// deterministic per cardId but vary from grid to grid.
export function generateBingoNumbers(cardId, numberRange = 75) {
  const baseSeed = 987654321 + cardId * 12345;
  const rng = mulberry32(baseSeed);

  return [
    generateGrid(rng, numberRange), // Grid 1 (1º Prêmio)
    generateGrid(rng, numberRange), // Grid 2 (2º Prêmio)
    generateGrid(rng, numberRange), // Grid 3 (3º Prêmio)
    generateGrid(rng, numberRange), // Grid 4 (4º Prêmio)
  ];
}
