import React from 'react';
import { Palette } from 'lucide-react';
import { PRESET_COLORS } from '../constants';

function CoresSection({ config, updateConfig }) {
  const prizes = config.prizes || [];

  return (
    <div className="section-card">
      <div className="section-card-title">
        <Palette size={14} />
        Cor de cada Grade
        {prizes.length === 0 && (
          <span className="ml-auto text-[10px] font-normal normal-case text-slate-400 dark:text-slate-500">
            (adicione prêmios para ativar)
          </span>
        )}
      </div>

      {prizes.length === 0 ? (
        <p className="text-xs text-slate-400 dark:text-slate-500 italic">
          Adicione prêmios na aba{' '}
          <span className="font-semibold not-italic text-indigo-500">Prêmios</span>{' '}
          para personalizar as cores de cada grade.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {prizes.slice(0, 6).map((prize, index) => {
            const fieldKey = `grid${index + 1}Color`;
            const currentColor = config[fieldKey] || '#3b82f6';
            return (
              <div
                key={index}
                className="flex flex-col gap-1.5 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl fade-in"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-white shadow"
                    style={{ backgroundColor: currentColor }}
                  />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {index + 1}ª Grade {prize ? `— ${prize}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => updateConfig({ [fieldKey]: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer bg-transparent"
                    title="Escolher cor personalizada"
                  />
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => updateConfig({ [fieldKey]: color.value })}
                        className="w-5 h-5 rounded-full border-2 transition hover:scale-110 cursor-pointer"
                        style={{
                          backgroundColor: color.value,
                          borderColor:
                            currentColor.toLowerCase() === color.value.toLowerCase()
                              ? '#4338ca'
                              : 'transparent',
                          boxShadow:
                            currentColor.toLowerCase() === color.value.toLowerCase()
                              ? `0 0 0 1px ${color.value}`
                              : 'none',
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CoresSection;
