import React from 'react';
import ImageUploadField from '../ImageUploadField';

function CompanyLogoSection({ config, updateConfig, realizadoPorLogo, handleRealizadoPorImageUpload, resetRealizadoPorLogo, accentColor }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo da Empresa (Realizado Por)</h3>
      
      <md-outlined-text-field
        label="Título da Seção (ex: REALIZADO POR)"
        value={config.realizadoPorTitle || ''}
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
  );
}

export default CompanyLogoSection;
