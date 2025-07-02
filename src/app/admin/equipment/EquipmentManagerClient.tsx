"use client";

import { useState } from 'react';
import { mockEquipment } from '@/lib/equipment';
import { Equipment } from '@/types/content';
import Link from 'next/link';
import Image from 'next/image';

export default function EquipmentManagerClient() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(equipment.map(eq => eq.category))];

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || eq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      setEquipment(prev => prev.filter(eq => eq.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
            <p className="text-gray-600 mt-2">Manage your equipment inventory</p>
          </div>
          <Link
            href="/admin/equipment/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Equipment
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Equipment
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Equipment List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEquipment.map(eq => (
            <div key={eq.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={eq.imageSrcs[0] || '/images/placeholder-equipment.jpg'}
                  alt={eq.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{eq.name}</h3>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">{eq.condition}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{eq.manufacturer} • {eq.category}</p>
                <p className="text-xl font-bold text-green-600 mb-4">
                  ${eq.price.toLocaleString()}
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/equipment/${eq.id}/edit`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(eq.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No equipment found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 