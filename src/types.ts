export interface Property {
  id: string;
  slug: string;
  title: string;
  price: number; // in AED
  location: string;
  community: string;
  developer: string;
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Commercial' | 'Townhouse';
  subType?: string; // Office, Retail, Hotel, Warehouse
  status?: 'For Sale' | 'Rent' | 'Off Plan' | 'Off-Plan' | 'Ready';
  isNewLaunch?: boolean;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  images: string[];
  description: string;
  roi: number; // percentage, e.g. 7.5
  completionYear: number | 'Ready';
  paymentPlan?: string; // e.g. "60/40 Post-Handover"
  featured: boolean;
  investmentScore: number; // Out of 100
  amenities: string[];
  nearby: {
    schools: string[];
    hospitals: string[];
    transport: string[];
  };
  floorPlanImage?: string;
  masterPlanImage?: string;
  googleMapUrl?: string;
  investmentHighlights?: string[];
  faqs?: { question: string; answer: string; }[];
  pros?: string[];
  cons?: string[];
  whoShouldBuy?: string;
  whoShouldNotBuy?: string;
  goldenVisaEligible?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  videoUrl?: string;
  virtualTour360Url?: string;
  furnishing?: string;
  ownershipType?: string;
  yearBuilt?: number;
  serviceCharges?: string;
  referenceNumber?: string;
  parking?: number;
  floorNumber?: string;
  agentId?: string;
  paymentPlanMilestones?: { milestone: string; percentage: number }[];
  brochureUrl?: string;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  founded: number;
  notableProjects: string[];
  yearsInBusiness?: number;
  completedProjects?: number;
  featuredCommunities?: string[];
  faqs?: { question: string; answer: string; }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  avgRoi: number;
  avgPriceSqft: number;
  notableFeatures: string[];
  faqs?: { question: string; answer: string; }[];
  pros?: string[];
  cons?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Agent {
  id: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  name: string;
  role: string;
  image: string;
  languages: string[];
  experience: number; // in years
  propertiesSold: number;
  email: string;
  phone: string;
  whatsApp: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: 'Investment' | 'Golden Visa' | 'Market Trends' | 'Communities' | 'Buying Guide' | 'Luxury Living' | 'Off Plan';
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  type: 'Consultation' | 'Viewing' | 'Brochure' | 'Investment Guide' | 'General';
  status: 'New' | 'Contacted' | 'Follow Up' | 'Archived';
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
