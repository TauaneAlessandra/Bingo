import React from 'react';
import { Palette, Trash2 } from 'lucide-react';

function AvancadoTab({ config, updateConfig, DEFAULT_CONFIG, resetAll }) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <div className="space-y-5 flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configurações Avançadas</h3>

      {/* Number Range */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-500 font-semibold">Range de Números</label>
        <div className="flex gap-2">
          {[75, 90].map(r => (
            <button
              key={r}
              onClick={() => updateConfig({ numberRange: r })}
              className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition ${config.numberRange === r ? '' : 'border-slate-200 text-slate-500 hover:border-slate-400'}`}
              style={config.numberRange === r ? { 
                borderColor: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
                backgroundColor: accentColor === '#ffffff' ? '#f1f5f9' : accentColor + '15', 
                color: accentColor === '#ffffff' ? '#1e293b' : accentColor 
              } : {}}
            >
              1–{r}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500">
          {config.numberRange === 90
            ? 'Europeu: B(1-18) I(19-36) N(37-54) G(55-72) O(73-90)'
            : 'Padrão: B(1-15) I(16-30) N(31-45) G(46-60) O(61-75)'}
        </p>
      </div>

      {/* Multi-color Toggle */}
      <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex flex-col pr-2">
          <span className="text-xs font-bold text-slate-700">Colorir cartelas individualmente</span>
          <span className="text-[10px] text-slate-500 leading-normal">
            Atribui uma cor temática diferente para cada um dos prêmios (grades).
          </span>
        </div>
        <input
          type="checkbox"
          checked={config.multiColor ?? true}
          onChange={(e) => updateConfig({ multiColor: e.target.checked })}
          className="w-5.5 h-5.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      {/* Accent Color */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-500 font-semibold flex items-center gap-1">
          <Palette className="w-3.5 h-3.5" /> Cor Temática
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => updateConfig({ accentColor: e.target.value })}
            className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer bg-transparent"
          />
          <div className="flex flex-wrap gap-2">
            {['#ffffff', '#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'].map(color => (
              <button
                key={color}
                onClick={() => updateConfig({ accentColor: color })}
                className="w-7 h-7 rounded-full border-2 transition hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderColor: accentColor === color 
                    ? (color === '#ffffff' ? '#f59e0b' : 'white') 
                    : '#2c2c3e'
                }}
              />
            ))}
          </div>
        </div>
        <p className="text-[10px] text-slate-500">Afeta o cabeçalho BINGO, os labels de prêmio e o logotipo da interface.</p>
      </div>

      {/* Reset all */}
      <button
        onClick={resetAll}
        className="self-start flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
      >
        <Trash2 className="w-3.5 h-3.5" /> Redefinir tudo para o padrão
      </button>
    </div>
  );
}

export default AvancadoTab;
