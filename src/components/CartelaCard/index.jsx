import React, { useMemo, memo } from 'react';
import CardHeader from './CardHeader';
import PrizeGrid from './PrizeGrid';
import SponsorsSection from './SponsorsSection';
import { generateBingoNumbers } from '../../utils/bingo';

const PRESET_COLORS = ['#3b82f6', '#10b981', '#e11d48', '#8b5cf6', '#ea580c', '#db2777']; // Blue, Green, Rose, Violet, Orange, Pink

const CartelaCard = memo(({ number, config, logoData, sponsorsLogoData, centerLogoData, sponsorsLogos = [], grids: propGrids }) => {
  // useMemo ensures grids are only regenerated when number or numberRange changes
  const grids = useMemo(
    () => propGrids || generateBingoNumbers(number, config.numberRange || 75),
    [number, config.numberRange, propGrids]
  );
  const [grid1, grid2, grid3, grid4] = grids;

  const formattedNum = String(number).padStart(5, '0');
  const prizes = config.prizes || ['01 MIXER', '01 KIT CHURRASCO', '01 BICICLETA', '01 PRÊMIO SURPRESA'];
  const accentColor = config.accentColor || '#f59e0b';
  const isWhiteAccent = accentColor.toLowerCase() === '#ffffff' || accentColor.toLowerCase() === '#fff';
  const centerSpaceType = config.centerSpaceType || 'star';

  // Memoize grid colors so PrizeGrid children don't re-render unnecessarily
  const gridColors = useMemo(() => {
    const isMulti = config.multiColor ?? true;
    return [0, 1, 2, 3, 4, 5].map(index => {
      const color = isMulti ? PRESET_COLORS[index % PRESET_COLORS.length] : accentColor;
      const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff';
      const light = isWhite ? '#f3f4f6' : color + '44';
      return { color, light };
    });
  }, [config.multiColor, accentColor]);

  return (
    <div className="preview-card flex flex-col p-4 print:p-2.5 font-sans select-none border-2 border-black">
      {/* Header Section */}
      <CardHeader
        config={config}
        formattedNum={formattedNum}
        logoData={logoData}
        isWhiteAccent={isWhiteAccent}
        accentColor={accentColor}
      />

      {/* Grids and Logo Container */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 print:gap-y-1.5 flex-1 relative">
        <PrizeGrid
          prizeLabel="1º Prêmio"
          prizeName={prizes[0] || '01 PRÊMIO'}
          numbers={grid1}
          colors={gridColors[0]}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
        />

        <PrizeGrid
          prizeLabel="2º Prêmio"
          prizeName={prizes[1] || '02 PRÊMIO'}
          numbers={grid2}
          colors={gridColors[1]}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
        />

        <PrizeGrid
          prizeLabel="3º Prêmio"
          prizeName={prizes[2] || '03 PRÊMIO'}
          numbers={grid3}
          colors={gridColors[2]}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
        />

        {prizes[3] && (
          <PrizeGrid
            prizeLabel="4º Prêmio"
            prizeName={prizes[3]}
            numbers={grid4}
            colors={gridColors[3]}
            centerSpaceType={centerSpaceType}
            logoData={logoData}
            centerLogoData={centerLogoData}
          />
        )}
      </div>

      {/* Sponsors Section */}
      <SponsorsSection
        sponsorsLogos={sponsorsLogos}
        sponsorsTitle={config.sponsorsTitle}
      />
    </div>
  );
});

CartelaCard.displayName = 'CartelaCard';

export default CartelaCard;
