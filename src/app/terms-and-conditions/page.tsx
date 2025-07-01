import { Metadata } from 'next';
import { generateTermsAndConditionsSEO } from '@/lib/seo';

export const metadata: Metadata = generateTermsAndConditionsSEO();

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Terms and Conditions
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          By accessing and using RR Equipment&apos;s website and services, you agree to be bound by these Terms and Conditions. 
          Our equipment sales and rental services are subject to availability and pricing may vary based on market conditions. 
          All transactions must be completed in accordance with our payment terms, and customers are responsible for proper 
          equipment usage and maintenance during rental periods. We reserve the right to modify these terms at any time, 
          and continued use of our services constitutes acceptance of any changes.
        </p>
      </div>
    </div>
  );
} 