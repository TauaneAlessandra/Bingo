import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { COLS, COL_COLORS } from './utils';

export default function MiniGrid({ grid, drawnNumbers, won, label }) {
  return (
    <div
      className={`rounded-xl border-2 overflow-hidden transition ${
        won ? 'border-green-500 shadow-lg shadow-green-500/20' : 'border-[#2c2c3e]'
      }`}
    >
      {/* Prize label */}
      <div
        className={`flex items-center justify-between px-3 py-2 text-xs font-bold uppercase ${
          won ? 'bg-green-500/20 text-green-400' : 'bg-[#1b1b26] text-slate-400'
        }`}
      >
        <span>{label}</span>
        {won ? (
          <span className="flex items-center gap-1 text-green-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> BINGO!
          </span>
        ) : (
          <span className="flex items-center gap-1 text-slate-500">
            <XCircle className="w-3.5 h-3.5" /> Incompleta
          </span>
        )}
      </div>

      {/* Mini Grid */}
      <div className="p-2 bg-[#12121a]">
        <div className="grid grid-cols-5 gap-px bg-black border border-black text-xs rounded overflow-hidden">
          {COLS.map(c => (
            <div
              key={c}
              className="text-center font-black py-1 text-white"
              style={{ backgroundColor: COL_COLORS[c] }}
            >
              {c}
            </div>
          ))}
          {[0, 1, 2, 3, 4].map(row =>
            COLS.map(col => {
              const val = grid[col][row];
              const isFree = val === 'FREE';
              const isDrawn = isFree || drawnNumbers.has(val);
              return (
                <div
                  key={`${col}${row}`}
                  className={`text-center py-1.5 font-bold transition ${
                    isFree
                      ? 'text-yellow-500 bg-yellow-50'
                      : isDrawn
                        ? 'text-white'
                        : 'text-gray-700 bg-white'
                  }`}
                  style={isDrawn && !isFree ? { backgroundColor: COL_COLORS[col] + 'cc' } : {}}
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
}
