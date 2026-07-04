import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SponsorsColumn = memo(({ sponsorsLogos, sponsorsTitle, styleText }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="text-[8px] font-black uppercase tracking-wider mb-1" style={styleText}>
        {sponsorsTitle || 'PATROCINADORES'}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {sponsorsLogos.filter(Boolean).map((logo, idx) => (
          <img key={idx} src={logo} alt={`Patrocinador ${idx + 1}`} className="max-h-[26px] max-w-[80px] object-contain" />
        ))}
      </div>
    </div>
  );
});

SponsorsColumn.displayName = 'SponsorsColumn';

SponsorsColumn.propTypes = {
  sponsorsLogos: PropTypes.arrayOf(PropTypes.string).isRequired,
  sponsorsTitle: PropTypes.string,
  styleText: PropTypes.object,
};

export default SponsorsColumn;
