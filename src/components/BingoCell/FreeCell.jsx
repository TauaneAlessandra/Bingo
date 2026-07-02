import React from 'react';

const FreeCell = ({ isLight, centerSpaceType, logoData, centerLogoData }) => {
  if (centerSpaceType === 'logo' && logoData) {
    return (
      <img
        src={logoData}
        alt="Logo"
        className="max-w-full max-h-full p-1 object-contain"
      />
    );
  }

  if (centerSpaceType === 'custom' && centerLogoData) {
    return (
      <img
        src={centerLogoData}
        alt="Center Logo"
        className="max-w-full max-h-full p-1 object-contain"
      />
    );
  }

  // Default / Fallback to Star
  return (
    <span
      className="text-[18px] leading-none"
      title="Casa Livre"
      style={{ filter: isLight ? 'grayscale(100%)' : 'grayscale(0%)' }}
    >
      ⭐
    </span>
  );
};

export default FreeCell;
