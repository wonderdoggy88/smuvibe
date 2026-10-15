import React from 'react';
import { X, CloudSun, Wind, Droplets, Sun, Compass } from 'lucide-react';

interface WeatherModalProps {
  onClose: () => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-lg shadow-2xl overflow-hidden font-franklin">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-5 py-3.5 bg-[#f7f7f7]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#3d627b]">
              The New York Times Almanac
            </div>
            <h3 className="font-masthead text-xl font-bold text-neutral-900">
              Weather & Regional Almanac
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-200 text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Weather */}
        <div className="p-5 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                New York, NY • Tri-State Area
              </span>
              <div className="text-4xl font-headline font-bold text-neutral-950 mt-1">
                64°F <span className="text-sm font-normal text-neutral-500">/ 18°C</span>
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                Partly cloudy. Gentle autumn breeze with low humidity.
              </p>
            </div>
            <div className="w-16 h-16 bg-neutral-100 border border-neutral-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-neutral-700">
                partly_cloudy_day
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Humidity</span>
              <span className="font-bold font-mono">48%</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Wind</span>
              <span className="font-bold font-mono">NW 8 mph</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">UV Index</span>
              <span className="font-bold font-mono">3 (Moderate)</span>
            </div>
          </div>
        </div>

        {/* 5-Day Outlook */}
        <div className="p-5">
          <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-900 mb-3 border-b border-neutral-200 pb-1">
            Five-Day Metropolitan Outlook
          </h4>
          <div className="divide-y divide-neutral-100 text-xs">
            {[
              { day: 'Wednesday (Today)', high: '66°', low: '52°', condition: 'Partly Cloudy' },
              { day: 'Thursday, Oct 15', high: '68°', low: '54°', condition: 'Mostly Sunny' },
              { day: 'Friday, Oct 16', high: '61°', low: '49°', condition: 'Afternoon Showers' },
              { day: 'Saturday, Oct 17', high: '59°', low: '46°', condition: 'Brisk & Clear' },
              { day: 'Sunday, Oct 18', high: '63°', low: '50°', condition: 'Pleasant Autumn' },
            ].map((d) => (
              <div key={d.day} className="py-2 flex items-center justify-between">
                <span className="font-medium text-neutral-900">{d.day}</span>
                <span className="text-neutral-500">{d.condition}</span>
                <span className="font-mono font-bold text-neutral-900">
                  {d.high} <span className="font-normal text-neutral-400">/ {d.low}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-300 px-5 py-2.5 bg-[#f7f7f7] text-[11px] text-neutral-500 flex justify-between">
          <span>National Weather Service Data</span>
          <button onClick={onClose} className="font-bold text-neutral-900 hover:underline">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
