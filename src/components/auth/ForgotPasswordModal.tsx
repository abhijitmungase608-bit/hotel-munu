import React, { useState } from 'react';
import { X, KeyRound, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Reset Link Sent', `Password reset instructions have been sent to ${email}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-7 relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Reset Password</h3>
            <p className="text-xs text-slate-400">Hotel Munu Owner Access Recovery</p>
          </div>
        </div>

        {/* Demo Help Box */}
        <div className="mb-5 p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-xs space-y-1">
          <div className="font-bold text-orange-400">💡 Default Demo Password</div>
          <p className="text-slate-300">
            Default test account password is <span className="font-mono bg-slate-950 px-1.5 py-0.5 rounded text-orange-300">123456</span> for email <span className="font-mono text-slate-200">owner@hotelmunu.com</span>.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>Your Registered Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@hotelmunu.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <span>Send Reset OTP / Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Reset Link Dispatched!</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We have dispatched password reset instructions to <span className="text-white font-semibold">{email}</span>. You can also log in directly using the 1-Click Fast Login on the login screen.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
