import React from 'react';
import { CartelaCard } from '..';

function PrintPage({
  card1,
  card2,
  config,
  logoData,
  centerLogoData,
  sponsorsLogos,
  realizadoPorLogo,
  qrCodeLogo,
}) {
  const isObj1 = typeof card1 === 'object' && card1 !== null;
  const num1 = isObj1 ? card1.card_number : card1;
  const grids1 = isObj1 ? card1.grids : null;

  const isObj2 = typeof card2 === 'object' && card2 !== null;
  const num2 = card2 ? (isObj2 ? card2.card_number : card2) : null;
  const grids2 = card2 ? (isObj2 ? card2.grids : null) : null;

  return (
    <div className="print-page">
      <div className="print-card-wrapper">
        <CartelaCard 
          number={num1} 
          grids={grids1}
          config={config} 
          logoData={logoData} 
          centerLogoData={centerLogoData} 
          sponsorsLogos={sponsorsLogos} 
          realizadoPorLogo={realizadoPorLogo}
          qrCodeLogo={qrCodeLogo}
        />
      </div>
      <div className="print-card-wrapper">
        {card2 ? (
          <CartelaCard 
            number={num2} 
            grids={grids2}
            config={config} 
            logoData={logoData} 
            centerLogoData={centerLogoData} 
            sponsorsLogos={sponsorsLogos} 
            realizadoPorLogo={realizadoPorLogo}
            qrCodeLogo={qrCodeLogo}
          />
        ) : (
          <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs">
            Fim da Geração
          </div>
        )}
      </div>
    </div>
  );
}

export default PrintPage;
