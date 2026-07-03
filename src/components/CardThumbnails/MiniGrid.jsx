import React from 'react';

export default function MiniGrid({ numbers }) {
  const cols = ['B', 'I', 'N', 'G', 'O'];
  return (
    <div className="grid grid-cols-5 gap-px bg-black border border-black text-[5px] leading-none">
      {['B','I','N','G','O'].map(c => (
        <div key={c} className="bg-yellow-100 text-center font-black py-0.5">{c}</div>
      ))}
      {[0,1,2,3,4].map(row =>
        cols.map(col => {
          const val = numbers?.[col]?.[row];
          const isFree = val === 'FREE';
          return (
            <div
              key={`${col}${row}`}
              className={`text-center py-0.5 font-bold ${isFree ? 'bg-yellow-50 text-yellow-500' : 'bg-white'}`}
            >
              {isFree ? '★' : val}
            </div>
          );
        })
      )}
    </div>
  );
}
