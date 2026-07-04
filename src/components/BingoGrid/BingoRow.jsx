import React, { memo } from 'react';
import PropTypes from 'prop-types';
import BingoCell from '../BingoCell/index';

const BingoRow = memo(({
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
      {cols.map((col) => (
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
});

BingoRow.displayName = 'BingoRow';

BingoRow.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  numbers: PropTypes.object.isRequired,
  isLight: PropTypes.bool.isRequired,
  accentColor: PropTypes.string.isRequired,
  centerSpaceType: PropTypes.string,
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  gridNumberSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BingoRow;
