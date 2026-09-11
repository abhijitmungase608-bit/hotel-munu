import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChefHat,
  Lock,
  Mail,
  Store,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Receipt,
  QrCode,
  Bell,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const {
    loginAs,
    restaurants,
    setActiveRestaurantSlug,
    showToast,
  } = useApp();

  const [email, setEmail] = useState('owner@hotelmunu.com');
  const [password, setPassword] = useState('123456');
  const [selectedRestId, setSelectedRestId] = useState('rest-1');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAs('OWNER', selectedRestId);
      setIsLoading(false);
    }, 300);
  };

  const handleQuickOwnerLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAs('OWNER', 'rest-1');
      setIsLoading(false);
    }, 250);
  };

  const selectedRest = restaurants.find((r) => r.id === selectedRestId) || restaurants[0];

  return (
    <div className="min-h-screen bg-[#070d1e] text-white flex flex-col justify-between relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Ambient background glows */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="p-5 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight">
                Munu<span className="text-orange-500">.</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-md">
                OWNER PORTAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Hotel & Restaurant Management System
            </p>
          </div>
        </div>

        {/* Live System Online Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-full text-xs font-semibold text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>POS & KDS Online</span>
        </div>
      </header>

      {/* Main Split Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-auto">
        <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT SIDE: Brand Showcase & Features (Desktop) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
            <div className="space-y-6">
              {/* Hotel Active Card */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-3.5">
                <img
                  src={selectedRest?.branding?.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80'}
                  alt={selectedRest?.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                    Partner Hotel
                  </div>
                  <div className="text-sm font-black text-white truncate">
                    {selectedRest?.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {selectedRest?.address?.split(',')[0]}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  Manage Orders, Menu & Billing in One Place
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Real-time contactless dining platform designed specifically for hotel and restaurant owners.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5 border border-orange-500/20">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Live Kitchen KDS Orders</div>
                    <div className="text-[11px] text-slate-400">Audio chime on incoming table tickets</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                    <Receipt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Thermal Bill Printing</div>
                    <div className="text-[11px] text-slate-400">Itemized rates with GST & Grand Total in ₹</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">Table QR Dining System</div>
                    <div className="text-[11px] text-slate-400">Isolated customer menu card ordering</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Bottom Security Guarantee */}
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Encrypted Owner Access • High Availability</span>
            </div>
          </div>

          {/* RIGHT SIDE: Dedicated Owner Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/25 rounded-full text-[11px] font-bold text-orange-400 mb-2">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Hotel Owner Authentication</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sign In to Dashboard
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Enter your registered hotel credentials to open your management dashboard.
              </p>
            </div>

            {/* 1-Click Fast Owner Login Button */}
            <button
              type="button"
              onClick={handleQuickOwnerLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-slate-800/90 hover:bg-orange-500/15 text-orange-400 hover:text-orange-300 border border-orange-500/30 hover:border-orange-500/50 rounded-2xl text-xs font-bold flex items-center justify-between transition cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition">
                  ⚡
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-orange-300">
                    Quick 1-Click Hotel Owner Login
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Instant access as {selectedRest?.name} Owner
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition" />
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Or Sign In With Password
              </span>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleFormLogin} className="space-y-4">
              {/* Select Restaurant */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-orange-400" />
                  <span>Your Hotel / Restaurant</span>
                </label>
                <select
                  value={selectedRestId}
                  onChange={(e) => {
                    setSelectedRestId(e.target.value);
                    const found = restaurants.find((r) => r.id === e.target.value);
                    if (found) setActiveRestaurantSlug(found.slug);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition cursor-pointer"
                >
                  {restaurants.map((rest) => (
                    <option key={rest.id} value={rest.id} className="bg-slate-900 text-white">
                      {rest.name} — {rest.cuisineTypes ? rest.cuisineTypes.join(', ') : 'Dining'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email / Username */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>Owner Email or Mobile</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@hotelmunu.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-orange-400" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Demo Password', 'Default demo password is: 123456', 'info')}
                    className="text-[11px] text-orange-400 hover:underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs text-slate-400 cursor-pointer select-none">
                  Keep me logged in on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-60 mt-2"
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Login to Restaurant Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-500 z-10">
        Hotel Munu Smart Dining & Restaurant POS • Version 2.0 • Authorized Owner Access Only
      </footer>
    </div>
  );
};
