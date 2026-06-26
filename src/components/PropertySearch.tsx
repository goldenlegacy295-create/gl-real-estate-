import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Shuffle, Trash, Check, Info } from 'lucide-react';
import { Property } from '../types';

interface PropertySearchProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  preset?: 'all' | 'ready' | 'off-plan' | 'commercial';
  initialSearchTerm?: string;
}

export default function PropertySearch({ properties, onSelectProperty, wishlist, onToggleWishlist, preset = 'all', initialSearchTerm = '' }: PropertySearchProps) {
  // Filters state
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCompletion, setSelectedCompletion] = useState<'All' | 'Ready' | 'Off-Plan'>('All');
  const [selectedBeds, setSelectedBeds] = useState('All');
  const [priceRange, setPriceRange] = useState<number>(60000000); // Max range AED 60M
  const [minRoi, setMinRoi] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'roi-desc' | 'sqft-desc'>('price-desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Synchronize initial search term if it changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Synchronize filter selection with incoming preset from navigation
  useEffect(() => {
    if (preset === 'ready') {
      setSelectedCompletion('Ready');
      setSelectedType('All');
    } else if (preset === 'off-plan') {
      setSelectedCompletion('Off-Plan');
      setSelectedType('All');
    } else if (preset === 'commercial') {
      setSelectedType('Commercial');
      setSelectedCompletion('All');
    } else {
      setSelectedCompletion('All');
      setSelectedType('All');
    }
  }, [preset]);

  // Compare properties state
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Unique lists for dropdowns
  const communities = useMemo(() => {
    return ['All', ...Array.from(new Set(properties.map(p => p.community)))];
  }, [properties]);

  const propertyTypes = ['All', 'Villa', 'Apartment', 'Penthouse', 'Commercial'];

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              p.developer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCommunity = selectedCommunity === 'All' || p.community === selectedCommunity;
        const matchesType = selectedType === 'All' || p.type === selectedType;
        const matchesBeds = selectedBeds === 'All' || 
                            (selectedBeds === '5+' ? p.beds >= 5 : p.beds === Number(selectedBeds));
        const matchesPrice = p.price <= priceRange;
        const matchesRoi = p.roi >= minRoi;
        const matchesCompletion = selectedCompletion === 'All' ||
                                  (selectedCompletion === 'Ready' && p.completionYear === 'Ready') ||
                                  (selectedCompletion === 'Off-Plan' && p.completionYear !== 'Ready');

        return matchesSearch && matchesCommunity && matchesType && matchesBeds && matchesPrice && matchesRoi && matchesCompletion;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'roi-desc') return b.roi - a.roi;
        if (sortBy === 'sqft-desc') return b.sqft - a.sqft;
        return 0;
      });
  }, [properties, searchTerm, selectedCommunity, selectedType, selectedCompletion, selectedBeds, priceRange, minRoi, sortBy]);

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(prev => prev.filter(item => item !== id));
    } else {
      if (compareIds.length >= 3) {
        alert("You may compare a maximum of 3 luxury properties side-by-side.");
        return;
      }
      setCompareIds(prev => [...prev, id]);
    }
  };

  const removeCompare = (id: string) => {
    setCompareIds(prev => prev.filter(item => item !== id));
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TITLE BLOCK */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Exquisite Portfolios</span>
          <h1 className="font-display text-3xl md:text-5xl text-zinc-950 font-normal tracking-tight">
            Curated Private <span className="italic font-light">Inventory</span>
          </h1>
          <p className="mt-3 text-xs font-sans text-zinc-500 tracking-wide uppercase">
            {filteredProperties.length} elite estates match your investment matrix
          </p>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-[#FAF8F4] border border-zinc-100 p-6 mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* SEARCH INPUT */}
            <div className="md:col-span-3 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by development, frond, developer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[48px] bg-white border border-zinc-200 focus:border-gold py-3 pl-10 pr-4 text-xs lg:text-sm font-medium focus:outline-none placeholder-zinc-400"
              />
            </div>

            {/* COMMUNITY SELECTOR */}
            <div className="md:col-span-3">
              <select
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full h-[48px] bg-white border border-zinc-200 focus:border-gold py-3 px-4 text-xs lg:text-sm font-medium focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Locations / Palm / Marina</option>
                {communities.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* PROPERTY TYPE SELECTOR */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-[48px] bg-white border border-zinc-200 focus:border-gold py-3 px-4 text-xs lg:text-sm font-medium focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Structures</option>
                {propertyTypes.filter(t => t !== 'All').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* COMPLETION STATUS SELECTOR */}
            <div className="md:col-span-2">
              <select
                value={selectedCompletion}
                onChange={(e) => setSelectedCompletion(e.target.value as any)}
                className="w-full h-[48px] bg-white border border-zinc-200 focus:border-gold py-3 px-4 text-xs lg:text-sm font-medium focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Completion</option>
                <option value="Ready">Ready</option>
                <option value="Off-Plan">Off-Plan</option>
              </select>
            </div>

            {/* TOGGLE ADVANCED BUTTON */}
            <div className="md:col-span-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`w-full h-[48px] py-3 px-4 text-xs font-sans font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                  showAdvancedFilters || minRoi > 0
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:border-gold'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* ADVANCED FILTERS */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-zinc-200/60 animate-in fade-in duration-300">
              
              {/* PRICE CAP */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-2">
                  <span>Maximum Budget</span>
                  <span className="font-mono text-gold">AED {(priceRange / 1000000).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="60000000"
                  step="1000000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-gold h-1 cursor-pointer bg-zinc-200"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-1">
                  <span>AED 2M</span>
                  <span>AED 60M+</span>
                </div>
              </div>

              {/* MIN ROI */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-2">
                  <span>Minimum Annual Yield</span>
                  <span className="font-mono text-gold">{minRoi}% ROI</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="9"
                  step="0.5"
                  value={minRoi}
                  onChange={(e) => setMinRoi(Number(e.target.value))}
                  className="w-full accent-gold h-1 cursor-pointer bg-zinc-200"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-1">
                  <span>0% (Preservation)</span>
                  <span>9% (Yield Optimised)</span>
                </div>
              </div>

              {/* SORT AND BEDS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">Bedrooms</label>
                  <select
                    value={selectedBeds}
                    onChange={(e) => setSelectedBeds(e.target.value)}
                    className="w-full h-[48px] bg-white border border-zinc-200 py-2.5 px-3 text-xs lg:text-sm font-medium focus:outline-none"
                  >
                    <option value="All">Any Beds</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                    <option value="4">4 Beds</option>
                    <option value="5+">5+ Beds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">Sort Results</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white border border-zinc-200 py-2.5 px-3 text-xs font-medium focus:outline-none"
                  >
                    <option value="price-desc">Price: High to Low</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="roi-desc">Yield: High to Low</option>
                    <option value="sqft-desc">Size: Sqft High to Low</option>
                  </select>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* PROPERTY LIST GRID */}
        {filteredProperties.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-zinc-200 text-zinc-400 font-sans text-xs">
            No listings correspond to your filter parameters. Try adjusting your price caps or geographic search zone.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => {
              const isWishlisted = wishlist.includes(prop.id);
              const isComparing = compareIds.includes(prop.id);

              return (
                <article
                  key={prop.id}
                  className="group bg-white border border-[#ECECEC] transition-all duration-500 hover:border-gold/30 flex flex-col justify-between"
                  style={{ borderRadius: '18px', overflow: 'hidden' }}
                >
                  
                  {/* IMAGE & BADGES */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-zinc-100">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-zinc-950 text-white font-sans font-bold text-[9px] tracking-widest uppercase px-3 py-1">
                        {prop.type}
                      </span>
                      {prop.completionYear === 'Ready' ? (
                        <span className="bg-emerald-600 text-white font-sans font-bold text-[9px] tracking-widest uppercase px-3 py-1">
                          Ready
                        </span>
                      ) : prop.price === 0 ? (
                        <span className="bg-amber-600 text-white font-sans font-bold text-[9px] tracking-widest uppercase px-3 py-1">
                          Upcoming
                        </span>
                      ) : (
                        <span className="bg-gold text-zinc-950 font-sans font-bold text-[9px] tracking-widest uppercase px-3 py-1">
                          Off Plan {prop.completionYear}
                        </span>
                      )}
                    </div>

                    {/* Yield Tag */}
                    <div className="absolute bottom-4 left-4">
                      <span className="font-mono text-xs font-bold text-white bg-zinc-900/80 backdrop-blur-sm px-2.5 py-1">
                        {prop.roi}% Net Yield
                      </span>
                    </div>
                  </div>

                  {/* DETAILS CARD BODY */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400 block mb-1">
                        {prop.developer} • {prop.community}
                      </span>
                      <h3
                        onClick={() => onSelectProperty(prop)}
                        className="font-display text-lg text-zinc-900 font-semibold group-hover:text-gold transition-colors duration-300 cursor-pointer lg:line-clamp-1 mb-2"
                      >
                        {prop.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 lg:line-clamp-2 mb-4 font-sans leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    <div>
                      {/* SPEC ROW */}
                      <div className="flex justify-between items-center border-t border-zinc-100 pt-4 mb-4">
                        <div className="flex gap-4 text-[10px] text-zinc-400 font-semibold font-sans">
                          {prop.beds > 0 && <span>{prop.beds} Beds</span>}
                          <span>{prop.baths} Baths</span>
                          <span>{prop.sqft.toLocaleString()} Sqft</span>
                        </div>
                        <span className="text-zinc-400 text-[10px]">
                          {prop.price > 0 ? `AED ${(prop.price / prop.sqft).toFixed(0)}/sqft` : 'Price on Request'}
                        </span>
                      </div>

                      {/* PRICE AND CTA ROW */}
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block">Acquisition Value</span>
                          <span className="font-mono text-sm font-bold text-zinc-900">
                            {prop.price > 0 ? `AED ${prop.price.toLocaleString()}` : 'Contact for Latest Price'}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 w-full lg:w-auto">
                          {/* COMPARE CHECKBOX ICON */}
                          <button
                            onClick={() => toggleCompare(prop.id)}
                            className={`p-3 lg:p-2 border transition-all shrink-0 ${
                              isComparing 
                                ? 'bg-gold/10 border-gold text-gold' 
                                : 'border-zinc-200 text-zinc-400 hover:text-gold hover:border-gold'
                            }`}
                            title="Compare properties"
                          >
                            <Shuffle className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                          </button>

                          <button
                            onClick={() => onSelectProperty(prop)}
                            className="bg-zinc-950 hover:bg-gold text-white text-xs uppercase tracking-widest px-4 py-3 lg:py-2 font-sans font-semibold transition-all duration-500 flex-1 lg:flex-none text-center h-[48px] lg:h-auto flex items-center justify-center"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* COMPARE SIDE-BY-SIDE BAR DRAWER */}
        {compareIds.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full bg-zinc-950 text-white z-40 border-t border-zinc-800 p-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                <span className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-2">
                  <Shuffle className="w-4 h-4" /> Property Comparison Vault ({compareIds.length}/3)
                </span>
                <button
                  onClick={() => setCompareIds([])}
                  className="text-xs text-zinc-400 hover:text-white underline"
                >
                  Clear Selection
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
                
                {/* LABELS COLUMN */}
                <div className="hidden md:flex flex-col justify-between text-[10px] uppercase tracking-wider text-zinc-500 py-2">
                  <div>Property</div>
                  <div>Developer & Zone</div>
                  <div>Yield / Price per Sqft</div>
                  <div>Space Allocation</div>
                  <div>Secure Valuation</div>
                </div>

                {/* SLOTS COLUMN */}
                {compareIds.map(cId => {
                  const propObj = properties.find(p => p.id === cId);
                  if (!propObj) return null;
                  return (
                    <div key={cId} className="bg-zinc-900 border border-zinc-800 p-4 space-y-3 relative">
                      <button
                        onClick={() => removeCompare(cId)}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <span className="block font-semibold text-white text-xs line-clamp-1">{propObj.title}</span>
                        <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block">{propObj.community}</span>
                      </div>

                      <div className="text-xs border-t border-zinc-800 pt-2 flex justify-between">
                        <span className="text-emerald-400 font-mono font-bold">{propObj.roi}% Net ROI</span>
                        <span className="font-mono text-zinc-400">
                          {propObj.price > 0 ? `AED ${Math.round(propObj.price / propObj.sqft)}/sqft` : 'Price on Request'}
                        </span>
                      </div>

                      <div className="text-[11px] text-zinc-300 font-sans">
                        {propObj.beds > 0 ? `${propObj.beds} Beds` : 'Studio'} • {propObj.baths} Baths • {propObj.sqft.toLocaleString()} Sqft
                      </div>

                      <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-gold">
                          {propObj.price > 0 ? `AED ${propObj.price.toLocaleString()}` : 'Contact for Latest Price'}
                        </span>
                        <button
                          onClick={() => onSelectProperty(propObj)}
                          className="text-[10px] uppercase tracking-wider font-bold text-white hover:text-gold"
                        >
                          Analyse
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* EMPTY SLOTS FILLER */}
                {Array.from({ length: 3 - compareIds.length }).map((_, index) => (
                  <div key={index} className="hidden md:flex items-center justify-center border border-dashed border-zinc-800 bg-zinc-900/35 text-zinc-600 text-xs text-center p-4">
                    Select another property <br /> to audit side-by-side
                  </div>
                ))}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
