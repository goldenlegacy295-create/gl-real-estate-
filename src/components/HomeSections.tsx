import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, ArrowRight, Award, ShieldCheck, Mail, Phone, ExternalLink, HelpCircle, CheckCircle, Download, Send, Bookmark } from 'lucide-react';
import { Property, Developer, Community, Agent, Blog, FAQ } from '../types';
import heroVideo from '../../assets/videos/hero.mp4';
import ceoImg from '../../assets/photos/arvind-pal-singh.png';

interface HomeSectionsProps {
  properties: Property[];
  developers: Developer[];
  communities: Community[];
  agents: Agent[];
  blogs: Blog[];
  faqs: FAQ[];
  onSelectProperty: (property: Property) => void;
  onOpenConsultation: () => void;
  onSelectDeveloper?: (developerName: string) => void;
}

export default function HomeSections({
  properties,
  developers,
  communities,
  agents,
  blogs,
  faqs,
  onSelectProperty,
  onOpenConsultation,
  onSelectDeveloper
}: HomeSectionsProps) {
  const navigate = useNavigate();
  const [activeDevId, setActiveDevId] = useState('emaar');
  // Sticky search state
  const [searchCommunity, setSearchCommunity] = useState('All');
  const [searchType, setSearchType] = useState('All');
  const [searchBeds, setSearchBeds] = useState('All');
  const [searchBudget, setSearchBudget] = useState('All');

  // Lead PDF state
  const [pdfName, setPdfName] = useState('');
  const [pdfEmail, setPdfEmail] = useState('');
  const [pdfSuccess, setPdfSuccess] = useState('');

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');

  // FAQ Accordion active index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleSearchSubmit = () => {
    navigate('/search');
    // Scroll search section to view automatically
    setTimeout(() => {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 100);
  };

  const handlePdfSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pdfName || !pdfEmail) return;

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: pdfName,
        email: pdfEmail,
        message: 'Requesting Golden Legacy Luxury Dubai Investment Guide 2026 PDF download.',
        type: 'Investment Guide'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPdfSuccess("Dossier unlocked! The secure PDF download link was dispatched to your email.");
          setPdfName('');
          setPdfEmail('');
          setTimeout(() => setPdfSuccess(''), 6000);
        }
      });
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactName,
        email: contactEmail,
        message: contactMessage || 'General private office request.',
        type: 'General'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setContactSuccess("Your enquiry is securely registered. Our private desk will coordinate within 15 minutes.");
          setContactName('');
          setContactEmail('');
          setContactMessage('');
          setTimeout(() => setContactSuccess(''), 6000);
        }
      });
  };

  return (
    <div className="bg-white">
      
      {/* SECTION 1: LUXURY HERO */}
      <section className="relative min-h-0 lg:min-h-screen flex flex-col lg:flex-row items-center justify-center bg-zinc-950 text-white overflow-hidden pt-[112px] pb-12 lg:py-32 border-b border-[#C89B3C]/20">
        
        {/* Business Bay Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Static fall-back luxury image with transition */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-35'}`}
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5eaad0ff3b0d?q=80&w=1600')" }}
          ></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover scale-105 select-none pointer-events-none transition-opacity duration-[1500ms] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Subtle overlay to ensure centered text legibility */}
          <div className="absolute inset-0 bg-zinc-950/50 z-10 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10 w-full text-center flex flex-col items-center justify-center">
          {/* HERO HEADING CENTERED */}
          <div className="max-w-4xl mx-auto drop-shadow-2xl flex flex-col items-center">
            <span className="text-[10px] lg:text-xs uppercase tracking-[0.3em] font-semibold text-[#C89B3C] block mb-4 lg:mb-6">Legacy of Trust. Future of Luxury.</span>
            <h1 className="font-display text-[42px] leading-[1.1] md:text-7xl font-normal tracking-tight text-white w-[90%] mx-auto">
              Your Legacy Starts <br className="hidden md:block" />
              With The <span className="italic text-[#C89B3C] font-light">Right Property</span>
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-300 font-sans text-sm md:text-base leading-relaxed font-light hidden sm:block mt-6">
              Discover Dubai's most prestigious properties with trusted family advisors, institutional-grade analytics, and exclusive off-market allocations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 lg:mt-8 w-full px-4 sm:px-0 max-w-[340px] sm:max-w-none mx-auto">
              <button
                onClick={() => navigate('/search')}
                className="w-full sm:w-auto h-[54px] lg:h-auto lg:py-4 bg-[#C89B3C] text-white px-10 text-[16px] lg:text-sm uppercase tracking-widest font-semibold hover:bg-[#9F7725] transition-all duration-300 cursor-pointer shadow-lg shadow-[#C89B3C]/10 rounded-[16px] lg:rounded-md flex items-center justify-center"
              >
                Explore Properties
              </button>
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto h-[54px] lg:h-auto lg:py-4 bg-transparent border border-white/60 text-white px-10 text-[16px] lg:text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-zinc-950 transition-all duration-300 cursor-pointer rounded-[16px] lg:rounded-md flex items-center justify-center"
              >
                Book Consultation
              </button>
            </div>
          </div>

          {/* STICKY SEARCH BOX BAR */}
          <div className="mt-6 lg:mt-16 bg-transparent lg:bg-white text-white lg:text-zinc-900 px-[20px] py-[18px] lg:p-4 shadow-none lg:shadow-xl lg:shadow-black/5 border border-white/20 lg:border-[#ECECEC] max-w-5xl mx-auto rounded-[20px] lg:rounded-xl w-full backdrop-blur-md lg:backdrop-blur-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
              <div className="px-1 lg:px-4 py-2 border-b lg:border-b-0 lg:border-r border-white/20 lg:border-[#ECECEC] last:border-0 text-left flex flex-col justify-center min-h-[56px] lg:min-h-0">
                <label className="block text-[11px] lg:text-[9px] uppercase tracking-[0.1em] lg:tracking-widest font-bold text-[#C89B3C] mb-1">Location</label>
                <select
                  value={searchCommunity}
                  onChange={(e) => setSearchCommunity(e.target.value)}
                  className="w-full bg-transparent border-0 text-[17px] lg:text-xs font-medium focus:outline-none appearance-none p-0 cursor-pointer text-white lg:text-zinc-900 h-6 [&>option]:text-zinc-900"
                >
                  <option value="All">All Communities</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Business Bay">Business Bay</option>
                </select>
              </div>

              <div className="px-1 lg:px-4 py-2 border-b lg:border-b-0 lg:border-r border-white/20 lg:border-[#ECECEC] last:border-0 text-left flex flex-col justify-center min-h-[56px] lg:min-h-0">
                <label className="block text-[11px] lg:text-[9px] uppercase tracking-[0.1em] lg:tracking-widest font-bold text-[#C89B3C] mb-1">Property Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-transparent border-0 text-[17px] lg:text-xs font-medium focus:outline-none appearance-none p-0 cursor-pointer text-white lg:text-zinc-900 h-6 [&>option]:text-zinc-900"
                >
                  <option value="All">All Structures</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </div>

              <div className="px-1 lg:px-4 py-2 border-b lg:border-b-0 lg:border-r border-white/20 lg:border-[#ECECEC] last:border-0 text-left flex flex-col justify-center min-h-[56px] lg:min-h-0">
                <label className="block text-[11px] lg:text-[9px] uppercase tracking-[0.1em] lg:tracking-widest font-bold text-[#C89B3C] mb-1">Bedrooms</label>
                <select
                  value={searchBeds}
                  onChange={(e) => setSearchBeds(e.target.value)}
                  className="w-full bg-transparent border-0 text-[17px] lg:text-xs font-medium focus:outline-none appearance-none p-0 cursor-pointer text-white lg:text-zinc-900 h-6 [&>option]:text-zinc-900"
                >
                  <option value="All">Any Size</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>

              <div className="px-1 lg:px-4 py-2 border-b lg:border-b-0 lg:border-r border-white/20 lg:border-[#ECECEC] last:border-0 text-left flex flex-col justify-center min-h-[56px] lg:min-h-0">
                <label className="block text-[11px] lg:text-[9px] uppercase tracking-[0.1em] lg:tracking-widest font-bold text-[#C89B3C] mb-1">Budget Ceiling</label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-transparent border-0 text-[17px] lg:text-xs font-medium focus:outline-none appearance-none p-0 cursor-pointer text-white lg:text-zinc-900 h-6 [&>option]:text-zinc-900"
                >
                  <option value="All">No Ceiling</option>
                  <option value="5M">Under AED 5M</option>
                  <option value="15M">Under AED 15M</option>
                  <option value="30M">Under AED 30M</option>
                  <option value="50M">Under AED 50M</option>
                </select>
              </div>

              <div className="flex items-center justify-center p-1 mt-1 lg:mt-0">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full h-[54px] lg:h-full bg-[#1A1A1A] lg:bg-[#1A1A1A] text-white px-8 py-3 uppercase text-xs tracking-widest font-bold flex items-center justify-center space-x-2 rounded-[16px] lg:rounded-lg hover:bg-[#C89B3C] lg:hover:bg-[#C89B3C] transition-colors cursor-pointer shadow-none lg:shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: FEATURED DEVELOPERS */}
      <section className="py-12 bg-white border-b border-[#ECECEC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white shadow-sm py-8 px-6 flex flex-col items-center rounded-xl border border-[#ECECEC] overflow-hidden">
            <div className="text-center mb-8 shrink-0">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400 block mb-1">In Collaboration With</span>
              <h3 className="font-display text-2xl md:text-4xl text-[#C89B3C] font-bold tracking-tight">Official Partners</h3>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent mx-auto mt-4"></div>
            </div>
            
            {/* Infinite Loop Scroller */}
            <div className="relative w-full overflow-hidden select-none">
              {/* Inject local style for pure self-contained marquee scroll */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes partnerMarquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .partner-marquee-container {
                  display: flex;
                  width: max-content;
                  animation: partnerMarquee 20s linear infinite;
                }
                .partner-marquee-container:hover {
                  animation-play-state: paused;
                }
              `}} />
              
              <div className="partner-marquee-container flex items-center gap-16">
                {/* First Set */}
                {[
                  { name: 'SOBHA', domain: 'sobharealty.com' },
                  { name: 'DANUBE', domain: 'danubeproperties.ae' },
                  { name: 'DAMAC', domain: 'damacproperties.com' },
                  { name: 'AZIZI', domain: 'azizidevelopments.com' },
                  { name: 'BINGHATTI', domain: 'binghatti.com' },
                  { name: 'EMAAR', domain: 'emaar.com' },
                  { name: 'NAKHEEL', domain: 'nakheel.com' }
                ].map((partner, index) => (
                  <div key={`p1-${index}`} className="flex items-center justify-center min-w-[120px]">
                    <img 
                      src={`https://logo.clearbit.com/${partner.domain}`} 
                      alt={`${partner.name} Logo`} 
                      className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      onError={(e) => { 
                        e.currentTarget.style.display = 'none'; 
                        e.currentTarget.nextElementSibling!.style.display = 'block'; 
                      }} 
                    />
                    <span style={{ display: 'none' }} className="font-display text-base font-extrabold tracking-[0.2em] text-zinc-400 hover:text-[#C89B3C] transition-colors duration-300">
                      {partner.name}
                    </span>
                  </div>
                ))}
                {/* Duplicated set for infinite loop illusion */}
                {[
                  { name: 'SOBHA', domain: 'sobharealty.com' },
                  { name: 'DANUBE', domain: 'danubeproperties.ae' },
                  { name: 'DAMAC', domain: 'damacproperties.com' },
                  { name: 'AZIZI', domain: 'azizidevelopments.com' },
                  { name: 'BINGHATTI', domain: 'binghatti.com' },
                  { name: 'EMAAR', domain: 'emaar.com' },
                  { name: 'NAKHEEL', domain: 'nakheel.com' }
                ].map((partner, index) => (
                  <div key={`p2-${index}`} className="flex items-center justify-center min-w-[120px]">
                    <img 
                      src={`https://logo.clearbit.com/${partner.domain}`} 
                      alt={`${partner.name} Logo`} 
                      className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      onError={(e) => { 
                        e.currentTarget.style.display = 'none'; 
                        e.currentTarget.nextElementSibling!.style.display = 'block'; 
                      }} 
                    />
                    <span style={{ display: 'none' }} className="font-display text-base font-extrabold tracking-[0.2em] text-zinc-400 hover:text-[#C89B3C] transition-colors duration-300">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: FEATURED OFF-PLAN PROJECTS */}
      <section className="py-24 bg-[#FAF8F4] px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="gsap-reveal-left">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">High Capital Growth</span>
              <h2 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight">
                Featured Off-Plan <span className="italic font-light">Allocations</span>
              </h2>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="text-xs uppercase tracking-widest font-bold text-zinc-900 hover:text-gold transition-colors flex items-center gap-2 mt-4 md:mt-0 gsap-reveal-right"
            >
              <span>View All Inventories</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-stagger-container">
            {properties.filter(p => p.completionYear !== 'Ready').slice(0, 3).map(prop => (
              <div
                key={prop.id}
                className="bg-white border border-zinc-100 flex flex-col justify-between group gsap-stagger-item"
                style={{ borderRadius: '18px', overflow: 'hidden' }}
              >
                <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-zinc-950 text-[9px] uppercase tracking-widest font-bold px-3 py-1">
                    Completion {prop.completionYear}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-zinc-900/80 text-white text-xs font-semibold px-2.5 py-1">
                    ROI {prop.roi}%
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">
                      {prop.developer} • {prop.community}
                    </span>
                    <h3
                      onClick={() => onSelectProperty(prop)}
                      className="font-display text-lg font-semibold text-zinc-900 hover:text-gold cursor-pointer transition-colors duration-300"
                    >
                      {prop.title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center text-xs border-t border-zinc-100 pt-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">From</span>
                      <span className="font-mono font-bold text-zinc-950">
                        {prop.price > 0 ? `AED ${prop.price.toLocaleString()}` : 'Contact for Latest Price'}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="text-xs text-gold hover:text-gold-deep font-semibold tracking-wider uppercase font-sans"
                    >
                      Get Dossier &gt;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY INVEST IN DUBAI */}
      <section className="py-24 bg-zinc-950 px-6 overflow-hidden relative border-t border-zinc-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 gsap-reveal">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C89B3C] block mb-3">Institutional Safety</span>
            <h2 className="font-display text-3xl md:text-5xl text-white font-normal tracking-tight leading-tight">
              Why Global Portfolios <span className="italic font-light text-[#C89B3C]">Prefer Dubai</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-stagger-container">
            {/* Card 1 */}
            <div className="group relative bg-zinc-900 border border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(200,155,60,0.2)] transition-all duration-500 gsap-stagger-item overflow-hidden rounded-xl h-[380px] flex flex-col justify-end p-8">
              <img 
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800" 
                alt="Dubai Skyline" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/20"></div>
              
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-white/10 group-hover:text-[#C89B3C]/20 transition-colors duration-500">01</div>
              
              <div className="relative z-10 space-y-3">
                <h4 className="font-display text-2xl font-normal text-white group-hover:text-[#C89B3C] transition-colors duration-300">0% Personal Taxation</h4>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed font-light group-hover:text-zinc-200 transition-colors duration-300">
                  Enjoy absolute tax freedom. Dubai levies 0% personal income tax, 0% capital gains tax, and 0% ongoing corporate tax on residential rent.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-zinc-900 border border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(200,155,60,0.2)] transition-all duration-500 gsap-stagger-item overflow-hidden rounded-xl h-[380px] flex flex-col justify-end p-8">
              <img 
                src="https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Passport" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/20"></div>
              
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-white/10 group-hover:text-[#C89B3C]/20 transition-colors duration-500">02</div>
              
              <div className="relative z-10 space-y-3">
                <h4 className="font-display text-2xl font-normal text-white group-hover:text-[#C89B3C] transition-colors duration-300">10-Year Golden Visa</h4>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed font-light group-hover:text-zinc-200 transition-colors duration-300">
                  Real estate acquisitions of AED 2 Million or above secure long-term, self-sponsored residency, complete with family sponsorship options.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-zinc-900 border border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(200,155,60,0.2)] transition-all duration-500 gsap-stagger-item overflow-hidden rounded-xl h-[380px] flex flex-col justify-end p-8">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                alt="Financial District" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/20"></div>
              
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-white/10 group-hover:text-[#C89B3C]/20 transition-colors duration-500">03</div>
              
              <div className="relative z-10 space-y-3">
                <h4 className="font-display text-2xl font-normal text-white group-hover:text-[#C89B3C] transition-colors duration-300">High Yield Index (7-9%)</h4>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed font-light group-hover:text-zinc-200 transition-colors duration-300">
                  Gross rental yields in Dubai surpass London (3.2%) and New York (2.9%), optimizing immediate liquidity for global investors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4.5: FOUNDER & CORPORATE LEGACY */}
      <section id="founder-section" className="py-16 bg-zinc-950 text-white px-6 overflow-hidden relative border-t border-b border-zinc-900">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C89B3C_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Elegant Compact CEO Portrait */}
            <div className="lg:col-span-4 relative group gsap-reveal-left max-w-sm mx-auto lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold/20 via-transparent to-gold/10 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-lg"></div>
              <div className="relative border border-white/5 p-2 bg-zinc-900/40 backdrop-blur-md rounded-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-800">
                  <img 
                    src={ceoImg} 
                    alt="Mr. Arvind Pal - CEO of Golden Legacy Real Estate" 
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full object-top grayscale contrast-110 hover:grayscale-0 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/95 border border-gold/15 backdrop-blur-md text-center">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold font-bold block mb-0.5">
                      Golden Legacy Real Estate
                    </span>
                    <span className="text-[10px] text-white/60 font-light">
                      Founder's Executive Office
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Corporate Biography & Elevated Vision */}
            <div className="lg:col-span-8 space-y-6 gsap-reveal-right">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold block">
                  Corporate Leadership
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-normal tracking-tight text-white leading-tight">
                  The Vision Behind <span className="italic font-light text-gold">The Legacy</span>
                </h2>
              </div>

              <div className="space-y-4 text-zinc-300 font-sans text-xs md:text-sm font-light leading-relaxed">
                <div className="border-l border-gold pl-4 space-y-1">
                  <span className="font-display text-lg font-semibold text-white block">
                    Mr. Arvind Pal
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-gold block">
                    FOUNDER & CHIEF EXECUTIVE OFFICER
                  </span>
                </div>

                <p>
                  Arvind Pal Singh Arora is an eminent <span className="text-[#C89B3C] font-medium">global real estate strategist</span> and visionary entrepreneur who founded <strong className="text-white font-medium">GOLDEN LEGACY</strong> to champion high-end sovereign advisory and <span className="text-[#C89B3C] font-medium">UHNW portfolio optimization</span>. Leveraging an elite background in <span className="text-[#C89B3C] font-medium">international wealth management</span> and corporate structuring, he successfully steers family offices and institutional boards toward <span className="text-[#C89B3C] font-medium">high-yield capital growth</span> and master-planned asset allocations.
                </p>
                <p>
                  Under his sophisticated stewardship, the firm guides acquisitions across <span className="text-[#C89B3C] font-medium">Dubai’s most exclusive zip codes</span>—partnering with institutional developers such as Emaar, Sobha, and DAMAC. Built upon discretion and data-driven intelligence, GOLDEN LEGACY delivers unparalleled capital appreciation, secures <span className="text-[#C89B3C] font-medium">Golden Visa residency solutions</span>, and preserves <span className="text-[#C89B3C] font-medium">generational wealth</span> for its elite clientele.
                </p>
              </div>

              {/* CEO Signature / Stats */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-400 block mb-0.5">
                    Direct Portfolios Guided
                  </span>
                  <span className="font-display text-xl font-bold text-white">
                    AED 2.4 Billion+
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-400 block mb-0.5">
                    UHNW Families Advised
                  </span>
                  <span className="font-display text-xl font-bold text-white">
                    180+ Global Investors
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-display italic text-xl text-gold font-light tracking-wide opacity-85">
                    Arvind Pal S.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: COMMUNITIES MASONRY GRID */}
      <section className="py-24 bg-[#FAF8F4] px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Sovereign Locations</span>
            <h2 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight leading-tight">
              Dubai\'s Sovereign <span className="italic font-light">Zip Codes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gsap-stagger-container">
            {communities.map(comm => (
              <div
                key={comm.id}
                className="relative h-96 group overflow-hidden cursor-pointer gsap-stagger-item"
                style={{ borderRadius: '18px' }}
                onClick={() => navigate('/search')}
              >
                <img
                  src={comm.image}
                  alt={comm.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold block">
                    Average Yield: {comm.avgRoi}% ROI
                  </span>
                  <h3 className="font-display text-xl text-white font-semibold">{comm.name}</h3>
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-sans line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {comm.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 & 9: LUXURY ASSETS (Villas & Apartments registries) */}
      <section className="py-24 bg-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Bespoke Living</span>
            <h2 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight leading-tight">
              The Signature <span className="italic font-light">Villas & Apartments</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gsap-stagger-container">
            {properties.filter(p => p.type === 'Villa' || p.type === 'Penthouse').slice(0, 3).map(prop => (
              <div
                key={prop.id}
                className="bg-white border border-[#ECECEC] flex flex-col justify-between group gsap-stagger-item"
                style={{ borderRadius: '18px', overflow: 'hidden' }}
              >
                <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-zinc-950 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1">
                    {prop.type}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">
                      {prop.developer} • {prop.community}
                    </span>
                    <h3
                      onClick={() => onSelectProperty(prop)}
                      className="font-display text-lg font-semibold text-zinc-900 hover:text-gold cursor-pointer transition-colors duration-300 line-clamp-1"
                    >
                      {prop.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-1 font-sans">
                      {prop.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xs border-t border-zinc-100 pt-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Acquisition Value</span>
                      <span className="font-mono font-bold text-zinc-950">
                        {prop.price > 0 ? `AED ${prop.price.toLocaleString()}` : 'Contact for Latest Price'}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="text-xs text-zinc-950 hover:text-gold font-bold tracking-wider uppercase font-sans border-b border-zinc-950 hover:border-gold pb-0.5"
                    >
                      Audit Asset
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11: MEET OUR EXPERTS */}
      <section className="py-24 bg-[#FAF8F4] px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Elite Advisory Desk</span>
            <h2 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight leading-tight">
              Our Senior Wealth <span className="italic font-light">Advisors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-stagger-container">
            {agents.map(agent => (
              <div key={agent.id} className="bg-white border border-zinc-100 p-8 flex flex-col justify-between shadow-sm hover:border-gold/30 transition-all duration-300 gsap-stagger-item">
                <div className="space-y-4 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gold/20">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-zinc-900">{agent.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-gold font-bold">{agent.role}</span>
                  </div>
                  
                  <div className="text-xs text-zinc-500 font-sans space-y-1">
                    <div>Languages: <span className="text-zinc-700 font-medium">{agent.languages.join(', ')}</span></div>
                    <div>Experience: <span className="text-zinc-700 font-medium">{agent.experience} Years</span></div>
                    <div>Private portfolio count: <span className="text-zinc-700 font-medium">{agent.propertiesSold} registered</span></div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 mt-6 grid grid-cols-2 gap-2">
                  <a
                    href={agent.whatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] uppercase tracking-widest font-bold py-2.5 text-center font-sans"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="bg-zinc-900 text-white text-[10px] uppercase tracking-widest font-bold py-2.5 text-center font-sans"
                  >
                    Private Mail
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: WHY GOLDEN LEGACY VALUES TIMELINE */}
      <section className="py-24 bg-white px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 gsap-reveal">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Our Standard of Excellence</span>
            <h2 className="font-display text-3xl text-zinc-950 font-normal tracking-tight">
              An Enduring <span className="italic font-light text-gold">Commitment</span>
            </h2>
          </div>

          <div className="space-y-12 gsap-stagger-container">
            <div className="flex gap-6 items-start gsap-stagger-item">
              <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center bg-gold/5 font-mono text-xs font-bold text-gold shrink-0">
                01
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-semibold text-zinc-900">Unconditional Trust & Privacy</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  We cater strictly to family offices and high-net-worth sovereign individuals. Your financial disclosures, holdings and portfolio allocations are held in absolute fiduciary confidence.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start gsap-stagger-item">
              <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center bg-gold/5 font-mono text-xs font-bold text-gold shrink-0">
                02
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-semibold text-zinc-900">Complete Institutional Transparency</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  No hidden transactional fees or marketing hyperbole. We audit escrow structures, construct net ROI amortizations, and present real Land Department statistics.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start gsap-stagger-item">
              <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center bg-gold/5 font-mono text-xs font-bold text-gold shrink-0">
                03
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-semibold text-zinc-900">Elite End-to-End VIP Desk</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  From biometric Golden Visa applications and escrow contract signings to custom post-handover property managements—our team manages your Dubai footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15: DUBAI INVESTMENT GUIDE LEAD GENERATION */}
      <section className="py-24 bg-zinc-950 text-white px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 gsap-reveal-scale">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block">Exclusive Intelligence Dossier</span>
          <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Unlock the Dubai <br />
            <span className="italic text-gold">Wealth Blueprint 2026</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs text-zinc-400 font-sans leading-relaxed">
            Acquire instant access to our audited, off-market villa portfolio, Golden Visa biometric guide, and tax structuring ledger. Unconditional safety.
          </p>

          {pdfSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 max-w-md mx-auto text-xs leading-relaxed font-semibold">
              {pdfSuccess}
            </div>
          )}

          <form onSubmit={handlePdfSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-gold px-4 py-3.5 text-xs text-zinc-200 focus:outline-none placeholder-zinc-500"
            />
            <input
              type="email"
              required
              placeholder="Secure Email Address"
              value={pdfEmail}
              onChange={(e) => setPdfEmail(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-gold px-4 py-3.5 text-xs text-zinc-200 focus:outline-none placeholder-zinc-500"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-deep text-zinc-950 hover:text-white px-6 py-3.5 text-xs uppercase tracking-widest font-bold font-sans transition-all duration-300 shrink-0"
            >
              Secure Guide
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 16: FAQ ACCORDION */}
      <section className="py-24 bg-white px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 gsap-reveal">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Institutional FAQ</span>
            <h2 className="font-display text-3xl text-zinc-950 font-normal tracking-tight">
              Private Office <span className="italic font-light">Disclosure Desk</span>
            </h2>
          </div>

          <div className="space-y-4 gsap-stagger-container">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border-b border-zinc-100 pb-4 cursor-pointer gsap-stagger-item"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center py-2">
                  <h4 className="font-display text-sm font-semibold text-zinc-900 hover:text-gold transition-colors">
                    {faq.question}
                  </h4>
                  <span className="text-xs text-gold font-mono">{activeFaq === index ? '▲' : '▼'}</span>
                </div>
                {activeFaq === index && (
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans pt-2 animate-in fade-in duration-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 17: CONTACT OFFICE & MAP */}
      <section className="py-24 bg-[#FAF8F4] px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* CONTACT TEXT LEFT (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 gsap-reveal-left">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Corporate Headquarters</span>
                <h2 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight leading-tight">
                  Our Private <span className="italic font-light text-gold">Office</span>
                </h2>
                <p className="mt-4 text-xs text-zinc-500 font-sans leading-relaxed">
                  We look forward to coordinating your investment portfolio. Drop by our Business Bay office or coordinate a virtual zoom with our asset consultants.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans text-zinc-700">
                <div className="flex gap-3 items-center">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Suite 4801, Capital Tower, Corporate Boulevard, Business Bay, Dubai, UAE</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>+971 50 111 2233 (Asset Line)</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>desk@goldenlegacy.ae</span>
                </div>
              </div>

              {/* MOCK MAP CARD */}
              <div className="bg-zinc-900 text-zinc-400 p-6 flex flex-col justify-between h-40">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">Interactive GPS Coordinates</span>
                  <span className="text-white block text-xs">Business Bay Corporate Boulevard</span>
                </div>
                <div className="text-[9px] font-mono">
                  25.1857° N, 55.2721° E • Verified DLD Office Location
                </div>
              </div>
            </div>

            {/* MESSAGE DIRECT INTAKE FORM (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-zinc-100 p-8 md:p-10 shadow-sm gsap-reveal-right">
              <h3 className="font-display text-xl text-zinc-900 font-semibold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-gold" /> Coordinate Your Portfolio
              </h3>

              {contactSuccess && (
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-4 mb-6 text-xs leading-relaxed font-semibold">
                  {contactSuccess}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Sir Douglas Sterling"
                      className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Secure Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="douglas@sterlinggroup.com"
                      className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Investment Scope & Timeline</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="We represent a family office looking for freehold acquisitions on Palm Jumeirah with a maximum cash-flow budget of AED 35M..."
                    className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none text-zinc-700"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-zinc-950 hover:bg-gold text-white hover:text-zinc-950 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    Transmit Secure Inquiry
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 18: LUXURY FOOTER */}
      <footer className="bg-zinc-950 text-white py-16 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* BRAND */}
            <div className="space-y-4">
              <span className="font-display text-lg tracking-[0.2em] font-bold text-white uppercase block">
                Golden Legacy
              </span>
              <p className="text-[10px] text-zinc-500 font-sans leading-relaxed max-w-xs">
                A registered luxury real estate firm in Dubai, UAE. Regulated by the Dubai Land Department (DLD) and dedicated to sovereign wealth allocations.
              </p>
              <span className="block text-[8px] font-mono text-gold uppercase tracking-[0.3em]">
                Legacy of Trust. Future of Luxury.
              </span>
            </div>

            {/* QUICK LINKS */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Exclusive Portfolios</span>
              <ul className="space-y-2 text-xs text-zinc-500 font-sans">
                <li><button onClick={() => navigate('/search')} className="hover:text-gold transition-colors">Freehold Buy & Search</button></li>
                <li><button onClick={() => navigate('/visa')} className="hover:text-gold transition-colors">10-Year Golden Visa Portal</button></li>
                <li><button onClick={() => navigate('/calculator')} className="hover:text-gold transition-colors">Investment ROI Calculator</button></li>
              </ul>
            </div>

            {/* LEGAL LINKS */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Compliance & Legal</span>
              <ul className="space-y-2 text-xs text-zinc-500 font-sans">
                <li><span className="block">DLD License #1104823</span></li>
                <li><span className="block">Fiduciary Safety Escrow Policy</span></li>
                <li><span className="block">Non-Disclosure NDAs Provided</span></li>
                <li><span className="block">Compliant with Dubai Law No. 8</span></li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">VVIP Private Ledger</span>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                Register for private off-market allocations, pre-launch price locks, and legal updates.
              </p>
              <div className="flex bg-zinc-900 border border-zinc-800 focus-within:border-gold p-1">
                <input
                  type="email"
                  placeholder="advisor@email.com"
                  className="bg-transparent border-none text-[11px] px-3 py-1.5 focus:outline-none text-white flex-1"
                />
                <button
                  onClick={() => alert("Subscribed! Your email has been added to our off-market mailing desk.")}
                  className="bg-gold hover:bg-gold-deep text-zinc-950 hover:text-white text-[9px] uppercase tracking-widest font-bold font-sans px-3 py-1 transition-all"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 font-sans font-medium">
            <span>© 2026 Golden Legacy Real Estate PJSC. All Sovereign Rights Reserved.</span>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="hover:text-gold cursor-pointer transition-colors">NDA Policy</span>
              <span className="hover:text-gold cursor-pointer transition-colors">Fiduciary Disclosures</span>
              <span className="hover:text-gold cursor-pointer transition-colors">DLD Approved Registries</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
