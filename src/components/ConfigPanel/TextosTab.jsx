import React, { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from '../../utils/useDebounce';

function TextosTab({ config, updateConfig, DEFAULT_CONFIG }) {
  // Local state for responsive typing — syncs to parent via debounce
  const [localTitle, setLocalTitle] = useState(config.title);
  const [localSubtitle, setLocalSubtitle] = useState(config.subtitle);
  const [localAttractions, setLocalAttractions] = useState(config.attractions);
  const [localRules, setLocalRules] = useState(config.rules);
  const [localExclusiveDate, setLocalExclusiveDate] = useState(config.exclusiveDate);

  // Sync from parent config when it changes externally (e.g. reset, backend sync)
  useEffect(() => { setLocalTitle(config.title); }, [config.title]);
  useEffect(() => { setLocalSubtitle(config.subtitle); }, [config.subtitle]);
  useEffect(() => { setLocalAttractions(config.attractions); }, [config.attractions]);
  useEffect(() => { setLocalRules(config.rules); }, [config.rules]);
  useEffect(() => { setLocalExclusiveDate(config.exclusiveDate); }, [config.exclusiveDate]);

  // Debounced updaters (300ms delay)
  const debouncedUpdateTitle = useDebouncedCallback((v) => updateConfig({ title: v }), 300);
  const debouncedUpdateSubtitle = useDebouncedCallback((v) => updateConfig({ subtitle: v }), 300);
  const debouncedUpdateAttractions = useDebouncedCallback((v) => updateConfig({ attractions: v }), 300);
  const debouncedUpdateRules = useDebouncedCallback((v) => updateConfig({ rules: v }), 300);
  const debouncedUpdateExclDate = useDebouncedCallback((v) => updateConfig({ exclusiveDate: v }), 300);

  return (
    <div className="space-y-4 flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Textos do Cabeçalho</h3>

      <md-outlined-text-field
        label="Título do Evento"
        value={localTitle}
        onInput={(e) => {
          const v = e.target.value.toUpperCase();
          setLocalTitle(v);
          debouncedUpdateTitle(v);
        }}
      />
      <md-outlined-text-field
        label="Horário e Datas"
        value={localSubtitle}
        onInput={(e) => {
          setLocalSubtitle(e.target.value);
          debouncedUpdateSubtitle(e.target.value);
        }}
      />
      <md-outlined-text-field
        label="Atrações (separadas por |)"
        value={localAttractions}
        onInput={(e) => {
          setLocalAttractions(e.target.value);
          debouncedUpdateAttractions(e.target.value);
        }}
      />
      <md-outlined-text-field
        label="Informações Gerais / Regras"
        value={localRules}
        onInput={(e) => {
          setLocalRules(e.target.value);
          debouncedUpdateRules(e.target.value);
        }}
      />
      <md-outlined-text-field
        label="Aviso Vermelho (data exclusiva etc.)"
        value={localExclusiveDate}
        onInput={(e) => {
          const v = e.target.value.toUpperCase();
          setLocalExclusiveDate(v);
          debouncedUpdateExclDate(v);
        }}
      />

      <button
        onClick={() => {
          updateConfig({
            title: DEFAULT_CONFIG.title,
            subtitle: DEFAULT_CONFIG.subtitle,
            attractions: DEFAULT_CONFIG.attractions,
            rules: DEFAULT_CONFIG.rules,
            exclusiveDate: DEFAULT_CONFIG.exclusiveDate,
          });
          setLocalTitle(DEFAULT_CONFIG.title);
          setLocalSubtitle(DEFAULT_CONFIG.subtitle);
          setLocalAttractions(DEFAULT_CONFIG.attractions);
          setLocalRules(DEFAULT_CONFIG.rules);
          setLocalExclusiveDate(DEFAULT_CONFIG.exclusiveDate);
        }}
        className="self-start text-xs text-slate-500 hover:text-slate-300 transition underline underline-offset-2"
      >
        Restaurar padrão
      </button>
    </div>
  );
}

export default TextosTab;

