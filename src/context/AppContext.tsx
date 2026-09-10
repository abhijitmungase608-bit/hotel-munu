import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Restaurant,
  Category,
  MenuItem,
  Table,
  Order,
  Coupon,
  User,
  CartItem,
  OrderStatus,
  ThemePreset,
} from '../types';
import {
  initialRestaurants,
  initialCategories,
  initialMenuItems,
  initialTables,
  initialOrders,
  initialCoupons,
  demoUsers,
} from '../data/mockData';
import { playNewOrderSound } from '../utils/sound';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & Routing State
  currentView: 'landing' | 'menu' | 'dashboard' | 'admin';
  setCurrentView: (view: 'landing' | 'menu' | 'dashboard' | 'admin') => void;
  activeRestaurantSlug: string;
  setActiveRestaurantSlug: (slug: string) => void;
  selectedTableNumber: string;
  setSelectedTableNumber: (tableNum: string) => void;
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;

  // Authentication
  currentUser: User | null;
  loginAs: (role: 'OWNER' | 'ADMIN', restaurantId?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Data
  restaurants: Restaurant[];
  currentRestaurant: Restaurant;
  categories: Category[];
  menuItems: MenuItem[];
  tables: Table[];
  orders: Order[];
  coupons: Coupon[];

  // Cart (Customer side)
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, selectedAddOns: CartItem['selectedAddOns'], specialInstructions?: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Orders Actions
  placeOrder: (orderData: {
    customerName: string;
    customerPhone?: string;
    notes?: string;
    paymentMethod: 'CASH' | 'UPI_QR' | 'CARD';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Menu Management
  toggleItemAvailability: (itemId: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  // Table Management
  addTable: (table: Omit<Table, 'id'>) => void;
  deleteTable: (tableId: string) => void;

  // Offers Management
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  deleteCoupon: (couponId: string) => void;
  toggleCouponActive: (couponId: string) => void;

  // Restaurant Customization
  updateRestaurantProfile: (updated: Partial<Restaurant>) => void;
  changeTheme: (theme: ThemePreset) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SYNC_CHANNEL_NAME = 'menucard_realtime_sync';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'landing' | 'menu' | 'dashboard' | 'admin'>('landing');
  const [activeRestaurantSlug, setActiveRestaurantSlug] = useState<string>('abc-cafe');
  const [selectedTableNumber, setSelectedTableNumber] = useState<string>('4');
  const [dashboardTab, setDashboardTab] = useState<string>('orders');
  const [adminTab, setAdminTab] = useState<string>('restaurants');

  // Auth
  const [currentUser, setCurrentUser] = useState<User | null>(demoUsers[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Data from LocalStorage or Defaults
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem('menucard_restaurants');
    return saved ? JSON.parse(saved) : initialRestaurants;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('menucard_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('menucard_menu_items');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem('menucard_tables');
    return saved ? JSON.parse(saved) : initialTables;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('menucard_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('menucard_coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('menucard_restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('menucard_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('menucard_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('menucard_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('menucard_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('menucard_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Handle URL hash or query params if any
  useEffect(() => {
    const handleUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        setSelectedTableNumber(tableParam);
      }
      const viewParam = params.get('view');
      if (viewParam === 'menu' || viewParam === 'dashboard' || viewParam === 'admin') {
        setCurrentView(viewParam);
      }
      const slugParam = params.get('restaurant');
      if (slugParam) {
        setActiveRestaurantSlug(slugParam);
      }
    };
    handleUrlState();
  }, []);

  // Real-time synchronization across browser tabs using BroadcastChannel
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);

    channel.onmessage = (event) => {
      const data = event.data;
      if (!data || !data.type) return;

      if (data.type === 'NEW_ORDER') {
        setOrders((prev) => {
          if (prev.some((o) => o.id === data.order.id)) return prev;
          return [data.order, ...prev];
        });
        playNewOrderSound();
        showToast(
          '🔔 New Order Received!',
          `Table ${data.order.tableNumber} just placed order ${data.order.orderNumber} for ₹${data.order.totalAmount}`,
          'success'
        );
      } else if (data.type === 'ORDER_STATUS_UPDATE') {
        setOrders((prev) =>
          prev.map((o) => (o.id === data.orderId ? { ...o, status: data.status, updatedAt: new Date().toISOString() } : o))
        );
        if (lastPlacedOrder && lastPlacedOrder.id === data.orderId) {
          setLastPlacedOrder((prev) => (prev ? { ...prev, status: data.status } : null));
          showToast('Order Status Updated', `Your order is now ${data.status}`, 'info');
        }
      } else if (data.type === 'ITEM_AVAILABILITY_CHANGE') {
        setMenuItems((prev) =>
          prev.map((item) => (item.id === data.itemId ? { ...item, isAvailable: data.isAvailable } : item))
        );
        showToast(
          'Menu Updated',
          `Item availability has been updated by the kitchen.`,
          'info'
        );
      } else if (data.type === 'RESTAURANT_UPDATE') {
        setRestaurants((prev) =>
          prev.map((r) => (r.id === data.restaurant.id ? data.restaurant : r))
        );
      }
    };

    return () => {
      channel.close();
    };
  }, [showToast, lastPlacedOrder]);

  const currentRestaurant =
    restaurants.find((r) => r.slug === activeRestaurantSlug) || restaurants[0];

  // Auth methods
  const loginAs = (role: 'OWNER' | 'ADMIN', restaurantId = 'rest-1') => {
    if (role === 'ADMIN') {
      setCurrentUser(demoUsers[1]);
      setCurrentView('admin');
      showToast('Admin Logged In', 'Welcome to Super Admin Console', 'success');
    } else {
      const user = { ...demoUsers[0], restaurantId };
      setCurrentUser(user);
      const rest = restaurants.find((r) => r.id === restaurantId);
      if (rest) setActiveRestaurantSlug(rest.slug);
      setCurrentView('dashboard');
      showToast('Owner Logged In', `Welcome back to ${rest?.name || 'Dashboard'}`, 'success');
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    showToast('Logged Out', 'You have been signed out successfully', 'info');
  };

  // Cart operations
  const addToCart = (
    item: MenuItem,
    quantity: number,
    selectedAddOns: CartItem['selectedAddOns'],
    specialInstructions?: string
  ) => {
    if (!item.isAvailable) {
      showToast('Sold Out', 'Sorry, this item is currently unavailable', 'error');
      return;
    }

    const addOnsPrice = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    const basePrice = item.discountPrice !== undefined ? item.discountPrice : item.price;
    const unitPrice = basePrice + addOnsPrice;

    // Build unique identifier based on item and selected add-ons
    const addOnKey = selectedAddOns.map((a) => a.optionId).sort().join('_');
    const existingIndex = cart.findIndex(
      (c) =>
        c.menuItem.id === item.id &&
        c.selectedAddOns.map((a) => a.optionId).sort().join('_') === addOnKey &&
        (c.specialInstructions || '') === (specialInstructions || '')
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        const existing = next[existingIndex];
        const newQty = existing.quantity + quantity;
        next[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: newQty * existing.unitPrice,
        };
        return next;
      });
    } else {
      const newCartItem: CartItem = {
        cartItemId: `${item.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        menuItem: item,
        quantity,
        selectedAddOns,
        specialInstructions,
        unitPrice,
        totalPrice: unitPrice * quantity,
      };
      setCart((prev) => [...prev, newCartItem]);
    }

    showToast('Added to Cart', `${quantity}x ${item.name} added`, 'success');
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: nextQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === trimmed && c.isActive && c.restaurantId === currentRestaurant.id
    );

    if (!coupon) {
      return { success: false, message: 'Invalid or expired promo coupon' };
    }

    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Min order value for ${coupon.code} is ₹${coupon.minOrderValue}`,
      };
    }

    setAppliedCoupon(coupon);
    showToast('Coupon Applied!', `You saved with ${coupon.code}`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Discount coupon has been removed', 'info');
  };

  // Placing an Order
  const placeOrder = ({
    customerName,
    customerPhone,
    notes,
    paymentMethod,
  }: {
    customerName: string;
    customerPhone?: string;
    notes?: string;
    paymentMethod: 'CASH' | 'UPI_QR' | 'CARD';
  }): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'PERCENT') {
        discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
        if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
          discountAmount = appliedCoupon.maxDiscount;
        }
      } else {
        discountAmount = appliedCoupon.discountValue;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = Number((discountedSubtotal * 0.05).toFixed(2)); // 5% GST
    const totalAmount = Number((discountedSubtotal + taxAmount).toFixed(2));

    const orderNum = `#${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      restaurantId: currentRestaurant.id,
      tableNumber: selectedTableNumber || '1',
      customerName: customerName || 'Guest Diner',
      customerPhone: customerPhone || '',
      items: [...cart],
      subtotal,
      discountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      taxAmount,
      totalAmount,
      status: 'NEW',
      orderType: 'DINE_IN',
      paymentStatus: paymentMethod === 'UPI_QR' ? 'PAID_VIA_UPI' : 'UNPAID',
      paymentMethod,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    // Broadcast across tabs
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.postMessage({ type: 'NEW_ORDER', order: newOrder });
        channel.close();
      } catch {
        // Broadcast failed gracefully
      }
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order
      )
    );

    if (lastPlacedOrder && lastPlacedOrder.id === orderId) {
      setLastPlacedOrder((prev) => (prev ? { ...prev, status } : null));
    }

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.postMessage({ type: 'ORDER_STATUS_UPDATE', orderId, status });
        channel.close();
      } catch {
        // silent
      }
    }

    showToast('Order Updated', `Order status changed to ${status}`, 'info');
  };

  // Menu items actions
  const toggleItemAvailability = (itemId: string) => {
    let updatedVal = false;
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          updatedVal = !item.isAvailable;
          return { ...item, isAvailable: updatedVal };
        }
        return item;
      })
    );

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.postMessage({
          type: 'ITEM_AVAILABILITY_CHANGE',
          itemId,
          isAvailable: updatedVal,
        });
        channel.close();
      } catch {
        // silent
      }
    }

    showToast(
      'Availability Updated',
      `Item is now ${updatedVal ? 'Available 🟢' : 'Sold Out 🔴'}`,
      updatedVal ? 'success' : 'warning'
    );
  };

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `item-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast('Dish Added', `${newItem.name} added to menu!`, 'success');
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    showToast('Dish Updated', `${updatedItem.name} saved successfully`, 'success');
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Dish Removed', 'Food item deleted from menu', 'info');
  };

  // Categories actions
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast('Category Created', `${newCat.name} category created`, 'success');
  };

  const updateCategory = (cat: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
    showToast('Category Updated', `${cat.name} saved`, 'success');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    showToast('Category Removed', 'Category deleted', 'info');
  };

  // Tables actions
  const addTable = (tableData: Omit<Table, 'id'>) => {
    const newTable: Table = {
      ...tableData,
      id: `tbl-${Date.now()}`,
    };
    setTables((prev) => [...prev, newTable]);
    showToast('Table Added', `Table ${newTable.tableNumber} added`, 'success');
  };

  const deleteTable = (tableId: string) => {
    setTables((prev) => prev.filter((t) => t.id !== tableId));
    showToast('Table Deleted', 'Table removed', 'info');
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `cpn-${Date.now()}`,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast('Coupon Created', `Code ${newCoupon.code} created!`, 'success');
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
    showToast('Coupon Deleted', 'Coupon removed', 'info');
  };

  const toggleCouponActive = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Restaurant profile & themes
  const updateRestaurantProfile = (updated: Partial<Restaurant>) => {
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === currentRestaurant.id) {
          const next = { ...r, ...updated };
          if (typeof BroadcastChannel !== 'undefined') {
            try {
              const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
              channel.postMessage({ type: 'RESTAURANT_UPDATE', restaurant: next });
              channel.close();
            } catch {
              // silent
            }
          }
          return next;
        }
        return r;
      })
    );
    showToast('Profile Saved', 'Restaurant details updated', 'success');
  };

  const changeTheme = (theme: ThemePreset) => {
    let primaryColor = '#f59e0b';
    if (theme === 'emerald') primaryColor = '#10b981';
    if (theme === 'crimson') primaryColor = '#f43f5e';
    if (theme === 'luxury') primaryColor = '#eab308';
    if (theme === 'neon') primaryColor = '#06b6d4';

    updateRestaurantProfile({
      branding: {
        ...currentRestaurant.branding,
        theme,
        primaryColor,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeRestaurantSlug,
        setActiveRestaurantSlug,
        selectedTableNumber,
        setSelectedTableNumber,
        dashboardTab,
        setDashboardTab,
        adminTab,
        setAdminTab,
        currentUser,
        loginAs,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        restaurants,
        currentRestaurant,
        categories,
        menuItems,
        tables,
        orders,
        coupons,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        placeOrder,
        updateOrderStatus,
        lastPlacedOrder,
        setLastPlacedOrder,
        toggleItemAvailability,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addCategory,
        updateCategory,
        deleteCategory,
        addTable,
        deleteTable,
        addCoupon,
        deleteCoupon,
        toggleCouponActive,
        updateRestaurantProfile,
        changeTheme,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
