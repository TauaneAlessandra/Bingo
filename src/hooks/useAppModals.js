import { useState } from 'react';

export function useAppModals() {
  const [showDrawMode, setShowDrawMode] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  return {
    showDrawMode,
    setShowDrawMode,
    showValidation,
    setShowValidation,
    showPrintModal,
    setShowPrintModal,
    showThumbnails,
    setShowThumbnails,
  };
}
