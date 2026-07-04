import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logError, logWarn, logInfo } from '../logger.js';

describe('logger', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = {
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      info: vi.spyOn(console, 'info').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── logError ────────────────────────────────────────────────────────────────

  describe('logError', () => {
    it('calls console.error', () => {
      logError('TestModule', 'Something broke', new Error('boom'));
      expect(consoleSpy.error).toHaveBeenCalledOnce();
    });

    it('includes the module name in the output', () => {
      logError('MyModule', 'test error');
      const callArg = consoleSpy.error.mock.calls[0];
      const output = callArg.join(' ');
      expect(output).toContain('MyModule');
    });

    it('includes the message in the output', () => {
      logError('MyModule', 'custom message here');
      const callArg = consoleSpy.error.mock.calls[0];
      const output = callArg.join(' ');
      expect(output).toContain('custom message here');
    });

    it('does not throw when called with minimal arguments', () => {
      expect(() => logError('Mod', 'msg')).not.toThrow();
    });
  });

  // ── logWarn ─────────────────────────────────────────────────────────────────

  describe('logWarn', () => {
    it('calls console.warn', () => {
      logWarn('TestModule', 'A warning', { detail: 42 });
      expect(consoleSpy.warn).toHaveBeenCalledOnce();
    });

    it('includes the module name in the output', () => {
      logWarn('WarnMod', 'warn message');
      const callArg = consoleSpy.warn.mock.calls[0];
      const output = callArg.join(' ');
      expect(output).toContain('WarnMod');
    });
  });

  // ── logInfo ─────────────────────────────────────────────────────────────────

  describe('logInfo', () => {
    it('calls console.info in development mode', () => {
      logInfo('TestModule', 'Some info');
      // In test environment (non-prod), info should be logged
      expect(consoleSpy.info).toHaveBeenCalledOnce();
    });
  });
});
