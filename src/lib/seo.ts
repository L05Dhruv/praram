import { BlogPost } from './blog';
import { Equipment } from '@/types/content';

// Base schema interfaces
export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string;
  };
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
}

export interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image: string[];
  brand: {
    '@type': string;
    name: string;
  };
  manufacturer: {
    '@type': string;
    name: string;
  };
  model: string;
  category: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
    seller: {
      '@type': string;
      name: string;
    };
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
  additionalProperty: Array<{
    '@type': string;
    name: string;
    value: string;
  }>;
}

export interface BlogPostSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string;
  author: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  wordCount?: number;
  keywords?: string[];
  articleSection?: string;
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': string;
    name: string;
  };
  potentialAction: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  servedCuisine?: string[];
  acceptsReservations?: boolean;
}

// Schema generators
export function OrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RR Equipment',
    url: 'https://rrequipment.com',
    logo: 'https://rrequipment.com/images/logo.png',
    description: 'Leading provider of quality construction and industrial equipment for all your project needs. Specializing in excavators, bulldozers, wheel loaders, and heavy machinery.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'info@rrequipment.com',
      areaServed: 'US',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Equipment Drive',
      addressLocality: 'Construction City',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/rrequipment',
      'https://www.twitter.com/rrequipment',
      'https://www.linkedin.com/company/rrequipment',
      'https://www.instagram.com/rrequipment',
    ],
    foundingDate: '2020-01-01',
    numberOfEmployees: '50-100',
  };
}

export function generateProductSchema(equipment: Equipment): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: equipment.name,
    description: equipment.description,
    image: equipment.imageSrcs.map(src => `https://rrequipment.com${src}`),
    brand: {
      '@type': 'Brand',
      name: equipment.manufacturer,
    },
    manufacturer: {
      '@type': 'Organization',
      name: equipment.manufacturer,
    },
    model: equipment.modelNumber,
    category: equipment.category,
    offers: {
      '@type': 'Offer',
      price: equipment.price.toString(),
      priceCurrency: 'USD',
      availability: equipment.condition === 'New' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      seller: {
        '@type': 'Organization',
        name: 'RR Equipment',
      },
    },
    additionalProperty: Object.entries(equipment.specifications).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
  };
}

export function generateBlogPostSchema(post: BlogPost): BlogPostSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://rrequipment.com${post.featuredImage}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://rrequipment.com/authors/${post.author.name.toLowerCase().replace(' ', '-')}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RR Equipment',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rrequipment.com/images/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rrequipment.com/blog/${post.slug}`,
    },
    wordCount: Math.floor(post.content.length / 5), // Rough word count estimation
    keywords: post.tags,
    articleSection: 'Construction Equipment',
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://rrequipment.com${item.url}`,
    })),
  };
}

export function generateWebsiteSchema(): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RR Equipment',
    url: 'https://rrequipment.com',
    description: 'Construction equipment marketplace with excavators, bulldozers, wheel loaders, and heavy machinery',
    publisher: {
      '@type': 'Organization',
      name: 'RR Equipment',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://rrequipment.com/shop?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RR Equipment',
    description: 'Construction equipment sales and rental services',
    url: 'https://rrequipment.com',
    telephone: '+1-555-123-4567',
    email: 'info@rrequipment.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Equipment Drive',
      addressLocality: 'Construction City',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    openingHours: [
      'Mo-Fr 08:00-17:00',
      'Sa 08:00-12:00',
    ],
    priceRange: '$$$$',
  };
}

// SEO Configuration interface
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  robots?: string;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    type: 'website' | 'article';
    url?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    image: string;
    site?: string;
    creator?: string;
  };
  jsonLd?: object[];
}

// Advanced SEO utilities
export function generateSEOTags(config: SEOConfig) {
  const tags = [
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords.join(', ') },
    { name: 'robots', content: config.robots || 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
  ];

  if (config.canonicalUrl) {
    tags.push({ name: 'canonical', content: config.canonicalUrl });
  }

  if (config.openGraph) {
    tags.push(
      { name: 'og:title', content: config.openGraph.title },
      { name: 'og:description', content: config.openGraph.description },
      { name: 'og:image', content: config.openGraph.image },
      { name: 'og:type', content: config.openGraph.type },
      { name: 'og:site_name', content: config.openGraph.siteName || 'RR Equipment' },
      { name: 'og:locale', content: config.openGraph.locale || 'en_US' }
    );

    if (config.openGraph.url) {
      tags.push({ name: 'og:url', content: config.openGraph.url });
    }
  }

  if (config.twitter) {
    tags.push(
      { name: 'twitter:card', content: config.twitter.card },
      { name: 'twitter:title', content: config.twitter.title },
      { name: 'twitter:description', content: config.twitter.description },
      { name: 'twitter:image', content: config.twitter.image }
    );

    if (config.twitter.site) {
      tags.push({ name: 'twitter:site', content: config.twitter.site });
    }

    if (config.twitter.creator) {
      tags.push({ name: 'twitter:creator', content: config.twitter.creator });
    }
  }

  return tags;
}

// SEO constants
export const SEO_CONSTANTS = {
  SITE_NAME: 'RR Equipment',
  SITE_URL: 'https://rrequipment.com',
  SITE_DESCRIPTION: 'Leading provider of construction and industrial equipment including excavators, bulldozers, wheel loaders, and heavy machinery.',
  DEFAULT_IMAGE: '/images/og-default.jpg',
  TWITTER_HANDLE: '@rrequipment',
  FACEBOOK_APP_ID: '123456789',
  LOGO_URL: '/images/logo.png',
  ORGANIZATION_NAME: 'RR Equipment',
  DEFAULT_KEYWORDS: [
    'construction equipment',
    'heavy machinery',
    'excavators',
    'bulldozers',
    'wheel loaders',
    'industrial equipment',
    'equipment rental',
    'equipment sales',
    'construction machinery',
    'heavy equipment'
  ],
  LEGAL_KEYWORDS: [
    'equipment rental terms',
    'machinery sales',
    'construction equipment policies',
    'heavy equipment rental',
    'industrial machinery',
    'equipment warranty',
    'rental agreement',
    'equipment purchase',
    'machinery maintenance',
    'safety guidelines'
  ],
};

// Helper functions for specific page types
export function generatePageSEO(
  title: string,
  description: string,
  path: string,
  image?: string,
  type: 'website' | 'article' = 'website',
  additionalKeywords: string[] = []
): SEOConfig {
  const keywords = [...SEO_CONSTANTS.DEFAULT_KEYWORDS, ...additionalKeywords];
  const canonicalUrl = `${SEO_CONSTANTS.SITE_URL}${path}`;
  const ogImage = image || SEO_CONSTANTS.DEFAULT_IMAGE;

  return {
    title: `${title} | ${SEO_CONSTANTS.SITE_NAME}`,
    description,
    keywords,
    canonicalUrl,
    openGraph: {
      title,
      description,
      image: ogImage.startsWith('http') ? ogImage : `${SEO_CONSTANTS.SITE_URL}${ogImage}`,
      type,
      url: canonicalUrl,
      siteName: SEO_CONSTANTS.SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: ogImage.startsWith('http') ? ogImage : `${SEO_CONSTANTS.SITE_URL}${ogImage}`,
      site: SEO_CONSTANTS.TWITTER_HANDLE,
    },
  };
}

export function generateProductPageSEO(equipment: Equipment): SEOConfig {
  const keywords = [
    equipment.name,
    equipment.manufacturer,
    equipment.category,
    equipment.condition,
    equipment.modelNumber,
    ...equipment.features.slice(0, 5), // First 5 features as keywords
  ];

  return generatePageSEO(
    equipment.name,
    equipment.description,
    `/shop/${equipment.id}`,
    equipment.imageSrcs[0],
    'website',
    keywords
  );
}

export function generateBlogPageSEO(post: BlogPost): SEOConfig {
  return generatePageSEO(
    post.title,
    post.excerpt,
    `/blog/${post.slug}`,
    post.featuredImage,
    'article',
    post.tags
  );
}

export function generatePrivacyPolicySEO(): SEOConfig {
  return generatePageSEO(
    'Privacy Policy',
    'Learn how RR Equipment protects and handles your personal information, data collection practices, and privacy measures.',
    '/privacy-policy',
    undefined,
    'website',
    [
      'privacy policy',
      'data protection',
      'personal information',
      'data security',
      'user privacy',
      'information collection',
      'data handling',
      'privacy measures',
      ...SEO_CONSTANTS.LEGAL_KEYWORDS
    ]
  );
}

export function generateTermsAndConditionsSEO(): SEOConfig {
  return generatePageSEO(
    'Terms and Conditions',
    'Read the terms and conditions for using RR Equipment services, including equipment rental, sales, and website usage guidelines.',
    '/terms-and-conditions',
    undefined,
    'website',
    [
      'terms and conditions',
      'service terms',
      'usage guidelines',
      'legal terms',
      'equipment rental terms',
      'sales conditions',
      'service agreement',
      'user agreement',
      ...SEO_CONSTANTS.LEGAL_KEYWORDS
    ]
  );
}

export function generateRefundPolicySEO(): SEOConfig {
  return generatePageSEO(
    'Refund Policy',
    'Understand RR Equipment refund and return policies for equipment purchases and rentals, including eligibility and process.',
    '/refund-policy',
    undefined,
    'website',
    [
      'refund policy',
      'return policy',
      'equipment returns',
      'refund process',
      'return eligibility',
      'purchase returns',
      'rental refunds',
      'money back guarantee',
      ...SEO_CONSTANTS.LEGAL_KEYWORDS
    ]
  );
} 