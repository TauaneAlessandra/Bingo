import React from 'react';
import ImageUploadField from '../ImageUploadField';

function CenterSpaceSection({ config, updateConfig, centerLogoData, handleCenterImageUpload, resetCenterLogo, accentColor }) {
  return (
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
  );
}

export default CenterSpaceSection;
