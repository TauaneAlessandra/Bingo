/**
 * Logger estruturado para o Bringo.
 *
 * Garante que todos os erros e avisos tenham contexto útil (módulo, timestamp, dados).
 * Em produção, está pronto para integração com um serviço como Sentry
 * através da variável de ambiente VITE_SENTRY_DSN.
 *
 * @module logger
 */

const IS_PROD = import.meta.env?.PROD ?? false;
const APP_VERSION = import.meta.env?.VITE_APP_VERSION ?? '1.0.0';

/**
 * Formata uma entrada de log como um objeto estruturado.
 * @param {'error'|'warn'|'info'} level
 * @param {string} module - Identificador do módulo de origem (ex: 'IndexedDB', 'ErrorBoundary')
 * @param {string} message
 * @param {unknown} [data]
 */
function createLogEntry(level, module, message, data) {
  return {
    level,
    module,
    message,
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
    ...(data !== undefined ? { data } : {}),
  };
}

/**
 * Registra um erro crítico. Use para falhas que afetam o usuário.
 *
 * @param {string} module - Nome do módulo ou componente de origem.
 * @param {string} message - Descrição legível do erro.
 * @param {unknown} [error] - O objeto Error ou dados adicionais.
 */
export function logError(module, message, error) {
  const entry = createLogEntry('error', module, message, error);

  // Em desenvolvimento: exibe no console com destaque visual
  if (!IS_PROD) {
    console.error(`[Bringo:${module}]`, message, error ?? '');
    return;
  }

  // Em produção: log estruturado + hook para serviço externo (ex: Sentry)
  console.error(JSON.stringify(entry));

  // Hook de integração com serviço externo.
  // Para ativar o Sentry, configure VITE_SENTRY_DSN e descomente:
  // if (window.__SENTRY__) {
  //   window.__SENTRY__.captureException(error instanceof Error ? error : new Error(message), {
  //     extra: { module, version: APP_VERSION },
  //   });
  // }
}

/**
 * Registra um aviso não-crítico. Use para comportamentos degradados mas funcionais.
 *
 * @param {string} module - Nome do módulo ou componente de origem.
 * @param {string} message - Descrição legível do aviso.
 * @param {unknown} [data] - Dados de contexto adicionais.
 */
export function logWarn(module, message, data) {
  const entry = createLogEntry('warn', module, message, data);

  if (!IS_PROD) {
    console.warn(`[Bringo:${module}]`, message, data ?? '');
    return;
  }

  console.warn(JSON.stringify(entry));
}

/**
 * Registra informações de diagnóstico. Desativado em produção.
 *
 * @param {string} module - Nome do módulo ou componente de origem.
 * @param {string} message - Mensagem informativa.
 * @param {unknown} [data] - Dados de contexto adicionais.
 */
export function logInfo(module, message, data) {
  // Info logs são suprimidos em produção para reduzir ruído
  if (IS_PROD) return;

  console.info(`[Bringo:${module}]`, message, data ?? '');
}
