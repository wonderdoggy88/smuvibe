import React, { useState } from 'react';
import { X, Check, ShieldCheck, Newspaper, Sparkles } from 'lucide-react';

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribed?: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSubscribed }) => {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'all-access'>('all-access');
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsDone(true);
    if (onSubscribed) onSubscribed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-6 py-4 bg-[#f7f7f7]">
          <div>
            <span className="font-masthead text-2xl font-bold tracking-tight text-neutral-900">
              The New York Times
            </span>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#3d627b]">
              Special Digital Subscription Offer
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 transition-colors text-neutral-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isDone ? (
            <>
              <div className="text-center space-y-1">
                <h3 className="font-masthead text-3xl font-bold text-neutral-900">
                  Read without limits.
                </h3>
                <p className="text-sm text-neutral-600 font-franklin max-w-md mx-auto">
                  Independent, investigative journalism that demands time, courage, and resources. Support the reporting that keeps power accountable.
                </p>
              </div>

              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Standard */}
                <div
                  onClick={() => setSelectedPlan('standard')}
                  className={`p-4 border-2 cursor-pointer transition-all ${
                    selectedPlan === 'standard'
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Basic Digital
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">
                    $1<span className="text-xs font-normal text-neutral-600">/week</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mb-3">Billed as $4 every 4 weeks</div>
                  <ul className="text-xs space-y-2 text-neutral-700">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Unlimited News & Investigations</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>The Times iOS & Android App</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Daily Audio & Podcasts</span>
                    </li>
                  </ul>
                </div>

                {/* All Access */}
                <div
                  onClick={() => setSelectedPlan('all-access')}
                  className={`p-4 border-2 cursor-pointer transition-all relative ${
                    selectedPlan === 'all-access'
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="absolute top-2 right-2 bg-neutral-900 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                    Recommended
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#3d627b] mb-1">
                    All Access
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">
                    $1.50<span className="text-xs font-normal text-neutral-600">/week</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mb-3">Billed as $6 every 4 weeks</div>
                  <ul className="text-xs space-y-2 text-neutral-700">
                    <li className="flex items-center gap-1.5 font-bold text-neutral-900">
                      <Sparkles className="w-3.5 h-3.5 text-[#3d627b]" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>NYT Games (Wordle, Spelling Bee)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>NYT Cooking recipes & meal plans</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Wirecutter product reviews</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                      <span>The Athletic in-depth sports coverage</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Enter your email to activate subscription
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-neutral-900 text-sm focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#3d627b] hover:bg-[#244b63] text-white font-bold uppercase text-xs tracking-wider transition-colors"
                >
                  Start Subscription for $1/Week
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cancel anytime online. Money-back guarantee.</span>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-masthead text-2xl font-bold text-neutral-900">
                Welcome to The New York Times
              </h3>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto font-franklin">
                Your subscription has been activated for <strong>{email}</strong>. You now have unlimited digital access to our reporting, investigations, and features.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-neutral-900 text-white font-bold uppercase text-xs tracking-wider hover:bg-neutral-800"
              >
                Continue Reading
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-300 px-6 py-3 bg-[#f7f7f7] text-[11px] text-neutral-500 flex justify-between items-center">
          <span>The New York Times Company</span>
          <span>Terms of Sale • Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};
