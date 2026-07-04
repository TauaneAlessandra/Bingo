export function generateDrawReport(called, numberRange, getColumnForNumber) {
  if (called.length === 0) return '';

  const stats = { B: 0, I: 0, N: 0, G: 0, O: 0 };
  called.forEach(n => {
    const col = getColumnForNumber(n, numberRange);
    stats[col]++;
  });

  const orderOfDraw = [...called].reverse().join(' -> ');

  return `=== RELATÓRIO DO SORTEIO DE BINGO - BRINGO ===
Data/Hora: ${new Date().toLocaleString('pt-BR')}
Total de Bolas Sorteadas: ${called.length}
Ordem das Bolas Chamadas:
${orderOfDraw}

Distribuição por Colunas:
B: ${stats.B} dezenas
I: ${stats.I} dezenas
N: ${stats.N} dezenas
G: ${stats.G} dezenas
O: ${stats.O} dezenas

=============================================
Gerado automaticamente pelo Bringo.`;
}
