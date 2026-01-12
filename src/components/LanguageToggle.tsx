import { useTranslation } from 'react-i18next';

// Flag emojis for visual language toggle
const FLAGS = {
  en: '🇬🇧',
  fr: '🇫🇷',
};

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'fr';
  const otherLang = currentLang === 'en' ? 'fr' : 'en';

  const toggleLanguage = () => {
    i18n.changeLanguage(otherLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
      title={currentLang === 'en' ? 'Passer en Français' : 'Switch to English'}
    >
      {/* Current language flag (active) */}
      <span className="text-2xl transition-transform group-hover:scale-110">
        {FLAGS[currentLang]}
      </span>
      
      {/* Arrow indicator */}
      <span className="text-muted-foreground text-sm mx-1">→</span>
      
      {/* Other language flag (clickable target) */}
      <span className="text-2xl opacity-50 group-hover:opacity-100 transition-all group-hover:scale-110">
        {FLAGS[otherLang]}
      </span>
    </button>
  );
}
