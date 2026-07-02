import React from 'react';
import { Info } from 'lucide-react';

function ConfigTab({ startNum, setStartNum, quantity, setQuantity }) {
  return (
    <div className="space-y-4 flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parâmetros de Geração</h3>

      <md-outlined-text-field
        type="number"
        min="1"
        label="Número da Primeira Cartela"
        value={startNum}
        onInput={(e) => setStartNum(Math.max(1, parseInt(e.target.value) || 1))}
      />
      <md-outlined-text-field
        type="number"
        min="1"
        max="20000"
        label="Quantidade de Cartelas"
        value={quantity}
        onInput={(e) => setQuantity(Math.max(1, Math.min(20000, parseInt(e.target.value) || 1)))}
      />
      <span className="text-[11px] text-slate-500">
        Gera da cartela #{startNum} até #{startNum + quantity - 1}
      </span>

      {quantity > 2000 && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>Gerar mais de 2000 cartelas pode deixar o navegador lento na hora de imprimir.</span>
        </div>
      )}

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-amber-500" /> Dica de Impressão
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Layout configurado para <strong>2 cartelas por folha A4</strong> em modo <strong>Paisagem</strong>. Configure as margens como <em>"Nenhuma"</em> no diálogo de impressão.
        </p>
      </div>
    </div>
  );
}

export default ConfigTab;
