import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getColumnForNumber, buildPool, shuffleArray } from './helpers';
import { playBallSound, playResetSound } from '../../utils/audio';
import { generateDrawReport } from './reportHelper';
import CurrentBall from './CurrentBall';
import DrawControls from './DrawControls';
import CalledNumbersGrid from './CalledNumbersGrid';
import LastDrawn from './LastDrawn';
import DrawModeHeader from './DrawModeHeader';

export default function DrawMode({ onClose, numberRange = 75, accentColor = '#f59e0b' }) {
  const [deck, setDeck] = useState(() => shuffleArray(buildPool(numberRange)));
  const [called, setCalled] = useState([]);
  const [current, setCurrent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoInterval, setAutoIntervalState] = useState(3);
  const [isMuted, setIsMuted] = useState(() => {
    try { return localStorage.getItem('bringo-draw-muted') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('bringo-draw-muted', isMuted); } catch {}
  }, [isMuted]);

  const drawNext = useCallback(() => {
    if (deck.length === 0 || isAnimating) return;
    setIsAnimating(true);
    if (!isMuted) playBallSound();
    setTimeout(() => {
      const next = deck[0];
      setDeck(d => d.slice(1));
      setCalled(c => [next, ...c]);
      setCurrent(next);
      setIsAnimating(false);
    }, 600);
  }, [deck, isAnimating, isMuted]);

  const reset = () => {
    setDeck(shuffleArray(buildPool(numberRange)));
    setCalled([]);
    setCurrent(null);
    setAutoPlay(false);
    setIsAnimating(false);
    if (!isMuted) playResetSound();
  };

  useEffect(() => {
    if (!autoPlay) return;
    if (deck.length === 0) { setAutoPlay(false); return; }
    const id = setInterval(() => { drawNext(); }, autoInterval * 1000);
    return () => clearInterval(id);
  }, [autoPlay, deck.length, autoInterval, drawNext]);

  const handleCopyReport = useCallback(() => {
    const reportText = generateDrawReport(called, numberRange, getColumnForNumber);
    if (!reportText) return;
    try {
      navigator.clipboard.writeText(reportText);
      alert('Relatório do sorteio copiado para a área de transferência!');
    } catch {}
  }, [called, numberRange]);

  const currentCol = current ? getColumnForNumber(current, numberRange) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="bg-[#12121a] border border-[#2c2c3e] rounded-2xl w-full max-w-4xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden fade-in">
        <DrawModeHeader onClose={onClose} remaining={deck.length} total={numberRange} accentColor={accentColor} />
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-6 p-6">
          <div className="flex flex-col items-center gap-5 lg:w-64 shrink-0">
            <CurrentBall current={current} currentCol={currentCol} calledCount={called.length} total={numberRange} isAnimating={isAnimating} accentColor={accentColor} />
            <DrawControls drawNext={drawNext} reset={reset} deckLength={deck.length} isAnimating={isAnimating} autoPlay={autoPlay} setAutoPlay={setAutoPlay} autoInterval={autoInterval} setAutoIntervalState={setAutoIntervalState} accentColor={accentColor} isMuted={isMuted} setIsMuted={setIsMuted} calledCount={called.length} onCopyReport={handleCopyReport} />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Painel Geral de Dezenas</h3>
            <CalledNumbersGrid called={called} numberRange={numberRange} current={current} />
            <LastDrawn called={called} numberRange={numberRange} getColumnForNumber={getColumnForNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}

DrawMode.propTypes = { onClose: PropTypes.func.isRequired, numberRange: PropTypes.number, accentColor: PropTypes.string };
