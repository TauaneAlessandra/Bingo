import React from 'react';
import { Printer, AlertTriangle } from 'lucide-react';

export default function PrintConfirm({ quantity, isLarge, onClose, onConfirmPrint }) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-[#1b1b26] rounded-xl p-4 border border-[#2c2c3e] flex items-center gap-3">
          <Printer className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">{quantity} cartelas selecionadas</p>
            <p className="text-slate-400 text-xs mt-0.5">
              {Math.ceil(quantity / 2)} páginas A4 • Paisagem • 2 cartelas/folha
            </p>
          </div>
        </div>

        {isLarge && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-amber-300 text-xs leading-relaxed">
              <strong>Atenção:</strong> {quantity} cartelas podem demorar alguns segundos para renderizar. O navegador pode ficar lento momentaneamente.
            </p>
          </div>
        )}

        <div className="bg-[#1b1b26] rounded-xl p-3 border border-[#2c2c3e] text-xs text-slate-400 leading-relaxed">
          💡 <strong className="text-slate-300">Dica:</strong> No diálogo de impressão, selecione <em>"Paisagem"</em> e margens <em>"Nenhuma"</em>. Para salvar como PDF, escolha <em>"Salvar como PDF"</em> como destino.
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[#2c2c3e] text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition">
          Cancelar
        </button>
        <button
          onClick={onConfirmPrint}
          className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Confirmar
        </button>
      </div>
    </>
  );
}
