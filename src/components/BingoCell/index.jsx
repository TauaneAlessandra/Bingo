import { memo } from 'react';
import PropTypes from 'prop-types';
import FreeCell from './FreeCell';
import NumberCell from './NumberCell';

const getCellStyle = (isFree, isLight, accentColor) => {
  if (!isFree) return {};
  if (isLight) return { backgroundColor: '#f3f4f6' };
  
  if (accentColor) {
    return accentColor.startsWith('#')
      ? { backgroundColor: `${accentColor}22` }
      : { backgroundColor: accentColor, opacity: 0.85 };
  }
  
  return { backgroundColor: 'rgba(0, 0, 0, 0.05)' };
};

const BingoCell = memo(({
  value,
  isLight,
  accentColor,
  centerSpaceType = 'star',
  logoData = null,
  centerLogoData = null,
  gridNumberSize = '18px'
}) => {
  const isFree = value === 'FREE';
  const cellStyle = getCellStyle(isFree, isLight, accentColor);

  return (
    <div
      className="border-r border-black last:border-r-0 flex items-center justify-center h-[34px] print:h-[28px] w-full"
      style={cellStyle}
      role="gridcell"
      aria-label={isFree ? "Espaço Livre" : `Número ${value}`}
    >
      {isFree ? (
        <FreeCell
          isLight={isLight}
          centerSpaceType={centerSpaceType}
          logoData={logoData}
          centerLogoData={centerLogoData}
          fontSize={gridNumberSize}
        />
      ) : (
        <NumberCell value={value} fontSize={gridNumberSize} />
      )}
    </div>
  );
});

BingoCell.displayName = 'BingoCell';

BingoCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLight: PropTypes.bool.isRequired,
  accentColor: PropTypes.string,
  centerSpaceType: PropTypes.string,
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  gridNumberSize: PropTypes.string,
};

export default BingoCell;

