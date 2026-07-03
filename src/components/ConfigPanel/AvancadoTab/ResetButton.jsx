import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

/**
 * @typedef {Object} ResetButtonProps
 * @property {function(): void} resetAll - Callback to reset all configurations to defaults.
 */

/**
 * ResetButton component with double-confirm UX state.
 * @param {ResetButtonProps} props
 */
function ResetButton({ resetAll }) {
  const [isConfirming, setIsConfirming] = useState(false);

  // Auto-cancel confirmation state after 4 seconds of inactivity
  useEffect(() => {
    if (!isConfirming) return;
    const timer = setTimeout(() => {
      setIsConfirming(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isConfirming]);

  const handleResetClick = () => {
    if (isConfirming) {
      if (typeof resetAll === 'function') {
        resetAll();
      }
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
    }
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setIsConfirming(false);
  };

  return (
    <div className="self-start flex items-center gap-2" data-testid="reset-button-container">
      {!isConfirming ? (
        <button
          type="button"
          onClick={handleResetClick}
          data-testid="reset-all-btn"
          aria-label="Redefinir todas as configurações para o padrão"
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Redefinir tudo para o padrão
        </button>
      ) : (
        <div 
          className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg p-1.5 transition-all animate-pulse"
          role="alert"
          data-testid="reset-confirm-dialog"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
          <span className="text-[11px] text-red-700 font-semibold">Tem certeza?</span>
          <button
            type="button"
            onClick={handleResetClick}
            data-testid="reset-confirm-yes-btn"
            className="text-[10px] font-bold uppercase bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
          >
            Sim
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            data-testid="reset-confirm-no-btn"
            aria-label="Cancelar redefinição"
            className="text-slate-500 hover:text-slate-700 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetButton;
