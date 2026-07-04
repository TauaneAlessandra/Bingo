export const STORAGE_KEY = 'bringo-config-v2';

export const DEFAULT_CONFIG = {
  title: '',
  subtitle: '',
  attractions: '',
  rules: '',
  exclusiveDate: '',
  prizes: ['', '', '', ''],
  numberRange: 75,
  accentColor: '#ffffff',
  textColor: '#000000',
  warningColor: '#dc2626',
  centerSpaceType: 'star',
  sponsorsTitle: '',
  realizadoPorTitle: '',
  qrCodeTitle: '',
  confira: '',
  cardValue: '',
  multiColor: true,
  titleFont: 'Outfit',
  titleColor: '#000000',
  titleShadow: '',
  titleSize: '24px',
  titlePreset: 'default',
  subtitleFont: '',
  subtitleColor: '',
  subtitleSize: '',
  attractionsFont: '',
  attractionsColor: '',
  attractionsSize: '',
  rulesFont: '',
  rulesColor: '',
  rulesSize: '',
  confiraFont: '',
  confiraColor: '',
  confiraSize: '',
  exclusiveDateFont: '',
  exclusiveDateColor: '',
  exclusiveDateSize: '',
  cardValueFont: '',
  cardValueColor: '',
  cardValueSize: '',
  grid1Color: '#3b82f6',
  grid2Color: '#10b981',
  grid3Color: '#e11d48',
  grid4Color: '#8b5cf6',
  grid5Color: '#ea580c',
  grid6Color: '#db2777',
  gridNumberFont: 'mono',
  gridBackgroundStyle: 'soft',
  gridNumberSize: '18px',
  gridLabelSize: '11px',
  cardBorderSize: '2px',
  cardBorderStyle: 'solid',
  cardBorderColor: '#000000',
  cardBorderRadius: '0px',
  cardBackgroundPattern: 'none',
};

export function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConfigToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded — silent fail
  }
}
