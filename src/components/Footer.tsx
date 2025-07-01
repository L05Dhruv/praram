import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">RR Equipment</h3>
            <p className="text-gray-600 dark:text-gray-400">Quality equipment for all your needs</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">Email: info@rrequipment.com</p>
            <p className="text-gray-600 dark:text-gray-400">Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy-policy" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} RR Equipment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}