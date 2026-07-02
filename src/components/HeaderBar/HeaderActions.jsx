import React from 'react';
import { LayoutGrid, Search, Dice5, Printer } from 'lucide-react';

function HeaderActions({
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
    <div className="flex items-center gap-2 flex-wrap">
      {/* Thumbnails toggle */}
      <button
        onClick={() => setShowThumbnails(p => !p)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition border ${
          showThumbnails 
            ? 'border-slate-800 text-slate-800 bg-slate-100' 
            : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Miniaturas</span>
      </button>

      {/* Validator */}
      <button
        onClick={() => setShowValidation(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Conferir Cartela</span>
      </button>

      {/* Draw Mode */}
      <button
        onClick={() => setShowDrawMode(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition border"
        style={{ 
          background: accentColor === '#ffffff' ? '#f1f5f9' : accentColor + '15', 
          color: accentColor === '#ffffff' ? '#1e293b' : accentColor, 
          borderColor: accentColor === '#ffffff' ? '#cbd5e1' : accentColor + '33' 
        }}
      >
        <Dice5 className="w-4 h-4" />
        <span className="hidden sm:inline">Sorteador</span>
      </button>

      {/* Print */}
      <button
        onClick={() => setShowPrintModal(true)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm"
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

export default HeaderActions;
