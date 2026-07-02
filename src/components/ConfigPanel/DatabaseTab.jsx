import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, XCircle, Trash2, Calendar, RefreshCw, Layers } from 'lucide-react';
import { checkBackendStatus, generateBackendCards, getBackendBatches, deleteBackendBatch } from '../../utils/api';

function DatabaseTab({ config, refreshCards }) {
  const [status, setStatus] = useState({ online: false, total_cards: 0 });
  const [batches, setBatches] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [deletingDate, setDeletingDate] = useState(null);

  // Form states
  const [genQuantity, setGenQuantity] = useState(2000);
  const [genDate, setGenDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startNumOverride, setStartNumOverride] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadBackendInfo = async () => {
    setLoadingStatus(true);
    setErrorMsg('');
    try {
      const currentStatus = await checkBackendStatus();
      setStatus(currentStatus);
      if (currentStatus.online) {
        const list = await getBackendBatches();
        setBatches(list);
      }
    } catch (err) {
      console.error(err);
      setStatus({ online: false, total_cards: 0 });
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    loadBackendInfo();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (genQuantity <= 0) {
      setErrorMsg('A quantidade deve ser maior que 0.');
      return;
    }
    setGenerating(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const startNum = startNumOverride ? parseInt(startNumOverride) : null;
      const res = await generateBackendCards(
        genQuantity,
        genDate,
        config.numberRange || 75,
        startNum
      );
      setSuccessMsg(`Gerado com sucesso! Lote: #${res.start_number} até #${res.end_number}`);
      setStartNumOverride('');
      // Reload lists
      await loadBackendInfo();
      // Notify parent to refresh current view if needed
      if (refreshCards) refreshCards();
    } catch (err) {
      setErrorMsg(err.message || 'Erro de conexão ou conflito de numeração.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (dateStr) => {
    if (!window.confirm(`Tem certeza de que deseja apagar todas as cartelas geradas em ${dateStr}? Isso não pode ser desfeito.`)) {
      return;
    }
    setDeletingDate(dateStr);
    try {
      await deleteBackendBatch(dateStr);
      setSuccessMsg(`Lote do dia ${dateStr} removido.`);
      await loadBackendInfo();
      if (refreshCards) refreshCards();
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao deletar lote.');
    } finally {
      setDeletingDate(null);
    }
  };

  return (
    <div className="space-y-5 flex flex-col font-sans">
      {/* Connection Status Panel */}
      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center gap-3">
          <Database className={`w-6 h-6 ${status.online ? 'text-emerald-500' : 'text-slate-400'}`} />
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Banco de Dados SQLite</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {status.online 
                ? `${status.total_cards.toLocaleString()} cartelas no total`
                : 'Backend offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status.online ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> Online
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              <XCircle className="w-3 h-3" /> Offline
            </span>
          )}
          <button 
            onClick={loadBackendInfo}
            disabled={loadingStatus}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-40 transition"
            title="Atualizar conexao"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingStatus ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold">
          {successMsg}
        </div>
      )}

      {status.online ? (
        <>
          {/* Generation Section */}
          <form onSubmit={handleGenerate} className="space-y-4 border border-slate-200 p-4 rounded-2xl bg-white shadow-sm">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-500" /> Gerar Novo Lote Diário
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <md-outlined-text-field
                type="date"
                label="Data de Geração"
                value={genDate}
                onInput={(e) => setGenDate(e.target.value)}
                required
              />
              <md-outlined-text-field
                type="number"
                min="1"
                max="5000"
                label="Qtd Cartelas (Máx 5000)"
                value={genQuantity}
                onInput={(e) => setGenQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                required
              />
            </div>

            <md-outlined-text-field
              type="number"
              min="1"
              label="Iniciar no nº (Vazio = Automático)"
              value={startNumOverride}
              onInput={(e) => setStartNumOverride(e.target.value)}
            />

            <button
              type="submit"
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-md hover:shadow-lg disabled:shadow-none"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Gerando cartelas únicas...
                </>
              ) : (
                'Gerar e Salvar no Banco'
              )}
            </button>
            <p className="text-[10px] text-slate-500 text-center">
              Cada cartela terá 4 grades independentes e configuração hash única verificada.
            </p>
          </form>

          {/* Batches list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Lotes Gerados no Banco
            </h4>

            {batches.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                Nenhum lote gerado ainda. Use o formulário acima para gerar o primeiro lote.
              </p>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {batches.map((batch) => (
                  <div key={`${batch.date}-${batch.number_range}`} className="flex items-center justify-between p-3 border border-slate-150 rounded-xl hover:bg-slate-50 transition">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{batch.date}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        Cartelas: #{batch.start_number} - #{batch.end_number} ({batch.count} unid, 1-{batch.number_range})
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(batch.date)}
                      disabled={deletingDate === batch.date}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition disabled:opacity-40"
                      title="Deletar Lote"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <Database className="w-10 h-10 text-amber-500 animate-pulse mt-1" />
          <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wide">Servidor de Banco de Dados Desconectado</h5>
          <p className="text-xs text-slate-600 leading-relaxed max-w-[280px]">
            Para habilitar a geração de cartelas com garantia de não repetição física no SQLite, ative o backend rodando o arquivo:
          </p>
          <code className="text-[10px] bg-white border border-amber-300 px-2.5 py-1.5 rounded-lg font-mono text-amber-800 select-all font-bold">
            backend/run_backend.bat
          </code>
          <p className="text-[10px] text-slate-500 leading-normal mt-1">
            Enquanto offline, o sistema continuará gerando cartelas locais dinâmicas usando o gerador seeded, mas sem salvar no banco de dados.
          </p>
        </div>
      )}
    </div>
  );
}

export default DatabaseTab;
