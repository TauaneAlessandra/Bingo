import React from 'react';
import { X, Printer } from 'lucide-react';

export default function PrintHeader({ onClose, showCloseButton }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-amber-500/20 p-2 rounded-xl">
          <Printer className="w-5 h-5 text-amber-400" />
        </div>
        <h2 className="font-outfit font-bold text-white text-base">Imprimir Cartelas</h2>
      </div>
      {showCloseButton && (
        <button onClick={onClose} className="text-slate-500 hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
