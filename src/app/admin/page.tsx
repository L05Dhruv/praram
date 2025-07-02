import { Metadata } from 'next';
import { mockEquipment } from '@/lib/equipment';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Admin Dashboard | RR Equipment',
  description: 'Admin dashboard for managing equipment and content',
};

export default function AdminDashboard() {
  const totalEquipment = mockEquipment.length;
  const totalValue = mockEquipment.reduce((sum, eq) => sum + eq.price, 0);
  const categories = [...new Set(mockEquipment.map(eq => eq.category))].length;

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your equipment inventory and content</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">Total Equipment</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalEquipment}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{categories}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/admin/equipment"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🚜</div>
                  <h3 className="font-semibold text-gray-900">Manage Equipment</h3>
                  <p className="text-sm text-gray-600 mt-1">View, edit, and delete equipment</p>
                </div>
              </Link>
              
              <Link
                href="/admin/equipment/new"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">➕</div>
                  <h3 className="font-semibold text-gray-900">Add New Equipment</h3>
                  <p className="text-sm text-gray-600 mt-1">Upload new equipment with images</p>
                </div>
              </Link>
              
              <Link
                href="/admin/images"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🖼️</div>
                  <h3 className="font-semibold text-gray-900">Manage Images</h3>
                  <p className="text-sm text-gray-600 mt-1">Upload and organize images</p>
                </div>
              </Link>
              
              <Link
                href="/admin/security"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 className="font-semibold text-gray-900">Security Monitor</h3>
                  <p className="text-sm text-gray-600 mt-1">Monitor login attempts and blocked IPs</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 