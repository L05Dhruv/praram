import { Metadata } from 'next';
import SecurityMonitorClient from './SecurityMonitorClient';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Security Monitor | Admin Dashboard',
  description: 'Monitor security events and rate limiting',
};

export default function SecurityMonitorPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <SecurityMonitorClient />
    </ProtectedRoute>
  );
} 