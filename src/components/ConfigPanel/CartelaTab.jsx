import React from 'react';
import PropTypes from 'prop-types';
import { Palette, Type, LayoutGrid, Sparkles, Square } from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Azul',     value: '#3b82f6' },
  { name: 'Verde',    value: '#10b981' },
  { name: 'Rosa',     value: '#e11d48' },
  { name: 'Roxo',     value: '#8b5cf6' },
  { name: 'Laranja',  value: '#ea580c' },
  { name: 'Pink',     value: '#db2777' },
  { name: 'Teal',     value: '#06b6d4' },
  { name: 'Amarelo',  value: '#eab308' },
  { name: 'Vermelho', value: '#ef4444' },
];

const THEME_PRESETS = [
  {
    name: 'Arco-Íris Clássico',
    accentColor: '#3b82f6',
    grids: ['#3b82f6', '#10b981', '#e11d48', '#8b5cf6', '#ea580c', '#db2777'],
  },
  {
    name: 'Cyberpunk Neon',
    accentColor: '#8b5cf6',
    grids: ['#06b6d4', '#d946ef', '#ec4899', '#8b5cf6', '#3b82f6', '#eab308'],
  },
  {
    name: 'Florestal Nature',
    accentColor: '#059669',
    grids: ['#059669', '#10b981', '#0f766e', '#84cc16', '#65a30d', '#14b8a6'],
  },
  {
    name: 'Sunset / Pôr do Sol',
    accentColor: '#ea580c',
    grids: ['#ef4444', '#ea580c', '#f97316', '#f59e0b', '#eab308', '#f43f5e'],
  },
  {
    name: 'Pastel Dreams',
    accentColor: '#a78bfa',
    grids: ['#93c5fd', '#a78bfa', '#fbcfe8', '#86efac', '#fde047', '#fda4af'],
  },
  {
    name: 'Monocromático Premium',
    accentColor: '#1e293b',
    grids: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#0f172a'],
  },
];

// Slider com badge de valor em linha
function SliderField({ label, icon: Icon, min, max, value, onChange, unit = '' }) {
  return (
    <div className="field-group">
      <div className="field-label">
        {Icon && <Icon size={13} />}
        {label}
      </div>
      <div className="slider-row">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full accent-indigo-600 flex-1"
        />
        <span className="slider-value-badge">
          {value}{unit}
        </span>
      </div>
    </div>
  );
}

SliderField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string,
};

function CartelaTab({ config, updateConfig }) {
  const prizes = config.prizes || [];

  return (
    <div className="space-y-4 flex flex-col">

      {/* ── Temas Rápidos ── */}
      <div className="section-card">
        <div className="section-card-title">
          <Sparkles size={14} />
          Temas Coordenados
        </div>
        <div className="flex flex-col gap-2">
          {THEME_PRESETS.map((theme) => (
            <button
              key={theme.name}
              type="button"
              onClick={() =>
                updateConfig({
                  accentColor: theme.accentColor,
                  grid1Color: theme.grids[0],
                  grid2Color: theme.grids[1],
                  grid3Color: theme.grids[2],
                  grid4Color: theme.grids[3],
                  grid5Color: theme.grids[4],
                  grid6Color: theme.grids[5],
                  multiColor: true,
                })
              }
              className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition cursor-pointer text-left shadow-sm hover:shadow active:scale-[0.99]"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {theme.name}
              </span>
              <div className="flex gap-1">
                {theme.grids.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-700 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Cores por Grade ── */}
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

      {/* ── Fundo das Grades ── */}
      <div className="section-card">
        <div className="section-card-title">
          <LayoutGrid size={14} />
          Fundo das Grades
        </div>
        <div className="flex gap-2">
          {[
            { key: 'soft',  label: 'Colorido Suave' },
            { key: 'white', label: 'Branco Limpo'   },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => updateConfig({ gridBackgroundStyle: opt.key })}
              className={`flex-1 py-2 rounded-xl border-2 font-bold text-xs transition cursor-pointer ${
                config.gridBackgroundStyle === opt.key
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tipografia da Grade ── */}
      <div className="section-card">
        <div className="section-card-title">
          <Type size={14} />
          Tipografia da Grade
        </div>

        <div className="field-group">
          <div className="field-label">
            <Type size={12} /> Fonte dos Números
          </div>
          <select
            value={config.gridNumberFont || 'Share Tech Mono'}
            onChange={(e) => updateConfig({ gridNumberFont: e.target.value })}
            className="text-xs p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 w-full cursor-pointer"
          >
            <option value="Share Tech Mono">Share Tech Mono — Digital</option>
            <option value="Outfit">Outfit — Moderna</option>
            <option value="Inter">Inter — Limpa</option>
            <option value="Fredoka">Fredoka — Divertida</option>
            <option value="Patrick Hand">Patrick Hand — Escrita à Mão</option>
            <option value="Gloria Hallelujah">Gloria Hallelujah — Giz</option>
          </select>
        </div>

        <SliderField
          label="Tamanho dos Números"
          icon={Type}
          min={12}
          max={28}
          value={parseInt(config.gridNumberSize || '18')}
          onChange={(e) => updateConfig({ gridNumberSize: `${e.target.value}px` })}
          unit="px"
        />

        <SliderField
          label="Tamanho dos Textos da Grade"
          icon={Type}
          min={8}
          max={18}
          value={parseInt(config.gridLabelSize || '11')}
          onChange={(e) => updateConfig({ gridLabelSize: `${e.target.value}px` })}
          unit="px"
        />
      </div>

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

    </div>
  );
}

CartelaTab.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
};

export default CartelaTab;
