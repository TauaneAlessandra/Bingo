import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  HeaderBar,
  ConfigPanel,
  PreviewArea,
  PrintContainer,
  DrawMode,
  ValidationMode,
  PrintModal,
} from './components';
import { useBingoConfig, DEFAULT_CONFIG } from './hooks/useBingoConfig';
import { useImageUploads } from './hooks/useImageUploads';

function App() {
  const {
    config,
    updateConfig,
    addPrize,
    removePrize,
    updatePrize,
    resetAll,
  } = useBingoConfig();

  const {
    logoData,
    sponsorsLogos,
    realizadoPorLogo,
    qrCodeLogo,
    centerLogoData,
    handleImageUpload,
    resetLogo,
    handleSponsorsImageUpload,
    removeSponsorsLogo,
    handleCenterImageUpload,
    resetCenterLogo,
    handleRealizadoPorImageUpload,
    resetRealizadoPorLogo,
    handleQrCodeImageUpload,
    resetQrCodeLogo,
    clearAllImages,
  } = useImageUploads();

  const [startNum, setStartNum] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  // Force light mode on load
  useEffect(() => {
    try {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('bringo-theme');
    } catch {
      // ignore
    }
  }, []);

  // Modal states
  const [showDrawMode, setShowDrawMode] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Print states — lazy rendering
  const [printReady, setPrintReady] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);

  // Reset both configurations (localStorage) and images (IndexedDB)
  const handleResetAll = useCallback(() => {
    resetAll();
    clearAllImages();
  }, [resetAll, clearAllImages]);

  // ── Reset previewIndex when quantity changes ──
  useEffect(() => {
    setPreviewIndex(prev => Math.min(prev, quantity - 1));
  }, [quantity]);

  // ── Card Numbers / Objects Pairing (MEMOIZED) ──
  const pairedCards = useMemo(() => {
    const pairs = [];
    const endNum = startNum + quantity - 1;
    for (let i = startNum; i <= endNum; i += 2) {
      pairs.push([i, (i + 1 <= endNum) ? i + 1 : null]);
    }
    return pairs;
  }, [startNum, quantity]);

  // ── Print Flow ──
  const handlePrintRequest = useCallback(() => {
    setPrintReady(true);
    setPrintProgress(0);
  }, []);

  const handlePrintReady = useCallback(() => {
    // Called by PrintContainer when all batches are rendered
    setTimeout(() => {
      window.print();
      setPrintReady(false);
      setPrintProgress(0);
      setShowPrintModal(false);
    }, 300);
  }, []);

  const handlePrintCancel = useCallback(() => {
    setPrintReady(false);
    setPrintProgress(0);
    setShowPrintModal(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-roboto text-slate-900 bg-white transition-colors duration-250">
      {/* Header Bar */}
      <HeaderBar
        config={config}
        quantity={quantity}
        showThumbnails={showThumbnails}
        setShowThumbnails={setShowThumbnails}
        setShowValidation={setShowValidation}
        setShowDrawMode={setShowDrawMode}
        setShowPrintModal={setShowPrintModal}
      />

      {/* Main Content */}
      <div className="no-print flex-1 flex overflow-hidden">
        {/* Left Config Panel */}
        <ConfigPanel
          config={config}
          updateConfig={updateConfig}
          DEFAULT_CONFIG={DEFAULT_CONFIG}
          startNum={startNum}
          setStartNum={setStartNum}
          quantity={quantity}
          setQuantity={setQuantity}
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
          addPrize={addPrize}
          removePrize={removePrize}
          updatePrize={updatePrize}
          resetAll={handleResetAll}
        />

        {/* Right Preview Area */}
        <PreviewArea
          previewIndex={previewIndex}
          setPreviewIndex={setPreviewIndex}
          quantity={quantity}
          startNum={startNum}
          config={config}
          logoData={logoData}
          centerLogoData={centerLogoData}
          sponsorsLogos={sponsorsLogos}
          realizadoPorLogo={realizadoPorLogo}
          qrCodeLogo={qrCodeLogo}
          showThumbnails={showThumbnails}
          backendCards={null}
          backendOnline={false}
          loadingCards={false}
          zoom={zoom}
          setZoom={setZoom}
        />
      </div>

      {/* Print Container — only mounts children when printReady */}
      <PrintContainer
        pairedCards={pairedCards}
        config={config}
        logoData={logoData}
        centerLogoData={centerLogoData}
        sponsorsLogos={sponsorsLogos}
        realizadoPorLogo={realizadoPorLogo}
        qrCodeLogo={qrCodeLogo}
        printReady={printReady}
        onProgress={setPrintProgress}
        onReady={handlePrintReady}
      />

      {/* Modals */}
      {showDrawMode && (
        <DrawMode
          onClose={() => setShowDrawMode(false)}
          numberRange={config.numberRange}
          accentColor={config.accentColor}
        />
      )}

      {showValidation && (
        <ValidationMode
          onClose={() => setShowValidation(false)}
          numberRange={config.numberRange}
          accentColor={config.accentColor}
          prizes={config.prizes}
        />
      )}

      {showPrintModal && (
        <PrintModal
          quantity={quantity}
          onConfirm={handlePrintRequest}
          onClose={handlePrintCancel}
          printReady={printReady}
          printProgress={printProgress}
        />
      )}
    </div>
  );
}

export default App;
