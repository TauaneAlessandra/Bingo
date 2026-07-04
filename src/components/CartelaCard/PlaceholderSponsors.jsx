import React, { memo } from 'react';
import PropTypes from 'prop-types';

const PlaceholderSponsors = memo(({ sponsorsTitle, styleText }) => {
  return (
    <div className="mt-2 pt-1.5 border-t-2 border-black flex flex-col items-center justify-center min-h-[45px]">
      <div className="border border-dashed border-gray-400 rounded w-full py-1 text-[8px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5" style={styleText}>
        <span className="w-1 h-1 rounded-full bg-current"></span>
        <span>{sponsorsTitle || 'ESPAÇO PARA PATROCINADORES'}</span>
        <span className="w-1 h-1 rounded-full bg-current"></span>
      </div>
    </div>
  );
});

PlaceholderSponsors.displayName = 'PlaceholderSponsors';

PlaceholderSponsors.propTypes = {
  sponsorsTitle: PropTypes.string,
  styleText: PropTypes.object,
};

export default PlaceholderSponsors;
