import { useState, useCallback, useEffect } from 'react';
import { getImage, setImage, deleteImage, clearImages } from '../utils/indexedDB';

export function useImageUploads() {
  const [logoData, setLogoData] = useState(null);
  const [sponsorsLogos, setSponsorsLogos] = useState([]);
  const [realizadoPorLogo, setRealizadoPorLogo] = useState(null);
  const [qrCodeLogo, setQrCodeLogo] = useState(null);
  const [centerLogoData, setCenterLogoData] = useState(null);

  // Load from IndexedDB on mount
  useEffect(() => {
    async function loadStoredImages() {
      const logo = await getImage('logoData');
      const sponsors = await getImage('sponsorsLogos');
      const realizado = await getImage('realizadoPorLogo');
      const qrCode = await getImage('qrCodeLogo');
      const centerLogo = await getImage('centerLogoData');

      if (logo) setLogoData(logo);
      if (sponsors) setSponsorsLogos(sponsors);
      if (realizado) setRealizadoPorLogo(realizado);
      if (qrCode) setQrCodeLogo(qrCode);
      if (centerLogo) setCenterLogoData(centerLogo);
    }
    loadStoredImages();
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoData(reader.result);
      setImage('logoData', reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetLogo = useCallback(() => {
    setLogoData(null);
    deleteImage('logoData');
  }, []);

  const handleSponsorsImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSponsorsLogos(prev => {
          const next = [...prev, reader.result];
          setImage('sponsorsLogos', next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeSponsorsLogo = useCallback((idx) => {
    setSponsorsLogos(prev => {
      const next = prev.filter((_, i) => i !== idx);
      setImage('sponsorsLogos', next);
      return next;
    });
  }, []);

  const handleCenterImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCenterLogoData(reader.result);
      setImage('centerLogoData', reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetCenterLogo = useCallback(() => {
    setCenterLogoData(null);
    deleteImage('centerLogoData');
  }, []);

  const handleRealizadoPorImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setRealizadoPorLogo(reader.result);
      setImage('realizadoPorLogo', reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetRealizadoPorLogo = useCallback(() => {
    setRealizadoPorLogo(null);
    deleteImage('realizadoPorLogo');
  }, []);

  const handleQrCodeImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setQrCodeLogo(reader.result);
      setImage('qrCodeLogo', reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetQrCodeLogo = useCallback(() => {
    setQrCodeLogo(null);
    deleteImage('qrCodeLogo');
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
