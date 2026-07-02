import React from 'react';
import DefaultToucanLogo from '../DefaultToucanLogo';

const CardHeader = ({ config, formattedNum, logoData, isWhiteAccent, accentColor }) => {
  return (
    <div className="border-2 border-black p-2 flex flex-col relative mb-3 print:mb-1.5">
      {/* Top Row: Title and Cartela No Box */}
      <div className="flex justify-between items-start border-b border-black pb-2">
        <div className="flex-1 pr-2">
          <h1 className="font-outfit font-extrabold text-2xl tracking-tight leading-tight uppercase">
            {config.title || ''}
          </h1>
          <p className="text-[10px] font-semibold text-gray-700 mt-1 leading-normal">
            {config.subtitle || ''}
          </p>
        </div>
        <div className="border-l border-black flex flex-col items-center justify-center min-w-[70px] px-2 bg-gray-100">
          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600">Cartela Nº</span>
          <span className="text-xl font-bold font-mono mt-1 text-black">{formattedNum}</span>
        </div>
      </div>

      {/* Attractions, Warnings + Logo side by side */}
      <div className="pt-2 flex items-center gap-2">
        {/* Small logo on the left */}
        <div className="shrink-0 rounded-full border-2 bg-white p-0.5" style={{ borderColor: isWhiteAccent ? '#e2e8f0' : accentColor }}>
          {logoData ? (
            <img src={logoData} alt="Logo" className="w-10 h-10 rounded-full object-contain" />
          ) : (
            <DefaultToucanLogo size={40} />
          )}
        </div>
        {/* Text block */}
        <div className="flex-1 text-center">
          <p className="text-[9px] font-bold text-gray-800 leading-normal">
            {config.attractions || ''}
          </p>
          <p className="text-[9px] font-medium text-gray-700">
            {config.rules || ''}
          </p>
          {config.exclusiveDate && (
            <p className="text-[10px] font-black text-red-600 mt-1 uppercase tracking-wide">
              {config.exclusiveDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
