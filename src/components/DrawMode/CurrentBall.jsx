import React from 'react';
import { COL_COLORS } from './constants';

export default function CurrentBall({
  current,
  currentCol,
  calledCount,
  total,
  isAnimating,
  accentColor
}) {
  const progressPercent = Math.round((calledCount / total) * 100);

  return (
    <div className="flex flex-col items-center gap-5 lg:w-64 shrink-0">
      {/* Current Ball */}
      <div className="relative flex flex-col items-center gap-2">
        <div
          className={`w-44 h-44 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-all duration-300 ${
            isAnimating ? 'bingo-ball-spin scale-110' : 'scale-100'
          }`}
          style={{
            background: currentCol
              ? `radial-gradient(circle at 35% 35%, ${COL_COLORS[currentCol].light}, ${COL_COLORS[currentCol].bg})`
              : 'radial-gradient(circle at 35% 35%, #334155, #0f172a)',
            borderColor: currentCol ? COL_COLORS[currentCol].bg : '#334155',
            boxShadow: currentCol ? `0 0 40px ${COL_COLORS[currentCol].bg}66` : undefined,
          }}
        >
          {current ? (
            <>
              <span className="text-white/80 text-sm font-bold tracking-widest uppercase">{currentCol}</span>
              <span className="text-white font-black text-6xl leading-none mt-1">{current}</span>
            </>
          ) : (
            <span className="text-slate-500 text-4xl">?</span>
          )}
        </div>
        {current && (
          <div className="text-xs text-slate-400 font-mono">
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
        <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, backgroundColor: accentColor }}
          />
        </div>
      </div>
    </div>
  );
}
