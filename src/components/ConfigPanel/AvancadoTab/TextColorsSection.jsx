import React from 'react';
import { Palette } from 'lucide-react';

/**
 * @typedef {Object} TextColorsSectionProps
 * @property {Object} config - Current application configuration.
 * @property {string} [config.textColor] - Hex code for base text color.
 * @property {string} [config.warningColor] - Hex code for warning text color.
 * @property {function(Object): void} updateConfig - Callback to update config object.
 */

/**
 * TextColorsSection component for choosing custom main text and warning colors.
 * @param {TextColorsSectionProps} props
 */
function TextColorsSection({ config, updateConfig }) {
  const textColor = config.textColor || '#000000';
  const warningColor = config.warningColor || '#dc2626';

  const handleTextColorChange = (e) => {
    if (typeof updateConfig === 'function') {
      updateConfig({ textColor: e.target.value });
    }
  };

  const handleWarningColorChange = (e) => {
    if (typeof updateConfig === 'function') {
      updateConfig({ warningColor: e.target.value });
    }
  };

  return (
    <div 
      className="flex flex-col gap-3 p-3.5 bg-white border border-slate-200 rounded-xl"
      data-testid="text-colors-section"
    >
      <label className="text-xs text-slate-700 font-bold flex items-center gap-1" id="text-colors-title">
        <Palette className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" /> Personalizar Cores dos Textos
      </label>
      
      <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="text-colors-title">
        {/* Main Text Color Picker */}
        <div className="flex flex-col gap-1.5">
          <label 
            htmlFor="text-color-picker"
            className="text-[10px] text-slate-500 font-semibold cursor-pointer"
          >
            Texto Principal
          </label>
          <div className="flex items-center gap-2">
            <input
              id="text-color-picker"
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
              data-testid="text-color-picker-input"
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer bg-transparent transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <span className="text-xs font-mono text-slate-700" data-testid="text-color-hex-value">
              {textColor}
            </span>
          </div>
        </div>

        {/* Warning Color Picker */}
        <div className="flex flex-col gap-1.5">
          <label 
            htmlFor="warning-color-picker"
            className="text-[10px] text-slate-500 font-semibold cursor-pointer"
          >
            Aviso Vermelho
          </label>
          <div className="flex items-center gap-2">
            <input
              id="warning-color-picker"
              type="color"
              value={warningColor}
              onChange={handleWarningColorChange}
              data-testid="warning-color-picker-input"
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer bg-transparent transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <span className="text-xs font-mono text-slate-700" data-testid="warning-color-hex-value">
              {warningColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextColorsSection;
