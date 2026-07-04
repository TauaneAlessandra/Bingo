import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, FileText, Trophy, Palette, Image, Settings, Wrench } from 'lucide-react';
import TextosTab from './TextosTab';
import PremiosTab from './PremiosTab';
import CartelaTab from './CartelaTab';
import ConfigTab from './ConfigTab';
import LogoTab from './LogoTab';
import AvancadoTab from './AvancadoTab';

const TABS = [
  { id: 'header',     label: 'Textos',   Icon: FileText },
  { id: 'prizes',     label: 'Prêmios',  Icon: Trophy   },
  { id: 'card',       label: 'Cartela',  Icon: Palette  },
  { id: 'logo',       label: 'Logo',     Icon: Image    },
  { id: 'generation', label: 'Config',   Icon: Settings },
  { id: 'advanced',   label: 'Avançado', Icon: Wrench   },
];

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

  return (
    <aside className="no-print w-[380px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 transition-colors duration-200">
      {/* ── Custom Tabs ── */}
      <div className="sidebar-tabs">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sidebar-tab-btn${activeTab === id ? ' active' : ''}`}
            onClick={() => setActiveTab(id)}
            title={label}
            aria-current={activeTab === id ? 'page' : undefined}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 slide-in-left" key={activeTab}>
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

      {/* ── Sidebar Footer ── */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-[10px] text-slate-400 dark:text-slate-500 flex justify-between items-center transition-colors duration-200">
        <span className="font-mono">v2.0.0</span>
        <span className="flex items-center gap-1 font-medium">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          Feito por Tauane Alessandra
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
