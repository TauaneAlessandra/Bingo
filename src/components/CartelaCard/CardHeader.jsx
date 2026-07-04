import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CardHeaderTitleSection from './CardHeaderTitleSection';
import CardHeaderValueSection from './CardHeaderValueSection';
import CardHeaderDetailsSection from './CardHeaderDetailsSection';

const CardHeader = memo(({ config, formattedNum, logoData, isWhiteAccent, accentColor }) => {
  return (
    <div className="border-2 border-black p-2 flex flex-col relative mb-3 print:mb-1.5">
      {/* Top Row: Title and Cartela No Box */}
      <div className="flex justify-between items-start border-b border-black pb-2">
        <CardHeaderTitleSection config={config} />
        <CardHeaderValueSection config={config} formattedNum={formattedNum} />
      </div>

      {/* Attractions, Warnings + Logo side by side */}
      <CardHeaderDetailsSection 
        config={config} 
        logoData={logoData} 
        isWhiteAccent={isWhiteAccent} 
        accentColor={accentColor} 
      />
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

CardHeader.propTypes = {
  config: PropTypes.object.isRequired,
  formattedNum: PropTypes.string.isRequired,
  logoData: PropTypes.string,
  isWhiteAccent: PropTypes.bool,
  accentColor: PropTypes.string,
};

export default CardHeader;
