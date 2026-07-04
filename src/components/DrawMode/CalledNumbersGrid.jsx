import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { COLS, COL_COLORS } from './constants';
import { getColumnRanges } from '../../utils/bingo';

export default function CalledNumbersGrid({ called = [], numberRange = 75, current }) {
  const calledSet = useMemo(() => new Set(called), [called]);

  const columnsData = useMemo(() => {
    const ranges = getColumnRanges(numberRange);
    return COLS.map(col => {
      const [min, max] = ranges[col] || [1, 15];
      const numbers = [];
      for (let i = min; i <= max; i++) {
        numbers.push(i);
      }
      return { col, numbers };
    });
  }, [numberRange]);

  return (
    <div className="grid grid-cols-5 gap-2 bg-[#171725] p-3 rounded-xl border border-[#2c2c3e]/60">
      {columnsData.map(({ col, numbers }) => (
        <div key={col} className="flex flex-col gap-1.5">
          {/* Column Header */}
          <div
            className="rounded-lg py-1 text-center font-black text-lg text-white shadow-md select-none"
            style={{ backgroundColor: COL_COLORS[col].bg }}
          >
            {col}
          </div>
          {/* All numbers in this column */}
          <div className="flex flex-col gap-1 overflow-y-auto max-h-[360px] pr-1">
            {numbers.map(n => {
              const isCalled = calledSet.has(n);
              const isCurrent = n === current;

              return (
                <div
                  key={n}
                  className={`text-center py-1 rounded-md font-bold text-xs transition-all duration-300 select-none ${
                    isCurrent ? 'animate-pulse scale-105 shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: isCurrent
                      ? COL_COLORS[col].bg
                      : isCalled
                        ? `${COL_COLORS[col].bg}33`
                        : '#1e1e2e',
                    border: isCurrent
                      ? `2px solid #ffffff`
                      : isCalled
                        ? `1px solid ${COL_COLORS[col].bg}66`
                        : '1px solid #2c2c3e',
                    color: isCurrent
                      ? '#ffffff'
                      : isCalled
                        ? COL_COLORS[col].light
                        : '#475569',
                    boxShadow: isCurrent ? `0 0 10px ${COL_COLORS[col].bg}` : undefined,
                  }}
                >
                  {n}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

CalledNumbersGrid.propTypes = {
  called: PropTypes.arrayOf(PropTypes.number),
  numberRange: PropTypes.number,
  current: PropTypes.number,
};
