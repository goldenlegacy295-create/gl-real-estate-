import { useState, FormEvent } from 'react';
import { Award, ShieldCheck, CheckCircle, Clock, BookOpen, UserPlus, Phone, CreditCard, HelpCircle } from 'lucide-react';

export default function GoldenVisaPortal() {
  const [proposedInvestment, setProposedInvestment] = useState<number>(2500000);
  const [successMsg, setSuccessMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Eligibility evaluation
  const threshold = 2000000; // AED 2,000,000
  const isEligible = proposedInvestment >= threshold;
  const missingAmount = threshold - proposedInvestment;

  const timelineSteps = [
    {
      title: 'Step 1: Property Acquisition',
      desc: 'Invest a total minimum value of AED 2 Million in completed or off-plan freehold real estate registered with the DLD.',
      icon: CreditCard,
      duration: 'Day 1-5'
    },
    {
      title: 'Step 2: DLD & NOC Clearance',
      desc: 'Obtain the official Title Deed and request a No Objection Certificate (NOC) from the Dubai Land Department visa wing.',
      icon: ShieldCheck,
      duration: 'Day 6-8'
    },
    {
      title: 'Step 3: Biometrics & Medical',
      desc: 'Complete medical fitness screening (blood test & chest X-ray) and submit biometric registration at a federal authority center.',
      icon: Clock,
      duration: 'Day 9-11'
    },
    {
      title: 'Step 4: Visa Issuance & Esaad',
      desc: 'The Golden Visa is stamped on your passport. Collect your 10-year residency Emirates ID and apply for the luxury Esaad Privilege Card.',
      icon: Award,
      duration: 'Day 12-14'
    }
  ];

  const benefitsList = [
    { title: '100% Tax-Free Residency', desc: 'Enjoy 0% personal income, capital gains, or corporate tax on rental returns.' },
    { title: 'Esaad Premium Card', desc: 'Grants exclusive luxury retail, luxury car, and medical discounts across 10,000 global establishments.' },
    { title: 'Family Sponsorship', desc: 'Sponsor your spouse, children of any age, and senior domestic staff for full 10-year stays.' },
    { title: 'No Minimum Stay Requirement', desc: 'Travel globally without restriction. No obligation to return every 6 months to keep residency active.' }
  ];

  const handleVisaForm = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message: `Golden Visa Consultation Request. Proposed Investment capital: AED ${proposedInvestment.toLocaleString()}`,
        type: 'Consultation'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg("Consultation Scheduled. Our Golden Visa legal desk will reach out within 1 hour.");
          setName('');
          setEmail('');
          setTimeout(() => setSuccessMsg(''), 6000);
        }
      });
  };

  return (
    <div className="bg-[#FAF8F4] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-3">10-Year Residency Blueprint</span>
          <h1 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight leading-tight">
            Dubai Golden Visa <br />
            <span className="italic font-light">Investor Portal</span>
          </h1>
          <p className="mt-4 font-sans text-sm text-zinc-500 leading-relaxed">
            Acquiring real estate valued at AED 2 Million or above pre-qualifies foreign investors for self-sponsored 10-year residency. Fulfill your application within 14 working days.
          </p>
        </div>

        {/* METRICS & ELIGIBILITY PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          
          {/* ELIGIBILITY SLIDER BOX (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-zinc-100 p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-zinc-950 font-semibold mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gold" /> Check Your Residency Eligibility
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Proposed Property Value</span>
                    <span className="font-mono text-sm font-bold text-gold">AED {proposedInvestment.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="10000000"
                    step="250000"
                    value={proposedInvestment}
                    onChange={(e) => setProposedInvestment(Number(e.target.value))}
                    className="w-full accent-gold h-1 cursor-pointer bg-zinc-200"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                    <span>AED 1.0 Million</span>
                    <span>AED 10.0 Million</span>
                  </div>
                </div>

                {/* DYNAMIC METRIC STATUS BOX */}
                <div className={`p-6 border ${isEligible ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/50 border-amber-200'} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-bold text-zinc-700">Residency Status</span>
                    <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest ${isEligible ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {isEligible ? 'Eligible' : 'Threshold Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {isEligible
                      ? "Congratulations. Your proposed investment amount meets or exceeds the AED 2,000,000 threshold. You are pre-qualified for Dubai's 10-Year Golden Visa."
                      : `You are AED ${missingAmount.toLocaleString()} below the required threshold. Acquire an asset above AED 2 Million to pre-qualify.`
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-6 mt-6">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">DLD Escrow Security Guarantee</span>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Approved property assets must be freehold. Joint spouse ownership allows shared eligibility criteria. Both under construction (off-plan) and ready properties are eligible.
              </p>
            </div>
          </div>

          {/* ADVOCACY LEAD ENTRANCE (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-950 text-white p-8 md:p-10 shadow-lg relative flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-2">Private Advisory Desk</span>
              <h3 className="font-display text-2xl font-light mb-6">Schedule Visa Consultation</h3>

              {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 mb-6 text-xs leading-relaxed font-semibold">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleVisaForm} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-zinc-400 font-bold mb-2 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sir Arthur Pendelton"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-bold mb-2 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="advisor@arthurwealth.co.uk"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-bold mb-2 uppercase">Filing Method</label>
                  <select
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none cursor-pointer"
                  >
                    <option>Individual Purchase Portfolio</option>
                    <option>Joint Spousal Filing</option>
                    <option>Corporate Entity Filing</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#C89B3C] hover:bg-[#9F7725] text-white py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    Request Visa Call
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* GOLDEN VISA PROCESS TIMELINE */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold block mb-2">Dossier Clearance Flow</span>
            <h3 className="font-display text-2xl text-zinc-900 font-normal">Filing Timeline & Procedures</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className="bg-white border border-zinc-100 p-6 flex flex-col justify-between shadow-sm hover:border-gold/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center bg-gold/5">
                        <IconComp className="w-5 h-5 text-gold" />
                      </div>
                      <span className="font-mono text-xs font-bold text-gold">{step.duration}</span>
                    </div>
                    <h4 className="font-display text-sm font-semibold text-zinc-900">{step.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GOLDEN VISA BENEFITS BOXES */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold block mb-2">Privilege Dossier</span>
            <h3 className="font-display text-2xl text-zinc-900 font-normal">Exclusive Benefits Summary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitsList.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-zinc-100 p-8 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-sm font-semibold text-zinc-900">{benefit.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
