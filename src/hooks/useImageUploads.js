import { useState, useCallback, useEffect } from 'react';
import { getImage, setImage, clearImages } from '../utils/indexedDB';
import { createImageHandlers } from './imageUploadHandlers';

export function useImageUploads() {
  const [logoData, setLogoData] = useState(null);
  const [sponsorsLogos, setSponsorsLogos] = useState([]);
  const [realizadoPorLogo, setRealizadoPorLogo] = useState(null);
  const [qrCodeLogo, setQrCodeLogo] = useState(null);
  const [centerLogoData, setCenterLogoData] = useState(null);

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

  const { handleUpload: handleImageUpload, reset: resetLogo } =
    createImageHandlers('logoData', setLogoData);

  const { handleUpload: handleCenterImageUpload, reset: resetCenterLogo } =
    createImageHandlers('centerLogoData', setCenterLogoData);

  const { handleUpload: handleRealizadoPorImageUpload, reset: resetRealizadoPorLogo } =
    createImageHandlers('realizadoPorLogo', setRealizadoPorLogo);

  const { handleUpload: handleQrCodeImageUpload, reset: resetQrCodeLogo } =
    createImageHandlers('qrCodeLogo', setQrCodeLogo);

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

  const clearAllImages = useCallback(() => {
    setLogoData(null);
    setSponsorsLogos([]);
    setRealizadoPorLogo(null);
    setQrCodeLogo(null);
    setCenterLogoData(null);
    clearImages();
  }, []);

  return {
    logoData, sponsorsLogos, realizadoPorLogo, qrCodeLogo, centerLogoData,
    handleImageUpload, resetLogo, handleSponsorsImageUpload, removeSponsorsLogo,
    handleCenterImageUpload, resetCenterLogo, handleRealizadoPorImageUpload,
    resetRealizadoPorLogo, handleQrCodeImageUpload, resetQrCodeLogo, clearAllImages,
  };
}

export default useImageUploads;
