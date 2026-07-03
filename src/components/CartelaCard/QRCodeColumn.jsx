import React from 'react';

const QRCodeColumn = ({ qrCodeLogo, qrCodeTitle, styleText }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="text-[8px] font-black uppercase tracking-wider mb-1" style={styleText}>
        {qrCodeTitle || 'ESCANEIE E ACESSE'}
      </span>
      <div className="flex items-center justify-center w-full">
        <img src={qrCodeLogo} alt="QR Code" className="max-h-[30px] max-w-[80px] object-contain" />
      </div>
    </div>
  );
};

export default QRCodeColumn;
