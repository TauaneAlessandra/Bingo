import React from 'react';
import PropTypes from 'prop-types';
import { Plus, Trash2, Trophy } from 'lucide-react';

function PrizeInput({ idx, value, updatePrize }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[11px] font-bold text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: `hsl(${idx * 42}, 70%, 50%)` }}
      >
        {idx + 1}
      </span>
      <div className="flex-1">
        <md-outlined-text-field
          label={`${idx + 1}º Prêmio`}
          value={value}
          onInput={(e) => updatePrize(idx, e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}

PrizeInput.propTypes = {
  idx: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  updatePrize: PropTypes.func.isRequired,
};

function PremiosTab({ config, addPrize, removePrize, updatePrize }) {
  const canAdd = config.prizes.length < 6;
  const canRemove = config.prizes.length > 1;

  return (
    <div className="space-y-4 flex flex-col">
      <div className="section-card">
        <div className="flex items-center justify-between">
          <div className="section-card-title">
            <Trophy size={14} />
            Prêmios do Bingo
          </div>
          <button
            id="btn-add-prize"
            onClick={addPrize}
            disabled={!canAdd}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {config.prizes.map((prize, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <div className="flex-1">
                <PrizeInput idx={idx} value={prize} updatePrize={updatePrize} />
              </div>
              <button
                onClick={() => removePrize(idx)}
                disabled={!canRemove}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-400 dark:hover:text-red-400 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Remover prêmio"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
          {canAdd
            ? `${config.prizes.length}/6 prêmios · Você pode adicionar ${6 - config.prizes.length} mais`
            : `Limite máximo de 6 prêmios atingido`}
        </p>
      </div>

      <div className="px-3 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl">
        <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
          💡 Cada prêmio corresponde a uma grade BINGO na cartela. A ordem define a cor de cada grade na aba <strong>Cartela</strong>.
        </p>
      </div>
    </div>
  );
}

PremiosTab.propTypes = {
  config: PropTypes.object.isRequired,
  addPrize: PropTypes.func.isRequired,
  removePrize: PropTypes.func.isRequired,
  updatePrize: PropTypes.func.isRequired,
};

export default PremiosTab;
