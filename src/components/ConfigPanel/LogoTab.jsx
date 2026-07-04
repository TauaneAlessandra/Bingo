import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import ImageUploadField from './ImageUploadField';

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
  realizadoPorLogo,
  handleRealizadoPorImageUpload,
  resetRealizadoPorLogo,
  qrCodeLogo,
  handleQrCodeImageUpload,
  resetQrCodeLogo,
}) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <div className="space-y-6">
      {/* Logotipo do Cabeçalho */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logotipo do Cabeçalho</h3>
        <ImageUploadField
          imageData={logoData}
          onUpload={handleImageUpload}
          onReset={resetLogo}
          accentColor={accentColor}
          uploadLabel="Fazer Upload de Logo"
          placeholderText="Usando logotipo padrão do Arraiá"
          altText="Preview Logo"
        />
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
          <div className="mt-2">
            <ImageUploadField
              imageData={centerLogoData}
              onUpload={handleCenterImageUpload}
              onReset={resetCenterLogo}
              accentColor={accentColor}
              uploadLabel="Fazer Upload de Logo do Centro"
              removeLabel="Remover Logo do Centro"
              placeholderText="Nenhuma imagem carregada para o centro"
              altText="Center Logo Preview"
              imageSizeClass="w-16 h-16"
            />
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

        <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-4 bg-white">
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

      <hr className="border-slate-200" />

      {/* Realizado Por */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo da Empresa (Realizado Por)</h3>
        
        <md-outlined-text-field
          label="Título da Seção (ex: REALIZADO POR)"
          value={config.realizadoPorTitle}
          onInput={(e) => updateConfig({ realizadoPorTitle: e.target.value.toUpperCase() })}
        />

        <ImageUploadField
          imageData={realizadoPorLogo}
          onUpload={handleRealizadoPorImageUpload}
          onReset={resetRealizadoPorLogo}
          accentColor={accentColor}
          uploadLabel="Fazer Upload de Logo (Realizado Por)"
          placeholderText="Nenhum logotipo carregado"
          altText="Preview Realizado Por"
        />
      </div>

      <hr className="border-slate-200" />

      {/* QR Code */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">QR Code (Rodapé)</h3>
        
        <md-outlined-text-field
          label="Título da Seção (ex: ESCANEIE E ACESSE)"
          value={config.qrCodeTitle}
          onInput={(e) => updateConfig({ qrCodeTitle: e.target.value.toUpperCase() })}
        />

        <ImageUploadField
          imageData={qrCodeLogo}
          onUpload={handleQrCodeImageUpload}
          onReset={resetQrCodeLogo}
          accentColor={accentColor}
          uploadLabel="Fazer Upload de QR Code"
          placeholderText="Nenhum QR Code carregado"
          altText="Preview QR Code"
          removeLabel="Remover QR Code"
        />
      </div>
    </div>
  );
}

export default LogoTab;
