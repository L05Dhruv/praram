"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedButton from '@/components/AnimatedButton';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRetryAfter(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);

      // Check if it's a rate limiting error
      if (errorMessage.includes('Too many login attempts')) {
        // Extract retry time if available (this would come from the API response)
        const retryMatch = errorMessage.match(/try again in (\d+) seconds/);
        if (retryMatch) {
          setRetryAfter(parseInt(retryMatch[1]));
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Format retry time display
  const formatRetryTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} seconds`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes > 1 ? 's' : ''}${remainingSeconds > 0 ? ` and ${remainingSeconds} seconds` : ''}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Demo Credentials:</h3>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Admin:</strong> admin@example.com / admin123<br/>
              <strong>User:</strong> user@example.com / user123
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className={`rounded-md p-4 ${error.includes('Too many login attempts') 
              ? 'bg-orange-50 dark:bg-orange-900/30' 
              : 'bg-red-50 dark:bg-red-900/30'
            }`}>
              <div className={`text-sm ${error.includes('Too many login attempts')
                ? 'text-orange-700 dark:text-orange-200'
                : 'text-red-700 dark:text-red-200'
              }`}>
                {error}
                {retryAfter && (
                  <div className="mt-2 text-xs">
                    Please wait {formatRetryTime(retryAfter)} before trying again.
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <AnimatedButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading || (retryAfter !== null && retryAfter > 0)}
            >
              {retryAfter && retryAfter > 0 ? `Wait ${retryAfter}s` : 'Sign in'}
            </AnimatedButton>
          </div>
        </form>
      </div>
    </div>
  );
} 