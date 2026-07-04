import { useState, memo } from 'react';
import PropTypes from 'prop-types';

const FreeCell = memo(({ isLight, centerSpaceType, logoData, centerLogoData, fontSize = '18px' }) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  const showLogo = !hasError && centerSpaceType === 'logo' && logoData;
  const showCustom = !hasError && centerSpaceType === 'custom' && centerLogoData;

  if (showLogo) {
    return (
      <img
        src={logoData}
        alt="Logo Principal"
        onError={handleImageError}
        className="max-w-full max-h-full p-1 object-contain select-none"
      />
    );
  }

  if (showCustom) {
    return (
      <img
        src={centerLogoData}
        alt="Logo Central"
        onError={handleImageError}
        className="max-w-full max-h-full p-1 object-contain select-none"
      />
    );
  }

  // Fallback default: Estrela
  return (
    <span
      className="leading-none select-none"
      role="img"
      aria-label="Espaço Livre com Estrela"
      style={{
        filter: isLight ? 'grayscale(100%)' : 'none',
        fontSize
      }}
    >
      ⭐
    </span>
  );
});

FreeCell.displayName = 'FreeCell';

FreeCell.propTypes = {
  isLight: PropTypes.bool.isRequired,
  centerSpaceType: PropTypes.oneOf(['star', 'logo', 'custom']),
  logoData: PropTypes.string,
  centerLogoData: PropTypes.string,
  fontSize: PropTypes.string,
};

export default FreeCell;

