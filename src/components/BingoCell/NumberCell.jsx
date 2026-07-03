import React, { memo } from 'react';

const NumberCell = memo(({ value, fontSize }) => {
  return (
    <span 
      className="font-bold" 
      style={{ fontSize: fontSize || '18px' }}
    >
      {value}
    </span>
  );
});

NumberCell.displayName = 'NumberCell';

export default NumberCell;

