import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';
import TextosTab from './TextosTab';
import PremiosTab from './PremiosTab';
import CartelaTab from './CartelaTab';
import ConfigTab from './ConfigTab';
import LogoTab from './LogoTab';
import AvancadoTab from './AvancadoTab';

function ConfigPanel({
  config,
  updateConfig,
  DEFAULT_CONFIG,
  startNum,
  setStartNum,
  quantity,
  setQuantity,
  logoData,
  handleImageUpload,
  resetLogo,
  centerLogoData,
  handleCenterImageUpload,
  resetCenterLogo,
  sponsorsLogos,
  handleSponsorsImageUpload,
  removeSponsorsLogo,
  realizadoPorLogo,
  handleRealizadoPorImageUpload,
  resetRealizadoPorLogo,
  qrCodeLogo,
  handleQrCodeImageUpload,
  resetQrCodeLogo,
  addPrize,
  removePrize,
  updatePrize,
  resetAll,
}) {
  const [activeTab, setActiveTab] = useState('header');
  const tabsRef = useRef(null);

  // ── Tab Syncing ──
  useEffect(() => {
    const tabs = tabsRef.current;
    if (tabs) {
      const tabIndices = ['header', 'prizes', 'card', 'generation', 'logo', 'advanced'];
      const handleTabChange = () => setActiveTab(tabIndices[tabs.activeTabIndex] || 'header');
      tabs.addEventListener('change', handleTabChange);
      return () => tabs.removeEventListener('change', handleTabChange);
    }
  }, []);

  return (
    <aside className="no-print w-[400px] bg-white border-r border-slate-200 flex flex-col shrink-0">
      {/* Material Web Tabs */}
      <md-tabs ref={tabsRef} active-index="0" className="border-b border-slate-200">
        <md-secondary-tab inline-icon>Textos</md-secondary-tab>
        <md-secondary-tab inline-icon>Prêmios</md-secondary-tab>
        <md-secondary-tab inline-icon>Cartela</md-secondary-tab>
        <md-secondary-tab inline-icon>Config</md-secondary-tab>
        <md-secondary-tab inline-icon>Logo</md-secondary-tab>
        <md-secondary-tab inline-icon>Avançado</md-secondary-tab>
      </md-tabs>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {activeTab === 'header' && (
          <TextosTab 
            config={config} 
            updateConfig={updateConfig} 
            DEFAULT_CONFIG={DEFAULT_CONFIG} 
          />
        )}

        {activeTab === 'prizes' && (
          <PremiosTab 
            config={config} 
            addPrize={addPrize} 
            removePrize={removePrize} 
            updatePrize={updatePrize} 
          />
        )}

        {activeTab === 'card' && (
          <CartelaTab 
            config={config} 
            updateConfig={updateConfig} 
          />
        )}

        {activeTab === 'generation' && (
          <ConfigTab 
            startNum={startNum} 
            setStartNum={setStartNum} 
            quantity={quantity} 
            setQuantity={setQuantity} 
          />
        )}

        {activeTab === 'logo' && (
          <LogoTab 
            config={config} 
            updateConfig={updateConfig} 
            logoData={logoData} 
            handleImageUpload={handleImageUpload} 
            resetLogo={resetLogo} 
            centerLogoData={centerLogoData} 
            handleCenterImageUpload={handleCenterImageUpload} 
            resetCenterLogo={resetCenterLogo} 
            sponsorsLogos={sponsorsLogos} 
            handleSponsorsImageUpload={handleSponsorsImageUpload} 
            removeSponsorsLogo={removeSponsorsLogo} 
            realizadoPorLogo={realizadoPorLogo}
            handleRealizadoPorImageUpload={handleRealizadoPorImageUpload}
            resetRealizadoPorLogo={resetRealizadoPorLogo}
            qrCodeLogo={qrCodeLogo}
            handleQrCodeImageUpload={handleQrCodeImageUpload}
            resetQrCodeLogo={resetQrCodeLogo}
          />
        )}

        {activeTab === 'advanced' && (
          <AvancadoTab 
            config={config} 
            updateConfig={updateConfig} 
            DEFAULT_CONFIG={DEFAULT_CONFIG} 
            resetAll={resetAll} 
          />
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 flex justify-between items-center">
        <span>Versão 2.0.0</span>
        <span className="flex items-center font-medium">
          <Heart className="w-3.5 h-3.5 text-red-500 mr-1 fill-red-500" /> Feito por Tauane Alessandra
        </span>
      </div>
    </aside>
  );
}

ConfigPanel.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
  DEFAULT_CONFIG: PropTypes.object.isRequired,
  startNum: PropTypes.number.isRequired,
  setStartNum: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  logoData: PropTypes.string,
  handleImageUpload: PropTypes.func.isRequired,
  resetLogo: PropTypes.func.isRequired,
  centerLogoData: PropTypes.string,
  handleCenterImageUpload: PropTypes.func.isRequired,
  resetCenterLogo: PropTypes.func.isRequired,
  sponsorsLogos: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSponsorsImageUpload: PropTypes.func.isRequired,
  removeSponsorsLogo: PropTypes.func.isRequired,
  realizadoPorLogo: PropTypes.string,
  handleRealizadoPorImageUpload: PropTypes.func.isRequired,
  resetRealizadoPorLogo: PropTypes.func.isRequired,
  qrCodeLogo: PropTypes.string,
  handleQrCodeImageUpload: PropTypes.func.isRequired,
  resetQrCodeLogo: PropTypes.func.isRequired,
  addPrize: PropTypes.func.isRequired,
  removePrize: PropTypes.func.isRequired,
  updatePrize: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
};

export default ConfigPanel;
