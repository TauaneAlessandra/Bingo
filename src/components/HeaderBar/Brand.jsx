import React from 'react';
import PropTypes from 'prop-types';
import { Ticket } from 'lucide-react';

function Brand({ accentColor }) {
  return (
    <div className="flex items-center space-x-3">
      <div 
        className="p-2.5 rounded-xl shadow-md" 
        style={{ 
          background: accentColor === '#ffffff' 
            ? '#1e293b' 
            : `linear-gradient(135deg, ${accentColor}, #ef4444)` 
        }}
      >
        <Ticket className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-outfit font-bold text-xl text-slate-800 dark:text-white tracking-wide">Bringo</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Gerador Premium de Cartelas de Bingo</p>
      </div>
    </div>
  );
}

Brand.propTypes = {
  accentColor: PropTypes.string.isRequired,
};

export default Brand;
