import React from 'react';
import { Search } from 'lucide-react';

export default function ValidationInputs({
  cardNumber,
  setCardNumber,
  drawnInput,
  setDrawnInput,
  setSubmitted,
  isValidCard,
  accentColor
}) {
  return (
    <>
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Número da Cartela</label>
          <input
            type="number"
            min="1"
            placeholder="Ex: 42"
            value={cardNumber}
            onChange={e => { setCardNumber(e.target.value); setSubmitted(false); }}
            className="bg-[#1b1b26] border border-[#2c2c3e] text-white rounded-xl px-4 py-3 text-lg font-mono font-bold focus:outline-none focus:border-amber-500 transition"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Números Sorteados</label>
          <input
            type="text"
            placeholder="Ex: 5, 12, 33, 47, 61..."
            value={drawnInput}
            onChange={e => { setDrawnInput(e.target.value); setSubmitted(false); }}
            className="bg-[#1b1b26] border border-[#2c2c3e] text-white rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      <button
        onClick={() => setSubmitted(true)}
        disabled={!isValidCard}
        className="self-start px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: accentColor, color: '#1e1b4b' }}
      >
        <Search className="w-4 h-4" />
        Conferir Cartela #{cardNumber.padStart ? cardNumber.padStart(5, '0') : cardNumber}
      </button>
    </>
  );
}
