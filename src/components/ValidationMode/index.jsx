import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { generateBingoNumbers } from '../../utils/bingo';
import ValidationHeader from './ValidationHeader';
import ValidationInputs from './ValidationInputs';
import ValidationResults from './ValidationResults';
import { checkGridWin } from './utils';

/**
 * ValidationMode modal overlay lets users dynamically check whether
 * a specific card won given the set of drawn numbers.
 *
 * @component
 * @param {Object} props
 * @param {() => void} props.onClose - Callback invoked when the modal is closed.
 * @param {number} [props.numberRange=75] - The maximum number range for the bingo session (e.g., 75 or 90).
 * @param {string} [props.accentColor='#f59e0b'] - Primary theme highlight color.
 * @param {Array<string>} [props.prizes=[]] - Names/labels of the prizes.
 */
export default function ValidationMode({
  onClose,
  numberRange = 75,
  accentColor = '#f59e0b',
  prizes = []
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [drawnInput, setDrawnInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cardNum = parseInt(cardNumber, 10);
  const isValidCard = !isNaN(cardNum) && cardNum > 0;

  // Parse drawn numbers from comma/space/semicolon separated input
  const drawnNumbers = useMemo(() => {
    if (!drawnInput) return new Set();
    const cleanNumbers = drawnInput.split(/[\s,;]+/)
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n >= 1 && n <= numberRange);
    return new Set(cleanNumbers);
  }, [drawnInput, numberRange]);

  const handleToggleNumber = useCallback((num) => {
    setSubmitted(false);
    setDrawnInput(prev => {
      const clean = prev.split(/[\s,;]+/)
        .map(s => parseInt(s.trim(), 10))
        .filter(n => !isNaN(n) && n >= 1 && n <= numberRange);

      const index = clean.indexOf(num);
      if (index > -1) {
        clean.splice(index, 1);
      } else {
        clean.push(num);
      }
      clean.sort((a, b) => a - b);
      return clean.join(', ');
    });
  }, [numberRange]);

  const handleClearNumbers = useCallback(() => {
    setSubmitted(false);
    setDrawnInput('');
  }, []);

  const grids = useMemo(() => {
    if (!isValidCard) return null;
    return generateBingoNumbers(cardNum, numberRange);
  }, [cardNum, isValidCard, numberRange]);

  const gridResults = useMemo(() => {
    if (!grids) return [];
    return grids.map(g => checkGridWin(g, drawnNumbers));
  }, [grids, drawnNumbers]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#12121a] border border-[#2c2c3e] rounded-2xl w-full max-w-3xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">
        
        <ValidationHeader onClose={onClose} accentColor={accentColor} />

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          <ValidationInputs
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            drawnInput={drawnInput}
            setDrawnInput={setDrawnInput}
            setSubmitted={setSubmitted}
            isValidCard={isValidCard}
            accentColor={accentColor}
            drawnNumbers={drawnNumbers}
            numberRange={numberRange}
            onToggleNumber={handleToggleNumber}
            onClearNumbers={handleClearNumbers}
          />

          {submitted && isValidCard && grids && (
            <ValidationResults
              cardNum={cardNum}
              drawnNumbers={drawnNumbers}
              grids={grids}
              gridResults={gridResults}
              prizes={prizes}
            />
          )}
        </div>
      </div>
    </div>
  );
}

ValidationMode.propTypes = {
  onClose: PropTypes.func.isRequired,
  numberRange: PropTypes.number,
  accentColor: PropTypes.string,
  prizes: PropTypes.arrayOf(PropTypes.string),
};
