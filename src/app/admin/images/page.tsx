import { Metadata } from 'next';
import ImageManagerClient from './ImageManagerClient';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Image Management | Admin Dashboard',
  description: 'Manage and organize equipment images',
};

export default function ImageManagerPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ImageManagerClient />
    </ProtectedRoute>
  );
} 