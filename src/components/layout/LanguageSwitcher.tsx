import React from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage, Language } from '../../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'expanded' | 'segmented';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'segmented',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        id="language-switcher-compact"
        type="button"
        onClick={toggleLanguage}
        aria-label={t('lang.toggleAria', 'Toggle language between English and Hindi')}
        title={language === 'en' ? 'हिन्दी में बदलें (Switch to Hindi)' : 'Switch to English'}
        className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border border-[#B85D38]/30 bg-[#2D1B14]/70 text-[#F5EBE1] hover:bg-[#B85D38]/20 hover:border-[#D4AF37]/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${className}`}
      >
        <Languages className="w-3.5 h-3.5 text-[#D4AF37] transition-transform group-hover:rotate-12" />
        <span className="font-semibold tracking-wider">{language === 'en' ? 'हिन्दी' : 'EN'}</span>
      </button>
    );
  }

  // Segmented control (default) — elegant toggle between English and हिन्दी
  return (
    <div
      id="language-switcher-segmented"
      role="group"
      aria-label={t('lang.toggleAria', 'Toggle language between English and Hindi')}
      className={`inline-flex items-center p-0.5 rounded-full border border-[#D4AF37]/30 bg-[#1D130E]/80 backdrop-blur-md shadow-sm ${className}`}
    >
      <button
        id="lang-btn-en"
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`relative px-2.5 py-1 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
          language === 'en'
            ? 'bg-gradient-to-r from-[#B85D38] to-[#9C4B28] text-[#FFF9F2] shadow-sm font-semibold'
            : 'text-[#C4A482] hover:text-[#FFF9F2] hover:bg-white/5'
        }`}
      >
        <span>English</span>
      </button>

      <button
        id="lang-btn-hi"
        type="button"
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        className={`relative px-2.5 py-1 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
          language === 'hi'
            ? 'bg-gradient-to-r from-[#B85D38] to-[#9C4B28] text-[#FFF9F2] shadow-sm font-semibold'
            : 'text-[#C4A482] hover:text-[#FFF9F2] hover:bg-white/5'
        }`}
      >
        <span className="font-hindi">हिन्दी</span>
      </button>
    </div>
  );
};
