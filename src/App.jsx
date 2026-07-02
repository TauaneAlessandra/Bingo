import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import HeaderBar from './components/HeaderBar';
import ConfigPanel from './components/ConfigPanel';
import PreviewArea from './components/PreviewArea';
import PrintContainer from './components/PrintContainer';
import DrawMode from './components/DrawMode';
import ValidationMode from './components/ValidationMode';
import PrintModal from './components/PrintModal';
import { checkBackendStatus, getBackendConfig, saveBackendConfig, getBackendCards } from './utils/api';
import { useDebouncedCallback } from './utils/useDebounce';

// ─── LocalStorage helpers ───────────────────────────────────────────────────
const STORAGE_KEY = 'bringo-config-v2';

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConfigToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded — silent fail
  }
}

// ─── Default Config ──────────────────────────────────────────────────────────
const DEFAULT_CONFIG = {
  title: '',
  subtitle: '',
  attractions: '',
  rules: '',
  exclusiveDate: '',
  prizes: ['', '', '', ''],
  numberRange: 75,
  accentColor: '#ffffff',
  centerSpaceType: 'star',
  sponsorsTitle: '',
  multiColor: true,
};

function App() {
  const [config, setConfig] = useState(() => {
    const loaded = loadConfig() || {};
    if (loaded.accentColor === '#f59e0b') {
      loaded.accentColor = '#ffffff';
    }
    return {
      ...DEFAULT_CONFIG,
      ...loaded,
    };
  });

  const [startNum, setStartNum] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [logoData, setLogoData] = useState(null);
  const [sponsorsLogos, setSponsorsLogos] = useState([]);
  const [centerLogoData, setCenterLogoData] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Modal states
  const [showDrawMode, setShowDrawMode] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Backend states
  const [backendOnline, setBackendOnline] = useState(false);
  const [backendCards, setBackendCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(false);

  // Print states — lazy rendering
  const [printReady, setPrintReady] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const printReadyResolveRef = useRef(null);

  const refreshBackendCards = useCallback(async (currentStart = startNum, currentQty = quantity) => {
    setLoadingCards(true);
    try {
      const status = await checkBackendStatus();
      setBackendOnline(status.online);
      if (status.online) {
        const res = await getBackendCards({ start: currentStart, quantity: currentQty, limit: currentQty });
        setBackendCards(res.cards || []);
      } else {
        setBackendCards([]);
      }
    } catch (err) {
      console.error('Error fetching backend cards:', err);
      setBackendCards([]);
    } finally {
      setLoadingCards(false);
    }
  }, [startNum, quantity]);

  // ── Sync with backend config on mount ──
  useEffect(() => {
    async function syncConfig() {
      try {
        const status = await checkBackendStatus();
        setBackendOnline(status.online);
        if (status.online) {
          const dbConfig = await getBackendConfig();
          if (dbConfig) {
            setConfig(prev => ({ ...prev, ...dbConfig }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    syncConfig();
  }, []);

  // ── Debounced save to localStorage (300ms) ──
  const debouncedSaveStorage = useDebouncedCallback((cfg) => {
    saveConfigToStorage(cfg);
  }, 300);

  // ── Debounced save to backend (500ms) ──
  const debouncedSaveBackend = useDebouncedCallback((cfg) => {
    saveBackendConfig(cfg);
  }, 500);

  // ── Save config when config changes (debounced) ──
  useEffect(() => {
    debouncedSaveStorage(config);
    if (backendOnline) {
      debouncedSaveBackend(config);
    }
  }, [config, backendOnline, debouncedSaveStorage, debouncedSaveBackend]);

  // ── Reset previewIndex when quantity changes ──
  useEffect(() => {
    setPreviewIndex(prev => Math.min(prev, quantity - 1));
  }, [quantity]);

  // ── Fetch cards when range changes ──
  useEffect(() => {
    refreshBackendCards(startNum, quantity);
  }, [startNum, quantity, refreshBackendCards]);

  // ── Config helpers ──
  const updateConfig = useCallback((patch) => setConfig(prev => ({ ...prev, ...patch })), []);

  // ── Prizes array management ──
  const addPrize = useCallback(() => {
    setConfig(prev => {
      if (prev.prizes.length >= 6) return prev;
      return { ...prev, prizes: [...prev.prizes, ''] };
    });
  }, []);

  const removePrize = useCallback((idx) => {
    setConfig(prev => {
      if (prev.prizes.length <= 1) return prev;
      return { ...prev, prizes: prev.prizes.filter((_, i) => i !== idx) };
    });
  }, []);

  const updatePrize = useCallback((idx, val) => {
    setConfig(prev => {
      const next = [...prev.prizes];
      next[idx] = val.toUpperCase();
      return { ...prev, prizes: next };
    });
  }, []);

  // ── Image Upload ──
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogoData(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const resetLogo = useCallback(() => setLogoData(null), []);

  const handleSponsorsImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSponsorsLogos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeSponsorsLogo = useCallback((idx) => {
    setSponsorsLogos(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleCenterImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCenterLogoData(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const resetCenterLogo = useCallback(() => setCenterLogoData(null), []);

  const resetAll = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

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
          showThumbnails={showThumbnails}
          backendCards={useBackendData ? backendCards : null}
          backendOnline={backendOnline}
          loadingCards={loadingCards}
        />
      </div>

      {/* Print Container — only mounts children when printReady */}
      <PrintContainer
        pairedCards={pairedCards}
        config={config}
        logoData={logoData}
        centerLogoData={centerLogoData}
        sponsorsLogos={sponsorsLogos}
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
