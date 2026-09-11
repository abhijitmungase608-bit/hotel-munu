import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Clock, MapPin, Phone, Info, ChevronRight, Utensils, X, Check } from 'lucide-react';

export const MenuHeader: React.FC = () => {
  const { currentRestaurant, selectedTableNumber, setSelectedTableNumber, tables, isCustomerDiningMode } = useApp();
  const [showTableModal, setShowTableModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="relative bg-white border-b border-slate-100 shadow-sm">
      {/* Cover Image */}
      {currentRestaurant.branding.showCoverPhoto && (
        <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={currentRestaurant.branding.coverImage}
            alt={currentRestaurant.name}
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Table Badge on Cover */}
          <div className="absolute top-4 right-4 z-10">
            {isCustomerDiningMode ? (
              <div
                className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50"
                title={`You are dining at Table ${selectedTableNumber}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Table {selectedTableNumber}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowTableModal(true)}
                className="bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50 transition hover:scale-105 cursor-pointer"
                title="Change Table Number (Demo / Staff)"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Table {selectedTableNumber}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </div>

          {/* Open Status Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <span>●</span> Open Now
            </span>
          </div>
        </div>
      )}

      {/* Restaurant Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-4">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="relative -mt-10 sm:-mt-12 shrink-0">
            <img
              src={currentRestaurant.branding.logo}
              alt={currentRestaurant.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                {currentRestaurant.name}
              </h1>
              <button
                onClick={() => setShowInfoModal(true)}
                className="p-1.5 text-slate-400 hover:text-orange-500 rounded-full hover:bg-slate-100 transition"
                title="Restaurant info & timings"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-orange-600 font-semibold mt-0.5">
              {currentRestaurant.tagline}
            </p>

            {/* Quick Meta Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{currentRestaurant.rating}</span>
                <span className="text-amber-600/70 font-normal">({currentRestaurant.totalReviews}+)</span>
              </div>

              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentRestaurant.openingTime} - {currentRestaurant.closingTime}</span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[200px]">{currentRestaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Select Your Table</h3>
                <p className="text-xs text-slate-500">Check the sticker on your table</p>
              </div>
              <button
                onClick={() => setShowTableModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5 my-4 max-h-60 overflow-y-auto p-1">
              {tables.map((t) => {
                const isSelected = selectedTableNumber === t.tableNumber;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTableNumber(t.tableNumber);
                      setShowTableModal(false);
                    }}
                    className={`py-3 px-2 rounded-xl text-center font-bold text-sm transition border ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/30'
                        : 'bg-slate-50 hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-semibold opacity-70">Table</div>
                    <div className="text-base">{t.tableNumber}</div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowTableModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              Confirm Table
            </button>
          </div>
        </div>
      )}

      {/* Restaurant Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">About {currentRestaurant.name}</h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {currentRestaurant.description}
            </p>

            {/* Ambience Gallery Photos */}
            {currentRestaurant.galleryImages && currentRestaurant.galleryImages.length > 0 && (
              <div className="mb-4">
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-2">
                  Hotel Ambience & Dining Space
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {currentRestaurant.galleryImages.slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Hotel Ambience"
                      className="h-16 w-full rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{currentRestaurant.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Operating Hours: {currentRestaurant.openingTime} - {currentRestaurant.closingTime}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Call Restaurant: {currentRestaurant.phone}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
