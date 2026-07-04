import React from 'react';
import PropTypes from 'prop-types';
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
}) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <header className="no-print bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-3 flex items-center justify-between shadow-sm gap-3 flex-wrap transition-colors duration-200">
      <Brand accentColor={accentColor} />
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

HeaderBar.propTypes = {
  config: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  showThumbnails: PropTypes.bool.isRequired,
  setShowThumbnails: PropTypes.func.isRequired,
  setShowValidation: PropTypes.func.isRequired,
  setShowDrawMode: PropTypes.func.isRequired,
  setShowPrintModal: PropTypes.func.isRequired,
};

export default HeaderBar;
