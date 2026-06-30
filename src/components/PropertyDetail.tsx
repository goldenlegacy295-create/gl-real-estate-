import { useState, useEffect, FormEvent } from 'react';
import { 
  ArrowLeft, Phone, Calendar, Share2, Compass, MapPin, Award, CheckCircle, 
  FileText, Send, Sparkles, Heart, ChevronLeft, ChevronRight, X, Play, 
  Building, Expand, Maximize2, Download, Facebook, Twitter, Linkedin, 
  MessageSquare, Car, Key, Ruler, Layers, Shield, Bed, Bath, Hash, Info, Home
} from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import { generatePropertySchema, injectSchema } from '../utils/seo';
import { Property } from '../types';
import { AGENTS, PROPERTIES } from '../data';
import { useNavigate } from 'react-router-dom';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}

// Icon mapper for amenities
const getAmenityIcon = (amenity: string) => {
  const am = amenity.toLowerCase();
  if (am.includes('pool')) return <Compass className="w-5 h-5" />;
  if (am.includes('gym') || am.includes('fitness')) return <Award className="w-5 h-5" />;
  if (am.includes('park') || am.includes('garden')) return <MapPin className="w-5 h-5" />;
  if (am.includes('smart')) return <Home className="w-5 h-5" />;
  if (am.includes('security') || am.includes('cctv')) return <Shield className="w-5 h-5" />;
  if (am.includes('concierge') || am.includes('valet')) return <Key className="w-5 h-5" />;
  return <CheckCircle className="w-5 h-5" />;
};

export default function PropertyDetail({ property, onBack, onToggleWishlist, wishlist }: PropertyDetailProps) {
  const { convertPrice } = useCurrency();
  const navigate = useNavigate();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Fullscreen Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Form lead captures
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Requesting priority dossier for the ${property.title}.`);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning');
  const [success, setSuccess] = useState('');

  // Local mortgage calculator
  const [term, setTerm] = useState(20);
  const [interest, setInterest] = useState(4.5);
  const [downPayment, setDownPayment] = useState(property.price > 0 ? property.price * 0.25 : 0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const images = property.images && property.images.length > 0 ? property.images : [property.image];
  const agent = property.agentId ? AGENTS.find(a => a.id === property.agentId) : AGENTS[0];
  const similarProperties = PROPERTIES.filter(p => p.id !== property.id && (p.community === property.community || p.type === property.type)).slice(0, 3);

  useEffect(() => {
    setIsWishlisted(wishlist.includes(property.id));
    injectSchema(generatePropertySchema(property), `property-schema-${property.id}`);
    
    return () => {
      const script = document.getElementById(`property-schema-${property.id}`);
      if (script) script.remove();
    };
  }, [wishlist, property]);

  useEffect(() => {
    const loan = property.price - downPayment;
    const r = interest / 12 / 100;
    const n = term * 12;
    let payment = 0;

    if (loan > 0 && r > 0) {
      payment = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (loan > 0) {
      payment = loan / n;
    }
    setMonthlyPayment(payment);
  }, [property.price, downPayment, term, interest]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this luxury property: ${property.title} in Dubai.`;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert("Dossier Link successfully copied to clipboard.");
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    }
  };

  const handleLeadSubmit = async (e: FormEvent, leadType: string) => {
    e.preventDefault();
    if (!name || !email) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, 
          message: `${message} (Inquiry Type: ${leadType}, Date: ${preferredDate}, Time: ${preferredTime})`,
          propertyId: property.id,
          type: leadType
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`Success! Your priority ${leadType} reservation is catalogued. Our senior advisor will call you shortly.`);
        setName(''); setEmail(''); setPhone('');
        setTimeout(() => setSuccess(''), 6000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen pt-28 pb-24 font-sans relative">
      
      {/* FULLSCREEN LIGHTBOX GALLERY */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-7xl px-4 flex items-center justify-between">
            <button 
              onClick={() => setActiveImageIdx(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-5xl aspect-[16/9] mx-4">
              <img src={images[activeImageIdx]} alt="Fullscreen Gallery" className="object-contain w-full h-full" />
              <div className="absolute bottom-4 right-4 bg-zinc-950/80 text-white text-xs px-3 py-1 rounded-full font-mono">
                {activeImageIdx + 1} / {images.length}
              </div>
            </div>
            <button 
              onClick={() => setActiveImageIdx(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex gap-2 mt-8 overflow-x-auto max-w-3xl px-4 snap-x snap-mandatory hide-scrollbar">
            {images.map((imgUrl, tIdx) => (
              <img 
                key={tIdx} src={imgUrl} alt="Thumb" 
                onClick={() => setActiveImageIdx(tIdx)}
                className={`w-24 h-16 object-cover cursor-pointer rounded border-2 transition-all snap-center ${activeImageIdx === tIdx ? 'border-[#C89B3C]' : 'border-transparent opacity-50 hover:opacity-100'}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        
        {/* BACK & ACTIONS ROW */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-[#C89B3C] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Portfolio
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => onToggleWishlist(property.id)} className={`flex items-center gap-2 px-4 py-2 border rounded hover:border-[#C89B3C] transition-all text-xs font-bold uppercase tracking-wider ${isWishlisted ? 'border-[#C89B3C] bg-[#C89B3C]/5 text-[#C89B3C]' : 'border-zinc-200 text-zinc-600'}`}>
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} /> {isWishlisted ? 'Saved' : 'Save'}
            </button>
            <div className="flex gap-1 border border-zinc-200 rounded p-1 bg-white">
              <button onClick={() => handleShare('whatsapp')} className="p-1.5 text-zinc-400 hover:text-emerald-500 transition-colors"><MessageSquare className="w-4 h-4" /></button>
              <button onClick={() => handleShare('facebook')} className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"><Facebook className="w-4 h-4" /></button>
              <button onClick={() => handleShare('copy')} className="p-1.5 text-zinc-400 hover:text-[#C89B3C] transition-colors"><Share2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* HERO TITLE & KEY METRICS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-zinc-900 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1">{property.status || (property.completionYear === 'Ready' ? 'Ready to Move' : 'Off-Plan')}</span>
            <span className="bg-[#C89B3C]/10 border border-[#C89B3C]/20 text-[#C89B3C] text-[9px] uppercase tracking-widest font-bold px-3 py-1">{property.type}</span>
            {property.goldenVisaEligible && <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] uppercase tracking-widest font-bold px-3 py-1 flex items-center gap-1"><Award className="w-3 h-3" /> Golden Visa</span>}
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-zinc-950 font-normal tracking-tight mb-4">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#C89B3C]" /> {property.community}, {property.location}</span>
            <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-[#C89B3C]" /> {property.developer}</span>
            <span className="font-mono text-zinc-900 font-bold bg-white border border-zinc-200 px-3 py-1 rounded">
              {property.price > 0 ? convertPrice(property.price).formatted : 'Price on Application'}
            </span>
          </div>
        </div>

        {/* HERO GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-12 h-[400px] md:h-[550px] rounded-xl overflow-hidden group">
          <div className="md:col-span-3 relative h-full bg-zinc-100 cursor-pointer overflow-hidden" onClick={() => { setActiveImageIdx(0); setLightboxOpen(true); }}>
            <img loading="lazy" src={images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur text-zinc-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Maximize2 className="w-4 h-4" /> Expand Gallery</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full">
            {images.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative h-1/2 bg-zinc-100 cursor-pointer overflow-hidden" onClick={() => { setActiveImageIdx(idx + 1); setLightboxOpen(true); }}>
                <img loading="lazy" src={img} alt="Thumbnail" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                {idx === 1 && images.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/40 transition-colors">
                    <span className="text-white font-display text-xl font-medium">+{images.length - 3}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN LAYOUT: CONTENT + STICKY SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          
          {/* CONTENT COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* PROPERTY OVERVIEW GRID */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm rounded-xl">
              <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6 flex items-center gap-3"><Info className="w-5 h-5 text-[#C89B3C]" /> Property Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Type</span><span className="font-semibold text-zinc-900">{property.type}</span></div>
                {property.beds > 0 && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Bedrooms</span><span className="font-semibold text-zinc-900 flex items-center gap-2"><Bed className="w-4 h-4 text-zinc-400"/> {property.beds}</span></div>}
                {property.baths > 0 && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Bathrooms</span><span className="font-semibold text-zinc-900 flex items-center gap-2"><Bath className="w-4 h-4 text-zinc-400"/> {property.baths}</span></div>}
                {property.sqft > 0 && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Area (Sq.Ft)</span><span className="font-semibold text-zinc-900 flex items-center gap-2"><Ruler className="w-4 h-4 text-zinc-400"/> {property.sqft.toLocaleString()}</span></div>}
                {property.parking && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Parking</span><span className="font-semibold text-zinc-900 flex items-center gap-2"><Car className="w-4 h-4 text-zinc-400"/> {property.parking} Spaces</span></div>}
                {property.floorNumber && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Floor</span><span className="font-semibold text-zinc-900 flex items-center gap-2"><Layers className="w-4 h-4 text-zinc-400"/> {property.floorNumber}</span></div>}
                {property.furnishing && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Furnishing</span><span className="font-semibold text-zinc-900">{property.furnishing}</span></div>}
                {property.yearBuilt && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Year Built</span><span className="font-semibold text-zinc-900">{property.yearBuilt}</span></div>}
                {property.serviceCharges && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Service Charges</span><span className="font-semibold text-zinc-900">{property.serviceCharges}</span></div>}
                {property.ownershipType && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Ownership</span><span className="font-semibold text-zinc-900">{property.ownershipType}</span></div>}
                {property.completionYear && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Status</span><span className="font-semibold text-zinc-900">{property.completionYear === 'Ready' ? 'Ready to Move' : `Off-Plan (${property.completionYear})`}</span></div>}
                {property.referenceNumber && <div><span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Reference No.</span><span className="font-mono text-xs font-semibold text-zinc-900 flex items-center gap-1"><Hash className="w-3 h-3 text-zinc-400"/> {property.referenceNumber}</span></div>}
              </div>
            </div>

            {/* DESCRIPTION NARRATIVE */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm rounded-xl">
              <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6">Property Narrative</h3>
              <div className="prose prose-zinc max-w-none text-zinc-600 text-sm leading-loose">
                <p>{property.description}</p>
                {property.investmentHighlights && (
                  <>
                    <h4 className="text-zinc-900 font-semibold mt-6 mb-4 uppercase tracking-widest text-[11px]">Investment Highlights</h4>
                    <ul className="space-y-2 list-none p-0">
                      {property.investmentHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#C89B3C] shrink-0 mt-1" /> <span>{hl}</span></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* AMENITIES */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm rounded-xl">
              <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6 flex items-center gap-3"><Sparkles className="w-5 h-5 text-[#C89B3C]" /> Premium Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amen, idx) => (
                  <div key={idx} className="bg-[#FAF8F4] border border-zinc-100 p-4 rounded-lg flex items-center gap-3 hover:border-[#C89B3C]/30 transition-colors">
                    <div className="text-[#C89B3C] bg-white p-2 rounded-md shadow-sm">
                      {getAmenityIcon(amen)}
                    </div>
                    <span className="text-xs font-semibold text-zinc-700">{amen}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENT PLAN */}
            {(property.paymentPlanMilestones && property.paymentPlanMilestones.length > 0) || property.paymentPlan ? (
              <div className="bg-white border border-zinc-100 p-8 shadow-sm rounded-xl">
                <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6">Payment Strategy</h3>
                {property.paymentPlanMilestones && property.paymentPlanMilestones.length > 0 ? (
                  <div className="overflow-hidden border border-zinc-100 rounded-lg">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF8F4] text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                          <th className="p-4 border-b border-zinc-100">Milestone</th>
                          <th className="p-4 border-b border-zinc-100 text-right">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {property.paymentPlanMilestones.map((m, idx) => (
                          <tr key={idx} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors">
                            <td className="p-4 text-sm font-medium text-zinc-800">{m.milestone}</td>
                            <td className="p-4 text-sm font-bold text-[#C89B3C] text-right">{m.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-600 font-medium">{property.paymentPlan}</p>
                )}
              </div>
            ) : null}

            {/* MULTIMEDIA: VIDEO & 360 */}
            {(property.videoUrl || property.virtualTour360Url) && (
              <div className="bg-zinc-950 text-white border border-zinc-800 p-8 shadow-xl rounded-xl space-y-8">
                <h3 className="font-display text-2xl font-semibold flex items-center gap-3"><Play className="w-5 h-5 text-[#C89B3C]" /> Immersive Media</h3>
                {property.videoUrl && (
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C89B3C]">Cinematic Tour</span>
                    <div className="aspect-[16/9] bg-zinc-900 rounded-lg overflow-hidden border border-white/10">
                      <iframe src={property.videoUrl} className="w-full h-full" allowFullScreen></iframe>
                    </div>
                  </div>
                )}
                {property.virtualTour360Url && (
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C89B3C]">360° Virtual Walkthrough</span>
                    <div className="aspect-[16/9] bg-zinc-900 rounded-lg overflow-hidden border border-white/10">
                      <iframe src={property.virtualTour360Url} className="w-full h-full" allowFullScreen></iframe>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LOCATION & NEARBY */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm rounded-xl">
              <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6 flex items-center gap-3"><MapPin className="w-5 h-5 text-[#C89B3C]" /> Location & Proximity</h3>
              
              {property.googleMapUrl && (
                <div className="aspect-[21/9] w-full border border-zinc-200 rounded-lg overflow-hidden mb-8">
                  <iframe src={property.googleMapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer"></iframe>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-3 border-b border-zinc-100 pb-2">Education</span>
                  <ul className="space-y-2">
                    {property.nearby.schools.map((school, sIdx) => <li key={sIdx} className="text-xs text-zinc-700 font-medium flex items-start gap-2"><span className="text-[#C89B3C]">•</span> {school}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-3 border-b border-zinc-100 pb-2">Healthcare</span>
                  <ul className="space-y-2">
                    {property.nearby.hospitals.map((hosp, hIdx) => <li key={hIdx} className="text-xs text-zinc-700 font-medium flex items-start gap-2"><span className="text-[#C89B3C]">•</span> {hosp}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-3 border-b border-zinc-100 pb-2">Transit & Leisure</span>
                  <ul className="space-y-2">
                    {property.nearby.transport.map((trans, tIdx) => <li key={tIdx} className="text-xs text-zinc-700 font-medium flex items-start gap-2"><span className="text-[#C89B3C]">•</span> {trans}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* FLOOR PLANS */}
            {(property.floorPlanImage || property.masterPlanImage) && (
              <div className="bg-white border border-zinc-100 p-8 shadow-sm rounded-xl">
                <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6 flex items-center gap-3"><Layers className="w-5 h-5 text-[#C89B3C]" /> Floor & Master Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.floorPlanImage && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider font-bold text-zinc-700">Unit Layout</span>
                        <a href={property.floorPlanImage} download className="text-[9px] uppercase tracking-widest font-bold text-[#C89B3C] hover:text-zinc-900 flex items-center gap-1"><Download className="w-3 h-3"/> PDF</a>
                      </div>
                      <div className="aspect-[4/3] bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden relative group">
                        <img loading="lazy" src={property.floorPlanImage} alt="Floor Plan" className="object-contain w-full h-full p-4" />
                      </div>
                    </div>
                  )}
                  {property.masterPlanImage && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider font-bold text-zinc-700">Master Plan</span>
                        <a href={property.masterPlanImage} download className="text-[9px] uppercase tracking-widest font-bold text-[#C89B3C] hover:text-zinc-900 flex items-center gap-1"><Download className="w-3 h-3"/> PDF</a>
                      </div>
                      <div className="aspect-[4/3] bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden relative group">
                        <img loading="lazy" src={property.masterPlanImage} alt="Master Plan" className="object-cover w-full h-full" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SIMILAR PROPERTIES */}
            {similarProperties.length > 0 && (
              <div className="pt-8 border-t border-zinc-200">
                <h3 className="font-display text-2xl text-zinc-900 font-semibold mb-6">Similar Properties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {similarProperties.map(p => (
                    <div key={p.id} onClick={() => { window.scrollTo(0,0); navigate(`/property/${p.slug}`); }} className="bg-white border border-zinc-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-2 left-2 bg-zinc-900/90 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded">{p.type}</div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-semibold text-sm text-zinc-900 group-hover:text-[#C89B3C] transition-colors line-clamp-1">{p.title}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 mb-3">{p.community}</p>
                        <div className="mt-auto pt-3 border-t border-zinc-100 font-mono font-bold text-xs">
                          {p.price > 0 ? convertPrice(p.price).formatted : 'POA'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* STICKY SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* PRICING & ENQUIRY CARD */}
            <div className="bg-white border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden">
              <div className="bg-zinc-950 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B3C]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C89B3C] block mb-2">Starting Price</span>
                <div className="font-mono text-3xl font-bold mb-4">
                  {property.price > 0 ? convertPrice(property.price).formatted : 'Price on Request'}
                </div>
                <div className="flex justify-between items-center text-xs font-medium border-t border-zinc-800 pt-4 mt-2">
                  <span className="text-zinc-400">Projected Yield</span>
                  <span className="text-emerald-400">{property.roi}% Net ROI</span>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-display text-lg text-zinc-900 font-semibold mb-4">Register Interest</h4>
                
                {success && (
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 mb-4 text-[11px] leading-relaxed font-semibold rounded">
                    {success}
                  </div>
                )}

                <form onSubmit={(e) => handleLeadSubmit(e, 'Enquiry')} className="space-y-4 text-xs font-sans">
                  <div>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full bg-[#FAF8F4] border border-zinc-200 rounded-md px-4 py-3 focus:border-[#C89B3C] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-[#FAF8F4] border border-zinc-200 rounded-md px-4 py-3 focus:border-[#C89B3C] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full bg-[#FAF8F4] border border-zinc-200 rounded-md px-4 py-3 focus:border-[#C89B3C] focus:outline-none transition-colors" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full bg-[#FAF8F4] border border-zinc-200 rounded-md px-3 py-3 focus:border-[#C89B3C] focus:outline-none transition-colors text-zinc-500" />
                    <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className="w-full bg-[#FAF8F4] border border-zinc-200 rounded-md px-3 py-3 focus:border-[#C89B3C] focus:outline-none transition-colors text-zinc-500">
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full bg-zinc-950 hover:bg-[#C89B3C] text-white py-3.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md">
                      Enquire Now
                    </button>
                  </div>
                </form>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <a href={`https://wa.me/971500000000?text=I'm interested in ${property.title}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1EBE5A] text-white py-3 rounded-md text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5"/> WhatsApp
                  </a>
                  <button onClick={(e) => handleLeadSubmit(e, 'Brochure')} className="bg-[#FAF8F4] hover:bg-zinc-100 text-zinc-900 border border-zinc-200 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors">
                    <Download className="w-3.5 h-3.5"/> Brochure
                  </button>
                </div>
              </div>
            </div>

            {/* AGENT CARD */}
            {agent && (
              <div className="bg-white border border-zinc-100 shadow-sm rounded-xl p-6 flex flex-col items-center text-center">
                <img src={agent.image} alt={agent.name} className="w-24 h-24 rounded-full object-cover border-4 border-[#FAF8F4] shadow-sm mb-4" />
                <h4 className="font-display text-lg font-semibold text-zinc-900">{agent.name}</h4>
                <span className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-bold mb-3 block">{agent.role}</span>
                <p className="text-xs text-zinc-500 mb-4 px-4">Speaks: {agent.languages.join(', ')}</p>
                <div className="w-full flex gap-2">
                  <a href={`tel:${agent.phone}`} className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 rounded text-[10px] uppercase tracking-widest font-bold transition-colors">Call</a>
                  <a href={`mailto:${agent.email}`} className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 py-2.5 rounded text-[10px] uppercase tracking-widest font-bold transition-colors">Email</a>
                </div>
              </div>
            )}
            
            {/* AMORTIZATION CALCULATOR WIDGET */}
            <div className="bg-[#FAF8F4] border border-zinc-200/60 p-6 rounded-xl">
              <h4 className="font-display text-lg text-zinc-900 font-semibold mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C89B3C]" /> Mortgage Estimate
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex justify-between"><span>Down Payment</span> <span>{convertPrice(downPayment).formatted}</span></label>
                  <input type="range" min={property.price * 0.1} max={property.price * 0.8} step={50000} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-[#C89B3C] h-1 bg-zinc-200 mt-2" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Term (Yrs)</label>
                    <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full bg-white border border-zinc-200 py-1.5 px-2 text-xs mt-1">
                      <option value={10}>10</option><option value={15}>15</option><option value={20}>20</option><option value={25}>25</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Rate (%)</label>
                    <input type="number" step="0.1" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="w-full bg-white border border-zinc-200 py-1.5 px-2 text-xs mt-1" />
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-200">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Monthly Payment</span>
                  <span className="font-mono text-xl font-bold text-[#C89B3C]">{convertPrice(Math.round(monthlyPayment)).formatted}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
