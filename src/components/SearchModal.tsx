import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SearchModalProps {
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.summary.toLowerCase().includes(query.toLowerCase()) ||
          a.author.toLowerCase().includes(query.toLowerCase()) ||
          a.section.toLowerCase().includes(query.toLowerCase())
      )
    : ARTICLES.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b-2 border-neutral-900 flex items-center gap-3 bg-[#f7f7f7]">
          <Search className="w-5 h-5 text-neutral-600" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, columnists, topics, or archives..."
            className="flex-1 bg-transparent text-base font-franklin text-neutral-900 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-500 hover:text-black font-semibold"
            >
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-neutral-200 text-neutral-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 max-h-[70vh] overflow-y-auto divide-y divide-neutral-200">
          <div className="pb-3 text-xs font-bold uppercase tracking-wider text-neutral-500 flex justify-between">
            <span>{query ? `Results for "${query}" (${filtered.length})` : 'Recent Front Page Stories'}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-sm">
              No matching articles found in today’s edition for "{query}".
            </div>
          ) : (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="py-3.5 cursor-pointer group hover:bg-neutral-50 px-2 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d627b]">
                    {art.section}
                  </span>
                  <span className="text-neutral-400 text-xs">•</span>
                  <span className="text-[11px] text-neutral-500">{art.date}</span>
                </div>
                <h4 className="font-headline font-semibold text-lg text-neutral-900 group-hover:text-[#3d627b] transition-colors leading-snug">
                  {art.title}
                </h4>
                <p className="text-xs text-neutral-600 font-franklin mt-1 line-clamp-2">
                  {art.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-2 font-franklin">
                  <span className="font-semibold">{art.author}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-300 px-6 py-2.5 bg-[#f7f7f7] text-[11px] text-neutral-500 flex justify-between">
          <span>Search The New York Times Archives & News Wire</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
