import React, { useState, useEffect, useRef, memo } from 'react';
import { generateBingoNumbers } from '../../utils/bingo';
import MiniGrid from './MiniGrid';
import Pagination from './Pagination';

const CardThumbnails = memo(function CardThumbnails({ startNum, quantity, numberRange = 75, currentIndex, onSelect, backendCards }) {
  const PAGE_SIZE = 20;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(quantity / PAGE_SIZE) || 1;

  // Sync page when currentIndex or totalPages changes
  useEffect(() => {
    const targetPage = Math.floor(currentIndex / PAGE_SIZE);
    if (targetPage !== page && targetPage < totalPages && targetPage >= 0) {
      setPage(targetPage);
    }
  }, [currentIndex, totalPages]);

  const activeRef = useRef(null);

  // Scroll active thumbnail into view when currentIndex changes
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentIndex]);

  const pageStart = page * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, quantity);

  const cardData = [];
  for (let i = pageStart; i < pageEnd; i++) {
    const backendCard = backendCards && backendCards[i];
    if (backendCard) {
      cardData.push({
        num: backendCard.card_number,
        grid1: backendCard.grids[0],
        globalIdx: i
      });
    } else {
      const num = startNum + i;
      const [grid1] = generateBingoNumbers(num, numberRange);
      cardData.push({
        num: num,
        grid1: grid1,
        globalIdx: i
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200">
        <span className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Miniaturas</span>
        <span className="text-[10px] text-slate-500">{pageStart + 1}–{pageEnd} / {quantity}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 grid grid-cols-4 gap-2 content-start">
        {cardData.map(({ num, grid1, globalIdx }) => {
          const isActive = globalIdx === currentIndex;

          return (
            <button
              key={num}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(globalIdx)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${
                isActive
                  ? 'border-slate-800 bg-slate-100 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <div className="w-full overflow-hidden rounded">
                <MiniGrid numbers={grid1} />
              </div>
              <span className={`text-[8px] font-bold font-mono ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                #{String(num).padStart(5, '0')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage(p => Math.max(0, p - 1))}
          onNext={() => setPage(p => Math.min(totalPages - 1, p + 1))}
        />
      )}
    </div>
  );
});

export default CardThumbnails;
