"use client";

import { useState } from 'react';
import Image from 'next/image';
import { mockEquipment } from '@/lib/equipment';

export default function ImageManagerClient() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract all unique images from all equipment
  const allImages = Array.from(new Set(
    mockEquipment.flatMap(eq => eq.imageSrcs)
  ));

  const handleImageSelect = (imageSrc: string) => {
    setSelectedImages(prev => 
      prev.includes(imageSrc) 
        ? prev.filter(img => img !== imageSrc)
        : [...prev, imageSrc]
    );
  };

  const handleSelectAll = () => {
    setSelectedImages(allImages);
  };

  const handleDeselectAll = () => {
    setSelectedImages([]);
  };

  const handleBulkDelete = () => {
    if (selectedImages.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedImages.length} images? This action cannot be undone.`)) {
      // In a real app, you would delete from the server and update the equipment data
      console.log('Deleting images:', selectedImages);
      setSelectedImages([]);
      // You would also need to update the equipment data to remove these image references
    }
  };

  const getImageUsage = (imageSrc: string) => {
    return mockEquipment.filter(eq => eq.imageSrcs.includes(imageSrc));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
            <p className="text-gray-600 mt-2">Manage and organize equipment images</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Stats and Bulk Actions */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-sm text-gray-500">Total Images:</span>
                <span className="ml-2 font-semibold text-gray-900">{allImages.length}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Selected:</span>
                <span className="ml-2 font-semibold text-gray-900">{selectedImages.length}</span>
              </div>
            </div>
            
            {selectedImages.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDeselectAll}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Deselect All
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                >
                  Delete Selected ({selectedImages.length})
                </button>
              </div>
            )}
            
            {selectedImages.length === 0 && (
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Select All
              </button>
            )}
          </div>
        </div>

        {/* Images Display */}
        {allImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No images found</p>
            <p className="text-gray-400 text-sm mt-2">Upload equipment with images to see them here</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allImages.map((imageSrc, index) => {
              const usage = getImageUsage(imageSrc);
              const isSelected = selectedImages.includes(imageSrc);
              
              return (
                <div
                  key={index}
                  className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                    isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleImageSelect(imageSrc)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={imageSrc}
                      alt={`Equipment image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                    
                    {/* Selection checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleImageSelect(imageSrc)}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    
                    {/* Usage count */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      Used in {usage.length} item{usage.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  {/* Image info */}
                  <div className="p-3 bg-white">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {imageSrc.split('/').pop()}
                    </p>
                    {usage.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {usage[0].name}{usage.length > 1 ? ` +${usage.length - 1} more` : ''}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filename
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Used In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allImages.map((imageSrc, index) => {
                    const usage = getImageUsage(imageSrc);
                    const isSelected = selectedImages.includes(imageSrc);
                    
                    return (
                      <tr
                        key={index}
                        className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleImageSelect(imageSrc)}
                              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 mr-3"
                            />
                            <div className="w-16 h-16 relative">
                              <Image
                                src={imageSrc}
                                alt={`Equipment image ${index + 1}`}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {imageSrc.split('/').pop()}
                          </div>
                          <div className="text-sm text-gray-500">{imageSrc}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {usage.length === 0 ? (
                              <span className="text-red-500">Unused</span>
                            ) : (
                              <div className="space-y-1">
                                {usage.slice(0, 2).map(eq => (
                                  <div key={eq.id} className="text-sm text-gray-600">
                                    {eq.name}
                                  </div>
                                ))}
                                {usage.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{usage.length - 2} more
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this image?')) {
                                console.log('Deleting image:', imageSrc);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 