"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Equipment } from '@/types/content';
import { getAllCategories } from '@/lib/equipment';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }   
  }
};

interface ShopPageClientProps {
  equipment: Equipment[];
}

export default function ShopPageClient({ equipment }: ShopPageClientProps) {
  const [filteredEquipment, setFilteredEquipment] = useState(equipment);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...getAllCategories()];
  const conditions = ['All', 'New', 'Used', 'Refurbished'];

  const handleFilter = (category: string, condition: string, sort: string) => {
    let filtered = equipment;

    if (category !== 'All') {
      filtered = filtered.filter(item => item.category === category);
    }

    if (condition !== 'All') {
      filtered = filtered.filter(item => item.condition === condition);
    }

    // Sort the filtered results
    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year':
          return b.yearManufactured - a.yearManufactured;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredEquipment(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleFilter(category, selectedCondition, sortBy);
  };

  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition);
    handleFilter(selectedCategory, condition, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    handleFilter(selectedCategory, selectedCondition, sort);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary-600 to-primary-800 py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Shop Equipment
          </motion.h1>
          <motion.p 
            className="text-xl text-primary-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Find the perfect construction equipment for your project from our extensive inventory
          </motion.p>
        </div>
      </motion.section>

      {/* Filters Section */}
      <motion.section 
        className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Condition
                </label>
                <select
                  value={selectedCondition}
                  onChange={(e) => handleConditionChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year">Newest First</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredEquipment.length} of {equipment.length} items
            </div>
          </div>
        </div>
      </motion.section>

      {/* Equipment Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredEquipment.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/shop/${item.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <Image
                          src={item.imageSrcs[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      
                      {/* Condition Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.condition === 'New' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : item.condition === 'Used'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {item.condition}
                        </span>
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {item.name}
                      </h3>

                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <p>{item.manufacturer} • {item.yearManufactured}</p>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Specifications */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Engine Power:</span>
                          <span className="font-medium">{item.specifications['Engine Power'] || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {formatPrice(item.price)}
                        </span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-primary-600 dark:text-primary-400"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredEquipment.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-medium mb-2">No equipment found</h3>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
} 