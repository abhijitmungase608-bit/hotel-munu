import React from 'react';
import { MenuItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Flame, Plus, Minus, Sparkles } from 'lucide-react';
import { playAddCartSound } from '../../utils/sound';

interface FoodCardProps {
  item: MenuItem;
  onOpenDetails: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenDetails }) => {
  const { cart, addToCart, updateCartItemQuantity } = useApp();

  // Check if item without add-ons is in cart
  const cartItem = cart.find(
    (c) => c.menuItem.id === item.id && c.selectedAddOns.length === 0
  );

  const hasAddOns = item.addOnGroups && item.addOnGroups.length > 0;

  const handleDirectAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) return;

    if (hasAddOns) {
      onOpenDetails(item);
    } else {
      playAddCartSound();
      addToCart(item, 1, []);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cartItem) return;
    playAddCartSound();
    updateCartItemQuantity(cartItem.cartItemId, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cartItem) return;
    updateCartItemQuantity(cartItem.cartItemId, -1);
  };

  return (
    <div
      onClick={() => item.isAvailable && onOpenDetails(item)}
      className={`bg-white rounded-2xl p-3.5 border transition-all duration-200 shadow-sm hover:shadow-md flex gap-3.5 cursor-pointer relative ${
        item.isAvailable
          ? 'border-slate-100 hover:border-orange-200'
          : 'border-slate-200 opacity-65 bg-slate-50/70'
      }`}
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Top badges: Veg/Non-veg & Bestseller */}
          <div className="flex items-center gap-2 mb-1.5">
            {/* Veg / Non-veg dot */}
            <span
              className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 ${
                item.vegType === 'veg'
                  ? 'border-emerald-600 bg-white'
                  : 'border-rose-600 bg-white'
              }`}
              title={item.vegType.toUpperCase()}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.vegType === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              ></span>
            </span>

            {item.isPopular && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Bestseller
              </span>
            )}

            {item.spicyLevel > 1 && (
              <span className="text-[11px]" title={`Spicy Level: ${item.spicyLevel}`}>
                {'🌶️'.repeat(item.spicyLevel)}
              </span>
            )}
          </div>

          {/* Item Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
            {item.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-black text-slate-900 text-base">
              ₹{item.discountPrice !== undefined ? item.discountPrice : item.price}
            </span>
            {item.discountPrice !== undefined && (
              <span className="text-xs text-slate-400 line-through">
                ₹{item.price}
              </span>
            )}
            {item.discountPrice !== undefined && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                Save ₹{item.price - item.discountPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Rating or prep time */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-50 text-[11px] text-slate-500">
          <div className="flex items-center gap-0.5 text-amber-600 font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{item.rating}</span>
          </div>
          <span>•</span>
          <span>{item.preparationTimeMinutes} mins</span>
        </div>
      </div>

      {/* Right Image & Action Button */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            item.isAvailable ? 'hover:scale-105' : 'grayscale'
          }`}
          loading="lazy"
        />

        {/* Sold Out Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
              Sold Out
            </span>
          </div>
        )}

        {/* Floating Add Button */}
        {item.isAvailable && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5">
            {cartItem ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-orange-500 text-white font-bold rounded-lg shadow-md flex items-center justify-between px-2 py-1 text-xs"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-1 hover:bg-orange-600 rounded"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold">{cartItem.quantity}</span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-1 hover:bg-orange-600 rounded"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDirectAdd}
                className="w-full bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 font-bold text-xs py-1.5 px-2 rounded-lg shadow-md border border-orange-200 flex items-center justify-center gap-1 transition active:scale-95"
              >
                <span>Add</span>
                {hasAddOns ? (
                  <span className="text-[10px] text-orange-500 font-medium">+</span>
                ) : (
                  <Plus className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
