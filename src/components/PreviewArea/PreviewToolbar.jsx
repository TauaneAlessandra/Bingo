import React from 'react';
import PropTypes from 'prop-types';
import { Eye, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

function PreviewToolbar({
  previewIndex,
  setPreviewIndex,
  quantity,
  startNum,
  zoom,
  setZoom,
}) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-5 py-2.5 flex items-center justify-between gap-3 flex-wrap shrink-0">
      {/* Badge de navegação */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <Eye className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Cartela
          </span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {previewIndex + 1}
          </span>
          <span className="text-xs text-slate-400">/</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{quantity}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(40, z - 10))}
            className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
            title="Diminuir Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(100)}
            className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition min-w-[38px] text-center cursor-pointer"
            title="Clique para resetar zoom (100%)"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(180, z + 10))}
            className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />

        {/* Navigation Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            disabled={previewIndex === 0}
            onClick={() => setPreviewIndex((p) => Math.max(0, p - 1))}
            className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            title="Cartela anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span
            className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 min-w-[56px] text-center"
            title="Número da cartela"
          >
            #{String(startNum + previewIndex).padStart(5, '0')}
          </span>
          <button
            disabled={previewIndex >= quantity - 1}
            onClick={() => setPreviewIndex((p) => Math.min(quantity - 1, p + 1))}
            className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            title="Próxima cartela"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

PreviewToolbar.propTypes = {
  previewIndex: PropTypes.number.isRequired,
  setPreviewIndex: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  startNum: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  setZoom: PropTypes.func.isRequired,
};

export default PreviewToolbar;
