import React from 'react';
import { X } from 'lucide-react';

function DrawModeHeader({ onClose, remaining, total, accentColor }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e]">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-inner"
          style={{ background: accentColor }}
        >
          🎱
        </div>
        <div>
          <h2 className="font-outfit font-bold text-white text-lg leading-snug">Sorteador de Bingo</h2>
          <p className="text-xs text-slate-400">
            {remaining} números restantes de {total}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default DrawModeHeader;
