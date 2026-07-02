import React from 'react';
import FreeCell from './FreeCell';
import NumberCell from './NumberCell';

const BingoCell = ({
  value,
  isLight,
  accentColor,
  centerSpaceType = 'star',
  logoData = null,
  centerLogoData = null
}) => {
  const isFree = value === 'FREE';

  const cellStyle = isFree
    ? { backgroundColor: isLight ? '#f3f4f6' : accentColor + '22' }
    : {};

  return (
    <div
      className="border-r border-black last:border-r-0 flex items-center justify-center h-[34px] print:h-[28px]"
      style={cellStyle}
    >
      {isFree ? (
        <FreeCell
          isLight={isLight}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
        />
      ) : (
        <NumberCell value={value} />
      )}
    </div>
  );
};

export default BingoCell;
