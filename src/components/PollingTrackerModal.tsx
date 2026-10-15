import React, { useState } from 'react';
import { X, TrendingUp, BarChart2, Info, ArrowUpRight, Sliders, RotateCcw } from 'lucide-react';

interface PollingTrackerModalProps {
  onClose: () => void;
}

interface RaceData {
  state: string;
  incumbent: string;
  challenger: string;
  demCandidate: string;
  repCandidate: string;
  baseDemLead: number;
  sampleSize: number;
  marginOfError: number;
  lastUpdated: string;
  rating: 'Toss-Up' | 'Lean D' | 'Lean R' | 'Tilt D' | 'Likely D';
  suburbanSensitivity: number;
  youthSensitivity: number;
  latinoSensitivity: number;
}

const SENATE_RACES: RaceData[] = [
  {
    state: 'Texas',
    incumbent: 'Republican (Retiring)',
    challenger: 'Open Seat',
    demCandidate: 'James Talarico',
    repCandidate: 'Republican Nominee',
    baseDemLead: 1.4,
    sampleSize: 1240,
    marginOfError: 2.8,
    lastUpdated: 'Oct 13, 2026',
    rating: 'Toss-Up',
    suburbanSensitivity: 0.45,
    youthSensitivity: 0.35,
    latinoSensitivity: 0.55,
  },
  {
    state: 'Georgia',
    incumbent: 'Jon Ossoff (D)',
    challenger: 'Republican Nominee',
    demCandidate: 'Jon Ossoff',
    repCandidate: 'Challenger',
    baseDemLead: 2.8,
    sampleSize: 1100,
    marginOfError: 3.1,
    lastUpdated: 'Oct 12, 2026',
    rating: 'Tilt D',
    suburbanSensitivity: 0.6,
    youthSensitivity: 0.4,
    latinoSensitivity: 0.25,
  },
  {
    state: 'Pennsylvania',
    incumbent: 'Bob Casey Jr. (D)',
    challenger: 'Dave McCormick (R)',
    demCandidate: 'Bob Casey Jr.',
    repCandidate: 'Dave McCormick',
    baseDemLead: 2.1,
    sampleSize: 980,
    marginOfError: 3.2,
    lastUpdated: 'Oct 14, 2026',
    rating: 'Tilt D',
    suburbanSensitivity: 0.5,
    youthSensitivity: 0.3,
    latinoSensitivity: 0.2,
  },
  {
    state: 'Ohio',
    incumbent: 'Sherrod Brown (D)',
    challenger: 'Bernie Moreno (R)',
    demCandidate: 'Sherrod Brown',
    repCandidate: 'Bernie Moreno',
    baseDemLead: -0.6,
    sampleSize: 1050,
    marginOfError: 3.0,
    lastUpdated: 'Oct 11, 2026',
    rating: 'Toss-Up',
    suburbanSensitivity: 0.4,
    youthSensitivity: 0.35,
    latinoSensitivity: 0.15,
  },
  {
    state: 'Montana',
    incumbent: 'Jon Tester (D)',
    challenger: 'Tim Sheehy (R)',
    demCandidate: 'Jon Tester',
    repCandidate: 'Tim Sheehy',
    baseDemLead: -1.8,
    sampleSize: 820,
    marginOfError: 3.5,
    lastUpdated: 'Oct 10, 2026',
    rating: 'Lean R',
    suburbanSensitivity: 0.25,
    youthSensitivity: 0.4,
    latinoSensitivity: 0.1,
  },
];

export const PollingTrackerModal: React.FC<PollingTrackerModalProps> = ({ onClose }) => {
  const [selectedRace, setSelectedRace] = useState<RaceData>(SENATE_RACES[0]);
  const [suburbanShift, setSuburbanShift] = useState(0);
  const [youthShift, setYouthShift] = useState(0);
  const [latinoShift, setLatinoShift] = useState(0);

  const calculateLead = (race: RaceData) => {
    const shift =
      suburbanShift * race.suburbanSensitivity +
      youthShift * race.youthSensitivity +
      latinoShift * race.latinoSensitivity;
    return parseFloat((race.baseDemLead + shift).toFixed(1));
  };

  const currentLead = calculateLead(selectedRace);
  const demVote = parseFloat((50 + currentLead / 2).toFixed(1));
  const repVote = parseFloat((50 - currentLead / 2).toFixed(1));

  const resetSliders = () => {
    setSuburbanShift(0);
    setYouthShift(0);
    setLatinoShift(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-franklin">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-6 py-4 bg-[#f7f7f7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3d627b]">
              <TrendingUp className="w-4 h-4" />
              <span>NYT Polling Averages • 2026 Midterm Senate Simulator</span>
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
          <p className="text-sm text-neutral-600 leading-relaxed">
            The Times polling model tracks high-quality state surveys. Control of the Senate hinges on five razor-thin battlegrounds. Adjust the demographic turnout sliders below to simulate election night outcomes.
          </p>

          {/* Interactive Turnout Simulator Controls */}
          <div className="bg-neutral-50 border border-neutral-300 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#3d627b]" />
                Demographic Swing Simulator
              </span>
              <button
                onClick={resetSliders}
                className="text-[11px] font-semibold text-neutral-500 hover:text-black flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Suburban Moderates:</span>
                  <span className="font-mono font-bold">
                    {suburbanShift > 0 ? `+${suburbanShift}% D` : suburbanShift < 0 ? `${suburbanShift}% R` : 'Baseline'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={suburbanShift}
                  onChange={(e) => setSuburbanShift(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Youth (Under 30) Turnout:</span>
                  <span className="font-mono font-bold">
                    {youthShift > 0 ? `+${youthShift}% D` : youthShift < 0 ? `${youthShift}% R` : 'Baseline'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={youthShift}
                  onChange={(e) => setYouthShift(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Latino Voter Margin:</span>
                  <span className="font-mono font-bold">
                    {latinoShift > 0 ? `+${latinoShift}% D` : latinoShift < 0 ? `${latinoShift}% R` : 'Baseline'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={latinoShift}
                  onChange={(e) => setLatinoShift(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Race selection list */}
          <div className="border border-neutral-200 divide-y divide-neutral-200">
            {SENATE_RACES.map((race) => {
              const lead = calculateLead(race);
              const isLeadDem = lead > 0;
              const isSelected = selectedRace.state === race.state;

              return (
                <div
                  key={race.state}
                  onClick={() => setSelectedRace(race)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-neutral-100 border-l-4 border-neutral-900' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-neutral-900">{race.state}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-neutral-200 font-bold uppercase text-neutral-700">
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
                      {lead > 0 ? `D +${lead}%` : lead < 0 ? `R +${Math.abs(lead)}%` : 'Tied 50-50'}
                    </div>
                    <div className="text-[10px] text-neutral-500">
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
                  Detailed Outcome Breakdown
                </span>
                <h3 className="font-masthead text-xl font-bold text-neutral-900">
                  {selectedRace.state}: {selectedRace.demCandidate} vs. {selectedRace.repCandidate}
                </h3>
              </div>
              <span className="text-xs text-neutral-500">
                Poll updated {selectedRace.lastUpdated}
              </span>
            </div>

            {/* Visual Bar representation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold font-franklin">
                <span className="text-[#3d627b]">
                  {selectedRace.demCandidate} ({demVote}%)
                </span>
                <span className="text-[#b32727]">
                  {selectedRace.repCandidate} ({repVote}%)
                </span>
              </div>
              <div className="w-full bg-neutral-300 h-3 flex overflow-hidden">
                <div
                  className="bg-[#3d627b] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, demVote))}%` }}
                />
                <div
                  className="bg-[#b32727] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, repVote))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Democratic Share</span>
                <span>50% Threshold</span>
                <span>Republican Share</span>
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
          <span>The New York Times Politics & Polling Desk</span>
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
