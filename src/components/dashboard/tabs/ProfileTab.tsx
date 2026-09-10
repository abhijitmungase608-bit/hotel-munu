import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import type { ThemePreset } from '../../../types';
import { Palette, Check, Save, Image as ImageIcon, Store, Phone, Clock, MapPin, Sparkles } from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const { currentRestaurant, updateRestaurantProfile, changeTheme } = useApp();

  const [name, setName] = useState(currentRestaurant.name);
  const [tagline, setTagline] = useState(currentRestaurant.tagline);
  const [description, setDescription] = useState(currentRestaurant.description);
  const [phone, setPhone] = useState(currentRestaurant.phone);
  const [whatsapp, setWhatsapp] = useState(currentRestaurant.whatsappNumber);
  const [address, setAddress] = useState(currentRestaurant.address);
  const [openingTime, setOpeningTime] = useState(currentRestaurant.openingTime);
  const [closingTime, setClosingTime] = useState(currentRestaurant.closingTime);
  const [logo, setLogo] = useState(currentRestaurant.branding.logo);
  const [cover, setCover] = useState(currentRestaurant.branding.coverImage);

  const themeTemplates: {
    id: ThemePreset;
    name: string;
    description: string;
    bgClass: string;
    accentColor: string;
  }[] = [
    {
      id: 'amber',
      name: 'Cafe Amber & Bistro',
      description: 'Warm cafe vibe, gold-amber accents, best for bakeries and coffee shops',
      bgClass: 'from-amber-500 to-orange-600',
      accentColor: '#f59e0b',
    },
    {
      id: 'emerald',
      name: 'Modern Emerald',
      description: 'Clean, fresh organic dining, great for vegan and health food cafes',
      bgClass: 'from-emerald-500 to-teal-700',
      accentColor: '#10b981',
    },
    {
      id: 'crimson',
      name: 'Sunset Crimson & Pizzeria',
      description: 'Bold red tones, perfect for Italian restaurants, fast food and street food',
      bgClass: 'from-rose-500 to-red-700',
      accentColor: '#f43f5e',
    },
    {
      id: 'luxury',
      name: 'Luxury Dark & Gold',
      description: 'Fine dining, upscale lounges, dark royal aesthetics and serif fonts',
      bgClass: 'from-yellow-600 to-amber-900',
      accentColor: '#eab308',
    },
    {
      id: 'neon',
      name: 'Cyber Neon & Rooftop',
      description: 'Futuristic cyan accents, popular for lounges, nightclubs and youth spots',
      bgClass: 'from-cyan-500 to-blue-600',
      accentColor: '#06b6d4',
    },
  ];

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurantProfile({
      name,
      tagline,
      description,
      phone,
      whatsappNumber: whatsapp,
      address,
      openingTime,
      closingTime,
      branding: {
        ...currentRestaurant.branding,
        logo,
        coverImage: cover,
      },
    });
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      {/* Top Save action banner */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">Restaurant Profile & Customization</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize branding, digital menu theme, operating hours, and customer contact details.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Theme Templates Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-sm text-slate-900">Menu Design Theme & Template</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {themeTemplates.map((t) => {
            const isSelected = currentRestaurant.branding.theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/20 shadow-md ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-12 w-full rounded-xl bg-gradient-to-r ${t.bgClass} flex items-center justify-end p-2.5 text-white shadow-sm mb-3`}
                >
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-bold shadow">
                      ✓
                    </span>
                  )}
                </div>

                <div className="font-bold text-slate-900 text-xs">{t.name}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restaurant Basic Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900">General Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            About Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              WhatsApp Orders Number (with Country Code)
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="e.g. 919876543210"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Physical Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Opening Time
            </label>
            <input
              type="text"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Closing Time
            </label>
            <input
              type="text"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Visual Branding: Logo & Cover */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900">Imagery & Banners</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Logo URL
            </label>
            <input
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
            {logo && (
              <img
                src={logo}
                alt="Logo preview"
                className="mt-2 w-16 h-16 rounded-xl object-cover border border-slate-200"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Cover Banner Image URL
            </label>
            <input
              type="url"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
            {cover && (
              <img
                src={cover}
                alt="Cover preview"
                className="mt-2 w-full h-16 rounded-xl object-cover border border-slate-200"
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
