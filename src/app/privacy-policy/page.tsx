import { Metadata } from 'next';
import { generatePrivacyPolicySEO } from '@/lib/seo';

export const metadata: Metadata = generatePrivacyPolicySEO();

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          At RR Equipment, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy outlines how we collect, use, store, and protect your data when you visit our website or use our services. 
          We only collect information necessary to provide you with excellent service and will never share your personal data with 
          third parties without your explicit consent, except as required by law. Your trust is important to us, and we maintain 
          strict security measures to safeguard your information.
        </p>
      </div>
    </div>
  );
}
