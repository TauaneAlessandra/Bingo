import React from 'react';
import PropTypes from 'prop-types';
import { Shuffle, RotateCcw, Volume2, VolumeX, FileText } from 'lucide-react';

export default function DrawControls({
  drawNext,
  reset,
  deckLength,
  isAnimating,
  autoPlay,
  setAutoPlay,
  autoInterval,
  setAutoIntervalState,
  accentColor,
  isMuted,
  setIsMuted,
  calledCount,
  onCopyReport,
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={drawNext}
        disabled={deckLength === 0 || isAnimating || autoPlay}
        className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: accentColor, color: '#1e1b4b' }}
      >
        <Shuffle className="w-5 h-5" />
        {deckLength === 0 ? 'Todos sorteados!' : 'Sortear'}
      </button>

      {/* Auto Play */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setAutoPlay(p => !p)}
          disabled={deckLength === 0}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
            autoPlay
              ? 'border-red-500 text-red-400 bg-red-500/10'
              : 'border-[#2c2c3e] text-slate-300 hover:border-slate-500'
          }`}
        >
          {autoPlay ? '⏸ Pausar Auto' : '▶ Auto Sorteio'}
        </button>
        <div className="flex items-center gap-1 bg-[#1e1e2e] rounded-lg px-2 py-1 border border-[#2c2c3e]">
          <select
            value={autoInterval}
            onChange={e => setAutoIntervalState(Number(e.target.value))}
            className="bg-transparent text-slate-300 text-xs outline-none cursor-pointer"
          >
            {[2, 3, 5, 8, 10].map(s => (
              <option key={s} value={s}>
                {s}s
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Symmetrical Audio and Reset controls */}
      <div className="flex gap-2 w-full">
        <button
          onClick={() => setIsMuted(m => !m)}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-[#2c2c3e] text-slate-400 hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isMuted ? 'Mudo' : 'Som'}
        </button>
        <button
          onClick={reset}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-[#2c2c3e] text-slate-400 hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>

      {/* Copy Report Button */}
      {calledCount > 0 && (
        <button
          onClick={onCopyReport}
          className="w-full py-2.5 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <FileText className="w-4 h-4" />
          Copiar Relatório do Sorteio
        </button>
      )}
    </div>
  );
}

DrawControls.propTypes = {
  drawNext: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  deckLength: PropTypes.number.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  setAutoPlay: PropTypes.func.isRequired,
  autoInterval: PropTypes.number.isRequired,
  setAutoIntervalState: PropTypes.func.isRequired,
  accentColor: PropTypes.string,
  isMuted: PropTypes.bool.isRequired,
  setIsMuted: PropTypes.func.isRequired,
  calledCount: PropTypes.number.isRequired,
  onCopyReport: PropTypes.func.isRequired,
};
