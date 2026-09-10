import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuHeader } from './MenuHeader';
import { CategoryTabs } from './CategoryTabs';
import { FoodCard } from './FoodCard';
import { ItemDetailModal } from './ItemDetailModal';
import { CartDrawer } from './CartDrawer';
import { OrderStatusModal } from './OrderStatusModal';
import { MenuItem, VegType } from '../../types';
import { Search, Sparkles, ShoppingBag, ArrowRight, Filter, Flame } from 'lucide-react';

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
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');
  const [vegFilter, setVegFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Filter items based on restaurant, category, search, and veg/non-veg filter
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Must belong to current restaurant
      if (item.restaurantId !== currentRestaurant.id) return false;

      // Category filter
      if (selectedCategoryId !== 'ALL' && item.categoryId !== selectedCategoryId) {
        return false;
      }

      // Veg / Non-veg filter
      if (vegFilter === 'VEG' && item.vegType !== 'veg' && item.vegType !== 'vegan') {
        return false;
      }
      if (vegFilter === 'NON_VEG' && item.vegType !== 'non-veg') {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        return matchName || matchDesc;
      }

      return true;
    });
  }, [menuItems, currentRestaurant.id, selectedCategoryId, vegFilter, searchQuery]);

  // Group items by category if "ALL" is selected and no search
  const showGrouped = selectedCategoryId === 'ALL' && !searchQuery.trim() && vegFilter === 'ALL';

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Restaurant Header */}
      <MenuHeader />

      {/* Search & Filter Bar */}
      <div className="max-w-3xl mx-auto px-4 pt-3 pb-1">
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search dishes, drinks, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm"
            />
          </div>

          {/* Veg / Non-Veg Quick Pills */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
            <button
              onClick={() => setVegFilter(vegFilter === 'VEG' ? 'ALL' : 'VEG')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                vegFilter === 'VEG'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white"></span>
              <span>Veg</span>
            </button>
            <button
              onClick={() => setVegFilter(vegFilter === 'NON_VEG' ? 'ALL' : 'NON_VEG')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                vegFilter === 'NON_VEG'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 border border-white"></span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Promo Bar Banner */}
        <div className="mt-3 p-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <div>
              <span className="font-bold">Today's Special:</span> 20% OFF on dining bills! Use code{' '}
              <span className="font-black bg-white/20 px-1.5 py-0.5 rounded tracking-wider">
                MUNU20
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="max-w-3xl mx-auto">
        <CategoryTabs
          categories={categories.filter((c) => c.restaurantId === currentRestaurant.id)}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => {
            setSelectedCategoryId(id);
            setSearchQuery('');
          }}
        />
      </div>

      {/* Food Items List */}
      <main className="max-w-3xl mx-auto px-4 mt-4 space-y-6">
        {showGrouped ? (
          // Grouped by categories
          categories
            .filter((c) => c.restaurantId === currentRestaurant.id)
            .map((category) => {
              const itemsInCat = menuItems.filter(
                (item) =>
                  item.restaurantId === currentRestaurant.id && item.categoryId === category.id
              );
              if (itemsInCat.length === 0) return null;

              return (
                <section key={category.id} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                      <span className="text-xs font-semibold text-slate-400">
                        ({itemsInCat.length})
                      </span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {itemsInCat.map((item) => (
                      <FoodCard
                        key={item.id}
                        item={item}
                        onOpenDetails={(it) => setSelectedItemForModal(it)}
                      />
                    ))}
                  </div>
                </section>
              );
            })
        ) : (
          // Filtered list
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'}
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <div className="text-4xl mb-2">🔍</div>
                <h3 className="font-bold text-slate-800 text-sm">No dishes found</h3>
                <p className="text-xs text-slate-500 mt-1">Try searching for something else or clearing filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setVegFilter('ALL');
                    setSelectedCategoryId('ALL');
                  }}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onOpenDetails={(it) => setSelectedItemForModal(it)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && (
        <aside aria-label="Customer cart toolbar" className="fixed bottom-16 left-0 right-0 z-30 px-4 max-w-xl mx-auto no-print">
          <div
            onClick={() => setIsCartDrawerOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-base shadow-inner">
                {cartTotalItems}
              </div>
              <div>
                <div className="text-xs font-medium text-orange-100 uppercase tracking-wider">
                  {cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'} Added
                </div>
                <div className="text-lg font-black tracking-tight">₹{cartSubtotal}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-bold text-sm bg-white text-orange-600 px-4 py-2 rounded-xl shadow">
              <span>View Order</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </aside>
      )}

      {/* Floating Track Order Button if customer has an active order */}
      {lastPlacedOrder && cart.length === 0 && (
        <div className="fixed bottom-16 right-4 z-30 no-print">
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700 hover:bg-black transition text-xs font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
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
  );
};
