import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  QrCode,
  Smartphone,
  ChefHat,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Search,
  Star,
  Plus,
  TrendingUp,
  Image as ImageIcon,
  DollarSign,
  Layers,
  BarChart3,
  ChevronDown,
  Printer,
  Utensils,
  Coffee,
  Hotel,
  Pizza,
  Cake,
  Wine,
  Flame,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setSelectedTableNumber, setActiveRestaurantSlug } = useApp();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [demoActiveCategory, setDemoActiveCategory] = useState<string>('Starters');
  const [demoSearch, setDemoSearch] = useState<string>('');
  const [demoAddedCount, setDemoAddedCount] = useState<number>(1);

  const demoDishes = [
    {
      id: 'd1',
      category: 'Starters',
      name: 'Paneer Tikka',
      desc: 'Marinated cottage cheese cubes roasted in tandoor',
      price: 220,
      rating: 4.8,
      veg: true,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'd2',
      category: 'Starters',
      name: 'Chicken Seekh Kebab',
      desc: 'Spiced minced chicken skewers with mint chutney',
      price: 250,
      rating: 4.9,
      veg: false,
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'd3',
      category: 'Main Course',
      name: 'Butter Chicken Special',
      desc: 'Tender chicken in rich buttery tomato cashew gravy',
      price: 280,
      rating: 4.9,
      veg: false,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'd4',
      category: 'Main Course',
      name: 'Dal Makhani Royal',
      desc: 'Slow cooked black lentils with churned butter and cream',
      price: 190,
      rating: 4.7,
      veg: true,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'd5',
      category: 'Breads & Roti',
      name: 'Butter Garlic Naan',
      desc: 'Soft tandoor flatbread with roasted garlic and butter',
      price: 60,
      rating: 4.8,
      veg: true,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'd6',
      category: 'Desserts',
      name: 'Gulab Jamun with Ice Cream',
      desc: 'Two warm golden khoya dumplings with vanilla scoop',
      price: 110,
      rating: 4.9,
      veg: true,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const filteredDemoDishes = demoDishes.filter((dish) => {
    const matchCat = demoActiveCategory === 'All' || dish.category === demoActiveCategory;
    const matchQuery = !demoSearch.trim() || dish.name.toLowerCase().includes(demoSearch.toLowerCase());
    return matchCat && matchQuery;
  });

  const faqs = [
    {
      q: 'What is Munu?',
      a: 'Munu is a modern SaaS platform designed for restaurants, cafes, and hotels to create digital menus, generate smart table QR codes, and allow diners to view food and place orders directly from their phones.',
    },
    {
      q: 'How does the QR menu work?',
      a: 'You generate a unique QR code for your restaurant or individual tables from the Munu dashboard. Diners simply point their smartphone camera at the QR code, and your digital menu opens instantly without downloading any app.',
    },
    {
      q: 'Can I update my menu anytime?',
      a: 'Yes, 100%! Any price change, new dish addition, or sold-out status updated in your dashboard reflects instantly on all customers’ phones in real time.',
    },
    {
      q: 'Do customers need to install an app?',
      a: 'No app download is needed. It runs natively and smoothly inside standard mobile browsers (Chrome, Safari, etc.) like a native application.',
    },
    {
      q: 'Can I add food images and descriptions?',
      a: 'Yes, you can upload high-resolution food photos, write mouth-watering descriptions, mark items as Veg or Non-Veg, and indicate spicy levels.',
    },
    {
      q: 'Can I change prices instantly?',
      a: 'Yes, you can update regular prices and discount prices in seconds with zero reprint costs.',
    },
    {
      q: 'Can I have multiple food categories?',
      a: 'Yes, you can create unlimited categories like Starters, Main Course, Breads, Drinks, Desserts, and organize them easily.',
    },
    {
      q: 'Is there a free plan available?',
      a: 'Yes! Munu offers a 100% Free Starter plan with full digital menu and QR code capabilities so you can get started risk-free.',
    },
  ];

  const restaurantTypes = [
    { icon: Utensils, label: 'Restaurants' },
    { icon: Coffee, label: 'Cafes' },
    { icon: Hotel, label: 'Hotels' },
    { icon: Flame, label: 'Fast Food' },
    { icon: Cake, label: 'Bakeries' },
    { icon: Pizza, label: 'Pizzerias' },
    { icon: Wine, label: 'Bars & Lounges' },
    { icon: Sparkles, label: 'Cloud Kitchens' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍕</span>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Munu<span className="text-orange-500">.</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-orange-600 transition">Home</a>
            <a href="#features" className="hover:text-orange-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-orange-600 transition">How It Works</a>
            <a href="#pricing" className="hover:text-orange-600 transition">Pricing</a>
            <a href="#demo" className="hover:text-orange-600 transition">Demo</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-orange-600 px-3 py-2 transition"
            >
              Login
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition transform active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-100/80 border border-orange-200 rounded-full text-xs font-bold text-orange-700 shadow-sm">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Smart Restaurant QR Digital Menu Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Your Restaurant Menu, <br />
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Now Digital.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Create a beautiful digital menu, generate a QR code, and let your customers access your menu instantly from their phones.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  <span>Create Your Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveRestaurantSlug('hotel-munu');
                    setSelectedTableNumber('4');
                    setCurrentView('menu');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <Smartphone className="w-4 h-4 text-orange-500" />
                  <span>View Demo</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Forever Plan
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero App Download
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 5-Min Setup
                </span>
              </div>
            </div>

            {/* Right Flow Visualization & Phone Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Flow Steps Indicator */}
              <div className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/90 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <span>Restaurant</span>
                <span className="text-orange-500 font-black">➔</span>
                <span className="flex items-center gap-1 text-slate-900 font-extrabold">
                  <QrCode className="w-3.5 h-3.5 text-orange-500" /> QR CODE
                </span>
                <span className="text-orange-500 font-black">➔</span>
                <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
                  <Smartphone className="w-3.5 h-3.5" /> Mobile Menu
                </span>
              </div>

              {/* Phone Device Mockup */}
              <div className="w-[300px] sm:w-[320px] bg-slate-900 p-3 rounded-[40px] shadow-2xl border-4 border-slate-800 relative">
                {/* Speaker pill */}
                <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>

                {/* Screen */}
                <div className="bg-slate-50 rounded-[30px] overflow-hidden text-slate-900 shadow-inner">
                  {/* Restaurant Header in Phone */}
                  <div className="bg-white p-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-xs text-slate-900">Hotel Munu</h4>
                      <div className="text-[10px] text-orange-600 font-bold">Authentic Taste</div>
                    </div>
                    <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-bold">
                      Table 04
                    </span>
                  </div>

                  {/* Search Bar in Phone */}
                  <div className="p-2.5 bg-white">
                    <div className="bg-slate-100 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Search className="w-3 h-3" />
                      <span>Search food...</span>
                    </div>
                  </div>

                  {/* Category Pills in Phone */}
                  <div className="flex gap-1 px-2.5 py-1.5 overflow-x-hidden text-[10px] font-bold">
                    <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full">Starters</span>
                    <span className="bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">Main</span>
                    <span className="bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">Drinks</span>
                  </div>

                  {/* Food Items in Phone */}
                  <div className="p-2.5 space-y-2 max-h-56 overflow-y-hidden">
                    <div className="bg-white p-2 rounded-xl border border-slate-100 flex gap-2 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&auto=format&fit=crop&q=80"
                        alt="Paneer Tikka"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-slate-900 truncate">Paneer Tikka</div>
                        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                          ★ 4.8 <span className="text-slate-900 font-black">₹220</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-orange-500 text-white rounded-lg text-[10px] font-bold">
                        + Add
                      </span>
                    </div>

                    <div className="bg-white p-2 rounded-xl border border-slate-100 flex gap-2 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&auto=format&fit=crop&q=80"
                        alt="Butter Chicken"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-slate-900 truncate">Butter Chicken</div>
                        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                          ★ 4.9 <span className="text-slate-900 font-black">₹280</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-orange-500 text-white rounded-lg text-[10px] font-bold">
                        + Add
                      </span>
                    </div>
                  </div>

                  {/* Floating App Order Bar in Phone */}
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between text-[11px] font-bold px-3 py-2">
                    <span>1 Item | ₹220</span>
                    <span>View Order ➔</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM ➔ SOLUTION SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Why Move Away From Paper Menus?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Traditional Menu Problems vs. Munu Solution
            </h2>
            <p className="text-sm text-slate-600">
              Save thousands on menu reprints and give your guests a frictionless dining experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Menu Problems */}
            <div className="bg-white p-7 rounded-3xl border border-rose-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-rose-100">
                <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  ❌
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  Traditional Menu Problems
                </h3>
              </div>

              <div className="space-y-3 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Heavy printing and lamination costs every month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Price updates are difficult and look messy with stickers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Damaged, torn, and unhygienic paper cards on tables</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Difficult to add new dishes or daily chef specials</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Multiple physical menus to maintain across dining areas</span>
                </div>
              </div>
            </div>

            {/* Munu Solution */}
            <div className="bg-white p-7 rounded-3xl border border-emerald-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-100">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ✅
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  The Munu Solution
                </h3>
              </div>

              <div className="space-y-3 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Update menu and prices anytime in seconds</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero repeated printing costs forever</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant contactless QR-based access on any smartphone</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Mouth-watering food photos, ratings, and descriptions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Clean, mobile-first app-like experience for diners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW MUNU WORKS (Exactly 3 steps) */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              How Munu Works
            </h2>
            <p className="text-sm text-slate-500">Go digital and publish your restaurant QR in less than 5 minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 text-center space-y-3 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                01
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Create Your Menu</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Restaurant register kare aur dishes, food photos, categories aur pricing add kare.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 text-center space-y-3 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg">
                02
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Generate QR Code</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Munu automatically restaurant aur table-wise QR codes generate kare. Download ya print karein.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 text-center space-y-3 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
                03
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Customers Scan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customer phone camera se QR scan kare ➔ digital menu open kare ➔ dishes browse aur order kare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIGITAL MENU DEMO — VERY IMPORTANT */}
      <section id="demo" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
              Live Customer Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Digital Menu Demo
            </h2>
            <p className="text-xs text-slate-400">
              Dekhiye aapke customers ko aapka restaurant menu mobile par kaisa dikhega.
            </p>
          </div>

          {/* Interactive Live Menu Window Preview */}
          <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl text-slate-900 border-4 border-slate-800">
            {/* Restaurant Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🍕</span>
                  <h3 className="font-black text-base">HOTEL MUNU</h3>
                </div>
                <p className="text-[11px] text-orange-400 font-semibold">Authentic Taste • Table 04</p>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-1 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.8</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-3 bg-slate-50 border-b border-slate-100">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search food... 🔍"
                  value={demoSearch}
                  onChange={(e) => setDemoSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1.5 p-3 overflow-x-auto no-scrollbar border-b border-slate-100 bg-white">
              {['Starters', 'Main Course', 'Breads & Roti', 'Desserts'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDemoActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    demoActiveCategory === cat
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dishes Feed */}
            <div className="p-3 space-y-2.5 max-h-80 overflow-y-auto bg-slate-50/50">
              {filteredDemoDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            dish.veg ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        ></span>
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {dish.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{dish.desc}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-black text-xs text-slate-900">₹{dish.price}</span>
                        <span className="text-[10px] text-amber-600 font-bold">★ {dish.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setDemoAddedCount((c) => c + 1)}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition shrink-0 active:scale-95"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Demo Cart Bar */}
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold">{demoAddedCount} Dishes Selected</span>
                <div className="text-[10px] text-slate-400">Total: ₹{demoAddedCount * 220}</div>
              </div>
              <button
                onClick={() => {
                  setActiveRestaurantSlug('hotel-munu');
                  setSelectedTableNumber('4');
                  setCurrentView('menu');
                }}
                className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow transition"
              >
                Open Full Menu →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURES SECTION (8 Strong Features) */}
      <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Powerful Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              8 Reasons Restaurants Choose Munu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">📱</div>
              <h3 className="font-extrabold text-sm text-slate-900">Mobile Friendly</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Har screen aur smartphone par smoothly bina kisi app ke open hota hai.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">🔳</div>
              <h3 className="font-extrabold text-sm text-slate-900">QR Menu</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Har restaurant aur table ke liye automatic high-definition unique QR code.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">🍕</div>
              <h3 className="font-extrabold text-sm text-slate-900">Menu Management</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dishes ko jab chahein easily add, edit, modify ya delete karein.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">🖼️</div>
              <h3 className="font-extrabold text-sm text-slate-900">Food Images</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crisp food photos aur descriptions ke saath customer appetite increase karein.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">💰</div>
              <h3 className="font-extrabold text-sm text-slate-900">Easy Price Updates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dishes ki price instantly dashboard se update karein without printing.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">📂</div>
              <h3 className="font-extrabold text-sm text-slate-900">Categories</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Starters, Main Course, Breads, Drinks, Desserts sections organized karein.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">⚡</div>
              <h3 className="font-extrabold text-sm text-slate-900">Instant Updates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sold-out toggles aur changes customer ke mobile par turant live dikhte hain.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-3xl mb-1">📊</div>
              <h3 className="font-extrabold text-sm text-slate-900">Analytics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kitne customers menu scan kar rahe hain aur kaunse dishes popular hain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESTAURANT DASHBOARD SECTION (SaaS feel) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
                Restaurant Owner Control Center
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Manage Your Entire Digital Menu From One Dashboard
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add food items, organize categories, manage individual table QR stands, track live orders, and monitor sales analytics seamlessly.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Launch Live Owner Dashboard</span>
                </button>
              </div>
            </div>

            {/* Large Dashboard Preview Box */}
            <div className="lg:col-span-7 bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-800 text-white shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="font-mono text-slate-400 pl-2">dashboard.munu.io</span>
                </div>
                <span className="text-emerald-400 font-bold">● System Active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-slate-800 p-3.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Today's Scans</div>
                  <div className="text-xl font-black text-white mt-1">248 Views</div>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Active Orders</div>
                  <div className="text-xl font-black text-orange-400 mt-1">4 Cooking</div>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Total Sales</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">₹18,450</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                <div className="text-orange-400 font-bold">Dashboard Modules:</div>
                <div>├── Overview (KPI stats & footfall)</div>
                <div>├── Menu (Categories & Food Items)</div>
                <div>├── QR Code (Table Tent Cards & Print)</div>
                <div>├── Orders (Live Kitchen Pipeline)</div>
                <div>├── Analytics (Weekly trends)</div>
                <div>└── Settings (Logo, Colors, Timings)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESTAURANT TYPES SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Versatile Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Perfect for Every Food Business
            </h2>
            <p className="text-xs text-slate-500">From cozy street cafes to luxury 5-star hotel dining</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {restaurantTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.label}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-2 hover:border-orange-300 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-slate-900">{type.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. QR CODE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-14 shadow-2xl max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
              <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
                Touch-Free Technology
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                One Scan. Your Entire Menu.
              </h2>
              <p className="text-xs text-slate-300">
                Restaurant generates unique QR ➔ Print on table tent card ➔ Customer scans with camera ➔ Digital Menu opens instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* Visual QR Card */}
              <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl text-center max-w-[220px]">
                <div className="text-xs font-black uppercase text-slate-900 mb-1">HOTEL MUNU</div>
                <div className="text-[10px] text-slate-500 mb-3">Table 04</div>
                <div className="p-2 border border-slate-300 rounded-xl inline-block bg-white shadow-inner mb-3">
                  <QrCode className="w-28 h-28 text-slate-900" />
                </div>
                <div className="text-[10px] font-bold text-orange-600">Scan to View Menu</div>
              </div>

              {/* Steps Flow list */}
              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Restaurant generates high-res QR code</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Print & place stand cards on each dining table</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Customers scan and explore dishes in high-res</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRICING SECTION */}
      <section id="pricing" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Transparent & Affordable
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Simple, Predictable Plans
            </h2>
            <p className="text-xs text-slate-500">Zero commissions on your food sales</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900">Free</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Best for testing digital menus
                </p>
                <div className="my-6 border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">✓ 1 Digital Menu</div>
                  <div className="flex items-center gap-2">✓ QR Code Generator</div>
                  <div className="flex items-center gap-2">✓ Basic Menu Management</div>
                  <div className="flex items-center gap-2">✓ Mobile Friendly UI</div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition"
              >
                Start Free
              </button>
            </div>

            {/* Pro ₹199 */}
            <div className="bg-white p-7 rounded-3xl border-2 border-orange-500 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Most Popular
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">Pro</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹199</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Ideal for cafes & restaurants
                </p>
                <div className="my-6 border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">✓ Unlimited Menu Items</div>
                  <div className="flex items-center gap-2">✓ Food Images & Descriptions</div>
                  <div className="flex items-center gap-2">✓ Custom Branding & Logo</div>
                  <div className="flex items-center gap-2">✓ Analytics & View Counts</div>
                  <div className="flex items-center gap-2">✓ Priority Support</div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition"
              >
                Start Pro
              </button>
            </div>

            {/* Business ₹499 */}
            <div className="bg-slate-900 text-white p-7 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-black text-base text-white">Business</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹499</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  For multi-branch restaurants
                </p>
                <div className="my-6 border-t border-slate-800 pt-4 space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">✓ Multiple Branches</div>
                  <div className="flex items-center gap-2">✓ Multiple Menus</div>
                  <div className="flex items-center gap-2">✓ Advanced Analytics</div>
                  <div className="flex items-center gap-2">✓ Table Tent Card Studio</div>
                  <div className="flex items-center gap-2">✓ Dedicated Priority Support</div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl transition"
              >
                Choose Business
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. BUILT FOR MODERN FOOD BUSINESSES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Proven Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Built for Modern Food Businesses
            </h2>
            <p className="text-xs text-slate-500">Real operational advantages for restaurant managers and diners</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="text-2xl font-black text-orange-600">100%</div>
              <div className="font-bold text-xs text-slate-900">Printing Cost Eliminated</div>
              <p className="text-[11px] text-slate-500">No recurring costs when modifying food prices or seasonal dishes.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="text-2xl font-black text-emerald-600">35% Faster</div>
              <div className="font-bold text-xs text-slate-900">Table Turnover</div>
              <p className="text-[11px] text-slate-500">Diners immediately view the menu while sitting without waiting for waitstaff.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="text-2xl font-black text-purple-600">Instant</div>
              <div className="font-bold text-xs text-slate-900">Kitchen Updates</div>
              <p className="text-[11px] text-slate-500">Mark out-of-stock dishes with 1-click so diners never order unavailable food.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-black text-slate-900">Got Questions? We've Got Answers.</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180 text-orange-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Go Digital?
          </h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            Create your digital menu and give your customers a faster, smarter way to explore your food.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-4 bg-slate-900 hover:bg-black text-white font-black text-sm rounded-2xl shadow-2xl transition transform hover:scale-105 active:scale-95"
            >
              Create Your Free Menu
            </button>
          </div>
        </div>
      </section>

      {/* 19. FOOTER */}
      <footer className="bg-slate-950 text-white py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍕</span>
              <span className="font-extrabold text-xl tracking-tight">Munu.</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Digital menus made simple for modern restaurants, cafes, and hotels.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Product</h4>
            <div className="space-y-2 text-xs text-slate-400 flex flex-col">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#pricing" className="hover:text-white">Pricing</a>
              <a href="#demo" className="hover:text-white">Demo</a>
              <a href="#how-it-works" className="hover:text-white">How It Works</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Company</h4>
            <div className="space-y-2 text-xs text-slate-400 flex flex-col">
              <a href="#home" className="hover:text-white">About</a>
              <button onClick={() => setIsAuthModalOpen(true)} className="text-left hover:text-white">Contact</button>
              <a href="#faq" className="hover:text-white">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Legal</h4>
            <div className="space-y-2 text-xs text-slate-400 flex flex-col">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          © 2026 Munu. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
