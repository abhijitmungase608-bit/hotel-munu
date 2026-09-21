import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GoogleAuthModal } from './GoogleAuthModal';
import { ChefHat, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerRestaurantAndOwner, setCurrentView, showToast } = useApp();

  const [name, setName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name Required', 'Please enter your name', 'error');
      return;
    }
    if (!email.trim()) {
      showToast('Email Required', 'Please enter your email', 'error');
      return;
    }
    if (password.length < 4) {
      showToast('Password Too Short', 'Password must be at least 4 characters', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      registerRestaurantAndOwner({
        restaurantName: restaurantName.trim() || `${name}'s Restaurant`,
        ownerName: name.trim(),
        email: email.trim(),
        phone: phone.trim() || '+91 98765 43210',
        password,
        authProvider: 'password',
      });
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#111927] text-white flex items-center justify-center p-3 sm:p-6 relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container Card (Desktop Landscape & Mobile Portrait) */}
      <div className="w-full max-w-4xl min-h-[540px] bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col md:flex-row">
        
        {/* Background Image Layer (Full cover across card) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/auth-bg.jpg"
            alt="Luxury Restaurant Dining Ambiance"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-slate-950/20"></div>
        </div>

        {/* LEFT / TOP SECTION: Brand Logo & Poetic Slogan */}
        <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-between w-full md:w-[45%] shrink-0 min-h-[160px] md:min-h-auto">
          {/* Top Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase drop-shadow-sm">
              MUNU.
            </span>
          </div>

          {/* Hero Slogan */}
          <div className="my-auto py-4 md:py-12">
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-wide drop-shadow-md">
              Let's go to a
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md mt-0.5">
              new journey
            </h3>
            <p className="text-xs text-white/70 mt-2 max-w-xs drop-shadow hidden md:block">
              Modern contactless dining, instant QR ordering & real-time kitchen POS.
            </p>
          </div>

          {/* Bottom subtle badge */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-white/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>15-Day Free Trial Included</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SECTION: Organic White Wave Shape Container Holding Form           */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center min-h-[460px]">
          
          {/* Desktop S-Curve Wave SVG Path */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 500 560"
            preserveAspectRatio="none"
          >
            <path
              d="M 60 0 
                 C 0 100, -30 180, 20 270 
                 C 70 360, 130 420, 90 560 
                 L 500 560 
                 L 500 240 
                 C 440 240, 390 180, 420 80 
                 C 440 20, 470 0, 500 0 
                 Z"
              fill="#ffffff"
            />
          </svg>

          {/* Mobile Overlay Shape */}
          <div className="md:hidden absolute inset-0 bg-white rounded-t-[36px] z-0 mt-4 shadow-2xl"></div>

          {/* Form Content on White Canvas */}
          <div className="relative z-10 p-6 sm:p-10 md:pl-14 text-slate-800 max-w-md w-full mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-5">
              Sign Up
            </h1>

            {/* Google Fast Sign Up */}
            <button
              type="button"
              onClick={() => setIsGoogleModalOpen(true)}
              className="w-full py-2 px-3 mb-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-xs font-semibold flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer active:scale-98"
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
              <span>Sign Up with Google</span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name Field */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Abhijit Mungase"
                  className="w-full border-b border-slate-300 focus:border-slate-900 pb-1.5 text-xs font-medium text-slate-800 focus:outline-none transition placeholder:text-slate-300 bg-transparent"
                />
              </div>

              {/* Restaurant / Hotel Name Field */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Restaurant / Hotel Name
                </label>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Hotel Munu / Royal Spice"
                  className="w-full border-b border-slate-300 focus:border-slate-900 pb-1.5 text-xs font-medium text-slate-800 focus:outline-none transition placeholder:text-slate-300 bg-transparent"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@hotelmunu.com"
                  className="w-full border-b border-slate-300 focus:border-slate-900 pb-1.5 text-xs font-medium text-slate-800 focus:outline-none transition placeholder:text-slate-300 bg-transparent"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Phone (+91)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full border-b border-slate-300 focus:border-slate-900 pb-1.5 text-xs font-medium text-slate-800 focus:outline-none transition placeholder:text-slate-300 bg-transparent"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-b border-slate-300 focus:border-slate-900 pb-1.5 pr-8 text-xs font-medium text-slate-800 focus:outline-none transition placeholder:text-slate-300 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button (Pill Button Matching Reference) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#141e33] hover:bg-[#1f2e4d] text-white font-bold text-xs rounded-full shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Switch to Login Link */}
              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="text-amber-500 hover:text-amber-600 font-bold transition cursor-pointer underline"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        isRegisterMode={true}
      />
    </div>
  );
};
