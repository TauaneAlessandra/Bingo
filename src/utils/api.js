const API_BASE = 'http://localhost:5001/api';

/**
 * Check if the backend server is online and connected to SQLite.
 */
export async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_BASE}/status`, { signal: AbortSignal.timeout(1500) });
    if (!res.ok) return { online: false, message: 'Server error' };
    const data = await res.json();
    return { online: true, ...data };
  } catch {
    return { online: false };
  }
}

/**
 * Fetch config saved in the backend database.
 */
export async function getBackendConfig() {
  try {
    const res = await fetch(`${API_BASE}/config`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Save config to the backend database.
 */
export async function saveBackendConfig(config) {
  try {
    const res = await fetch(`${API_BASE}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
      signal: AbortSignal.timeout(2000)
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Generate a batch of unique cards.
 */
export async function generateBackendCards(quantity, dateStr, numberRange, startNumber = null) {
  try {
    const res = await fetch(`${API_BASE}/cards/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity,
        date: dateStr,
        number_range: numberRange,
        start_number: startNumber
      })
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Erro ao gerar cartelas');
    }
    return data;
  } catch (error) {
    console.error('API Error in generateBackendCards:', error);
    throw error;
  }
}

/**
 * Fetch cards from backend database with optional filters.
 */
export async function getBackendCards({ date, number, start, quantity, page = 1, limit = 50 }) {
  try {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (number) params.append('number', number);
    if (start) params.append('start', start);
    if (quantity) params.append('quantity', quantity);
    params.append('page', page);
    params.append('limit', limit);

    const res = await fetch(`${API_BASE}/cards?${params.toString()}`);
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Erro ao carregar cartelas');
    }
    return await res.json();
  } catch (error) {
    console.error('API Error in getBackendCards:', error);
    throw error;
  }
}

/**
 * Fetch a single card by card number for validation.
 */
export async function getBackendCardByNumber(cardNumber) {
  try {
    const res = await fetch(`${API_BASE}/cards/${cardNumber}`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || `Cartela #${cardNumber} não encontrada.`);
    }
    return await res.json();
  } catch (error) {
    console.error(`API Error in getBackendCardByNumber (${cardNumber}):`, error);
    throw error;
  }
}

/**
 * Fetch the lists of batches.
 */
export async function getBackendBatches() {
  try {
    const res = await fetch(`${API_BASE}/batches`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/**
 * Delete a batch of cards by date.
 */
export async function deleteBackendBatch(dateStr) {
  try {
    const res = await fetch(`${API_BASE}/batches/${dateStr}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Erro ao deletar lote');
    }
    return data;
  } catch (error) {
    console.error('API Error in deleteBackendBatch:', error);
    throw error;
  }
}
