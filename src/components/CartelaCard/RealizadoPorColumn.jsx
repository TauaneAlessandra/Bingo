import React from 'react';

const RealizadoPorColumn = ({ realizadoPorLogo, realizadoPorTitle, styleText }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="text-[8px] font-black uppercase tracking-wider mb-1" style={styleText}>
        {realizadoPorTitle || 'REALIZADO POR'}
      </span>
      <div className="flex items-center justify-center w-full">
        <img src={realizadoPorLogo} alt="Realizado Por" className="max-h-[26px] max-w-[80px] object-contain" />
      </div>
    </div>
  );
};

export default RealizadoPorColumn;
