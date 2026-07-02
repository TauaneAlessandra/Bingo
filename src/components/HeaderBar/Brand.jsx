import React from 'react';
import { Ticket, Database } from 'lucide-react';

function Brand({ accentColor, backendOnline }) {
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
          <h1 className="font-outfit font-bold text-xl text-slate-800 tracking-wide">Bringo</h1>
          {backendOnline && (
            <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200" title="Banco SQLite Conectado">
              <Database className="w-2.5 h-2.5" /> SQL
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">Gerador Premium de Cartelas de Bingo</p>
      </div>
    </div>
  );
}

export default Brand;
