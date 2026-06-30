import { useState, useEffect, FormEvent } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomeSections from './components/HomeSections';
import PropertySearch from './components/PropertySearch';
import PropertyDetail from './components/PropertyDetail';
import InvestmentCalculator from './components/InvestmentCalculator';
import GoldenVisaPortal from './components/GoldenVisaPortal';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './pages/NotFound';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

import { generateGlobalSchema, injectSchema } from './utils/seo';

// Data
import { PROPERTIES, DEVELOPERS, COMMUNITIES, AGENTS, BLOGS, FAQS } from './data';
import whatsappLogo from '../assets/logos/whatsapp logo.png';
import { Property, Lead } from './types';
import { Phone, Calendar, Mail, X, Send, Award, ArrowUp, MessageSquare } from 'lucide-react';

function PropertyDetailWrapper({ properties, wishlist, onToggleWishlist }: { properties: Property[], wishlist: string[], onToggleWishlist: (id: string) => void }) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const property = properties.find(p => p.slug === slug);

  if (!property) {
    return <NotFound />;
  }

  return (
    <PropertyDetail
      property={property}
      onBack={() => navigate(-1)}
      onToggleWishlist={onToggleWishlist}
      wishlist={wishlist}
    />
  );
}

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [searchPreset, setSearchPreset] = useState<'all' | 'ready' | 'off-plan' | 'commercial'>('all');
  const [searchTermFilter, setSearchTermFilter] = useState('');
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [consultationOpen, setConsultationOpen] = useState(false);

  // Floating button visible on scroll
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form states in global modal
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientBudget, setClientBudget] = useState('AED 10M - 20M');
  const [clientMessage, setClientMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  useEffect(() => {
    // Inject global SEO schema
    injectSchema(generateGlobalSchema(), 'global-schema');

    // Force scroll to top on refresh and disable browser automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP ScrollTrigger orchestration for luxury reveal effects on viewport entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      // Clean up previous triggers to prevent memory leaks and overlapping states
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // 1. Classic slide-up and fade-in reveal
      const reveals = document.querySelectorAll('.gsap-reveal');
      reveals.forEach(el => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // 2. Left-to-right slide and fade reveal
      const revealsLeft = document.querySelectorAll('.gsap-reveal-left');
      revealsLeft.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // 3. Right-to-left slide and fade reveal
      const revealsRight = document.querySelectorAll('.gsap-reveal-right');
      revealsRight.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // 4. Scale and zoom-in reveal
      const revealsScale = document.querySelectorAll('.gsap-reveal-scale');
      revealsScale.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // 5. Staggered group animation
      const containers = document.querySelectorAll('.gsap-stagger-container');
      containers.forEach(container => {
        const items = container.querySelectorAll('.gsap-stagger-item');
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentView, selectedProperty]);


  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        message: `${clientMessage} (Preferred Budget: ${clientBudget})`,
        type: 'Consultation'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setModalSuccess("Inquiry Registered! Elena Rostova from our private wealth desk is coordinating your call.");
          setClientName('');
          setClientEmail('');
          setClientPhone('');
          setClientMessage('');
          setTimeout(() => {
            setModalSuccess('');
            setConsultationOpen(false);
          }, 4000);
        }
      });
  };

  return (
    <div className="bg-[#FAF8F4] font-sans text-zinc-900 min-h-screen relative selection:bg-gold/30 selection:text-zinc-950">
      
      {/* GLOBAL HEADER HEADER */}
      <Header
        onOpenConsultation={() => setConsultationOpen(true)}
      />
      {/* DYNAMIC SCREEN ROUTING */}
      <main className="transition-all duration-500 ease-in-out">
        <Routes>
          <Route path="/" element={
            <HomeSections
              properties={properties}
              developers={DEVELOPERS}
              communities={COMMUNITIES}
              agents={AGENTS}
              blogs={BLOGS}
              faqs={FAQS}
              onSelectProperty={handleSelectProperty}
              onOpenConsultation={() => setConsultationOpen(true)}
              onSelectDeveloper={(devName) => {
                setSearchTermFilter(devName);
                window.location.href = '/search';
              }}
            />
          } />

          <Route path="/search" element={
            <PropertySearch
              properties={properties}
              onSelectProperty={handleSelectProperty}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              preset={searchPreset}
              initialSearchTerm={searchTermFilter}
            />
          } />

          <Route path="/property/:slug" element={
            <PropertyDetailWrapper 
              properties={properties}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          } />

          <Route path="/visa" element={<GoldenVisaPortal />} />
          <Route path="/calculator" element={<InvestmentCalculator />} />
          <Route path="/admin" element={
            <AdminDashboard
              properties={properties}
              onAddProperty={handleAddProperty}
            />
          } />

          <Route path="/blog" element={
            <div className="bg-white pt-28 pb-20 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C89B3C] block mb-2">The Journal</span>
                  <h1 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight">
                    Real Estate <span className="italic font-light">Insights</span>
                  </h1>
                  <p className="mt-3 text-xs font-sans text-zinc-500 tracking-wide uppercase">Institutional briefings for foreign wealth directors</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOGS.map(blog => (
                    <article key={blog.id} className="bg-[#FAF8F4] border border-zinc-100 flex flex-col justify-between group rounded-[18px] overflow-hidden">
                      <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 bg-zinc-950 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1">
                          {blog.category}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 block mb-1">{blog.date} • {blog.readTime}</span>
                          <h3 className="font-display text-base font-semibold text-zinc-900 group-hover:text-[#C89B3C] transition-colors duration-300 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-[11px] text-zinc-500 line-clamp-3 mt-2 leading-relaxed">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="border-t border-zinc-200/50 pt-4 flex justify-between items-center text-xs">
                          <span className="font-medium text-zinc-600">By {blog.author}</span>
                          <span className="text-[#C89B3C] font-bold uppercase tracking-wider text-[10px]">Read Brief &gt;</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          } />

          {/* Fallbacks */}
          <Route path="/about" element={
            <div className="bg-[#FAF8F4] pt-28 pb-12">
              <HomeSections
                properties={properties}
                developers={DEVELOPERS}
                communities={COMMUNITIES}
                agents={AGENTS}
                blogs={BLOGS}
                faqs={FAQS}
                onSelectProperty={handleSelectProperty}
                onOpenConsultation={() => setConsultationOpen(true)}
                onSelectDeveloper={(devName) => {}}
              />
            </div>
          } />

          {/* 404 Wildcard */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* FLOATING ACTION TELEMETRY TRIGGERS */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* Scroll Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 bg-white hover:bg-gold text-zinc-900 hover:text-white border border-zinc-200 shadow-lg flex items-center justify-center transition-all duration-300"
            title="Scroll to summit"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* VIP CONSULTATION REGISTRATION OVERLAY / MODAL */}
      {consultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white border border-zinc-100 p-6 md:p-8 max-w-[400px] w-full relative shadow-2xl rounded-none">
            <button
              onClick={() => setConsultationOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 focus:outline-none"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 border-b border-zinc-100 pb-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">VIP Priority Reservation</span>
              <h3 className="font-display text-2xl font-light text-zinc-900">Book Asset Consultation</h3>
            </div>

            {modalSuccess && (
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-4 mb-6 text-xs font-semibold leading-relaxed">
                {modalSuccess}
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-3 text-[11px] font-sans">
              <div>
                <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-1.5 text-center">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Sir Reginald Althorpe"
                  className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-3 py-2.5 focus:outline-none text-center"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-1.5 text-center">Secure Email Address</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="arthur@althorpewealth.com"
                  className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-3 py-2.5 focus:outline-none text-center"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-1.5 text-center">Direct Phone (WhatsApp)</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+44 7911 123456"
                  className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-3 py-2.5 focus:outline-none text-center"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-1.5 text-center">Estimated Capital Allocation</label>
                <select
                  value={clientBudget}
                  onChange={(e) => setClientBudget(e.target.value)}
                  className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-3 py-2.5 focus:outline-none cursor-pointer text-center appearance-none"
                >
                  <option>AED 2M - 5M (Golden Visa base)</option>
                  <option>AED 5M - 15M (Premium Beachfront)</option>
                  <option>AED 15M - 30M (Ultra Luxury Estates)</option>
                  <option>AED 30M+ (Sovereign Portfolios)</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-1.5 text-center">Investment Scope Brief</label>
                <textarea
                  rows={2}
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  placeholder="We require custom yield audits, off-market villa lists..."
                  className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-3 py-2.5 focus:outline-none text-zinc-600 text-center resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-zinc-950 hover:bg-gold text-white hover:text-zinc-950 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Transmit Priority Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL WHATSAPP FLOATING BUTTON */}
      <div className="fixed bottom-8 right-4 lg:bottom-12 lg:right-6 z-[90] flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Hello Texting Bubble */}
        <a 
          href="https://wa.me/971556656007"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-zinc-900 text-[13px] font-[600] px-4 py-2.5 rounded-[18px] rounded-br-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] pointer-events-auto hover:-translate-y-0.5 transition-transform origin-bottom-right animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse"></span>
            Hello 👋
          </span>
        </a>

        {/* WhatsApp Icon Button */}
        <a
          href="https://wa.me/971556656007"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group pointer-events-auto"
        >
          <img src={whatsappLogo} alt="WhatsApp" className="w-7 h-7 object-contain animate-pulse group-hover:animate-none" />
          <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with us
          </span>
        </a>
      </div>

    </div>
  );
}
