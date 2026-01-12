import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, fr } from './translations';

// Detect user's preferred language from browser
function detectLanguage(): 'en' | 'fr' {
  // Check navigator.language (most reliable)
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  
  // Check if French (fr, fr-FR, fr-CA, etc.)
  if (browserLang.toLowerCase().startsWith('fr')) {
    return 'fr';
  }
  
  // Default to English for all other languages
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
