import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Globe, Calculator, ChevronDown, Search, Heart, ArrowRight, Calendar } from 'lucide-react';
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

// --- MENU DATA STRUCTURES ---
const BUY_MENU = [
  { title: 'Residential', links: ['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Mansions', 'Luxury Homes'] },
  { title: 'Investment', links: ['Off Plan', 'Ready Properties', 'New Launches', 'Waterfront Properties', 'Beachfront Properties'] },
  { title: 'Popular Areas', links: ['Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'Business Bay', 'Dubai Hills Estate', 'Dubai Creek Harbour'] }
];

const RENT_MENU = [
  { title: 'Residential', links: ['Apartments', 'Villas', 'Townhouses', 'Penthouses'] },
  { title: 'Commercial', links: ['Offices', 'Retail Shops', 'Warehouses'] },
  { title: 'Quick Links', links: ['Luxury Rentals', 'Short-Term Rentals', 'View All Rentals'] }
];

const COMMERCIAL_MENU = ['Offices', 'Retail Shops', 'Warehouses', 'Commercial Buildings', 'Hotels', 'Mixed Use', 'Industrial', 'Commercial Land'];

const OFFPLAN_MENU = [
  { title: 'Featured Developers', links: ['Emaar', 'DAMAC', 'Sobha Realty', 'Nakheel', 'Binghatti', 'Ellington', 'Meraas', 'Aldar'] },
  { title: 'Quick Links', links: ['New Launches', 'Ready to Move', 'Upcoming Projects', 'Payment Plans'] }
];

const COMMUNITIES_MENU = ['Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'Business Bay', 'JVC', 'Dubai Hills Estate', 'Arabian Ranches', 'Bluewaters', 'Creek Harbour', 'Emirates Hills'];
const SERVICES_MENU = ['Buy Property', 'Sell Property', 'Rent Property', 'Property Investment', 'Property Management', 'Property Valuation', 'Mortgage Assistance', 'Golden Visa Assistance'];
const BLOGS_MENU = ['Market News', 'Investment Guides', 'Area Guides', 'Property Tips'];

export default function Header({ onOpenConsultation }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCurrencyCalc, setShowCurrencyCalc] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex flex-col justify-center ${
          scrolled || activeMegaMenu || isOpen
            ? 'bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl h-[90px] xl:h-[100px]'
            : 'bg-transparent border-b border-transparent h-[90px] xl:h-[100px]'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-8 flex items-center justify-between h-full">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setActiveMegaMenu(null)}>
            <img src={logoImg} alt="Golden Legacy Logo" className="h-10 xl:h-12 w-auto object-contain" />
            <div className="hidden sm:flex flex-col">
              <span className="text-[13px] xl:text-[15px] tracking-[0.25em] font-bold text-white font-display uppercase leading-none mt-0.5">
                Golden Legacy
              </span>
              <span className="text-[7px] xl:text-[8px] uppercase tracking-[0.45em] text-[#C89B3C] mt-1 font-bold block">
                Real Estate Dubai
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION CENTER */}
          <nav className="hidden lg:flex items-center justify-center space-x-5 xl:space-x-8 h-full flex-1 px-8">
            <Link to="/" className="text-[14px] xl:text-[15px] font-semibold text-zinc-200 hover:text-[#C89B3C] transition-colors h-full flex items-center uppercase tracking-wide">Home</Link>
            
            {/* BUY */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('buy')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'buy' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Buy <ChevronDown className="w-3 h-3"/></span>
            </div>
            
            {/* RENT */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('rent')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'rent' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Rent <ChevronDown className="w-3 h-3"/></span>
            </div>
            
            {/* COMMERCIAL */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('commercial')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'commercial' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Commercial <ChevronDown className="w-3 h-3"/></span>
            </div>

            {/* OFF PLAN */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('offplan')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'offplan' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Off Plan <ChevronDown className="w-3 h-3"/></span>
            </div>

            {/* DEVELOPERS */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('developers')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'developers' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Developers <ChevronDown className="w-3 h-3"/></span>
            </div>

            {/* COMMUNITIES */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('communities')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'communities' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Communities <ChevronDown className="w-3 h-3"/></span>
            </div>

            {/* SERVICES */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('services')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'services' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Services <ChevronDown className="w-3 h-3"/></span>
            </div>
            
            {/* BLOGS & CONTACT */}
            <div className="h-full flex items-center group cursor-pointer" onMouseEnter={() => setActiveMegaMenu('blogs')}>
              <span className={`text-[14px] xl:text-[15px] font-semibold transition-colors uppercase tracking-wide flex items-center gap-1 ${activeMegaMenu === 'blogs' ? 'text-[#C89B3C]' : 'text-zinc-200 group-hover:text-[#C89B3C]'}`}>Blogs <ChevronDown className="w-3 h-3"/></span>
            </div>
            <Link to="/contact" onMouseEnter={() => setActiveMegaMenu(null)} className="text-[14px] xl:text-[15px] font-semibold text-zinc-200 hover:text-[#C89B3C] transition-colors h-full flex items-center uppercase tracking-wide">Contact</Link>
          </nav>

          {/* DESKTOP RIGHT SIDE ACTIONS */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Icons Row */}
            <div className="flex items-center gap-4 border-r border-white/20 pr-4">
              <button onClick={() => navigate('/search')} className="text-zinc-300 hover:text-[#C89B3C] transition-colors"><Search className="w-5 h-5"/></button>
              <button className="text-zinc-300 hover:text-[#C89B3C] transition-colors"><Heart className="w-5 h-5"/></button>
              <a href="tel:+971501112233" className="text-zinc-300 hover:text-[#C89B3C] transition-colors"><Phone className="w-5 h-5"/></a>
              <a href="https://wa.me/971501112233" target="_blank" rel="noopener" className="text-zinc-300 hover:text-emerald-500 transition-colors"><MessageSquare className="w-5 h-5"/></a>
            </div>
            
            {/* Selectors */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button onClick={() => { setShowLangDropdown(!showLangDropdown); setShowCurrencyCalc(false); setActiveMegaMenu(null); }} className="flex items-center gap-1 text-zinc-300 hover:text-white text-[13px] font-semibold">
                  <Globe className="w-4 h-4 text-[#C89B3C]" /> {i18n.language.toUpperCase()}
                </button>
                {showLangDropdown && (
                  <div className="absolute top-full right-0 mt-4 w-32 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded overflow-hidden">
                    {LANGUAGES.map(lang => (
                      <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="block w-full text-left px-4 py-3 text-xs text-white hover:bg-[#C89B3C]/20 transition-colors">{lang.label}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <div className="relative">
                <button onClick={() => { setShowCurrencyCalc(!showCurrencyCalc); setShowLangDropdown(false); setActiveMegaMenu(null); }} className="flex items-center gap-1 text-zinc-300 hover:text-white text-[13px] font-semibold">
                  <Calculator className="w-4 h-4 text-[#C89B3C]" /> {currency}
                </button>
                {showCurrencyCalc && (
                  <div className="absolute top-full right-0 mt-4 w-64 bg-zinc-950/95 backdrop-blur-xl border border-white/10 p-4 rounded shadow-2xl">
                    <div className="grid grid-cols-3 gap-2">
                      {CURRENCIES.map(c => (
                        <button key={c} onClick={() => { setCurrency(c); setShowCurrencyCalc(false); }} className={`py-2 text-[10px] font-mono border rounded ${currency === c ? 'bg-[#C89B3C] border-[#C89B3C] text-zinc-950 font-bold' : 'border-white/10 text-white hover:bg-white/10'}`}>{c}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Primary CTA */}
            <button
              onClick={onOpenConsultation}
              className="ml-2 px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-zinc-950 font-bold text-[13px] uppercase tracking-widest rounded-md flex items-center transition-all duration-300 shadow-[0_0_20px_rgba(200,155,60,0.3)] hover:shadow-[0_0_30px_rgba(200,155,60,0.5)] transform hover:-translate-y-0.5"
            >
              Book Free Consultation
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white z-[110] relative p-2">
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* --- MEGA MENUS --- */}
        <div 
          className={`absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-out origin-top ${activeMegaMenu ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
        >
          <div className="max-w-[1400px] mx-auto px-8 py-10">
            {activeMegaMenu === 'buy' && (
              <div className="grid grid-cols-4 gap-8">
                {BUY_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">{col.title}</h4>
                    <ul className="space-y-3">
                      {col.links.map(link => <li key={link}><button onClick={() => handleNavClick(`/search?type=buy&cat=${link}`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                    </ul>
                  </div>
                ))}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white text-lg font-display mb-2">Explore All Properties</h4>
                    <p className="text-zinc-400 text-xs">Discover the finest luxury real estate portfolio in Dubai.</p>
                  </div>
                  <button onClick={() => handleNavClick('/search?type=buy')} className="flex items-center gap-2 text-[#C89B3C] text-sm font-bold uppercase tracking-widest mt-4 group">
                    View Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </button>
                </div>
              </div>
            )}
            
            {activeMegaMenu === 'rent' && (
              <div className="grid grid-cols-4 gap-8">
                {RENT_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">{col.title}</h4>
                    <ul className="space-y-3">
                      {col.links.map(link => <li key={link}><button onClick={() => handleNavClick(`/search?type=rent`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                    </ul>
                  </div>
                ))}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col justify-between">
                  <h4 className="text-white text-lg font-display mb-2">Exclusive Rentals</h4>
                  <p className="text-zinc-400 text-xs">Find your perfect luxury rental in Dubai's most prestigious locations.</p>
                  <button onClick={() => handleNavClick('/search?type=rent')} className="flex items-center gap-2 text-[#C89B3C] text-sm font-bold uppercase tracking-widest mt-4 group">
                    View Rentals <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </button>
                </div>
              </div>
            )}

            {activeMegaMenu === 'commercial' && (
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-2 space-y-4">
                  <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">Asset Classes</h4>
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
                    {COMMERCIAL_MENU.map(link => <li key={link}><button onClick={() => handleNavClick(`/search?type=commercial`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                  </ul>
                </div>
              </div>
            )}

            {activeMegaMenu === 'offplan' && (
              <div className="grid grid-cols-4 gap-8">
                {OFFPLAN_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">{col.title}</h4>
                    <ul className="space-y-3">
                      {col.links.map(link => <li key={link}><button onClick={() => handleNavClick(`/search?type=off-plan`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeMegaMenu === 'developers' && (
              <div className="space-y-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-2">Featured Developers</h4>
                    <p className="text-zinc-400 text-sm">Partnering with Dubai's most prestigious visionaries.</p>
                  </div>
                  <button onClick={() => handleNavClick('/developers')} className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">View All Developers</button>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {DEVELOPERS.slice(0,10).map(dev => (
                    <button key={dev.id} onClick={() => handleNavClick(`/developers`)} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-6 flex items-center justify-center transition-all h-24 group">
                      <img src={dev.logo} alt={dev.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeMegaMenu === 'communities' && (
              <div className="space-y-4">
                <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">Popular Communities</h4>
                <ul className="grid grid-cols-4 gap-y-4 gap-x-8">
                  {COMMUNITIES_MENU.map(link => <li key={link}><button onClick={() => handleNavClick(`/communities`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                </ul>
              </div>
            )}

            {activeMegaMenu === 'services' && (
              <div className="space-y-4">
                <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">Our Services</h4>
                <ul className="grid grid-cols-3 gap-y-4 gap-x-8">
                  {SERVICES_MENU.map(link => <li key={link}><button onClick={() => handleNavClick(`/services`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                </ul>
              </div>
            )}

            {activeMegaMenu === 'blogs' && (
              <div className="space-y-4">
                <h4 className="text-[#C89B3C] text-xs font-bold uppercase tracking-widest mb-4">Insights & News</h4>
                <ul className="grid grid-cols-4 gap-y-4 gap-x-8">
                  {BLOGS_MENU.map(link => <li key={link}><button onClick={() => handleNavClick(`/blog`)} className="text-zinc-300 hover:text-white text-sm transition-colors hover:translate-x-1 block duration-200">{link}</button></li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- MOBILE ACCORDION NAV --- */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] bg-zinc-950 flex flex-col pt-[90px] h-[100dvh]">
          <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4">
            
            <div className="flex gap-4 mb-8">
              <button onClick={() => { setShowLangDropdown(!showLangDropdown); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold uppercase"><Globe className="w-4 h-4 text-[#C89B3C]"/> {i18n.language.toUpperCase()}</button>
              <button onClick={() => { setShowCurrencyCalc(!showCurrencyCalc); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold uppercase"><Calculator className="w-4 h-4 text-[#C89B3C]"/> {currency}</button>
            </div>

            {/* Mobile Lang Dropdown Inline */}
            {showLangDropdown && (
              <div className="grid grid-cols-3 gap-2 mb-8">
                {LANGUAGES.map(lang => <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="py-2 bg-white/10 text-white rounded text-xs">{lang.label}</button>)}
              </div>
            )}

            {/* Mobile Currency Inline */}
            {showCurrencyCalc && (
              <div className="grid grid-cols-4 gap-2 mb-8">
                {CURRENCIES.slice(0,12).map(c => <button key={c} onClick={() => setCurrency(c)} className={`py-2 text-[10px] border rounded ${currency === c ? 'bg-[#C89B3C] border-[#C89B3C]' : 'border-white/10 text-white'}`}>{c}</button>)}
              </div>
            )}

            <nav className="flex flex-col space-y-2">
              <button onClick={() => handleNavClick('/')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Home</button>
              
              {/* Expandable Buy */}
              <div className="border-b border-white/10">
                <button onClick={() => setMobileExpanded(mobileExpanded === 'buy' ? null : 'buy')} className="w-full flex items-center justify-between py-4 text-xl font-display font-medium text-white">Buy <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === 'buy' ? 'rotate-180 text-[#C89B3C]' : ''}`}/></button>
                {mobileExpanded === 'buy' && (
                  <div className="pl-4 pb-4 space-y-3">
                    {BUY_MENU[0].links.map(link => <button key={link} onClick={() => handleNavClick('/search?type=buy')} className="block text-zinc-400 hover:text-white py-1">{link}</button>)}
                  </div>
                )}
              </div>

              {/* Expandable Rent */}
              <div className="border-b border-white/10">
                <button onClick={() => setMobileExpanded(mobileExpanded === 'rent' ? null : 'rent')} className="w-full flex items-center justify-between py-4 text-xl font-display font-medium text-white">Rent <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === 'rent' ? 'rotate-180 text-[#C89B3C]' : ''}`}/></button>
                {mobileExpanded === 'rent' && (
                  <div className="pl-4 pb-4 space-y-3">
                    {RENT_MENU[0].links.map(link => <button key={link} onClick={() => handleNavClick('/search?type=rent')} className="block text-zinc-400 hover:text-white py-1">{link}</button>)}
                  </div>
                )}
              </div>

              <button onClick={() => handleNavClick('/search?type=commercial')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Commercial</button>
              <button onClick={() => handleNavClick('/search?type=off-plan')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Off Plan</button>
              <button onClick={() => handleNavClick('/developers')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Developers</button>
              <button onClick={() => handleNavClick('/communities')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Communities</button>
              <button onClick={() => handleNavClick('/services')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Services</button>
              <button onClick={() => handleNavClick('/contact')} className="text-left py-4 text-xl font-display font-medium text-white border-b border-white/10">Contact</button>
            </nav>
          </div>

          {/* STICKY BOTTOM MOBILE CTA */}
          <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-white/10 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex px-2 py-3 gap-2 z-[120]">
            <a href="tel:+971501112233" className="flex-1 bg-white/10 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase"><Phone className="w-4 h-4"/> Call</a>
            <a href="https://wa.me/971501112233" className="flex-1 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/50 py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase"><MessageSquare className="w-4 h-4"/> Chat</a>
            <button onClick={() => { setIsOpen(false); onOpenConsultation(); }} className="flex-[1.5] bg-[#C89B3C] text-zinc-950 py-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase"><Calendar className="w-4 h-4"/> Book</button>
          </div>
        </div>
      )}
    </>
  );
}
