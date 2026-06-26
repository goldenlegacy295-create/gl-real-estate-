import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Award, HelpCircle, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InvestmentCalculator() {
  const [price, setPrice] = useState<number>(12500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [monthlyRent, setMonthlyRent] = useState<number>(85000);
  const [serviceFeePercent, setServiceFeePercent] = useState<number>(1.2);

  // Calculated values
  const [downPayment, setDownPayment] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyMortgage, setMonthlyMortgage] = useState<number>(0);
  const [grossYield, setGrossYield] = useState<number>(0);
  const [netYield, setNetYield] = useState<number>(0);
  const [cashOnCash, setCashOnCash] = useState<number>(0);
  const [initialCashNeeded, setInitialCashNeeded] = useState<number>(0);
  const [visaStatus, setVisaStatus] = useState<{ eligible: boolean; reason: string }>({ eligible: false, reason: '' });
  const [appreciationData, setAppreciationData] = useState<any[]>([]);

  // Fees according to Dubai laws:
  // 4% Dubai Land Department (DLD) transfer fee
  // 2% Agency / commission fee
  // Approx AED 15,000 admin/registration fee
  const dldFee = price * 0.04;
  const agencyFee = price * 0.02;
  const adminFee = 15000;

  useEffect(() => {
    const calculatedDownPayment = (price * downPaymentPercent) / 100;
    const calculatedLoan = price - calculatedDownPayment;
    setDownPayment(calculatedDownPayment);
    setLoanAmount(calculatedLoan);

    // Monthly interest calculation
    const r = interestRate / 12 / 100;
    const n = loanTerm * 12;
    let monthlyPmt = 0;

    if (calculatedLoan > 0) {
      if (r > 0) {
        monthlyPmt = calculatedLoan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        monthlyPmt = calculatedLoan / n;
      }
    }
    setMonthlyMortgage(monthlyPmt);

    // Initial cash needed (Down payment + DLD fee + Agency fee + Admin fee)
    const cashRequired = calculatedDownPayment + dldFee + agencyFee + adminFee;
    setInitialCashNeeded(cashRequired);

    // Annual Rent
    const annualRent = monthlyRent * 12;
    const calculatedGrossYield = (annualRent / price) * 100;
    setGrossYield(calculatedGrossYield);

    // Service Fee
    const annualServiceFee = (price * serviceFeePercent) / 100;

    // Net Yield
    const annualNetIncomeWithCash = annualRent - annualServiceFee;
    const calculatedNetYield = (annualNetIncomeWithCash / price) * 100;
    setNetYield(calculatedNetYield);

    // Net cash flow with mortgage
    const annualMortgagePmt = monthlyPmt * 12;
    const annualNetCashFlow = annualRent - annualServiceFee - annualMortgagePmt;
    const calculatedCashOnCash = (annualNetCashFlow / cashRequired) * 100;
    setCashOnCash(calculatedCashOnCash);

    // Golden Visa eligibility (Needs equity of at least AED 2 Million in the property)
    if (calculatedDownPayment >= 2000000) {
      setVisaStatus({
        eligible: true,
        reason: 'Your cash equity down payment exceeds AED 2,000,000. You qualify immediately for the 10-year Golden Visa.'
      });
    } else if (price >= 2000000) {
      const additionalCashNeeded = 2000000 - calculatedDownPayment;
      setVisaStatus({
        eligible: false,
        reason: `Property value qualifies, but your initial cash equity (AED ${calculatedDownPayment.toLocaleString()}) is below AED 2,000,000. Increase your down payment by AED ${additionalCashNeeded.toLocaleString()} to qualify.`
      });
    } else {
      setVisaStatus({
        eligible: false,
        reason: 'To qualify for the Golden Visa, the total property purchase price must be AED 2,000,000 or above.'
      });
    }

    // 10-Year Projection Data (5% conservative capital appreciation)
    const data = [];
    let currentVal = price;
    let balance = calculatedLoan;
    const monthlyRate = r;
    
    for (let year = 0; year <= 10; year++) {
      if (year > 0) {
        currentVal = currentVal * 1.05; // 5% growth
        
        // Calculate remaining loan balance if mortgaged
        for (let m = 0; m < 12; m++) {
          if (balance > 0) {
            const interest = balance * monthlyRate;
            let principal = monthlyPmt - interest;
            if (principal > balance) principal = balance;
            balance -= principal;
          }
        }
      }
      
      const equity = currentVal - balance;
      data.push({
        name: year === 0 ? 'Now' : `Yr ${year}`,
        value: Math.round(currentVal),
        equity: Math.round(equity > 0 ? equity : 0)
      });
    }
    setAppreciationData(data);
  }, [price, downPaymentPercent, interestRate, loanTerm, monthlyRent, serviceFeePercent]);

  // Handle preset selector
  const selectPreset = (propertyValue: number, estimatedRent: number) => {
    setPrice(propertyValue);
    setMonthlyRent(estimatedRent);
    setDownPaymentPercent(25);
  };

  return (
    <div id="calculator-section" className="bg-[#FAF8F4] py-20 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-3">Portfolio Intelligence</span>
          <h2 className="font-display text-3xl md:text-5xl text-zinc-900 font-normal tracking-tight leading-tight">
            Dubai Investment Yield <span className="italic font-light">Calculator</span>
          </h2>
          <p className="mt-4 font-sans text-sm text-zinc-500 leading-relaxed">
            Run institutional-grade projections based on current Dubai Land Department guidelines, service charge averages, and mortgage lending rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* INPUT FORM (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-zinc-100 p-8 md:p-10 shadow-sm rounded-none">
            <h3 className="font-display text-xl text-zinc-900 font-semibold mb-6 flex items-center gap-3">
              <Calculator className="w-5 h-5 text-gold" />
              <span>Investment Parameters</span>
            </h3>

            {/* PRESETS */}
            <div className="mb-8">
              <span className="block text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">Quick Property Presets</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => selectPreset(3450000, 24000)}
                  className={`border p-3 text-left transition-all ${
                    price === 3450000
                      ? 'border-gold bg-gold/5 text-zinc-900'
                      : 'border-zinc-200 bg-white hover:border-gold text-zinc-600'
                  }`}
                >
                  <span className="block text-xs font-bold font-sans tracking-wide">Elite Apartment</span>
                  <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">AED 3.45M • Business Bay</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectPreset(12500000, 85000)}
                  className={`border p-3 text-left transition-all ${
                    price === 12500000
                      ? 'border-gold bg-gold/5 text-zinc-900'
                      : 'border-zinc-200 bg-white hover:border-gold text-zinc-600'
                  }`}
                >
                  <span className="block text-xs font-bold font-sans tracking-wide">Marina Duplex</span>
                  <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">AED 12.5M • Dubai Marina</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectPreset(48500000, 320000)}
                  className={`border p-3 text-left transition-all ${
                    price === 48500000
                      ? 'border-gold bg-gold/5 text-zinc-900'
                      : 'border-zinc-200 bg-white hover:border-gold text-zinc-600'
                  }`}
                >
                  <span className="block text-xs font-bold font-sans tracking-wide">Signature Mansion</span>
                  <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">AED 48.5M • Palm Jumeirah</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* PROPERTY PRICE */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-zinc-700">Property Purchase Price</label>
                  <span className="font-mono text-sm font-bold text-gold">AED {price.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="100000000"
                  step="500000"
                  value={price}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPrice(val);
                    // Dynamically scale estimated rent based on average yield bounds
                    setMonthlyRent(Math.round((val * 0.075) / 12));
                  }}
                  className="w-full accent-gold cursor-pointer bg-zinc-100 h-1.5 rounded-none"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                  <span>AED 1.0M</span>
                  <span>AED 50.0M</span>
                  <span>AED 100.0M</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DOWN PAYMENT */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-widest font-semibold text-zinc-700">Down Payment ({downPaymentPercent}%)</label>
                    <span className="font-mono text-sm font-semibold text-zinc-600">AED {downPayment.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer bg-zinc-100 h-1.5 rounded-none"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                    <span>10% (Investor Base)</span>
                    <span>80% (High Equity)</span>
                  </div>
                </div>

                {/* ESTIMATED MONTHLY RENT */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-widest font-semibold text-zinc-700">Estimated Monthly Rent</label>
                    <span className="font-mono text-sm font-bold text-zinc-950">AED {monthlyRent.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="2500"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer bg-zinc-100 h-1.5 rounded-none"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                    <span>AED 5K / mo</span>
                    <span>AED 500K / mo</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-100 my-4 pt-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* INTEREST RATE */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-700 mb-2">Interest Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="10"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full border border-zinc-200 bg-zinc-50 p-3 text-sm font-semibold focus:border-gold focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 text-xs text-zinc-400 font-semibold">%</span>
                  </div>
                </div>

                {/* MORTGAGE LOAN TERM */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-700 mb-2">Mortgage Term</label>
                  <div className="relative">
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full border border-zinc-200 bg-zinc-50 p-3 text-sm font-semibold focus:border-gold focus:outline-none appearance-none"
                    >
                      <option value={5}>5 Years</option>
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                    </select>
                    <span className="absolute right-3 top-3.5 text-[10px] text-zinc-400">▼</span>
                  </div>
                </div>

                {/* SERVICE CHARGES */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-700 mb-2">Service Charges</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="3.5"
                      value={serviceFeePercent}
                      onChange={(e) => setServiceFeePercent(Number(e.target.value))}
                      className="w-full border border-zinc-200 bg-zinc-50 p-3 text-sm font-semibold focus:border-gold focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 text-xs text-zinc-400 font-semibold">% / yr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEDGER & YIELD ANALYSIS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* LEDGER BOX */}
            <div className="bg-zinc-950 text-white p-8 md:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl"></div>

              <span className="text-[10px] uppercase tracking-widest font-semibold text-gold block mb-2">Projected Annual Ledger</span>
              <h3 className="font-display text-2xl font-light mb-6">Financial Analytics</h3>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Gross Rental Yield</span>
                  <span className="font-mono text-sm font-bold text-gold">{grossYield.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Net Rental Yield <span className="text-[10px] italic text-zinc-500">(After Service Fee)</span></span>
                  <span className="font-mono text-sm font-bold text-emerald-400">{netYield.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Cash-on-Cash ROI <span className="text-[10px] italic text-zinc-500">(Mortgaged)</span></span>
                  <span className={`font-mono text-sm font-bold ${cashOnCash >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {cashOnCash.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Monthly Mortgage Payment</span>
                  <span className="font-mono text-sm text-zinc-200">AED {Math.round(monthlyMortgage).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Total Upfront Cash Required</span>
                  <span className="font-mono text-sm font-semibold text-zinc-100">AED {Math.round(initialCashNeeded).toLocaleString()}</span>
                </div>
              </div>

              {/* METRIC BREAKDOWN BOX */}
              <div className="mt-8 bg-zinc-900 border border-zinc-800 p-4 space-y-2">
                <span className="block text-[10px] uppercase tracking-wider text-zinc-400 font-bold">One-Off Upfront Government & Advisory Fees</span>
                <div className="grid grid-cols-2 gap-4 text-[10px] text-zinc-400">
                  <div>DLD Transfer Fee (4%): <span className="text-white block font-mono">AED {dldFee.toLocaleString()}</span></div>
                  <div>Agency Brokerage (2%): <span className="text-white block font-mono">AED {agencyFee.toLocaleString()}</span></div>
                </div>
              </div>
            </div>

            {/* GOLDEN VISA ELIGIBILITY BOX */}
            <div className={`p-6 border ${visaStatus.eligible ? 'border-emerald-200 bg-emerald-50/50' : 'border-zinc-200 bg-white'} space-y-3`}>
              <div className="flex items-center gap-3">
                <Award className={`w-5 h-5 ${visaStatus.eligible ? 'text-emerald-600' : 'text-zinc-400'}`} />
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-800">10-Year Dubai Golden Visa Eligibility</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {visaStatus.reason}
              </p>
              {visaStatus.eligible && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mt-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Golden Visa Pre-Qualified</span>
                </div>
              )}
            </div>

            {/* TRUST DISCLOSURE */}
            <div className="bg-zinc-100 p-6 space-y-2 rounded-none">
              <span className="block text-xs uppercase tracking-wider font-bold text-zinc-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                DLD Financial Security
              </span>
              <p className="text-[10px] text-zinc-500 leading-normal">
                These calculations are for informational purposes. Annual yields in Dubai are optimized by high tenancy occupancy rates (~85%+ in core luxury sectors) and zero corporate, income, or capital gains taxation.
              </p>
            </div>
          </div>

          {/* 10-YEAR PROJECTION CHART (Full Width) */}
          <div className="lg:col-span-12 mt-4 bg-white border border-zinc-100 p-8 md:p-10 shadow-sm rounded-none">
            <h3 className="font-display text-xl text-zinc-900 font-semibold mb-2 flex items-center gap-3">
              <span className="w-2 h-2 bg-gold rounded-full"></span>
              10-Year Capital Appreciation & Equity Forecast
            </h3>
            <p className="text-xs text-zinc-500 mb-8 font-sans max-w-3xl">
              Projected at a conservative 5% annual market appreciation. Visualizes total property value vs. your growing equity (including initial down payment and principal paydown).
            </p>
            
            <div className="h-80 w-full font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={appreciationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C89B3C" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#C89B3C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa' }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '0', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#a1a1aa', marginBottom: '8px' }}
                    formatter={(value: number, name: string) => [`AED ${value.toLocaleString()}`, name]}
                  />
                  <Area type="monotone" dataKey="value" name="Property Value" stroke="#C89B3C" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  <Area type="monotone" dataKey="equity" name="Your Equity" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorEquity)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
