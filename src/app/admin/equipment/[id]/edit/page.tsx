import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEquipmentById } from '@/lib/equipment';
import EquipmentFormClient from '../../EquipmentFormClient';
import ProtectedRoute from '@/components/ProtectedRoute';

interface EditEquipmentPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EditEquipmentPageProps): Promise<Metadata> {
  const equipment = getEquipmentById(params.id);
  
  return {
    title: equipment ? `Edit ${equipment.name} | Admin Dashboard` : 'Equipment Not Found',
    description: equipment ? `Edit ${equipment.name} equipment information` : 'Equipment not found',
  };
}

export default function EditEquipmentPage({ params }: EditEquipmentPageProps) {
  const equipment = getEquipmentById(params.id);

  if (!equipment) {
    notFound();
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <EquipmentFormClient equipment={equipment} isEditing={true} />
    </ProtectedRoute>
  );
} 