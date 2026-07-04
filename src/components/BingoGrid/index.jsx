import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
  centerLogoData = null,
  gridNumberSize,
  gridLabelSize
}) => {
  const { isLight, headerBg, headerText } = getBingoColors(accentColor);

  return (
    <div className="border-2 border-black w-full overflow-hidden bg-white text-black">
      {/* Header Row */}
      <BingoHeader cols={COLS} headerBg={headerBg} headerText={headerText} gridLabelSize={gridLabelSize} />

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
          gridNumberSize={gridNumberSize}
        />
      ))}
    </div>
  );
});

BingoGrid.displayName = 'BingoGrid';

BingoGrid.propTypes = {
  numbers: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
  centerSpaceType: PropTypes.string,
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  gridNumberSize: PropTypes.string,
  gridLabelSize: PropTypes.string,
};

export default BingoGrid;
