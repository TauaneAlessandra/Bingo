import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useDebouncedCallback } from '../../utils/useDebounce';

// Individual prize input with local state + debounced sync
function PrizeInput({ idx, value, updatePrize }) {
  const [localVal, setLocalVal] = useState(value);

  useEffect(() => { setLocalVal(value); }, [value]);

  const debouncedUpdate = useDebouncedCallback((v) => updatePrize(idx, v), 300);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-500 w-4 shrink-0">{idx + 1}º</span>
      <div className="flex-1">
        <md-outlined-text-field
          label={`${idx + 1}º Prêmio`}
          value={localVal}
          onInput={(e) => {
            setLocalVal(e.target.value);
            debouncedUpdate(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

function PremiosTab({ config, addPrize, removePrize, updatePrize }) {
  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prêmios do Bingo</h3>
        <button
          onClick={addPrize}
          disabled={config.prizes.length >= 6}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition disabled:opacity-40"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar
        </button>
      </div>

      {config.prizes.map((prize, idx) => (
        <div key={idx} className="flex items-center gap-0">
          <div className="flex-1">
            <PrizeInput idx={idx} value={prize} updatePrize={updatePrize} />
          </div>
          <button
            onClick={() => removePrize(idx)}
            disabled={config.prizes.length <= 1}
            className="p-1.5 text-slate-600 hover:text-red-400 transition disabled:opacity-30"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <p className="text-[10px] text-slate-500">
        Máximo de 6 prêmios. A cartela exibe {config.prizes.length} grade(s) BINGO.
      </p>
    </div>
  );
}

export default PremiosTab;

