import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  Send,
  MessageSquare,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  UtensilsCrossed,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playOrderSuccessSound } from '../../utils/sound';

interface DesktopCartSidebarProps {
  onOpenOrderTracker: () => void;
}

export const DesktopCartSidebar: React.FC<DesktopCartSidebarProps> = ({
  onOpenOrderTracker,
}) => {
  const {
    cart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    currentRestaurant,
    selectedTableNumber,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    placeOrder,
    coupons,
    showToast,
  } = useApp();

  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [notes, setNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI_QR' | 'CARD'>('UPI_QR');

  // Calculations
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
  const taxes = Number((discountedSubtotal * 0.05).toFixed(2));
  const grandTotal = Number((discountedSubtotal + taxes).toFixed(2));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  // Direct Table Order to Kitchen
  const handleDirectOrder = () => {
    if (cart.length === 0) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    playOrderSuccessSound();

    placeOrder({
      customerName,
      customerPhone,
      notes,
      paymentMethod,
    });

    onOpenOrderTracker();
  };

  // WhatsApp Ordering Flow
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let msg = `🍕 *NEW ORDER - ${currentRestaurant.name}*\n`;
    msg += `📍 *Table Number:* ${selectedTableNumber}\n`;
    msg += `👤 *Customer Name:* ${customerName || 'Guest'}\n`;
    if (customerPhone) msg += `📞 *Phone:* ${customerPhone}\n`;
    msg += `---------------------------------\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.quantity}x ${item.menuItem.name}* - ₹${item.totalPrice}\n`;
      if (item.selectedAddOns.length > 0) {
        const addOnDetails = item.selectedAddOns.map((a) => `${a.optionName} (+₹${a.price})`).join(', ');
        msg += `   ↳ _${addOnDetails}_\n`;
      }
      if (item.specialInstructions) {
        msg += `   ↳ Note: "${item.specialInstructions}"\n`;
      }
    });

    msg += `---------------------------------\n`;
    msg += `Item Total: ₹${subtotal}\n`;
    if (discountAmount > 0) {
      msg += `Discount (${appliedCoupon?.code}): -₹${discountAmount}\n`;
    }
    msg += `GST (5%): ₹${taxes}\n`;
    msg += `*Grand Total: ₹${grandTotal}*\n`;
    msg += `*Payment:* ${paymentMethod === 'UPI_QR' ? 'UPI / QR' : paymentMethod}\n`;

    if (notes) {
      msg += `\n*Cooking Note:* ${notes}\n`;
    }

    msg += `\n_Sent via MenuCard Smart Dining_`;

    placeOrder({
      customerName,
      customerPhone,
      notes,
      paymentMethod,
    });

    confetti({ particleCount: 50, spread: 60 });
    playOrderSuccessSound();

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${currentRestaurant.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');

    onOpenOrderTracker();
  };

  return (
    <aside
      aria-label="Desktop Order Panel"
      className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden sticky top-20 flex flex-col max-h-[calc(100vh-6rem)]"
    >
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-base tracking-tight">Your Dining Order</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Table <span className="text-orange-400 font-bold">{selectedTableNumber}</span> • {currentRestaurant.name}
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline transition"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable Cart Body */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-orange-500">
              <UtensilsCrossed className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Your order is empty</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[220px] mx-auto">
              Browse our delicious dishes and click <span className="font-bold text-orange-600">+ Add</span> to start your table order.
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="space-y-2.5">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between gap-3 hover:border-slate-200 transition"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.menuItem.vegType === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      ></span>
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {item.menuItem.name}
                      </h4>
                    </div>

                    <div className="text-xs font-black text-slate-900 mt-1">
                      ₹{item.totalPrice}
                    </div>

                    {/* Add-ons badges */}
                    {item.selectedAddOns.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.selectedAddOns.map((addon) => (
                          <span
                            key={addon.optionId}
                            className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-600 border border-slate-200"
                          >
                            +{addon.optionName} (₹{addon.price})
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Special instruction preview */}
                    {item.specialInstructions && (
                      <p className="text-[11px] text-slate-500 italic mt-1 bg-white/80 p-1 rounded border border-slate-200/60">
                        "{item.specialInstructions}"
                      </p>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs shrink-0">
                    <button
                      type="button"
                      onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                      className="p-1 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="font-bold text-xs text-slate-900 min-w-3 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                      className="p-1 text-slate-500 hover:text-orange-600 hover:bg-slate-100 rounded transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Section */}
            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                <Tag className="w-3.5 h-3.5 text-orange-500" />
                <span>Offers & Coupons</span>
              </div>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 tracking-wider">
                        {appliedCoupon.code}
                      </span>
                      <p className="text-[10px] text-emerald-700">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE (E.G. PIZZA20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs uppercase font-semibold border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!couponInput}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <div className="text-[11px] text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{couponError}</span>
                    </div>
                  )}

                  {/* Quick available coupons suggestions */}
                  <div className="flex flex-wrap gap-1.5">
                    {coupons.slice(0, 2).map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => applyCoupon(c.code)}
                        className="text-[10px] font-bold tracking-wider px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </form>
              )}
            </div>

            {/* Diner Details & Cooking Note */}
            <div className="border-t border-slate-100 pt-3 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Diner Details
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                  Kitchen Note
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please bring water first, make food extra spicy"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Payment Mode Selector */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                  Pay With
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['UPI_QR', 'CASH', 'CARD'] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold transition border ${
                        paymentMethod === method
                          ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {method === 'UPI_QR' ? 'UPI / QR' : method === 'CASH' ? 'Cash' : 'Card'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Item Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons Footer */}
      {cart.length > 0 && (
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
          {/* Direct Table Order to Kitchen */}
          <button
            type="button"
            onClick={handleDirectOrder}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-between transition active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Place Order to Kitchen</span>
            </div>
            <span className="font-extrabold text-base">₹{grandTotal}</span>
          </button>

          {/* WhatsApp Order Button */}
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Order via WhatsApp</span>
          </button>
        </div>
      )}
    </aside>
  );
};
