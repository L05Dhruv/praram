import { useState, useCallback } from 'react';

export interface FormConfig<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  clearErrors: () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: FormConfig<T>): UseFormReturn<T> {
  const [values, setFormValues] = useState<T>(initialValues);
  const [errors, setFormErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setFormValues(prev => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setFormErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setFormErrors({});
  }, []);

  const validateForm = useCallback(() => {
    if (!validate) return {};
    return validate(values);
  }, [validate, values]);

  const isValid = Object.keys(validateForm()).length === 0;

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const validationErrors = validateForm();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission errors here
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, onSubmit, values]);

  const reset = useCallback(() => {
    setFormValues(initialValues);
    setFormErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    setValue,
    setValues,
    setError,
    clearErrors,
    handleSubmit,
    reset,
  };
} 