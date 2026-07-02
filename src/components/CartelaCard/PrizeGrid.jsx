import React, { memo } from 'react';
import BingoGrid from '../BingoGrid';

const PrizeGrid = memo(({
  prizeLabel,
  prizeName,
  numbers,
  colors,
  centerSpaceType,
  logoData,
  centerLogoData,
}) => {
  const { color, light } = colors;

  return (
    <div className="flex flex-col">
      <div className="border-2 border-black border-b-0 text-center py-0.5" style={{ backgroundColor: light }}>
        <span className="text-[9px] font-bold block uppercase">{prizeLabel}</span>
        <span className="text-[11px] font-black block uppercase">{prizeName}</span>
      </div>
      <BingoGrid
        numbers={numbers}
        accentColor={color}
        centerSpaceType={centerSpaceType}
        logoData={logoData}
        centerLogoData={centerLogoData}
      />
    </div>
  );
});

PrizeGrid.displayName = 'PrizeGrid';

export default PrizeGrid;
