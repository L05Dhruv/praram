export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrcs: string[];
  category: string;
  condition: string;
  manufacturer: string;
  modelNumber: string;
  yearManufactured: number;
  specifications: Record<string, string>;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
} 