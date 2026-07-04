import React from 'react';
import PropTypes from 'prop-types';
import { COL_COLORS } from './constants';

export default function CurrentBall({
  current,
  currentCol,
  calledCount,
  total,
  isAnimating,
  accentColor,
}) {
  const progressPercent = Math.round((calledCount / total) * 100);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Current Ball */}
      <div className="relative flex flex-col items-center gap-2">
        {/* Soft Ambient Glow Behind the Ball */}
        {current && currentCol && (
          <div
            className="absolute inset-0 -m-3 rounded-full filter blur-3xl opacity-25 animate-pulse transition-all duration-500"
            style={{
              backgroundColor: COL_COLORS[currentCol].bg,
            }}
          />
        )}
        <div
          className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-all duration-300 ${
            isAnimating ? 'bingo-ball-spin scale-110' : 'scale-100'
          }`}
          style={{
            background: currentCol
              ? `radial-gradient(circle at 35% 35%, ${COL_COLORS[currentCol].light}, ${COL_COLORS[currentCol].bg})`
              : 'radial-gradient(circle at 35% 35%, #1e1e2e, #0f0f15)',
            borderColor: currentCol ? COL_COLORS[currentCol].bg : '#2c2c3e',
            boxShadow: currentCol 
              ? `0 0 50px ${COL_COLORS[currentCol].bg}88, inset 0 0 20px rgba(255,255,255,0.2)` 
              : 'inset 0 0 20px rgba(255,255,255,0.05)',
          }}
        >
          {current ? (
            <>
              <span className="text-white/80 text-sm font-bold tracking-widest uppercase">{currentCol}</span>
              <span className="text-white font-black text-6xl leading-none mt-1 drop-shadow-md">{current}</span>
            </>
          ) : (
            <span className="text-slate-600 text-4xl font-light">?</span>
          )}
        </div>
        {current && (
          <div className="text-xs text-slate-400 font-mono mt-1">
            Número {calledCount} de {total}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
          <span>{calledCount} chamados</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden border border-[#2c2c3e]/30">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, backgroundColor: accentColor }}
          />
        </div>
      </div>
    </div>
  );
}

CurrentBall.propTypes = {
  current: PropTypes.number,
  currentCol: PropTypes.string,
  calledCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  accentColor: PropTypes.string,
};
