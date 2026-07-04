import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// ── Mock IndexedDB module ─────────────────────────────────────────────────────
vi.mock('../../utils/indexedDB.js', () => ({
  getImage: vi.fn().mockResolvedValue(null),
  setImage: vi.fn().mockResolvedValue(undefined),
  deleteImage: vi.fn().mockResolvedValue(undefined),
  clearImages: vi.fn().mockResolvedValue(undefined),
}));

import { getImage, setImage, deleteImage, clearImages } from '../../utils/indexedDB.js';
import { useImageUploads } from '../useImageUploads.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Creates a minimal File mock with a DataURL result via FileReader */
function createFileMock(name = 'logo.png', type = 'image/png') {
  const file = new File(['(binary)'], name, { type });
  return file;
}

/** Simulates a file input change event */
function createChangeEvent(files) {
  return { target: { files } };
}

describe('useImageUploads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: no stored images
    getImage.mockResolvedValue(null);
  });

  // ── Initial state ─────────────────────────────────────────────────────────

  it('initializes all image states as null or empty array', () => {
    const { result } = renderHook(() => useImageUploads());
    expect(result.current.logoData).toBeNull();
    expect(result.current.centerLogoData).toBeNull();
    expect(result.current.realizadoPorLogo).toBeNull();
    expect(result.current.qrCodeLogo).toBeNull();
    expect(result.current.sponsorsLogos).toEqual([]);
  });

  it('loads stored images from IndexedDB on mount', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'logoData') return 'data:image/png;base64,LOGO';
      if (key === 'sponsorsLogos') return ['data:image/png;base64,SPONSOR'];
      return null;
    });

    const { result } = renderHook(() => useImageUploads());

    // Wait for async useEffect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.logoData).toBe('data:image/png;base64,LOGO');
    expect(result.current.sponsorsLogos).toEqual(['data:image/png;base64,SPONSOR']);
  });

  // ── resetLogo ─────────────────────────────────────────────────────────────

  it('resetLogo sets logoData to null and calls deleteImage', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'logoData') return 'data:image/png;base64,LOGO';
      return null;
    });

    const { result } = renderHook(() => useImageUploads());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => { result.current.resetLogo(); });

    expect(result.current.logoData).toBeNull();
    expect(deleteImage).toHaveBeenCalledWith('logoData');
  });

  // ── removeSponsorsLogo ────────────────────────────────────────────────────

  it('removeSponsorsLogo removes sponsor at the given index', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'sponsorsLogos') return ['logo1', 'logo2', 'logo3'];
      return null;
    });

    const { result } = renderHook(() => useImageUploads());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => { result.current.removeSponsorsLogo(1); }); // Remove 'logo2'

    expect(result.current.sponsorsLogos).toEqual(['logo1', 'logo3']);
    expect(setImage).toHaveBeenCalledWith('sponsorsLogos', ['logo1', 'logo3']);
  });

  // ── resetCenterLogo ───────────────────────────────────────────────────────

  it('resetCenterLogo clears centerLogoData and calls deleteImage', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'centerLogoData') return 'data:image/png;base64,CENTER';
      return null;
    });

    const { result } = renderHook(() => useImageUploads());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => { result.current.resetCenterLogo(); });

    expect(result.current.centerLogoData).toBeNull();
    expect(deleteImage).toHaveBeenCalledWith('centerLogoData');
  });

  // ── resetRealizadoPorLogo ─────────────────────────────────────────────────

  it('resetRealizadoPorLogo clears realizadoPorLogo and calls deleteImage', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'realizadoPorLogo') return 'data:image/png;base64,REALIZADO';
      return null;
    });

    const { result } = renderHook(() => useImageUploads());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => { result.current.resetRealizadoPorLogo(); });

    expect(result.current.realizadoPorLogo).toBeNull();
    expect(deleteImage).toHaveBeenCalledWith('realizadoPorLogo');
  });

  // ── resetQrCodeLogo ───────────────────────────────────────────────────────

  it('resetQrCodeLogo clears qrCodeLogo and calls deleteImage', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'qrCodeLogo') return 'data:image/png;base64,QRCODE';
      return null;
    });

    const { result } = renderHook(() => useImageUploads());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => { result.current.resetQrCodeLogo(); });

    expect(result.current.qrCodeLogo).toBeNull();
    expect(deleteImage).toHaveBeenCalledWith('qrCodeLogo');
  });

  // ── clearAllImages ────────────────────────────────────────────────────────

  it('clearAllImages resets all states and calls clearImages()', async () => {
    getImage.mockImplementation(async (key) => {
      if (key === 'logoData') return 'data:image/png;base64,LOGO';
      if (key === 'sponsorsLogos') return ['s1', 's2'];
      return null;
    });

    const { result } = renderHook(() => useImageUploads());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => { result.current.clearAllImages(); });

    expect(result.current.logoData).toBeNull();
    expect(result.current.centerLogoData).toBeNull();
    expect(result.current.realizadoPorLogo).toBeNull();
    expect(result.current.qrCodeLogo).toBeNull();
    expect(result.current.sponsorsLogos).toEqual([]);
    expect(clearImages).toHaveBeenCalledOnce();
  });

  // ── API shape ─────────────────────────────────────────────────────────────

  it('exposes all expected public functions', () => {
    const { result } = renderHook(() => useImageUploads());
    expect(typeof result.current.handleImageUpload).toBe('function');
    expect(typeof result.current.resetLogo).toBe('function');
    expect(typeof result.current.handleSponsorsImageUpload).toBe('function');
    expect(typeof result.current.removeSponsorsLogo).toBe('function');
    expect(typeof result.current.handleCenterImageUpload).toBe('function');
    expect(typeof result.current.resetCenterLogo).toBe('function');
    expect(typeof result.current.handleRealizadoPorImageUpload).toBe('function');
    expect(typeof result.current.resetRealizadoPorLogo).toBe('function');
    expect(typeof result.current.handleQrCodeImageUpload).toBe('function');
    expect(typeof result.current.resetQrCodeLogo).toBe('function');
    expect(typeof result.current.clearAllImages).toBe('function');
  });
});
