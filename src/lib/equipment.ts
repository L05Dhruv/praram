import { Equipment } from '@/types/content';

export const mockEquipment: Equipment[] = [
  {
    id: 'eq-001',
    name: 'CAT 320D2 Excavator',
    description: 'Powerful hydraulic excavator perfect for heavy construction, excavation, and demolition projects. Features advanced hydraulic system and comfortable operator cabin.',
    price: 285000,
    imageSrcs: [
      '/images/equipment/cat-320d2-main.jpg',
      '/images/equipment/cat-320d2-side.jpg',
      '/images/equipment/cat-320d2-interior.jpg',
      '/images/equipment/cat-320d2-action.jpg'
    ],
    category: 'Excavators',
    condition: 'New',
    manufacturer: 'Caterpillar',
    modelNumber: '320D2',
    yearManufactured: 2023,
    specifications: {
      'Operating Weight': '20,200 kg (44,534 lb)',
      'Engine Power': '122 kW (164 hp)',
      'Max Digging Depth': '6.52 m (21 ft 5 in)',
      'Max Reach': '9.66 m (31 ft 8 in)',
      'Bucket Capacity': '0.93 m³ (1.22 yd³)',
      'Travel Speed': '5.5 km/h (3.4 mph)',
      'Fuel Tank Capacity': '410 L (108 gal)'
    },
    features: [
      'Advanced hydraulic system',
      'Comfortable ROPS/FOPS certified cabin',
      'Fuel-efficient C4.4 ACERT engine',
      'Easy maintenance access',
      'Joystick steering',
      'LED lighting package',
      'Grade control ready'
    ]
  },
  {
    id: 'eq-002',
    name: 'John Deere 544K Wheel Loader',
    description: 'Versatile wheel loader designed for loading, stockpiling, and truck loading operations. Excellent visibility and powerful performance for various applications.',
    price: 195000,
    imageSrcs: [
      '/images/equipment/jd-544k-main.jpg',
      '/images/equipment/jd-544k-side.jpg',
      '/images/equipment/jd-544k-bucket.jpg'
    ],
    category: 'Wheel Loaders',
    condition: 'Used',
    manufacturer: 'John Deere',
    modelNumber: '544K',
    yearManufactured: 2021,
    specifications: {
      'Operating Weight': '16,783 kg (36,990 lb)',
      'Engine Power': '130 kW (174 hp)',
      'Bucket Capacity': '2.7 m³ (3.5 yd³)',
      'Max Dump Height': '2.8 m (9 ft 2 in)',
      'Max Reach': '1.2 m (3 ft 11 in)',
      'Travel Speed': '40 km/h (25 mph)',
      'Turning Radius': '5.2 m (17 ft 1 in)'
    },
    features: [
      'PowerTech PSS 6.8L engine',
      'Electrohydraulic controls',
      'Panoramic visibility',
      'Load sensing hydraulics',
      'Automatic transmission',
      'Integrated work tool carrier',
      'Comfortable operator station'
    ]
  },
  {
    id: 'eq-003',
    name: 'Komatsu D65PX-18 Bulldozer',
    description: 'Heavy-duty bulldozer for earthmoving, grading, and site preparation. Features advanced blade control and excellent fuel efficiency.',
    price: 420000,
    imageSrcs: [
      '/images/equipment/komatsu-d65px-main.jpg',
      '/images/equipment/komatsu-d65px-blade.jpg',
      '/images/equipment/komatsu-d65px-tracks.jpg'
    ],
    category: 'Bulldozers',
    condition: 'New',
    manufacturer: 'Komatsu',
    modelNumber: 'D65PX-18',
    yearManufactured: 2023,
    specifications: {
      'Operating Weight': '20,730 kg (45,700 lb)',
      'Engine Power': '141 kW (189 hp)',
      'Blade Capacity': '4.3 m³ (5.6 yd³)',
      'Ground Pressure': '55.9 kPa (8.1 psi)',
      'Travel Speed': '11.2 km/h (7.0 mph)',
      'Fuel Tank Capacity': '370 L (98 gal)',
      'Track Length': '3,320 mm (131 in)'
    },
    features: [
      'SAA6D114E-6 engine',
      'Hydrostatic transmission',
      'KOMTRAX monitoring system',
      'Auto blade assist',
      'ROPS/FOPS cabin',
      'LED work lights',
      'Eco guidance system'
    ]
  },
  {
    id: 'eq-004',
    name: 'Volvo A40G Articulated Hauler',
    description: 'All-terrain articulated hauler for efficient material transport in challenging conditions. Superior traction and stability.',
    price: 625000,
    imageSrcs: [
      '/images/equipment/volvo-a40g-main.jpg',
      '/images/equipment/volvo-a40g-dumping.jpg',
      '/images/equipment/volvo-a40g-interior.jpg'
    ],
    category: 'Articulated Haulers',
    condition: 'New',
    manufacturer: 'Volvo',
    modelNumber: 'A40G',
    yearManufactured: 2023,
    specifications: {
      'Max Payload': '38,000 kg (83,776 lb)',
      'Heaped Capacity': '24 m³ (31.4 yd³)',
      'Engine Power': '350 kW (469 hp)',
      'Max Speed': '55 km/h (34 mph)',
      'Fuel Tank Capacity': '620 L (164 gal)',
      'Ground Clearance': '495 mm (19.5 in)',
      'Approach Angle': '25°'
    },
    features: [
      'Volvo D13K engine',
      'Automatic transmission',
      'All-wheel drive',
      'Load sensing hydraulics',
      'Hill assist',
      'Contronic display',
      'Tailgate options'
    ]
  },
  {
    id: 'eq-005',
    name: 'Liebherr LTM 1050-3.1 Mobile Crane',
    description: 'All-terrain mobile crane with excellent lifting capacity and reach. Perfect for construction and industrial lifting applications.',
    price: 890000,
    imageSrcs: [
      '/images/equipment/liebherr-ltm1050-main.jpg',
      '/images/equipment/liebherr-ltm1050-extended.jpg',
      '/images/equipment/liebherr-ltm1050-cabin.jpg'
    ],
    category: 'Mobile Cranes',
    condition: 'Used',
    manufacturer: 'Liebherr',
    modelNumber: 'LTM 1050-3.1',
    yearManufactured: 2020,
    specifications: {
      'Max Lifting Capacity': '50,000 kg (110,231 lb)',
      'Main Boom Length': '36 m (118 ft)',
      'Max System Length': '56 m (184 ft)',
      'Engine Power': '270 kW (362 hp)',
      'Travel Speed': '85 km/h (53 mph)',
      'Fuel Tank Capacity': '400 L (106 gal)',
      'Axle Configuration': '3-axle'
    },
    features: [
      'Liebherr diesel engine',
      'LICCON crane control',
      'VarioBase variable outrigger',
      'ECOmode fuel saving',
      'Telescopic boom',
      'Load moment indicator',
      'Comfortable operator cabin'
    ]
  },
  {
    id: 'eq-006',
    name: 'Bobcat S770 Skid Steer',
    description: 'Compact and versatile skid steer loader for tight spaces and various attachment options. High performance in a compact package.',
    price: 68000,
    imageSrcs: [
      '/images/equipment/bobcat-s770-main.jpg',
      '/images/equipment/bobcat-s770-action.jpg',
      '/images/equipment/bobcat-s770-attachments.jpg'
    ],
    category: 'Skid Steers',
    condition: 'New',
    manufacturer: 'Bobcat',
    modelNumber: 'S770',
    yearManufactured: 2023,
    specifications: {
      'Operating Weight': '4,309 kg (9,500 lb)',
      'Engine Power': '68 kW (92 hp)',
      'Rated Operating Capacity': '1,588 kg (3,500 lb)',
      'Bucket Capacity': '0.6 m³ (0.8 yd³)',
      'Travel Speed': '19 km/h (12 mph)',
      'Fuel Tank Capacity': '132 L (35 gal)',
      'Ground Clearance': '229 mm (9 in)'
    },
    features: [
      'Tier 4 diesel engine',
      'Advanced display',
      'Selectable joystick patterns',
      'Bob-Tach mounting system',
      'Hydraulic quick-attach',
      'ROPS/FOPS certification',
      'LED lighting'
    ]
  },
  {
    id: 'eq-007',
    name: 'Hamm HD+ 120 VV Roller',
    description: 'Double drum vibratory roller for soil and asphalt compaction. Features intelligent compaction technology and precise control.',
    price: 145000,
    imageSrcs: [
      '/images/equipment/hamm-hd120-main.jpg',
      '/images/equipment/hamm-hd120-compacting.jpg'
    ],
    category: 'Compactors',
    condition: 'Used',
    manufacturer: 'Hamm',
    modelNumber: 'HD+ 120 VV',
    yearManufactured: 2022,
    specifications: {
      'Operating Weight': '12,100 kg (26,676 lb)',
      'Engine Power': '129 kW (173 hp)',
      'Working Width': '2,130 mm (84 in)',
      'Compaction Force': '310 kN',
      'Travel Speed': '12 km/h (7.5 mph)',
      'Water Tank Capacity': '1,000 L (264 gal)',
      'Fuel Tank Capacity': '240 L (63 gal)'
    },
    features: [
      'Deutz TCD 6.1 engine',
      'HCQ intelligent compaction',
      'Dual amplitude system',
      'Automatic sprinkler system',
      'Ergonomic operator station',
      'LED work lights',
      'Eco mode operation'
    ]
  },
  {
    id: 'eq-008',
    name: 'JCB 3CX Backhoe Loader',
    description: 'Versatile backhoe loader combining the capabilities of a wheel loader and excavator. Perfect for utility work and construction.',
    price: 125000,
    imageSrcs: [
      '/images/equipment/jcb-3cx-main.jpg',
      '/images/equipment/jcb-3cx-digging.jpg',
      '/images/equipment/jcb-3cx-loading.jpg'
    ],
    category: 'Backhoe Loaders',
    condition: 'Refurbished',
    manufacturer: 'JCB',
    modelNumber: '3CX',
    yearManufactured: 2021,
    specifications: {
      'Operating Weight': '8,200 kg (18,078 lb)',
      'Engine Power': '81 kW (109 hp)',
      'Loader Capacity': '1.0 m³ (1.3 yd³)',
      'Max Dig Depth': '5.54 m (18 ft 2 in)',
      'Max Reach': '7.92 m (26 ft)',
      'Travel Speed': '40 km/h (25 mph)',
      'Fuel Tank Capacity': '150 L (40 gal)'
    },
    features: [
      'JCB EcoMAX engine',
      'Powershift transmission',
      'Side shift loader',
      'Extendable dipper arm',
      '4-wheel steer',
      'Load sensing hydraulics',
      'Comfortable cab'
    ]
  }
];

// Helper functions for equipment data
export function getEquipmentById(id: string): Equipment | undefined {
  return mockEquipment.find(equipment => equipment.id === id);
}

export function getEquipmentByCategory(category: string): Equipment[] {
  return mockEquipment.filter(equipment => 
    equipment.category.toLowerCase() === category.toLowerCase()
  );
}

export function getEquipmentByCondition(condition: string): Equipment[] {
  return mockEquipment.filter(equipment => 
    equipment.condition.toLowerCase() === condition.toLowerCase()
  );
}

export function getEquipmentByManufacturer(manufacturer: string): Equipment[] {
  return mockEquipment.filter(equipment => 
    equipment.manufacturer.toLowerCase() === manufacturer.toLowerCase()
  );
}

export function getEquipmentInPriceRange(minPrice: number, maxPrice: number): Equipment[] {
  return mockEquipment.filter(equipment => 
    equipment.price >= minPrice && equipment.price <= maxPrice
  );
}

export function getAllCategories(): string[] {
  const categories = mockEquipment.map(equipment => equipment.category);
  return [...new Set(categories)].sort();
}

export function getAllManufacturers(): string[] {
  const manufacturers = mockEquipment.map(equipment => equipment.manufacturer);
  return [...new Set(manufacturers)].sort();
}

export const equipmentCategories = [
  'Excavators',
  'Wheel Loaders', 
  'Bulldozers',
  'Articulated Haulers',
  'Mobile Cranes',
  'Skid Steers',
  'Compactors',
  'Backhoe Loaders'
]; 