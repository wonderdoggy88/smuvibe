import React, { useState } from 'react';
import { X, TrendingUp, BarChart2, Info, ArrowUpRight } from 'lucide-react';

interface PollingTrackerModalProps {
  onClose: () => void;
}

interface RaceData {
  state: string;
  incumbent: string;
  challenger: string;
  demCandidate: string;
  repCandidate: string;
  demLead: number;
  sampleSize: number;
  marginOfError: number;
  lastUpdated: string;
  rating: 'Toss-Up' | 'Lean D' | 'Lean R' | 'Tilt D' | 'Likely D';
}

const SENATE_RACES: RaceData[] = [
  {
    state: 'Texas',
    incumbent: 'Republican (Retiring)',
    challenger: 'Open Seat',
    demCandidate: 'James Talarico',
    repCandidate: 'Republican Nominee',
    demLead: 1.4,
    sampleSize: 1240,
    marginOfError: 2.8,
    lastUpdated: 'Oct 13, 2026',
    rating: 'Toss-Up',
  },
  {
    state: 'Georgia',
    incumbent: 'Jon Ossoff (D)',
    challenger: 'Republican Nominee',
    demCandidate: 'Jon Ossoff',
    repCandidate: 'Challenger',
    demLead: 2.8,
    sampleSize: 1100,
    marginOfError: 3.1,
    lastUpdated: 'Oct 12, 2026',
    rating: 'Tilt D',
  },
  {
    state: 'Pennsylvania',
    incumbent: 'Bob Casey Jr. (D)',
    challenger: 'Dave McCormick (R)',
    demCandidate: 'Bob Casey Jr.',
    repCandidate: 'Dave McCormick',
    demLead: 2.1,
    sampleSize: 980,
    marginOfError: 3.2,
    lastUpdated: 'Oct 14, 2026',
    rating: 'Tilt D',
  },
  {
    state: 'Ohio',
    incumbent: 'Sherrod Brown (D)',
    challenger: 'Bernie Moreno (R)',
    demCandidate: 'Sherrod Brown',
    repCandidate: 'Bernie Moreno',
    demLead: -0.6,
    sampleSize: 1050,
    marginOfError: 3.0,
    lastUpdated: 'Oct 11, 2026',
    rating: 'Toss-Up',
  },
  {
    state: 'Montana',
    incumbent: 'Jon Tester (D)',
    challenger: 'Tim Sheehy (R)',
    demCandidate: 'Jon Tester',
    repCandidate: 'Tim Sheehy',
    demLead: -1.8,
    sampleSize: 820,
    marginOfError: 3.5,
    lastUpdated: 'Oct 10, 2026',
    rating: 'Lean R',
  },
];

export const PollingTrackerModal: React.FC<PollingTrackerModalProps> = ({ onClose }) => {
  const [selectedRace, setSelectedRace] = useState<RaceData>(SENATE_RACES[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-6 py-4 bg-[#f7f7f7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3d627b]">
              <TrendingUp className="w-4 h-4" />
              <span>NYT Polling Averages • 2026 Midterm Senate Battle</span>
            </div>
            <h2 className="font-masthead text-2xl font-bold text-neutral-900 mt-1">
              Who Leads in the Most Contested Senate Races?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 transition-colors text-neutral-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-sm font-franklin text-neutral-600 leading-relaxed">
            The Times polling model tracks high-quality state surveys, adjusting for sample size, likely voter screen, and historical pollster accuracy. Control of the Senate hinges on five razor-thin battlegrounds.
          </p>

          {/* Race selection list */}
          <div className="border border-neutral-200 divide-y divide-neutral-200">
            {SENATE_RACES.map((race) => {
              const isLeadDem = race.demLead > 0;
              const isSelected = selectedRace.state === race.state;

              return (
                <div
                  key={race.state}
                  onClick={() => setSelectedRace(race)}
                  className={`p-4 cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-neutral-100' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-neutral-900">{race.state}</span>
                      <span className="text-xs px-2 py-0.5 bg-neutral-200 font-semibold uppercase text-neutral-700">
                        {race.rating}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {race.demCandidate} (D) vs. {race.repCandidate} (R)
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-lg font-bold font-mono ${
                        isLeadDem ? 'text-[#3d627b]' : 'text-[#b32727]'
                      }`}
                    >
                      {isLeadDem ? `D +${race.demLead}%` : `R +${Math.abs(race.demLead)}%`}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      ±{race.marginOfError}% MoE • N={race.sampleSize}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep dive on selected race */}
          <div className="bg-[#f7f7f7] border border-neutral-300 p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                  Focus Race Analysis
                </span>
                <h3 className="font-masthead text-xl font-bold text-neutral-900">
                  {selectedRace.state}: {selectedRace.demCandidate} vs. {selectedRace.repCandidate}
                </h3>
              </div>
              <span className="text-xs text-neutral-500">
                Updated {selectedRace.lastUpdated}
              </span>
            </div>

            {/* Visual Bar representation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold font-franklin">
                <span className="text-[#3d627b]">
                  {selectedRace.demCandidate} ({50 + selectedRace.demLead / 2}%)
                </span>
                <span className="text-[#b32727]">
                  {selectedRace.repCandidate} ({50 - selectedRace.demLead / 2}%)
                </span>
              </div>
              <div className="w-full bg-neutral-300 h-3 flex overflow-hidden">
                <div
                  className="bg-[#3d627b] h-full transition-all duration-500"
                  style={{ width: `${50 + selectedRace.demLead / 2}%` }}
                />
                <div
                  className="bg-[#b32727] h-full transition-all duration-500"
                  style={{ width: `${50 - selectedRace.demLead / 2}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Democratic Vote Share</span>
                <span>50% Threshold</span>
                <span>Republican Vote Share</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200">
              <p>
                <strong>Methodology:</strong> The New York Times/Siena College polling consortium aggregates probability-weighted polls across registered and likely voters, applying census weighting by race, education, age, and turnout history.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-300 px-6 py-3 bg-white flex justify-between items-center text-xs text-neutral-500">
          <span>The New York Times Politics Desk</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 text-white font-bold uppercase text-[11px] tracking-wider hover:bg-neutral-800"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
