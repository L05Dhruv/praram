'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useSendEmail } from '@/hooks';
import AnimatedButton from '@/components/AnimatedButton';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sendEmail, isLoading, error, isSuccess, reset } = useSendEmail();

  const validateForm = (values: ContactFormData) => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const {
    values,
    errors,
    isSubmitting,
    setValue,
    handleSubmit,
    reset: resetForm,
  } = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    },
    validate: validateForm,
    onSubmit: async (formData: ContactFormData) => {
      const emailData = {
        to: 'contact@rrequipment.com',
        subject: formData.subject,
        message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}
        `,
        name: formData.name,
        phone: formData.phone,
      };

      const result = await sendEmail(emailData);
      
      if (result.success) {
        resetForm();
        reset();
        setTimeout(() => setIsModalOpen(false), 2000); // Close modal after 2 seconds
      }
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
    resetForm();
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    reset();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          About RR Equipment
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              RR Equipment has been a trusted provider of quality equipment for over two decades.
              Our commitment to excellence and customer satisfaction has made us a leader in the industry.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We pride ourselves on offering top-quality products, exceptional customer service,
              and expert guidance to help you find the perfect equipment for your needs.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
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
          </motion.div>
        </div>

        {/* Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Have questions about our equipment or need expert advice? 
            We&apos;re here to help you find the perfect solution for your needs.
          </p>
          <AnimatedButton
            variant="primary"
            size="lg"
            onClick={openModal}
            className="shadow-lg"
          >
            Contact Us Today
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contact Us
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md"
                >
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md"
                >
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={values.name}
                    onChange={(e) => setValue('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={(e) => setValue('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={values.phone}
                    onChange={(e) => setValue('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={values.subject}
                    onChange={(e) => setValue('subject', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="What can we help you with?"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => setValue('message', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <AnimatedButton
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    disabled={isSubmitting || isLoading}
                  >
                    Cancel
                  </AnimatedButton>
                  
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting || isLoading}
                    disabled={isSubmitting || isLoading}
                  >
                    Send Message
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 