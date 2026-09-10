import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OverviewTab } from './tabs/OverviewTab';
import { LiveOrdersTab } from './tabs/LiveOrdersTab';
import { MenuManagementTab } from './tabs/MenuManagementTab';
import { TableQRTab } from './tabs/TableQRTab';
import { OffersTab } from './tabs/OffersTab';
import { ProfileTab } from './tabs/ProfileTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SubscriptionTab } from './tabs/SubscriptionTab';
import {
  LayoutDashboard,
  ChefHat,
  UtensilsCrossed,
  QrCode,
  Tag,
  BarChart3,
  Palette,
  CreditCard,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X,
  Store,
} from 'lucide-react';
import { playNewOrderSound } from '../../utils/sound';

export const DashboardLayout: React.FC = () => {
  const {
    dashboardTab,
    setDashboardTab,
    currentRestaurant,
    orders,
    logout,
    setCurrentView,
    restaurants,
    setActiveRestaurantSlug,
  } = useApp();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const pendingOrdersCount = orders.filter(
    (o) => o.restaurantId === currentRestaurant.id && (o.status === 'NEW' || o.status === 'PREPARING')
  ).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'orders',
      label: 'Live Orders',
      icon: ChefHat,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
    { id: 'tables', label: 'Tables & QR Codes', icon: QrCode },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Design & Profile', icon: Palette },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
  ];

  const renderActiveTab = () => {
    switch (dashboardTab) {
      case 'overview':
        return <OverviewTab />;
      case 'orders':
        return <LiveOrdersTab />;
      case 'menu':
        return <MenuManagementTab />;
      case 'tables':
        return <TableQRTab />;
      case 'offers':
        return <OffersTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'profile':
        return <ProfileTab />;
      case 'subscription':
        return <SubscriptionTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 pb-20 md:pb-0">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1.5 text-slate-600 rounded-lg hover:bg-slate-100"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">🍕</span>
            <span className="font-extrabold text-slate-900 text-sm truncate max-w-[160px]">
              {currentRestaurant.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pendingOrdersCount > 0 && (
            <button
              onClick={() => {
                setDashboardTab('orders');
                setIsMobileNavOpen(false);
              }}
              className="px-2.5 py-1 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center gap-1 animate-pulse"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{pendingOrdersCount}</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('menu')}
            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg"
            title="Preview Menu"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-white z-40 flex flex-col justify-between shrink-0 transition-transform duration-300 no-print ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo & Cafe Selector */}
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍕</span>
              <span className="font-black text-lg tracking-tight text-white">MenuCard</span>
              <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded">
                OWNER
              </span>
            </div>

            {/* Restaurant Selector dropdown */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Active Restaurant
              </div>
              <select
                value={currentRestaurant.slug}
                onChange={(e) => setActiveRestaurantSlug(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              >
                {restaurants.map((r) => (
                  <option key={r.id} value={r.slug} className="bg-slate-900 text-white">
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = dashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setDashboardTab(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {/* Quick link to preview live menu */}
          <button
            onClick={() => setCurrentView('menu')}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            <span>Open Customer Menu</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full py-2 px-3 text-slate-400 hover:text-rose-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition hover:bg-slate-800/40"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 overflow-y-auto">
        {/* Top bar for desktop */}
        <div className="hidden md:flex items-center justify-between mb-6 bg-white px-6 py-3.5 rounded-2xl border border-slate-200 shadow-sm no-print">
          <div className="flex items-center gap-3">
            <img
              src={currentRestaurant.branding.logo}
              alt={currentRestaurant.name}
              className="w-9 h-9 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <h2 className="font-extrabold text-sm text-slate-900">{currentRestaurant.name}</h2>
              <p className="text-[11px] text-slate-500">
                Plan: <span className="font-bold text-orange-600">{currentRestaurant.subscriptionPlan}</span> • {currentRestaurant.address.split(',')[1] || currentRestaurant.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingOrdersCount > 0 && (
              <button
                onClick={() => setDashboardTab('orders')}
                className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>{pendingOrdersCount} New Orders</span>
              </button>
            )}

            <button
              onClick={() => playNewOrderSound()}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
              title="Test chime"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('menu')}
              className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Customer View</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {renderActiveTab()}
      </main>
    </div>
  );
};
