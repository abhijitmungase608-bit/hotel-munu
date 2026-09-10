import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, SlidersHorizontal, Sparkles } from 'lucide-react';

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
    <aside
      aria-label="App Navigation Bar"
      className="fixed bottom-0 sm:bottom-4 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 w-full sm:max-w-md mx-auto no-print px-0 sm:px-3"
    >
      <div className="bg-slate-950/95 backdrop-blur-2xl text-white py-2 px-2 sm:px-4 rounded-t-3xl sm:rounded-full shadow-2xl border-t sm:border border-slate-800/90 flex items-center justify-around gap-1">
        {/* TAB 1: HOME */}
        <button
          onClick={() => setCurrentView('landing')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 active:scale-90 group relative ${
            currentView === 'landing'
              ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                currentView === 'landing' ? 'scale-110 text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}
              viewBox="0 0 24 24"
              fill={currentView === 'landing' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={currentView === 'landing' ? '1.8' : '2'}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" fill={currentView === 'landing' ? '#090d16' : 'none'} />
            </svg>
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight">Home</span>
        </button>

        {/* TAB 2: DIGITAL MENU */}
        <button
          onClick={() => setCurrentView('menu')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 active:scale-90 group relative ${
            currentView === 'menu'
              ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                currentView === 'menu' ? 'scale-110 text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Modern Utensils & Plate / Food App Icon */}
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18" />
              <path d="M12 8a4 4 0 0 1 4 4" />
              <path d="M12 16a4 4 0 0 1-4-4" />
            </svg>
            <span className="absolute -top-1.5 -right-3.5 bg-amber-500 text-slate-950 font-black text-[8px] px-1 py-0.2 rounded-full shadow">
              T-{selectedTableNumber}
            </span>
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight">Menu</span>
        </button>

        {/* TAB 3: KITCHEN DASHBOARD (WITH LIVE ORDER BADGE) */}
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 active:scale-90 group relative ${
            currentView === 'dashboard'
              ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                currentView === 'dashboard' ? 'scale-110 text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Chef Hat & Kitchen Order App Icon */}
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" x2="18" y1="17" y2="17" />
            </svg>
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1.5 -right-3 min-w-[17px] h-[17px] bg-rose-500 text-white font-black text-[9px] rounded-full flex items-center justify-center px-0.5 shadow-md shadow-rose-500/50 animate-pulse">
                {activeOrdersCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight">Kitchen</span>
        </button>

        {/* TAB 4: ADMIN */}
        <button
          onClick={() => setCurrentView('admin')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 active:scale-90 group relative ${
            currentView === 'admin'
              ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                currentView === 'admin' ? 'scale-110 text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Modern Shield / Admin App Icon */}
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="text-[10px] mt-1 font-semibold tracking-tight">Admin</span>
        </button>

        {/* TAB 5: QUICK TABLE / RESTAURANT SWITCHER POPUP */}
        <div className="relative shrink-0 pr-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full transition active:scale-90 ${
              isOpen ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
            title="Switch Table # or Restaurant"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {isOpen && (
            <div className="absolute bottom-full mb-3 right-0 bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl min-w-[260px] text-xs text-left animate-in fade-in slide-in-from-bottom-3 z-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Active Demo Restaurant
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div className="space-y-1 mb-4">
                {restaurants.map((rest) => (
                  <button
                    key={rest.id}
                    onClick={() => {
                      setActiveRestaurantSlug(rest.slug);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                      activeRestaurantSlug === rest.slug
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{rest.name}</span>
                    {activeRestaurantSlug === rest.slug && (
                      <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-2">
                Select Table for Customer Menu
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {tables.map((tbl) => (
                  <button
                    key={tbl.id}
                    onClick={() => {
                      setSelectedTableNumber(tbl.tableNumber);
                      setIsOpen(false);
                    }}
                    className={`py-1.5 rounded-lg text-center font-black transition ${
                      selectedTableNumber === tbl.tableNumber
                        ? 'bg-orange-500 text-white shadow-xs'
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
