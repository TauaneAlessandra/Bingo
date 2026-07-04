import React from 'react';
import PropTypes from 'prop-types';
import { logError } from '../utils/logger.js';


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logError('ErrorBoundary', 'Unhandled render error caught', {
      error: error?.toString(),
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    });
  }


  handleReset = () => {
    try {
      localStorage.clear();
      // Also clear IndexedDB
      const req = indexedDB.deleteDatabase('bringo-db');
      req.onsuccess = () => {
        window.location.reload();
      };
      req.onerror = () => {
        window.location.reload();
      };
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
              ⚠️
            </div>
            
            <h1 className="font-outfit font-bold text-2xl tracking-wide text-white">Ops, algo deu errado!</h1>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Ocorreu um erro inesperado na renderização da aplicação. Isso pode ter sido causado por arquivos de configuração inconsistentes ou dados corrompidos.
            </p>

            {this.state.error && (
              <div className="w-full bg-slate-950 p-4 rounded-xl text-left border border-slate-850 overflow-x-auto">
                <code className="text-xs text-red-400 font-mono block break-all">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-755 text-white font-medium rounded-xl text-sm transition"
              >
                Tentar Novamente
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl text-sm transition"
              >
                Limpar Tudo e Reiniciar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
