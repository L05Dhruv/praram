'use client';

import { motion } from 'framer-motion';
import { useSendEmail, useForm } from '@/hooks';
import AnimatedButton from './AnimatedButton';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  equipmentId?: string;
}

interface ContactFormProps {
  equipmentId?: string;
  equipmentName?: string;
}

export function ContactForm({ equipmentId, equipmentName }: ContactFormProps) {
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
      subject: equipmentName ? `Inquiry about ${equipmentName}` : '',
      message: '',
      equipmentId,
    },
    validate: validateForm,
    onSubmit: async (formData: ContactFormData) => {
      const emailData = {
        to: 'contact@rrequipment.com', // Your company email
        subject: formData.subject,
        message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
${equipmentName ? `Equipment: ${equipmentName}` : ''}

Message:
${formData.message}
        `,
        name: formData.name,
        phone: formData.phone,
        equipmentId: formData.equipmentId,
      };

      const result = await sendEmail(emailData);
      
      if (result.success) {
        resetForm();
        reset();
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {equipmentName ? `Inquire About ${equipmentName}` : 'Contact Us'}
      </h2>

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
            rows={5}
            value={values.message}
            onChange={(e) => setValue('message', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please provide details about your inquiry..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          <AnimatedButton
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              reset();
            }}
            disabled={isSubmitting || isLoading}
          >
            Reset
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
  );
} 