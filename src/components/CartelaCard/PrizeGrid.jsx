import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BingoGrid } from '..';

const PrizeGrid = memo(({
  prizeLabel,
  prizeName,
  numbers,
  colors,
  centerSpaceType,
  logoData,
  centerLogoData,
  gridNumberSize,
  gridLabelSize,
}) => {
  const { color, light } = colors;

  return (
    <div className="flex flex-col">
      <div className="border-2 border-black border-b-0 text-center py-0.5" style={{ backgroundColor: light }}>
        <span 
          className="font-bold block uppercase leading-none" 
          style={{ fontSize: gridLabelSize ? (Math.max(8, parseInt(gridLabelSize, 10) - 2)) + 'px' : '9px' }}
        >
          {prizeLabel}
        </span>
        <span 
          className="font-black block uppercase leading-normal" 
          style={{ fontSize: gridLabelSize || '11px' }}
        >
          {prizeName}
        </span>
      </div>
      <BingoGrid
        numbers={numbers}
        accentColor={color}
        centerSpaceType={centerSpaceType}
        logoData={logoData}
        centerLogoData={centerLogoData}
        gridNumberSize={gridNumberSize}
        gridLabelSize={gridLabelSize}
      />
    </div>
  );
});

PrizeGrid.displayName = 'PrizeGrid';

PrizeGrid.propTypes = {
  prizeLabel: PropTypes.string.isRequired,
  prizeName: PropTypes.string,
  numbers: PropTypes.array.isRequired,
  colors: PropTypes.shape({
    color: PropTypes.string.isRequired,
    light: PropTypes.string.isRequired,
  }).isRequired,
  centerSpaceType: PropTypes.string,
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  gridNumberSize: PropTypes.string,
  gridLabelSize: PropTypes.string,
};

export default PrizeGrid;
