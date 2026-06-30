import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Globe, Calculator, ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import { DEVELOPERS } from '../data';
import logoImg from '../../assets/photos/logo.png';
import whatsappLogo from '../../assets/logos/whatsapp logo.png';

interface HeaderProps {
  onOpenConsultation: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' }
];

const CURRENCIES: Currency[] = ['AED', 'USD', 'EUR', 'GBP', 'INR', 'SAR', 'QAR', 'KWD', 'OMR', 'CHF', 'JPY', 'CAD', 'AUD'];

// Main Navigation Items
const MAIN_NAV = [
  { label: 'Buy', path: '/search?type=buy', hasMegaMenu: true, id: 'buy' },
  { label: 'Rent', path: '/search?type=rent', hasMegaMenu: true, id: 'rent' },
  { label: 'Off Plan', path: '/search?type=off-plan', hasMegaMenu: true, id: 'offplan' },
  { label: 'Developers', path: '/developers', hasMegaMenu: true, id: 'developers' },
  { label: 'Communities', path: '/communities', hasMegaMenu: false, id: 'communities' }
];

const BUY_MENU = ['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Mansions', 'Luxury Homes'];
const RENT_MENU = ['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Offices', 'Retail Shops'];
const OFFPLAN_MENU = ['New Launches', 'Ready to Move', 'Upcoming Projects', 'Payment Plans'];

export default function Header({ onOpenConsultation }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  
  // Dropdowns for Lang & Currency
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const navigate = useNavigate();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLangOpen(false);
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

  const activeLang = LANGUAGES.find(l => l.code === i18n.language?.split('-')[0]) || LANGUAGES[0];

  return (
    <>
      <header
        onMouseLeave={() => { setActiveMegaMenu(null); setLangOpen(false); setCurrencyOpen(false); }}
        className={`fixed left-0 w-full z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'top-0 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'top-0 bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        {/* DESKTOP HEADER */}
        <div className="hidden xl:grid mx-auto items-center h-[76px] px-[36px] max-w-[1680px] grid-cols-[1fr_auto_1fr] gap-4">
          
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-[14px] w-full justify-self-start">
            <Link to="/" className="flex items-center gap-[14px]" onClick={() => setActiveMegaMenu(null)}>
              <img src={logoImg} alt="Golden Legacy Logo" className="h-[48px] w-[48px] object-contain drop-shadow-2xl" />
              <div className="flex flex-col justify-center">
                <h2 className="text-[30px] font-[700] text-white leading-none whitespace-nowrap" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  Golden Legacy
                </h2>
                <h3 className="text-[16px] italic font-[500] leading-none text-[#D8A63A] whitespace-nowrap mt-[4px]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  Real Estate
                </h3>
              </div>
            </Link>
          </div>

          {/* CENTER: NAVIGATION */}
          <div className="justify-self-center">
            <nav className="flex items-center justify-center h-[56px] px-[16px] gap-[4px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.10)] shadow-[0_8px_24px_rgba(0,0,0,0.16)] rounded-full w-fit">
              {MAIN_NAV.map((item) => {
                const isActive = activeMegaMenu === item.id;
                return (
                  <div 
                    key={item.id}
                    className="group relative flex items-center justify-center h-full"
                    onMouseEnter={() => { setActiveMegaMenu(item.hasMegaMenu ? item.id : null); setLangOpen(false); setCurrencyOpen(false); }}
                  >
                    <button 
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center gap-[6px] py-[8px] px-[14px] rounded-full text-[14px] font-[600] text-[rgba(255,255,255,0.95)] whitespace-nowrap transition-all duration-[280ms] hover:bg-[rgba(255,255,255,0.08)] ${isActive ? 'bg-[rgba(255,255,255,0.08)]' : ''}`}
                    >
                      {item.label} 
                      {item.hasMegaMenu && <ChevronDown className={`w-[12px] h-[12px] opacity-70 transition-transform duration-[280ms] ${isActive ? 'rotate-180' : ''}`}/>}
                    </button>

                    {/* Mega Menu Dropdowns */}
                    {isActive && item.hasMegaMenu && (
                      <div className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-max min-w-[220px] bg-[rgba(20,20,20,0.95)] backdrop-blur-[24px] backdrop-saturate-[180%] border border-[rgba(255,255,255,0.1)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden py-5 px-6 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
                        
                        {item.id === 'buy' && (
                          <div className="flex flex-col gap-3">
                            {BUY_MENU.map(link => <button key={link} onClick={() => handleNavClick(`/search?type=buy&cat=${link}`)} className="text-left text-zinc-300 hover:text-white text-[14px] font-medium transition-colors hover:translate-x-1 duration-300">{link}</button>)}
                          </div>
                        )}

                        {item.id === 'rent' && (
                          <div className="flex flex-col gap-3">
                            {RENT_MENU.map(link => <button key={link} onClick={() => handleNavClick(`/search?type=rent`)} className="text-left text-zinc-300 hover:text-white text-[14px] font-medium transition-colors hover:translate-x-1 duration-300">{link}</button>)}
                          </div>
                        )}

                        {item.id === 'offplan' && (
                          <div className="flex flex-col gap-3">
                            {OFFPLAN_MENU.map(link => <button key={link} onClick={() => handleNavClick(`/search?type=off-plan`)} className="text-left text-zinc-300 hover:text-white text-[14px] font-medium transition-colors hover:translate-x-1 duration-300">{link}</button>)}
                          </div>
                        )}

                        {item.id === 'developers' && (
                          <div className="grid grid-cols-2 gap-4">
                            {DEVELOPERS.slice(0,6).map(dev => (
                              <button key={dev.id} onClick={() => handleNavClick(`/developers`)} className="text-left text-zinc-300 hover:text-white text-[13px] font-medium transition-colors hover:translate-x-1 duration-300 flex items-center gap-2">
                                <div className="w-6 h-6 bg-white/5 rounded flex items-center justify-center p-1"><img src={dev.logo} className="filter grayscale opacity-70" /></div>
                                {dev.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center shrink-0 justify-self-end">
            
            {/* Phone Number */}
            <a href="https://wa.me/971556656007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[4px] text-white font-[600] text-[13px] whitespace-nowrap mr-[12px]">
              <img src={whatsappLogo} alt="WhatsApp" className="w-[14px] h-[14px] object-contain" />
              +971 556656007
            </a>

            {/* CTA */}
            <button
              onClick={onOpenConsultation}
              className="h-[36px] px-[16px] bg-gradient-to-r from-[#153B74] to-[#0F2F5A] text-white font-[600] text-[13px] rounded-full flex items-center justify-center transition-all duration-[280ms] hover:-translate-y-[2px] shadow-[0_10px_25px_rgba(20,60,120,0.30)] whitespace-nowrap mr-[8px]"
            >
              Book a Call
            </button>
            
            {/* Language Selector */}
            <div className="relative group flex items-center h-[30px] px-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full cursor-pointer mr-[6px]" onMouseEnter={() => { setLangOpen(true); setCurrencyOpen(false); setActiveMegaMenu(null); }}>
              <button className="flex items-center gap-[4px] text-white font-[500] text-[12px]">
                <Globe className="w-[12px] h-[12px]" /> {activeLang.label} <ChevronDown className={`w-[10px] h-[10px] opacity-70 transition-transform duration-[280ms] ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-[240px] bg-[rgba(20,20,20,0.95)] backdrop-blur-[20px] backdrop-saturate-[180%] border border-[rgba(255,255,255,0.1)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[18px] py-3 animate-in fade-in slide-in-from-top-4 duration-[280ms] z-50 overflow-hidden">
                  <div className="grid grid-cols-2 gap-1 px-3">
                    {LANGUAGES.map(lang => (
                      <button 
                        key={lang.code} 
                        onClick={() => handleLanguageChange(lang.code)} 
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-[600] transition-colors ${activeLang.code === lang.code ? 'bg-[#C89B3C]/10 text-[#C89B3C]' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative group flex items-center h-[30px] px-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-full cursor-pointer" onMouseEnter={() => { setCurrencyOpen(true); setLangOpen(false); setActiveMegaMenu(null); }}>
              <button className="flex items-center gap-[4px] text-white font-[500] text-[12px]">
                {currency} <ChevronDown className={`w-[10px] h-[10px] opacity-70 transition-transform duration-[280ms] ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-[280px] bg-[rgba(20,20,20,0.95)] backdrop-blur-[20px] backdrop-saturate-[180%] border border-[rgba(255,255,255,0.1)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[18px] py-4 px-4 animate-in fade-in slide-in-from-top-4 duration-[280ms] z-50">
                  <div className="grid grid-cols-3 gap-2">
                    {CURRENCIES.map(c => (
                      <button 
                        key={c} 
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }} 
                        className={`flex items-center justify-center py-2 rounded-xl text-[13px] font-bold transition-all ${currency === c ? 'bg-[#C89B3C] text-zinc-950 shadow-[0_0_15px_rgba(200,155,60,0.3)]' : 'text-zinc-400 border border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET HEADER */}
        <div className="xl:hidden w-full px-4 sm:px-6 h-[80px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
            <img src={logoImg} alt="Golden Legacy Logo" className="h-10 w-auto object-contain drop-shadow-xl" />
            <div className="flex flex-col justify-center" style={{ gap: '1px' }}>
              <h2 className="text-[24px] font-[700] text-white leading-none tracking-tight whitespace-nowrap" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Golden Legacy
              </h2>
              <h3 className="text-[14px] italic font-[500] leading-none bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent whitespace-nowrap" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Real Estate
              </h3>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white relative p-2.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full border border-white/10 shadow-lg">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE FULLSCREEN NAV --- */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-[90] bg-[rgba(10,10,10,0.98)] backdrop-blur-2xl flex flex-col pt-24 h-[100dvh]">
          <div className="flex-1 overflow-y-auto pb-32 px-6 pt-4">
            
            {/* Lang & Currency for Mobile */}
            <div className="flex gap-4 mb-10">
              <div className="flex-1 relative">
                <select 
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-sm font-bold uppercase cursor-pointer"
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  value={activeLang.code}
                >
                  {LANGUAGES.map(lang => <option key={lang.code} value={lang.code} className="text-black">{lang.flag} {lang.label}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-white/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex-1 relative">
                <select 
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-sm font-bold uppercase cursor-pointer"
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  value={currency}
                >
                  {CURRENCIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-white/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <nav className="flex flex-col space-y-2">
              <button onClick={() => handleNavClick('/')} className="text-left py-4 text-2xl font-display font-medium text-white border-b border-white/10">Home</button>
              {MAIN_NAV.map(item => (
                <button key={item.id} onClick={() => handleNavClick(item.path)} className="text-left py-4 text-2xl font-display font-medium text-white border-b border-white/10">
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* STICKY BOTTOM MOBILE CTA */}
          <div className="fixed bottom-0 left-0 w-full bg-[rgba(10,10,10,0.9)] backdrop-blur-2xl border-t border-white/10 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.8)] px-6 py-6 z-[120]">
            <button
              onClick={() => { setIsOpen(false); onOpenConsultation(); }}
              className="w-full h-[54px] bg-gradient-to-r from-[#1e3a5f] to-[#112035] text-white font-[700] text-[15px] rounded-full flex items-center justify-center mb-4 border border-[#2b4c7a]/30 shadow-lg"
            >
              Book Consultation
            </button>
            <div className="flex gap-4">
              <a href="tel:+971556656007" className="flex-1 bg-white/5 text-white py-3.5 rounded-full flex items-center justify-center gap-2 text-sm font-bold border border-white/10"><Phone className="w-4 h-4"/> Call</a>
              <a href="https://wa.me/971556656007" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 py-3.5 rounded-full flex items-center justify-center gap-2 text-sm font-bold"><img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4 object-contain" /> Chat</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
