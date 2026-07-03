import React from 'react';
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
    <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
      <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <Eye className="w-4 h-4 text-slate-600" />
        Visualização — Cartela {previewIndex + 1} de {quantity}
      </span>

      <div className="flex items-center gap-4">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
          <button
            type="button"
            onClick={() => setZoom(z => Math.max(40, z - 10))}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            title="Diminuir Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(100)}
            className="text-xs font-mono text-slate-600 hover:text-slate-800 transition min-w-[45px] text-center"
            title="Resetar Zoom"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={() => setZoom(z => Math.min(180, z + 10))}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={previewIndex === 0}
            onClick={() => setPreviewIndex(p => Math.max(0, p - 1))}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-700 min-w-[60px] text-center">
            #{String(startNum + previewIndex).padStart(5, '0')}
          </span>
          <button
            disabled={previewIndex >= quantity - 1}
            onClick={() => setPreviewIndex(p => Math.min(quantity - 1, p + 1))}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewToolbar;
