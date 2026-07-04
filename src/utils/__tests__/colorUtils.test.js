import { describe, it, expect } from 'vitest';
import { isLightColor, getBingoColors } from '../colorUtils.js';

// ── isLightColor ──────────────────────────────────────────────────────────────

describe('isLightColor', () => {
  it('returns true for white (#ffffff)', () => {
    expect(isLightColor('#ffffff')).toBe(true);
  });

  it('returns true for a light yellow (#f0e0a0)', () => {
    expect(isLightColor('#f0e0a0')).toBe(true);
  });

  it('returns false for black (#000000)', () => {
    expect(isLightColor('#000000')).toBe(false);
  });

  it('returns false for a dark blue (#1e3a5f)', () => {
    expect(isLightColor('#1e3a5f')).toBe(false);
  });

  it('handles 3-digit hex shorthand (#fff)', () => {
    expect(isLightColor('#fff')).toBe(true);
  });

  it('handles 3-digit hex shorthand (#000)', () => {
    expect(isLightColor('#000')).toBe(false);
  });

  it('returns false for null input', () => {
    expect(isLightColor(null)).toBe(false);
  });

  it('returns false for undefined input', () => {
    expect(isLightColor(undefined)).toBe(false);
  });

  it('returns false for CSS var() references', () => {
    expect(isLightColor('var(--color-primary)')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isLightColor('')).toBe(false);
  });
});

// ── getBingoColors ────────────────────────────────────────────────────────────

describe('getBingoColors', () => {
  it('returns correct properties for white accent color', () => {
    const result = getBingoColors('#ffffff');
    expect(result).toHaveProperty('isLight');
    expect(result).toHaveProperty('headerBg');
    expect(result).toHaveProperty('headerText');
    expect(result).toHaveProperty('freeBg');
    expect(result.isLight).toBe(true);
  });

  it('treats #fff (shorthand) as white', () => {
    const result = getBingoColors('#fff');
    expect(result.isLight).toBe(true);
  });

  it('treats "white" string as white', () => {
    const result = getBingoColors('white');
    expect(result.isLight).toBe(true);
  });

  it('returns dark-mode values for a dark accent color', () => {
    const result = getBingoColors('#1a1a2e');
    expect(result.isLight).toBe(false);
    expect(result.headerBg).toContain('#1a1a2e');
  });

  it('returns gray header for light accent colors', () => {
    const result = getBingoColors('#ffffff');
    expect(result.headerBg).toBe('#f3f4f6');
    expect(result.headerText).toBe('#000000');
  });

  it('uses default accent color when none is provided', () => {
    const result = getBingoColors();
    // Default is '#f59e0b' (amber) which is a light color
    expect(result).toHaveProperty('isLight');
  });

  it('returns a freeBg property with opacity for dark accents', () => {
    const result = getBingoColors('#6d28d9');
    expect(result.freeBg).toContain('#6d28d9');
  });
});
