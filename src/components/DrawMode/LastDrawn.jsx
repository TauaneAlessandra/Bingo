import React from 'react';
import { COL_COLORS } from './constants';

export default function LastDrawn({ called, numberRange, getColumnForNumber }) {
  if (called.length === 0) return null;

  return (
    <div className="mt-2 p-3 bg-[#1b1b26] rounded-xl border border-[#2c2c3e]">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Últimos sorteados</p>
      <div className="flex gap-2 flex-wrap">
        {called.slice(0, 8).map((n, i) => {
          const c = getColumnForNumber(n, numberRange);
          return (
            <span
              key={`last-${n}-${i}`}
              className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: COL_COLORS[c].bg + (i === 0 ? 'ff' : '88') }}
            >
              {COL_COLORS[c].label}{n}
            </span>
          );
        })}
      </div>
    </div>
  );
}
