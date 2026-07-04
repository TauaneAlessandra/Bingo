import React from 'react';
import PropTypes from 'prop-types';
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

  // Cor do botão Imprimir baseada no accentColor do usuário
  const printBg =
    accentColor === '#ffffff' ? '#1e293b' : accentColor;
  const printColor =
    accentColor === '#ffffff' ? '#ffffff' : '#1e1b4b';

  // Botão Sorteador usa accentColor como destaque
  const hasDiceAccent = accentColor !== '#ffffff';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* ── Grupo: utilitários ── */}
      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-1">


        {/* Thumbnails toggle */}
        <button
          id="btn-thumbnails"
          onClick={() => setShowThumbnails((p) => !p)}
          className={`flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-semibold transition cursor-pointer ${
            showThumbnails
              ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Mostrar miniaturas de todas as cartelas"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Miniaturas</span>
        </button>

        {/* Validator */}
        <button
          id="btn-validator"
          onClick={() => setShowValidation(true)}
          className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          title="Conferir se uma cartela é vencedora"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Conferir</span>
        </button>
      </div>

      {/* ── Grupo: ações principais ── */}
      <div className="flex items-center gap-1.5">
        {/* Draw Mode */}
        <button
          id="btn-sorteador"
          onClick={() => setShowDrawMode(true)}
          className={`flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold transition border cursor-pointer ${
            hasDiceAccent
              ? ''
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          style={
            hasDiceAccent
              ? {
                  background: accentColor + '18',
                  color: accentColor,
                  borderColor: accentColor + '40',
                }
              : undefined
          }
          title="Abrir sorteador de números"
        >
          <Dice5 className="w-4 h-4" />
          <span className="hidden sm:inline">Sorteador</span>
        </button>


        {/* Print */}
        <button
          id="btn-print"
          onClick={() => setShowPrintModal(true)}
          className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-bold transition shadow-sm cursor-pointer hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          style={{ background: printBg, color: printColor }}
          title={`Imprimir ${quantity} cartela${quantity !== 1 ? 's' : ''}`}
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir</span>
          <span
            className="inline-flex items-center justify-center text-[10px] font-bold rounded-full w-5 h-5 leading-none"
            style={{
              background:
                accentColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
              color: printColor,
            }}
          >
            {quantity}
          </span>
        </button>
      </div>
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
};

export default HeaderActions;
