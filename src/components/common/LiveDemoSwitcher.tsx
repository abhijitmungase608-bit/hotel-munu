import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ChefHat,
  ShieldCheck,
  SlidersHorizontal,
  ShoppingBag,
  Store,
  ChevronDown,
  Check,
  Sparkles,
  QrCode,
  X,
  LogOut,
} from 'lucide-react';

export const LiveDemoSwitcher: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    dashboardTab,
    setDashboardTab,
    logout,
    orders,
    selectedTableNumber,
    setSelectedTableNumber,
    tables,
    activeRestaurantSlug,
    setActiveRestaurantSlug,
    restaurants,
    currentRestaurant,
    cart,
    setIsCartDrawerOpen,
    isCartDrawerOpen,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [isRestaurantDropdownOpen, setIsRestaurantDropdownOpen] = useState(false);

  const activeOrdersCount = orders.filter(
    (o) => o.restaurantId === currentRestaurant.id && (o.status === 'NEW' || o.status === 'PREPARING')
  ).length;

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP / LAPTOP TOP NAVIGATION HEADER (visible only on md: screens)   */}
      {/* ========================================================================= */}
      <header
        aria-label="Desktop Top Navigation"
        className="hidden md:block fixed top-0 left-0 right-0 z-40 h-14 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 text-white shadow-xl no-print"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* LEFT: Restaurant Brand & Quick Selectors */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo & Name */}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('overview');
              }}
              className="flex items-center gap-2.5 hover:opacity-90 transition text-left group cursor-pointer"
              title="Go to Hotel Munu Dashboard"
            >
              <img
                src={currentRestaurant.branding.logo}
                alt={currentRestaurant.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/20 group-hover:scale-105 transition"
              />
              <div>
                <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                  <span className="truncate max-w-[130px]">{currentRestaurant.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="text-[10px] text-orange-400 font-semibold tracking-wide">
                  Smart Dining OS
                </div>
              </div>
            </button>

            <div className="h-5 w-px bg-slate-800 mx-1"></div>

            {/* Quick Table Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsTableDropdownOpen(!isTableDropdownOpen);
                  setIsRestaurantDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
                  isTableDropdownOpen
                    ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                }`}
                title="Change Table Number"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Table {selectedTableNumber}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isTableDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 bg-slate-900 border border-slate-700/90 rounded-xl p-3 shadow-2xl z-50 text-left animate-in fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      Select Table
                    </span>
                    <button
                      onClick={() => setIsTableDropdownOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {tables.map((tbl) => (
                      <button
                        key={tbl.id}
                        onClick={() => {
                          setSelectedTableNumber(tbl.tableNumber);
                          setIsTableDropdownOpen(false);
                        }}
                        className={`py-1.5 rounded-lg text-xs font-black transition ${
                          selectedTableNumber === tbl.tableNumber
                            ? 'bg-orange-500 text-white shadow-sm'
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

            {/* Quick Restaurant Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsRestaurantDropdownOpen(!isRestaurantDropdownOpen);
                  setIsTableDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
                  isRestaurantDropdownOpen
                    ? 'bg-slate-800 text-orange-400 border-orange-500/50'
                    : 'bg-slate-900/90 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="Switch Demo Restaurant"
              >
                <Store className="w-3.5 h-3.5 text-orange-400" />
                <span className="truncate max-w-[100px]">{currentRestaurant.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRestaurantDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 bg-slate-900 border border-slate-700/90 rounded-xl p-2.5 shadow-2xl z-50 text-left animate-in fade-in space-y-1">
                  <div className="text-[10px] uppercase font-black text-slate-400 px-2 py-1 tracking-wider">
                    Demo Restaurants
                  </div>
                  {restaurants.map((rest) => (
                    <button
                      key={rest.id}
                      onClick={() => {
                        setActiveRestaurantSlug(rest.slug);
                        setIsRestaurantDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                        activeRestaurantSlug === rest.slug
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{rest.name}</span>
                      {activeRestaurantSlug === rest.slug && (
                        <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 ml-1.5" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CENTER: Primary Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {/* 1. Dashboard Overview */}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('overview');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentView === 'dashboard' && dashboardTab === 'overview'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* 2. Customer Menu */}
            <button
              onClick={() => setCurrentView('menu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 relative cursor-pointer ${
                currentView === 'menu'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Customer Menu</span>
              <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full shadow-xs">
                T-{selectedTableNumber}
              </span>
            </button>

            {/* 3. Kitchen Dashboard */}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('orders');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 relative cursor-pointer ${
                currentView === 'dashboard' && dashboardTab === 'orders'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Kitchen KDS</span>
              {activeOrdersCount > 0 && (
                <span className="bg-rose-500 text-white font-black text-[9px] min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1 shadow-xs animate-pulse">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            {/* 4. Super Admin */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </button>
          </nav>

          {/* RIGHT: Quick Cart & Demo Switcher Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Cart Button */}
            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                title="View Dining Order"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px] font-black">
                  ₹{cartSubtotal}
                </span>
              </button>
            )}

            {/* Quick Demo Controls */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition border text-xs font-bold flex items-center gap-1.5 ${
                isOpen
                  ? 'bg-orange-500 text-white border-orange-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
              title="Demo Switcher Settings"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden xl:inline text-xs">Demo Switcher</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE APP BOTTOM NAVIGATION BAR (visible only on mobile phone screens) */}
      {/* ========================================================================= */}
      {/* Automatically hide when cart drawer is open on mobile to prevent overlapping */}
      {!isCartDrawerOpen && (
        <aside
          aria-label="Mobile App Navigation Bar"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full bg-slate-950/95 backdrop-blur-2xl text-white border-t border-slate-800/90 shadow-2xl px-2 pt-1.5 pb-safe pb-2 no-print animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
            {/* MOBILE TAB 1: DASHBOARD */}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('overview');
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-90 group relative ${
                currentView === 'dashboard' && dashboardTab === 'overview'
                  ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard
                className={`w-5 h-5 transition-transform duration-200 ${
                  currentView === 'dashboard' && dashboardTab === 'overview'
                    ? 'scale-110 text-orange-400'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              <span className="text-[10px] mt-1 font-semibold tracking-tight">Dashboard</span>
            </button>

            {/* MOBILE TAB 2: DIGITAL MENU (WITH CRISP UTENSILS ICON & TABLE BADGE) */}
            <button
              onClick={() => setCurrentView('menu')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-90 group relative ${
                currentView === 'menu'
                  ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <UtensilsCrossed
                  className={`w-5 h-5 transition-transform duration-200 ${
                    currentView === 'menu' ? 'scale-110 text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="absolute -top-1.5 -right-3.5 bg-amber-400 text-slate-950 font-black text-[8px] px-1 py-0.2 rounded-full shadow">
                  T-{selectedTableNumber}
                </span>
              </div>
              <span className="text-[10px] mt-1 font-semibold tracking-tight">Menu</span>
            </button>

            {/* MOBILE TAB 3: KITCHEN DASHBOARD (WITH LIVE ORDER BADGE) */}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('orders');
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-90 group relative ${
                currentView === 'dashboard' && dashboardTab === 'orders'
                  ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <ChefHat
                  className={`w-5 h-5 transition-transform duration-200 ${
                    currentView === 'dashboard' && dashboardTab === 'orders'
                      ? 'scale-110 text-orange-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {activeOrdersCount > 0 && (
                  <span className="absolute -top-1.5 -right-3 min-w-[17px] h-[17px] bg-rose-500 text-white font-black text-[9px] rounded-full flex items-center justify-center px-0.5 shadow-md shadow-rose-500/50 animate-pulse">
                    {activeOrdersCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-semibold tracking-tight">Kitchen</span>
            </button>

            {/* MOBILE TAB 4: ADMIN */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-90 group relative ${
                currentView === 'admin'
                  ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck
                className={`w-5 h-5 transition-transform duration-200 ${
                  currentView === 'admin' ? 'scale-110 text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              <span className="text-[10px] mt-1 font-semibold tracking-tight">Admin</span>
            </button>

            {/* MOBILE TAB 5: QUICK SWITCHER MODAL TRIGGER */}
            <div className="relative shrink-0 pr-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl transition active:scale-90 ${
                  isOpen ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
                title="Switch Table # or Restaurant"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ========================================================================= */}
      {/* 3. GLOBAL DEMO SETTINGS MODAL / FLYOUT (FOR BOTH MOBILE & DESKTOP)       */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl max-w-sm w-full text-xs text-left animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-black text-white">Live Demo Controls</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Switch Restaurant */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Active Restaurant
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div className="space-y-1.5">
                {restaurants.map((rest) => (
                  <button
                    key={rest.id}
                    onClick={() => {
                      setActiveRestaurantSlug(rest.slug);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition ${
                      activeRestaurantSlug === rest.slug
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Store className="w-4 h-4 text-orange-400 shrink-0" />
                      <span className="truncate">{rest.name}</span>
                    </div>
                    {activeRestaurantSlug === rest.slug && (
                      <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Switch Table */}
            <div>
              <div className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-2">
                Select Table for Dining Menu
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {tables.map((tbl) => (
                  <button
                    key={tbl.id}
                    onClick={() => {
                      setSelectedTableNumber(tbl.tableNumber);
                      setIsOpen(false);
                    }}
                    className={`py-2 rounded-xl text-center font-black transition ${
                      selectedTableNumber === tbl.tableNumber
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    T-{tbl.tableNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
