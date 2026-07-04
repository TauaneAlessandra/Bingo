import { useState, useCallback } from 'react';

export function usePrintFlow(setShowPrintModal) {
  const [printReady, setPrintReady] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);

  const handlePrintRequest = useCallback(() => {
    setPrintReady(true);
    setPrintProgress(0);
  }, []);

  const handlePrintReady = useCallback(() => {
    setTimeout(() => {
      window.print();
      setPrintReady(false);
      setPrintProgress(0);
      setShowPrintModal(false);
    }, 300);
  }, [setShowPrintModal]);

  const handlePrintCancel = useCallback(() => {
    setPrintReady(false);
    setPrintProgress(0);
    setShowPrintModal(false);
  }, [setShowPrintModal]);

  return {
    printReady,
    printProgress,
    setPrintProgress,
    handlePrintRequest,
    handlePrintReady,
    handlePrintCancel,
  };
}
