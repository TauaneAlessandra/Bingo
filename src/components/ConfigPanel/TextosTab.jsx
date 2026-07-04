import React from 'react';
import PropTypes from 'prop-types';
import { Type, AlignLeft, RotateCcw, Trash2 } from 'lucide-react';
import TitleStyleEditor from './TitleStyleEditor';
import TextFieldWithStyle from './TextFieldWithStyle';

const FIELDS = [
  {
    fieldKey: 'subtitle',
    label: 'Horário e Datas',
    inputLabel: 'Horário e Datas',
    hint: 'Aparece abaixo do título',
  },
  {
    fieldKey: 'attractions',
    label: 'Atrações',
    inputLabel: 'Atrações (separadas por |)',
    hint: 'Use | para separar cada atração',
  },
  {
    fieldKey: 'confira',
    label: 'Confira',
    inputLabel: 'Confira no... (ex: Instagram @seu-insta)',
    hint: 'Redes sociais ou site do evento',
  },
  {
    fieldKey: 'rules',
    label: 'Regras',
    inputLabel: 'Informações Gerais / Regras',
    hint: 'Rodapé da cartela',
  },
  {
    fieldKey: 'exclusiveDate',
    label: 'Aviso em Destaque',
    inputLabel: 'Aviso Vermelho (data exclusiva etc.)',
    uppercase: true,
    hint: 'Aparece em vermelho em destaque',
  },
  {
    fieldKey: 'cardValue',
    label: 'Valor da Cartela',
    inputLabel: 'Valor da Cartela (ex: R$ 10,00)',
    hint: 'Preço exibido no cabeçalho',
  },
];

const DEFAULT_TEXTS = [
  'title', 'subtitle', 'attractions', 'confira', 'rules',
  'exclusiveDate', 'cardValue', 'titleFont', 'titleColor', 'titleShadow',
  'titleSize', 'titlePreset', 'subtitleFont', 'subtitleColor', 'subtitleSize',
  'attractionsFont', 'attractionsColor', 'attractionsSize', 'rulesFont',
  'rulesColor', 'rulesSize', 'confiraFont', 'confiraColor', 'confiraSize',
  'exclusiveDateFont', 'exclusiveDateColor', 'exclusiveDateSize',
  'cardValueFont', 'cardValueColor', 'cardValueSize',
];

function TextosTab({ config, updateConfig, DEFAULT_CONFIG }) {
  const handleRestore = () => {
    updateConfig(
      Object.fromEntries(DEFAULT_TEXTS.map((k) => [k, DEFAULT_CONFIG[k]]))
    );
  };

  const handleClear = () => {
    const clearObj = {
      title: '', subtitle: '', attractions: '', confira: '',
      rules: '', exclusiveDate: '', cardValue: '',
      titleFont: DEFAULT_CONFIG.titleFont,
      titleColor: DEFAULT_CONFIG.titleColor,
      titleShadow: DEFAULT_CONFIG.titleShadow,
      titleSize: DEFAULT_CONFIG.titleSize,
      titlePreset: DEFAULT_CONFIG.titlePreset,
    };
    const styleFields = ['subtitle', 'attractions', 'rules', 'confira', 'exclusiveDate', 'cardValue'];
    styleFields.forEach((f) => {
      clearObj[`${f}Font`] = '';
      clearObj[`${f}Color`] = '';
      clearObj[`${f}Size`] = '';
    });
    updateConfig(clearObj);
  };

  return (
    <div className="space-y-4 flex flex-col">

      {/* Título */}
      <div className="section-card">
        <div className="section-card-title">
          <Type size={14} />
          Título do Evento
        </div>
        <md-outlined-text-field
          label="Título principal"
          value={config.title}
          onInput={(e) => updateConfig({ title: e.target.value.toUpperCase() })}
          style={{ width: '100%' }}
        />
        <TitleStyleEditor config={config} updateConfig={updateConfig} />
      </div>

      {/* Outros Textos */}
      <div className="section-card">
        <div className="section-card-title">
          <AlignLeft size={14} />
          Informações da Cartela
        </div>
        {FIELDS.map((field) => (
          <div key={field.fieldKey} className="field-group">
            <TextFieldWithStyle
              fieldKey={field.fieldKey}
              label={field.label}
              inputLabel={field.inputLabel}
              config={config}
              updateConfig={updateConfig}
              uppercase={field.uppercase}
            />
            {field.hint && (
              <span className="field-hint">{field.hint}</span>
            )}
          </div>
        ))}
      </div>

      {/* Ações */}
      <div className="flex gap-2 items-center">
        <button onClick={handleRestore} className="btn-ghost">
          <RotateCcw size={11} />
          Restaurar padrão
        </button>
        <button onClick={handleClear} className="btn-danger-ghost">
          <Trash2 size={11} />
          Limpar tudo
        </button>
      </div>
    </div>
  );
}

TextosTab.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
  DEFAULT_CONFIG: PropTypes.object.isRequired,
};

export default TextosTab;
