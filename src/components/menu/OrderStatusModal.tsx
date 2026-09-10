import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Clock, ChefHat, Sparkles, X, ChevronRight, Utensils } from 'lucide-react';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lastPlacedOrder, currentRestaurant } = useApp();

  if (!isOpen || !lastPlacedOrder) return null;

  const getStatusStep = () => {
    switch (lastPlacedOrder.status) {
      case 'NEW':
        return 1;
      case 'PREPARING':
        return 2;
      case 'SERVED':
      case 'COMPLETED':
        return 3;
      default:
        return 1;
    }
  };

  const step = getStatusStep();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animation Icon */}
        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-tr from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
          <ChefHat className="w-8 h-8 animate-bounce" />
        </div>

        <h3 className="text-xl font-black text-slate-900">
          {step === 1 && 'Order Sent to Kitchen!'}
          {step === 2 && 'Cooking in Progress 🍳'}
          {step === 3 && 'Order Served! Enjoy Your Meal 😋'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {lastPlacedOrder.orderNumber} • Table {lastPlacedOrder.tableNumber}
        </p>

        {/* Live Stepper */}
        <div className="my-6 py-4 px-2 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between relative px-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition ${
                  step >= 1
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                ✓
              </div>
              <span className="text-[10px] font-bold text-slate-800 mt-1.5">Received</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition ${
                  step >= 2
                    ? 'bg-orange-500 text-white ring-4 ring-orange-100'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {step >= 2 ? '🍳' : '2'}
              </div>
              <span className="text-[10px] font-bold text-slate-800 mt-1.5">Preparing</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition ${
                  step >= 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {step >= 3 ? '🎉' : '3'}
              </div>
              <span className="text-[10px] font-bold text-slate-800 mt-1.5">Served</span>
            </div>

            {/* Connecting Bar */}
            <div className="absolute top-4 left-8 right-8 h-1 bg-slate-200 -z-0">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-orange-500 transition-all duration-500"
                style={{
                  width: step === 1 ? '30%' : step === 2 ? '75%' : '100%',
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Ordered items summary */}
        <div className="text-left bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-2 mb-5 max-h-40 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Order Items
          </div>
          {lastPlacedOrder.items.map((it) => (
            <div key={it.cartItemId} className="flex justify-between items-center text-slate-700">
              <span>{it.quantity}x {it.menuItem.name}</span>
              <span className="font-semibold text-slate-900">₹{it.totalPrice}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
            <span>Total Paid / Payable</span>
            <span className="text-orange-600">₹{lastPlacedOrder.totalAmount}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition"
        >
          Add More Items to Order
        </button>
      </div>
    </div>
  );
};
