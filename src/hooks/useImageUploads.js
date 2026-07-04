import { useState, useCallback, useEffect } from 'react';
import { getImage, setImage, deleteImage, clearImages } from '../utils/indexedDB';

/**
 * Creates a pair of stable handlers (handleUpload, reset) for a single image slot.
 *
 * @param {string} key - The IndexedDB key for this image.
 * @param {(value: string|null) => void} setState - The React state setter for this image.
 * @returns {{ handleUpload: (e: Event) => void, reset: () => void }}
 */
function createImageHandlers(key, setState) {
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(reader.result);
      setImage(key, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setState(null);
    deleteImage(key);
  };

  return { handleUpload, reset };
}

export function useImageUploads() {
  const [logoData, setLogoData] = useState(null);
  const [sponsorsLogos, setSponsorsLogos] = useState([]);
  const [realizadoPorLogo, setRealizadoPorLogo] = useState(null);
  const [qrCodeLogo, setQrCodeLogo] = useState(null);
  const [centerLogoData, setCenterLogoData] = useState(null);

  // Load from IndexedDB on mount
  useEffect(() => {
    async function loadStoredImages() {
      const [logo, sponsors, realizado, qrCode, centerLogo] = await Promise.all([
        getImage('logoData'),
        getImage('sponsorsLogos'),
        getImage('realizadoPorLogo'),
        getImage('qrCodeLogo'),
        getImage('centerLogoData'),
      ]);

      if (logo) setLogoData(logo);
      if (sponsors) setSponsorsLogos(sponsors);
      if (realizado) setRealizadoPorLogo(realizado);
      if (qrCode) setQrCodeLogo(qrCode);
      if (centerLogo) setCenterLogoData(centerLogo);
    }
    loadStoredImages();
  }, []);

  // ── Single-image handlers (generated via factory) ──────────────────────────
  const { handleUpload: handleImageUpload, reset: resetLogo } =
    createImageHandlers('logoData', setLogoData);

  const { handleUpload: handleCenterImageUpload, reset: resetCenterLogo } =
    createImageHandlers('centerLogoData', setCenterLogoData);

  const { handleUpload: handleRealizadoPorImageUpload, reset: resetRealizadoPorLogo } =
    createImageHandlers('realizadoPorLogo', setRealizadoPorLogo);

  const { handleUpload: handleQrCodeImageUpload, reset: resetQrCodeLogo } =
    createImageHandlers('qrCodeLogo', setQrCodeLogo);

  // ── Sponsors (multi-image) ─────────────────────────────────────────────────
  const handleSponsorsImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSponsorsLogos((prev) => {
          const next = [...prev, reader.result];
          setImage('sponsorsLogos', next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeSponsorsLogo = useCallback((idx) => {
    setSponsorsLogos((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      setImage('sponsorsLogos', next);
      return next;
    });
  }, []);

  // ── Clear all ──────────────────────────────────────────────────────────────
  const clearAllImages = useCallback(() => {
    setLogoData(null);
    setSponsorsLogos([]);
    setRealizadoPorLogo(null);
    setQrCodeLogo(null);
    setCenterLogoData(null);
    clearImages();
  }, []);

  return {
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
  };
}

export default useImageUploads;
