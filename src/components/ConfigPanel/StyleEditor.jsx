import React, { useState } from 'react';

function StyleEditor({ fieldKey, label, config, updateConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const fontKey = `${fieldKey}Font`;
  const colorKey = `${fieldKey}Color`;
  const sizeKey = `${fieldKey}Size`;

  const fontValue = config[fontKey] || '';
  const colorValue = config[colorKey] || '';
  const sizeValue = config[sizeKey] || '';

  return (
    <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl mb-3 mt-1">
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer focus:outline-none"
      >
        <span>{isOpen ? '▼' : '▶'} Estilizar "{label}"</span>
      </button>
      {isOpen && (
        <div className="mt-2 pt-2 border-t border-slate-200/60 space-y-2 fade-in">
          {/* Fonte */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-semibold">Fonte</span>
            <select
              value={fontValue}
              onChange={(e) => updateConfig({ [fontKey]: e.target.value })}
              className="text-xs p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
            >
              <option value="">Padrão (Herdar)</option>
              <option value="Outfit">Outfit (Moderna)</option>
              <option value="Rock Salt">Rock Salt (Caipira)</option>
              <option value="Grand Hotel">Grand Hotel (Cursiva)</option>
              <option value="Patrick Hand">Patrick Hand (Mão)</option>
              <option value="Gloria Hallelujah">Gloria Hallelujah (Giz)</option>
              <option value="Fredoka">Fredoka (Arredondada)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Cor */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 font-semibold">Cor</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={colorValue || '#000000'}
                  onChange={(e) => updateConfig({ [colorKey]: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
                />
                <span className="text-[10px] font-mono text-slate-600">{colorValue || 'Padrão'}</span>
              </div>
            </div>

            {/* Tamanho */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 font-semibold">Tamanho</span>
              <input
                type="text"
                placeholder="Ex: 10px ou 1.2rem"
                value={sizeValue}
                onChange={(e) => updateConfig({ [sizeKey]: e.target.value })}
                className="text-xs p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-mono placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StyleEditor;
