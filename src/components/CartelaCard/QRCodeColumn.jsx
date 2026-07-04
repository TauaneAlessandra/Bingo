import React, { memo } from 'react';
import PropTypes from 'prop-types';

const QRCodeColumn = memo(({ qrCodeLogo, qrCodeTitle, styleText }) => {
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
});

QRCodeColumn.displayName = 'QRCodeColumn';

QRCodeColumn.propTypes = {
  qrCodeLogo: PropTypes.string.isRequired,
  qrCodeTitle: PropTypes.string,
  styleText: PropTypes.object,
};

export default QRCodeColumn;
