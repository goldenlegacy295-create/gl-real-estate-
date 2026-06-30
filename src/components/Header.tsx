import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Globe, Calculator, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import logoImg from '../../assets/photos/logo.png';

interface HeaderProps {
  onOpenConsultation: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' }
];

const CURRENCIES: Currency[] = ['AED', 'USD', 'EUR', 'GBP', 'SAR', 'QAR', 'INR', 'RUB', 'CNY', 'JPY', 'CAD', 'AUD', 'SGD', 'HKD', 'CHF'];

export default function Header({ onOpenConsultation }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency, convertPrice } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCurrencyCalc, setShowCurrencyCalc] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const location = useLocation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLangDropdown(false);

    // Native bridge to Google Translate Widget
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    
    if (langCode === 'en') {
      // Clear cookies and reload for English to restore exact original DOM
      const currentDomain = window.location.hostname;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${currentDomain}; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      window.location.reload();
      return;
    }

    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback: set cookie and reload
      const currentDomain = window.location.hostname;
      document.cookie = `googtrans=/en/${langCode}; domain=${currentDomain}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.buy'), path: '/search?type=buy' },
    { label: t('nav.sell'), path: '/contact?type=sell' },
    { label: t('nav.rent'), path: '/search?type=rent' },
    { label: t('nav.offPlan'), path: '/search?type=off-plan' },
    { label: t('nav.developers'), path: '/developers' },
    { label: t('nav.areas'), path: '/communities' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.blogs'), path: '/blog' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/85 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-50">
          <img loading="lazy" src={logoImg} alt="Golden Legacy Logo" className="h-10 w-auto object-contain" />
          <div className="hidden sm:flex flex-col">
            <span className="text-base tracking-[0.25em] font-bold text-white font-display uppercase leading-none mt-0.5">
              Golden Legacy
            </span>
            <span className="text-[8px] uppercase tracking-[0.45em] text-[#C89B3C] mt-1.5 font-bold block">
              Real Estate Dubai
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="text-[9px] uppercase tracking-[0.15em] font-semibold text-zinc-300 hover:text-white transition-colors relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-[1.5px] bg-[#C89B3C] transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => { setShowLangDropdown(!showLangDropdown); setShowCurrencyCalc(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded hover:border-[#C89B3C]/50 text-white transition-all bg-white/5 backdrop-blur-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span className="text-[10px] font-semibold uppercase">{i18n.language}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>
            {showLangDropdown && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded shadow-xl overflow-hidden">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 text-xs hover:bg-white/10 transition-colors ${i18n.language === lang.code ? 'text-[#C89B3C]' : 'text-zinc-300'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => { setShowCurrencyCalc(!showCurrencyCalc); setShowLangDropdown(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded hover:border-[#C89B3C]/50 text-white transition-all bg-white/5 backdrop-blur-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span className="text-[10px] font-semibold uppercase">{currency}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showCurrencyCalc && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-zinc-950/95 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <h4 className="text-[#C89B3C] text-[10px] uppercase tracking-widest font-bold">Select Currency</h4>
                  <button onClick={() => setShowCurrencyCalc(false)} className="text-zinc-500 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {CURRENCIES.map(c => (
                    <button
                      key={c}
                      onClick={() => { setCurrency(c); setShowCurrencyCalc(false); }}
                      className={`py-1.5 text-[10px] font-mono border rounded ${
                        currency === c ? 'bg-[#C89B3C]/20 border-[#C89B3C] text-white' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-4 py-1.5 bg-[#C89B3C] hover:bg-[#b08835] text-zinc-950 font-bold text-[10px] uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-lg shadow-[#C89B3C]/20"
          >
            {t('nav.consultation')}
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white z-50 relative p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 w-full h-[100dvh] bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 z-40">
          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col space-y-5 pb-8">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-xl uppercase tracking-[0.15em] font-medium font-display text-zinc-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="pt-6 mt-auto border-t border-zinc-900 flex flex-col gap-4 shrink-0">
            <button
              onClick={() => { setIsOpen(false); onOpenConsultation(); }}
              className="bg-[#C89B3C] text-zinc-950 text-center py-4 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-lg h-14"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t('nav.consultation')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
