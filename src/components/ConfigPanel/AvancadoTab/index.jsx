import React from 'react';
import NumberRangeSection from './NumberRangeSection';
import MultiColorToggle from './MultiColorToggle';
import AccentColorSection from './AccentColorSection';
import TextColorsSection from './TextColorsSection';
import ResetButton from './ResetButton';

/**
 * @typedef {Object} AvancadoTabProps
 * @property {Object} config - Current application configuration.
 * @property {function(Object): void} updateConfig - Callback to update config object.
 * @property {Object} DEFAULT_CONFIG - Default fallback configuration.
 * @property {function(): void} resetAll - Callback to reset all configurations to defaults.
 */

/**
 * AvancadoTab orchestrator component.
 * @param {AvancadoTabProps} props
 */
function AvancadoTab({ config, updateConfig, DEFAULT_CONFIG, resetAll }) {
  // Defensive check to avoid runtime crashes if config is not provided
  const activeConfig = config || {};

  return (
    <div className="space-y-5 flex flex-col" data-testid="avancado-tab-container">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Configurações Avançadas
      </h3>

      {/* Number Range Section */}
      <NumberRangeSection config={activeConfig} updateConfig={updateConfig} />

      {/* Multi-color Toggle Section */}
      <MultiColorToggle config={activeConfig} updateConfig={updateConfig} />

      {/* Accent Color Selection Section */}
      <AccentColorSection config={activeConfig} updateConfig={updateConfig} />

      {/* Text Colors Selection Section */}
      <TextColorsSection config={activeConfig} updateConfig={updateConfig} />

      {/* Reset Configurations Section */}
      <ResetButton resetAll={resetAll} />
    </div>
  );
}

export default AvancadoTab;
