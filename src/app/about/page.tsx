export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About RR Equipment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            RR Equipment has been a trusted provider of quality equipment for over two decades.
            Our commitment to excellence and customer satisfaction has made us a leader in the industry.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We pride ourselves on offering top-quality products, exceptional customer service,
            and expert guidance to help you find the perfect equipment for your needs.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To provide our customers with the highest quality equipment and unmatched service,
            ensuring their success and satisfaction in every purchase.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>Quality Products</li>
            <li>Expert Support</li>
            <li>Competitive Pricing</li>
            <li>Fast Shipping</li>
            <li>Satisfaction Guaranteed</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 