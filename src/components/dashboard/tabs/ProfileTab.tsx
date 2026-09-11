import React, { useState, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import type { ThemePreset } from '../../../types';
import {
  Palette,
  Check,
  Save,
  Image as ImageIcon,
  Store,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  CreditCard,
  Eye,
  Type,
  Utensils,
  Layers,
  FileText,
  Percent,
  X,
} from 'lucide-react';

const COMMON_CUISINES = [
  'North Indian',
  'South Indian',
  'Tandoor',
  'Mughlai',
  'Chinese',
  'Continental',
  'Italian',
  'Fast Food',
  'Street Food',
  'Biryani',
  'Cafe & Beverages',
  'Bakery & Desserts',
];

export const ProfileTab: React.FC = () => {
  const {
    currentRestaurant,
    updateRestaurantProfile,
    changeTheme,
    setCurrentView,
    setSelectedTableNumber,
    setIsCustomerDiningMode,
    showToast,
  } = useApp();

  // Basic Information
  const [name, setName] = useState(currentRestaurant.name);
  const [tagline, setTagline] = useState(currentRestaurant.tagline);
  const [description, setDescription] = useState(currentRestaurant.description);
  const [foodClassification, setFoodClassification] = useState<
    'VEG_ONLY' | 'VEG_AND_NONVEG' | 'JAIN_FRIENDLY' | 'HALAL'
  >(currentRestaurant.foodClassification || 'VEG_AND_NONVEG');

  // Cuisines
  const [cuisineTypes, setCuisineTypes] = useState<string[]>(
    currentRestaurant.cuisineTypes || ['North Indian', 'Tandoor', 'Mughlai', 'Chinese']
  );
  const [customCuisineInput, setCustomCuisineInput] = useState('');

  // Contact, Location & Billing
  const [phone, setPhone] = useState(currentRestaurant.phone);
  const [whatsapp, setWhatsapp] = useState(currentRestaurant.whatsappNumber);
  const [address, setAddress] = useState(currentRestaurant.address);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(currentRestaurant.googleMapsUrl || '');
  const [upiId, setUpiId] = useState(currentRestaurant.upiId || 'hotelmunu@upi');
  const [fssaiNumber, setFssaiNumber] = useState(currentRestaurant.fssaiNumber || '11521034000123');
  const [gstRatePercent, setGstRatePercent] = useState<number>(currentRestaurant.gstRatePercent || 5);

  // Timings & Availability
  const [openingTime, setOpeningTime] = useState(currentRestaurant.openingTime);
  const [closingTime, setClosingTime] = useState(currentRestaurant.closingTime);
  const [isOpen, setIsOpen] = useState(currentRestaurant.isOpen);

  // Imagery & Visuals
  const [logo, setLogo] = useState(currentRestaurant.branding.logo);
  const [cover, setCover] = useState(currentRestaurant.branding.coverImage);
  const [showCoverPhoto, setShowCoverPhoto] = useState(currentRestaurant.branding.showCoverPhoto);
  const [compactMenu, setCompactMenu] = useState(currentRestaurant.branding.compactMenu);
  const [fontFamily, setFontFamily] = useState(currentRestaurant.branding.fontFamily);
  const [primaryColor, setPrimaryColor] = useState(currentRestaurant.branding.primaryColor || '#f97316');
  const [galleryImages, setGalleryImages] = useState<string[]>(
    currentRestaurant.galleryImages || [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=80',
    ]
  );
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState('');

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [logoUploadMode, setLogoUploadMode] = useState<'upload' | 'url'>('upload');
  const [coverUploadMode, setCoverUploadMode] = useState<'upload' | 'url'>('upload');

  // Hidden file input refs
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Theme Templates
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

  // Image Upload Handlers
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogo(event.target.result as string);
          showToast('Logo Selected', 'Logo image loaded from device', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCover(event.target.result as string);
          showToast('Cover Banner Selected', 'Cover banner loaded from device', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setGalleryImages((prev) => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      showToast('Photos Added', `${files.length} hotel photo(s) added to gallery`, 'success');
    }
  };

  const handleAddGalleryUrl = () => {
    if (newGalleryUrlInput.trim()) {
      setGalleryImages((prev) => [...prev, newGalleryUrlInput.trim()]);
      setNewGalleryUrlInput('');
      showToast('Photo Added', 'Image URL added to gallery', 'success');
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    showToast('Photo Removed', 'Image removed from gallery', 'info');
  };

  // Cuisine Helpers
  const handleToggleCuisine = (cuisine: string) => {
    if (cuisineTypes.includes(cuisine)) {
      if (cuisineTypes.length <= 1) {
        showToast('Notice', 'At least one cuisine type is required', 'warning');
        return;
      }
      setCuisineTypes(cuisineTypes.filter((c) => c !== cuisine));
    } else {
      setCuisineTypes([...cuisineTypes, cuisine]);
    }
  };

  const handleAddCustomCuisine = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customCuisineInput.trim();
    if (val && !cuisineTypes.includes(val)) {
      setCuisineTypes([...cuisineTypes, val]);
      setCustomCuisineInput('');
      showToast('Cuisine Added', `Added "${val}" to cuisine types`, 'success');
    }
  };

  // Save All Changes
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedProfile = {
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      cuisineTypes,
      foodClassification,
      phone: phone.trim(),
      whatsappNumber: whatsapp.trim(),
      address: address.trim(),
      googleMapsUrl: googleMapsUrl.trim(),
      upiId: upiId.trim(),
      fssaiNumber: fssaiNumber.trim(),
      gstRatePercent: Number(gstRatePercent),
      openingTime: openingTime.trim(),
      closingTime: closingTime.trim(),
      isOpen,
      galleryImages,
      branding: {
        ...currentRestaurant.branding,
        logo,
        coverImage: cover,
        showCoverPhoto,
        compactMenu,
        fontFamily,
        primaryColor,
      },
    };

    setTimeout(() => {
      updateRestaurantProfile(updatedProfile);
      setIsSaving(false);
      showToast('Profile Updated Successfully!', 'All hotel details and photos have been saved', 'success');
    }, 300);
  };

  // Quick Customer Preview
  const handleOpenCustomerPreview = () => {
    setSelectedTableNumber('1');
    setIsCustomerDiningMode(true);
    setCurrentView('menu');
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER ACTION BAR                                                  */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-0 z-20 backdrop-blur-md bg-white/95">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Design & Hotel Profile Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full control over hotel photos, logo, branding, timings, and digital menu theme.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenCustomerPreview}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            title="Preview how diners see your hotel profile and menu"
          >
            <ExternalLink className="w-4 h-4 text-orange-500" />
            <span>Customer View</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HOTEL PROFILE IMAGERY & GALLERY (DIRECT UPLOAD & PREVIEW)              */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Hotel Profile Images & Cover Photos
              </h3>
              <p className="text-[11px] text-slate-500">
                Upload your hotel logo, entrance cover banner, and dining ambience gallery.
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full border border-orange-200">
            Direct Upload Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* A. HOTEL LOGO (Col 4) */}
          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Hotel Profile Logo
              </label>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setLogoUploadMode('upload')}
                  className={`px-2 py-0.5 rounded ${
                    logoUploadMode === 'upload' ? 'bg-orange-500 text-white' : 'text-slate-500'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setLogoUploadMode('url')}
                  className={`px-2 py-0.5 rounded ${
                    logoUploadMode === 'url' ? 'bg-orange-500 text-white' : 'text-slate-500'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Logo Preview */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img
                  src={logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80'}
                  alt="Hotel Logo"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md bg-white ring-1 ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => logoFileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 hover:bg-black/60 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[10px] font-bold cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="flex-1 space-y-2">
                {logoUploadMode === 'upload' ? (
                  <>
                    <input
                      ref={logoFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoFileInputRef.current?.click()}
                      className="w-full py-2 px-3 bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 font-bold text-xs rounded-xl border border-orange-300 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose From Phone/PC</span>
                    </button>
                    <p className="text-[10px] text-slate-400">Recommended square 500x500 PNG or JPG</p>
                  </>
                ) : (
                  <input
                    type="url"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  />
                )}
              </div>
            </div>
          </div>

          {/* B. COVER BANNER (Col 8) */}
          <div className="lg:col-span-8 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Hotel Header Cover Banner
              </label>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setCoverUploadMode('upload')}
                  className={`px-2 py-0.5 rounded ${
                    coverUploadMode === 'upload' ? 'bg-orange-500 text-white' : 'text-slate-500'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setCoverUploadMode('url')}
                  className={`px-2 py-0.5 rounded ${
                    coverUploadMode === 'url' ? 'bg-orange-500 text-white' : 'text-slate-500'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Banner Preview */}
            <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
              <img
                src={cover || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80'}
                alt="Hotel Cover"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3.5">
                <div className="text-white">
                  <div className="text-xs font-black truncate">{name}</div>
                  <div className="text-[10px] text-orange-300 truncate">{tagline}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => coverFileInputRef.current?.click()}
                className="absolute top-2 right-2 px-2.5 py-1 bg-black/60 hover:bg-black/80 text-white rounded-lg text-[10px] font-bold backdrop-blur-sm transition flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3 text-orange-400" />
                <span>Replace Cover</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {coverUploadMode === 'upload' ? (
                <>
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    className="py-2 px-3 bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs rounded-xl border border-orange-300 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner From Device</span>
                  </button>
                </>
              ) : (
                <input
                  type="url"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                />
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={showCoverPhoto}
                    onChange={(e) => setShowCoverPhoto(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Show on Customer Menu</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={compactMenu}
                    onChange={(e) => setCompactMenu(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Compact Mode</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* C. HOTEL AMBIENCE & GALLERY PHOTOS (MULTI-IMAGE ADD/REMOVE) */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span>Hotel Dining Ambience & Signature Photos</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-0.2 rounded-full text-[10px] font-black">
                  {galleryImages.length} Photos
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Add photos of your indoor dining hall, outdoor lawn, kitchen, and bar counter.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={galleryFileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Photos</span>
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
            {galleryImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className="relative group h-24 rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-900"
              >
                <img
                  src={imgSrc}
                  alt={`Hotel photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(idx)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm hover:scale-110 cursor-pointer"
                  title="Remove this photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Quick Add Placeholder box */}
            <button
              type="button"
              onClick={() => galleryFileInputRef.current?.click()}
              className="h-24 rounded-xl border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50/50 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-orange-600 transition cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px] font-bold">Add Photo</span>
            </button>
          </div>

          {/* Direct URL input fallback */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
            <input
              type="url"
              value={newGalleryUrlInput}
              onChange={(e) => setNewGalleryUrlInput(e.target.value)}
              placeholder="Or paste an image web URL (e.g. https://...)"
              className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            />
            <button
              type="button"
              onClick={handleAddGalleryUrl}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Add URL
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. HOTEL BASIC IDENTITY & CUISINES                                        */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900">Hotel Identity & Cuisines</h3>
            <p className="text-[11px] text-slate-500">
              Restaurant name, tagline, food classification, and specialty cuisines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Hotel / Restaurant Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-bold text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Authentic Taste • Pure Dining Experience"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            About the Hotel / Dining Story
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your kitchen philosophy, specialties, ambience..."
            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed"
          />
        </div>

        {/* Food Classification */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Food Type Classification
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'VEG_AND_NONVEG', label: 'Veg & Non-Veg 🍗', desc: 'Full multi-cuisine' },
              { id: 'VEG_ONLY', label: 'Pure Veg 🌱', desc: '100% vegetarian' },
              { id: 'JAIN_FRIENDLY', label: 'Jain Friendly 🥗', desc: 'No onion/garlic options' },
              { id: 'HALAL', label: 'Halal Certified 🌙', desc: 'Certified kitchen' },
            ].map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setFoodClassification(cat.id as any)}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  foodClassification === cat.id
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm ring-1 ring-orange-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{cat.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{cat.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Cuisine Specialities (Click to toggle)
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_CUISINES.map((c) => {
              const isSelected = cuisineTypes.includes(c);
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => handleToggleCuisine(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <span>✓</span>}
                  <span>{c}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Cuisine Input */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={customCuisineInput}
              onChange={(e) => setCustomCuisineInput(e.target.value)}
              placeholder="Add custom cuisine (e.g. Maharashtrian Thali, Mexican)..."
              className="max-w-xs px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            />
            <button
              type="button"
              onClick={handleAddCustomCuisine}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Add Cuisine
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CONTACT, ADDRESS, UPI PAYMENT & BILLING                                */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900">Contact, Location & Billing Details</h3>
            <p className="text-[11px] text-slate-500">
              Phone numbers, WhatsApp alerts, UPI ID for QR payments, and FSSAI registration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>Calling Phone Number</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span className="text-emerald-500">💬</span>
              <span>WhatsApp Orders Number</span>
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="919876543210 (with country code)"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-orange-500" />
              <span>Restaurant UPI ID (for QR bills)</span>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. hotelmunu@upi"
              className="w-full px-3.5 py-2.5 text-xs font-mono font-bold text-indigo-900 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-indigo-50/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Physical Hotel Address</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, Landmark, City, State, Pincode"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
              <span>Google Maps Direction URL</span>
            </label>
            <input
              type="url"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-orange-500" />
              <span>FSSAI License Registration Number</span>
            </label>
            <input
              type="text"
              value={fssaiNumber}
              onChange={(e) => setFssaiNumber(e.target.value)}
              placeholder="e.g. 11521034000123"
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-orange-500" />
              <span>Restaurant GST Tax Rate (%)</span>
            </label>
            <select
              value={gstRatePercent}
              onChange={(e) => setGstRatePercent(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            >
              <option value={5}>5% (Standard Restaurant GST)</option>
              <option value={12}>12% (AC Hotel / Dining)</option>
              <option value={18}>18% (Luxury / Bar Lounge)</option>
              <option value={0}>0% (Tax Exempted)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. OPERATING HOURS & RESTAURANT STATUS                                    */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900">Operating Hours & Live Status</h3>
              <p className="text-[11px] text-slate-500">
                Control whether the restaurant is currently accepting dining orders.
              </p>
            </div>
          </div>

          {/* Live Open / Closed Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-sm ${
              isOpen
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-500 text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>{isOpen ? 'RESTAURANT OPEN NOW' : 'TEMPORARILY CLOSED'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Daily Opening Time
            </label>
            <input
              type="text"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              placeholder="11:00 AM"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Daily Closing Time
            </label>
            <input
              type="text"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              placeholder="11:30 PM"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MENU DESIGN THEMES, COLOR & TYPOGRAPHY                                  */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900">Menu Design Theme & Template</h3>
            <p className="text-[11px] text-slate-500">
              Choose the look & feel of your customer-facing digital menu card.
            </p>
          </div>
        </div>

        {/* 5 Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {themeTemplates.map((t) => {
            const isSelected = currentRestaurant.branding.theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/25 shadow-md ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-12 w-full rounded-xl bg-gradient-to-r ${t.bgClass} flex items-center justify-end p-2.5 text-white shadow-sm mb-3`}
                >
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-black shadow">
                      ✓
                    </span>
                  )}
                </div>

                <div className="font-black text-slate-900 text-xs">{t.name}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.description}</p>
              </div>
            );
          })}
        </div>

        {/* Font Family & Color Customization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-orange-500" />
              <span>Menu Typography / Font</span>
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern & Clean)</option>
              <option value="Inter">Inter (Ultra Legible & Sleek)</option>
              <option value="Outfit">Outfit (Youthful & Modern Cafe)</option>
              <option value="Playfair Display">Playfair Display (Luxury Fine Dining Serif)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-orange-500" />
              <span>Primary Accent Color</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl border border-slate-200 p-0.5 cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-32 px-3 py-2 text-xs font-mono font-bold uppercase border border-slate-200 rounded-xl"
              />
              <div className="flex items-center gap-1.5">
                {['#f97316', '#10b981', '#f43f5e', '#eab308', '#06b6d4', '#8b5cf6'].map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setPrimaryColor(c)}
                    style={{ backgroundColor: c }}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-xs hover:scale-110 transition cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. BOTTOM STICKY SAVE BANNER                                              */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black tracking-tight">Save & Publish All Hotel Updates</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Your new logo, photos, and hotel details will immediately reflect on all table QR codes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenCustomerPreview}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-orange-400" />
            <span>Test Customer Menu</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/30 transition flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
