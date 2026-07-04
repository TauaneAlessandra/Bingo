import React from 'react';
import { DrawMode, ValidationMode, PrintModal } from './index';

function AppModals({
  modals,
  config,
  quantity,
  handlePrintRequest,
  handlePrintCancel,
  printReady,
  printProgress,
}) {
  const {
    showDrawMode,
    setShowDrawMode,
    showValidation,
    setShowValidation,
    showPrintModal,
    setShowPrintModal,
  } = modals;

  return (
    <>
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
    </>
  );
}

export default AppModals;
