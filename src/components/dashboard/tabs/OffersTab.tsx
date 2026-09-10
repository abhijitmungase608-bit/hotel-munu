import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import type { Coupon } from '../../../types';
import { Tag, Plus, Trash2, CheckCircle2, Sparkles, Percent, DollarSign, X } from 'lucide-react';

export const OffersTab: React.FC = () => {
  const { coupons, currentRestaurant, addCoupon, deleteCoupon, toggleCouponActive } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New coupon state
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENT' | 'FLAT'>('PERCENT');
  const [discountValue, setDiscountValue] = useState(20);
  const [minOrderValue, setMinOrderValue] = useState(300);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(100);

  const restaurantCoupons = coupons.filter((c) => c.restaurantId === currentRestaurant.id);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      restaurantId: currentRestaurant.id,
      code: code.trim().toUpperCase(),
      description: description.trim() || `Get ${discountValue}${discountType === 'PERCENT' ? '%' : '₹'} OFF`,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      isActive: true,
      expiryDate: '2026-12-31',
    });

    setCode('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">Promotions, Coupons & Combos</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Reward your diners with promotional discount codes and special dining combos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Promo Code</span>
        </button>
      </div>

      {/* Featured Combos Showcase (as requested in spec) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200/80">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🍔🍟🥤</span>
          <h3 className="text-sm font-black text-amber-900 uppercase tracking-wide">
            Combo Deals Engine
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                TODAY'S POPULAR COMBO
              </div>
              <h4 className="font-bold text-sm text-slate-900">Burger + Fries + Coke</h4>
              <p className="text-xs text-slate-500 mt-0.5">Classic feast combo meal</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-black text-base text-slate-900">₹299</span>
                <span className="text-xs text-slate-400 line-through">₹399</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                  Save 25%
                </span>
              </div>
            </div>
            <span className="text-3xl">🔥</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="inline-block bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                PIZZA PARTY DEAL
              </div>
              <h4 className="font-bold text-sm text-slate-900">2 Medium Pizzas + Cold Coffee</h4>
              <p className="text-xs text-slate-500 mt-0.5">Perfect for tables of 2-4 diners</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-black text-base text-slate-900">₹549</span>
                <span className="text-xs text-slate-400 line-through">₹699</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                  Save ₹150
                </span>
              </div>
            </div>
            <span className="text-3xl">🍕</span>
          </div>
        </div>
      </div>

      {/* Active Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurantCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`p-5 rounded-2xl border transition-all duration-200 bg-white shadow-sm flex flex-col justify-between ${
              coupon.isActive ? 'border-slate-200 hover:border-orange-300' : 'border-slate-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                    <Tag className="w-4 h-4" />
                  </span>
                  <span className="font-black text-base tracking-wider text-slate-900 font-mono">
                    {coupon.code}
                  </span>
                </div>

                <button
                  onClick={() => toggleCouponActive(coupon.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition ${
                    coupon.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {coupon.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-1">{coupon.description}</p>

              <div className="mt-3 pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-bold text-slate-800">
                    {coupon.discountType === 'PERCENT' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Min Order:</span>
                  <span className="font-bold text-slate-800">₹{coupon.minOrderValue}</span>
                </div>
                {coupon.maxDiscount && (
                  <div className="flex justify-between">
                    <span>Max Cap:</span>
                    <span className="font-bold text-slate-800">₹{coupon.maxDiscount}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => deleteCoupon(coupon.id)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Promo Code */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-slate-900">Create Coupon Code</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER25"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-xs uppercase font-mono font-bold border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 20% OFF on all pizzas"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'PERCENT' | 'FLAT')}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="PERCENT">Percentage (%)</option>
                    <option value="FLAT">Flat (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Max Discount (₹)
                  </label>
                  <input
                    type="number"
                    value={maxDiscount || ''}
                    onChange={(e) =>
                      setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow"
                >
                  Save Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
