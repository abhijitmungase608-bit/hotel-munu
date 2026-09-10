import React from 'react';
import type { MenuItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Plus, Minus, Sparkles } from 'lucide-react';
import { playAddCartSound } from '../../utils/sound';

interface FoodCardProps {
  item: MenuItem;
  onOpenDetails: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenDetails }) => {
  const { cart, addToCart, updateCartItemQuantity } = useApp();

  // Find item in cart (without extra add-ons)
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
      className={`py-4 px-4 bg-white border-b border-slate-100 flex items-start justify-between gap-3 cursor-pointer transition active:bg-slate-50/60 ${
        !item.isAvailable ? 'opacity-65' : ''
      }`}
    >
      {/* Left Info Column */}
      <div className="flex-1 min-w-0 pr-1">
        {/* Veg/Non-Veg Tag & Bestseller Badge */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center shrink-0 ${
              item.vegType === 'veg' ? 'border-emerald-600 bg-white' : 'border-rose-600 bg-white'
            }`}
            title={item.vegType.toUpperCase()}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.vegType === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            ></span>
          </span>

          {item.isPopular && (
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Bestseller
            </span>
          )}
        </div>

        {/* Dish Title */}
        <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
          {item.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-black text-sm text-slate-900">
            ₹{item.discountPrice !== undefined ? item.discountPrice : item.price}
          </span>
          {item.discountPrice !== undefined && (
            <span className="text-[11px] text-slate-400 line-through">
              ₹{item.price}
            </span>
          )}
        </div>

        {/* Rating & Prep Time */}
        <div className="flex items-center gap-1.5 text-[11px] mt-1 font-bold text-amber-600">
          <span className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.2 rounded text-[10px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{item.rating}</span>
          </span>
          <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Right Image & Floating Add Button Column */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 shadow-xs relative">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover ${!item.isAvailable ? 'grayscale' : ''}`}
            loading="lazy"
          />

          {/* Sold Out Overlay */}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-slate-900/65 flex items-center justify-center">
              <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Floating Add Stepper Button (Native App Style) */}
        {item.isAvailable && (
          <div className="relative -mt-4 w-22 z-10">
            {cartItem ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white text-emerald-700 font-black rounded-xl shadow-md border border-emerald-500 flex items-center justify-between px-2 py-1 text-xs"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-1 hover:bg-emerald-50 rounded text-emerald-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold">{cartItem.quantity}</span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-1 hover:bg-emerald-50 rounded text-emerald-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDirectAdd}
                className="w-full bg-white hover:bg-emerald-50/40 text-emerald-700 font-black text-xs py-1.5 px-3 rounded-xl shadow-md border border-slate-200 hover:border-emerald-400 flex items-center justify-center gap-1 transition transform active:scale-95 uppercase tracking-wider"
              >
                <span>ADD</span>
                {hasAddOns ? (
                  <span className="text-[10px] text-emerald-600 font-normal">+</span>
                ) : (
                  <Plus className="w-3 h-3 text-emerald-600" />
                )}
              </button>
            )}
            {hasAddOns && (
              <div className="text-[9px] text-center text-slate-400 mt-0.5 font-medium">
                Customizable
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
