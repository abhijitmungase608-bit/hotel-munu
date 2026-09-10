import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Utensils, Shield, Check, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAs, showToast } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      showToast('Registration Successful!', `Welcome ${ownerName || 'Owner'}! Your digital menu for ${restaurantName || 'Hotel Munu'} is ready.`, 'success');
      loginAs('OWNER', 'rest-1');
    } else {
      if (email.includes('admin')) {
        loginAs('ADMIN');
      } else {
        loginAs('OWNER', 'rest-1');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍕</span>
            <span className="font-black tracking-tight text-2xl">Munu.</span>
          </div>
          <h3 className="text-xl font-black">
            {isRegister ? 'Create Your Restaurant Menu' : 'Welcome Back to Munu'}
          </h3>
          <p className="text-orange-100 text-xs mt-1">
            {isRegister
              ? 'Start serving diners with a modern contactless QR menu in 5 minutes'
              : 'Sign in to access your kitchen live orders and menu management'}
          </p>
        </div>

        <div className="p-6">
          {/* Quick Demo Access Bar */}
          <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              1-Click Instant Demo Login
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAs('OWNER', 'rest-1')}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-orange-50 border border-orange-200 rounded-xl text-xs font-semibold text-slate-800 shadow-sm transition hover:border-orange-400"
              >
                <Utensils className="w-3.5 h-3.5 text-orange-600" />
                Hotel Munu Owner
              </button>
              <button
                type="button"
                onClick={() => loginAs('ADMIN')}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-semibold text-slate-800 shadow-sm transition hover:border-indigo-400"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                Super Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hotel Munu"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Owner Name
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
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
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 mt-2"
            >
              <Check className="w-4 h-4" />
              {isRegister ? 'Create Account' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-slate-600 hover:text-orange-600"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have a restaurant account? Register Free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
