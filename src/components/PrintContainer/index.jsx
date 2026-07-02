import React, { useState, useEffect, useRef } from 'react';
import PrintPage from './PrintPage';

const BATCH_SIZE = 50; // Render 50 pages per frame to avoid freezing

function PrintContainer({
  pairedCards,
  config,
  logoData,
  centerLogoData,
  sponsorsLogos,
  printReady = false,
  onProgress,
  onReady,
}) {
  const [renderedCount, setRenderedCount] = useState(0);
  const batchTimerRef = useRef(null);

  // When printReady transitions to true, start batch rendering
  useEffect(() => {
    if (!printReady) {
      setRenderedCount(0);
      return;
    }

    const total = pairedCards.length;
    if (total === 0) {
      onProgress?.(100);
      onReady?.();
      return;
    }

    let current = 0;

    function renderNextBatch() {
      current = Math.min(current + BATCH_SIZE, total);
      setRenderedCount(current);
      const progress = Math.round((current / total) * 100);
      onProgress?.(progress);

      if (current < total) {
        // Use requestAnimationFrame to let the browser breathe between batches
        batchTimerRef.current = requestAnimationFrame(() => {
          // Small delay to let React commit the current batch to DOM
          setTimeout(renderNextBatch, 16);
        });
      } else {
        // All batches rendered — notify parent after a short paint delay
        setTimeout(() => {
          onReady?.();
        }, 200);
      }
    }

    // Start rendering after a small delay to let the modal show
    batchTimerRef.current = requestAnimationFrame(() => {
      setTimeout(renderNextBatch, 50);
    });

    return () => {
      if (batchTimerRef.current) {
        cancelAnimationFrame(batchTimerRef.current);
      }
    };
  }, [printReady, pairedCards.length, onProgress, onReady]);

  return (
    <div className="hidden print-container">
      {printReady && pairedCards.slice(0, renderedCount).map(([card1, card2], pageIdx) => (
        <PrintPage
          key={pageIdx}
          card1={card1}
          card2={card2}
          config={config}
          logoData={logoData}
          centerLogoData={centerLogoData}
          sponsorsLogos={sponsorsLogos}
        />
      ))}
    </div>
  );
}

export default PrintContainer;
