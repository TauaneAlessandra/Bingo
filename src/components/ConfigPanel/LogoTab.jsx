import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

function LogoTab({
  config,
  updateConfig,
  logoData,
  handleImageUpload,
  resetLogo,
  centerLogoData,
  handleCenterImageUpload,
  resetCenterLogo,
  sponsorsLogos,
  handleSponsorsImageUpload,
  removeSponsorsLogo,
}) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <div className="space-y-6">
      {/* Logotipo do Cabeçalho */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logotipo do Cabeçalho</h3>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 gap-4">
          {logoData ? (
            <div className="flex flex-col items-center gap-3">
              <img src={logoData} alt="Preview Logo" className="w-24 h-24 object-contain rounded-lg border border-slate-200 bg-white p-1" />
              <button
                onClick={resetLogo}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
              >
                <X className="w-3 h-3" /> Remover Logo
              </button>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8 text-slate-400" />
              <p className="text-xs text-slate-500">Usando logotipo padrão do Arraiá</p>
            </div>
          )}

          {!logoData && (
            <label 
              className="text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer transition shadow-sm" 
              style={{ 
                background: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
                color: accentColor === '#ffffff' ? '#ffffff' : '#1e1b4b' 
              }}
            >
              Fazer Upload de Logo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Espaço Central */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-outfit">Espaço Central (Célula Livre)</h3>
        <p className="text-[10px] text-slate-500 font-medium">Selecione o que será exibido no centro de cada grade de Bingo.</p>
        
        <div className="flex flex-col gap-2 p-1">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 select-none">
            <input
              type="radio"
              name="centerSpaceType"
              value="star"
              checked={config.centerSpaceType === 'star' || !config.centerSpaceType}
              onChange={() => updateConfig({ centerSpaceType: 'star' })}
              className="text-slate-800 focus:ring-slate-800"
            />
            ⭐ Estrela (Padrão)
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 select-none">
            <input
              type="radio"
              name="centerSpaceType"
              value="logo"
              checked={config.centerSpaceType === 'logo'}
              onChange={() => updateConfig({ centerSpaceType: 'logo' })}
              className="text-slate-800 focus:ring-slate-800"
            />
            Logotipo do Cabeçalho
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 select-none">
            <input
              type="radio"
              name="centerSpaceType"
              value="custom"
              checked={config.centerSpaceType === 'custom'}
              onChange={() => updateConfig({ centerSpaceType: 'custom' })}
              className="text-slate-800 focus:ring-slate-800"
            />
            Logotipo Personalizado para o Centro
          </label>
        </div>

        {config.centerSpaceType === 'custom' && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 gap-4 mt-2">
            {centerLogoData ? (
              <div className="flex flex-col items-center gap-3">
                <img src={centerLogoData} alt="Center Logo Preview" className="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-white p-1" />
                <button
                  onClick={resetCenterLogo}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                >
                  <X className="w-3 h-3" /> Remover Logo do Centro
                </button>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center gap-2">
                <ImageIcon className="w-6 h-6 text-slate-400" />
                <p className="text-[10px] text-slate-500 font-medium">Nenhuma imagem carregada para o centro</p>
              </div>
            )}

            {!centerLogoData && (
              <label 
                className="text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer transition shadow-sm" 
                style={{ 
                  background: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
                  color: accentColor === '#ffffff' ? '#ffffff' : '#1e1b4b' 
                }}
              >
                Fazer Upload de Logo do Centro
                <input type="file" accept="image/*" onChange={handleCenterImageUpload} className="hidden" />
              </label>
            )}
          </div>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* Patrocinadores */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logos de Patrocinadores (Rodapé)</h3>
        
        <md-outlined-text-field
          label="Título da Seção (ex: Patrocinador)"
          value={config.sponsorsTitle}
          onInput={(e) => updateConfig({ sponsorsTitle: e.target.value.toUpperCase() })}
        />

        <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">
          {sponsorsLogos && sponsorsLogos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {sponsorsLogos.map((logo, idx) => (
                <div key={idx} className="relative group border border-slate-200 rounded-lg p-1 bg-white flex items-center justify-center h-14">
                  <img src={logo} alt={`Sponsor ${idx}`} className="max-h-full max-w-full object-contain" />
                  <button
                    onClick={() => removeSponsorsLogo(idx)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition"
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
    </div>
  );
}

export default LogoTab;
