import React from 'react';
import TitleStyleEditor from './TitleStyleEditor';
import TextFieldWithStyle from './TextFieldWithStyle';

const FIELDS = [
  { fieldKey: 'subtitle', label: 'Horário e Datas', inputLabel: 'Horário e Datas' },
  { fieldKey: 'attractions', label: 'Atrações', inputLabel: 'Atrações (separadas por |)' },
  { fieldKey: 'confira', label: 'Confira', inputLabel: 'Confira no... (ex: Instagram @seu-insta)' },
  { fieldKey: 'rules', label: 'Regras', inputLabel: 'Informações Gerais / Regras' },
  { fieldKey: 'exclusiveDate', label: 'Aviso Vermelho', inputLabel: 'Aviso Vermelho (data exclusiva etc.)', uppercase: true },
  { fieldKey: 'cardValue', label: 'Valor da Cartela', inputLabel: 'Valor da Cartela (ex: R$ 10,00)' },
];

function TextosTab({ config, updateConfig, DEFAULT_CONFIG }) {
  return (
    <div className="space-y-4 flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Textos do Cabeçalho</h3>

      <div className="flex flex-col">
        <md-outlined-text-field
          label="Título do Evento"
          value={config.title}
          onInput={(e) => updateConfig({ title: e.target.value.toUpperCase() })}
        />
        {/* Customizador de Estilo do Título */}
        <TitleStyleEditor config={config} updateConfig={updateConfig} />
      </div>

      {FIELDS.map((field) => (
        <TextFieldWithStyle
          key={field.fieldKey}
          fieldKey={field.fieldKey}
          label={field.label}
          inputLabel={field.inputLabel}
          config={config}
          updateConfig={updateConfig}
          uppercase={field.uppercase}
        />
      ))}

      <div className="flex gap-3 items-center self-start mt-2">
        <button
          onClick={() => {
            updateConfig({
              title: DEFAULT_CONFIG.title,
              subtitle: DEFAULT_CONFIG.subtitle,
              attractions: DEFAULT_CONFIG.attractions,
              confira: DEFAULT_CONFIG.confira,
              rules: DEFAULT_CONFIG.rules,
              exclusiveDate: DEFAULT_CONFIG.exclusiveDate,
              cardValue: DEFAULT_CONFIG.cardValue,
              titleFont: DEFAULT_CONFIG.titleFont,
              titleColor: DEFAULT_CONFIG.titleColor,
              titleShadow: DEFAULT_CONFIG.titleShadow,
              titleSize: DEFAULT_CONFIG.titleSize,
              titlePreset: DEFAULT_CONFIG.titlePreset,
              subtitleFont: DEFAULT_CONFIG.subtitleFont,
              subtitleColor: DEFAULT_CONFIG.subtitleColor,
              subtitleSize: DEFAULT_CONFIG.subtitleSize,
              attractionsFont: DEFAULT_CONFIG.attractionsFont,
              attractionsColor: DEFAULT_CONFIG.attractionsColor,
              attractionsSize: DEFAULT_CONFIG.attractionsSize,
              rulesFont: DEFAULT_CONFIG.rulesFont,
              rulesColor: DEFAULT_CONFIG.rulesColor,
              rulesSize: DEFAULT_CONFIG.rulesSize,
              confiraFont: DEFAULT_CONFIG.confiraFont,
              confiraColor: DEFAULT_CONFIG.confiraColor,
              confiraSize: DEFAULT_CONFIG.confiraSize,
              exclusiveDateFont: DEFAULT_CONFIG.exclusiveDateFont,
              exclusiveDateColor: DEFAULT_CONFIG.exclusiveDateColor,
              exclusiveDateSize: DEFAULT_CONFIG.exclusiveDateSize,
              cardValueFont: DEFAULT_CONFIG.cardValueFont,
              cardValueColor: DEFAULT_CONFIG.cardValueColor,
              cardValueSize: DEFAULT_CONFIG.cardValueSize,
            });
          }}
          className="text-xs text-slate-500 hover:text-slate-800 transition underline underline-offset-2 cursor-pointer"
        >
          Restaurar padrão
        </button>
        <span className="text-slate-300 text-xs">|</span>
        <button
          onClick={() => {
            updateConfig({
              title: '',
              subtitle: '',
              attractions: '',
              confira: '',
              rules: '',
              exclusiveDate: '',
              cardValue: '',
              titleFont: DEFAULT_CONFIG.titleFont,
              titleColor: DEFAULT_CONFIG.titleColor,
              titleShadow: DEFAULT_CONFIG.titleShadow,
              titleSize: DEFAULT_CONFIG.titleSize,
              titlePreset: DEFAULT_CONFIG.titlePreset,
              subtitleFont: '',
              subtitleColor: '',
              subtitleSize: '',
              attractionsFont: '',
              attractionsColor: '',
              attractionsSize: '',
              rulesFont: '',
              rulesColor: '',
              rulesSize: '',
              confiraFont: '',
              confiraColor: '',
              confiraSize: '',
              exclusiveDateFont: '',
              exclusiveDateColor: '',
              exclusiveDateSize: '',
              cardValueFont: '',
              cardValueColor: '',
              cardValueSize: '',
            });
          }}
          className="text-xs text-red-500 hover:text-red-700 transition underline underline-offset-2 cursor-pointer"
        >
          Limpar tudo
        </button>
      </div>
    </div>
  );
}

export default TextosTab;
