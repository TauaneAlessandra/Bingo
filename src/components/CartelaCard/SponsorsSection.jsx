import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlaceholderSponsors from './PlaceholderSponsors';
import SponsorsColumn from './SponsorsColumn';
import QRCodeColumn from './QRCodeColumn';
import RealizadoPorColumn from './RealizadoPorColumn';

const SponsorsSection = memo(({
  sponsorsLogos,
  sponsorsTitle,
  realizadoPorLogo,
  realizadoPorTitle,
  qrCodeLogo,
  qrCodeTitle,
  textColor,
}) => {
  const hasSponsors = sponsorsLogos && sponsorsLogos.length > 0;
  const hasRealizado = !!realizadoPorLogo;
  const hasQrCode = !!qrCodeLogo;

  const styleText = { color: textColor || '#6b7280' };

  if (!hasSponsors && !hasRealizado && !hasQrCode) {
    return (
      <PlaceholderSponsors
        sponsorsTitle={sponsorsTitle}
        styleText={styleText}
      />
    );
  }

  return (
    <div className="mt-2 pt-1.5 border-t-2 border-black flex items-stretch justify-between gap-4 min-h-[45px] w-full">
      {/* Patrocinadores */}
      {hasSponsors && (
        <SponsorsColumn
          sponsorsLogos={sponsorsLogos}
          sponsorsTitle={sponsorsTitle}
          styleText={styleText}
        />
      )}

      {/* Divider */}
      {hasSponsors && (hasQrCode || hasRealizado) && (
        <div className="w-[1.5px] bg-black self-stretch my-1" />
      )}

      {/* QR Code */}
      {hasQrCode && (
        <QRCodeColumn
          qrCodeLogo={qrCodeLogo}
          qrCodeTitle={qrCodeTitle}
          styleText={styleText}
        />
      )}

      {/* Divider */}
      {hasQrCode && hasRealizado && (
        <div className="w-[1.5px] bg-black self-stretch my-1" />
      )}

      {/* Realizado Por */}
      {hasRealizado && (
        <RealizadoPorColumn
          realizadoPorLogo={realizadoPorLogo}
          realizadoPorTitle={realizadoPorTitle}
          styleText={styleText}
        />
      )}
    </div>
  );
});

SponsorsSection.displayName = 'SponsorsSection';

SponsorsSection.propTypes = {
  sponsorsLogos: PropTypes.arrayOf(PropTypes.string),
  sponsorsTitle: PropTypes.string,
  realizadoPorLogo: PropTypes.string,
  realizadoPorTitle: PropTypes.string,
  qrCodeLogo: PropTypes.string,
  qrCodeTitle: PropTypes.string,
  textColor: PropTypes.string,
};

export default SponsorsSection;
