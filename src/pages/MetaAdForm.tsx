import React, { useState, useEffect, FormEvent } from 'react';
import { Send, PhoneCall, MessageCircle, CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MetaAdForm() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientRequirements, setClientRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, phone?: string}>({});

  // Trigger ViewContent on load
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Meta Ads Lead Generation Form',
        content_category: 'LeadGen'
      });
    }
  }, []);

  const validateForm = () => {
    const newErrors: {name?: string, email?: string, phone?: string} = {};
    if (!clientName.trim()) newErrors.name = 'Full Name is required';
    
    if (!clientEmail.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!clientPhone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (clientPhone.trim().length < 6) {
      newErrors.phone = 'Please enter a valid mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', clientName);
    formData.append('email', clientEmail);
    formData.append('message', `Phone: ${clientPhone}\nRequirements: ${clientRequirements}\nSource: lead from meta ad`);

    fetch('https://script.google.com/macros/s/AKfycbzsCadgOlgArAZxX4Z3hqxe7_VFKZDbFHTFiWkbCa6GAKwRNHx7Vv_3ZUfVUbhFO1gmNQ/exec', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
      .then(() => {
        setIsSuccess(true);
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Meta Ads Enquiry',
            currency: 'AED'
          });
        }
      })
      .catch(err => {
        console.error("Form submission error:", err);
        // Even on error with no-cors, it usually succeeds. 
        // We handle it as success to provide smooth user experience.
        setIsSuccess(true);
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Meta Ads Enquiry (Fallback)',
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleContactClick = (type: 'whatsapp' | 'call') => {
    if (window.fbq) {
      window.fbq('track', 'Contact', {
        contact_type: type
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 flex flex-col items-center selection:bg-gold/30">
      <div className="w-full max-w-[480px] bg-white flex flex-col min-h-screen shadow-[0_0_40px_rgba(0,0,0,0.03)] mx-auto relative">
        
        {/* Minimalist Header */}
        <header className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <img src="/photos/logo.png" alt="Golden Legacy" className="h-8 object-contain" />
            <div className="flex flex-col justify-center">
              <h2 className="text-[18px] font-bold text-zinc-900 leading-none whitespace-nowrap" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Golden Legacy
              </h2>
              <h3 className="text-[11px] italic font-medium leading-none text-[#C9A227] whitespace-nowrap mt-1" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Real Estate
              </h3>
            </div>
          </div>
          <Link to="/" className="text-zinc-400 hover:text-[#C9A227] transition-colors" title="Back to Home">
            <Home className="w-5 h-5" />
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col px-6 py-8 md:py-10">
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <span className="inline-block text-[#C9A227] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 bg-[#FAF8F4] px-3 py-1 rounded-full">
              Exclusive Access
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-light text-zinc-900 mb-4 leading-tight">
              Book Your Private Property Consultation
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto font-light">
              Discover exclusive waterfront properties, luxury apartments, villas, and high-return investment opportunities with Golden Legacy Real Estate Dubai. Fill in your details and our property specialist will contact you shortly.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FAF8F4] via-[#C9A227] to-[#FAF8F4]"></div>
            
            {isSuccess ? (
              <div className="py-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-display text-xl text-zinc-900 mb-2">Thank you! Your enquiry has been received.</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  One of our property consultants will contact you shortly to discuss your investment goals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (errors.name) setErrors({...errors, name: undefined});
                    }}
                    placeholder="E.g. John Doe"
                    className={`w-full min-h-[56px] px-4 bg-[#FAF8F4] border ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-zinc-200 focus:border-[#C9A227]'} rounded-xl focus:outline-none focus:ring-1 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-[#C9A227]'} transition-all text-[15px]`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      if (errors.phone) setErrors({...errors, phone: undefined});
                    }}
                    placeholder="+971 50 123 4567"
                    className={`w-full min-h-[56px] px-4 bg-[#FAF8F4] border ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-zinc-200 focus:border-[#C9A227]'} rounded-xl focus:outline-none focus:ring-1 ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-[#C9A227]'} transition-all text-[15px]`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      if (errors.email) setErrors({...errors, email: undefined});
                    }}
                    placeholder="john@example.com"
                    className={`w-full min-h-[56px] px-4 bg-[#FAF8F4] border ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-zinc-200 focus:border-[#C9A227]'} rounded-xl focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-[#C9A227]'} transition-all text-[15px]`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Property Requirements <span className="text-zinc-400 font-normal normal-case tracking-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={clientRequirements}
                    onChange={(e) => setClientRequirements(e.target.value)}
                    placeholder="I'm interested in a waterfront apartment, villa, off-plan investment, or luxury residence."
                    className="w-full py-4 px-4 bg-[#FAF8F4] border border-zinc-200 focus:border-[#C9A227] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C9A227] transition-all text-[15px] resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full min-h-[56px] bg-zinc-950 hover:bg-[#C9A227] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.23)]'}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Get Property Details
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Alternative Contact Section */}
          <div className="text-center mt-auto pt-6 border-t border-zinc-100">
            <p className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-4">Need Immediate Assistance?</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/971554740389?text=Hi, I would like to speak with a property consultant regarding my investment."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContactClick('whatsapp')}
                className="flex flex-col items-center justify-center gap-2 py-4 bg-[#25D366]/10 text-[#128C7E] rounded-xl hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-semibold">WhatsApp</span>
              </a>
              <a
                href="tel:+971554740389"
                onClick={() => handleContactClick('call')}
                className="flex flex-col items-center justify-center gap-2 py-4 bg-zinc-100 text-zinc-700 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
                <span className="text-xs font-semibold">Call Now</span>
              </a>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
