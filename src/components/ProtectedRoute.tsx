"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({ children, requiredRole = 'user' }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
        return;
      }

      if (requiredRole === 'admin' && user.role !== 'admin') {
        // For demo purposes, we'll allow access if no user is authenticated
        // In a real app, you'd redirect to an unauthorized page
        router.push('/');
        return;
      }

      setIsAuthorized(true);
    }
  }, [user, loading, requiredRole, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state for admin routes
  if (!user && requiredRole === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">
            You need admin privileges to access this page. Please sign in with an admin account.
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // For demo purposes, if no user is authenticated but we're in development,
  // allow access to admin routes (you can remove this in production)
  if (!user && requiredRole === 'admin' && process.env.NODE_ENV === 'development') {
    console.warn('Demo mode: Allowing admin access without authentication');
    return <>{children}</>;
  }

  // If user is authenticated and authorized, show the protected content
  if (isAuthorized || (!user && process.env.NODE_ENV === 'development')) {
    return <>{children}</>;
  }

  // Default fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Checking permissions...</p>
      </div>
    </div>
  );
} 