import { Property, Developer, Community, Blog } from '../types';

export const SITE_URL = 'https://www.goldenlegacy.ae'; // Production URL

export function generatePropertySchema(property: Property) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['Product', 'RealEstateListing', 'SingleFamilyResidence'],
    name: property.title,
    description: property.seoDescription || property.description,
    image: property.images.map(img => SITE_URL + (img.startsWith('/') ? img : '/' + img)),
    brand: {
      '@type': 'Brand',
      name: property.developer
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AED',
      price: property.price,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/property/${property.slug}`
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: property.community,
      addressCountry: 'AE'
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.sqft,
      unitCode: 'FTK'
    }
  });
}

export function generateDeveloperSchema(developer: Developer) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: developer.name,
    url: `${SITE_URL}/developer/${developer.slug}`,
    logo: developer.logo,
    description: developer.seoDescription || developer.description,
    foundingDate: developer.founded?.toString()
  });
}

export function generateCommunitySchema(community: Community) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: community.name,
    url: `${SITE_URL}/community/${community.slug}`,
    image: community.image,
    description: community.seoDescription || community.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE'
    }
  });
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  });
}

export function generateGlobalSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness', 'Organization'],
    name: 'Golden Legacy Real Estate',
    legalName: 'Golden Legacy Real Estate Brokerage',
    description: 'Golden Legacy Real Estate is a leading property investment and real estate agency in Dubai, specializing in luxury apartments, off-plan projects, and waterfront properties. We guide international investors and local buyers through Dubai real estate investments, providing expert advice on the Golden Visa, high ROI properties, and premier communities like Dubai Marina, Downtown Dubai, and Palm Jumeirah.',
    image: `${SITE_URL}/assets/photos/logo.png`,
    '@id': `${SITE_URL}`,
    url: `${SITE_URL}`,
    telephone: '+971554740389',
    email: 'info@goldenlegacy.ae',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '00000',
      addressCountry: 'AE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1857,
      longitude: 55.2721
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://www.instagram.com/goldenlegacy',
      'https://www.linkedin.com/company/goldenlegacy',
      'https://twitter.com/goldenlegacy',
      'https://www.facebook.com/goldenlegacy'
    ],
    priceRange: '$$$$'
  });
}

export function injectSchema(schemaString: string | null, id: string) {
  if (!schemaString) return;
  
  let script = document.getElementById(id) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.text = schemaString;
}
