// Helper to determine if a color is light (luminance check)
export const isLightColor = (hex) => {
  if (!hex || hex.startsWith('var')) return false;
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  }
  return false;
};

// Generates color schemes based on the accent color luminance
export const getBingoColors = (accentColor = '#f59e0b') => {
  const cleanAccent = accentColor.trim().toLowerCase();
  const isWhiteAccent = cleanAccent === '#ffffff' || cleanAccent === '#fff' || cleanAccent === 'white';
  const isLight = isWhiteAccent || isLightColor(accentColor);

  const headerBg = isLight ? '#f3f4f6' : accentColor + '33';
  const headerText = isLight ? '#000000' : (accentColor === '#f59e0b' ? '#000000' : accentColor);
  const freeBg = isLight ? '#f3f4f6' : accentColor + '22';

  return { isLight, headerBg, headerText, freeBg };
};
