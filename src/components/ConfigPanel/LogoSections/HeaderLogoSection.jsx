import React from 'react';
import ImageUploadField from '../ImageUploadField';

function HeaderLogoSection({ logoData, handleImageUpload, resetLogo, accentColor }) {
  return (
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
  );
}

export default HeaderLogoSection;
