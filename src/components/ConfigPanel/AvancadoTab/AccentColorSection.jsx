import React from 'react';
import { Palette } from 'lucide-react';

/**
 * @typedef {Object} AccentColorSectionProps
 * @property {Object} config - Current application configuration.
 * @property {string} [config.accentColor] - Hex code for accent theme color.
 * @property {function(Object): void} updateConfig - Callback to update config object.
 */

const PRESETS = ['#ffffff', '#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

/**
 * AccentColorSection component for customized theme accent coloring.
 * @param {AccentColorSectionProps} props
 */
function AccentColorSection({ config, updateConfig }) {
  const accentColor = config.accentColor || '#ffffff';

  const handleColorChange = (colorValue) => {
    if (typeof updateConfig === 'function') {
      updateConfig({ accentColor: colorValue });
    }
  };

  return (
    <div className="flex flex-col gap-2" data-testid="accent-color-section">
      <label 
        htmlFor="accent-color-input"
        className="text-xs text-slate-500 font-semibold flex items-center gap-1"
      >
        <Palette className="w-3.5 h-3.5" aria-hidden="true" /> Cor Temática
      </label>
      <div className="flex items-center gap-3">
        <input
          id="accent-color-input"
          type="color"
          value={accentColor}
          onChange={(e) => handleColorChange(e.target.value)}
          data-testid="accent-color-picker"
          aria-label="Seletor de cor temática personalizada"
          className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer bg-transparent transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <div 
          className="flex flex-wrap gap-2" 
          role="group" 
          aria-label="Paleta de cores sugeridas"
        >
          {PRESETS.map((color) => {
            const isSelected = accentColor === color;
            const ariaLabel = `Escolher cor ${color}${isSelected ? ' (Selecionada)' : ''}`;
            
            return (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className="w-7 h-7 rounded-full border-2 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400"
                aria-label={ariaLabel}
                aria-pressed={isSelected}
                data-testid={`accent-color-preset-${color.replace('#', '')}`}
                style={{
                  backgroundColor: color,
                  borderColor: isSelected
                    ? (color === '#ffffff' ? '#f59e0b' : 'white')
                    : '#2c2c3e'
                }}
              />
            );
          })}
        </div>
      </div>
      <p className="text-[10px] text-slate-500">
        Afeta o cabeçalho BINGO, os labels de prêmio e o logotipo da interface.
      </p>
    </div>
  );
}

export default AccentColorSection;
