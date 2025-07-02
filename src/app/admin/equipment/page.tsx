import { Metadata } from 'next';
import EquipmentManagerClient from './EquipmentManagerClient';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Manage Equipment | Admin Dashboard',
  description: 'Manage your equipment inventory',
};

export default function EquipmentManagerPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <EquipmentManagerClient />
    </ProtectedRoute>
  );
} 