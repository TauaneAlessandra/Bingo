import React, { useState, memo } from 'react';

const FreeCell = memo(({ isLight, centerSpaceType, logoData, centerLogoData, fontSize }) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  if (!hasError) {
    if (centerSpaceType === 'logo' && logoData) {
      return (
        <img
          src={logoData}
          alt="Logo"
          onError={handleImageError}
          className="max-w-full max-h-full p-1 object-contain"
        />
      );
    }

    if (centerSpaceType === 'custom' && centerLogoData) {
      return (
        <img
          src={centerLogoData}
          alt="Center Logo"
          onError={handleImageError}
          className="max-w-full max-h-full p-1 object-contain"
        />
      );
    }
  }

  // Default / Fallback to Star
  return (
    <span
      className="leading-none"
      title="Casa Livre"
      aria-hidden="true"
      style={{
        filter: isLight ? 'grayscale(100%)' : 'grayscale(0%)',
        fontSize: fontSize || '18px'
      }}
    >
      ⭐
    </span>
  );
});

FreeCell.displayName = 'FreeCell';

export default FreeCell;

