import React from 'react';
import { DefaultToucanLogo } from '..';

const CardHeaderDetailsSection = ({ config, logoData, isWhiteAccent, accentColor }) => {
  return (
    <div className="pt-2 flex items-center gap-2">
      {/* Small logo on the left */}
      <div className="shrink-0 rounded border-2 bg-white p-0.5" style={{ borderColor: isWhiteAccent ? '#e2e8f0' : accentColor }}>
        {logoData ? (
          <img src={logoData} alt="Logo" className="w-10 h-10 rounded object-contain" />
        ) : (
          <DefaultToucanLogo size={40} />
        )}
      </div>
      {/* Text block */}
      <div className="flex-1 text-left pl-2">
        <p 
          className="leading-normal" 
          style={{ 
            fontFamily: config.attractionsFont ? `${config.attractionsFont}, sans-serif` : 'inherit',
            color: config.attractionsColor || config.textColor || '#1f2937',
            fontSize: config.attractionsSize || '9px',
            fontWeight: config.attractionsFont ? 'normal' : '700'
          }}
        >
          {config.attractions || ''}
        </p>
        <p 
          className="leading-normal" 
          style={{ 
            fontFamily: config.rulesFont ? `${config.rulesFont}, sans-serif` : 'inherit',
            color: config.rulesColor || config.textColor || '#374151',
            fontSize: config.rulesSize || '9px',
            fontWeight: config.rulesFont ? 'normal' : '500'
          }}
        >
          {config.rules || ''}
        </p>
        {config.confira?.trim() && (
          <p 
            className="leading-normal mt-0.5" 
            style={{ 
              fontFamily: config.confiraFont ? `${config.confiraFont}, sans-serif` : 'inherit',
              color: config.confiraColor || config.textColor || '#334155',
              fontSize: config.confiraSize || '9px',
              fontWeight: config.confiraFont ? 'normal' : '600'
            }}
          >
            <span className="font-bold" style={{ color: config.confiraColor || config.textColor || '#111827' }}>Confira:</span> {config.confira}
          </p>
        )}
        {config.exclusiveDate?.trim() && (
          <p 
            className="mt-1 uppercase tracking-wide" 
            style={{ 
              fontFamily: config.exclusiveDateFont ? `${config.exclusiveDateFont}, sans-serif` : 'inherit',
              color: config.exclusiveDateColor || config.warningColor || '#dc2626',
              fontSize: config.exclusiveDateSize || '10px',
              fontWeight: config.exclusiveDateFont ? 'normal' : '900'
            }}
          >
            {config.exclusiveDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardHeaderDetailsSection;
