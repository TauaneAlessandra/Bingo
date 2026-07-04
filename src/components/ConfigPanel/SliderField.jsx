import React from 'react';
import PropTypes from 'prop-types';

function SliderField({ label, icon: Icon, min, max, value, onChange, unit = '' }) {
  return (
    <div className="field-group">
      <div className="field-label">
        {Icon && <Icon size={13} />}
        {label}
      </div>
      <div className="slider-row">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full accent-indigo-600 flex-1"
        />
        <span className="slider-value-badge">
          {value}{unit}
        </span>
      </div>
    </div>
  );
}

SliderField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string,
};

export default SliderField;
