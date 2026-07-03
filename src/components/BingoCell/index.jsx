import React, { memo } from 'react';
import FreeCell from './FreeCell';
import NumberCell from './NumberCell';

const BingoCell = memo(({
  value,
  isLight,
  accentColor,
  centerSpaceType = 'star',
  logoData = null,
  centerLogoData = null,
  gridNumberSize
}) => {
  const isFree = value === 'FREE';

  let cellStyle = {};
  if (isFree) {
    if (isLight) {
      cellStyle = { backgroundColor: '#f3f4f6' };
    } else if (accentColor && accentColor.startsWith('#')) {
      // Safely append 22 for transparency on hex colors
      cellStyle = { backgroundColor: accentColor + '22' };
    } else if (accentColor) {
      // Fallback for non-hex colors (e.g. named colors or rgb)
      cellStyle = { backgroundColor: accentColor, opacity: 0.85 };
    } else {
      cellStyle = { backgroundColor: 'rgba(0, 0, 0, 0.05)' };
    }
  }

  return (
    <div
      className="border-r border-black last:border-r-0 flex items-center justify-center h-[34px] print:h-[28px]"
      style={cellStyle}
      aria-label={isFree ? "Espaço Livre" : undefined}
    >
      {isFree ? (
        <FreeCell
          isLight={isLight}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
          fontSize={gridNumberSize}
        />
      ) : (
        <NumberCell value={value} fontSize={gridNumberSize} />
      )}
    </div>
  );
});

BingoCell.displayName = 'BingoCell';

export default BingoCell;

