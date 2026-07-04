import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import PrizeGridsContainer from './PrizeGridsContainer';
import SponsorsSection from './SponsorsSection';
import { generateBingoNumbers } from '../../utils/bingo';

const PRESET_COLORS = ['#3b82f6', '#10b981', '#e11d48', '#8b5cf6', '#ea580c', '#db2777']; // Blue, Green, Rose, Violet, Orange, Pink

const CartelaCard = memo(({ number, config, logoData, sponsorsLogoData, centerLogoData, sponsorsLogos = [], realizadoPorLogo, qrCodeLogo, grids: propGrids }) => {
  // useMemo ensures grids are only regenerated when number or numberRange changes
  const grids = useMemo(
    () => propGrids || generateBingoNumbers(number, config.numberRange || 75),
    [number, config.numberRange, propGrids]
  );

  const formattedNum = String(number).padStart(5, '0');
  const prizes = config.prizes || ['', '', '', ''];
  const accentColor = config.accentColor || '#f59e0b';
  const isWhiteAccent = accentColor.toLowerCase() === '#ffffff' || accentColor.toLowerCase() === '#fff';
  const centerSpaceType = config.centerSpaceType || 'star';

  // Memoize grid colors so PrizeGrid children don't re-render unnecessarily
  const gridColors = useMemo(() => {
    const isMulti = config.multiColor ?? true;
    return [0, 1, 2, 3, 4, 5].map(index => {
      const customColor = config[`grid${index + 1}Color`] || PRESET_COLORS[index % PRESET_COLORS.length];
      const color = isMulti ? customColor : accentColor;
      const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff';
      
      let light = isWhite ? '#f3f4f6' : color + '22';
      if (config.gridBackgroundStyle === 'white') {
        light = '#ffffff';
      }
      return { color, light };
    });
  }, [
    config.multiColor,
    accentColor,
    config.grid1Color,
    config.grid2Color,
    config.grid3Color,
    config.grid4Color,
    config.grid5Color,
    config.grid6Color,
    config.gridBackgroundStyle
  ]);

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

      {/* Grids Container */}
      <PrizeGridsContainer
        grids={grids}
        prizes={prizes}
        gridColors={gridColors}
        centerSpaceType={centerSpaceType}
        logoData={logoData}
        centerLogoData={centerLogoData}
        gridNumberSize={config.gridNumberSize}
        gridLabelSize={config.gridLabelSize}
        gridNumberFont={config.gridNumberFont}
      />

      {/* Sponsors Section */}
      <SponsorsSection
        sponsorsLogos={sponsorsLogos}
        sponsorsTitle={config.sponsorsTitle}
        realizadoPorLogo={realizadoPorLogo}
        realizadoPorTitle={config.realizadoPorTitle}
        qrCodeLogo={qrCodeLogo}
        qrCodeTitle={config.qrCodeTitle}
        textColor={config.textColor}
      />
    </div>
  );
});

CartelaCard.displayName = 'CartelaCard';

CartelaCard.propTypes = {
  number: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  logoData: PropTypes.string,
  sponsorsLogoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  sponsorsLogos: PropTypes.arrayOf(PropTypes.string),
  realizadoPorLogo: PropTypes.string,
  qrCodeLogo: PropTypes.string,
  grids: PropTypes.arrayOf(PropTypes.object),
};

export default CartelaCard;
