import React from 'react';
import { TITLE_PRESETS } from './constants';

function TitleStyleEditor({ config, updateConfig }) {
  return (
    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-3 mt-1.5 mb-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">🎨 Estilo do Título</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1.5">
        {Object.entries(TITLE_PRESETS).map(([key, value]) => {
          const isSelected = (config.titlePreset || 'default') === key;
          return (
            <button
              key={key} type="button" onClick={() => updateConfig(value)} style={{ fontSize: '10px' }}
              className={`py-1.5 px-2 rounded-lg border text-center transition hover:scale-[1.02] cursor-pointer ${
                isSelected ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {key === 'default' ? 'Padrão' : key === 'caipira' ? 'Caipira' : key === 'fogos' ? 'Fogos' : key === 'bandeirinhas' ? 'Bandeiras' : key === 'milho' ? 'Milho' : 'Quadrilha'}
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-200/60 space-y-2.5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 font-semibold">Fonte do Título</span>
          <select
            value={config.titleFont || 'Outfit'}
            onChange={(e) => updateConfig({ titleFont: e.target.value, titlePreset: 'custom' })}
            className="text-xs p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="Outfit">Outfit (Moderna)</option>
            <option value="Rock Salt">Rock Salt (Caipira Rústica)</option>
            <option value="Grand Hotel">Grand Hotel (Elegante Cursiva)</option>
            <option value="Patrick Hand">Patrick Hand (Escrita à Mão)</option>
            <option value="Gloria Hallelujah">Gloria Hallelujah (Giz)</option>
            <option value="Fredoka">Fredoka (Arredondada)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-semibold">Cor do Título</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color" value={config.titleColor || '#000000'}
                onChange={(e) => updateConfig({ titleColor: e.target.value, titlePreset: 'custom' })}
                className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
              />
              <span className="text-[10px] font-mono text-slate-600">{config.titleColor || '#000000'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-semibold">Tamanho (px)</span>
            <div className="flex items-center gap-2">
              <input
                type="range" min="16" max="42" value={parseInt(config.titleSize || '24')}
                onChange={(e) => updateConfig({ titleSize: `${e.target.value}px`, titlePreset: 'custom' })}
                className="w-full accent-indigo-600"
              />
              <span className="text-[10px] font-semibold text-slate-600 whitespace-nowrap">{config.titleSize || '24px'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 font-semibold flex justify-between items-center">
            <span>Sombra de Texto (text-shadow)</span>
            <button type="button" onClick={() => updateConfig({ titleShadow: '', titlePreset: 'custom' })} className="text-[9px] text-red-500 hover:underline cursor-pointer">Limpar</button>
          </span>
          <input
            type="text" placeholder="Ex: 2px 2px 0px #FFC107" value={config.titleShadow || ''}
            onChange={(e) => updateConfig({ titleShadow: e.target.value, titlePreset: 'custom' })}
            className="text-xs p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-mono placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

export default TitleStyleEditor;
