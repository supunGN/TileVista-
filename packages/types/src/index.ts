// --- USER MODULE TYPES ---
export type UserRole = 'ADMIN' | 'CUSTOMER' | 'GUEST';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  createdAt: Date;
}

// --- PRODUCT MODULE TYPES ---
export type ProductCategory = 'TILE' | 'BATHWARE' | 'ACCESSORY';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  discount: number; // Percentage, e.g. 10 for 10%
  quantity: number;
  category: ProductCategory;
  imageUrl?: string;
  brand: string;
  color?: string;
  material?: string;
  size?: string; // e.g. "600x600mm", "300x300mm"
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- CART & ORDER TYPES ---
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  userId?: string;
  user?: User;
  status: OrderStatus;
  total: number;
  tax: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
}

// --- PACKAGES MODULE TYPES ---
export interface ProductPackage {
  id: string;
  name: string;
  description?: string;
  discountPercent: number;
  price: number;
  products: Product[];
  imageUrl?: string;
  createdAt: Date;
}

// --- DESIGNER MODULE TYPES ---
export type BathroomShape = 'RECTANGLE' | 'L_SHAPE' | 'U_SHAPE';

export interface WallDesign {
  wallIndex: number; // 0 to N walls
  color?: string;
  tileProductId?: string;
  tileProduct?: Product;
  coverageHeight?: number; // In meters or cm
}

export interface ItemPlacement {
  id: string;
  productId: string;
  product: Product;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
}

export interface BathroomLayout {
  id: string;
  userId?: string;
  name: string;
  shape: BathroomShape;
  width: number; // in meters (e.g., 2.4)
  length: number; // in meters (e.g., 3.0)
  height: number; // in meters (e.g., 2.7)
  wallDesigns: WallDesign[];
  placements: ItemPlacement[];
  createdAt: Date;
  updatedAt: Date;
}

// --- POS INTEGRATION TYPES ---
export type POSSyncStatus = 'SUCCESS' | 'FAILED' | 'PENDING';

export interface POSSyncLog {
  id: string;
  sku: string;
  quantitySynced: number;
  action: 'RESTOCK' | 'SALE' | 'SYNC';
  status: POSSyncStatus;
  errorMessage?: string;
  timestamp: Date;
}

// --- ANALYTICS TYPES ---
export interface ProductPerformance {
  productId: string;
  productName: string;
  sku: string;
  category: ProductCategory;
  unitsSold: number;
  revenue: number;
  currentStock: number;
}

export interface SalesTrend {
  date: string; // e.g. "2026-06-01"
  revenue: number;
  orderCount: number;
}

export interface AnalyticsReport {
  totalRevenue: number;
  totalOrders: number;
  fastMovingItems: ProductPerformance[];
  slowMovingItems: ProductPerformance[];
  salesTrends: SalesTrend[];
  restockAlertsCount: number;
}
