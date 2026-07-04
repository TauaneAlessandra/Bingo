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

  let backgroundImage = undefined;
  let backgroundSize = undefined;
  const pattern = config.cardBackgroundPattern || 'none';

  if (pattern === 'dots') {
    backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0.035) 1.5px, transparent 1.5px)';
    backgroundSize = '14px 14px';
  } else if (pattern === 'stripes') {
    backgroundImage = 'linear-gradient(45deg, rgba(0, 0, 0, 0.015) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.015) 50%, rgba(0, 0, 0, 0.015) 75%, transparent 75%, transparent)';
    backgroundSize = '18px 18px';
  } else if (pattern === 'grid') {
    backgroundImage = 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)';
    backgroundSize = '18px 18px';
  } else if (pattern === 'waves') {
    backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'%3E%3Cpath d='M0 40a19.96 19.96 0 0 1 20-20 19.96 19.96 0 0 1 20 20H0zm80 0a19.96 19.96 0 0 1-20-20 19.96 19.96 0 0 1-20 20h40zM0 0a19.96 19.96 0 0 1 20 20A19.96 19.96 0 0 1 40 0H0zm80 0a19.96 19.96 0 0 1-20 20A19.96 19.96 0 0 1 40 0h40zM40 20a19.96 19.96 0 0 1 20-20 19.96 19.96 0 0 1 20 20H40zm0 0a19.96 19.96 0 0 1-20 20 19.96 19.96 0 0 1-20-20h40z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`;
  }

  const cardStyle = {
    borderWidth: config.cardBorderSize || '2px',
    borderStyle: config.cardBorderStyle || 'solid',
    borderColor: config.cardBorderColor || '#000000',
    borderRadius: config.cardBorderRadius || '0px',
    backgroundImage,
    backgroundSize,
  };

  return (
    <div
      className="preview-card flex flex-col p-4 print:p-2.5 font-sans select-none"
      style={cardStyle}
    >
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
