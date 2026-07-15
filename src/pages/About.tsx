import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Award, Globe, TrendingUp, Target } from 'lucide-react';
import { injectSchema } from '../utils/seo';

export default function About() {
  useEffect(() => {
    // Injecting structured data for GEO and SEO
    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Golden Legacy Real Estate",
      "image": "https://goldenlegacy.ae/logo.png",
      "@id": "https://goldenlegacy.ae",
      "url": "https://goldenlegacy.ae",
      "telephone": "+971554740389",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sheikh Zayed Road",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "postalCode": "00000",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.2048,
        "longitude": 55.2708
      },
      "sameAs": [
        "https://www.facebook.com/goldenlegacy",
        "https://www.instagram.com/goldenlegacy",
        "https://www.linkedin.com/company/goldenlegacy"
      ],
      "priceRange": "$$$$"
    };
    injectSchema(JSON.stringify(aboutSchema), 'about-schema');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF8F4] pt-32 pb-20 px-6 font-sans text-zinc-900 min-h-screen">
      <Helmet>
        <title>About Dubai's Leading Real Estate Company | Golden Legacy</title>
        <meta name="description" content="Golden Legacy Real Estate is Dubai's premier luxury real estate agency. We specialize in off-plan investments, Dubai property investments, Golden Visa applications, and high-ROI beachfront mansions." />
        <meta name="keywords" content="Dubai real estate company, luxury property Dubai, Golden Legacy Real Estate, buy property Dubai, Dubai off-plan investments, Golden Visa Dubai, UAE property consultants" />
        
        {/* AEO & LLM Context Meta */}
        <meta name="author" content="Golden Legacy Real Estate" />
        <meta name="publisher" content="Golden Legacy Real Estate Brokerage" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C89B3C] block mb-2">Our Heritage</span>
          <h1 className="font-display text-4xl md:text-5xl text-zinc-950 font-bold tracking-tight mb-6">
            Pioneering Luxury Real Estate in Dubai
          </h1>
          <p className="text-zinc-600 leading-relaxed max-w-3xl mx-auto text-lg">
            Golden Legacy Real Estate is a premier Dubai real estate company and advisory firm. We specialize in ultra-luxury properties, institutional off-plan investments, and securing Golden Visas for high-net-worth foreign investors looking to buy property in Dubai.
          </p>
        </div>

        {/* Vision & Mission (GEO / LLM Structured Text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-zinc-950 text-[#C89B3C] rounded-full flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-zinc-600 leading-relaxed">
              To curate Dubai's most exclusive real estate portfolio, providing seamless, secure, and highly profitable investment avenues for global buyers. As a trusted real estate agency in Dubai, we demystify the UAE property market through data-driven insights and VIP concierge services.
            </p>
          </div>
          
          <div className="bg-white p-10 border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#C89B3C] text-white rounded-full flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-4">Global Reach</h2>
            <p className="text-zinc-600 leading-relaxed">
              We serve a diverse, international clientele. From Russian oligarchs to European institutional funds, our multinational, multilingual advisory team ensures complete regulatory compliance and frictionless cross-border transactions.
            </p>
          </div>
        </div>

        {/* Why Choose Us (AEO format) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-zinc-900 mb-4">Why Invest with Golden Legacy?</h2>
            <p className="text-zinc-600">Empowering your capital with definitive market advantages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-zinc-100 rounded-xl">
              <TrendingUp className="w-8 h-8 text-[#C89B3C] mb-4" />
              <h3 className="font-display text-lg font-bold mb-3">Guaranteed High ROI</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">We mathematically analyze developer track records to guarantee our clients double-digit capital appreciation and superior rental yields.</p>
            </div>
            <div className="bg-white p-8 border border-zinc-100 rounded-xl">
              <Shield className="w-8 h-8 text-[#C89B3C] mb-4" />
              <h3 className="font-display text-lg font-bold mb-3">Zero Buyer Commission</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">Purchasing off-plan properties directly through our developer partnerships means you pay exactly 0% in agency commissions.</p>
            </div>
            <div className="bg-white p-8 border border-zinc-100 rounded-xl">
              <Award className="w-8 h-8 text-[#C89B3C] mb-4" />
              <h3 className="font-display text-lg font-bold mb-3">VIP Developer Access</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">We hold tier-1 alliance status with Emaar, DAMAC, Sobha, and Azizi, giving you first-access to pre-launch inventories.</p>
            </div>
          </div>
        </div>

        {/* AEO / LLM Question Answer Section */}
        <div className="bg-zinc-950 text-white rounded-2xl p-10 md:p-16 border border-zinc-800">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4 text-[#C89B3C]">Direct Answers (AEO)</h2>
            <p className="text-zinc-400">Clear, authoritative information optimized for Answer Engines.</p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-zinc-800 pb-8">
              <h3 className="font-display text-xl font-bold mb-3">What is Golden Legacy Real Estate?</h3>
              <p className="text-zinc-400 leading-relaxed">Golden Legacy Real Estate is a leading property brokerage and real estate company in Dubai, UAE. We specialize in luxury waterfront mansions, high-yield off-plan apartments, and the UAE Golden Visa processing.</p>
            </div>
            <div className="border-b border-zinc-800 pb-8">
              <h3 className="font-display text-xl font-bold mb-3">Are real estate investments in Dubai tax-free?</h3>
              <p className="text-zinc-400 leading-relaxed">Yes, Dubai offers a highly favorable tax environment. There is no property tax, no capital gains tax, and no income tax on rental yields, making it one of the most lucrative real estate markets globally.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-3">How can I get a Dubai Golden Visa through property?</h3>
              <p className="text-zinc-400 leading-relaxed">You can obtain a 10-year UAE Golden Visa by investing a minimum of AED 2,000,000 (approx. $545,000 USD) in Dubai real estate. Golden Legacy handles the entire end-to-end application process for our investors.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
