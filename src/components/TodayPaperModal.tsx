import React from 'react';
import { X, Newspaper, ChevronRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface TodayPaperModalProps {
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const TodayPaperModal: React.FC<TodayPaperModalProps> = ({ onClose, onSelectArticle }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-franklin">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-6 py-4 bg-[#f7f7f7]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#3d627b]">
              Print Broadsheet Index
            </div>
            <h3 className="font-masthead text-2xl font-bold text-neutral-900">
              Today’s Paper • Wednesday, October 14, 2026
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-200 text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-xs text-neutral-600 leading-relaxed">
            The front page of The New York Times, along with major inside sections as published in the Late Edition (New York City & National distribution).
          </p>

          {/* Page One Section */}
          <div className="border border-neutral-300 p-4 bg-neutral-50">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                Section A • The Front Page (Page A1)
              </span>
              <span className="text-[10px] uppercase font-bold text-neutral-500">
                5 Lead Packages
              </span>
            </div>

            <div className="divide-y divide-neutral-200">
              {ARTICLES.slice(0, 5).map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="py-2.5 cursor-pointer group flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d627b] block">
                      {art.section}
                    </span>
                    <h5 className="font-headline font-semibold text-base text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug">
                      {art.title}
                    </h5>
                    <span className="text-[11px] text-neutral-500">
                      {art.author} • {art.readTime}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-black shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Inside Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                Section B: Business Day
              </span>
              <p className="text-xs text-neutral-600 mb-2">
                Corporate earnings, markets, AI investments, and global commercial trade.
              </p>
              <button
                onClick={() => {
                  const art = ARTICLES.find((a) => a.id === 'anthropic-revenue');
                  if (art) onSelectArticle(art);
                  onClose();
                }}
                className="text-[11px] font-bold text-[#3d627b] hover:underline"
              >
                Read Anthropic Earnings Report ›
              </button>
            </div>

            <div className="p-4 border border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                Section B9: The Athletic & Sports
              </span>
              <p className="text-xs text-neutral-600 mb-2">
                NLCS Game 3 dispatch from Milwaukee and Shohei Ohtani post-game evaluation.
              </p>
              <button
                onClick={() => {
                  const art = ARTICLES.find((a) => a.id === 'brewers-dodgers-nlcs');
                  if (art) onSelectArticle(art);
                  onClose();
                }}
                className="text-[11px] font-bold text-[#3d627b] hover:underline"
              >
                Read NLCS Game 3 Dispatch ›
              </button>
            </div>

            <div className="p-4 border border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                Section A18: Opinion & Guest Essays
              </span>
              <p className="text-xs text-neutral-600 mb-2">
                Essays by David Wallace-Wells, Carlos Lozada, and Heather Kerr.
              </p>
              <button
                onClick={() => {
                  const art = ARTICLES.find((a) => a.id === 'wallace-wells-opinion');
                  if (art) onSelectArticle(art);
                  onClose();
                }}
                className="text-[11px] font-bold text-[#3d627b] hover:underline"
              >
                Read Wallace-Wells Column ›
              </button>
            </div>

            <div className="p-4 border border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                Section C: Arts & Culture
              </span>
              <p className="text-xs text-neutral-600 mb-2">
                Film retrospectives, Brooklyn cultural curiosities, and book reviews.
              </p>
              <button
                onClick={() => {
                  const art = ARTICLES.find((a) => a.id === 'jayson-greene-film');
                  if (art) onSelectArticle(art);
                  onClose();
                }}
                className="text-[11px] font-bold text-[#3d627b] hover:underline"
              >
                Read Tom Cruise Retrospective ›
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-300 px-6 py-3 bg-[#f7f7f7] text-[11px] text-neutral-500 flex justify-between">
          <span>The New York Times Broadsheet Syndicate</span>
          <button onClick={onClose} className="font-bold text-neutral-900 hover:underline">
            Back to Front Page
          </button>
        </div>
      </div>
    </div>
  );
};
