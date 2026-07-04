import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CardHeaderTitleSection = memo(({ config }) => {
  return (
    <div className="flex-1 pr-2 text-left">
      <h1 
        className="uppercase leading-tight" 
        style={{ 
          fontFamily: config.titleFont ? `${config.titleFont}, sans-serif` : 'Outfit, sans-serif',
          color: config.titleColor || config.textColor || '#000000',
          textShadow: config.titleShadow || 'none',
          fontSize: config.titleSize || '24px',
          fontWeight: config.titleFont === 'Rock Salt' || config.titleFont === 'Grand Hotel' ? 'normal' : '800',
          letterSpacing: config.titleFont === 'Rock Salt' ? '1px' : 'normal',
          textAlign: 'left'
        }}
      >
        {config.title || ''}
      </h1>
      <p 
        className="leading-normal mt-1" 
        style={{ 
          fontFamily: config.subtitleFont ? `${config.subtitleFont}, sans-serif` : 'inherit',
          color: config.subtitleColor || config.textColor || '#374151',
          fontSize: config.subtitleSize || '10px',
          fontWeight: config.subtitleFont ? 'normal' : '600'
        }}
      >
        {config.subtitle || ''}
      </p>
    </div>
  );
});

CardHeaderTitleSection.displayName = 'CardHeaderTitleSection';

CardHeaderTitleSection.propTypes = {
  config: PropTypes.object.isRequired,
};

export default CardHeaderTitleSection;
