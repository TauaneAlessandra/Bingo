import React from 'react';
import { Palette, Type, LayoutGrid } from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Rosa', value: '#e11d48' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Laranja', value: '#ea580c' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Teal', value: '#06b6d4' },
  { name: 'Amarelo', value: '#eab308' },
  { name: 'Vermelho', value: '#ef4444' }
];

const THEME_PRESETS = [
  {
    name: 'Arco-Íris Clássico',
    accentColor: '#3b82f6',
    grids: ['#3b82f6', '#10b981', '#e11d48', '#8b5cf6', '#ea580c', '#db2777']
  },
  {
    name: 'Cyberpunk Neon',
    accentColor: '#8b5cf6',
    grids: ['#06b6d4', '#d946ef', '#ec4899', '#8b5cf6', '#3b82f6', '#eab308']
  },
  {
    name: 'Florestal Nature',
    accentColor: '#059669',
    grids: ['#059669', '#10b981', '#0f766e', '#84cc16', '#65a30d', '#14b8a6']
  },
  {
    name: 'Sunset / Pôr do Sol',
    accentColor: '#ea580c',
    grids: ['#ef4444', '#ea580c', '#f97316', '#f59e0b', '#eab308', '#f43f5e']
  },
  {
    name: 'Pastel Dreams',
    accentColor: '#a78bfa',
    grids: ['#93c5fd', '#a78bfa', '#fbcfe8', '#86efac', '#fde047', '#fda4af']
  },
  {
    name: 'Monocromático Premium',
    accentColor: '#1e293b',
    grids: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#0f172a']
  }
];

function CartelaTab({ config, updateConfig }) {
  const prizes = config.prizes || [];

  return (
    <div className="space-y-5 flex flex-col">
      {/* Themes presets */}
      <div className="space-y-3">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-indigo-500" /> Temas Rápidos Coordenados
        </label>
        <div className="grid grid-cols-1 gap-2">
          {THEME_PRESETS.map((theme) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => {
                updateConfig({
                  accentColor: theme.accentColor,
                  grid1Color: theme.grids[0],
                  grid2Color: theme.grids[1],
                  grid3Color: theme.grids[2],
                  grid4Color: theme.grids[3],
                  grid5Color: theme.grids[4],
                  grid6Color: theme.grids[5],
                  multiColor: true,
                });
              }}
              className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-slate-100 transition cursor-pointer text-left shadow-sm hover:shadow active:scale-[0.99]"
            >
              <span className="text-xs font-bold text-slate-700">{theme.name}</span>
              <div className="flex gap-1">
                {theme.grids.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personalização Manual</h3>

      {/* Grid Colors Customizer */}
      <div className="space-y-4">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-indigo-500" /> Cor Temática de cada Grade
        </label>

        {prizes.slice(0, 6).map((prize, index) => {
          const fieldKey = `grid${index + 1}Color`;
          const currentColor = config[fieldKey] || '#3b82f6';

          return (
            <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">
                  {index + 1}ª Grade {prize ? `(${prize})` : ''}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => updateConfig({ [fieldKey]: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer bg-transparent"
                />
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => updateConfig({ [fieldKey]: color.value })}
                      className="w-6 h-6 rounded-full border transition hover:scale-110 cursor-pointer"
                      style={{
                        backgroundColor: color.value,
                        borderColor: currentColor.toLowerCase() === color.value.toLowerCase() ? '#000' : '#cbd5e1'
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {prizes.length === 0 && (
          <p className="text-xs text-slate-400 italic">Nenhum prêmio cadastrado. Adicione prêmios na aba "Prêmios" para personalizar suas cores.</p>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* Grid Background Style */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <LayoutGrid className="w-4 h-4 text-indigo-500" /> Fundo das Grades
        </label>
        <div className="flex gap-2">
          {[
            { key: 'soft', label: 'Colorido Suave' },
            { key: 'white', label: 'Branco Limpo' }
          ].map(opt => (
            <button
              key={opt.key}
              type="button"
              onClick={() => updateConfig({ gridBackgroundStyle: opt.key })}
              className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-xs transition cursor-pointer ${
                config.gridBackgroundStyle === opt.key 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Grid Number Font */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <Type className="w-4 h-4 text-indigo-500" /> Fonte dos Números da Grade
        </label>
        <select
          value={config.gridNumberFont || 'mono'}
          onChange={(e) => updateConfig({ gridNumberFont: e.target.value })}
          className="text-xs p-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-indigo-500 w-full"
        >
          <option value="Share Tech Mono">Share Tech Mono (Original/Digital)</option>
          <option value="Outfit">Outfit (Moderna/Sleek)</option>
          <option value="Inter">Inter (Limpa/Legível)</option>
          <option value="Fredoka">Fredoka (Arredondada/Divertida)</option>
          <option value="Patrick Hand">Patrick Hand (Escrita à Mão)</option>
          <option value="Gloria Hallelujah">Gloria Hallelujah (Giz)</option>
        </select>
      </div>

      {/* Grid Number Font Size */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Type className="w-4 h-4 text-indigo-500" /> Tamanho dos Números da Grade
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold">{config.gridNumberSize || '18px'}</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="12"
            max="28"
            value={parseInt(config.gridNumberSize || '18')}
            onChange={(e) => updateConfig({ gridNumberSize: `${e.target.value}px` })}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Grid Label Font Size */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Type className="w-4 h-4 text-indigo-500" /> Tamanho dos Textos da Grade
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold">{config.gridLabelSize || '11px'}</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="8"
            max="18"
            value={parseInt(config.gridLabelSize || '11')}
            onChange={(e) => updateConfig({ gridLabelSize: `${e.target.value}px` })}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Card Border & Corners Customizer */}
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Moldura da Cartela</h3>

      {/* Border Style */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <LayoutGrid className="w-4 h-4 text-indigo-500" /> Estilo da Borda da Cartela
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'solid', label: 'Sólida' },
            { key: 'dashed', label: 'Tracejada' },
            { key: 'double', label: 'Dupla' },
            { key: 'dotted', label: 'Pontilhada' }
          ].map(opt => (
            <button
              key={opt.key}
              type="button"
              onClick={() => updateConfig({ cardBorderStyle: opt.key })}
              className={`py-2 rounded-xl border-2 font-bold text-xs transition cursor-pointer ${
                (config.cardBorderStyle || 'solid') === opt.key 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Border Thickness */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-indigo-500" /> Espessura da Borda
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold">{config.cardBorderSize || '2px'}</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="12"
            value={parseInt(config.cardBorderSize || '2')}
            onChange={(e) => updateConfig({ cardBorderSize: `${e.target.value}px` })}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Border Corners */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-indigo-500" /> Cantos Arredondados
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold">{config.cardBorderRadius || '0px'}</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="32"
            value={parseInt(config.cardBorderRadius || '0')}
            onChange={(e) => updateConfig({ cardBorderRadius: `${e.target.value}px` })}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Border Color */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-indigo-500" /> Cor da Borda da Cartela
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.cardBorderColor || '#000000'}
            onChange={(e) => updateConfig({ cardBorderColor: e.target.value })}
            className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer bg-transparent"
          />
          <span className="text-xs font-mono text-slate-500">{config.cardBorderColor || '#000000'}</span>
        </div>
      </div>

      {/* Background Pattern */}
      <hr className="border-slate-200" />
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
          <LayoutGrid className="w-4 h-4 text-indigo-500" /> Padrão de Fundo da Cartela
        </label>
        <select
          value={config.cardBackgroundPattern || 'none'}
          onChange={(e) => updateConfig({ cardBackgroundPattern: e.target.value })}
          className="text-xs p-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-indigo-500 w-full cursor-pointer"
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

export default CartelaTab;
