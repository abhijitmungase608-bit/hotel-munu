import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';

export const SubscriptionTab: React.FC = () => {
  const { currentRestaurant, updateRestaurantProfile, showToast } = useApp();

  const currentPlan = currentRestaurant.subscriptionPlan;

  const handleSelectPlan = (plan: 'FREE' | 'STARTER' | 'BUSINESS') => {
    updateRestaurantProfile({ subscriptionPlan: plan });
    showToast(
      'Plan Upgraded!',
      `You are now on the ${plan} Tier with full access to related features.`,
      'success'
    );
  };

  const plans = [
    {
      id: 'FREE' as const,
      name: 'Free Starter',
      price: '₹0',
      period: 'Forever Free',
      description: 'Ideal for small food stalls & cafes testing digital menus',
      features: [
        '1 Restaurant Profile',
        'Digital QR Code Menu',
        'Up to 20 Food Items',
        'Standard Themes',
        'Mobile Responsive View',
      ],
      cta: 'Current Tier',
      highlighted: false,
    },
    {
      id: 'STARTER' as const,
      name: 'Starter Pro',
      price: '₹199',
      period: 'per month',
      description: 'Best for cafes & quick service restaurants taking orders',
      features: [
        'Everything in Free',
        'Unlimited Food Items',
        'WhatsApp Direct Ordering',
        'Promotional Offers & Coupons',
        'Basic Analytics & Views',
        'Custom Logo & Cover Photos',
      ],
      cta: 'Upgrade to Starter',
      highlighted: false,
    },
    {
      id: 'BUSINESS' as const,
      name: 'Business Elite',
      price: '₹499',
      period: 'per month',
      description: 'Full kitchen operations, table QR codes & contactless ordering',
      features: [
        'Everything in Starter',
        'Table-Specific QR Code Studio',
        'Printable Table Tent Cards',
        'Live Kitchen Orders Dashboard',
        'Real-time Sold-out Toggling',
        'KOT Kitchen Ticket Printing',
        'Multi-theme custom designs',
        'Priority 24/7 Support',
      ],
      cta: 'Active Plan',
      highlighted: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold mb-2">
          <Crown className="w-3.5 h-3.5" />
          SaaS Subscription Plans
        </div>
        <h2 className="text-2xl font-black text-slate-900">Simple, Transparent Pricing</h2>
        <p className="text-xs text-slate-500 mt-1">
          Scale your restaurant's digital operations without high commission fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isCurrent = currentPlan === p.id;
          return (
            <div
              key={p.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 ${
                p.highlighted
                  ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-orange-500 relative'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-base">{p.name}</h3>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                      Active
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black">{p.price}</span>
                  <span className={`text-xs ${p.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                    /{p.period}
                  </span>
                </div>

                <p className={`text-xs mt-2 ${p.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>
                  {p.description}
                </p>

                <div className="my-5 border-t border-slate-200/20 pt-4 space-y-2.5">
                  {p.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs">
                      <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className={p.highlighted ? 'text-slate-200' : 'text-slate-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan(p.id)}
                disabled={isCurrent}
                className={`w-full py-3 rounded-xl font-bold text-xs transition ${
                  isCurrent
                    ? 'bg-emerald-600/20 text-emerald-400 cursor-default border border-emerald-500/30'
                    : p.highlighted
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-slate-900 hover:bg-black text-white'
                }`}
              >
                {isCurrent ? 'Current Plan' : `Switch to ${p.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
