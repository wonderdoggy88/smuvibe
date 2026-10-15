import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SectionViewProps {
  sectionName: string;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenGames: () => void;
}

export const SectionView: React.FC<SectionViewProps> = ({
  sectionName,
  onBack,
  onSelectArticle,
  onOpenGames,
}) => {
  // Filter relevant articles for this section
  const sectionNormalized = sectionName.toLowerCase();
  const articles = ARTICLES.filter((art) => {
    const sec = art.section.toLowerCase();
    if (sectionNormalized === 'u.s.' || sectionNormalized === 'us-news') {
      return sec.includes('u.s.') || sec.includes('midterm') || sec.includes('politics');
    }
    if (sectionNormalized === 'world' || sectionNormalized === 'world-news') {
      return sec.includes('world') || sec.includes('ukraine');
    }
    if (sectionNormalized === 'opinion') {
      return sec.includes('opinion');
    }
    if (sectionNormalized === 'business') {
      return sec.includes('business') || art.category === 'tech';
    }
    if (sectionNormalized === 'the athletic') {
      return sec.includes('athletic') || sec.includes('sport');
    }
    if (sectionNormalized === 'arts' || sectionNormalized === 'lifestyle') {
      return sec.includes('culture') || sec.includes('art') || sec.includes('read');
    }
    return sec.includes(sectionNormalized);
  });

  const displayArticles = articles.length > 0 ? articles : ARTICLES.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#1b1c1c] font-franklin max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Back bar */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Front Page</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          The New York Times Section Front
        </span>
      </div>

      {/* Section Masthead */}
      <div className="border-b-2 border-neutral-900 pb-4 mb-8">
        <h1 className="font-masthead text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          {sectionName}
        </h1>
        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2 font-bold">
          Dispatch, Analysis & Investigative Reports
        </p>
      </div>

      {/* Games callout if Games section is clicked */}
      {(sectionNormalized === 'games' || sectionNormalized === 'audio') && (
        <div className="mb-8 p-6 bg-[#f7f7f7] border-2 border-neutral-900 text-center space-y-3">
          <h2 className="font-masthead text-2xl font-bold">Daily Word Games & Puzzles</h2>
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            Play Wordle, The Mini Crossword, Connections, and Spelling Bee right inside your browser.
          </p>
          <button
            onClick={onOpenGames}
            className="px-6 py-2.5 bg-neutral-900 text-white font-bold uppercase text-xs tracking-wider hover:bg-neutral-800"
          >
            Open Games Arena
          </button>
        </div>
      )}

      {/* Section Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayArticles.map((article, idx) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex flex-col justify-between border-b border-neutral-200 pb-6"
          >
            <div>
              {article.imageUrl && (
                <div className="overflow-hidden mb-3 bg-neutral-100 h-48 border border-neutral-200">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#3d627b] mb-1">
                {article.kicker || article.section}
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-semibold text-neutral-950 group-hover:text-neutral-700 leading-snug mb-2">
                {article.title}
              </h3>
              <p className="text-xs text-neutral-600 font-franklin line-clamp-3 mb-3 leading-relaxed">
                {article.summary}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
              <span className="font-bold text-neutral-900">{article.author}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
