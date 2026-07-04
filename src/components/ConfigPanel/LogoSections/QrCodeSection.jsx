import React from 'react';
import ImageUploadField from '../ImageUploadField';

function QrCodeSection({ config, updateConfig, qrCodeLogo, handleQrCodeImageUpload, resetQrCodeLogo, accentColor }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">QR Code (Rodapé)</h3>
      
      <md-outlined-text-field
        label="Título da Seção (ex: ESCANEIE E ACESSE)"
        value={config.qrCodeTitle || ''}
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
  );
}

export default QrCodeSection;
