import React from 'react';
import PropTypes from 'prop-types';
import { LayoutGrid, Search, Dice5, Printer, Sun, Moon } from 'lucide-react';

function HeaderActions({
  config,
  quantity,
  showThumbnails,
  setShowThumbnails,
  setShowValidation,
  setShowDrawMode,
  setShowPrintModal,
  darkMode,
  setDarkMode,
}) {
  const accentColor = config.accentColor || '#ffffff';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(d => !d)}
        className="flex items-center justify-center p-2.5 rounded-lg text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        title={darkMode ? 'Tema Claro' : 'Tema Escuro'}
      >
        {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Thumbnails toggle */}
      <button
        onClick={() => setShowThumbnails(p => !p)}
        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition border cursor-pointer ${
          showThumbnails 
            ? 'border-slate-800 text-slate-800 bg-slate-100 dark:border-white dark:text-white dark:bg-slate-800' 
            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Miniaturas</span>
      </button>

      {/* Validator */}
      <button
        onClick={() => setShowValidation(true)}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Conferir Cartela</span>
      </button>

      {/* Draw Mode */}
      <button
        onClick={() => setShowDrawMode(true)}
        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
          accentColor === '#ffffff' ? 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850' : ''
        }`}
        style={accentColor !== '#ffffff' ? { 
          background: accentColor + '15', 
          color: accentColor, 
          borderColor: accentColor + '33' 
        } : undefined}
      >
        <Dice5 className="w-4 h-4" />
        <span className="hidden sm:inline">Sorteador</span>
      </button>

      {/* Print */}
      <button
        onClick={() => setShowPrintModal(true)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        style={{ 
          background: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
          color: accentColor === '#ffffff' ? '#ffffff' : '#1e1b4b' 
        }}
      >
        <Printer className="w-4 h-4" />
        <span>Imprimir ({quantity})</span>
      </button>
    </div>
  );
}

HeaderActions.propTypes = {
  config: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  showThumbnails: PropTypes.bool.isRequired,
  setShowThumbnails: PropTypes.func.isRequired,
  setShowValidation: PropTypes.func.isRequired,
  setShowDrawMode: PropTypes.func.isRequired,
  setShowPrintModal: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default HeaderActions;
