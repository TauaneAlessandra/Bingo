import React from 'react';
import PropTypes from 'prop-types';
import { Ticket } from 'lucide-react';

function Brand({ accentColor }) {
  return (
    <div className="flex items-center space-x-3">
      <div
        className="p-2.5 rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
        style={{
          background:
            accentColor === '#ffffff'
              ? '#1e293b'
              : `linear-gradient(135deg, ${accentColor}, #ef4444)`,
        }}
      >
        <Ticket className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-outfit font-bold text-xl text-slate-800 dark:text-white tracking-wide leading-none">
            Bringo
          </h1>
          <span className="hidden sm:inline text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full tracking-wide">
            v2.0
          </span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
          Gerador de Cartelas de Bingo
        </p>
      </div>
    </div>
  );
}

Brand.propTypes = {
  accentColor: PropTypes.string.isRequired,
};

export default Brand;
