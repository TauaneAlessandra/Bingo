import React from 'react';
import { Sparkles } from 'lucide-react';
import { THEME_PRESETS } from '../constants';

function TemasSection({ updateConfig }) {
  return (
    <div className="section-card">
      <div className="section-card-title">
        <Sparkles size={14} />
        Temas Coordenados
      </div>
      <div className="flex flex-col gap-2">
        {THEME_PRESETS.map((theme) => (
          <button
            key={theme.name}
            type="button"
            onClick={() =>
              updateConfig({
                accentColor: theme.accentColor,
                grid1Color: theme.grids[0],
                grid2Color: theme.grids[1],
                grid3Color: theme.grids[2],
                grid4Color: theme.grids[3],
                grid5Color: theme.grids[4],
                grid6Color: theme.grids[5],
                multiColor: true,
              })
            }
            className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition cursor-pointer text-left shadow-sm hover:shadow active:scale-[0.99]"
          >
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {theme.name}
            </span>
            <div className="flex gap-1">
              {theme.grids.map((color, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-700 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemasSection;
