import React, { useState, useMemo, useEffect } from 'react';
import { generateBingoNumbers } from '../../utils/bingo';
import ValidationHeader from './ValidationHeader';
import ValidationInputs from './ValidationInputs';
import ValidationResults from './ValidationResults';
import { checkGridWin } from './utils';

export default function ValidationMode({ onClose, numberRange = 75, accentColor = '#f59e0b', prizes = [] }) {
  const [cardNumber, setCardNumber] = useState('');
  const [drawnInput, setDrawnInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [backendGrids, setBackendGrids] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cardNum = parseInt(cardNumber);
  const isValidCard = !isNaN(cardNum) && cardNum > 0;

  // Parse drawn numbers from comma/space separated input
  const drawnNumbers = useMemo(() => {
    if (!drawnInput) return new Set();
    return new Set(
      drawnInput.split(/[\s,;]+/)
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n) && n >= 1 && n <= numberRange)
    );
  }, [drawnInput, numberRange]);

  // Load card from backend is disabled
  useEffect(() => {
    setBackendGrids(null);
    setErrorMsg('');
  }, [cardNum, isValidCard, submitted]);

  const grids = useMemo(() => {
    if (!isValidCard) return null;
    if (backendGrids) return backendGrids;
    // Fallback local generation if offline or error loading
    return generateBingoNumbers(cardNum, numberRange);
  }, [cardNum, isValidCard, numberRange, backendGrids]);

  const gridResults = grids ? grids.map(g => checkGridWin(g, drawnNumbers)) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12121a] border border-[#2c2c3e] rounded-2xl w-full max-w-3xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">
        
        <ValidationHeader onClose={onClose} accentColor={accentColor} />

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          <ValidationInputs
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            drawnInput={drawnInput}
            setDrawnInput={setDrawnInput}
            setSubmitted={setSubmitted}
            isValidCard={isValidCard}
            accentColor={accentColor}
          />

          {loadingBackend && (
            <div className="text-center py-4 text-slate-400 text-xs animate-pulse">
              Buscando cartela #{cardNum} no banco de dados SQLite...
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-semibold text-center">
              {errorMsg}
              <p className="text-[10px] text-slate-500 font-normal mt-1">
                Aviso: Exibindo a cartela gerada localmente ( seeded ) como alternativa.
              </p>
            </div>
          )}

          {submitted && isValidCard && grids && !loadingBackend && (
            <ValidationResults
              cardNum={cardNum}
              drawnNumbers={drawnNumbers}
              grids={grids}
              gridResults={gridResults}
              prizes={prizes}
            />
          )}
        </div>
      </div>
    </div>
  );
}
