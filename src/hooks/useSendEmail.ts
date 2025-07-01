import { useState } from 'react';

export interface EmailData {
  to: string;
  subject: string;
  message: string;
  name?: string;
  phone?: string;
  equipmentId?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

export interface UseEmailReturn {
  sendEmail: (data: EmailData) => Promise<EmailResponse>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  reset: () => void;
}

export function useSendEmail(): UseEmailReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Validate email data
      if (!data.to || !data.subject || !data.message) {
        throw new Error('Missing required email fields');
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.to)) {
        throw new Error('Invalid email address');
      }

      // API call to send email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }

      const result: EmailResponse = await response.json();
      
      setIsSuccess(true);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsSuccess(false);
    setIsLoading(false);
  };

  return {
    sendEmail,
    isLoading,
    error,
    isSuccess,
    reset,
  };
} 