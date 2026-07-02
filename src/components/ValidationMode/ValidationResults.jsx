import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import MiniGrid from './MiniGrid';

export default function ValidationResults({
  cardNum,
  drawnNumbers,
  grids,
  gridResults,
  prizes
}) {
  const hasWonAny = gridResults.some(Boolean);
  const winCount = gridResults.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-300">
          Resultado — Cartela #{String(cardNum).padStart(5, '0')}
        </span>
        <span className="text-xs text-slate-500">• {drawnNumbers.size} números marcados</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {grids.map((grid, gi) => {
          const won = gridResults[gi];
          const label = prizes[gi] ? `${gi + 1}º Prêmio — ${prizes[gi]}` : `${gi + 1}º Prêmio`;

          return (
            <MiniGrid
              key={gi}
              grid={grid}
              drawnNumbers={drawnNumbers}
              won={won}
              label={label}
            />
          );
        })}
      </div>

      {/* Summary */}
      <div
        className={`p-4 rounded-xl border text-sm font-semibold flex items-center gap-3 ${
          hasWonAny
            ? 'bg-green-500/10 border-green-500/30 text-green-300'
            : 'bg-[#1b1b26] border-[#2c2c3e] text-slate-400'
        }`}
      >
        {hasWonAny ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            <span>Esta cartela ganhou {winCount} prêmio(s)!</span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-slate-500 shrink-0" />
            <span>Nenhum prêmio completo ainda com os números informados.</span>
          </>
        )}
      </div>
    </div>
  );
}
