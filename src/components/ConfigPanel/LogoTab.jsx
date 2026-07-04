import React from 'react';
import HeaderLogoSection from './LogoSections/HeaderLogoSection';
import CenterSpaceSection from './LogoSections/CenterSpaceSection';
import SponsorsSection from './LogoSections/SponsorsSection';
import CompanyLogoSection from './LogoSections/CompanyLogoSection';
import QrCodeSection from './LogoSections/QrCodeSection';

function LogoTab({
  config, updateConfig, logoData, handleImageUpload, resetLogo, centerLogoData,
  handleCenterImageUpload, resetCenterLogo, sponsorsLogos, handleSponsorsImageUpload,
  removeSponsorsLogo, realizadoPorLogo, handleRealizadoPorImageUpload, resetRealizadoPorLogo,
  qrCodeLogo, handleQrCodeImageUpload, resetQrCodeLogo
}) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <div className="space-y-6">
      <HeaderLogoSection
        logoData={logoData} handleImageUpload={handleImageUpload} resetLogo={resetLogo} accentColor={accentColor}
      />
      <hr className="border-slate-200" />
      
      <CenterSpaceSection
        config={config} updateConfig={updateConfig} centerLogoData={centerLogoData}
        handleCenterImageUpload={handleCenterImageUpload} resetCenterLogo={resetCenterLogo} accentColor={accentColor}
      />
      <hr className="border-slate-200" />
      
      <SponsorsSection
        config={config} updateConfig={updateConfig} sponsorsLogos={sponsorsLogos}
        handleSponsorsImageUpload={handleSponsorsImageUpload} removeSponsorsLogo={removeSponsorsLogo} accentColor={accentColor}
      />
      <hr className="border-slate-200" />
      
      <CompanyLogoSection
        config={config} updateConfig={updateConfig} realizadoPorLogo={realizadoPorLogo}
        handleRealizadoPorImageUpload={handleRealizadoPorImageUpload} resetRealizadoPorLogo={resetRealizadoPorLogo} accentColor={accentColor}
      />
      <hr className="border-slate-200" />
      
      <QrCodeSection
        config={config} updateConfig={updateConfig} qrCodeLogo={qrCodeLogo}
        handleQrCodeImageUpload={handleQrCodeImageUpload} resetQrCodeLogo={resetQrCodeLogo} accentColor={accentColor}
      />
    </div>
  );
}

export default LogoTab;
