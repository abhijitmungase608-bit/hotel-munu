import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import type { MenuItem, Category, VegType } from '../../../types';
import { Plus, Edit2, Trash2, Check, X, Sparkles, Flame, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

export const MenuManagementTab: React.FC = () => {
  const {
    currentRestaurant,
    categories,
    menuItems,
    toggleItemAvailability,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addCategory,
    deleteCategory,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'items' | 'categories'>('items');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  // Add / Edit Item Modal State
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Add Category State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🍕');

  // Form State for Item
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(199);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [vegType, setVegType] = useState<VegType>('veg');
  const [spicyLevel, setSpicyLevel] = useState<0 | 1 | 2 | 3>(0);
  const [isPopular, setIsPopular] = useState(false);
  const [isChefSpecial, setIsChefSpecial] = useState(false);
  const [image, setImage] = useState('');
  const [prepTime, setPrepTime] = useState(15);

  const restaurantCategories = categories.filter((c) => c.restaurantId === currentRestaurant.id);
  const restaurantItems = menuItems.filter((i) => i.restaurantId === currentRestaurant.id);

  const filteredItems = restaurantItems.filter((item) => {
    if (selectedCategoryFilter === 'ALL') return true;
    return item.categoryId === selectedCategoryFilter;
  });

  const handleOpenNewItem = () => {
    setEditingItem(null);
    setName('');
    setCategoryId(restaurantCategories[0]?.id || '');
    setDescription('');
    setPrice(199);
    setDiscountPrice(undefined);
    setVegType('veg');
    setSpicyLevel(0);
    setIsPopular(false);
    setIsChefSpecial(false);
    setImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80');
    setPrepTime(15);
    setIsItemModalOpen(true);
  };

  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategoryId(item.categoryId);
    setDescription(item.description);
    setPrice(item.price);
    setDiscountPrice(item.discountPrice);
    setVegType(item.vegType);
    setSpicyLevel(item.spicyLevel);
    setIsPopular(!!item.isPopular);
    setIsChefSpecial(!!item.isChefSpecial);
    setImage(item.image);
    setPrepTime(item.preparationTimeMinutes);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name,
        categoryId: categoryId || restaurantCategories[0]?.id || 'cat-1',
        description,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        vegType,
        spicyLevel,
        isPopular,
        isChefSpecial,
        image,
        preparationTimeMinutes: prepTime,
      });
    } else {
      addMenuItem({
        restaurantId: currentRestaurant.id,
        name,
        categoryId: categoryId || restaurantCategories[0]?.id || 'cat-1',
        description,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        vegType,
        spicyLevel,
        isAvailable: true,
        isPopular,
        isChefSpecial,
        image,
        rating: 4.8,
        reviewsCount: 1,
        preparationTimeMinutes: prepTime,
      });
    }
    setIsItemModalOpen(false);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      restaurantId: currentRestaurant.id,
      name: newCatName.trim(),
      icon: newCatIcon || '🍽️',
      order: restaurantCategories.length + 1,
    });
    setNewCatName('');
    setIsCatModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher & Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('items')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'items'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Food Items ({restaurantItems.length})
          </button>
          <button
            onClick={() => setActiveSubTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'categories'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Categories ({restaurantCategories.length})
          </button>
        </div>

        {activeSubTab === 'items' ? (
          <button
            onClick={handleOpenNewItem}
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Food Item</span>
          </button>
        ) : (
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Category</span>
          </button>
        )}
      </div>

      {/* SUB-TAB 1: FOOD ITEMS */}
      {activeSubTab === 'items' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedCategoryFilter('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedCategoryFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Items
            </button>
            {restaurantCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategoryFilter(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
                  selectedCategoryFilter === c.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          {/* Items Table / Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Dish</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">
                      Live Availability (1-Click)
                    </th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredItems.map((item) => {
                    const cat = restaurantCategories.find((c) => c.id === item.categoryId);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition">
                        {/* Dish Details */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <span className="truncate">{item.name}</span>
                                {item.isPopular && (
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1 rounded">
                                    ★ Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {cat ? `${cat.icon} ${cat.name}` : 'General'}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">
                            ₹{item.discountPrice !== undefined ? item.discountPrice : item.price}
                          </div>
                          {item.discountPrice !== undefined && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₹{item.price}
                            </div>
                          )}
                        </td>

                        {/* Veg / Non Veg */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.vegType === 'veg'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.vegType === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            ></span>
                            <span className="capitalize">{item.vegType}</span>
                          </span>
                        </td>

                        {/* Instant 1-Click Availability Toggle */}
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleItemAvailability(item.id)}
                            className={`px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition ${
                              item.isAvailable
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                            title="Click to toggle availability"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.isAvailable ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'
                              }`}
                            ></span>
                            <span>{item.isAvailable ? 'Available 🟢' : 'Sold Out 🔴'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditItem(item)}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                              title="Edit Item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CATEGORIES */}
      {activeSubTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {restaurantCategories.map((category) => {
            const count = restaurantItems.filter((i) => i.categoryId === category.id).length;
            return (
              <div
                key={category.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl border border-orange-100 shadow-inner">
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{category.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{count} Dishes listed</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteCategory(category.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Add/Edit Food Item */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
              </h3>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-5 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Food Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paneer Tikka Pizza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {restaurantCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Dietary Type
                  </label>
                  <select
                    value={vegType}
                    onChange={(e) => setVegType(e.target.value as VegType)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="veg">🟢 Veg</option>
                    <option value="non-veg">🔴 Non-Veg</option>
                    <option value="egg">🟡 Contains Egg</option>
                    <option value="vegan">🌱 Pure Vegan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Regular Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Discount Price (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 199"
                    value={discountPrice || ''}
                    onChange={(e) =>
                      setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Ingredients, flavors, specialty..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Food Image URL (Unsplash or direct URL)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-2 w-full h-28 object-cover rounded-xl border border-slate-200"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Spicy Level
                  </label>
                  <select
                    value={spicyLevel}
                    onChange={(e) => setSpicyLevel(Number(e.target.value) as 0 | 1 | 2 | 3)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value={0}>0 - Not Spicy</option>
                    <option value={1}>1 - Mild 🌶️</option>
                    <option value={2}>2 - Medium 🌶️🌶️</option>
                    <option value={3}>3 - Hot 🌶️🌶️🌶️</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Prep Time (Mins)
                  </label>
                  <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded text-orange-500"
                  />
                  <span>Mark as Bestseller / Popular 🔥</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow transition"
                >
                  {editingItem ? 'Save Changes' : 'Add Item to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Category */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 mb-3">Create New Category</h3>
            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Biryani & Rice"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Icon Emoji
                </label>
                <div className="flex gap-2 mb-2">
                  {['🍕', '🍔', '🍝', '🥤', '🍰', '🍟', '🍛', '🥗', '☕', '🌮'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewCatIcon(emoji)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${
                        newCatIcon === emoji ? 'border-orange-500 bg-orange-50' : 'border-slate-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
