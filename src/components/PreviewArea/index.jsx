import React from 'react';
import CartelaCard from '../CartelaCard';
import CardThumbnails from '../CardThumbnails';
import PreviewToolbar from './PreviewToolbar';

const CardSkeleton = () => (
  <div className="preview-card flex flex-col p-4 font-sans border-2 border-slate-200 bg-white animate-pulse shadow-md select-none">
    {/* Header Skeleton */}
    <div className="border-2 border-slate-200 p-2 flex flex-col mb-3">
      <div className="flex justify-between items-start border-b border-slate-200 pb-2">
        <div className="flex-1 space-y-2 pr-2">
          <div className="h-6 bg-slate-100 rounded w-3/4"></div>
          <div className="h-3 bg-slate-100 rounded w-1/2"></div>
        </div>
        <div className="w-[70px] h-10 bg-slate-100 rounded flex flex-col items-center justify-center gap-1">
          <div className="h-2 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="pt-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0"></div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 bg-slate-100 rounded w-2/3 mx-auto"></div>
          <div className="h-2.5 bg-slate-100 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>

    {/* Grids Skeleton */}
    <div className="grid grid-cols-2 gap-x-5 gap-y-3 flex-1">
      {[1, 2, 3, 4].map(idx => (
        <div key={idx} className="flex flex-col">
          <div className="h-7 bg-slate-100 rounded-t border-x border-t border-slate-200 flex flex-col justify-center items-center gap-1">
            <div className="h-2 bg-slate-200 rounded w-1/3"></div>
            <div className="h-2 bg-slate-200 rounded w-1/2"></div>
          </div>
          <div className="border-2 border-slate-200 grid grid-cols-5 grid-rows-6 gap-[1px] bg-slate-200">
            {/* Header B-I-N-G-O cells */}
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={`h-${j}`} className="h-6 bg-slate-100 flex items-center justify-center">
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
            {/* Number grid cells (5x5) */}
            {Array.from({ length: 25 }).map((_, j) => (
              <div key={`c-${j}`} className="h-[28px] bg-white flex items-center justify-center">
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Footer Sponsors Skeleton */}
    <div className="mt-2 pt-1.5 border-t-2 border-slate-200 flex flex-col items-center justify-center h-10 gap-1">
      <div className="h-2 bg-slate-100 rounded w-1/4"></div>
      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
    </div>
  </div>
);

function PreviewArea({
  previewIndex,
  setPreviewIndex,
  quantity,
  startNum,
  config,
  logoData,
  centerLogoData,
  sponsorsLogos,
  showThumbnails,
  backendCards,
  backendOnline,
  loadingCards = false,
}) {
  const currentCard = backendCards && backendCards[previewIndex];
  const cardNumber = currentCard ? currentCard.card_number : (startNum + previewIndex);
  const cardGrids = currentCard ? currentCard.grids : null;
  const isFallback = backendOnline && (!backendCards || backendCards.length < quantity);

  return (
    <main className="no-print flex-1 bg-[#f1f5f9] flex flex-col relative overflow-hidden">
      {isFallback && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-800 flex justify-between items-center shrink-0 font-sans shadow-sm">
          <span>
            ⚠️ <strong>Intervalo não gravado no banco de dados SQLite.</strong> Exibindo cartelas locais ( seeded ). Para salvá-las e garantir a não repetição física permanente, gere este lote na aba <strong>Banco</strong>.
          </span>
        </div>
      )}
      <PreviewToolbar
        previewIndex={previewIndex}
        setPreviewIndex={setPreviewIndex}
        quantity={quantity}
        startNum={startNum}
      />

      {/* Canvas viewport */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
          {loadingCards ? (
            <CardSkeleton />
          ) : (
            <div className="transition-all duration-300 transform scale-100">
              <CartelaCard
                number={cardNumber}
                grids={cardGrids}
                config={config}
                logoData={logoData}
                centerLogoData={centerLogoData}
                sponsorsLogos={sponsorsLogos}
              />
            </div>
          )}
        </div>

        {/* Thumbnails Panel */}
        {showThumbnails && (
          <div className="w-64 border-l border-slate-200 bg-white flex flex-col shrink-0 overflow-hidden">
            <CardThumbnails
              startNum={startNum}
              quantity={quantity}
              numberRange={config.numberRange}
              currentIndex={previewIndex}
              onSelect={setPreviewIndex}
              backendCards={backendCards}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default PreviewArea;


