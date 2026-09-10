import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import type { Order, OrderStatus } from '../../../types';
import { Check, X, Clock, ChefHat, CheckCircle2, Printer, AlertTriangle, Filter, Search, Phone } from 'lucide-react';
import { playNewOrderSound } from '../../../utils/sound';

export const LiveOrdersTab: React.FC = () => {
  const { orders, updateOrderStatus, currentRestaurant } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedOrderForKOT, setSelectedOrderForKOT] = useState<Order | null>(null);

  // Filter orders for current restaurant
  const restaurantOrders = orders.filter((o) => o.restaurantId === currentRestaurant.id);

  const filteredOrders = restaurantOrders.filter((order) => {
    if (filterStatus === 'ALL') return true;
    return order.status === filterStatus;
  });

  const handlePrintKOT = (order: Order) => {
    setSelectedOrderForKOT(order);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500 text-white flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            NEW ORDER 🔔
          </span>
        );
      case 'PREPARING':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5" />
            PREPARING
          </span>
        );
      case 'SERVED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500 text-white flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            SERVED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            PAID & COMPLETED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600">
            CANCELLED
          </span>
        );
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diffMs / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Top filter pills & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['ALL', 'NEW', 'PREPARING', 'SERVED', 'COMPLETED', 'CANCELLED'] as const).map((st) => {
            const count =
              st === 'ALL'
                ? restaurantOrders.length
                : restaurantOrders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  filterStatus === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{st === 'ALL' ? 'All Orders' : st}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    filterStatus === st ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => playNewOrderSound()}
          className="self-end sm:self-auto px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition"
          title="Test kitchen chime"
        >
          <span>🔔</span>
          <span>Test Sound</span>
        </button>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="text-4xl mb-2">📋</div>
          <h3 className="font-bold text-slate-800 text-base">No orders in this status</h3>
          <p className="text-xs text-slate-500 mt-1">
            New orders from customer QR scans will show up here in real-time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 no-print">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                order.status === 'NEW'
                  ? 'border-rose-300 ring-2 ring-rose-500/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">{order.orderNumber}</span>
                    <span className="bg-orange-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                      Table {order.tableNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(order.createdAt)}</span>
                    <span>•</span>
                    <span>{order.customerName}</span>
                  </div>
                </div>

                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Items List */}
              <div className="p-4 flex-1 space-y-2.5 text-xs text-slate-700">
                {order.items.map((it) => (
                  <div key={it.cartItemId} className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <span className="text-orange-600 font-extrabold">{it.quantity}x</span>
                        <span>{it.menuItem.name}</span>
                      </div>
                      {it.selectedAddOns.length > 0 && (
                        <div className="text-[10px] text-slate-500 pl-4 mt-0.5">
                          {it.selectedAddOns.map((a) => a.optionName).join(', ')}
                        </div>
                      )}
                      {it.specialInstructions && (
                        <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 italic">
                          "{it.specialInstructions}"
                        </div>
                      )}
                    </div>
                    <div className="font-bold text-slate-800 shrink-0">₹{it.totalPrice}</div>
                  </div>
                ))}

                {/* Customer Kitchen Note */}
                {order.notes && (
                  <div className="p-2 bg-orange-50/70 border border-orange-200/50 rounded-lg text-[11px] text-orange-800">
                    <span className="font-bold">Note:</span> {order.notes}
                  </div>
                )}
              </div>

              {/* Financial & Status Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    <span>Payment: </span>
                    <span className="font-bold text-slate-800">
                      {order.paymentMethod} ({order.paymentStatus === 'PAID_VIA_UPI' ? 'Paid' : 'Due'})
                    </span>
                  </div>
                  <div className="text-sm font-black text-slate-900">₹{order.totalAmount}</div>
                </div>

                {/* Action Controls based on status */}
                <div className="flex items-center gap-2">
                  {order.status === 'NEW' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                      >
                        <ChefHat className="w-3.5 h-3.5" />
                        <span>Accept & Cook</span>
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition"
                        title="Reject Order"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {order.status === 'PREPARING' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'SERVED')}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark as Served</span>
                    </button>
                  )}

                  {order.status === 'SERVED' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                      className="flex-1 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete & Paid</span>
                    </button>
                  )}

                  {/* Print KOT Button */}
                  <button
                    onClick={() => handlePrintKOT(order)}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                    title="Print Kitchen Order Ticket (KOT)"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable KOT (Kitchen Order Ticket) Template for Thermal / Receipt Printer */}
      {selectedOrderForKOT && (
        <div id="printable-kot" className="hidden print:block p-4 max-w-xs mx-auto text-black font-mono text-xs">
          <div className="text-center pb-2 border-b border-dashed border-black">
            <h2 className="text-base font-black uppercase tracking-wider">{currentRestaurant.name}</h2>
            <div className="text-sm font-bold mt-1">*** KITCHEN ORDER TICKET (KOT) ***</div>
            <div className="text-xs mt-1">Order: {selectedOrderForKOT.orderNumber} | Table: {selectedOrderForKOT.tableNumber}</div>
            <div className="text-[10px] mt-0.5">{new Date().toLocaleString()}</div>
          </div>

          <div className="py-2 border-b border-dashed border-black space-y-2">
            {selectedOrderForKOT.items.map((it, idx) => (
              <div key={idx} className="flex justify-between">
                <div>
                  <span className="font-bold text-sm">{it.quantity} x </span>
                  <span className="font-bold">{it.menuItem.name}</span>
                  {it.selectedAddOns.map((a) => (
                    <div key={a.optionId} className="text-[10px] pl-4">- {a.optionName}</div>
                  ))}
                  {it.specialInstructions && (
                    <div className="text-[10px] pl-4 italic">Note: {it.specialInstructions}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedOrderForKOT.notes && (
            <div className="py-2 border-b border-dashed border-black">
              <div className="font-bold uppercase">Customer Note:</div>
              <div>{selectedOrderForKOT.notes}</div>
            </div>
          )}

          <div className="pt-2 text-center text-[10px]">
            Server: Self-Order QR | Diner: {selectedOrderForKOT.customerName}
          </div>
        </div>
      )}
    </div>
  );
};
