import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | RR Equipment - Industry Insights and Equipment News',
  description: 'Stay updated with the latest industry insights, equipment reviews, maintenance tips, and construction industry news from RR Equipment.',
  keywords: 'construction equipment, industry news, equipment maintenance, construction tips, heavy machinery',
  openGraph: {
    title: 'RR Equipment Blog - Industry Insights and Equipment News',
    description: 'Stay updated with the latest industry insights, equipment reviews, and construction industry news.',
    type: 'website',
    url: 'https://rrequipment.com/blog',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'RR Equipment Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RR Equipment Blog - Industry Insights',
    description: 'Stay updated with the latest industry insights and equipment news.',
    images: ['/images/blog-og.jpg'],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogPageClient posts={posts} />;
} 