import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Globe, Calculator, ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import { DEVELOPERS } from '../data';
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

// Main Navigation Items
const MAIN_NAV = [
  { label: 'Buy', path: '/search?type=buy', hasMegaMenu: true, id: 'buy' },
  { label: 'Rent', path: '/search?type=rent', hasMegaMenu: true, id: 'rent' },
  { label: 'Off Plan', path: '/search?type=off-plan', hasMegaMenu: true, id: 'offplan' },
  { label: 'Developers', path: '/developers', hasMegaMenu: true, id: 'developers' },
  { label: 'Communities', path: '/communities', hasMegaMenu: false, id: 'communities' },
  { label: 'Contact', path: '/contact', hasMegaMenu: false, id: 'contact' }
];

const BUY_MENU = ['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Mansions', 'Luxury Homes'];
const RENT_MENU = ['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Offices', 'Retail Shops'];
const OFFPLAN_MENU = ['New Launches', 'Ready to Move', 'Upcoming Projects', 'Payment Plans'];

export default function Header({ onOpenConsultation }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCurrencyCalc, setShowCurrencyCalc] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLangDropdown(false);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (langCode === 'en') {
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

  const handleNavClick = (path: string) => {
    navigate(path);
    setActiveMegaMenu(null);
    setIsOpen(false);
  };

  return (
    <>
      <header
        onMouseLeave={() => setActiveMegaMenu(null)}
        className={`fixed left-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'top-2 xl:top-4' : 'top-6 xl:top-8'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setActiveMegaMenu(null)}>
            <img src={logoImg} alt="Golden Legacy Logo" className="h-10 xl:h-12 w-auto object-contain drop-shadow-xl" />
          </Link>

          {/* DESKTOP PILL NAVIGATION */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-full px-10 py-3.5 shadow-2xl relative">
            {MAIN_NAV.map((item) => (
              <div 
                key={item.id}
                className="flex items-center group cursor-pointer" 
                onMouseEnter={() => item.hasMegaMenu ? setActiveMegaMenu(item.id) : setActiveMegaMenu(null)}
              >
                <button 
                  onClick={() => handleNavClick(item.path)}
                  className={`text-[14px] font-semibold transition-colors flex items-center gap-1.5 ${activeMegaMenu === item.id ? 'text-[#C89B3C]' : 'text-zinc-100 group-hover:text-white'}`}
                >
                  {item.label} 
                  {item.hasMegaMenu && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === item.id ? 'rotate-180' : ''}`}/>}
                </button>
              </div>
            ))}

            {/* MINIMAL DROPDOWNS HOVERING BELOW THE PILL */}
            {activeMegaMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max min-w-[200px] bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden py-4 px-6 animate-in fade-in slide-in-from-top-4 duration-200">
                
                {activeMegaMenu === 'buy' && (
                  <div className="flex flex-col gap-3">
                    {BUY_MENU.map(link => <button key={link} onClick={() => handleNavClick(`/search?type=buy&cat=${link}`)} className="text-left text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200">{link}</button>)}
                  </div>
                )}

                {activeMegaMenu === 'rent' && (
                  <div className="flex flex-col gap-3">
                    {RENT_MENU.map(link => <button key={link} onClick={() => handleNavClick(`/search?type=rent`)} className="text-left text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200">{link}</button>)}
                  </div>
                )}

                {activeMegaMenu === 'offplan' && (
                  <div className="flex flex-col gap-3">
                    {OFFPLAN_MENU.map(link => <button key={link} onClick={() => handleNavClick(`/search?type=off-plan`)} className="text-left text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200">{link}</button>)}
                  </div>
                )}

                {activeMegaMenu === 'developers' && (
                  <div className="grid grid-cols-2 gap-4">
                    {DEVELOPERS.slice(0,6).map(dev => (
                      <button key={dev.id} onClick={() => handleNavClick(`/developers`)} className="text-left text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center p-1"><img src={dev.logo} className="filter grayscale opacity-70" /></div>
                        {dev.name}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            )}
          </nav>

          {/* DESKTOP RIGHT SIDE ACTIONS */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <a href="tel:+971501112233" className="flex items-center gap-2 text-white hover:text-[#C89B3C] font-semibold text-[15px] transition-colors drop-shadow-md">
              <Phone className="w-4 h-4" />
              +971 50 111 2233
            </a>

            {/* Primary CTA */}
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-[#1e3a5f] hover:bg-[#152842] text-white font-bold text-[14px] rounded-full flex items-center transition-all duration-300 shadow-[0_0_20px_rgba(30,58,95,0.3)] hover:shadow-[0_0_30px_rgba(30,58,95,0.5)] transform hover:-translate-y-0.5"
            >
              Book Consultation
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={onOpenConsultation} className="bg-[#1e3a5f] text-white px-4 py-2 rounded-full text-xs font-bold uppercase">Book</button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white z-[110] relative p-2 bg-zinc-950/50 backdrop-blur-md rounded-full border border-white/10">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE FULLSCREEN NAV --- */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] bg-zinc-950 flex flex-col pt-24 h-[100dvh]">
          <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4">
            
            {/* Lang & Currency for Mobile */}
            <div className="flex gap-4 mb-8">
              <button onClick={() => { setShowLangDropdown(!showLangDropdown); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase"><Globe className="w-4 h-4 text-[#C89B3C]"/> {i18n.language.toUpperCase()}</button>
              <button onClick={() => { setShowCurrencyCalc(!showCurrencyCalc); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase"><Calculator className="w-4 h-4 text-[#C89B3C]"/> {currency}</button>
            </div>

            {showLangDropdown && (
              <div className="grid grid-cols-3 gap-2 mb-8">
                {LANGUAGES.map(lang => <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="py-2 bg-white/10 text-white rounded-lg text-xs">{lang.label}</button>)}
              </div>
            )}

            {showCurrencyCalc && (
              <div className="grid grid-cols-4 gap-2 mb-8">
                {CURRENCIES.slice(0,12).map(c => <button key={c} onClick={() => setCurrency(c)} className={`py-2 text-[10px] border rounded-lg ${currency === c ? 'bg-[#C89B3C] border-[#C89B3C]' : 'border-white/10 text-white'}`}>{c}</button>)}
              </div>
            )}

            <nav className="flex flex-col space-y-2">
              <button onClick={() => handleNavClick('/')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Home</button>
              {MAIN_NAV.map(item => (
                <button key={item.id} onClick={() => handleNavClick(item.path)} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* STICKY BOTTOM MOBILE CTA */}
          <div className="fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-lg border-t border-white/10 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex px-4 py-4 gap-3 z-[120]">
            <a href="tel:+971501112233" className="flex-1 bg-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase"><Phone className="w-4 h-4"/> Call</a>
            <a href="https://wa.me/971501112233" className="flex-1 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/50 py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase"><MessageSquare className="w-4 h-4"/> Chat</a>
          </div>
        </div>
      )}
    </>
  );
}
