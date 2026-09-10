import React, { useState } from 'react';
import { MenuItem, SelectedAddOn, AddOnGroup, AddOnOption } from '../../types';
import { X, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { playAddCartSound } from '../../utils/sound';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedAddOns: SelectedAddOn[],
    instructions?: string
  ) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  // Initial required add-on selection
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>(() => {
    const initial: SelectedAddOn[] = [];
    if (item.addOnGroups) {
      item.addOnGroups.forEach((group) => {
        if (group.required && group.options.length > 0) {
          const firstOpt = group.options[0];
          initial.push({
            groupId: group.id,
            groupTitle: group.title,
            optionId: firstOpt.id,
            optionName: firstOpt.name,
            price: firstOpt.price,
          });
        }
      });
    }
    return initial;
  });

  const handleToggleAddOn = (group: AddOnGroup, option: AddOnOption) => {
    if (group.required) {
      // Single select for required group
      setSelectedAddOns((prev) => [
        ...prev.filter((a) => a.groupId !== group.id),
        {
          groupId: group.id,
          groupTitle: group.title,
          optionId: option.id,
          optionName: option.name,
          price: option.price,
        },
      ]);
    } else {
      // Multi-select for optional group
      const exists = selectedAddOns.some((a) => a.optionId === option.id);
      if (exists) {
        setSelectedAddOns((prev) => prev.filter((a) => a.optionId !== option.id));
      } else {
        const currentInGroup = selectedAddOns.filter((a) => a.groupId === group.id);
        if (group.maxSelect && currentInGroup.length >= group.maxSelect) {
          return; // reached limit
        }
        setSelectedAddOns((prev) => [
          ...prev,
          {
            groupId: group.id,
            groupTitle: group.title,
            optionId: option.id,
            optionName: option.name,
            price: option.price,
          },
        ]);
      }
    }
  };

  const basePrice = item.discountPrice !== undefined ? item.discountPrice : item.price;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const singleUnitPrice = basePrice + addOnsTotal;
  const finalTotal = singleUnitPrice * quantity;

  const handleAdd = () => {
    playAddCartSound();
    onAddToCart(item, quantity, selectedAddOns, instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Image Header */}
        <div className="relative h-52 sm:h-60 w-full bg-slate-900 shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  item.vegType === 'veg'
                    ? 'border-emerald-500 bg-white'
                    : 'border-rose-500 bg-white'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.vegType === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                ></span>
              </span>

              {item.isPopular && (
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Bestseller
                </span>
              )}

              {item.spicyLevel > 0 && (
                <span className="bg-rose-500/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Flame className="w-3 h-3" /> Spicy Level {item.spicyLevel}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold">{item.name}</h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

          {/* Add-on Groups */}
          {item.addOnGroups && item.addOnGroups.length > 0 && (
            <div className="space-y-4 pt-2">
              {item.addOnGroups.map((group) => (
                <div key={group.id} className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {group.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {group.required ? 'Required (Choose 1)' : 'Optional'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {group.options.map((opt) => {
                      const isSelected = selectedAddOns.some((a) => a.optionId === opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleToggleAddOn(group, opt)}
                          className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50/50 text-orange-900 font-semibold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-4 h-4 rounded-${
                                group.required ? 'full' : 'md'
                              } border flex items-center justify-center ${
                                isSelected
                                  ? 'border-orange-500 bg-orange-500 text-white'
                                  : 'border-slate-300'
                              }`}
                            >
                              {isSelected && <span className="text-[10px]">✓</span>}
                            </span>
                            <span>{opt.name}</span>
                          </div>
                          <span className="font-bold text-slate-800">
                            {opt.price > 0 ? `+₹${opt.price}` : 'Free'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Cooking Instructions */}
          <div className="border-t border-slate-100 pt-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Less spicy, no onions, extra crispy..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0 flex items-center justify-between gap-3">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-slate-500 hover:text-slate-800 disabled:opacity-30"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-slate-900 min-w-4 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="text-slate-500 hover:text-slate-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-between transition"
          >
            <span>Add to Order</span>
            <span>₹{finalTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
