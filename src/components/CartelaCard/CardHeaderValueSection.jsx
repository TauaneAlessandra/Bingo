import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CardHeaderValueSection = memo(({ config, formattedNum }) => {
  return (
    <div className="border-l border-black flex items-stretch divide-x divide-black">
      {config.cardValue && (
        <div className="flex flex-col items-center justify-center min-w-[75px] px-2 bg-gray-100">
          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600">Valor</span>
          <span 
            className="whitespace-nowrap mt-1" 
            style={{ 
              fontFamily: config.cardValueFont ? `${config.cardValueFont}, sans-serif` : 'inherit',
              color: config.cardValueColor || '#000000',
              fontSize: config.cardValueSize || '14px',
              fontWeight: config.cardValueFont ? 'normal' : '700'
            }}
          >
            {config.cardValue}
          </span>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-w-[70px] px-2 bg-gray-100">
        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600">Cartela Nº</span>
        <span className="text-xl font-bold font-mono mt-1 text-black">{formattedNum}</span>
      </div>
    </div>
  );
});

CardHeaderValueSection.displayName = 'CardHeaderValueSection';

CardHeaderValueSection.propTypes = {
  config: PropTypes.object.isRequired,
  formattedNum: PropTypes.string.isRequired,
};

export default CardHeaderValueSection;
