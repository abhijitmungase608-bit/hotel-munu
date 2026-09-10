import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, LayoutDashboard, Globe, Shield, Radio, ChevronDown, UtensilsCrossed } from 'lucide-react';

export const LiveDemoSwitcher: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    orders,
    selectedTableNumber,
    setSelectedTableNumber,
    tables,
    activeRestaurantSlug,
    setActiveRestaurantSlug,
    restaurants,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const activeOrdersCount = orders.filter((o) => o.status === 'NEW' || o.status === 'PREPARING').length;

  return (
    <aside aria-label="Demo view switcher" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-fit no-print">
      <div className="bg-slate-900/90 backdrop-blur-md text-white p-1.5 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-1">
        {/* Real-time Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Sync
        </div>

        {/* View 1: Public SaaS Landing */}
        <button
          onClick={() => setCurrentView('landing')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            currentView === 'landing'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>SaaS Home</span>
        </button>

        {/* View 2: Customer QR Menu */}
        <button
          onClick={() => setCurrentView('menu')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            currentView === 'menu'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Customer Menu</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">T-{selectedTableNumber}</span>
        </button>

        {/* View 3: Restaurant Owner Dashboard */}
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition relative ${
            currentView === 'dashboard'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Owner Dashboard</span>
          {activeOrdersCount > 0 && (
            <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold animate-pulse">
              {activeOrdersCount}
            </span>
          )}
        </button>

        {/* View 4: Super Admin */}
        <button
          onClick={() => setCurrentView('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            currentView === 'admin'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>

        {/* Table & Cafe Quick Switcher Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
            title="Switch Table or Cafe"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute bottom-full mb-2 right-0 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl min-w-[220px] text-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Active Restaurant
              </div>
              <div className="space-y-1 mb-3">
                {restaurants.map((rest) => (
                  <button
                    key={rest.id}
                    onClick={() => {
                      setActiveRestaurantSlug(rest.slug);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      activeRestaurantSlug === rest.slug
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{rest.name}</span>
                  </button>
                ))}
              </div>

              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Switch Customer Table #
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {tables.map((tbl) => (
                  <button
                    key={tbl.id}
                    onClick={() => {
                      setSelectedTableNumber(tbl.tableNumber);
                      setIsOpen(false);
                    }}
                    className={`py-1 rounded text-center font-bold ${
                      selectedTableNumber === tbl.tableNumber
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    T-{tbl.tableNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
