import React from 'react';

const BingoHeader = ({ cols = ['B', 'I', 'N', 'G', 'O'], headerBg, headerText }) => {
  return (
    <div className="grid grid-cols-5 border-b-2 border-black" style={{ backgroundColor: headerBg }}>
      {cols.map(c => (
        <div
          key={c}
          className="text-center font-extrabold text-xl py-1 border-r border-black last:border-r-0"
          style={{ color: headerText }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default BingoHeader;
