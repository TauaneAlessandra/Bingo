import React from 'react';

const BingoHeader = ({ cols = ['B', 'I', 'N', 'G', 'O'], headerBg, headerText, gridLabelSize }) => {
  const parsedSize = parseInt(gridLabelSize);
  const headerFontSize = !isNaN(parsedSize) ? (parsedSize * 1.6) + 'px' : '20px';

  return (
    <div className="grid grid-cols-5 border-b-2 border-black" style={{ backgroundColor: headerBg }}>
      {cols.map(c => (
        <div
          key={c}
          className="text-center font-extrabold py-1 border-r border-black last:border-r-0"
          style={{
            color: headerText,
            fontSize: headerFontSize,
            lineHeight: 'normal'
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default BingoHeader;