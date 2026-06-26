import { Property, Developer, Community, Agent, Blog, FAQ } from './types';

export const DEVELOPERS: Developer[] = [
  {
    id: 'emaar',
    name: 'EMAAR Properties',
    slug: 'emaar-properties',
    seoTitle: 'EMAAR Properties | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by EMAAR Properties.',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150',
    description: 'Dubai\'s premier developer, responsible for iconic landmarks including Burj Khalifa and Dubai Mall. Known for master-planned community excellence and pristine quality standards.',
    founded: 1997,
    yearsInBusiness: 29,
    completedProjects: 105,
    featuredCommunities: ['Downtown Dubai', 'Dubai Hills Estate', 'Dubai Creek Harbour'],
    notableProjects: ['Downtown Dubai', 'Dubai Hills Estate', 'Dubai Creek Harbour']
  },
  {
    id: 'damac',
    name: 'DAMAC Properties',
    slug: 'damac-properties',
    seoTitle: 'DAMAC Properties | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by DAMAC Properties.',
    logo: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=150',
    description: 'Provider of luxury residential, commercial and leisure properties across the Middle East. Famous for branded collaborations with Cavalli, Fendi, and Paramount.',
    founded: 2002,
    yearsInBusiness: 24,
    completedProjects: 82,
    featuredCommunities: ['DAMAC Hills', 'DAMAC Lagoons', 'Business Bay'],
    notableProjects: ['DAMAC Hills', 'DAMAC Lagoons', 'Cavalli Tower']
  },
  {
    id: 'sobha',
    name: 'Sobha Realty',
    slug: 'sobha-realty',
    seoTitle: 'Sobha Realty | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Sobha Realty.',
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150',
    description: 'An international luxury developer committed to redefining the art of living with sustainable, meticulously designed and backward-integrated signature communities.',
    founded: 1976,
    yearsInBusiness: 50,
    completedProjects: 140,
    featuredCommunities: ['Sobha Hartland', 'Sobha Reserve', 'Siniya Island'],
    notableProjects: ['Sobha Hartland', 'Sobha Reserve', 'The S Tower', 'Sobha Siniya Island']
  },
  {
    id: 'danube',
    name: 'Danube Properties',
    slug: 'danube-properties',
    seoTitle: 'Danube Properties | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Danube Properties.',
    logo: 'https://images.unsplash.com/photo-1504297342945-13c66006506e?q=80&w=150',
    description: 'Renowned for bringing affordable luxury to Dubai. Famous for their customer-centric 1% payment plans and high-ROI premium residential townhouses and apartments.',
    founded: 1993,
    yearsInBusiness: 33,
    completedProjects: 45,
    featuredCommunities: ['Al Furjan', 'Studio City', 'Business Bay'],
    notableProjects: ['Greenz by Danube', 'Glitz by Danube', 'Jewelz by Danube']
  },
  {
    id: 'azizi',
    name: 'Azizi Developments',
    slug: 'azizi-developments',
    seoTitle: 'Azizi Developments | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Azizi Developments.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=150',
    description: 'A leading real estate developer in Dubai, Azizi creates high-end urban spaces and waterfront master communities that maximize investor yields and quality lifestyles.',
    founded: 2007,
    yearsInBusiness: 19,
    completedProjects: 68,
    featuredCommunities: ['Meydan', 'Al Furjan', 'Dubai Healthcare City', 'Azizi Venice'],
    notableProjects: ['Azizi Venice', 'Burj Azizi', 'Azizi Riviera']
  },
  {
    id: 'binghatti',
    name: 'Binghatti Developers',
    slug: 'binghatti-developers',
    seoTitle: 'Binghatti Developers | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Binghatti Developers.',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=150',
    description: 'Known for highly iconic, architectural masterpieces with distinctive designs. Binghatti collaborates with global luxury brands like Bugatti and Mercedes-Benz.',
    founded: 2008,
    yearsInBusiness: 18,
    completedProjects: 60,
    featuredCommunities: ['Business Bay', 'Jumeirah Village Circle', 'Downtown Dubai'],
    notableProjects: ['Bugatti Residences', 'Mercedes-Benz Places', 'Binghatti Onyx']
  },
  {
    id: 'alef',
    name: 'Alef Group',
    slug: 'alef-group',
    seoTitle: 'Alef Group | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Alef Group.',
    logo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=150',
    description: 'Sharjah\'s preeminent developer of premium, sustainable communities and luxury lifestyle complexes designed around nature, wellness, and family.',
    founded: 2013,
    yearsInBusiness: 13,
    completedProjects: 20,
    featuredCommunities: ['Sharjah Waterfront', 'University City', 'Hayyan'],
    notableProjects: ['Hayyan Villas & Townhouses', 'Alef Linar', 'Al Mamsha']
  }
];

export const COMMUNITIES: Community[] = [
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    seoTitle: 'Palm Jumeirah | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Palm Jumeirah.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
    description: 'The world\'s largest man-made island, offering ultimate beachfront luxury, signature high-end villas, celebrity penthouses, and 5-star beachfront resorts.',
    avgRoi: 7.2,
    avgPriceSqft: 3400,
    notableFeatures: ['Beachfront Villas', 'Private Beach Access', 'The Pointe', 'Ultra Luxury Living']
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    slug: 'downtown-dubai',
    seoTitle: 'Downtown Dubai | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Downtown Dubai.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
    description: 'The "Centre of Now", hosting the iconic Burj Khalifa, The Dubai Fountain, and Dubai Mall. Premium high-rise penthouse living with stunning skyline views.',
    avgRoi: 6.8,
    avgPriceSqft: 2800,
    notableFeatures: ['Burj Khalifa Views', 'Dubai Mall Access', 'Opera District', 'Cosmopolitan Vibe']
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    seoTitle: 'Dubai Hills Estate | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Dubai Hills Estate.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
    description: 'A serene master community centered around an 18-hole championship golf course. Vast parks, elegant family villas, and modern low-rise apartments.',
    avgRoi: 7.5,
    avgPriceSqft: 1900,
    notableFeatures: ['Championship Golf Course', 'Dubai Hills Park', 'Dubai Hills Mall', 'Family-Friendly']
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    slug: 'dubai-marina',
    seoTitle: 'Dubai Marina | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Dubai Marina.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
    description: 'A breathtaking waterfront community lined with glittering supertall skyscrapers, high-end yachts, waterfront dining promenades, and beach proximity.',
    avgRoi: 7.9,
    avgPriceSqft: 1850,
    notableFeatures: ['Yacht Club', 'Marina Walk', 'Beach Proximity', 'Vibrant Nightlife']
  },
  {
    id: 'dubai-creek-harbour',
    name: 'Dubai Creek Harbour',
    slug: 'dubai-creek-harbour',
    seoTitle: 'Dubai Creek Harbour | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Dubai Creek Harbour.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200',
    description: 'The future of Dubai. A sustainable waterfront sanctuary offering stunning views of the wildlife sanctuary, Dubai Creek, and downtown skyline.',
    avgRoi: 8.2,
    avgPriceSqft: 1650,
    notableFeatures: ['Creek Beach', 'Central Park', 'Marina Promenade', 'Stunning Skyline Views']
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    slug: 'business-bay',
    seoTitle: 'Business Bay | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Business Bay.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
    description: 'The commercial and high-rise core of Dubai. Canal-side residences, dynamic offices, five-star hospitality, and direct connection to Downtown Dubai.',
    avgRoi: 7.6,
    avgPriceSqft: 1750,
    notableFeatures: ['Dubai Water Canal', 'Skyline Residences', 'Corporate Hub', 'Luxury Penthouses']
  },
  {
    id: 'al-furjan',
    name: 'Al Furjan',
    slug: 'al-furjan',
    seoTitle: 'Al Furjan | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Al Furjan.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    description: 'A vibrant, family-oriented community featuring modern villas, townhouses, and high-end residential apartments with direct connection to the metro line.',
    avgRoi: 8.5,
    avgPriceSqft: 1100,
    notableFeatures: ['Metro Access', 'Family Parks', 'Al Furjan Pavilion', 'Eco-friendly layouts']
  },
  {
    id: 'sharjah',
    name: 'Sharjah',
    slug: 'sharjah',
    seoTitle: 'Sharjah | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Sharjah.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    description: 'The cultural capital of the UAE, offering peaceful, sustainable villa communities, car-free walkable pedestrian zones, and premium university hubs.',
    avgRoi: 7.7,
    avgPriceSqft: 950,
    notableFeatures: ['Walkable zones', 'University access', 'Largest Swimmable Lagoon', 'Family-centric parks']
  },
  {
    id: 'dubai-south',
    name: 'Dubai South',
    slug: 'dubai-south',
    seoTitle: 'Dubai South | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Dubai South.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200',
    description: 'Dubai\'s futuristic aviation and logistics master city, home to the Al Maktoum International Airport expansion and stunning lagunoid master projects.',
    avgRoi: 8.8,
    avgPriceSqft: 1350,
    notableFeatures: ['Lagoon communities', 'Aviation District', 'Opera House', 'Al Maktoum Airport Link']
  },
  {
    id: 'siniya-island',
    name: 'Siniya Island',
    slug: 'siniya-island',
    seoTitle: 'Siniya Island | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Siniya Island.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
    description: 'A breathtaking, biodiverse natural island retreat offering exclusive beachfront mansions, championship golf, mangrove canals, and superyacht harbors.',
    avgRoi: 8.1,
    avgPriceSqft: 1850,
    notableFeatures: ['Eco-tourism Sanctuary', 'Natural Beachfront', 'Mangrove channels', 'Yacht Marina & Yacht Club']
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Greenz by Danube',
    slug: 'greenz-by-danube',
    seoTitle: 'Greenz by Danube | Luxury Property in Dubai',
    seoDescription: 'Discover Greenz by Danube, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 1190000,
    location: 'Al Furjan, Dubai',
    community: 'Al Furjan',
    developer: 'Danube Properties',
    type: 'Villa',
    subType: 'Luxury Townhouses',
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200'
    ],
    description: 'Greenz by Danube is an exquisite eco-friendly residential townhouse collection located in Al Furjan, designed to offer high-yielding, premium suburban living. Features Danube\'s iconic 1% monthly payment plan, high-end specifications, sustainable solar energy networks, and beautiful community integration.',
    roi: 8.5,
    completionYear: 2027,
    paymentPlan: '1% Monthly Payment Plan',
    featured: true,
    investmentScore: 92,
    amenities: ['Eco-friendly Solar', 'Swimming Pool', 'Equipped Gymnasium', 'Kids Play Area', 'Landscaped Gardens', 'Retail Outlets', 'BBQ Area', 'Jogging Tracks', '24/7 Security'],
    nearby: {
      schools: ['Arbor School (4 mins)', 'GEMS Winchester (12 mins)'],
      hospitals: ['Mediclinic Al Furjan (5 mins)'],
      transport: ['Al Furjan Metro Station (3 mins)', 'Yalayis Street link (2 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Al%20Furjan,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Guaranteed 8.5% Net Rental ROI', '1% Monthly Interest-Free Installments', '3 Minutes from Al Furjan Metro Station', 'High Capital Appreciation Potential'],
    faqs: [
      { question: 'What is the payment plan for Greenz?', answer: 'It is an exclusive 50/50 structure with 1% monthly installments during construction, and 50% on key handover in 2027.' },
      { question: 'Is Greenz near public transport?', answer: 'Yes, Greenz by Danube is located just 3 minutes from the Al Furjan Metro Station.' }
    ]
  },
  {
    id: 'prop-2',
    title: 'Hayyan Villas & Townhouses',
    slug: 'hayyan-villas-townhouses',
    seoTitle: 'Hayyan Villas & Townhouses | Luxury Property in Dubai',
    seoDescription: 'Discover Hayyan Villas & Townhouses, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 2850000,
    location: 'Sharjah, UAE',
    community: 'Sharjah',
    developer: 'Alef Group',
    type: 'Villa',
    subType: 'Villas & Townhouses',
    beds: 4,
    baths: 5,
    sqft: 3600,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200'
    ],
    description: 'Hayyan Villas & Townhouses is Sharjah\'s preeminent nature-inspired community. Designed around modern sustainable living and serene nature, it hosts the largest swimmable lagoon in Sharjah, a massive indoor park, organic family gardens, and maximum lifestyle privacy.',
    roi: 7.8,
    completionYear: 2028,
    paymentPlan: '60/40 Construction Schedule',
    featured: true,
    investmentScore: 90,
    amenities: ['Swimmable Lagoon (55,000 sq ft)', 'Largest Indoor Park', 'Organic Farming Areas', 'Community Mall', 'Community Centre', 'Sports Facilities', 'Walking & Cycling Tracks', 'Green Landscapes', 'Family Parks'],
    nearby: {
      schools: ['University City of Sharjah (15 mins)', 'Sharjah National School (8 mins)'],
      hospitals: ['University Hospital Sharjah (14 mins)'],
      transport: ['Sharjah Airport (10 mins)', 'Dubai International Airport (20 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Hayyan,%20Sharjah&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Largest swimmable lagoon in Sharjah', '80k sq ft of organic farming spaces', 'High-yielding 7.8% Net ROI', 'Perfect connectivity to Dubai International Airport'],
    faqs: [
      { question: 'How big is the lagoon in Hayyan?', answer: 'The community features the largest swimmable crystal lagoon in Sharjah, measuring 55,000 square feet.' },
      { question: 'What is the driving time to Dubai?', answer: 'Sharjah is connected directly to Dubai; Dubai International Airport is situated just 20 minutes away via direct highways.' }
    ]
  },
  {
    id: 'prop-3',
    title: 'Azizi Venice',
    slug: 'azizi-venice',
    seoTitle: 'Azizi Venice | Luxury Property in Dubai',
    seoDescription: 'Discover Azizi Venice, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 1450000,
    location: 'Dubai South, Dubai',
    community: 'Dubai South',
    developer: 'Azizi Developments',
    type: 'Apartment',
    subType: 'Apartments & Waterfront Residences',
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200'
    ],
    description: 'Azizi Venice is a spectacular Venetian-inspired waterfront master community in Dubai South. It features crystal lagoons, white sandy beaches, artificial tidal waves, a beautiful musical fountain, an elite opera house, luxury hotels, and a vibrant glass-canopied retail boulevard.',
    roi: 8.8,
    completionYear: 2028,
    paymentPlan: '50/50 on Handover',
    featured: true,
    investmentScore: 94,
    amenities: ['Giga Crystal Lagoon', 'Aesthetic Music Fountains', 'Boulevard Retail Shops', 'Venetian Gondola Rides', 'Opera House', 'Community Hospital', 'Luxury 5-Star Hotels', 'Kids Aqua Park'],
    nearby: {
      schools: ['Choueifat School (10 mins)', 'GEMS International (12 mins)'],
      hospitals: ['NMC Royal Clinic Dubai South (6 mins)'],
      transport: ['Al Maktoum International Airport (7 mins)', 'Dubai South Metro Station (5 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Dubai%20South,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Adjacent to Al Maktoum Int Airport (soon world\'s largest)', '8.8% capital gains ROI forecast', 'Features custom opera house and swimmable lagoon', 'Flexible interest-free milestone payments'],
    faqs: [
      { question: 'Where is Azizi Venice located?', answer: 'It is situated in Dubai South, directly adjacent to the upcoming Al Maktoum International Airport expansion.' },
      { question: 'Does Azizi Venice have a payment plan?', answer: 'Yes, it features a flexible 50/50 payment plan, with 50% paid in installments during construction and 50% on key handover.' }
    ]
  },
  {
    id: 'prop-4',
    title: 'Burj Azizi',
    slug: 'burj-azizi',
    seoTitle: 'Burj Azizi | Luxury Property in Dubai',
    seoDescription: 'Discover Burj Azizi, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 0,
    location: 'Sheikh Zayed Road, Dubai',
    community: 'Downtown Dubai',
    developer: 'Azizi Developments',
    type: 'Apartment',
    subType: 'Luxury Apartments',
    beds: 3,
    baths: 3,
    sqft: 1850,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200'
    ],
    description: 'Soaring on Sheikh Zayed Road, Burj Azizi is planned to be the second-tallest building in the world. It provides an ultra-exclusive selection of glass sky residences, breathtaking Burj Khalifa and skyline views, personalized 7-star valet and butler networks, and global investment pedigree.',
    roi: 9.1,
    completionYear: 2029,
    paymentPlan: 'Available on Request',
    featured: true,
    investmentScore: 97,
    amenities: ['World\'s Highest Observation Deck', '7-Star Luxury Hotel Club', 'Helipad Access', 'Skyscraper Swimming Pool', 'Exclusive Private Cinema', 'Michelin Star Dining', 'Ultra Smart Home Systems', 'Private Elevator Lobby'],
    nearby: {
      schools: ['Hartland International School (11 mins)'],
      hospitals: ['Mediclinic Welcare Hospital (9 mins)'],
      transport: ['Burj Khalifa Metro Station (2 mins)', 'Financial Centre Metro (3 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Sheikh%20Zayed%20Road,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['The second tallest tower in the world', 'Elite 7-Star building amenities', 'Excellent capital appreciation runway of 45%+', 'Guaranteed 9.1% institutional net ROI'],
    faqs: [
      { question: 'How tall will Burj Azizi be?', answer: 'It is designed to be the second tallest skyscraper on earth, soaring on Sheikh Zayed Road with luxury residential and 7-star hotel features.' },
      { question: 'What is the completion date?', answer: 'Burj Azizi is slated for completion in 2029.' }
    ]
  },
  {
    id: 'prop-5',
    title: 'Sobha Siniya Island',
    slug: 'sobha-siniya-island',
    seoTitle: 'Sobha Siniya Island | Luxury Property in Dubai',
    seoDescription: 'Discover Sobha Siniya Island, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 8900000,
    location: 'Siniya Island, Umm Al Quwain',
    community: 'Siniya Island',
    developer: 'Sobha Realty',
    type: 'Villa',
    subType: 'Beachfront Villas & Apartments',
    beds: 5,
    baths: 6,
    sqft: 5400,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200'
    ],
    description: 'Sobha Siniya Island is a magnificent natural island sanctuary in Umm Al Quwain, crafted by Sobha Realty. Featuring ultra-exclusive beachfront mansions and low-rise waterfront apartments, it seamlessly blends natural mangroves, white beaches, yacht harbors, and elite eco-luxury.',
    roi: 8.1,
    completionYear: 2028,
    paymentPlan: '60/40 Payment Plan',
    featured: true,
    investmentScore: 93,
    amenities: ['Natural Beachfront Access', 'Championship Golf Course', 'Yacht Marina & Yacht Club', 'Helipad Access', 'Biodiverse Eco-Parks', 'Mangrove Waterways', 'Private Swimmable Pools', 'Waterfront Dining Promenade'],
    nearby: {
      schools: ['International School of Choueifat (15 mins)'],
      hospitals: ['Sheikh Khalifa General Hospital (12 mins)'],
      transport: ['Marina Yacht Berths (Direct)', 'E11 Highway Link (5 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Siniya%20Island,%20Umm%20Al%20Quwain&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Natural untouched island sanctuary development', 'Private oceanfront with custom yacht docking access', '8.1% Net Rental Yield potential', 'Sobha signature ultra-luxury materials and finishing'],
    faqs: [
      { question: 'Where is Siniya Island located?', answer: 'Siniya Island is a pristine natural island located in Umm Al Quwain, UAE, developed as a highly exclusive beachfront retreat.' },
      { question: 'What options are available?', answer: 'Sobha Siniya Island features custom luxury beachfront villas as well as premium low-rise waterfront apartments.' }
    ]
  },
  {
    id: 'prop-6',
    title: 'Alef Linar',
    slug: 'alef-linar',
    seoTitle: 'Alef Linar | Luxury Property in Dubai',
    seoDescription: 'Discover Alef Linar, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 1150000,
    location: 'Sharjah, UAE',
    community: 'Sharjah',
    developer: 'Alef Group',
    type: 'Apartment',
    subType: 'Luxury Apartments',
    beds: 2,
    baths: 2,
    sqft: 1250,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200'
    ],
    description: 'Alef Linar Apartments represent premium contemporary living in Al Mamsha, Sharjah. Strategically integrated into a fully pedestrian, car-free retail zone, these apartments offer grand high ceilings, smart-home automation, and a vibrant community plaza.',
    roi: 7.6,
    completionYear: 2027,
    paymentPlan: '50/50 Construction Plan',
    featured: true,
    investmentScore: 88,
    amenities: ['Fully Pedestrian Walkways', 'Equipped Smart Gym', 'Olympic Size Pool', 'Boulevard Dining & Cafes', 'Interactive Splash Parks', 'Underground Secure Parking', 'Eco-friendly Climate Controls', 'Integrated Retail Mall'],
    nearby: {
      schools: ['University City of Sharjah (8 mins)'],
      hospitals: ['Royal Hospital Sharjah (10 mins)'],
      transport: ['Sharjah International Airport (12 mins)', 'E311 Highway Link (3 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Al%20Mamsha,%20Sharjah&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Sharjah\'s first fully walk-friendly pedestrian project', 'Close proximity to Sharjah University City', 'High rental demand yielding 7.6% net', 'Premium retail and culinary options in the courtyard'],
    faqs: [
      { question: 'What is Al Mamsha?', answer: 'Al Mamsha is Sharjah\'s premier car-free, fully walkable modern zone with retail, residential, and park integration.' },
      { question: 'What is the payment plan for Alef Linar?', answer: 'Alef Linar offers a 50/50 payment structure, with 50% paid during construction milestones and 50% on key handover in 2027.' }
    ]
  },
  {
    id: 'prop-7',
    title: 'The Sky Penthouse - Armani Casa',
    slug: 'the-sky-penthouse-armani-casa',
    seoTitle: 'The Sky Penthouse - Armani Casa | Luxury Property in Dubai',
    seoDescription: 'Discover The Sky Penthouse - Armani Casa, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 29000000,
    location: 'Downtown Dubai, Dubai',
    community: 'Downtown Dubai',
    developer: 'EMAAR Properties',
    type: 'Penthouse',
    subType: 'Luxury Penthouse',
    beds: 4,
    baths: 5,
    sqft: 6500,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200'
    ],
    description: 'Perched on high floors of the iconic Burj Khalifa, this Armani Casa signature penthouse offers unparalleled 360-degree views of the Dubai Fountains and Arabian Gulf. Designed personally by Giorgio Armani, the apartment exudes premium luxury, fitted with precious stone floors, bronze accents, handmade curved wood joinery, and fully integrated high-end appliances.',
    roi: 6.5,
    completionYear: 'Ready',
    paymentPlan: 'Cash or Direct Mortgage',
    featured: true,
    investmentScore: 91,
    amenities: ['Valet Parking', 'Concierge Service', 'Direct Dubai Mall Access', 'Indoor Pool', 'Armani Signature Spa', 'Observation Deck Pass', 'Smart Climatization', 'Wine Cellar'],
    nearby: {
      schools: ['Hartland International School (10 mins)', 'Dubai International Academy (14 mins)'],
      hospitals: ['Mediclinic Welcare Hospital (8 mins)', 'Emirates Specialty Hospital (11 mins)'],
      transport: ['Burj Khalifa / Dubai Mall Metro Station (Direct)', 'Financial Centre Metro (5 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Burj%20Khalifa,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Exclusive Armani-designed interiors', 'Premium views of the Dubai Fountain', 'Immediate ready acquisition with high rental yields', 'Direct private path to Dubai Mall'],
    faqs: [
      { question: 'Is it fully furnished?', answer: 'Yes, this luxury penthouse is fully customized and furnished with Armani Casa signature collections.' }
    ]
  },
  {
    id: 'prop-8',
    title: 'DAMAC Lagoons Beach Villas',
    slug: 'damac-lagoons-beach-villas',
    seoTitle: 'DAMAC Lagoons Beach Villas | Luxury Property in Dubai',
    seoDescription: 'Discover DAMAC Lagoons Beach Villas, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 18500000,
    location: 'DAMAC Lagoons, Dubai',
    community: 'Dubai Hills Estate',
    developer: 'DAMAC Properties',
    type: 'Villa',
    subType: 'Villas & Townhouses',
    beds: 5,
    baths: 6,
    sqft: 8200,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200'
    ],
    description: 'Mediterranean-inspired beach villa within the highly sought Santorini cluster at DAMAC Lagoons. Crystal clear lagoons, white sandy beaches, active water sports, floating cinemas, and exquisite leisure. The villa boasts a contemporary open plan layout, private swimming pool, internal elevator, rooftop sun deck, and high capital appreciation potential.',
    roi: 8.0,
    completionYear: 2026,
    paymentPlan: '60/40 Payment Plan',
    featured: true,
    investmentScore: 93,
    amenities: ['Crystal Lagoon Access', 'Private Sandy Beachfront', 'Floating Cinema', 'Water Slides & Zipline', 'Waterfront Cafes', 'Indoor & Outdoor Gym', 'Roof Solarium', 'Private Pool'],
    nearby: {
      schools: ['Jebel Ali School (5 mins)', 'GEMS Metropole School (8 mins)'],
      hospitals: ['Aster Clinic (5 mins)', 'NMC Royal Hospital (10 mins)'],
      transport: ['DAMAC Hills Bus Shuttle (2 mins)', 'F1 Metro Link (15 mins)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=DAMAC%20Lagoons,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['Guaranteed Lagoon Frontage', 'Flexible off-plan payment milestone stages', 'Beautiful Mediterranean theme architecture', 'Highly sought cluster near key transit roads'],
    faqs: [
      { question: 'What is the completion status?', answer: 'The Santorini cluster of DAMAC Lagoons is currently under construction, with handover scheduled for 2026.' }
    ]
  },
  {
    id: 'prop-9',
    title: 'Bugatti Residences',
    slug: 'bugatti-residences',
    seoTitle: 'Bugatti Residences | Luxury Property in Dubai',
    seoDescription: 'Discover Bugatti Residences, a premium property offering exceptional luxury and high investment returns in Dubai.',
    goldenVisaEligible: true,
    pros: ['High capital appreciation', 'Prime location', 'Premium amenities'],
    cons: ['High initial investment', 'Subject to market fluctuations'],
    whoShouldBuy: 'High-net-worth individuals and investors seeking luxury assets with strong capital appreciation.',
    whoShouldNotBuy: 'Short-term speculators seeking immediate liquid cash flow.',
    price: 19000000,
    location: 'Business Bay, Dubai',
    community: 'Business Bay',
    developer: 'Binghatti Developers',
    type: 'Penthouse',
    subType: 'Ultra-Luxury Sky Mansion',
    beds: 3,
    baths: 4,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200'
    ],
    description: 'An elite architectural collaboration between Binghatti and automotive giant Bugatti. Bugatti Residences features custom aerodynamic curves, private car lifts delivering your supercar directly to your sky salon, private pools on every balcony, and finishes of Carbon Fiber and Italian Marble.',
    roi: 8.4,
    completionYear: 2026,
    paymentPlan: '60/40 Payment Plan',
    featured: true,
    investmentScore: 98,
    amenities: ['Private Supercar Sky Lift', 'Private Balcony Pool', 'Bugatti Lounge & Club', 'Elite Concierge & Butler', 'Private Spa & Wellness', 'World Class Gym', 'Direct Canal Views', 'Smart Auto-Climate'],
    nearby: {
      schools: ['Dubai Heights Academy (12 mins)'],
      hospitals: ['Emirates Hospital Jumeirah (8 mins)'],
      transport: ['Business Bay Metro Station (3 mins)', 'Water Taxi Station (1 min)']
    },
    floorPlanImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200',
    googleMapUrl: 'https://maps.google.com/maps?q=Business%20Bay,%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    investmentHighlights: ['The world\'s first Bugatti branded residence', 'Supercar car-lift straight to your sky mansion', 'High ROI appreciation of 40% forecasted upon delivery', 'Elite private beach resort experience in Downtown'],
    faqs: [
      { question: 'Does each apartment have a private car elevator?', answer: 'Yes, the signature sky mansion collection includes custom car lifts that allow you to park your vehicles inside your residence.' }
    ]
  }
];

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Tariq Al-Mansoor',
    slug: 'tariq-al-mansoor',
    seoTitle: 'Tariq Al-Mansoor | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Tariq Al-Mansoor.',
    role: 'Managing Partner & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    languages: ['Arabic', 'English', 'French'],
    experience: 18,
    propertiesSold: 420,
    email: 'tariq@goldenlegacy.ae',
    phone: '+971 50 111 2233',
    whatsApp: 'https://wa.me/971501112233'
  },
  {
    id: 'agent-2',
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    seoTitle: 'Elena Rostova | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Elena Rostova.',
    role: 'Director of Luxury Acquisitions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
    languages: ['Russian', 'English', 'German'],
    experience: 12,
    propertiesSold: 280,
    email: 'elena@goldenlegacy.ae',
    phone: '+971 50 444 5566',
    whatsApp: 'https://wa.me/971504445566'
  },
  {
    id: 'agent-3',
    name: 'Marcus Sterling',
    slug: 'marcus-sterling',
    seoTitle: 'Marcus Sterling | Dubai Real Estate',
    seoDescription: 'Explore signature projects and investment opportunities by Marcus Sterling.',
    role: 'Senior Wealth Portfolio Advisor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    languages: ['English', 'Spanish'],
    experience: 10,
    propertiesSold: 195,
    email: 'marcus@goldenlegacy.ae',
    phone: '+971 50 777 8899',
    whatsApp: 'https://wa.me/971507778899'
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'Dubai Golden Visa 2026: Comprehensive Guide for Real Estate Investors',
    slug: 'dubai-golden-visa-2026-comprehensive-guide-for-real-estate-investors',
    category: 'Golden Visa',
    excerpt: 'Discover the latest updates to Dubai\'s 10-year residency visa, eligibility criteria through AED 2 Million property investment, and structural benefits for your family.',
    content: `Dubai remains a beacon for high-net-worth individuals and global entrepreneurs seeking security, prosperity, and premium lifestyle benefits. The prestigious **Dubai Golden Visa** provides long-term, 10-year residency, completely self-sponsored.

### Key Requirements for Real Estate Investors
To qualify for a 10-year Golden Visa through property, you must fulfill the following simplified terms:
1. **Minimum Investment Value**: Fulfill a total acquisition value of **AED 2,000,000** (approx. USD $545,000) or more across one or multiple properties.
2. **Off-Plan Properties**: Properties under construction are fully eligible, provided they are acquired from licensed, certified master developers (such as Emaar, Nakheel, DAMAC).
3. **Mortgages**: Standard bank-financed properties are acceptable, provided the initial equity paid down meets or exceeds AED 2,000,000.
4. **Joint Purchases**: Spouses can share the same purchase to qualify jointly.

### Direct Benefits of the Golden Visa
* **Residency for Family & Dependents**: Sponsor your spouse, children of any age, and domestic staff with full ease.
* **No Maximum Stay**: No requirements to enter Dubai every 180 days to keep your visa active. Stay outside as long as required.
* **Esaad Privilege Card**: Grants golden visa holders exclusive, luxury lifestyle and retail discounts of 15% to 50% across restaurants, premium cars, medical facilities, and hotels.
* **Corporate Ease**: Simplifies corporate bank account openings, personal tax exemptions (0% income tax), and capital repatriation.

At Golden Legacy Real Estate, our certified visa consultants handle the entire process end-to-end, from premium property acquisition to biometrics and card collection within 14 working days.`,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
    date: 'June 20, 2026',
    author: 'Tariq Al-Mansoor',
    readTime: '6 min read'
  },
  {
    id: 'blog-2',
    title: 'Analyzing ROI Trends in Dubai Creek Harbour vs. Palm Jumeirah',
    slug: 'analyzing-roi-trends-in-dubai-creek-harbour-vs-palm-jumeirah',
    category: 'Market Trends',
    excerpt: 'An institutional-grade analysis of rental yields, capital growth indicators, and supply dynamics comparing beachfront luxury with progressive creek master-plans.',
    content: `Dubai's luxury real estate sector continues to outperform London, New York, and Paris in rental yields and capital gains. However, sophisticated investors must distinguish between mature beachfront premiums and progressive, high-potential urban master-planned locations.

### Palm Jumeirah: The Beachfront Premium Benchmark
Palm Jumeirah remains Dubai's trophy asset. Average capital appreciation has risen over **42%** since 2021, driven by ultra-high-net-worth capital seeking safe havens.
* **Average Net Yields**: 6.2% to 7.2%
* **Best Assets**: Signature frond villas and beachfront penthouses.
* **Supply Outlook**: Highly constrained. Frond G is effectively fully built, maintaining an organic luxury ceiling on values.

### Dubai Creek Harbour: The Future Center
Designed as a smart, sustainable waterfront metropolis twice the size of Downtown Dubai, Creek Harbour is currently in its prime growth phase.
* **Average Net Yields**: 7.8% to 8.5%
* **Best Assets**: Waterfront 1-bed and 2-bed apartments.
* **Growth Triggers**: Construction of Creek Beach, pedestrian transit linkages, and upcoming high-end luxury hospitality chains.

### Comparison Table
| Metric | Palm Jumeirah | Dubai Creek Harbour |
| :--- | :--- | :--- |
| **Average Price/Sqft** | AED 3,400 | AED 1,650 |
| **Typical Net Yield** | 6.8% | 8.2% |
| **Appreciation Runway** | Moderate (Stable High) | High (Exponential Growth) |
| **Liquidity Indicator** | Ultra-High | High |

**Verdict**: Investors seeking immediate prestige and physical private beach assets should focus acquisitions on Palm Jumeirah. Conversely, institutional portfolios seeking optimized yield curves and maximum 5-year capital appreciation should allocate capital into Dubai Creek Harbour's off-plan developments.`,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200',
    date: 'May 14, 2026',
    author: 'Elena Rostova',
    readTime: '8 min read'
  },
  {
    id: 'blog-3',
    title: 'Understanding Off-Plan Escrow Accounts and Buyer Protections in Dubai',
    slug: 'understanding-off-plan-escrow-accounts-and-buyer-protections-in-dubai',
    category: 'Buying Guide',
    excerpt: 'Understand how the Dubai Land Department (DLD) and escrow account laws safeguard international property investors with maximum structural safety.',
    content: `A core pillar of Dubai's real estate success is its absolute regulatory transparency. Under Dubai Law No. 8 of 2007, the **Dubai Land Department (DLD)** enforces strict escrow protection mechanisms for all off-plan properties.

### What is an Escrow Account?
Every registered off-plan project in Dubai must maintain a designated Bank Escrow Account registered with the DLD. 
* All buyer payments go **directly into this account**, never to the developer\'s general operating accounts.
* Developer withdrawals are strictly tied to verified physical construction milestones, audited independently by certified DLD engineering inspectors.
* Developers must post a **15% performance bank guarantee** or have completed 15% of physical building structures before launching sales.

This absolute structural safety makes purchasing off-plan in Dubai as secure as buying completed properties, allowing international buyers to profit from entry-level pre-launch pricing with complete peace of mind.`,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    date: 'April 02, 2026',
    author: 'Marcus Sterling',
    readTime: '5 min read'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Can foreign nationals fully own real estate in Dubai?',
    answer: 'Yes, absolutely. Foreign buyers can acquire 100% freehold ownership of properties in designated freehold zones, which include Downtown Dubai, Palm Jumeirah, Dubai Hills Estate, Business Bay, and Dubai Marina. Ownership rights are registered officially with the Dubai Land Department (DLD) and are fully inheritable.',
    category: 'Ownership'
  },
  {
    id: 'faq-2',
    question: 'What taxes are applicable to buying and renting property in Dubai?',
    answer: 'Dubai operates under a 0% personal income and capital gains tax environment. There are no ongoing property taxes or rental income taxes. The only primary transaction fee is the one-off Dubai Land Department (DLD) transfer fee, which is 4% of the property value, typically paid at the time of purchase.',
    category: 'Taxation'
  },
  {
    id: 'faq-3',
    question: 'How does an off-plan payment plan function?',
    answer: 'Off-plan payment plans are interest-free structural installments provided directly by the developer. A common structure is a "60/40" plan, where you pay 60% in staggered blocks tied directly to construction milestones (e.g. 10% on booking, 10% every six months), and the remaining 40% is paid upon keys handover or post-handover over 2-3 years.',
    category: 'Financing'
  },
  {
    id: 'faq-4',
    question: 'What are the school and transport proximity zones like in Dubai hills?',
    answer: 'Dubai Hills Estate is designed as a luxury family community. It hosts GEMS Wellington Academy, GEMS International School, and Kings\' School within the community borders. It features direct road links to Al Khail Road and Umm Suqeim Street, putting Downtown Dubai and Dubai Marina within a 12-to-15 minute driving window.',
    category: 'Communities'
  }
];
