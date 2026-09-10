import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  QrCode,
  Smartphone,
  ChefHat,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  MessageSquare,
  Printer,
  Clock,
  ChevronDown,
  Star,
  Users,
  Utensils,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setSelectedTableNumber, currentRestaurant } = useApp();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do customers need to download an app to view the menu or order?',
      a: 'No! Diners simply point their smartphone camera at the table QR code. The menu opens instantly in their browser (Safari, Chrome, etc.) with zero app download or signup required.',
    },
    {
      q: 'How does table-specific ordering work?',
      a: 'Each table has a unique QR code (e.g. Table 4). When a customer scans it, the table number is automatically captured. When they submit an order, your kitchen dashboard immediately shows "Order #1024 - Table 4" with an audio chime.',
    },
    {
      q: 'Can I mark items as "Sold Out" in real time?',
      a: 'Yes! With a single click from your Owner Dashboard, you can toggle any item between Available and Sold Out. Customer menus update instantly across all tables.',
    },
    {
      q: 'Can customers order via WhatsApp?',
      a: 'Yes! Customers have the choice to either place a direct kitchen order or tap "Order via WhatsApp", which generates an itemized order message with table number, customizations, and grand total.',
    },
    {
      q: 'Can I print table stand tent cards directly from MenuCard?',
      a: 'Yes, our built-in QR Code Studio creates ready-to-print Table Tent Cards (A6/A5 format) with your restaurant logo, table badge, and clear scanning instructions.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🍕</span>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Menu<span className="text-orange-500">Card</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-orange-500 transition">Features</a>
            <a href="#how-it-works" className="hover:text-orange-500 transition">How It Works</a>
            <a href="#pricing" className="hover:text-orange-500 transition">Pricing</a>
            <a href="#demo" className="hover:text-orange-500 transition">Live Demo</a>
            <a href="#faq" className="hover:text-orange-500 transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-orange-500 px-3 py-2 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition transform active:scale-95"
            >
              Create Free Menu
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-100/70 border border-orange-200/80 rounded-full text-xs font-bold text-orange-700 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>The Next Generation QR Menu & Dining SaaS</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Transform Your Restaurant with{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Smart QR Dining
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Create your restaurant's digital menu in minutes. Generate unique QR codes for every table, accept orders straight to your kitchen or WhatsApp, and boost sales without high aggregator commissions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedTableNumber('4');
                  setCurrentView('menu');
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Smartphone className="w-5 h-5" />
                <span>Test Customer QR Menu</span>
              </button>

              <button
                onClick={() => setCurrentView('dashboard')}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <ChefHat className="w-5 h-5" />
                <span>Explore Owner Kitchen Dashboard</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No App Download Needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Sold-out Updates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp & Kitchen Orders</span>
              </div>
            </div>
          </div>

          {/* Interactive Dual-Device Showcase */}
          <div id="demo" className="mt-14 max-w-5xl mx-auto">
            <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-800 text-white relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
                    Interactive Live Demonstration
                  </span>
                  <h3 className="text-xl font-bold mt-0.5">Experience Both Sides of the System</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedTableNumber('4');
                      setCurrentView('menu');
                    }}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Diner Side (Table 4)</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <ChefHat className="w-4 h-4" />
                    <span>Kitchen Side</span>
                  </button>
                </div>
              </div>

              {/* Visual preview cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {/* Device 1: Customer Phone Mockup */}
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        /menu/abc-cafe?table=4
                      </span>
                    </div>

                    <div className="bg-white text-slate-900 rounded-xl p-4 space-y-3 shadow-inner">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="font-black text-sm">🍕 ABC Cafe & Bistro</div>
                        <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-bold">
                          Table 4
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="p-2 bg-slate-50 rounded-lg flex justify-between items-center text-xs">
                          <div>
                            <div className="font-bold">Margherita Fresca Pizza</div>
                            <div className="text-[10px] text-slate-500">₹249 • ⭐ 4.8</div>
                          </div>
                          <span className="px-2 py-1 bg-orange-500 text-white rounded font-bold text-[10px]">
                            + Add
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 rounded-lg flex justify-between items-center text-xs">
                          <div>
                            <div className="font-bold">Hazelnut Cold Coffee</div>
                            <div className="text-[10px] text-slate-500">₹129 • ⭐ 4.9</div>
                          </div>
                          <span className="px-2 py-1 bg-orange-500 text-white rounded font-bold text-[10px]">
                            + Add
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTableNumber('4');
                      setCurrentView('menu');
                    }}
                    className="mt-4 w-full py-2.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-bold text-xs rounded-xl border border-orange-500/30 transition text-center"
                  >
                    Launch Interactive Customer Menu →
                  </button>
                </div>

                {/* Device 2: Kitchen Order Ticket */}
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="text-xs font-bold text-emerald-400">
                          LIVE KITCHEN DASHBOARD
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">Order #1021</span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <span className="font-bold text-orange-400 text-sm">Table 4</span>
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-900 rounded font-bold text-[10px]">
                          PREPARING 🍳
                        </span>
                      </div>
                      <div className="space-y-1 text-slate-300">
                        <div className="flex justify-between">
                          <span>1x Margherita Fresca Pizza</span>
                          <span className="font-bold">₹249</span>
                        </div>
                        <div className="text-[10px] text-slate-500 pl-3">- Cheese Burst Crust (+₹65)</div>
                        <div className="flex justify-between">
                          <span>2x Hazelnut Cold Coffee</span>
                          <span className="font-bold">₹258</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                        <span>Total Bill</span>
                        <span className="text-emerald-400">₹572.00</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="mt-4 w-full py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-500/30 transition text-center"
                  >
                    Open Owner Kitchen Console →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Built for Modern Dining
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Everything Your Restaurant Needs
            </h2>
            <p className="text-slate-600 text-sm">
              Say goodbye to expensive reprinting of paper menus, order mistakes, and lost revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: QR System */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Individual Table QR Codes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate high-resolution QR codes for each table. Download printable table tent cards designed with your restaurant logo and cut lines.
              </p>
            </div>

            {/* Feature 2: Real-time kitchen */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Live Kitchen Order Dashboard
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant audio notifications when a customer places an order. Track progress through New, Preparing, Served, and Paid status steps with KOT printing.
              </p>
            </div>

            {/* Feature 3: WhatsApp Ordering */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">
                WhatsApp Direct Orders
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customers can send pre-formatted order details directly to your restaurant's WhatsApp phone number. Ideal for fast food cafes and small bistros.
              </p>
            </div>

            {/* Feature 4: Sold out toggling */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">
                1-Click Sold Out Toggling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Out of paneer or avocados? Toggle items to "Sold Out" from your dashboard. All customer menus update instantly without refreshing.
              </p>
            </div>

            {/* Feature 5: Offers & Combos */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Promotions & Combo Deals
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Run discount coupon codes (e.g., PIZZA20) and attractive meal combos (Burger + Fries + Coke) to increase diner average order value.
              </p>
            </div>

            {/* Feature 6: Custom themes */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">
                Analytics & Custom Themes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track daily QR views, weekly revenue trends, and top dishes. Choose from pre-made visual themes (Emerald, Amber, Luxury, Sunset Crimson).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Setup in 5 Minutes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              How MenuCard Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-orange-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-xl shadow-orange-500/20">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900">Add Menu & Categories</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your food items, appetizing photos, prices, discounts, and custom add-ons like cheese or crust options.
              </p>
            </div>

            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-xl">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900">Print Table QR Cards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate smart QR stands for Table 1, Table 2, etc. Download PNGs or use our 1-click printable table tent cards.
              </p>
            </div>

            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/20">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900">Diners Scan & Order</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diners scan with their phone camera, customize food, and place orders directly to your kitchen or WhatsApp!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Pick the Perfect Plan
            </h2>
            <p className="text-xs text-slate-500">No hidden fees, no commission on your food sales</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-black text-lg text-slate-900">Free Starter</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500">/forever</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Best for testing digital menus
                </p>
                <div className="my-5 border-t pt-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">✓ 1 Restaurant Profile</div>
                  <div className="flex items-center gap-2">✓ Up to 20 Menu Items</div>
                  <div className="flex items-center gap-2">✓ Standard QR Code</div>
                  <div className="flex items-center gap-2">✓ Mobile Responsive View</div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition"
              >
                Get Started Free
              </button>
            </div>

            {/* Starter ₹199 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-black text-lg text-slate-900">Starter Pro</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹199</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Best for cafes & food joints
                </p>
                <div className="my-5 border-t pt-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">✓ Unlimited Menu Items</div>
                  <div className="flex items-center gap-2">✓ WhatsApp Direct Orders</div>
                  <div className="flex items-center gap-2">✓ Promo Offers & Coupons</div>
                  <div className="flex items-center gap-2">✓ Custom Logo & Cover Photo</div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition"
              >
                Start Starter Trial
              </button>
            </div>

            {/* Business ₹499 */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl ring-2 ring-orange-500 relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Most Popular
              </div>
              <div>
                <h3 className="font-black text-lg text-white">Business Elite</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹499</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Full table contactless ordering & kitchen operations
                </p>
                <div className="my-5 border-t border-slate-800 pt-4 space-y-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">✓ Table-Specific QR Studio</div>
                  <div className="flex items-center gap-2">✓ Printable Table Tent Cards</div>
                  <div className="flex items-center gap-2">✓ Live Kitchen Orders + Audio Chime</div>
                  <div className="flex items-center gap-2">✓ Real-time Sold Out Toggling</div>
                  <div className="flex items-center gap-2">✓ Multi-Theme Customizer</div>
                </div>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/30 transition"
              >
                Launch Business Tier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-sm text-slate-900 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180 text-orange-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 text-xs text-slate-600 leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🍕</span>
            <span className="font-extrabold text-xl tracking-tight">MenuCard</span>
            <span className="text-xs text-slate-400 pl-2">
              © 2026 MenuCard Inc. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={() => setCurrentView('menu')} className="hover:text-white">
              Customer Menu Demo
            </button>
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-white">
              Owner Dashboard
            </button>
            <button onClick={() => setCurrentView('admin')} className="hover:text-white">
              Super Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
