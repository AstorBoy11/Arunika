// Type definitions untuk aplikasi Coffee Shop

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'owner';
  avatar?: string;
  createdAt?: Date;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  user: User;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
