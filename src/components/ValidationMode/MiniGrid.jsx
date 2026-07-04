import React, { memo } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { COLS, COL_COLORS } from './utils';

/**
 * MiniGrid renders a smaller version of a 5x5 Bingo grid
 * with visual status indicators for drawn/marked numbers.
 *
 * @component
 * @param {Object} props
 * @param {Record<'B'|'I'|'N'|'G'|'O', Array<number|string>>} props.grid - The 5x5 bingo grid configuration.
 * @param {Set<number>} props.drawnNumbers - The set of currently drawn numbers.
 * @param {boolean} props.won - Whether this specific grid has met a winning condition.
 * @param {string} props.label - Label text to display as the header of the grid (e.g., "1º Prêmio").
 */
const MiniGrid = memo(({ grid, drawnNumbers, won, label }) => {
  return (
    <div
      className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${
        won ? 'border-green-500/80 shadow-lg shadow-green-500/10' : 'border-[#2c2c3e] hover:border-slate-700'
      }`}
    >
      {/* Prize label */}
      <div
        className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider ${
          won ? 'bg-green-500/10 text-green-400 border-b border-green-500/20' : 'bg-[#1b1b26] text-slate-400 border-b border-[#2c2c3e]'
        }`}
      >
        <span>{label}</span>
        {won ? (
          <span className="flex items-center gap-1 text-green-400 animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" /> BINGO!
          </span>
        ) : (
          <span className="flex items-center gap-1 text-slate-500">
            <XCircle className="w-3.5 h-3.5" /> Incompleta
          </span>
        )}
      </div>

      {/* Mini Grid */}
      <div className="p-3 bg-[#0f0f15]">
        <div className="grid grid-cols-5 gap-1 text-xs rounded overflow-hidden">
          {COLS.map(c => (
            <div
              key={c}
              className="text-center font-black py-1 text-white rounded-sm text-[11px]"
              style={{ backgroundColor: COL_COLORS[c] }}
            >
              {c}
            </div>
          ))}
          {[0, 1, 2, 3, 4].map(row =>
            COLS.map(col => {
              const val = grid[col]?.[row];
              const isFree = val === 'FREE';
              const isDrawn = isFree || (typeof val === 'number' && drawnNumbers.has(val));
              return (
                <div
                  key={`${col}${row}`}
                  className={`text-center py-1.5 font-bold transition-all duration-200 rounded-sm ${
                    isFree
                      ? 'text-amber-400 bg-amber-500/15 border border-amber-500/20'
                      : isDrawn
                        ? 'text-white shadow-sm'
                        : 'text-slate-500 bg-[#161622] border border-[#2c2c3e]/30'
                  }`}
                  style={isDrawn && !isFree ? { backgroundColor: COL_COLORS[col] } : {}}
                >
                  {isFree ? '★' : val}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
});

MiniGrid.displayName = 'MiniGrid';

export default MiniGrid;

