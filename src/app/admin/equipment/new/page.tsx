import { Metadata } from 'next';
import EquipmentFormClient from '../EquipmentFormClient';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Add New Equipment | Admin Dashboard',
  description: 'Add new equipment to the inventory',
};

export default function NewEquipmentPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <EquipmentFormClient />
    </ProtectedRoute>
  );
} 