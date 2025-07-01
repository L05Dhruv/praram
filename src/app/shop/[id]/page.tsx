import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEquipmentById, mockEquipment } from '@/lib/equipment';
import { generateProductSchema, generateProductPageSEO, generateBreadcrumbSchema } from '@/lib/seo';
import ProductPageClient from './ProductPageClient';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return mockEquipment.map((equipment) => ({
    id: equipment.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const equipment = getEquipmentById(params.id);

  if (!equipment) {
    return {
      title: 'Product Not Found',
    };
  }

  const seoConfig = generateProductPageSEO(equipment);

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: seoConfig.openGraph,
    twitter: seoConfig.twitter,
    alternates: {
      canonical: seoConfig.canonicalUrl,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const equipment = getEquipmentById(params.id);

  if (!equipment) {
    notFound();
  }

  // Generate structured data
  const productSchema = generateProductSchema(equipment);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: equipment.category, url: `/shop?category=${encodeURIComponent(equipment.category)}` },
    { name: equipment.name, url: `/shop/${equipment.id}` },
  ]);

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductPageClient equipment={equipment} />
    </>
  );
} 