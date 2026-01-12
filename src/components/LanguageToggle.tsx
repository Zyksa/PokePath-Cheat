import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

// SVG Flag components for better cross-browser support
const UKFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="uk-clip">
      <rect x="0" y="0" width="60" height="30"/>
    </clipPath>
    <g clipPath="url(#uk-clip)">
      <rect x="0" y="0" width="60" height="30" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-diag)"/>
      <clipPath id="uk-diag">
        <path d="M30,15 L60,30 L60,15 Z M30,15 L0,0 L0,15 Z M30,15 L60,0 L30,0 Z M30,15 L0,30 L30,30 Z"/>
      </clipPath>
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FrenchFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="20" height="40" fill="#002395"/>
    <rect x="20" y="0" width="20" height="40" fill="#fff"/>
    <rect x="40" y="0" width="20" height="40" fill="#ED2939"/>
  </svg>
);

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'fr';
  const otherLang = currentLang === 'en' ? 'fr' : 'en';

  const toggleLanguage = () => {
    i18n.changeLanguage(otherLang);
  };

  const CurrentFlag = currentLang === 'en' ? UKFlag : FrenchFlag;
  const OtherFlag = currentLang === 'en' ? FrenchFlag : UKFlag;

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group"
      title={currentLang === 'en' ? 'Passer en Français' : 'Switch to English'}
    >
      {/* Globe icon */}
      <Globe className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      
      {/* Current language flag */}
      <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm ring-1 ring-white/20 group-hover:ring-primary/50 transition-all">
        <CurrentFlag className="w-full h-full" />
      </div>
      
      {/* Arrow */}
      <span className="text-muted-foreground text-xs group-hover:text-primary transition-colors">→</span>
      
      {/* Target language flag */}
      <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm ring-1 ring-white/10 opacity-50 group-hover:opacity-100 group-hover:ring-primary/50 group-hover:scale-105 transition-all">
        <OtherFlag className="w-full h-full" />
      </div>
      
      {/* Language code */}
      <span className="text-xs font-medium text-muted-foreground group-hover:text-primary uppercase transition-colors">
        {otherLang}
      </span>
    </button>
  );
}
