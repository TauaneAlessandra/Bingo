import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { getColumnForNumber, buildPool, shuffleArray } from './helpers';
import { playBallSound, playResetSound } from '../../utils/audio';
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

  // Persisted sound preference
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('bringo-draw-muted') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bringo-draw-muted', isMuted);
    } catch (e) {
      // ignore write block
    }
  }, [isMuted]);

  const remaining = deck.length;
  const total = numberRange;

  const drawNext = useCallback(() => {
    if (deck.length === 0 || isAnimating) return;
    setIsAnimating(true);

    // Play drawing sound slightly before the ball appears
    if (!isMuted) {
      playBallSound();
    }

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
    if (!isMuted) {
      playResetSound();
    }
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

  // Copy Game Report Statistics
  const handleCopyReport = useCallback(() => {
    if (called.length === 0) return;

    const stats = { B: 0, I: 0, N: 0, G: 0, O: 0 };
    called.forEach(n => {
      const col = getColumnForNumber(n, numberRange);
      stats[col]++;
    });

    // Invert to show in order of drawing (oldest to newest)
    const orderOfDraw = [...called].reverse().join(' -> ');

    const reportText = `=== RELATÓRIO DO SORTEIO DE BINGO - BRINGO ===
Data/Hora: ${new Date().toLocaleString('pt-BR')}
Total de Bolas Sorteadas: ${called.length}
Ordem das Bolas Chamadas:
${orderOfDraw}

Distribuição por Colunas:
B: ${stats.B} dezenas
I: ${stats.I} dezenas
N: ${stats.N} dezenas
G: ${stats.G} dezenas
O: ${stats.O} dezenas

=============================================
Gerado automaticamente pelo Bringo.`;

    try {
      navigator.clipboard.writeText(reportText);
      alert('Relatório do sorteio copiado para a área de transferência!');
    } catch (e) {
      console.error('Failed to copy report:', e);
    }
  }, [called, numberRange]);

  const currentCol = current ? getColumnForNumber(current, numberRange) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="bg-[#12121a] border border-[#2c2c3e] rounded-2xl w-full max-w-4xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-inner"
              style={{ background: accentColor }}
            >
              🎱
            </div>
            <div>
              <h2 className="font-outfit font-bold text-white text-lg leading-snug">Sorteador de Bingo</h2>
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
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              calledCount={called.length}
              onCopyReport={handleCopyReport}
            />
          </div>

          {/* Right — Called Numbers master board and history */}
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

DrawMode.propTypes = {
  onClose: PropTypes.func.isRequired,
  numberRange: PropTypes.number,
  accentColor: PropTypes.string,
};
