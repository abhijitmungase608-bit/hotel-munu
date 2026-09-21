import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GoogleAuthModal } from '../auth/GoogleAuthModal';
import { X, Utensils, Shield, Check, Sparkles, Store, User, Phone, Mail, Lock, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginAs,
    loginWithCredentials,
    registerRestaurantAndOwner,
    showToast,
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!restaurantName.trim() || !ownerName.trim() || !email.trim()) {
        showToast('Required', 'Please fill in all required fields', 'error');
        return;
      }
      registerRestaurantAndOwner({
        restaurantName: restaurantName.trim(),
        ownerName: ownerName.trim(),
        email: email.trim(),
        phone: phone.trim() || '+91 98765 43210',
        password,
        authProvider: 'password',
      });
    } else {
      loginWithCredentials(email || 'owner@hotelmunu.com', password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍕</span>
            <span className="font-black tracking-tight text-2xl">Munu.</span>
            <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-full">
              Smart POS
            </span>
          </div>
          <h3 className="text-xl font-black">
            {isRegister ? 'Register Your Restaurant' : 'Sign In to Restaurant Dashboard'}
          </h3>
          <p className="text-orange-100 text-xs mt-1">
            {isRegister
              ? 'Start taking table QR orders and kitchen live orders in 60 seconds'
              : 'Enter your credentials or use 1-Click Fast Login'}
          </p>
        </div>

        <div className="p-5 sm:p-6">
          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            className="w-full py-2.5 px-4 mb-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isRegister ? 'Register with Google' : 'Continue with Google'}</span>
          </button>

          {/* Quick Demo Access Bar */}
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              1-Click Demo Credentials
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAs('OWNER', 'rest-1')}
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-orange-50 border border-orange-200 rounded-xl text-[11px] font-bold text-slate-800 shadow-xs transition hover:border-orange-400 cursor-pointer"
              >
                <Utensils className="w-3.5 h-3.5 text-orange-600" />
                Hotel Munu
              </button>
              <button
                type="button"
                onClick={() => loginAs('ADMIN')}
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-xl text-[11px] font-bold text-slate-800 shadow-xs transition hover:border-indigo-400 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                Super Admin
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-2.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isRegister ? 'Or Enter Details' : 'Or Sign In'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegister && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-orange-500" />
                    <span>Restaurant / Hotel Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hotel Spice Garden"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                    <span>Owner Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abhijit Mungase"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                required
                placeholder="owner@hotelmunu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-orange-500" />
                <span>Password *</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>{isRegister ? 'Create Account & Open Menu' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-slate-600 hover:text-orange-600 transition cursor-pointer"
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : "Don't have a restaurant account? Register Free"}
            </button>
          </div>
        </div>
      </div>

      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        isRegisterMode={isRegister}
      />
    </div>
  );
};
