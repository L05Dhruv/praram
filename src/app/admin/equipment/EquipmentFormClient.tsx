"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Equipment } from '@/types/content';
import ImageUpload from '@/components/admin/ImageUpload';

interface EquipmentFormProps {
  equipment?: Equipment;
  isEditing?: boolean;
}

export default function EquipmentFormClient({ equipment, isEditing = false }: EquipmentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    description: '',
    price: 0,
    imageSrcs: [],
    category: '',
    condition: 'New',
    manufacturer: '',
    modelNumber: '',
    yearManufactured: new Date().getFullYear(),
    specifications: {},
    features: [],
  });

  const [specifications, setSpecifications] = useState<Array<{key: string, value: string}>>([
    { key: '', value: '' }
  ]);
  const [features, setFeatures] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (equipment && isEditing) {
      setFormData(equipment);
      setSpecifications(
        Object.entries(equipment.specifications).map(([key, value]) => ({ key, value }))
      );
      setFeatures(equipment.features);
    }
  }, [equipment, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'yearManufactured' ? Number(value) : value
    }));
  };

  const handleImagesChange = (imageSrcs: string[]) => {
    setFormData(prev => ({ ...prev, imageSrcs }));
  };

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert specifications array to object
      const specsObject = specifications.reduce((acc, spec) => {
        if (spec.key && spec.value) {
          acc[spec.key] = spec.value;
        }
        return acc;
      }, {} as Record<string, string>);

      // Filter out empty features
      const validFeatures = features.filter(feature => feature.trim() !== '');

      const equipmentData: Equipment = {
        id: equipment?.id || `eq-${Date.now()}`,
        ...formData as Equipment,
        specifications: specsObject,
        features: validFeatures,
      };

      // Here you would normally send to your API
      console.log('Equipment data:', equipmentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/admin/equipment');
    } catch (error) {
      console.error('Error saving equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Excavators',
    'Wheel Loaders',
    'Bulldozers',
    'Articulated Haulers',
    'Mobile Cranes',
    'Skid Steers',
    'Compactors',
    'Graders',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update equipment information' : 'Add new equipment to your inventory'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturer *
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  required
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="modelNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Model Number *
                </label>
                <input
                  type="text"
                  id="modelNumber"
                  name="modelNumber"
                  required
                  value={formData.modelNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="yearManufactured" className="block text-sm font-medium text-gray-700 mb-2">
                  Year Manufactured *
                </label>
                <input
                  type="number"
                  id="yearManufactured"
                  name="yearManufactured"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.yearManufactured}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Equipment Images</h2>
            <ImageUpload
              images={formData.imageSrcs || []}
              onImagesChange={handleImagesChange}
              maxImages={5}
            />
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
            {specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Specification name (e.g., Operating Weight)"
                  value={spec.key}
                  onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Value (e.g., 20,200 kg)"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Specification
            </button>
          </div>

          {/* Features */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Feature (e.g., Advanced hydraulic system)"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Feature
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Equipment' : 'Add Equipment')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 