import React from 'react';
import { useApp } from '../../../context/AppContext';
import { DollarSign, ShoppingBag, Eye, Users, TrendingUp, Sparkles, ArrowUpRight, Clock, Plus, QrCode } from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { orders, currentRestaurant, tables, menuItems, setDashboardTab, setCurrentView, restaurants } = useApp();

  // Calculations
  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const restaurantOrders = orders.filter((o) => o.restaurantId === currentRestaurant.id);
  const totalRevenue = restaurantOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrders = restaurantOrders.filter((o) => o.status === 'NEW' || o.status === 'PREPARING');
  const occupiedTables = tables.filter((t) => t.status === 'occupied').length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Restaurant Operations
          </div>
          <h1 className="text-2xl font-black tracking-tight">{currentRestaurant.name}</h1>
          <p className="text-xs text-orange-100 mt-1 max-w-lg">
            Monitor real-time incoming orders, table turnover, QR scans, and kitchen performance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setDashboardTab('orders')}
            className="px-4 py-2.5 bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Live Orders</span>
            {activeOrders.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {activeOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setDashboardTab('tables')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate QRs</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards (Exact match to User Screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL RESTAURANTS */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            TOTAL RESTAURANTS
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {restaurants.length}
          </div>
          <div className="text-xs text-emerald-400 font-bold mt-1">
            100% Active
          </div>
        </div>

        {/* ORDERS PROCESSED */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ORDERS PROCESSED
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {orders.length}
          </div>
          <div className="text-xs text-indigo-400 font-bold mt-1">
            Contactless Dining
          </div>
        </div>

        {/* GROSS ORDER VOLUME */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            GROSS ORDER VOLUME
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            ₹{totalGMV.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-400 font-bold mt-1">
            ↑ Platform GMV
          </div>
        </div>

        {/* SAAS SUBSCRIPTION ARR */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            SAAS SUBSCRIPTION ARR
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            ₹8,376
          </div>
          <div className="text-xs text-purple-400 font-bold mt-1">
            Recurring Monthly
          </div>
        </div>
      </div>

      {/* Restaurant Operational Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this week</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
            ₹
          </div>
        </div>

        {/* KPI 2: Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Total Orders
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              {restaurantOrders.length}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-orange-600 font-bold mt-1">
              <Clock className="w-3 h-3" />
              <span>{activeOrders.length} in kitchen</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Occupancy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Table Occupancy
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              {occupiedTables} / {tables.length}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
              <span>{Math.round((occupiedTables / (tables.length || 1)) * 100)}% active tables</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Menu Views */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Today's QR Views
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              248 Scans
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>High diner conversion</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Section: Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders (col-8) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Recent Kitchen Tickets</h3>
            <button
              onClick={() => setDashboardTab('orders')}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              View All Orders →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {restaurantOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 font-black flex items-center justify-center text-xs">
                    T-{order.tableNumber}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      {order.orderNumber} • {order.customerName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {order.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900">₹{order.totalAmount}</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      order.status === 'NEW'
                        ? 'bg-rose-100 text-rose-700'
                        : order.status === 'PREPARING'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch & Bestseller highlights (col-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Quick Actions</h3>

            <button
              onClick={() => setDashboardTab('menu')}
              className="w-full p-3 bg-slate-50 hover:bg-orange-50 rounded-xl border border-slate-200 hover:border-orange-300 text-left flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🍕</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">Add New Dish</div>
                  <div className="text-[10px] text-slate-500">Update pricing & food items</div>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setDashboardTab('offers')}
              className="w-full p-3 bg-slate-50 hover:bg-orange-50 rounded-xl border border-slate-200 hover:border-orange-300 text-left flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🔥</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">Create Promo Offer</div>
                  <div className="text-[10px] text-slate-500">Run discounts & combo deals</div>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setCurrentView('menu')}
              className="w-full p-3 bg-slate-900 hover:bg-black text-white rounded-xl text-left flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">📱</span>
                <div>
                  <div className="text-xs font-bold">Preview Customer Menu</div>
                  <div className="text-[10px] text-slate-400">See how diners experience it</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
