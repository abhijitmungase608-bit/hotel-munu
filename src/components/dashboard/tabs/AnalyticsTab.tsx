import React from 'react';
import { useApp } from '../../../context/AppContext';
import { TrendingUp, Users, ShoppingBag, Eye, Award, DollarSign } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { currentRestaurant, orders, menuItems } = useApp();

  const days = [
    { day: 'Mon', views: 320, orders: 42, revenue: 8400 },
    { day: 'Tue', views: 410, orders: 58, revenue: 11200 },
    { day: 'Wed', views: 380, orders: 49, revenue: 9800 },
    { day: 'Thu', views: 560, orders: 74, revenue: 14600 },
    { day: 'Fri', views: 890, orders: 118, revenue: 24500 },
    { day: 'Sat', views: 1240, orders: 165, revenue: 36800 },
    { day: 'Sun', views: 1150, orders: 152, revenue: 33400 },
  ];

  const maxViews = Math.max(...days.map((d) => d.views));

  const topItems = [
    { name: 'Spicy Paneer Tikka Pizza', orders: 142, revenue: '₹42,458', rating: 4.9 },
    { name: 'Margherita Fresca Pizza', orders: 118, revenue: '₹29,382', rating: 4.8 },
    { name: 'Classic Hazelnut Cold Coffee', orders: 215, revenue: '₹27,735', rating: 4.9 },
    { name: 'Crispy Peri-Peri Chicken Burger', orders: 89, revenue: '₹20,381', rating: 4.8 },
    { name: 'Peri-Peri Crinkle Fries Basket', orders: 164, revenue: '₹21,156', rating: 4.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Top 4 Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's QR Views</div>
          <div className="text-2xl font-black text-slate-900 mt-1">248</div>
          <div className="text-xs text-emerald-600 font-bold mt-1">↑ +14% vs yesterday</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Menu Views</div>
          <div className="text-2xl font-black text-slate-900 mt-1">1,240</div>
          <div className="text-xs text-slate-500 mt-1">Last 7 Days</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders Placed</div>
          <div className="text-2xl font-black text-slate-900 mt-1">86</div>
          <div className="text-xs text-emerald-600 font-bold mt-1">↑ +9% conversion</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Sales (₹)</div>
          <div className="text-2xl font-black text-slate-900 mt-1">₹18,450</div>
          <div className="text-xs text-emerald-600 font-bold mt-1">Average Order: ₹214</div>
        </div>
      </div>

      {/* SVG Bar Chart: Weekly QR Menu Views */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Weekly QR Scans & Footfall</h3>
            <p className="text-xs text-slate-500">Scan traffic across days of the week</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-orange-500"></span>
              <span>Menu Views</span>
            </div>
          </div>
        </div>

        {/* Dynamic Bar Chart */}
        <div className="pt-6 pb-2">
          <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-48 border-b border-slate-100 px-2">
            {days.map((d) => {
              const heightPercent = Math.round((d.views / maxViews) * 100);
              return (
                <div key={d.day} className="flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-bold text-slate-400 group-hover:text-orange-600 transition">
                    {d.views}
                  </div>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-amber-400 group-hover:from-orange-600 group-hover:to-amber-500 transition-all duration-500 rounded-t-lg"
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top 5 Dishes Ranking */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Top Performing Dishes</h3>
            <p className="text-xs text-slate-500">Most ordered food items ranked by revenue</p>
          </div>
          <Award className="w-5 h-5 text-amber-500" />
        </div>

        <div className="divide-y divide-slate-100">
          {topItems.map((item, index) => (
            <div key={item.name} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                    index === 0
                      ? 'bg-amber-100 text-amber-800'
                      : index === 1
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-slate-500 text-[11px]">{item.orders} orders served</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-slate-900">{item.revenue}</div>
                <div className="text-amber-500 font-semibold text-[11px]">★ {item.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
