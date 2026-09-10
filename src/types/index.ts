export type VegType = 'veg' | 'non-veg' | 'egg' | 'vegan';

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

export interface AddOnGroup {
  id: string;
  title: string;
  required: boolean;
  maxSelect?: number;
  options: AddOnOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  vegType: VegType;
  spicyLevel: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Extra Hot
  isAvailable: boolean; // Sold out toggle
  isPopular?: boolean;
  isChefSpecial?: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
  preparationTimeMinutes: number;
  addOnGroups?: AddOnGroup[];
}

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  icon: string;
  order: number;
  itemCount?: number;
}

export interface Table {
  id: string;
  restaurantId: string;
  tableNumber: string;
  capacity: number;
  area: 'Main Hall' | 'Outdoor Terrace' | 'Rooftop' | 'VIP Lounge';
  status: 'available' | 'occupied' | 'reserved';
  qrCodeUrl?: string;
}

export type OrderStatus = 'NEW' | 'PREPARING' | 'SERVED' | 'COMPLETED' | 'CANCELLED';

export interface SelectedAddOn {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddOns: SelectedAddOn[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  tableNumber: string;
  customerName: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  taxAmount: number;
  totalAmount: number;
  status: OrderStatus;
  orderType: 'DINE_IN' | 'TAKEAWAY';
  paymentStatus: 'UNPAID' | 'PAID' | 'PAID_VIA_UPI';
  paymentMethod: 'CASH' | 'UPI_QR' | 'CARD';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  restaurantId: string;
  code: string;
  description: string;
  discountType: 'PERCENT' | 'FLAT';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  expiryDate: string;
}

export type ThemePreset = 'emerald' | 'amber' | 'crimson' | 'luxury' | 'neon';

export interface RestaurantBranding {
  theme: ThemePreset;
  primaryColor: string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Outfit' | 'Playfair Display';
  coverImage: string;
  logo: string;
  showCoverPhoto: boolean;
  compactMenu: boolean;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cuisineTypes: string[];
  address: string;
  phone: string;
  whatsappNumber: string;
  upiId: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  currency: string;
  rating: number;
  totalReviews: number;
  branding: RestaurantBranding;
  subscriptionPlan: 'FREE' | 'STARTER' | 'BUSINESS';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'STAFF';
  restaurantId?: string;
}
