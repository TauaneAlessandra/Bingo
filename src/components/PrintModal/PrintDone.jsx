import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function PrintDone() {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <CheckCircle className="w-12 h-12 text-green-400" />
      <p className="text-white font-semibold">Pronto! Abrindo impressora...</p>
    </div>
  );
}
