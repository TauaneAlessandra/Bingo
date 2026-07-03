import { useState, useCallback } from 'react';

export function useImageUploads() {
  const [logoData, setLogoData] = useState(null);
  const [sponsorsLogos, setSponsorsLogos] = useState([]);
  const [realizadoPorLogo, setRealizadoPorLogo] = useState(null);
  const [qrCodeLogo, setQrCodeLogo] = useState(null);
  const [centerLogoData, setCenterLogoData] = useState(null);

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

  const handleRealizadoPorImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setRealizadoPorLogo(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const resetRealizadoPorLogo = useCallback(() => setRealizadoPorLogo(null), []);

  const handleQrCodeImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setQrCodeLogo(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const resetQrCodeLogo = useCallback(() => setQrCodeLogo(null), []);

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
  };
}
