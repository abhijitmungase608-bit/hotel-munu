import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  Check,
  Sparkles,
  Shield,
  Crown,
  Copy,
  Clock,
  AlertTriangle,
  QrCode,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X,
  CreditCard,
  Zap,
  HelpCircle,
} from 'lucide-react';

const PLATFORM_UPI_ID = '8010947110@ybl';
const PLATFORM_NAME = 'Hotel Munu SaaS';

export const SubscriptionTab: React.FC = () => {
  const { currentRestaurant, updateRestaurantProfile, showToast } = useApp();

  // Subscription details from restaurant profile
  const subDetails = currentRestaurant.subscriptionDetails || {
    planName: '15-Day Free Trial',
    isTrial: true,
    trialDaysTotal: 15,
    trialDaysRemaining: 12,
    trialStartDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    trialEndDate: new Date(Date.now() + 12 * 86400000).toISOString(),
    isExpired: false,
    expiresAt: new Date(Date.now() + 12 * 86400000).toISOString(),
    paymentUpiId: PLATFORM_UPI_ID,
  };

  const isTrial = subDetails.isTrial;
  const isExpired = subDetails.isExpired;
  const daysRemaining = subDetails.trialDaysRemaining ?? 12;

  // Selected plan for UPI payment modal
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<{
    id: 'STARTER' | 'BUSINESS' | 'ANNUAL_PRO';
    name: string;
    price: number;
    period: string;
  } | null>(null);

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Generate UPI QR Code when modal opens
  useEffect(() => {
    if (!selectedPlanForPayment) return;

    const amount = selectedPlanForPayment.price;
    const note = `Hotel Munu ${selectedPlanForPayment.name.replace(/\s+/g, '')}`;
    const upiUri = `upi://pay?pa=${PLATFORM_UPI_ID}&pn=${encodeURIComponent(
      PLATFORM_NAME
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Failed to generate UPI QR:', err));
  }, [selectedPlanForPayment]);

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(PLATFORM_UPI_ID);
    setIsCopied(true);
    showToast('UPI ID Copied!', `${PLATFORM_UPI_ID} copied to clipboard`, 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Submit payment UTR to activate plan
  const handleVerifyAndActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForPayment) return;

    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      showToast('Invalid UTR', 'Please enter a valid 12-digit UPI UTR or Reference number', 'error');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      const validityDays = selectedPlanForPayment.id === 'ANNUAL_PRO' ? 365 : 30;
      const expiryDate = new Date(Date.now() + validityDays * 86400000).toISOString();

      updateRestaurantProfile({
        subscriptionPlan: selectedPlanForPayment.id === 'ANNUAL_PRO' ? 'BUSINESS' : selectedPlanForPayment.id,
        subscriptionDetails: {
          planName: selectedPlanForPayment.name,
          isTrial: false,
          trialDaysTotal: 15,
          trialDaysRemaining: 0,
          trialStartDate: subDetails.trialStartDate,
          trialEndDate: subDetails.trialEndDate,
          isExpired: false,
          expiresAt: expiryDate,
          lastPaymentUtr: utrNumber.trim(),
          paidAmount: selectedPlanForPayment.price,
          paymentUpiId: PLATFORM_UPI_ID,
        },
      });

      setIsVerifying(false);
      setSelectedPlanForPayment(null);
      setUtrNumber('');

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      showToast(
        'Subscription Activated! 🎉',
        `Payment verified for ${selectedPlanForPayment.name}. Valid until ${new Date(
          expiryDate
        ).toLocaleDateString()}.`,
        'success'
      );
    }, 900);
  };

  // Simulation controls for testing 15-day trial states
  const handleToggleTrialExpirySimulation = () => {
    const nextExpired = !isExpired;
    updateRestaurantProfile({
      subscriptionDetails: {
        ...subDetails,
        isTrial: nextExpired ? false : true,
        isExpired: nextExpired,
        trialDaysRemaining: nextExpired ? 0 : 12,
        planName: nextExpired ? 'Trial Expired' : '15-Day Free Trial',
      },
    });

    showToast(
      nextExpired ? 'Simulated: Trial Expired' : 'Simulated: Active Free Trial',
      nextExpired
        ? 'Now showing mandatory subscription prompt'
        : '15-Day free trial active again with 12 days left',
      'info'
    );
  };

  const plans = [
    {
      id: 'FREE_TRIAL' as const,
      name: '15-Day Free Trial',
      price: '₹0',
      priceNum: 0,
      period: '15 Days All-Access',
      badge: 'Free Onboarding',
      description: 'Included for all new hotel & restaurant partners to test live dining operations.',
      features: [
        '100% Full Platform Access',
        'Live Kitchen Orders (KDS) & Audio Chime',
        'Table QR Codes Generator',
        'Customer Digital Menu Card',
        'Itemized Thermal Bill Printing',
        '5 Visual Design Themes',
        'No Credit Card Required',
      ],
      isTrialCard: true,
      active: isTrial && !isExpired,
      disabled: isExpired,
    },
    {
      id: 'STARTER' as const,
      name: 'Starter Monthly',
      price: '₹1',
      priceNum: 1,
      period: 'per month',
      badge: 'Flexible Monthly',
      description: 'Ideal for cafes, restaurants and bistros requiring continuous contactless dining.',
      features: [
        'Everything in 15-Day Trial',
        'Unlimited Table QR Scans & Orders',
        'Thermal Bill Printing with GST & ₹ Total',
        'Real-Time Kitchen KDS Tickets',
        'Sold-Out Item Management',
        'WhatsApp Direct Ordering Integration',
        'Daily Revenue & Sales Analytics',
      ],
      isTrialCard: false,
      active: currentRestaurant.subscriptionPlan === 'STARTER' && !isTrial,
      highlighted: false,
    },
    {
      id: 'ANNUAL_PRO' as const,
      name: 'Annual Business Pro',
      price: '₹3,999',
      priceNum: 3999,
      period: 'per year (Only ₹333/mo)',
      badge: '⭐ Best Value • Save 33%',
      description: 'Complete peace of mind with 1-year guaranteed pricing and priority owner support.',
      features: [
        'Everything in Starter Monthly',
        '1 Full Year Subscription Validity',
        'Save ₹2,000 / 33% Discount',
        'Unlimited Tables & Dining Areas',
        'Priority 24/7 Phone & WhatsApp Support',
        'Thermal Printer Setup Assistance',
        'Free Custom Logo & Cover Optimization',
      ],
      isTrialCard: false,
      active: (currentRestaurant.subscriptionPlan === 'BUSINESS' || currentRestaurant.subscriptionPlan === 'ANNUAL_PRO') && !isTrial,
      highlighted: true,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* 1. 15-DAY FREE TRIAL / ACTIVE SUBSCRIPTION STATUS BANNER                  */}
      {/* ========================================================================= */}
      {isTrial && !isExpired && (
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>15-Day All-Access Free Trial Active</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Day {15 - daysRemaining} of 15 Days • {daysRemaining} Days Left
            </h2>

            <p className="text-xs text-orange-100 max-w-xl leading-relaxed">
              Your restaurant has 100% full access to live kitchen orders, table QR codes, thermal billing, and menu customization. Once your 15 days complete, subscribe below using UPI ID{' '}
              <span className="font-black underline bg-black/20 px-1.5 py-0.5 rounded font-mono">
                {PLATFORM_UPI_ID}
              </span>{' '}
              to continue receiving orders seamlessly.
            </p>

            {/* Trial Timeline Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(((15 - daysRemaining) / 15) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-orange-200 mt-1 font-bold">
                <span>Started (Day 1)</span>
                <span>{daysRemaining} Days Remaining</span>
                <span>Day 15</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() =>
                setSelectedPlanForPayment({
                  id: 'STARTER',
                  name: 'Starter Monthly',
                  price: 1,
                  period: 'per month',
                })
              }
              className="px-5 py-3 bg-white text-orange-600 hover:bg-orange-50 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Upgrade with UPI ({PLATFORM_UPI_ID})</span>
            </button>

            <button
              onClick={handleToggleTrialExpirySimulation}
              className="px-3 py-1.5 bg-black/20 hover:bg-black/30 text-white/90 text-[11px] font-semibold rounded-lg transition text-center cursor-pointer"
              title="Test how the dashboard behaves after the 15-day trial period completes"
            >
              Simulate 15 Days Completed →
            </button>
          </div>
        </div>
      )}

      {/* When 15 Days are Complete (Expired State) */}
      {isExpired && (
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border-2 border-rose-400">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
              <span>15-Day Free Trial Completed</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Your 15-Day Free Trial Has Ended!
            </h2>

            <p className="text-xs text-rose-100 max-w-xl leading-relaxed">
              To continue receiving live orders from table QR codes, printing kitchen tickets, and managing your menu, please activate your subscription plan below using UPI ID{' '}
              <span className="font-black bg-black/25 px-1.5 py-0.5 rounded font-mono">
                {PLATFORM_UPI_ID}
              </span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() =>
                setSelectedPlanForPayment({
                  id: 'ANNUAL_PRO',
                  name: 'Annual Business Pro',
                  price: 3999,
                  period: 'per year',
                })
              }
              className="px-6 py-3 bg-white text-rose-600 hover:bg-rose-50 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Pay & Activate with UPI</span>
            </button>

            <button
              onClick={handleToggleTrialExpirySimulation}
              className="px-3 py-1.5 bg-black/20 hover:bg-black/30 text-white/90 text-[11px] font-semibold rounded-lg transition text-center cursor-pointer"
            >
              ← Back to Active Trial (Simulate)
            </button>
          </div>
        </div>
      )}

      {/* Paid Active Subscription Banner */}
      {!isTrial && !isExpired && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
              <span>Verified Paid Subscription Active</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {subDetails.planName || 'Pro Business Tier'}
            </h2>

            <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
              Your subscription is active and verified. Paid via UPI to{' '}
              <span className="font-black font-mono bg-black/20 px-1.5 py-0.5 rounded">
                {subDetails.paymentUpiId || PLATFORM_UPI_ID}
              </span>{' '}
              {subDetails.lastPaymentUtr ? `(UTR: ${subDetails.lastPaymentUtr})` : ''}.
              Valid until {new Date(subDetails.expiresAt).toLocaleDateString()}.
            </p>
          </div>

          <button
            onClick={() =>
              setSelectedPlanForPayment({
                id: 'ANNUAL_PRO',
                name: 'Annual Business Pro (Renew)',
                price: 3999,
                period: 'per year',
              })
            }
            className="px-5 py-2.5 bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Renew / Extend Plan</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. OFFICIAL UPI ID INFORMATION CARD                                       */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl shrink-0 border border-indigo-100 shadow-xs">
            ₹
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Official Platform Subscription UPI ID
            </div>
            <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-mono mt-0.5 flex items-center gap-2">
              <span>{PLATFORM_UPI_ID}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-slate-500">
              Payable to: <span className="font-bold text-slate-700">{PLATFORM_NAME}</span> • Instant automated activation
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyUpiId}
          className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Copy className="w-3.5 h-3.5 text-amber-400" />
          <span>{isCopied ? 'Copied to Clipboard!' : 'Copy UPI ID'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBSCRIPTION TIERS CARDS                                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          return (
            <div
              key={p.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                p.highlighted
                  ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-orange-500 relative transform md:-translate-y-1'
                  : p.active
                  ? 'bg-white text-slate-800 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {p.badge && (
                <div
                  className={`inline-block self-start text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                    p.highlighted
                      ? 'bg-orange-500 text-white shadow-sm'
                      : p.active
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.badge}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-lg tracking-tight">{p.name}</h3>
                  {p.active && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white">
                      Active
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black">{p.price}</span>
                  <span className={`text-xs ${p.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                    /{p.period}
                  </span>
                </div>

                <p className={`text-xs mt-2 leading-relaxed ${p.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>
                  {p.description}
                </p>

                <div className="my-5 border-t border-slate-200/20 pt-4 space-y-2.5">
                  {p.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs">
                      <div
                        className={`p-0.5 rounded-full shrink-0 mt-0.5 ${
                          p.highlighted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={p.highlighted ? 'text-slate-200' : 'text-slate-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {p.isTrialCard ? (
                  <div
                    className={`w-full py-3 rounded-xl font-bold text-xs text-center border ${
                      p.active
                        ? 'bg-orange-50 text-orange-700 border-orange-200 font-black'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    {p.active ? `Active Free Trial (${daysRemaining} Days Left)` : '15-Day Trial Completed'}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPlanForPayment({
                        id: p.id as any,
                        name: p.name,
                        price: p.priceNum,
                        period: p.period,
                      })
                    }
                    className={`w-full py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      p.highlighted
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/30'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Pay {p.price} via UPI</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. HOW THE 15-DAY FREE TRIAL & UPI PAYMENT WORKS                          */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-white">How Hotel Munu Subscription Works</h3>
            <p className="text-xs text-slate-400">15-day free onboarding followed by simple, transparent UPI renewal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500 text-white font-black flex items-center justify-center text-xs">
              1
            </div>
            <div className="font-bold text-white text-sm">15 Days Free Trial</div>
            <p className="text-slate-400 leading-relaxed">
              Every hotel starts with 15 days of full, unrestricted access to table QR codes, kitchen KDS, and contactless dining at zero cost.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black flex items-center justify-center text-xs">
              2
            </div>
            <div className="font-bold text-white text-sm">Pay Directly via UPI</div>
            <p className="text-slate-400 leading-relaxed">
              After 15 days, scan the QR code to pay using GPay, PhonePe, Paytm, or BHIM directly to official UPI ID <span className="text-amber-400 font-mono font-bold">{PLATFORM_UPI_ID}</span>.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-black flex items-center justify-center text-xs">
              3
            </div>
            <div className="font-bold text-white text-sm">Instant Plan Activation</div>
            <p className="text-slate-400 leading-relaxed">
              Enter your 12-digit transaction UTR reference number to instantly activate your subscription with extended validity.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. UPI PAYMENT MODAL (WITH DYNAMIC QR & 8010947110@ybl)                   */}
      {/* ========================================================================= */}
      {selectedPlanForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden text-slate-900 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPlanForPayment(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-1 pb-3 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs font-black">
                <CreditCard className="w-3.5 h-3.5" />
                <span>UPI Subscription Payment</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {selectedPlanForPayment.name}
              </h3>
              <div className="text-2xl font-black text-orange-600">
                ₹{selectedPlanForPayment.price}{' '}
                <span className="text-xs text-slate-500 font-normal">
                  ({selectedPlanForPayment.period})
                </span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="text-xs font-bold text-slate-700">
                Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
              </div>

              <div className="bg-white p-3 rounded-2xl inline-block shadow-md border border-slate-200 mx-auto">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="UPI Payment QR Code"
                    className="w-52 h-52 object-contain mx-auto"
                  />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center text-xs text-slate-400">
                    Generating QR...
                  </div>
                )}
              </div>

              {/* UPI ID Copy Box */}
              <div className="bg-white p-2.5 rounded-xl border border-slate-300 flex items-center justify-between gap-2 max-w-xs mx-auto">
                <div className="text-left min-w-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">UPI ID</div>
                  <div className="text-xs font-mono font-black text-slate-900 truncate">
                    {PLATFORM_UPI_ID}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpiId}
                  className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] rounded-lg transition cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Direct UPI Intent Link for Mobile */}
              <a
                href={`upi://pay?pa=${PLATFORM_UPI_ID}&pn=${encodeURIComponent(
                  PLATFORM_NAME
                )}&am=${selectedPlanForPayment.price}&cu=INR&tn=${encodeURIComponent(
                  `Hotel Munu ${selectedPlanForPayment.name}`
                )}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline pt-1"
              >
                <span>📱 Pay Directly on Mobile UPI App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verification Form (UTR) */}
            <form onSubmit={handleVerifyAndActivate} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Enter 12-Digit UPI Ref / UTR Number *
                </label>
                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 423589123456"
                  className="w-full px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Find the UTR / UPI Transaction ID in your PhonePe / GPay / Paytm receipt.
                </p>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-60"
              >
                {isVerifying ? (
                  <span>Verifying UTR...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Payment & Activate Subscription</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
