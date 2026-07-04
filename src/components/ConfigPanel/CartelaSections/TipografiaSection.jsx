import React from 'react';
import { Type, LayoutGrid } from 'lucide-react';
import SliderField from '../SliderField';

function TipografiaSection({ config, updateConfig }) {
  return (
    <>
      {/* ── Fundo das Grades ── */}
      <div className="section-card">
        <div className="section-card-title">
          <LayoutGrid size={14} />
          Fundo das Grades
        </div>
        <div className="flex gap-2">
          {[
            { key: 'soft',  label: 'Colorido Suave' },
            { key: 'white', label: 'Branco Limpo'   },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => updateConfig({ gridBackgroundStyle: opt.key })}
              className={`flex-1 py-2 rounded-xl border-2 font-bold text-xs transition cursor-pointer ${
                config.gridBackgroundStyle === opt.key
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tipografia da Grade ── */}
      <div className="section-card">
        <div className="section-card-title">
          <Type size={14} />
          Tipografia da Grade
        </div>

        <div className="field-group">
          <div className="field-label">
            <Type size={12} /> Fonte dos Números
          </div>
          <select
            value={config.gridNumberFont || 'Share Tech Mono'}
            onChange={(e) => updateConfig({ gridNumberFont: e.target.value })}
            className="text-xs p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 w-full cursor-pointer"
          >
            <option value="Share Tech Mono">Share Tech Mono — Digital</option>
            <option value="Outfit">Outfit — Moderna</option>
            <option value="Inter">Inter — Limpa</option>
            <option value="Fredoka">Fredoka — Divertida</option>
            <option value="Patrick Hand">Patrick Hand — Escrita à Mão</option>
            <option value="Gloria Hallelujah">Gloria Hallelujah — Giz</option>
          </select>
        </div>

        <SliderField
          label="Tamanho dos Números"
          icon={Type}
          min={12}
          max={28}
          value={parseInt(config.gridNumberSize || '18')}
          onChange={(e) => updateConfig({ gridNumberSize: `${e.target.value}px` })}
          unit="px"
        />

        <SliderField
          label="Tamanho dos Textos da Grade"
          icon={Type}
          min={8}
          max={18}
          value={parseInt(config.gridLabelSize || '11')}
          onChange={(e) => updateConfig({ gridLabelSize: `${e.target.value}px` })}
          unit="px"
        />
      </div>
    </>
  );
}

export default TipografiaSection;
