import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuHeader } from './MenuHeader';
import { CategoryTabs } from './CategoryTabs';
import { FoodCard } from './FoodCard';
import { ItemDetailModal } from './ItemDetailModal';
import { CartDrawer } from './CartDrawer';
import { OrderStatusModal } from './OrderStatusModal';
import type { MenuItem } from '../../types';
import { Search, X, ShoppingBag, ArrowRight, Sparkles, ChefHat } from 'lucide-react';

export const CustomerMenu: React.FC = () => {
  const {
    currentRestaurant,
    categories,
    menuItems,
    cart,
    addToCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    lastPlacedOrder,
    selectedTableNumber,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');
  const [vegFilter, setVegFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Filter items based on restaurant, category, search, and veg/non-veg filter
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.restaurantId !== currentRestaurant.id) return false;

      if (selectedCategoryId !== 'ALL' && item.categoryId !== selectedCategoryId) {
        return false;
      }

      if (vegFilter === 'VEG' && item.vegType !== 'veg' && item.vegType !== 'vegan') {
        return false;
      }
      if (vegFilter === 'NON_VEG' && item.vegType !== 'non-veg') {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        return matchName || matchDesc;
      }

      return true;
    });
  }, [menuItems, currentRestaurant.id, selectedCategoryId, vegFilter, searchQuery]);

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const restaurantCategories = categories.filter((c) => c.restaurantId === currentRestaurant.id);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center selection:bg-orange-500 selection:text-white">
      {/* Mobile App Shell Container (max-w-md on desktop with app shadow, 100% on phone) */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative pb-28">
        {/* Native App Restaurant Header */}
        <MenuHeader
          vegOnly={vegFilter === 'VEG'}
          onToggleVegOnly={() => setVegFilter((prev) => (prev === 'VEG' ? 'ALL' : 'VEG'))}
        />

        {/* Search Bar & Veg Filter Pills */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 space-y-2 sticky top-12 z-20">
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search food... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-100/90 text-slate-900 border-none rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Veg / Non-Veg Quick Toggle Pills */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setVegFilter(vegFilter === 'VEG' ? 'ALL' : 'VEG')}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 border ${
                  vegFilter === 'VEG'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-500 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Veg</span>
              </button>

              <button
                onClick={() => setVegFilter(vegFilter === 'NON_VEG' ? 'ALL' : 'NON_VEG')}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 border ${
                  vegFilter === 'NON_VEG'
                    ? 'bg-rose-50 text-rose-800 border-rose-500 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Non-Veg</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Category Tabs Bar */}
        <CategoryTabs
          categories={restaurantCategories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => {
            setSelectedCategoryId(id);
            setSearchQuery('');
          }}
        />

        {/* Promo Code Banner */}
        <div className="mx-4 mt-3 p-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-xs flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            <span>🔥</span>
            <span>
              Flat 20% OFF on dining bills! Code: <strong className="bg-white/20 px-1 py-0.2 rounded font-mono">MUNU20</strong>
            </span>
          </div>
        </div>

        {/* Food Items List */}
        <main className="flex-1 mt-2">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center px-4">
              <div className="text-4xl mb-2">🍽️</div>
              <h4 className="font-extrabold text-sm text-slate-800">No dishes match your filter</h4>
              <p className="text-xs text-slate-500 mt-1">Try clearing the search or veg filter</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVegFilter('ALL');
                  setSelectedCategoryId('ALL');
                }}
                className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onOpenDetails={(it) => setSelectedItemForModal(it)}
                />
              ))}
            </div>
          )}
        </main>

        {/* Floating Native App Cart Bottom Bar */}
        {cart.length > 0 && (
          <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-30 no-print animate-in slide-in-from-bottom-3">
            <div
              onClick={() => setIsCartDrawerOpen(true)}
              className="bg-slate-950 text-white rounded-2xl p-3 shadow-2xl border border-slate-800 flex items-center justify-between cursor-pointer active:scale-98 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow">
                  {cartTotalItems}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-orange-400">
                    Table {selectedTableNumber} • {cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}
                  </div>
                  <div className="text-base font-black tracking-tight">₹{cartSubtotal}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-white text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-xs">
                <span>VIEW ORDER</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
              </div>
            </div>
          </div>
        )}

        {/* Floating Active Order Tracker Badge */}
        {lastPlacedOrder && cart.length === 0 && (
          <div className="fixed bottom-16 right-4 z-30 no-print">
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="bg-emerald-700 text-white px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-500 text-xs font-bold transition active:scale-95"
            >
              <ChefHat className="w-3.5 h-3.5 animate-bounce" />
              <span>Track Order {lastPlacedOrder.orderNumber}</span>
            </button>
          </div>
        )}

        {/* Modals */}
        <ItemDetailModal
          item={selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
          onAddToCart={addToCart}
        />

        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
          onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        />

        <OrderStatusModal
          isOpen={isOrderTrackerOpen}
          onClose={() => setIsOrderTrackerOpen(false)}
        />
      </div>
    </div>
  );
};
