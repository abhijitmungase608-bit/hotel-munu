import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Clock, MapPin, Phone, Info, ChevronDown, Share2, X, Check, Utensils } from 'lucide-react';

interface MenuHeaderProps {
  vegOnly: boolean;
  onToggleVegOnly: () => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ vegOnly, onToggleVegOnly }) => {
  const { currentRestaurant, selectedTableNumber, setSelectedTableNumber, tables, showToast } = useApp();
  const [showTableModal, setShowTableModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Menu link copied to clipboard', 'success');
    }
  };

  return (
    <div className="bg-white">
      {/* Native App Top Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between shadow-xs">
        {/* Table Selector Pill */}
        <button
          onClick={() => setShowTableModal(true)}
          className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-sm transition active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Table {selectedTableNumber}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition"
            title="Restaurant Info"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition"
            title="Share Menu"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Restaurant Hero Card (Zomato/Swiggy Native Style) */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-black text-slate-900 tracking-tight truncate">
                {currentRestaurant.name}
              </h1>
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                ✓
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
              {currentRestaurant.tagline}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1.5">
              <span className="truncate">{currentRestaurant.cuisineTypes.join(' • ')}</span>
            </div>
          </div>

          {/* Rating Badge Card */}
          <div className="bg-emerald-600 text-white px-2.5 py-1.5 rounded-xl shadow-xs text-center shrink-0">
            <div className="flex items-center justify-center gap-1 font-black text-xs">
              <span>{currentRestaurant.rating}</span>
              <Star className="w-3 h-3 fill-white text-white" />
            </div>
            <div className="text-[9px] text-emerald-100 font-medium">1.4k+ reviews</div>
          </div>
        </div>

        {/* Location & Timings Pill */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 truncate max-w-[240px]">
            <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
            <span className="truncate">{currentRestaurant.address.split(',')[0]}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
            <Clock className="w-3 h-3" />
            <span>Open Now</span>
          </div>
        </div>
      </div>

      {/* Table Selection Bottom Sheet */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            {/* Sheet Drag Handle */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden"></div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Select Your Table</h3>
                <p className="text-xs text-slate-500">Your table number is printed on your QR stand</p>
              </div>
              <button
                onClick={() => setShowTableModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 my-4">
              {tables.map((t) => {
                const isSelected = selectedTableNumber === t.tableNumber;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTableNumber(t.tableNumber);
                      setShowTableModal(false);
                    }}
                    className={`py-3 rounded-2xl text-center font-black text-xs transition border ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/30 scale-105'
                        : 'bg-slate-50 hover:bg-orange-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="text-[9px] uppercase font-bold opacity-70">Table</div>
                    <div className="text-base font-black">{t.tableNumber}</div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowTableModal(false)}
              className="w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Confirm Table
            </button>
          </div>
        </div>
      )}

      {/* Info Bottom Sheet */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-3">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-2 sm:hidden"></div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">About {currentRestaurant.name}</h3>
              <button onClick={() => setShowInfoModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{currentRestaurant.description}</p>
            <div className="space-y-2 text-xs text-slate-700 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{currentRestaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{currentRestaurant.openingTime} - {currentRestaurant.closingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{currentRestaurant.phone}</span>
              </div>
            </div>
            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full mt-3 py-2.5 bg-orange-500 text-white font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
