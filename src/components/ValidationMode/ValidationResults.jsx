import React, { memo } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import MiniGrid from './MiniGrid';

/**
 * ValidationResults displays the results for each bingo grid in a card,
 * showing whether any prizes were won.
 *
 * @component
 * @param {Object} props
 * @param {number} props.cardNum - The validated card number.
 * @param {Set<number>} props.drawnNumbers - The set of currently drawn numbers.
 * @param {Array<Record<'B'|'I'|'N'|'G'|'O', Array<number|string>>>} props.grids - List of bingo grids generated for this card.
 * @param {Array<boolean>} props.gridResults - List of flags representing if each grid won.
 * @param {Array<string>} [props.prizes=[]] - Names of the prizes for each grid position.
 */
const ValidationResults = memo(({
  cardNum,
  drawnNumbers,
  grids = [],
  gridResults = [],
  prizes = []
}) => {
  const hasWonAny = gridResults.some(Boolean);
  const winCount = gridResults.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-300 font-outfit">
          Resultado — Cartela #{String(cardNum).padStart(5, '0')}
        </span>
        <span className="text-xs text-slate-500">• {drawnNumbers.size} números marcados</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {grids.map((grid, gi) => {
          const won = !!gridResults[gi];
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
        className={`p-4 rounded-xl border text-sm font-semibold flex items-center gap-3 transition-all duration-300 ${
          hasWonAny
            ? 'bg-green-500/10 border-green-500/30 text-green-300 shadow-sm shadow-green-500/5'
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
});

ValidationResults.displayName = 'ValidationResults';

export default ValidationResults;

