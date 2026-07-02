import React, { useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { COLS } from './constants';
import { getColumnForNumber, buildPool, shuffleArray } from './helpers';
import CurrentBall from './CurrentBall';
import DrawControls from './DrawControls';
import CalledNumbersGrid from './CalledNumbersGrid';
import LastDrawn from './LastDrawn';

export default function DrawMode({ onClose, numberRange = 75, accentColor = '#f59e0b' }) {
  const [deck, setDeck] = useState(() => shuffleArray(buildPool(numberRange)));
  const [called, setCalled] = useState([]);
  const [current, setCurrent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoInterval, setAutoIntervalState] = useState(3);

  const remaining = deck.length;
  const total = numberRange;

  const drawNext = useCallback(() => {
    if (deck.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const next = deck[0];
      setDeck(d => d.slice(1));
      setCalled(c => [next, ...c]);
      setCurrent(next);
      setIsAnimating(false);
    }, 600);
  }, [deck, isAnimating]);

  const reset = () => {
    setDeck(shuffleArray(buildPool(numberRange)));
    setCalled([]);
    setCurrent(null);
    setAutoPlay(false);
    setIsAnimating(false);
  };

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay) return;
    if (deck.length === 0) {
      setAutoPlay(false);
      return;
    }
    const id = setInterval(() => {
      drawNext();
    }, autoInterval * 1000);
    return () => clearInterval(id);
  }, [autoPlay, deck.length, autoInterval, drawNext]);

  const calledByCol = {};
  COLS.forEach(c => {
    calledByCol[c] = [];
  });
  called.forEach(n => {
    const col = getColumnForNumber(n, numberRange);
    calledByCol[col].push(n);
  });

  const currentCol = current ? getColumnForNumber(current, numberRange) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12121a] border border-[#2c2c3e] rounded-2xl w-full max-w-4xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
              style={{ background: accentColor }}
            >
              🎱
            </div>
            <div>
              <h2 className="font-outfit font-bold text-white text-lg">Sorteador de Bingo</h2>
              <p className="text-xs text-slate-400">
                {remaining} números restantes de {total}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-6 p-6">
          {/* Left — Main Draw Area */}
          <div className="flex flex-col items-center gap-5 lg:w-64 shrink-0">
            <CurrentBall
              current={current}
              currentCol={currentCol}
              calledCount={called.length}
              total={total}
              isAnimating={isAnimating}
              accentColor={accentColor}
            />

            <DrawControls
              drawNext={drawNext}
              reset={reset}
              deckLength={deck.length}
              isAnimating={isAnimating}
              autoPlay={autoPlay}
              setAutoPlay={setAutoPlay}
              autoInterval={autoInterval}
              setAutoIntervalState={setAutoIntervalState}
              accentColor={accentColor}
            />
          </div>

          {/* Right — Called Numbers by Column */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Números Chamados</h3>
            <CalledNumbersGrid calledByCol={calledByCol} current={current} />

            <LastDrawn called={called} numberRange={numberRange} getColumnForNumber={getColumnForNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
