import React, { useState, useEffect, useRef } from 'react';
import PrintHeader from './PrintHeader';
import PrintConfirm from './PrintConfirm';
import PrintPreparing from './PrintPreparing';
import PrintDone from './PrintDone';

export default function PrintModal({ quantity, onConfirm, onClose, printReady = false, printProgress = 0 }) {
  const [phase, setPhase] = useState('confirm'); // 'confirm' | 'preparing' | 'done'
  const isLarge = quantity > 2000;

  // Transition to preparing when printReady becomes true
  useEffect(() => {
    if (printReady && phase === 'confirm') {
      setPhase('preparing');
    }
  }, [printReady, phase]);

  // Track real progress from batch rendering
  useEffect(() => {
    if (phase === 'preparing' && printProgress >= 100) {
      setPhase('done');
    }
  }, [phase, printProgress]);

  const handlePrint = () => {
    // Trigger the parent's print flow (sets printReady=true, starts batch rendering)
    onConfirm();
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#12121a] border border-[#2c2c3e] rounded-2xl w-full max-w-md shadow-2xl p-6 flex flex-col gap-5">
        
        <PrintHeader onClose={onClose} showCloseButton={phase === 'confirm'} />

        {phase === 'confirm' && (
          <PrintConfirm
            quantity={quantity}
            isLarge={isLarge}
            onClose={onClose}
            onConfirmPrint={handlePrint}
          />
        )}

        {phase === 'preparing' && (
          <PrintPreparing
            quantity={quantity}
            progress={printProgress}
          />
        )}

        {phase === 'done' && <PrintDone />}
      </div>
    </div>
  );
}

