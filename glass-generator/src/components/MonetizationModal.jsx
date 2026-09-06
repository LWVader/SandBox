// =================================================================     
// FILE: src/components/MonetizationModal.jsx                        
// =================================================================     

import React from 'react';

export default function MonetizationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleCheckout = (type) => {
    if (type === 'one-time') {
      // Replace with your Stripe/Lemon Squeezy $4.99 Pay-Per-Use/Export link
      window.location.href = 'https://buy.stripe.com/your_one_time_payment_link';
    } else {
      // Replace with your Stripe/Lemon Squeezy Subscription link
      window.location.href = 'https://buy.stripe.com/your_subscription_link';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
              💎
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                GlassForge Access
              </h3>
              <p className="text-xs text-slate-400">Choose the plan that fits your workflow</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Pricing Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Option 1: Pay Per Use */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Single Export</span>
              <span className="text-xl font-extrabold text-white">$4.99</span>
              <span className="text-xs text-slate-400 block mt-1">Pay per generation / code export</span>
            </div>
            <button 
              onClick={() => handleCheckout('one-time')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white transition-all"
            >
              Buy 1 Export ⚡
            </button>
          </div>

          {/* Option 2: Pro Subscription */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 flex flex-col justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-[9px] font-bold px-2 py-0.5 rounded-bl text-white">
              BEST VALUE
            </div>
            <div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">PRO Subscription</span>
              <span className="text-xl font-extrabold text-white">$19.99</span>
              <span className="text-xs text-slate-400">/ month</span>
              <span className="text-xs text-slate-400 block mt-1">Unlimited exports & access to all features and updates</span>
            </div>
            <button 
              onClick={() => handleCheckout('subscription')}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 font-bold text-xs text-white shadow-md shadow-indigo-500/20 transition-all"
            >
              Subscribe Now 🚀
            </button>
          </div>

        </div>

        {/* Perks list */}
        <div className="flex flex-col gap-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Tailwind, React, Flutter, Vue, Svelte, SwiftUI, Jetpack Compose</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>All clip-path presets and 3D controls included</span>
          </div>
        </div>

      </div>
    </div>
  );
}