import React from 'react';

export default function PrintPreparing({ quantity, progress }) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
      <div className="text-center">
        <p className="text-white font-semibold">Preparando impressão...</p>
        <p className="text-slate-400 text-sm mt-1">Renderizando {quantity} cartelas</p>
      </div>
      <div className="w-full">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progresso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
