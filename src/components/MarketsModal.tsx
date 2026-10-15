import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface MarketsModalProps {
  onClose: () => void;
}

export const MarketsModal: React.FC<MarketsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-xl shadow-2xl overflow-hidden font-franklin">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-5 py-3.5 bg-[#f7f7f7]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#3d627b]">
              The New York Times Business Day
            </div>
            <h3 className="font-masthead text-xl font-bold text-neutral-900">
              Financial Markets & Global Indices
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-200 text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Major Benchmarks */}
        <div className="p-5 border-b border-neutral-200">
          <div className="text-xs uppercase tracking-wider font-bold text-neutral-500 mb-3">
            Major Indices • Closing Summary
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-500 block">S&P 500</span>
              <div className="text-lg font-bold font-mono text-neutral-900">5,842.10</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +0.42% (+24.4)
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-500 block">NASDAQ</span>
              <div className="text-lg font-bold font-mono text-neutral-900">18,367.40</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +0.68% (+123.8)
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-500 block">DOW JONES</span>
              <div className="text-lg font-bold font-mono text-neutral-900">43,065.22</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +0.25% (+106.1)
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-500 block">10-YR TREASURY</span>
              <div className="text-lg font-bold font-mono text-neutral-900">4.03%</div>
              <div className="text-xs font-semibold text-neutral-600 mt-0.5">Yield -0.02</div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-500 block">BRENT CRUDE</span>
              <div className="text-lg font-bold font-mono text-neutral-900">$74.22</div>
              <div className="text-xs font-bold text-red-700 flex items-center gap-0.5 mt-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> -1.14% (-$0.86)
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-500 block">GOLD OUNCE</span>
              <div className="text-lg font-bold font-mono text-neutral-900">$2,668.50</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +0.35%
              </div>
            </div>
          </div>
        </div>

        {/* Notable Market Action */}
        <div className="p-5 text-xs text-neutral-700 space-y-2 leading-relaxed">
          <p>
            <strong>Wall Street Journal / NYT Markets Wire:</strong> Equities pushed higher in afternoon trading led by artificial intelligence infrastructure and enterprise software providers following Anthropic’s third-quarter revenue announcement.
          </p>
          <p className="text-neutral-500">
            Quotes are delayed by at least 15 minutes. Data provided by NYSE and Nasdaq via FactSet.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-300 px-5 py-2.5 bg-[#f7f7f7] text-[11px] text-neutral-500 flex justify-between">
          <span>The New York Times Business Desk</span>
          <button onClick={onClose} className="font-bold text-neutral-900 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
