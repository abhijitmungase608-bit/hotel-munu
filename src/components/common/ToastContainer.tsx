import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-blue-500 bg-white';
        let Icon = Info;
        let iconColor = 'text-blue-500';

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500 bg-white';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-500';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500 bg-white';
          Icon = AlertCircle;
          iconColor = 'text-amber-500';
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500 bg-white';
          Icon = AlertCircle;
          iconColor = 'text-rose-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border-l-4 ${borderClass} flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-4`}
          >
            <div className={`mt-0.5 shrink-0 ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">{toast.title}</h4>
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="text-slate-400 hover:text-slate-600 rounded p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 break-words">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
