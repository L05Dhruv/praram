import { Metadata } from 'next';
import { generateRefundPolicySEO } from '@/lib/seo';

export const metadata: Metadata = generateRefundPolicySEO();

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Refund Policy
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          RR Equipment offers a comprehensive refund policy to ensure customer satisfaction with all equipment purchases and rentals. 
          Equipment purchases may be returned within 30 days of delivery in original condition for a full refund, minus shipping costs. 
          Rental equipment must be returned in the same condition as received, with any damages assessed according to our damage policy. 
          Custom orders and specialized equipment may have different return conditions. We strive to resolve all refund requests 
          promptly and fairly, typically processing approved refunds within 5-7 business days.
        </p>
      </div>
    </div>
  );
} 