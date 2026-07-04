import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Search, Trash2 } from 'lucide-react';

/**
 * ValidationInputs displays form controls for typing a card number,
 * a list of drawn numbers, and an interactive clickable number selector board.
 *
 * @component
 */
const ValidationInputs = memo(({
  cardNumber,
  setCardNumber,
  drawnInput,
  setDrawnInput,
  setSubmitted,
  isValidCard,
  accentColor = '#f59e0b',
  drawnNumbers = new Set(),
  numberRange = 75,
  onToggleNumber,
  onClearNumbers,
}) => {
  const handleCardNumberChange = (e) => {
    const cleanValue = e.target.value.replace(/[^0-9]/g, '');
    setCardNumber(cleanValue);
    setSubmitted(false);
  };

  const handleDrawnInputChange = (e) => {
    setDrawnInput(e.target.value);
    setSubmitted(false);
  };

  // Generate list of all possible numbers
  const allNumbers = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= numberRange; i++) {
      arr.push(i);
    }
    return arr;
  }, [numberRange]);

  return (
    <div className="flex flex-col gap-4">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Número da Cartela</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Ex: 42"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="bg-[#1b1b26] border border-[#2c2c3e] text-white rounded-xl px-4 py-3 text-lg font-mono font-bold focus:outline-none focus:border-amber-500 transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Digitados / Sorteados</label>
            {drawnNumbers.size > 0 && (
              <button
                onClick={onClearNumbers}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-wider flex items-center gap-1 transition"
              >
                <Trash2 className="w-3 h-3" />
                Limpar
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Ex: 5, 12, 33, 47, 61..."
            value={drawnInput}
            onChange={handleDrawnInputChange}
            className="bg-[#1b1b26] border border-[#2c2c3e] text-white rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Interactive Selection Board */}
      <div className="flex flex-col gap-2 bg-[#171725] p-4 rounded-xl border border-[#2c2c3e]/60">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Painel Seletor de Dezenas</span>
          <span className="text-[10px] font-mono text-slate-500">
            {drawnNumbers.size} selecionados
          </span>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-15 gap-1.5 max-h-44 overflow-y-auto pr-1">
          {allNumbers.map(num => {
            const isSelected = drawnNumbers.has(num);
            return (
              <button
                key={num}
                onClick={() => onToggleNumber(num)}
                className="w-full aspect-square flex items-center justify-center rounded-lg font-bold text-xs transition duration-200 select-none cursor-pointer"
                style={{
                  backgroundColor: isSelected ? accentColor : '#1e1e2e',
                  color: isSelected ? '#1e1b4b' : '#64748b',
                  border: isSelected ? `1px solid ${accentColor}` : '1px solid #2c2c3e',
                  boxShadow: isSelected ? `0 0 8px ${accentColor}55` : undefined
                }}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={() => setSubmitted(true)}
        disabled={!isValidCard}
        className="self-start px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: accentColor, color: '#1e1b4b' }}
      >
        <Search className="w-4 h-4" />
        Conferir Cartela #{String(cardNumber).padStart(5, '0')}
      </button>
    </div>
  );
});

ValidationInputs.displayName = 'ValidationInputs';

ValidationInputs.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  setCardNumber: PropTypes.func.isRequired,
  drawnInput: PropTypes.string.isRequired,
  setDrawnInput: PropTypes.func.isRequired,
  setSubmitted: PropTypes.func.isRequired,
  isValidCard: PropTypes.bool.isRequired,
  accentColor: PropTypes.string,
  drawnNumbers: PropTypes.instanceOf(Set),
  numberRange: PropTypes.number,
  onToggleNumber: PropTypes.func.isRequired,
  onClearNumbers: PropTypes.func.isRequired,
};

export default ValidationInputs;
