import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/photos/logo.png';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const location = useLocation();
  const currentView = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  const navItems = [
    { label: 'Home', id: 'home', path: '/' },
    { label: 'Buying/selling', id: 'buying-selling', path: '/search?type=secondary' },
    { label: 'Off plans', id: 'off-plans', path: '/search?type=off-plan' },
    { label: 'Commercial', id: 'commercial', path: '/search?type=commercial' },
    { label: 'Developers', id: 'developers', path: '/search' },
    { label: 'Communities', id: 'communities', path: '/search' },
    { label: 'Investment', id: 'investment', path: '/calculator' },
    { label: 'Golden Visa', id: 'visa', path: '/visa' },
    { label: 'Blog', id: 'blog', path: '/blog' },
    { label: 'About', id: 'about', path: '/about' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 shadow-xl py-3'
          : 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center lg:justify-between">
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-gold/50 rounded-md text-left z-50 relative"
        >
          <img src={logoImg} alt="Golden Legacy Logo" className="h-10 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="text-base md:text-lg tracking-[0.25em] font-bold text-white font-display uppercase leading-none mt-0.5">
              Golden Legacy
            </span>
            <span className="text-[8px] uppercase tracking-[0.45em] text-[#C89B3C] mt-1.5 font-bold block">
              Real Estate Dubai
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-[10px] uppercase tracking-widest font-bold transition-all duration-300 relative group py-2 ${
                currentView === item.id || (currentView === '' && item.id === 'home')
                  ? 'text-[#C89B3C]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {item.label}
              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-[#C89B3C] transition-all duration-300 ${
                  currentView === item.id || (currentView === '' && item.id === 'home') ? 'w-full' : 'w-0 group-hover:w-1/2'
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-3.5">
          {/* Outlined Contact Us Button */}
          <a
            href="tel:+971501112233"
            className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:border-gold hover:text-gold transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.15em] font-semibold"
          >
            <Phone className="w-3 h-3 text-gold" />
            <span>+971 50 111 2233</span>
          </a>

          {/* Solid WhatsApp/Consultation Button */}
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-500 transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.15em] font-bold flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white/10" />
            <span>Book Consultation</span>
          </button>
        </div>
      </div>
    </header>
  );
}
