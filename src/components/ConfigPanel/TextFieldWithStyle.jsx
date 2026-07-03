import React from 'react';
import StyleEditor from './StyleEditor';

function TextFieldWithStyle({
  fieldKey,
  label,
  inputLabel,
  config,
  updateConfig,
  uppercase = false,
}) {
  const value = config[fieldKey] || '';

  const handleInput = (e) => {
    let val = e.target.value;
    if (uppercase) {
      val = val.toUpperCase();
    }
    updateConfig({ [fieldKey]: val });
  };

  return (
    <div className="flex flex-col">
      <md-outlined-text-field
        label={inputLabel}
        value={value}
        onInput={handleInput}
      />
      <StyleEditor
        fieldKey={fieldKey}
        label={label}
        config={config}
        updateConfig={updateConfig}
      />
    </div>
  );
}

export default TextFieldWithStyle;
