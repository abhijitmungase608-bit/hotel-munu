import React, { useState } from 'react';
import { X, UserPlus, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRegisterMode?: boolean;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  isRegisterMode = false,
}) => {
  const { loginWithGoogle } = useApp();

  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number | null>(null);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      name: 'Abhijit Mungase',
      email: 'abhijit.mungase@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      tag: 'Owner / Manager',
    },
    {
      name: 'Vikram Shinde',
      email: 'vikram.restaurant@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      tag: 'Food Partner',
    },
  ];

  const handleSelectPredefined = (acc: typeof defaultAccounts[0], idx: number) => {
    setSelectedAccountIndex(idx);
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar,
        restaurantName: isRegisterMode ? restaurantName || `${acc.name}'s Restaurant` : undefined,
      });
      setIsLoading(false);
      onClose();
    }, 600);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        name: customName || customEmail.split('@')[0],
        email: customEmail,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customName || customEmail)}&background=f97316&color=fff`,
        restaurantName: isRegisterMode ? restaurantName || `${customName || 'My'} Restaurant` : undefined,
      });
      setIsLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Top Google Colors Decorative Accent Line */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#4285F4]"></div>
          <div className="flex-1 bg-[#EA4335]"></div>
          <div className="flex-1 bg-[#FBBC05]"></div>
          <div className="flex-1 bg-[#34A853]"></div>
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7">
          {/* Google Official Header */}
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
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
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isRegisterMode ? 'Sign up with Google' : 'Sign in with Google'}
              </h3>
              <p className="text-xs text-slate-500">to continue to Hotel Munu Smart OS</p>
            </div>
          </div>

          {/* If Register Mode, optionally prompt for restaurant name */}
          {isRegisterMode && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-2xl">
              <label className="block text-[11px] font-bold text-orange-900 uppercase tracking-wider mb-1">
                Your Hotel / Restaurant Name
              </label>
              <input
                type="text"
                placeholder="e.g. Hotel Spice Garden"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          )}

          {/* Loading Indicator Overlay */}
          {isLoading && (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-3 border-[#4285F4] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-slate-600 animate-pulse">
                Signing in with Google...
              </p>
            </div>
          )}

          {!isLoading && !isCustomMode && (
            <div className="space-y-2.5">
              <p className="text-xs font-medium text-slate-600 mb-2">Choose a Google Account:</p>

              {defaultAccounts.map((acc, idx) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectPredefined(acc, idx)}
                  className={`w-full p-3 flex items-center justify-between rounded-2xl border transition text-left cursor-pointer group ${
                    selectedAccountIndex === idx
                      ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 group-hover:scale-105 transition"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="truncate">{acc.name}</span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded-full">
                          {acc.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
                </button>
              ))}

              {/* Use another account button */}
              <button
                type="button"
                onClick={() => setIsCustomMode(true)}
                className="w-full p-3 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-700 hover:text-blue-700 transition text-xs font-semibold cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold">Use another Google Account</div>
                  <div className="text-[11px] text-slate-400">Enter custom Gmail or Workspace email</div>
                </div>
              </button>
            </div>
          )}

          {/* Custom Google Email Mode */}
          {!isLoading && isCustomMode && (
            <form onSubmit={handleCustomGoogleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="flex-1 py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Continue</span>
                </button>
              </div>
            </form>
          )}

          {/* Security & Disclaimer Footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 text-[10px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p>
              To continue, Google will share your name, email address, language preference, and profile picture with Hotel Munu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
