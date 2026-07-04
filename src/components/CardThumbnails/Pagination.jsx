import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component for navigating between pages in the thumbnail view.
 */
export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200 bg-slate-50">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition cursor-pointer font-medium"
      >
        ← Ant
      </button>
      <span className="text-[10px] text-slate-500 font-mono font-medium">{page + 1} / {totalPages}</span>
      <button
        onClick={onNext}
        disabled={page >= totalPages - 1}
        className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition cursor-pointer font-medium"
      >
        Prox →
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};
