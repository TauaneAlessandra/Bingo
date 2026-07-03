import React from 'react';
import BingoCell from '../BingoCell/index';

const BingoRow = ({
  rowIndex,
  cols,
  numbers,
  isLight,
  accentColor,
  centerSpaceType,
  logoData,
  centerLogoData,
  gridNumberSize
}) => {
  return (
    <div className="grid grid-cols-5 border-b border-black last:border-b-0">
      {cols.map(col => (
        <BingoCell
          key={col}
          value={numbers[col][rowIndex]}
          isLight={isLight}
          accentColor={accentColor}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
          gridNumberSize={gridNumberSize}
        />
      ))}
    </div>
  );
};

export default BingoRow;
