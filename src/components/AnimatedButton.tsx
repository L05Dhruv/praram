"use client";

import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-white text-primary-600 hover:bg-primary-50',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
};

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center
        font-medium rounded-lg transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.div>
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {children}
        </motion.span>
      )}
    </motion.button>
  );
} 