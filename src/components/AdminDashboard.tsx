import { useState, useEffect, FormEvent } from 'react';
import { Database, Users, TrendingUp, CheckSquare, Plus, Mail, Phone, Calendar, RefreshCw, BarChart, Tag } from 'lucide-react';
import { Lead, Property } from '../types';

interface AdminDashboardProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
}

export default function AdminDashboard({ properties, onAddProperty }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'add-listing'>('leads');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Follow Up' | 'Archived'>('All');

  // New listing form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(4500000);
  const [location, setLocation] = useState('Business Bay');
  const [community, setCommunity] = useState('Business Bay');
  const [developer, setDeveloper] = useState('EMAAR Properties');
  const [type, setType] = useState<'Villa' | 'Apartment' | 'Penthouse' | 'Commercial'>('Apartment');
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(3);
  const [sqft, setSqft] = useState(1500);
  const [roi, setRoi] = useState(7.8);
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error fetching CRM leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (leadId: string, newStatus: 'New' | 'Contacted' | 'Follow Up' | 'Archived') => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local leads state
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit property listing
  const handleAddPropertySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newProp: Property = {
      id: `prop-custom-${Date.now()}`,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      price,
      location,
      community,
      developer,
      type,
      beds,
      baths,
      sqft,
      image: type === 'Villa'
        ? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200'
        : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200'
      ],
      description: description || 'A beautifully designed contemporary residence, offering high ROI potential and top luxury amenities.',
      roi,
      completionYear: 'Ready',
      featured: false,
      investmentScore: Math.round(75 + Math.random() * 20),
      amenities: ['Pool', 'Gym', 'Concierge', 'Valet'],
      nearby: {
        schools: ['GEMS Wellington'],
        hospitals: ['Al Zahra'],
        transport: ['Metro']
      }
    };

    onAddProperty(newProp);
    setSuccessMsg('Luxury property successfully launched into active search inventory.');
    
    // Clear form
    setTitle('');
    setDescription('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Filter leads
  const filteredLeads = statusFilter === 'All'
    ? leads
    : leads.filter(l => l.status === statusFilter);

  // CRM KPI Metrics
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const totalInquiryValueEstimate = leads.reduce((sum, lead) => {
    const prop = properties.find(p => p.id === lead.propertyId);
    return sum + (prop ? prop.price : 4500000); // fallback average AED 4.5M
  }, 0);

  return (
    <div className="bg-zinc-950 text-white min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* CRM TITLE BLOCK */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">Golden Legacy Private Desk</span>
            <h1 className="font-display text-3xl md:text-5xl text-white font-normal tracking-tight">
              CRM Private <span className="italic text-gold font-light">Office</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-5 py-2.5 font-sans text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'leads' ? 'bg-gold text-white' : 'bg-zinc-900 border border-zinc-800 hover:border-gold text-zinc-300'
              }`}
            >
              Leads & Consultations
            </button>
            <button
              onClick={() => setActiveTab('add-listing')}
              className={`px-5 py-2.5 font-sans text-xs uppercase tracking-widest font-semibold transition-all ${
                activeTab === 'add-listing' ? 'bg-gold text-white' : 'bg-zinc-900 border border-zinc-800 hover:border-gold text-zinc-300'
              }`}
            >
              Add Property Listing
            </button>
          </div>
        </div>

        {activeTab === 'leads' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">Active Pipeline</span>
                  <span className="font-mono text-3xl font-bold text-white">{totalLeadsCount} Leads</span>
                </div>
                <Users className="w-8 h-8 text-gold" />
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">Unread Enquiries</span>
                  <span className="font-mono text-3xl font-bold text-rose-400">{newLeadsCount} Action Required</span>
                </div>
                <Database className="w-8 h-8 text-rose-400" />
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">Inquiry Asset Value</span>
                  <span className="font-mono text-2xl font-bold text-emerald-400">AED {(totalInquiryValueEstimate / 1000000).toFixed(1)}M</span>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-400" />
              </div>
            </div>

            {/* LEADS LIST BLOCK */}
            <div className="bg-zinc-900 border border-zinc-800">
              <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-display text-lg text-zinc-100 font-semibold">Inquiry Registry</span>
                
                {/* STATUS FILTER CHIPS */}
                <div className="flex flex-wrap gap-2">
                  {(['All', 'New', 'Contacted', 'Follow Up', 'Archived'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1 text-[10px] font-sans uppercase tracking-widest font-bold transition-all ${
                        statusFilter === filter
                          ? 'bg-gold text-white'
                          : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="p-12 text-center text-zinc-500">
                  <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto mb-3" />
                  <span>Loading private office registers...</span>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 font-sans text-xs">
                  No luxury leads registered under the "{statusFilter}" classification.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-950 border-b border-zinc-800 text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                        <th className="p-4 pl-6">Client Name / Contact</th>
                        <th className="p-4">Lead Classification</th>
                        <th className="p-4">Assigned Property</th>
                        <th className="p-4">Message / Request Detail</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right pr-6 font-semibold">Change Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-xs">
                      {filteredLeads.map((lead) => {
                        const associatedProp = properties.find(p => p.id === lead.propertyId);
                        return (
                          <tr key={lead.id} className="hover:bg-zinc-900/60 transition-colors">
                            <td className="p-4 pl-6">
                              <span className="block font-semibold text-zinc-100 text-sm">{lead.name}</span>
                              <span className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono mt-1">
                                <Mail className="w-3 h-3 text-gold" /> {lead.email}
                              </span>
                              {lead.phone && (
                                <span className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono mt-0.5">
                                  <Phone className="w-3 h-3 text-gold" /> {lead.phone}
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className="inline-block bg-zinc-800 border border-zinc-700 text-gold px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold">
                                {lead.type}
                              </span>
                            </td>
                            <td className="p-4">
                              {associatedProp ? (
                                <div>
                                  <span className="block font-medium text-zinc-200 text-xs">{associatedProp.title}</span>
                                  <span className="text-[10px] text-gold font-mono">
                                    {associatedProp.price > 0 ? `AED ${associatedProp.price.toLocaleString()}` : 'Contact for Latest Price'}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-zinc-500 italic">General Consultation</span>
                              )}
                            </td>
                            <td className="p-4 max-w-xs text-zinc-300 leading-relaxed text-[11px]">
                              {lead.message}
                            </td>
                            <td className="p-4 font-mono text-[10px] text-zinc-400">
                              {lead.date}
                            </td>
                            <td className="p-4 text-right pr-6">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                className={`text-[10px] font-sans uppercase tracking-wider font-bold border p-1.5 focus:outline-none focus:ring-1 focus:ring-gold ${
                                  lead.status === 'New'
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    : lead.status === 'Contacted'
                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    : lead.status === 'Follow Up'
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Follow Up">Follow Up</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ADD LISTING FORM */
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-10 max-w-4xl mx-auto animate-in fade-in duration-500">
            <h3 className="font-display text-xl text-zinc-100 font-semibold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-gold" /> Launch Property to Active Inventory
            </h3>

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 mb-6 text-xs font-semibold uppercase tracking-wider">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleAddPropertySubmit} className="space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Property Name/Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Beachfront Penthouse"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Price (AED)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Location Detail</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frond K, Palm Jumeirah"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Community</label>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  >
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
                    <option value="Business Bay">Business Bay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Developer</label>
                  <select
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  >
                    <option value="EMAAR Properties">EMAAR Properties</option>
                    <option value="Nakheel PJSC">Nakheel PJSC</option>
                    <option value="DAMAC Properties">DAMAC Properties</option>
                    <option value="Sobha Realty">Sobha Realty</option>
                    <option value="Meraas">Meraas</option>
                    <option value="Ellington Properties">Ellington Properties</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Structure Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={baths}
                    onChange={(e) => setBaths(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Size (Sq. Ft.)</label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Projected ROI (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={roi}
                    onChange={(e) => setRoi(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">Property Narrative / Description</label>
                <textarea
                  rows={4}
                  placeholder="Detail the luxury specs, private beach features, kitchen fittings, ceiling height, and scenic views..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold px-4 py-3 text-zinc-200 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-deep text-zinc-950 hover:text-white px-8 py-3.5 font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 w-full md:w-auto"
                >
                  Publish Luxury Asset
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
