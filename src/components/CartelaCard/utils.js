export const PRESET_COLORS = ['#3b82f6', '#10b981', '#e11d48', '#8b5cf6', '#ea580c', '#db2777'];

/**
 * Retorna o padrão de fundo CSS com base na string de configuração.
 * @param {string} pattern - O tipo de padrão (dots, stripes, grid, waves)
 * @returns {object} Objeto com backgroundImage e backgroundSize correspondentes
 */
export const getCardBackgroundStyles = (pattern) => {
  let backgroundImage;
  let backgroundSize;

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

  return { backgroundImage, backgroundSize };
};

/**
 * Computa as cores de fundo e realce de cada uma das 6 grades possíveis.
 * @param {object} config - Objeto de configuração do card
 * @param {string} accentColor - Cor de destaque principal
 * @returns {Array} Array de objetos contendo { color, light } para cada grade
 */
export const computeGridColors = (config, accentColor) => {
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
};
