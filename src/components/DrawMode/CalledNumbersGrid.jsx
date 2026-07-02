import React from 'react';
import { COLS, COL_COLORS } from './constants';

export default function CalledNumbersGrid({ calledByCol, current }) {
  return (
    <div className="grid grid-cols-5 gap-2 flex-1">
      {COLS.map(col => (
        <div key={col} className="flex flex-col gap-1.5">
          {/* Column Header */}
          <div
            className="rounded-lg py-1.5 text-center font-black text-xl text-white"
            style={{ backgroundColor: COL_COLORS[col].bg }}
          >
            {col}
          </div>
          {/* Called numbers in this column */}
          <div className="flex flex-col gap-1 overflow-y-auto max-h-64">
            {calledByCol[col]?.map(n => (
              <div
                key={n}
                className="text-center py-1 rounded-md font-bold text-sm text-white"
                style={{
                  backgroundColor: n === current ? COL_COLORS[col].bg : COL_COLORS[col].bg + '55',
                  border: n === current ? `2px solid ${COL_COLORS[col].bg}` : '2px solid transparent',
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
