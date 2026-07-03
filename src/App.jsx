import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import HeaderBar from './components/HeaderBar';
import ConfigPanel from './components/ConfigPanel';
import PreviewArea from './components/PreviewArea';
import PrintContainer from './components/PrintContainer';
import DrawMode from './components/DrawMode';
import ValidationMode from './components/ValidationMode';
import PrintModal from './components/PrintModal';
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
  } = useImageUploads();

  const [startNum, setStartNum] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [zoom, setZoom] = useState(100);

  // Modal states
  const [showDrawMode, setShowDrawMode] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Backend states (disabled)
  const backendOnline = false;
  const backendCards = [];
  const loadingCards = false;

  // Print states — lazy rendering
  const [printReady, setPrintReady] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);

  const refreshBackendCards = useCallback(async (currentStart = startNum, currentQty = quantity) => {
    // No-op since backend is disabled
  }, []);

  // ── Reset previewIndex when quantity changes ──
  useEffect(() => {
    setPreviewIndex(prev => Math.min(prev, quantity - 1));
  }, [quantity]);

  // ── Fetch cards when range changes ──
  useEffect(() => {
    refreshBackendCards(startNum, quantity);
  }, [startNum, quantity, refreshBackendCards]);

  // ── Card Numbers / Objects Pairing (MEMOIZED) ──
  const useBackendData = backendOnline && backendCards.length === quantity;

  const pairedCards = useMemo(() => {
    const pairs = [];
    if (useBackendData) {
      for (let i = 0; i < backendCards.length; i += 2) {
        pairs.push([backendCards[i], backendCards[i + 1] || null]);
      }
    } else {
      const endNum = startNum + quantity - 1;
      for (let i = startNum; i <= endNum; i += 2) {
        pairs.push([i, (i + 1 <= endNum) ? i + 1 : null]);
      }
    }
    return pairs;
  }, [useBackendData, backendCards, startNum, quantity]);

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
    <div className="min-h-screen flex flex-col font-roboto text-slate-800 bg-[#f8fafc]">
      {/* Header Bar */}
      <HeaderBar
        config={config}
        quantity={quantity}
        showThumbnails={showThumbnails}
        setShowThumbnails={setShowThumbnails}
        setShowValidation={setShowValidation}
        setShowDrawMode={setShowDrawMode}
        setShowPrintModal={setShowPrintModal}
        backendOnline={backendOnline}
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
          resetAll={resetAll}
          refreshCards={refreshBackendCards}
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
          backendCards={useBackendData ? backendCards : null}
          backendOnline={backendOnline}
          loadingCards={loadingCards}
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
