import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import PrizeGridsContainer from './PrizeGridsContainer';
import SponsorsSection from './SponsorsSection';
import { generateBingoNumbers } from '../../utils/bingo';
import { getCardBackgroundStyles, computeGridColors } from './utils';

const CartelaCard = memo(({ 
  number, 
  config = {}, 
  logoData, 
  centerLogoData, 
  sponsorsLogos = [], 
  realizadoPorLogo, 
  qrCodeLogo, 
  grids: propGrids 
}) => {
  // Destructure configuration variables for clearer references and optimized hook dependencies
  const {
    numberRange = 75,
    prizes = ['', '', '', ''],
    accentColor = '#f59e0b',
    centerSpaceType = 'star',
    cardBackgroundPattern = 'none',
    cardBorderSize = '2px',
    cardBorderStyle = 'solid',
    cardBorderColor = '#000000',
    cardBorderRadius = '0px',
    gridNumberSize,
    gridLabelSize,
    gridNumberFont,
    sponsorsTitle,
    realizadoPorTitle,
    qrCodeTitle,
    textColor,
    multiColor,
    gridBackgroundStyle,
    grid1Color,
    grid2Color,
    grid3Color,
    grid4Color,
    grid5Color,
    grid6Color,
  } = config;

  // useMemo ensures grids are only regenerated when number or numberRange changes
  const grids = useMemo(
    () => propGrids || generateBingoNumbers(number, numberRange),
    [number, numberRange, propGrids]
  );

  const formattedNum = useMemo(() => String(number).padStart(5, '0'), [number]);
  const isWhiteAccent = useMemo(() => {
    const lower = accentColor.toLowerCase();
    return lower === '#ffffff' || lower === '#fff';
  }, [accentColor]);

  // Memoize grid colors so PrizeGrid children don't re-render unnecessarily
  const gridColors = useMemo(() => {
    return computeGridColors(config, accentColor);
  }, [
    multiColor,
    accentColor,
    grid1Color,
    grid2Color,
    grid3Color,
    grid4Color,
    grid5Color,
    grid6Color,
    gridBackgroundStyle
  ]);

  const { backgroundImage, backgroundSize } = useMemo(
    () => getCardBackgroundStyles(cardBackgroundPattern),
    [cardBackgroundPattern]
  );

  const cardStyle = useMemo(() => ({
    borderWidth: cardBorderSize,
    borderStyle: cardBorderStyle,
    borderColor: cardBorderColor,
    borderRadius: cardBorderRadius,
    backgroundImage,
    backgroundSize,
  }), [cardBorderSize, cardBorderStyle, cardBorderColor, cardBorderRadius, backgroundImage, backgroundSize]);

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
        gridNumberSize={gridNumberSize}
        gridLabelSize={gridLabelSize}
        gridNumberFont={gridNumberFont}
      />

      {/* Sponsors Section */}
      <SponsorsSection
        sponsorsLogos={sponsorsLogos}
        sponsorsTitle={sponsorsTitle}
        realizadoPorLogo={realizadoPorLogo}
        realizadoPorTitle={realizadoPorTitle}
        qrCodeLogo={qrCodeLogo}
        qrCodeTitle={qrCodeTitle}
        textColor={textColor}
      />
    </div>
  );
});

CartelaCard.displayName = 'CartelaCard';

CartelaCard.propTypes = {
  number: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  sponsorsLogos: PropTypes.arrayOf(PropTypes.string),
  realizadoPorLogo: PropTypes.string,
  qrCodeLogo: PropTypes.string,
  grids: PropTypes.arrayOf(PropTypes.object),
};

export default CartelaCard;
