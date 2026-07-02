import React, { memo } from 'react';
import { getBingoColors } from '../../utils/colorUtils';
import BingoHeader from './BingoHeader';
import BingoRow from './BingoRow';

const ROWS = [0, 1, 2, 3, 4];
const COLS = ['B', 'I', 'N', 'G', 'O'];

const BingoGrid = memo(({
  numbers,
  accentColor = '#f59e0b',
  centerSpaceType = 'star',
  logoData = null,
  centerLogoData = null
}) => {
  const { isLight, headerBg, headerText } = getBingoColors(accentColor);

  return (
    <div className="border-2 border-black w-full overflow-hidden bg-white text-black">
      {/* Header Row */}
      <BingoHeader cols={COLS} headerBg={headerBg} headerText={headerText} />

      {/* Number Rows */}
      {ROWS.map(rowIndex => (
        <BingoRow
          key={rowIndex}
          rowIndex={rowIndex}
          cols={COLS}
          numbers={numbers}
          isLight={isLight}
          accentColor={accentColor}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
        />
      ))}
    </div>
  );
});

BingoGrid.displayName = 'BingoGrid';

export default BingoGrid;
