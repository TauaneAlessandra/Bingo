import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PrizeGrid from './PrizeGrid';

const PrizeGridsContainer = memo(({
  grids,
  prizes,
  gridColors,
  centerSpaceType,
  logoData,
  centerLogoData,
  gridNumberSize,
  gridLabelSize,
  gridNumberFont,
}) => {
  const [grid1, grid2, grid3, grid4] = grids;

  return (
    <div 
      className="grid grid-cols-2 gap-x-5 gap-y-3 print:gap-y-1.5 flex-1 relative"
      style={gridNumberFont ? { fontFamily: `${gridNumberFont}, sans-serif` } : {}}
    >
      <PrizeGrid
        prizeLabel="1º Prêmio"
        prizeName={prizes[0] || ''}
        numbers={grid1}
        colors={gridColors[0]}
        centerSpaceType={centerSpaceType}
        logoData={logoData}
        centerLogoData={centerLogoData}
        gridNumberSize={gridNumberSize}
        gridLabelSize={gridLabelSize}
      />

      <PrizeGrid
        prizeLabel="2º Prêmio"
        prizeName={prizes[1] || ''}
        numbers={grid2}
        colors={gridColors[1]}
        centerSpaceType={centerSpaceType}
        logoData={logoData}
        centerLogoData={centerLogoData}
        gridNumberSize={gridNumberSize}
        gridLabelSize={gridLabelSize}
      />

      <PrizeGrid
        prizeLabel="3º Prêmio"
        prizeName={prizes[2] || ''}
        numbers={grid3}
        colors={gridColors[2]}
        centerSpaceType={centerSpaceType}
        logoData={logoData}
        centerLogoData={centerLogoData}
        gridNumberSize={gridNumberSize}
        gridLabelSize={gridLabelSize}
      />

      {prizes[3] !== undefined && (
        <PrizeGrid
          prizeLabel="4º Prêmio"
          prizeName={prizes[3] || ''}
          numbers={grid4}
          colors={gridColors[3]}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
          gridNumberSize={gridNumberSize}
          gridLabelSize={gridLabelSize}
        />
      )}
    </div>
  );
});

PrizeGridsContainer.displayName = 'PrizeGridsContainer';

PrizeGridsContainer.propTypes = {
  grids: PropTypes.arrayOf(PropTypes.array).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridColors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      light: PropTypes.string.isRequired,
    })
  ).isRequired,
  centerSpaceType: PropTypes.string,
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  gridNumberSize: PropTypes.string,
  gridLabelSize: PropTypes.string,
  gridNumberFont: PropTypes.string,
};

export default PrizeGridsContainer;
