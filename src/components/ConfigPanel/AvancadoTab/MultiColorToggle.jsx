import React from 'react';

/**
 * @typedef {Object} MultiColorToggleProps
 * @property {Object} config - Current application configuration.
 * @property {boolean} [config.multiColor] - Whether prizes/grids are individual colored.
 * @property {function(Object): void} updateConfig - Callback to update config object.
 */

/**
 * MultiColorToggle component to color cards individually based on prize.
 * @param {MultiColorToggleProps} props
 */
function MultiColorToggle({ config, updateConfig }) {
  const isMultiColor = config.multiColor ?? true;

  const handleCheckboxChange = (e) => {
    if (typeof updateConfig === 'function') {
      updateConfig({ multiColor: e.target.checked });
    }
  };

  return (
    <div 
      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl transition-all hover:bg-slate-100/50"
      data-testid="multi-color-toggle-container"
    >
      <div className="flex flex-col pr-2">
        <label 
          htmlFor="multi-color-checkbox"
          className="text-xs font-bold text-slate-700 cursor-pointer"
        >
          Colorir cartelas individualmente
        </label>
        <span className="text-[10px] text-slate-500 leading-normal">
          Atribui uma cor temática diferente para cada um dos prêmios (grades).
        </span>
      </div>
      <input
        id="multi-color-checkbox"
        type="checkbox"
        checked={isMultiColor}
        onChange={handleCheckboxChange}
        data-testid="multi-color-toggle-checkbox"
        className="w-5.5 h-5.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition focus:outline-none focus:ring-2"
      />
    </div>
  );
}

export default MultiColorToggle;
