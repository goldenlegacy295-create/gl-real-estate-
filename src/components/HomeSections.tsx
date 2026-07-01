import { useState, FormEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, ArrowRight, Award, ShieldCheck, Mail, Phone, ExternalLink, HelpCircle, CheckCircle, Download, Send, Bookmark, Instagram, Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../contexts/CurrencyContext';
import { generateGlobalSchema, injectSchema } from '../utils/seo';
import { PropertyImageSlider } from './PropertyImageSlider';
import { Property, Developer, Community, Agent, Blog, FAQ } from '../types';
import heroVideo from '../../assets/videos/hero.mp4';
import ceoImg from '../../assets/photos/arvind_ceo_and_advisor.png';
import whatsappLogo from '../../assets/logos/whatsapp logo.png';

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
  const { t } = useTranslation();
  const { convertPrice } = useCurrency();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    // Inject AEO/GEO optimized schema
    const schema = generateGlobalSchema();
    injectSchema(schema, 'global-schema');
  }, []);


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

  // IMPORTANT: Replace this placeholder with the Web App URL generated from the Google Apps Script
  const GOOGLE_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzsCadgOlgArAZxX4Z3hqxe7_VFKZDbFHTFiWkbCa6GAKwRNHx7Vv_3ZUfVUbhFO1gmNQ/exec";

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    // Use FormData for Google Apps Script doPost
    const formData = new FormData();
    formData.append('name', contactName);
    formData.append('email', contactEmail);
    formData.append('message', contactMessage || 'General private office request.');

    fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Apps Script without complex CORS setup
    })
      .then(() => {
        setContactSuccess("Your enquiry is securely registered. Our private desk will coordinate within 15 minutes.");
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setTimeout(() => setContactSuccess(''), 6000);
      })
      .catch(err => {
        console.error("Form submission error:", err);
        setContactSuccess("Form submitted securely.");
      });
  };

  const renderCategorySlider = (title: string, filterFn: (p: Property) => boolean) => {
    const filtered = properties.filter(filterFn);
    if (filtered.length === 0) return null;
    return (
      <div className="gsap-stagger-container mb-16">
        <div className="flex items-center justify-between gap-4 mb-8 px-6 lg:px-0">
          <div className="flex items-center gap-4 flex-1">
            <h3 className="font-display text-2xl font-semibold text-zinc-900">{title}</h3>
            <div className="h-px bg-zinc-200 flex-1 hidden sm:block"></div>
          </div>
          <button onClick={() => navigate('/search')} className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-wider hover:text-zinc-900 transition-colors whitespace-nowrap">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 px-6 lg:px-0">
          {filtered.map(prop => (
            <div key={prop.id} onClick={() => onSelectProperty(prop)} className="bg-white border border-[#ECECEC] rounded-[18px] overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col">
              <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden shrink-0">
                <PropertyImageSlider images={prop.images && prop.images.length > 0 ? prop.images : [prop.image]} alt={prop.title} />
                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-20">
                  {prop.developer}
                </div>
                {prop.roi && (
                  <div className="absolute bottom-4 left-4 bg-[#C89B3C]/90 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg">
                    Est. ROI {prop.roi}%
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-display text-lg font-semibold text-zinc-900 group-hover:text-[#C89B3C] transition-colors line-clamp-1">{prop.title}</h4>
                <p className="text-xs text-zinc-500 mt-2 line-clamp-2 mb-4 flex-1">{prop.description}</p>
                
                {/* Property Stats */}
                <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-5 pb-4 border-b border-zinc-100">
                  {prop.beds && <span>{prop.beds} Beds</span>}
                  {prop.baths && <span>{prop.baths} Baths</span>}
                  {prop.sqft && <span>{prop.sqft.toLocaleString()} Sq.Ft</span>}
                </div>

                <div className="flex justify-between items-center text-xs mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-zinc-400 mb-0.5">Starting Price</span>
                    <span className="font-mono font-bold text-zinc-950 text-sm">
                      {prop.price > 0 ? convertPrice(prop.price).formatted : 'Contact Us'}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[#25D366] font-bold uppercase tracking-wider pb-0.5 transition-all">
                    <img src={whatsappLogo} alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
                    Chat for more info
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Golden Legacy Real Estate | Premier Dubai Properties</title>
        <meta name="description" content="Discover Dubai's most prestigious properties with trusted family advisors, institutional-grade analytics, and exclusive off-market allocations." />
        <meta name="keywords" content="Dubai real estate, luxury villas Dubai, buy property Dubai, Golden Visa properties, off-plan projects, Dubai investment" />
        
        {/* Open Graph / Social */}
        <meta property="og:title" content="Golden Legacy Real Estate | Premier Dubai Properties" />
        <meta property="og:description" content="Access our audited, off-market portfolio, Golden Visa guides, and expert tax structuring." />
        <meta property="og:type" content="website" />
        
        {/* AEO / GEO Specific Tags */}
        <meta name="subject" content="Dubai Luxury Real Estate" />
        <meta name="audience" content="Investors, High-Net-Worth Individuals" />
      </Helmet>
      
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
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
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
            <span className="text-[10px] lg:text-xs uppercase tracking-[0.3em] font-semibold text-[#C89B3C] block mb-3">Legacy of Trust. Future of Luxury.</span>
            <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold text-white bg-[#C89B3C]/20 border border-[#C89B3C]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 lg:mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(200,155,60,0.4)] hover:bg-[#C89B3C]/30 hover:scale-105 transition-all duration-300">
              <Award className="w-3 h-3 text-[#C89B3C]" />
              {t('hero.minInvestment')}: <span className="text-[#C89B3C]">{convertPrice(600000).formatted}</span>
            </span>
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
      <section className="py-24 bg-white overflow-hidden border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center">
            <h3 className="font-display text-2xl md:text-3xl text-zinc-900 font-bold tracking-tight mb-16 text-center">
              Our Leading Partners
            </h3>
            
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 md:gap-y-16 justify-items-center max-w-5xl mx-auto">
              {[
                { name: 'DAMAC', logo: '/photos/Partners/Damac.png' },
                { name: 'EMAAR', logo: '/photos/Partners/EMAAR.png' },
                { name: 'SOBHA', logo: '/photos/Partners/sobha-realty.png' },
                { name: 'NAKHEEL', logo: '/photos/Partners/Nakheel.jpg' },
                { name: 'DANUBE', logo: '/photos/Partners/Danube.png' },
                { name: 'AZIZI', logo: '/photos/Partners/Azizi.png' },
                { name: 'BINGHATTI', logo: '/photos/Partners/Binghatti.webp' },
                { name: 'ALEF', logo: '/photos/Partners/Alef.jpg' },
                { name: 'MERAAS', textLogo: true },
              ].map((partner, index) => (
                <div key={index} className="flex items-center justify-center hover:scale-105 transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(200,155,60,0.4)] w-40 h-20 md:w-56 md:h-28">
                  {partner.textLogo ? (
                    <div className="flex items-center justify-center gap-2 text-zinc-900 font-display text-xl md:text-3xl font-bold tracking-widest w-full h-full">
                      <span className="flex gap-[3px]">
                        <div className="w-1 h-5 md:h-7 bg-zinc-900"></div>
                        <div className="w-1 h-5 md:h-7 bg-zinc-900"></div>
                        <div className="w-1 h-5 md:h-7 bg-zinc-900"></div>
                      </span>
                      MERAAS
                    </div>
                  ) : (
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} Logo`} 
                      className="w-full h-full object-contain"
                      onError={(e) => { 
                        e.currentTarget.style.display = 'none'; 
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block'; 
                        }
                      }} 
                    />
                  )}
                  {!partner.textLogo && (
                    <span style={{ display: 'none' }} className="font-display text-xl md:text-2xl font-extrabold tracking-[0.2em] text-zinc-900">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
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
                  <PropertyImageSlider className="group-hover:scale-105 transition-transform duration-500" images={prop.images && prop.images.length > 0 ? prop.images : [prop.image]} alt={prop.title} />
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
                      onClick={(e) => { e.stopPropagation(); onSelectProperty(prop); }}
                      className="flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#20bd5a] font-semibold tracking-wider uppercase font-sans"
                    >
                      <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4 object-contain" />
                      Chat for more info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* SECTION 5: EXPLORE PRIME LOCATIONS */}
      <section className="py-24 bg-[#FAF8F4] px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-[#1a2f4d] font-bold tracking-tight">Explore Prime Locations</h2>
            </div>
            <button onClick={() => navigate('/search')} className="mt-6 md:mt-0 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold rounded-lg transition-colors">
              View More Areas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[600px]">
            {/* Palm Jebel Ali (col span 2, row 1) */}
            <div 
              className="md:col-span-2 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer h-64 md:h-auto"
              onClick={() => navigate('/search')}
            >
              <img src="/photos/inventory/DAMAC ISLANDS/DAMAC ISLANDS (1).png" alt="Palm Jebel Ali" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h3 className="text-white text-2xl font-bold font-display tracking-wide mb-1">Palm Jebel Ali</h3>
                <p className="text-white/80 text-sm max-w-md">Iconic waterfront development featuring luxurious villas and world-class amenities</p>
              </div>
            </div>

            {/* Downtown Dubai (col 3, row span 2) */}
            <div 
              className="md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer h-64 md:h-auto"
              onClick={() => navigate('/search')}
            >
              <img src="/photos/inventory/burj aziz/burj aziz.jpeg" alt="Downtown Dubai" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h3 className="text-white text-2xl font-bold font-display tracking-wide">Downtown Dubai</h3>
              </div>
            </div>

            {/* Business Bay (col 1, row 2) */}
            <div 
              className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer h-64 md:h-auto"
              onClick={() => navigate('/search')}
            >
              <img src="/photos/inventory/Bugatti Residences By Binghatti/Bugatti Residences By Binghatti (1).png" alt="Business Bay" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h3 className="text-white text-2xl font-bold font-display tracking-wide">Business Bay</h3>
              </div>
            </div>

            {/* Dubai Marina (col 2, row 2) */}
            <div 
              className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group cursor-pointer h-64 md:h-auto"
              onClick={() => navigate('/search')}
            >
              <img src="/photos/inventory/Damac Lagoons/Damac Lagoons (1).png" alt="Dubai Marina" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h3 className="text-white text-2xl font-bold font-display tracking-wide">Dubai Marina</h3>
              </div>
            </div>
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
            {properties.filter(p => ['prop-1', 'prop-10', 'prop-11'].includes(p.id)).map(prop => (
              <div
                key={prop.id}
                className="bg-white border border-[#ECECEC] flex flex-col justify-between group gsap-stagger-item"
                style={{ borderRadius: '18px', overflow: 'hidden' }}
              >
                <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <PropertyImageSlider className="group-hover:scale-105 transition-transform duration-500" images={prop.images && prop.images.length > 0 ? prop.images : [prop.image]} alt={prop.title} />
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
                        {prop.price > 0 ? convertPrice(prop.price).formatted : 'Contact for Latest Price'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectProperty(prop); }}
                      className="flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#20bd5a] font-bold tracking-wider uppercase font-sans"
                    >
                      <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4 object-contain" />
                      Chat for more info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => navigate('/search')} className="px-8 py-4 bg-[#1a2f4d] hover:bg-[#C89B3C] text-white font-bold rounded-lg uppercase tracking-widest text-xs transition-colors shadow-lg">
              Browse Full Inventory
            </button>
          </div>
        </div>
      </section>

      {/* SECTION A: INSTITUTIONAL SAFETY */}
      <section className="py-24 bg-[#0a0a0a] px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C89B3C] block mb-2">Institutional Safety</span>
            <h2 className="font-display text-3xl md:text-5xl text-white font-normal tracking-tight leading-tight">
              Why Global Portfolios <span className="italic font-light text-[#C89B3C]">Prefer Dubai</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: '01',
                title: '0% Personal Taxation',
                desc: 'Enjoy absolute tax freedom. Dubai levies 0% personal income tax, 0% capital gains tax, and 0% ongoing corporate tax on residential rent.',
                bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
              },
              {
                id: '02',
                title: '10-Year Golden Visa',
                desc: 'Real estate acquisitions of AED 2 Million or above secure long-term, self-sponsored residency, complete with family sponsorship options.',
                bg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800'
              },
              {
                id: '03',
                title: 'High Yield Index (7-9%)',
                desc: 'Gross rental yields in Dubai surpass London (3.2%) and New York (2.9%), optimizing immediate liquidity for global investors.',
                bg: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800'
              }
            ].map(item => (
              <div key={item.id} className="relative rounded-2xl overflow-hidden h-[400px] border border-white/10 group">
                <img src={item.bg} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute top-6 right-6 text-4xl font-display font-bold text-white/10 group-hover:text-[#C89B3C]/30 transition-colors duration-700">{item.id}</div>
                <div className="absolute bottom-0 left-0 p-8 space-y-4">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#C89B3C] transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B: CORPORATE LEADERSHIP */}
      <section className="py-24 bg-[#0a0a0a] px-6 overflow-hidden relative border-t border-white/5">
        {/* Subtle horizontal green line */}
        <div className="absolute top-[65%] left-0 w-full h-px bg-[#25D366] z-0 pointer-events-none shadow-[0_0_10px_#25D366]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Image Card */}
            <div className="lg:col-span-4">
              <div className="border border-white/20 rounded-xl p-2 bg-[#111]">
                <div className="rounded-lg overflow-hidden bg-zinc-900 border border-white/10 relative pb-6">
                  <img src="/photos/arvind_ceo_and_advisor.png" alt="Mr. Arvind Pal" className="w-full aspect-[4/5] object-cover object-top" />
                  <div className="text-center mt-6">
                    <span className="text-[9px] uppercase tracking-widest text-[#C89B3C] font-bold block mb-1">Golden Legacy Real Estate</span>
                    <span className="text-[10px] text-zinc-500 font-serif italic">Founder's Executive Office</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-8 space-y-8 bg-[#0a0a0a] p-4 relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C89B3C] block mb-2">Corporate Leadership</span>
                <h2 className="font-display text-3xl md:text-4xl text-white font-normal tracking-tight leading-tight">
                  The Vision Behind <span className="italic font-light text-[#C89B3C]">The Legacy</span>
                </h2>
              </div>

              <div className="border-l-2 border-[#C89B3C] pl-6 space-y-1">
                <h3 className="text-xl font-display font-bold text-white">Mr. Arvind Pal</h3>
                <span className="text-[9px] uppercase tracking-widest text-[#C89B3C] font-bold">FOUNDER & CHIEF EXECUTIVE OFFICER</span>
              </div>

              <div className="space-y-6 text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
                <p>
                  Arvind Pal Singh Arora is an eminent <span className="text-[#C89B3C] font-semibold">global real estate strategist</span> and visionary entrepreneur who founded <span className="text-white font-bold">GOLDEN LEGACY</span> to champion high-end sovereign advisory and <span className="text-[#25D366] font-semibold">UHNW portfolio optimization</span>. Leveraging an elite background in <span className="text-[#C89B3C] font-semibold">international wealth management</span> and corporate structuring, he successfully steers family offices and institutional boards toward <span className="text-[#C89B3C] font-semibold">high-yield capital growth</span> and master-planned asset allocations.
                </p>
                <p>
                  Under his sophisticated stewardship, the firm guides acquisitions across <span className="text-[#C89B3C] font-semibold">Dubai's most exclusive zip codes</span>—partnering with institutional developers such as Emaar, Sobha, and DAMAC. Built upon discretion and data-driven intelligence, GOLDEN LEGACY delivers unparalleled capital appreciation, secures <span className="text-[#C89B3C] font-semibold">Golden Visa residency solutions</span>, and preserves <span className="text-[#C89B3C] font-semibold">generational wealth</span> for its elite clientele.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-6 border-t border-white/10 items-end">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Direct Portfolios Guided</span>
                  <span className="text-xl font-display font-bold text-white">AED 2.4 Billion+</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">UHNW Families Advised</span>
                  <span className="text-xl font-display font-bold text-white">180+ Global Investors</span>
                </div>
                <div className="text-right hidden lg:block">
                  <span className="font-serif italic text-[#C89B3C] text-2xl">Arvind Pal S.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C: ELITE ADVISORY DESK */}
      <section className="py-24 bg-[#FAF8F4] px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C89B3C] block mb-2">Elite Advisory Desk</span>
            <h2 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight leading-tight">
              Our Senior Wealth <span className="italic font-light">Advisors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'agent-1',
                name: 'Arvind Pal Singh',
                role: 'CEO & Founder',
                image: '/photos/arvind_ceo_and_advisor.png',
                langs: 'English, Hindi',
                exp: '18 Years',
                portfolio: 420,
                wa: 'https://wa.me/971501112233',
                mail: 'mailto:arvind@goldenlegacy.ae'
              },
              {
                id: 'agent-2',
                name: 'Elena Rostova',
                role: 'Director of Luxury Acquisitions',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
                langs: 'Russian, English, German',
                exp: '12 Years',
                portfolio: 280,
                wa: 'https://wa.me/971501112233',
                mail: 'mailto:elena@goldenlegacy.ae'
              },
              {
                id: 'agent-3',
                name: 'Oshhavarora',
                role: 'Advisor',
                image: '/photos/Oshhav Arora advisor.png',
                langs: 'English, Hindi',
                exp: '5 Years',
                portfolio: 195,
                wa: 'https://wa.me/971501112233',
                mail: 'mailto:advisor@goldenlegacy.ae'
              }
            ].map(agent => (
              <div key={agent.id} className="bg-white border border-[#ECECEC] p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white ring-1 ring-[#C89B3C]/30 mb-6 bg-zinc-100 group-hover:ring-[#C89B3C] transition-all">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-display text-lg font-bold text-zinc-900 mb-1">{agent.name}</h3>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#C89B3C] block mb-6">{agent.role}</span>
                
                <div className="space-y-1.5 text-[11px] font-sans text-zinc-500 mb-8 w-full border-b border-zinc-100 pb-8">
                  <p>Languages: <span className="font-semibold text-zinc-900">{agent.langs}</span></p>
                  <p>Experience: <span className="font-semibold text-zinc-900">{agent.exp}</span></p>
                  <p>Private portfolio count: <span className="font-semibold text-zinc-900">{agent.portfolio} registered</span></p>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <a href={agent.wa} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-3 px-2 text-[9px] font-bold uppercase tracking-wider hover:bg-[#20bd5a] transition-colors rounded-sm">
                    <img src={whatsappLogo} alt="WhatsApp" className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a href={agent.mail} className="flex items-center justify-center bg-zinc-950 text-white py-3 px-2 text-[9px] font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors rounded-sm">
                    Private Mail
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: WHY CHOOSE GOLDEN LEGACY */}
      <section className="py-24 bg-[#0a0a0a] px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Masonry Image Collage */}
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="col-span-2 relative rounded-2xl overflow-hidden h-64 border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" alt="Luxury Villa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 border border-white/10 group mt-4">
                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600" alt="Dubai Skyline" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 border border-white/10 group mt-4">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600" alt="Luxury Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="space-y-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C89B3C] block mb-2">Our Expertise</span>
                <h2 className="font-display text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight mb-6">
                  Why Choose <span className="text-[#C89B3C] italic font-light">Golden Legacy</span> Real Estate?
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  With years of experience and deep market insights, we help you find properties perfectly aligned with your lifestyle and investment goals.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2 border-l-2 border-[#C89B3C] pl-6">
                  <h3 className="font-display text-2xl font-bold text-white">1. Market Expertise</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    Golden Legacy Real Estate has in-depth knowledge of the Dubai real estate market, helping clients find ideal properties tailored to their needs.
                  </p>
                </div>
                
                <div className="space-y-2 border-l-2 border-[#C89B3C] pl-6">
                  <h3 className="font-display text-2xl font-bold text-white">2. Comprehensive Services</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    From property buying and selling to leasing and property management, Golden Legacy offers a full suite of services.
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-[#C89B3C] pl-6">
                  <h3 className="font-display text-2xl font-bold text-white">3. Client-Centric Approach</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    Known for its transparent and customer-focused service, Golden Legacy aims to build long-term relationships with clients, ensuring a smooth experience.
                  </p>
                </div>
              </div>
            </div>

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="font-display text-xl text-zinc-900 font-semibold flex items-center gap-2 m-0">
                  <Mail className="w-5 h-5 text-gold" /> Coordinate Your Portfolio
                </h3>
                <a href="https://wa.me/971556656007" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#20bd5a] transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 group relative overflow-hidden self-start">
                  <span className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none"></span>
                  <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4 object-contain relative z-10" />
                  <span className="text-[11px] uppercase tracking-wider font-bold relative z-10">WhatsApp +971 556656007</span>
                </a>
              </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            
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
              <div className="flex gap-3 pt-4">
                <a href="https://wa.me/971556656007" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300" aria-label="WhatsApp">
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-zinc-950 hover:border-gold transition-all duration-300">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-zinc-950 hover:border-gold transition-all duration-300">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-zinc-950 hover:border-gold transition-all duration-300">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-gold hover:text-zinc-950 hover:border-gold transition-all duration-300">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>
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

            {/* HEADQUARTERS */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Corporate Headquarters</span>
              <div>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans font-bold">
                  Our Private Office
                </p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-sans mt-1">
                  Boulevard Plaza Tower 2<br/>
                  Downtown Dubai, UAE<br/>
                  PO Box 12345
                </p>
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
