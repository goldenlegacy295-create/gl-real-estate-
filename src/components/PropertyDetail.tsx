import { useState, useEffect, FormEvent } from 'react';
import { ArrowLeft, Phone, Calendar, Share2, Compass, MapPin, Award, CheckCircle, FileText, Send, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}

export default function PropertyDetail({ property, onBack, onToggleWishlist, wishlist }: PropertyDetailProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Form lead captures
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Requesting priority dossier for the ${property.title}.`);
  const [success, setSuccess] = useState('');

  // Local mortgage calculator
  const [term, setTerm] = useState(20);
  const [interest, setInterest] = useState(4.5);
  const [downPayment, setDownPayment] = useState(property.price * 0.25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    setIsWishlisted(wishlist.includes(property.id));
  }, [wishlist, property.id]);

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Dossier Link successfully copied to clipboard. Securely share with your advisors.");
  };

  const handleLeadSubmit = async (e: FormEvent, leadType: string) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `${message} (Inquiry Type: ${leadType})`,
          propertyId: property.id,
          type: leadType
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`Success! Your priority ${leadType} reservation is catalogued. Our Senior Advisor Elena Rostova will call you within 15 minutes.`);
        setName('');
        setEmail('');
        setPhone('');
        setTimeout(() => setSuccess(''), 6000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Safe image array fallback
  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  return (
    <div className="bg-[#FAF8F4] min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* BACK BUTTON ROW */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-zinc-700 hover:text-gold transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="w-10 h-10 border border-zinc-200 rounded-full bg-white flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
              title="Share secure dossier link"
            >
              <Share2 className="w-4 h-4 text-zinc-700" />
            </button>
          </div>
        </div>

        {/* PROPERTY HEADER */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">
            {property.developer} Portfolio • {property.community}
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight mb-4">
            {property.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 text-xs text-zinc-500 font-semibold font-sans">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold" /> {property.location}</span>
            <span>{property.beds} Bedrooms</span>
            <span>{property.baths} Bathrooms</span>
            <span>{property.sqft.toLocaleString()} Sq. Ft.</span>
            <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5">{property.roi}% Net ROI</span>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* GALERY AND DETAIL TEXTS (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* LARGE IMAGE AND PREVIEW THUMBS */}
            <div className="space-y-4">
              <div className="aspect-[16/10] bg-zinc-100 overflow-hidden relative">
                <img
                  src={images[activeImageIdx]}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full transition-all duration-500"
                />
              </div>

              {/* THUMBS */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((imgUrl, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => setActiveImageIdx(tIdx)}
                      className={`aspect-[4/3] relative overflow-hidden focus:outline-none border-2 transition-all ${
                        activeImageIdx === tIdx ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm">
              <h3 className="font-display text-xl text-zinc-900 font-semibold mb-4">The Narrative</h3>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* SPEC HIGHLIGHTS */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm">
              <h3 className="font-display text-xl text-zinc-900 font-semibold mb-6">Amenity Register</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amen, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans font-medium text-zinc-700">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    <span>{amen}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NEIGHBORHOOD CONNECTIONS */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm">
              <h3 className="font-display text-xl text-zinc-900 font-semibold mb-6">Proximity Dossier</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-2">Elite School Access</span>
                  <ul className="space-y-2">
                    {property.nearby.schools.map((school, sIdx) => (
                      <li key={sIdx} className="text-xs text-zinc-600 font-sans">• {school}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-2">Medical Facilities</span>
                  <ul className="space-y-2">
                    {property.nearby.hospitals.map((hosp, hIdx) => (
                      <li key={hIdx} className="text-xs text-zinc-600 font-sans">• {hosp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block mb-2">Highways & Monorail</span>
                  <ul className="space-y-2">
                    {property.nearby.transport.map((trans, tIdx) => (
                      <li key={tIdx} className="text-xs text-zinc-600 font-sans">• {trans}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* INVESTMENT HIGHLIGHTS */}
            {property.investmentHighlights && property.investmentHighlights.length > 0 && (
              <div className="bg-[#FAF8F4] border border-[#C89B3C]/10 p-8 shadow-sm space-y-4">
                <h3 className="font-display text-xl text-zinc-900 font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C89B3C]" /> Sovereign Investment Merits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.investmentHighlights.map((hl, hlIdx) => (
                    <div key={hlIdx} className="bg-white p-4 border border-zinc-100 shadow-xs flex flex-col justify-between">
                      <p className="text-xs text-zinc-700 leading-relaxed font-sans">{hl}</p>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#C89B3C] mt-2">Institutional Grade</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FLOOR PLANS & MASTER PLAN */}
            {(property.floorPlanImage || property.masterPlanImage) && (
              <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-6">
                <h3 className="font-display text-xl text-zinc-900 font-semibold">Architectural Layouts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.floorPlanImage && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block">Unit Floor Plan</span>
                      <div className="aspect-[4/3] bg-zinc-50 border border-zinc-150 relative overflow-hidden group">
                        <img src={property.floorPlanImage} alt="Floor Plan" referrerPolicy="no-referrer" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-[10px] uppercase tracking-widest font-bold">Request Full CAD</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {property.masterPlanImage && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block">Master Community Plan</span>
                      <div className="aspect-[4/3] bg-zinc-50 border border-zinc-150 relative overflow-hidden group">
                        <img src={property.masterPlanImage} alt="Master Plan" referrerPolicy="no-referrer" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-[10px] uppercase tracking-widest font-bold">Request Master Dossier</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMMUNITY MAP LOCATION */}
            {property.googleMapUrl && (
              <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-4">
                <h3 className="font-display text-xl text-zinc-900 font-semibold">Asset Geo-Position</h3>
                <div className="aspect-[16/9] w-full border border-zinc-200">
                  <iframe
                    src={property.googleMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    title="Asset Map"
                  ></iframe>
                </div>
              </div>
            )}

            {/* PROPERTY FAQS */}
            {property.faqs && property.faqs.length > 0 && (
              <div className="bg-white border border-zinc-100 p-8 shadow-sm space-y-6">
                <h3 className="font-display text-xl text-zinc-900 font-semibold">Property Intelligence FAQ</h3>
                <div className="space-y-4">
                  {property.faqs.map((faq, faqIdx) => (
                    <div key={faqIdx} className="border-b border-zinc-100 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="text-sm font-sans font-semibold text-zinc-900 mb-1.5">{faq.question}</h4>
                      <p className="text-xs text-zinc-600 font-sans leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NESTED MORTGAGE CALCULATOR */}
            <div className="bg-zinc-900 text-white p-8">
              <h3 className="font-display text-lg font-light mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-gold" /> Asset Amortization Planner
              </h3>

              {property.price > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">Down Payment</label>
                      <input
                        type="range"
                        min={property.price * 0.1}
                        max={property.price * 0.8}
                        step={250000}
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full accent-gold h-1 cursor-pointer bg-zinc-800 mb-1"
                      />
                      <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                        <span>10% DLD Base</span>
                        <span>AED {downPayment.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">Mortgage Term</label>
                        <select
                          value={term}
                          onChange={(e) => setTerm(Number(e.target.value))}
                          className="w-full bg-zinc-950 border border-zinc-800 py-1.5 px-2 text-xs focus:outline-none"
                        >
                          <option value={10}>10 Years</option>
                          <option value={15}>15 Years</option>
                          <option value={20}>20 Years</option>
                          <option value={25}>25 Years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={interest}
                          onChange={(e) => setInterest(Number(e.target.value))}
                          className="w-full bg-zinc-950 border border-zinc-800 py-1.5 px-2 text-xs focus:outline-none text-zinc-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">Estimated Payment</span>
                      <span className="font-mono text-lg font-bold text-emerald-400">AED {Math.round(monthlyPayment).toLocaleString()} / month</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 max-w-[200px] text-right">Includes amortization principal and interest fees.</span>
                  </div>
                </>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Amortization planner is available upon official pricing launch. Contact your private advisor to schedule priority ledger access.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* ASSET METRICS & LEAD INTAKE SIDEBAR (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* INVESTMENT APPRAISAL */}
            <div className="bg-zinc-950 text-white p-8 border border-zinc-800 shadow-xl relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold block mb-2">Investment Appraisal</span>
              <h3 className="font-display text-xl font-light mb-6">Valuation Ledger</h3>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Total Purchase Price</span>
                  <span className="font-mono text-sm font-bold text-gold">
                    {property.price > 0 ? `AED ${property.price.toLocaleString()}` : 'Contact for Latest Price'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Projected Net Yield</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">{property.roi}% Net ROI</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Lighthouse Appraisal Score</span>
                  <span className="font-mono text-sm font-bold text-white">{property.investmentScore} / 100</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Golden Visa pre-qualified</span>
                  <span className="font-sans text-xs font-bold text-emerald-400">Verified Eligible</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/971500000000?text=I am interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 uppercase text-xs tracking-widest font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp Broker</span>
                </a>
                <a
                  href="tel:+971501112233"
                  className="bg-zinc-900 border border-zinc-800 hover:border-gold text-white text-center py-3 text-xs uppercase tracking-widest font-bold font-sans transition-all block"
                >
                  Priority Call
                </a>
              </div>
            </div>

            {/* PRIORITY VIEWING RESERVATION FORM */}
            <div className="bg-white border border-zinc-100 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-zinc-100">
                <Calendar className="w-5 h-5 text-gold shrink-0" />
                <h4 className="font-display text-lg text-zinc-900 font-semibold">Priority Booking</h4>
              </div>

              {success && (
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-4 mb-6 text-xs leading-relaxed font-semibold">
                  {success}
                </div>
              )}

              <form onSubmit={(e) => handleLeadSubmit(e, 'Viewing')} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alastair Sterling"
                    className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@privateoffice.com"
                    className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Phone (Mobile/WhatsApp)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-bold text-zinc-400 mb-2">Investment Narrative</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF8F4] border border-zinc-200 focus:border-gold px-4 py-3 focus:outline-none text-zinc-600"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="bg-zinc-950 hover:bg-gold text-white hover:text-zinc-950 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Book Private Viewing
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleLeadSubmit(e, 'Brochure')}
                    className="bg-transparent hover:bg-zinc-50 border border-zinc-200 text-zinc-800 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-gold" /> Download Private Brochure
                  </button>
                </div>
              </form>
            </div>

            {/* DLD Milestones Disclaimer */}
            <div className="bg-[#FAF8F4] border border-zinc-200/60 p-6 space-y-2">
              <span className="block text-xs uppercase tracking-wider font-bold text-zinc-700 flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" /> DLD Regulatory Clearance
              </span>
              <p className="text-[10px] text-zinc-500 leading-normal">
                This asset is cleared by the Dubai Land Department. For off-plan allocations, construction funds are protected within audited project escrow structures under Dubai Law No. 8 of 2007.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
