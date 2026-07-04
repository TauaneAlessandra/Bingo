import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HeaderBar, ConfigPanel, PreviewArea, PrintContainer, AppModals } from './components';
import { useBingoConfig, DEFAULT_CONFIG } from './hooks/useBingoConfig';
import { useImageUploads } from './hooks/useImageUploads';
import { useAppModals } from './hooks/useAppModals';
import { usePrintFlow } from './hooks/usePrintFlow';

function App() {
  const { config, updateConfig, addPrize, removePrize, updatePrize, resetAll } = useBingoConfig();
  const imageUploads = { ...useImageUploads() };
  const modals = useAppModals();
  const { setShowThumbnails, setShowValidation, setShowDrawMode, setShowPrintModal, showThumbnails } = modals;

  const [startNum, setStartNum] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [zoom, setZoom] = useState(100);

  const {
    printReady, printProgress, setPrintProgress, handlePrintRequest, handlePrintReady, handlePrintCancel
  } = usePrintFlow(setShowPrintModal);

  useEffect(() => {
    try {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('bringo-theme');
    } catch {}
  }, []);

  useEffect(() => {
    setPreviewIndex(prev => Math.min(prev, quantity - 1));
  }, [quantity]);

  const pairedCards = useMemo(() => {
    const pairs = [];
    const endNum = startNum + quantity - 1;
    for (let i = startNum; i <= endNum; i += 2) {
      pairs.push([i, (i + 1 <= endNum) ? i + 1 : null]);
    }
    return pairs;
  }, [startNum, quantity]);

  const handleResetAll = useCallback(() => {
    resetAll();
    imageUploads.clearAllImages();
  }, [resetAll, imageUploads.clearAllImages]);

  return (
    <div className="min-h-screen flex flex-col font-roboto text-slate-900 bg-white transition-colors duration-250">
      <HeaderBar
        config={config} quantity={quantity} showThumbnails={showThumbnails}
        setShowThumbnails={setShowThumbnails} setShowValidation={setShowValidation}
        setShowDrawMode={setShowDrawMode} setShowPrintModal={setShowPrintModal}
      />

      <div className="no-print flex-1 flex overflow-hidden">
        <ConfigPanel
          config={config} updateConfig={updateConfig} DEFAULT_CONFIG={DEFAULT_CONFIG}
          startNum={startNum} setStartNum={setStartNum} quantity={quantity} setQuantity={setQuantity}
          addPrize={addPrize} removePrize={removePrize} updatePrize={updatePrize} resetAll={handleResetAll}
          {...imageUploads}
        />

        <PreviewArea
          previewIndex={previewIndex} setPreviewIndex={setPreviewIndex} quantity={quantity} startNum={startNum}
          config={config} showThumbnails={showThumbnails} backendCards={null} backendOnline={false}
          loadingCards={false} zoom={zoom} setZoom={setZoom} {...imageUploads}
        />
      </div>

      <PrintContainer
        pairedCards={pairedCards} config={config} printReady={printReady}
        onProgress={setPrintProgress} onReady={handlePrintReady} {...imageUploads}
      />

      <AppModals
        modals={modals} config={config} quantity={quantity} handlePrintRequest={handlePrintRequest}
        handlePrintCancel={handlePrintCancel} printReady={printReady} printProgress={printProgress}
      />
    </div>
  );
}

export default App;
