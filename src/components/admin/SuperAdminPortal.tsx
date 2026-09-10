import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Building2, Users, CreditCard, ShoppingBag, ExternalLink, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

export const SuperAdminPortal: React.FC = () => {
  const { restaurants, orders, setCurrentView, setActiveRestaurantSlug, loginAs } = useApp();

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Super Admin Platform Console</h1>
            <p className="text-xs text-slate-400">Global multi-tenant restaurant SaaS controls</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('landing')}
          className="self-start sm:self-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Website</span>
        </button>
      </div>

      {/* Global Metrics */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Restaurants
          </div>
          <div className="text-2xl font-black text-white mt-1">{restaurants.length}</div>
          <div className="text-xs text-emerald-400 font-bold mt-1">100% Active</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Orders Processed
          </div>
          <div className="text-2xl font-black text-white mt-1">{orders.length}</div>
          <div className="text-xs text-indigo-400 font-bold mt-1">Contactless Dining</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Gross Order Volume
          </div>
          <div className="text-2xl font-black text-white mt-1">
            ₹{totalGMV.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-400 font-bold mt-1">↑ Platform GMV</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            SaaS Subscription ARR
          </div>
          <div className="text-2xl font-black text-white mt-1">₹8,376</div>
          <div className="text-xs text-purple-400 font-bold mt-1">Recurring Monthly</div>
        </div>
      </div>

      {/* Restaurants Directory Table */}
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Registered Restaurants & Tenants</h3>
          <span className="text-xs text-slate-400">{restaurants.length} Active Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Restaurant</th>
                <th className="py-3.5 px-5">City</th>
                <th className="py-3.5 px-5">Plan</th>
                <th className="py-3.5 px-5">Menu Slug</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {restaurants.map((rest) => (
                <tr key={rest.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={rest.branding.logo}
                        alt={rest.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{rest.name}</div>
                        <div className="text-[11px] text-slate-400">{rest.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">{rest.address.split(',')[1] || rest.address}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {rest.subscriptionPlan}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-400">/menu/{rest.slug}</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setActiveRestaurantSlug(rest.slug);
                        setCurrentView('menu');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition"
                    >
                      View Menu
                    </button>
                    <button
                      onClick={() => {
                        setActiveRestaurantSlug(rest.slug);
                        loginAs('OWNER', rest.id);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition"
                    >
                      Login as Owner
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
