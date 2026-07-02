import React from 'react';

const SponsorsSection = ({ sponsorsLogos, sponsorsTitle }) => {
  return (
    <div className="mt-2 pt-1.5 border-t-2 border-black flex flex-col items-center justify-center min-h-[45px]">
      {sponsorsLogos && sponsorsLogos.length > 0 ? (
        <div className="w-full flex flex-col items-center">
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-wider mb-1">
            {sponsorsTitle || 'PATROCINADORES'}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            {sponsorsLogos.map((logo, idx) => (
              <img key={idx} src={logo} alt={`Patrocinador ${idx + 1}`} className="max-h-[26px] max-w-[80px] object-contain" />
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-gray-400 rounded w-full py-1 text-[8px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>{sponsorsTitle || 'ESPAÇO PARA PATROCINADORES'}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
        </div>
      )}
    </div>
  );
};

export default SponsorsSection;
