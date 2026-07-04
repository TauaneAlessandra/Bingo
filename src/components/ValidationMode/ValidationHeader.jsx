import React, { memo } from 'react';
import { X } from 'lucide-react';

/**
 * ValidationHeader displays the modal title, description, and the close button.
 *
 * @component
 * @param {Object} props
 * @param {() => void} props.onClose - Function callback invoked when closing the modal.
 * @param {string} [props.accentColor='#f59e0b'] - Color used for styling the header icon background.
 */
const ValidationHeader = memo(({ onClose, accentColor = '#f59e0b' }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e]">
      <div className="flex items-center gap-3">
        <div 
          className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-inner" 
          style={{ background: accentColor }}
        >
          🔍
        </div>
        <div>
          <h2 className="font-outfit font-bold text-white text-lg">Conferidor de Cartelas</h2>
          <p className="text-xs text-slate-400">Digite a cartela e os números sorteados</p>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="p-2 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white"
        aria-label="Fechar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
});

ValidationHeader.displayName = 'ValidationHeader';

export default ValidationHeader;

