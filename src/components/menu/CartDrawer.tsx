import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, Trash2, Tag, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playOrderSuccessSound } from '../../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderTracker: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
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

  if (!isOpen) return null;

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

  // 1. Direct Table Order to Kitchen
  const handleDirectOrder = () => {
    if (cart.length === 0) return;

    // Trigger celebratory confetti
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

    onClose();
    onOpenOrderTracker();
  };

  // 2. WhatsApp Ordering Flow
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    // Format WhatsApp message
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

    // Also place the order in our local state so owner sees it in dashboard
    placeOrder({
      customerName,
      customerPhone,
      notes,
      paymentMethod,
    });

    confetti({ particleCount: 50, spread: 60 });
    playOrderSuccessSound();

    // Open WhatsApp
    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${currentRestaurant.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');

    onClose();
    onOpenOrderTracker();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🛒</span>
              <h3 className="font-bold text-base">Your Dining Order</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Table <span className="text-orange-400 font-bold">{selectedTableNumber}</span> • {currentRestaurant.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="font-bold text-slate-800 text-sm">Your order is empty</p>
              <p className="text-xs text-slate-500 mt-1">Browse our delicious dishes and add items!</p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3"
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

                      {/* Add-on breakdown */}
                      {item.selectedAddOns.length > 0 && (
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {item.selectedAddOns.map((a) => a.optionName).join(', ')}
                        </p>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[10px] text-orange-600 italic mt-0.5">
                          "{item.specialInstructions}"
                        </p>
                      )}

                      <div className="font-black text-xs text-slate-900 mt-1.5">
                        ₹{item.totalPrice}
                      </div>
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200">
                        <button
                          onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                          className="text-slate-500 hover:text-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 min-w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                          className="text-slate-500 hover:text-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Box */}
              <div className="border border-slate-200 rounded-xl p-3 bg-amber-50/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                  <Tag className="w-3.5 h-3.5 text-orange-500" />
                  Offers & Coupons
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-xs font-black text-emerald-800 tracking-wide">
                          {appliedCoupon.code} APPLIED
                        </div>
                        <div className="text-[10px] text-emerald-600">
                          {appliedCoupon.description}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo code (e.g. PIZZA20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs uppercase border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition"
                      >
                        Apply
                      </button>
                    </form>
                    {couponError && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {couponError}
                      </p>
                    )}

                    {/* Quick coupon chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {coupons
                        .filter((c) => c.isActive && c.restaurantId === currentRestaurant.id)
                        .map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => applyCoupon(c.code)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded border border-dashed border-orange-400 bg-white text-orange-600 hover:bg-orange-50"
                          >
                            {c.code}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Details */}
              <div className="border-t border-slate-100 pt-3 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Diner Details
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Phone (Optional)</label>
                    <input
                      type="tel"
                      placeholder="10 digit mobile"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Kitchen Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Please bring water first, make food extra spicy"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Pay With</label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {(['UPI_QR', 'CASH', 'CARD'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-1.5 px-2 rounded-lg border font-semibold text-center transition ${
                          paymentMethod === method
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-slate-200 text-slate-600'
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
          <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
            {/* Direct Table Order to Kitchen */}
            <button
              type="button"
              onClick={handleDirectOrder}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-between transition active:scale-98"
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
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
