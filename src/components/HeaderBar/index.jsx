import React from 'react';
import Brand from './Brand';
import HeaderActions from './HeaderActions';

function HeaderBar({
  config,
  quantity,
  showThumbnails,
  setShowThumbnails,
  setShowValidation,
  setShowDrawMode,
  setShowPrintModal,
  backendOnline,
}) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <header className="no-print bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between shadow-sm gap-3 flex-wrap">
      <Brand accentColor={accentColor} backendOnline={backendOnline} />

      <HeaderActions
        config={config}
        quantity={quantity}
        showThumbnails={showThumbnails}
        setShowThumbnails={setShowThumbnails}
        setShowValidation={setShowValidation}
        setShowDrawMode={setShowDrawMode}
        setShowPrintModal={setShowPrintModal}
      />
    </header>
  );
}

export default HeaderBar;

