import { memo } from 'react';
import PropTypes from 'prop-types';

const NumberCell = memo(({ value, fontSize = '18px' }) => {
  return (
    <span 
      className="font-bold select-none text-slate-800 dark:text-slate-100" 
      style={{ fontSize }}
    >
      {value}
    </span>
  );
});

NumberCell.displayName = 'NumberCell';

NumberCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fontSize: PropTypes.string,
};

export default NumberCell;

