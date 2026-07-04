import React, { memo } from 'react';
import { Search } from 'lucide-react';

/**
 * ValidationInputs displays form controls for typing a card number
 * and the list of drawn numbers, triggering the check.
 *
 * @component
 * @param {Object} props
 * @param {string} props.cardNumber - Current value of the card number input.
 * @param {(val: string) => void} props.setCardNumber - Setter for card number.
 * @param {string} props.drawnInput - Current value of the drawn numbers input.
 * @param {(val: string) => void} props.setDrawnInput - Setter for drawn numbers string.
 * @param {(val: boolean) => void} props.setSubmitted - Setter for submission status.
 * @param {boolean} props.isValidCard - Derived state checking if card number is valid.
 * @param {string} [props.accentColor='#f59e0b'] - Accent color styling for the search button.
 */
const ValidationInputs = memo(({
  cardNumber,
  setCardNumber,
  drawnInput,
  setDrawnInput,
  setSubmitted,
  isValidCard,
  accentColor = '#f59e0b'
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

  return (
    <>
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
          <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Números Sorteados</label>
          <input
            type="text"
            placeholder="Ex: 5, 12, 33, 47, 61..."
            value={drawnInput}
            onChange={handleDrawnInputChange}
            className="bg-[#1b1b26] border border-[#2c2c3e] text-white rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      <button
        onClick={() => setSubmitted(true)}
        disabled={!isValidCard}
        className="self-start px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        style={{ background: accentColor, color: '#1e1b4b' }}
      >
        <Search className="w-4 h-4" />
        Conferir Cartela #{String(cardNumber).padStart(5, '0')}
      </button>
    </>
  );
});

ValidationInputs.displayName = 'ValidationInputs';

export default ValidationInputs;

