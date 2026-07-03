import React from 'react';

/**
 * @typedef {Object} NumberRangeSectionProps
 * @property {Object} config - Current application configuration.
 * @property {number} [config.numberRange] - Current range (75 or 90).
 * @property {string} [config.accentColor] - Accent theme color hex code.
 * @property {function(Object): void} updateConfig - Callback to update config object.
 */

/**
 * NumberRangeSection component for choosing Bingo number range.
 * @param {NumberRangeSectionProps} props
 */
function NumberRangeSection({ config, updateConfig }) {
  const accentColor = config.accentColor || '#ffffff';
  const currentRange = config.numberRange ?? 75;

  const handleRangeChange = (range) => {
    if (typeof updateConfig === 'function') {
      updateConfig({ numberRange: range });
    }
  };

  return (
    <div className="flex flex-col gap-2" data-testid="number-range-section">
      <label className="text-xs text-slate-500 font-semibold" id="number-range-label">
        Range de Números
      </label>
      <div 
        className="flex gap-2" 
        role="group" 
        aria-labelledby="number-range-label"
      >
        {[75, 90].map((r) => {
          const isActive = currentRange === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => handleRangeChange(r)}
              data-testid={`number-range-btn-${r}`}
              aria-pressed={isActive}
              className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
                isActive 
                  ? '' 
                  : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
              }`}
              style={isActive ? { 
                borderColor: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
                backgroundColor: accentColor === '#ffffff' ? '#f1f5f9' : accentColor + '15', 
                color: accentColor === '#ffffff' ? '#1e293b' : accentColor 
              } : {}}
            >
              1–{r}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-500" data-testid="number-range-description">
        {currentRange === 90
          ? 'Europeu: B(1-18) I(19-36) N(37-54) G(55-72) O(73-90)'
          : 'Padrão: B(1-15) I(16-30) N(31-45) G(46-60) O(61-75)'}
      </p>
    </div>
  );
}

export default NumberRangeSection;
