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

function CartelaTab({ config, updateConfig }) {
  const prizes = config.prizes || [];

  return (
    <div className="space-y-5 flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estilo das Grades</h3>

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
    </div>
  );
}

export default CartelaTab;
