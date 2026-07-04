import React from 'react';
import { Square, Palette, LayoutGrid } from 'lucide-react';
import SliderField from '../SliderField';

function MolduraSection({ config, updateConfig }) {
  return (
    <>
      {/* ── Moldura ── */}
      <div className="section-card">
        <div className="section-card-title">
          <Square size={14} />
          Moldura da Cartela
        </div>

        {/* Border Style */}
        <div className="field-group">
          <div className="field-label">Estilo da Borda</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { key: 'solid',  label: 'Sólida'      },
              { key: 'dashed', label: 'Tracejada'    },
              { key: 'double', label: 'Dupla'        },
              { key: 'dotted', label: 'Pontilhada'   },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => updateConfig({ cardBorderStyle: opt.key })}
                className={`py-2 rounded-xl border-2 font-bold text-xs transition cursor-pointer ${
                  (config.cardBorderStyle || 'solid') === opt.key
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <SliderField
          label="Espessura da Borda"
          icon={Square}
          min={1}
          max={12}
          value={parseInt(config.cardBorderSize || '2')}
          onChange={(e) => updateConfig({ cardBorderSize: `${e.target.value}px` })}
          unit="px"
        />

        <SliderField
          label="Cantos Arredondados"
          icon={Square}
          min={0}
          max={32}
          value={parseInt(config.cardBorderRadius || '0')}
          onChange={(e) => updateConfig({ cardBorderRadius: `${e.target.value}px` })}
          unit="px"
        />

        {/* Border Color */}
        <div className="field-group">
          <div className="field-label">
            <Palette size={12} /> Cor da Borda
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.cardBorderColor || '#000000'}
              onChange={(e) => updateConfig({ cardBorderColor: e.target.value })}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer bg-transparent"
            />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {config.cardBorderColor || '#000000'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Padrão de Fundo ── */}
      <div className="section-card">
        <div className="section-card-title">
          <LayoutGrid size={14} />
          Padrão de Fundo da Cartela
        </div>
        <select
          value={config.cardBackgroundPattern || 'none'}
          onChange={(e) => updateConfig({ cardBackgroundPattern: e.target.value })}
          className="text-xs p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 w-full cursor-pointer"
        >
          <option value="none">Nenhum (Branco Liso)</option>
          <option value="dots">Pontilhado Suave (Dots)</option>
          <option value="stripes">Listras Diagonais (Stripes)</option>
          <option value="waves">Ondas Orgânicas (Waves)</option>
          <option value="grid">Grade Fina (Grid)</option>
        </select>
      </div>
    </>
  );
}

export default MolduraSection;
