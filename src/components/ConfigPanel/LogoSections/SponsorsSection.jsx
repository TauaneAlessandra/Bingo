import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

function SponsorsSection({ config, updateConfig, sponsorsLogos, handleSponsorsImageUpload, removeSponsorsLogo, accentColor }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logos de Patrocinadores (Rodapé)</h3>
      
      <md-outlined-text-field
        label="Título da Seção (ex: Patrocinador)"
        value={config.sponsorsTitle || ''}
        onInput={(e) => updateConfig({ sponsorsTitle: e.target.value.toUpperCase() })}
      />

      <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-4 bg-white">
        {sponsorsLogos && sponsorsLogos.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {sponsorsLogos.map((logo, idx) => (
              <div key={idx} className="relative group border border-slate-200 rounded-lg p-1 bg-white flex items-center justify-center h-14">
                <img src={logo} alt={`Sponsor ${idx}`} className="max-h-full max-w-full object-contain" />
                <button
                  onClick={() => removeSponsorsLogo(idx)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col items-center gap-2 py-2">
            <ImageIcon className="w-8 h-8 text-slate-400" />
            <p className="text-xs text-slate-500 font-medium">Nenhum patrocinador carregado</p>
          </div>
        )}

        <label 
          className="text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer transition shadow-sm text-center" 
          style={{ 
            background: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
            color: accentColor === '#ffffff' ? '#ffffff' : '#1e1b4b' 
          }}
        >
          Adicionar Logos de Patrocinador
          <input type="file" accept="image/*" multiple onChange={handleSponsorsImageUpload} className="hidden" />
        </label>
        <p className="text-[10px] text-slate-500 text-center leading-normal">
          Você pode selecionar múltiplas imagens de uma vez.
        </p>
      </div>
    </div>
  );
}

export default SponsorsSection;
