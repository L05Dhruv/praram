import { Metadata } from 'next';
import { mockEquipment } from '@/lib/equipment';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop Equipment | RR Equipment - Construction Equipment for Sale',
  description: 'Browse our extensive collection of construction equipment including excavators, bulldozers, wheel loaders, and more. Quality equipment from top manufacturers.',
  keywords: 'construction equipment, excavators, bulldozers, wheel loaders, heavy machinery, construction equipment for sale',
  openGraph: {
    title: 'RR Equipment Shop - Construction Equipment for Sale',
    description: 'Browse our extensive collection of construction equipment from top manufacturers.',
    type: 'website',
    url: 'https://rrequipment.com/shop',
    images: [
      {
        url: '/images/shop-og.jpg',
        width: 1200,
        height: 630,
        alt: 'RR Equipment Shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RR Equipment Shop',
    description: 'Browse our extensive collection of construction equipment.',
    images: ['/images/shop-og.jpg'],
  },
};

export default function ShopPage() {
  return <ShopPageClient equipment={mockEquipment} />;
} 