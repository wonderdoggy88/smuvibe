/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  TrendingUp,
  MessageSquare,
  Lock,
  ArrowRight,
  Sparkles,
  CloudSun,
  X,
  Check,
  Newspaper,
  Compass,
  Volume2
} from 'lucide-react';
import { Article, ARTICLES } from './data/newsData';
import { ArticleView } from './components/ArticleView';
import { SectionView } from './components/SectionView';
import { NytGamesModal } from './components/NytGamesModal';
import { PollingTrackerModal } from './components/PollingTrackerModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { WeatherModal } from './components/WeatherModal';
import { MarketsModal } from './components/MarketsModal';
import { TodayPaperModal } from './components/TodayPaperModal';
import { NytMastheadText } from './components/NytLogo';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'frontpage' | 'article' | 'section'>('frontpage');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeSection, setActiveSection] = useState<string>('U.S.');
  const [activeEdition, setActiveEdition] = useState<'U.S.' | 'International' | 'Canada' | 'Español' | '中文'>('U.S.');

  // Modals
  const [isGamesModalOpen, setIsGamesModalOpen] = useState(false);
  const [initialGameTab, setInitialGameTab] = useState<'wordle' | 'mini' | 'connections' | 'spelling-bee'>('wordle');
  const [isPollingModalOpen, setIsPollingModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isMarketsModalOpen, setIsMarketsModalOpen] = useState(false);
  const [isTodayPaperModalOpen, setIsTodayPaperModalOpen] = useState(false);

  // User & Saved Articles state (persisted to localStorage)
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem('nyt_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nyt_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nyt_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (article: Article) => {
    setBookmarkedIds((prev) =>
      prev.includes(article.id)
        ? prev.filter((id) => id !== article.id)
        : [...prev, article.id]
    );
  };

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (sectionName: string) => {
    if (sectionName.toLowerCase() === 'games') {
      setInitialGameTab('wordle');
      setIsGamesModalOpen(true);
      return;
    }
    setActiveSection(sectionName);
    setCurrentView('section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFrontpage = () => {
    setCurrentView('frontpage');
    setActiveArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGame = (game: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => {
    setInitialGameTab(game);
    setIsGamesModalOpen(true);
  };

  // Helper getters for specific stories by ID
  const leadStory = ARTICLES.find((a) => a.id === 'katie-zacharia-press-secretary') || ARTICLES[1];
  const womenLeavingStory = ARTICLES.find((a) => a.id === 'trump-women-leaving') || ARTICLES[0];
  const guilfoyleStory = ARTICLES.find((a) => a.id === 'guilfoyle-resignation') || ARTICLES[2];
  const midtermStory = ARTICLES.find((a) => a.id === 'midterm-red-state-ads') || ARTICLES[3];
  const ukraineStory = ARTICLES.find((a) => a.id === 'ukraine-satellite-escalation') || ARTICLES[4];
  const eveningStory = ARTICLES.find((a) => a.id === 'evening-briefing') || ARTICLES[5];
  const opinion1 = ARTICLES.find((a) => a.id === 'wallace-wells-opinion') || ARTICLES[6];
  const opinion2 = ARTICLES.find((a) => a.id === 'lozada-opinion') || ARTICLES[7];
  const opinion3 = ARTICLES.find((a) => a.id === 'heather-kerr-essay') || ARTICLES[8];
  const opinion4 = ARTICLES.find((a) => a.id === 'jayson-greene-film') || ARTICLES[9];
  const deepTech = ARTICLES.find((a) => a.id === 'ai-agents-dinner-party') || ARTICLES[10];
  const deepHealth = ARTICLES.find((a) => a.id === 'pope-leo-lung-cancer') || ARTICLES[12];
  const deepGreatRead = ARTICLES.find((a) => a.id === 'coming-out-at-50') || ARTICLES[14];
  const deepAthletic = ARTICLES.find((a) => a.id === 'brewers-dodgers-nlcs') || ARTICLES[16];
  const pumpkinAlert = ARTICLES.find((a) => a.id === 'giant-pumpkin-world-record') || ARTICLES[18];

  const bookmarkedArticles = ARTICLES.filter((a) => bookmarkedIds.includes(a.id));

  // Render article view if active
  if (currentView === 'article' && activeArticle) {
    return (
      <>
        <ArticleView
          article={activeArticle}
          onBack={handleBackToFrontpage}
          onSelectArticle={handleSelectArticle}
          isBookmarked={bookmarkedIds.includes(activeArticle.id)}
          onToggleBookmark={toggleBookmark}
        />
        {isSubscriptionModalOpen && (
          <SubscriptionModal
            onClose={() => setIsSubscriptionModalOpen(false)}
            onSubscribed={() => {
              setCurrentUser({ email: 'subscriber@nytimes.com', name: 'Times Reader' });
              setIsSubscriptionModalOpen(false);
            }}
          />
        )}
      </>
    );
  }

  // Render section view if active
  if (currentView === 'section') {
    return (
      <>
        <SectionView
          sectionName={activeSection}
          onBack={handleBackToFrontpage}
          onSelectArticle={handleSelectArticle}
          onOpenGames={() => openGame('wordle')}
        />
        {isGamesModalOpen && (
          <NytGamesModal
            initialGame={initialGameTab}
            onClose={() => setIsGamesModalOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="bg-white font-franklin text-[#1b1c1c] antialiased min-h-screen flex flex-col selection:bg-[#3d627b]/20">
      {/* ===================== HEADER ===================== */}
      <header className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top Utility Row */}
          <div className="flex items-center justify-between py-1 border-b border-transparent">
            {/* Edition links */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
              {(['U.S.', 'International', 'Canada', 'Español', '中文'] as const).map((ed, idx) => (
                <React.Fragment key={ed}>
                  <button
                    onClick={() => setActiveEdition(ed)}
                    className={`transition-colors ${
                      activeEdition === ed
                        ? 'text-neutral-900 font-extrabold'
                        : 'hover:text-black'
                    }`}
                  >
                    {ed}
                  </button>
                  {idx < 4 && <span className="text-neutral-300">|</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden sm:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600 hover:text-black px-2 py-0.5 transition-colors"
                title="Search the archives"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>

              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="inline-flex items-center justify-center px-3 py-1 bg-[#3d627b] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#244b63] transition-colors"
              >
                SUBSCRIBE FOR $1/WEEK
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center justify-center px-3 py-1 border border-neutral-900 bg-white text-neutral-900 text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors"
              >
                {currentUser ? currentUser.name : 'LOG IN'}
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors ml-1"
                aria-label="Account"
              >
                <span className="material-symbols-outlined text-[16px]">person</span>
              </button>
            </div>
          </div>

          {/* Heavy Double hairline */}
          <div className="border-t-2 border-neutral-900 my-1"></div>

          {/* Subheader with Date, Weather, and Markets */}
          <div className="flex items-center justify-between py-1.5 text-[11px] font-bold text-neutral-600">
            <div className="flex items-center gap-3">
              <span className="text-neutral-900">Wednesday, October 14, 2026</span>
              <button
                onClick={() => setIsTodayPaperModalOpen(true)}
                className="hover:text-black font-semibold transition-colors flex items-center gap-1"
              >
                <Newspaper className="w-3 h-3 text-neutral-500" />
                Today’s Paper
              </button>
            </div>

            <div className="flex items-center gap-4 uppercase text-[10px] tracking-wider">
              <button
                onClick={() => setIsWeatherModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-black transition-colors"
                title="View weather almanac"
              >
                <span className="material-symbols-outlined text-[16px] text-neutral-600">
                  partly_cloudy_day
                </span>
                <span>New York 64°F</span>
              </button>
              <div className="flex items-center gap-3 border-l border-neutral-200 pl-3">
                <button
                  onClick={() => setIsMarketsModalOpen(true)}
                  className="hover:text-black transition-colors"
                  title="View financial markets"
                >
                  S&P 500 <strong className="text-neutral-900">+0.42%</strong>
                </button>
                <button
                  onClick={() => setIsMarketsModalOpen(true)}
                  className="hover:text-black transition-colors"
                  title="View financial markets"
                >
                  NASDAQ <strong className="text-neutral-900">+0.68%</strong>
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-200 mb-2"></div>

          {/* Centered Classic Masthead with Broadsheet Ears */}
          <div className="py-2.5 relative flex items-center justify-between">
            {/* Left Ear: Motto */}
            <div className="hidden lg:block w-36 text-left">
              <p className="text-[10px] leading-tight font-serif italic text-neutral-500 border border-neutral-200 p-1.5 bg-neutral-50">
                “All the News That’s Fit to Print”
              </p>
            </div>

            {/* Centered Masthead */}
            <div className="flex-1 text-center">
              <button
                onClick={handleBackToFrontpage}
                className="inline-block text-center hover:opacity-95 transition-opacity"
              >
                <NytMastheadText size="lg" />
              </button>
            </div>

            {/* Right Ear: Edition summary */}
            <div className="hidden lg:block w-36 text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                Late Edition
              </div>
              <div className="text-[9px] text-neutral-400">
                Vol. CLXXVI No. 60,342
              </div>
            </div>
          </div>

          {/* Section Navigation Ribbon */}
          <nav className="border-y border-neutral-200 py-1.5 flex items-center justify-center gap-4 sm:gap-7 flex-wrap text-xs font-bold uppercase tracking-wider text-neutral-700">
            {[
              'U.S.',
              'World',
              'Business',
              'Arts',
              'Lifestyle',
              'Opinion',
              'Audio',
              'Games',
              'Cooking',
              'Wirecutter',
              'The Athletic',
            ].map((sec) => (
              <button
                key={sec}
                onClick={() => handleSelectSection(sec)}
                className={`py-0.5 hover:text-black transition-colors ${
                  activeSection === sec
                    ? 'border-b-2 border-neutral-900 text-neutral-950 font-black'
                    : ''
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>
          <div className="border-b border-neutral-900 mt-[1px]"></div>
        </div>
      </header>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-3 flex-1 bg-white">
        {/* Trending Alert Sub-bar */}
        <div className="flex items-center justify-between py-1.5 mb-3 border-b border-neutral-200 text-xs">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 text-[11px]">
            <span className="font-extrabold uppercase tracking-wider text-[#b32727] flex items-center gap-1.5 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-[#b32727] animate-pulse"></span>
              Trending
            </span>
            <span className="text-neutral-300">|</span>
            <button
              onClick={() => handleSelectArticle(ukraineStory)}
              className="hover:text-black text-neutral-900 font-semibold"
            >
              Russia-Ukraine War
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => setIsPollingModalOpen(true)}
              className="hover:text-black text-neutral-900 font-semibold"
            >
              2026 Midterm Elections
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => handleSelectArticle(deepTech)}
              className="hover:text-black text-neutral-900 font-semibold"
            >
              Artificial Intelligence
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => handleSelectArticle(deepAthletic)}
              className="hover:text-black text-neutral-900 font-semibold"
            >
              M.L.B. Playoffs
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => handleSelectArticle(deepHealth)}
              className="hover:text-black text-neutral-900 font-semibold"
            >
              Pope Leo's Health
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-neutral-600 text-[11px] shrink-0">
            <span className="material-symbols-outlined text-[15px] text-[#d97706]">
              lock_open
            </span>
            <span>
              These top stories are <strong className="text-neutral-900 font-bold">free to read</strong>
            </span>
          </div>
        </div>

        {/* PRIMARY 3-COLUMN BROADSHEET GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b-2 border-neutral-900 pb-8">
          {/* ============ LEFT COLUMN: Lead Story & Midterms (4 cols) ============ */}
          <section className="lg:col-span-4 lg:pr-5 lg:border-r border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  U.S. Politics
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold">Oct. 14, 2026</span>
              </div>

              {/* Main Left Lead Story */}
              <article
                onClick={() => handleSelectArticle(womenLeavingStory)}
                className="group cursor-pointer"
              >
                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-950 group-hover:text-neutral-600 transition-colors leading-[1.15] mb-2">
                  High-Ranking Women Are Leaving the Trump Administration
                </h2>
                <p className="font-headline text-base text-neutral-600 leading-[1.35] mb-3 font-normal">
                  In the president’s second term, those heading for the exits are female officials who had once been central to his inner circle.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold mb-4">
                  <span>5 min read</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-neutral-900">
                    <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                    519
                  </span>
                </div>
              </article>

              <div className="border-t border-neutral-200 my-4"></div>

              {/* Sub Lead Story 1 */}
              <article
                onClick={() => handleSelectArticle(guilfoyleStory)}
                className="group cursor-pointer mb-4"
              >
                <h3 className="font-headline text-xl font-semibold text-neutral-950 group-hover:text-neutral-600 transition-colors leading-snug mb-1">
                  The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                </h3>
                <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                  Her swift resignation as ambassador nominee capped weeks of infighting among advisers and questions over financial disclosures.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                  <span className="font-bold text-neutral-900">By Maggie Haberman</span>
                  <span>•</span>
                  <span>4 min read</span>
                </div>
              </article>

              <div className="border-t border-neutral-200 my-4"></div>

              {/* Midterm Campaign Item */}
              <article
                onClick={() => handleSelectArticle(midtermStory)}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#f7f7f7] text-neutral-900 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                    Analysis
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#b32727] font-bold">
                    2026 Midterms
                  </span>
                </div>
                <h4 className="font-headline text-lg font-semibold leading-snug text-neutral-950 group-hover:text-neutral-600 transition-colors mb-1.5">
                  Democratic Donor Emerges to Blitz Red-State Senate Races With Late Ads
                </h4>
                <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                  A quiet influx of tens of millions in untracked funds targets contested districts in Texas and Georgia.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                  <span>2 min read</span>
                </div>
              </article>
            </div>

            {/* Quick Interactive Poll Indicator */}
            <div className="mt-6 pt-3 border-t border-neutral-200 bg-[#f7f7f7] p-3 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-neutral-900 font-bold">
                  Latest Senate Polling
                </span>
                <button
                  onClick={() => setIsPollingModalOpen(true)}
                  className="text-[11px] uppercase text-[#3d627b] hover:underline font-bold"
                >
                  Full Tracker ›
                </button>
              </div>
              <div className="space-y-2 text-xs font-franklin">
                <div className="flex justify-between items-center">
                  <span>Texas (Talarico vs. Republican)</span>
                  <span className="font-bold text-neutral-900 font-mono">D +1.4%</span>
                </div>
                <div className="w-full bg-neutral-200 h-1">
                  <div className="bg-[#3d627b] h-1" style={{ width: '52%' }}></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>Georgia (Ossoff Defense)</span>
                  <span className="font-bold text-neutral-900 font-mono">D +2.8%</span>
                </div>
                <div className="w-full bg-neutral-200 h-1">
                  <div className="bg-[#3d627b] h-1" style={{ width: '54%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ CENTER COLUMN: Lead Visual Feature & War Updates (5 cols) ============ */}
          <section className="lg:col-span-5 lg:px-5 lg:border-r border-neutral-200 mt-6 lg:mt-0">
            {/* Main Visual Feature */}
            <article
              onClick={() => handleSelectArticle(leadStory)}
              className="group cursor-pointer mb-4"
            >
              <div className="relative overflow-hidden mb-2 bg-neutral-100 border border-neutral-200">
                <img
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[280px] object-cover group-hover:scale-101 transition-transform duration-300"
                />
                <div className="absolute bottom-0 right-0 bg-white/90 px-1.5 py-0.5 text-[10px] text-neutral-600 font-franklin">
                  {leadStory.imageCredit}
                </div>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-950 group-hover:text-neutral-600 transition-colors leading-tight mb-1.5">
                {leadStory.title}
              </h2>
              <p className="font-headline text-base text-neutral-600 leading-relaxed mb-2 font-normal">
                {leadStory.summary}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                <span className="font-bold text-neutral-900">{leadStory.author}</span>
                <span>•</span>
                <span>{leadStory.readTime}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-neutral-900">
                  <span className="material-symbols-outlined text-[13px]">chat_bubble</span>
                  {leadStory.commentCount}
                </span>
              </div>
            </article>

            <div className="border-t border-neutral-200 my-4"></div>

            {/* Live War / International Update Box */}
            <div className="bg-[#f7f7f7] p-4 mb-4 border-l-2 border-[#b32727] border-y border-r border-neutral-200">
              <div className="flex items-center gap-1 text-[#b32727] text-[10px] uppercase font-extrabold mb-1.5">
                <span className="material-symbols-outlined text-[14px]">rss_feed</span>
                <span>War in Ukraine • Live Updates</span>
              </div>
              <article
                onClick={() => handleSelectArticle(ukraineStory)}
                className="group cursor-pointer mb-3"
              >
                <h3 className="font-headline text-xl leading-snug font-semibold text-neutral-950 group-hover:text-neutral-600 transition-colors mb-1.5">
                  {ukraineStory.title}
                </h3>
                <p className="text-xs text-neutral-600 font-franklin leading-relaxed">
                  {ukraineStory.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold mt-2">
                  <span className="text-[#b32727] font-bold">14m ago</span>
                  <span>•</span>
                  <span>Kyiv Bureau</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-neutral-900">
                    <span className="material-symbols-outlined text-[13px]">chat_bubble</span>
                    1.1k
                  </span>
                </div>
              </article>

              {/* Bulleted Wire Feed */}
              <ul className="space-y-1.5 pt-2 border-t border-neutral-200 text-xs font-franklin">
                <li
                  onClick={() => handleSelectArticle(ukraineStory)}
                  className="flex items-start gap-2 cursor-pointer hover:underline text-neutral-900 font-medium leading-snug"
                >
                  <span className="text-neutral-900 font-bold text-sm leading-none mt-0.5">›</span>
                  <span>Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices at U.S. Pumps</span>
                </li>
                <li
                  onClick={() => handleSelectArticle(ukraineStory)}
                  className="flex items-start gap-2 cursor-pointer hover:underline text-neutral-900 font-medium leading-snug"
                >
                  <span className="text-neutral-900 font-bold text-sm leading-none mt-0.5">›</span>
                  <span>The U.S. Continues to Provide Tactical Intelligence to Kyiv, Officials Reaffirm</span>
                </li>
              </ul>
            </div>

            {/* The Evening Catchup Item */}
            <article
              onClick={() => handleSelectArticle(eveningStory)}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase tracking-widest text-neutral-900 font-bold">
                  The Evening
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold">Briefing</span>
              </div>
              <h4 className="font-headline text-xl font-semibold text-neutral-950 group-hover:text-neutral-600 transition-colors mb-1">
                {eveningStory.title}
              </h4>
              <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                {eveningStory.summary}
              </p>
              <span className="text-[11px] text-neutral-500 font-semibold">
                5 min read • Evening Edition
              </span>
            </article>
          </section>

          {/* ============ RIGHT COLUMN: Opinion & The Daily Games (3 cols) ============ */}
          <section className="lg:col-span-3 lg:pl-5 mt-6 lg:mt-0 flex flex-col justify-between">
            <div>
              <div className="border-b border-neutral-900 pb-1.5 mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-900 font-extrabold">
                  Opinion
                </span>
                <button
                  onClick={() => handleSelectSection('Opinion')}
                  className="text-[10px] uppercase text-[#3d627b] hover:underline font-bold"
                >
                  All Columnists ›
                </button>
              </div>

              {/* Opinion Story 1: David Wallace-Wells */}
              <article
                onClick={() => handleSelectArticle(opinion1)}
                className="group cursor-pointer mb-3 pb-3 border-b border-neutral-200"
              >
                <div className="flex items-start gap-2.5 mb-1.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-neutral-200 border border-neutral-300">
                    <img
                      src={opinion1.authorAvatar}
                      alt={opinion1.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block leading-tight">
                      {opinion1.author}
                    </span>
                    <span className="text-[11px] text-neutral-500">Contributing Opinion Writer</span>
                  </div>
                </div>
                <h3 className="font-headline text-lg italic leading-snug text-neutral-950 group-hover:text-neutral-600 transition-colors">
                  {opinion1.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold mt-1">
                  <span className="flex items-center gap-1 text-neutral-900">
                    <span className="material-symbols-outlined text-[13px]">chat_bubble</span>
                    {opinion1.commentCount} comments
                  </span>
                </div>
              </article>

              {/* Opinion Story 2: Carlos Lozada */}
              <article
                onClick={() => handleSelectArticle(opinion2)}
                className="group cursor-pointer mb-3 pb-3 border-b border-neutral-200"
              >
                <div className="flex items-start gap-2.5 mb-1.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-neutral-200 border border-neutral-300">
                    <img
                      src={opinion2.authorAvatar}
                      alt={opinion2.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block leading-tight">
                      {opinion2.author}
                    </span>
                    <span className="text-[11px] text-neutral-500">Times Columnist</span>
                  </div>
                </div>
                <h3 className="font-headline text-lg italic leading-snug text-neutral-950 group-hover:text-neutral-600 transition-colors">
                  {opinion2.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold mt-1">
                  <span className="flex items-center gap-1 text-neutral-900">
                    <span className="material-symbols-outlined text-[13px]">chat_bubble</span>
                    {opinion2.commentCount} comments
                  </span>
                </div>
              </article>

              {/* Opinion Story 3: Guest Essay Heather Kerr */}
              <article
                onClick={() => handleSelectArticle(opinion3)}
                className="group cursor-pointer mb-3 pb-3 border-b border-neutral-200"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d627b] mb-0.5 block">
                  Guest Essay
                </span>
                <span className="text-xs font-bold text-neutral-900 block">{opinion3.author}</span>
                <h3 className="font-headline text-base italic leading-snug text-neutral-950 group-hover:text-neutral-600 transition-colors mt-0.5">
                  {opinion3.title}
                </h3>
              </article>

              {/* Opinion Story 4: Jayson Greene */}
              <article
                onClick={() => handleSelectArticle(opinion4)}
                className="group cursor-pointer mb-4"
              >
                <span className="text-xs font-bold text-neutral-900 block">{opinion4.author}</span>
                <h3 className="font-headline text-base italic leading-snug text-neutral-950 group-hover:text-neutral-600 transition-colors mt-0.5">
                  {opinion4.title}
                </h3>
                <span className="text-[11px] text-neutral-500 font-semibold">5 min read</span>
              </article>
            </div>

            {/* NYT Games Module */}
            <div className="mt-4 bg-[#f7f7f7] border-t-2 border-neutral-900 p-3.5 border border-neutral-200">
              <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-neutral-900 text-[18px]">
                    extension
                  </span>
                  <span className="text-xs uppercase tracking-widest text-neutral-900 font-bold">
                    NYT Games
                  </span>
                </div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase">
                  Daily Puzzles
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Wordle */}
                <button
                  onClick={() => openGame('wordle')}
                  className="flex items-center justify-between p-2 bg-white border border-neutral-200 hover:border-neutral-900 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-[11px]">
                      W
                    </div>
                    <span className="text-xs font-bold text-neutral-900">Wordle</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-semibold">Play</span>
                </button>

                {/* Connections */}
                <button
                  onClick={() => openGame('connections')}
                  className="flex items-center justify-between p-2 bg-white border border-neutral-200 hover:border-neutral-900 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#bda4eb] text-white flex items-center justify-center font-bold text-[11px]">
                      C
                    </div>
                    <span className="text-xs font-bold text-neutral-900">Connections</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-semibold">Play</span>
                </button>

                {/* Spelling Bee */}
                <button
                  onClick={() => openGame('spelling-bee')}
                  className="flex items-center justify-between p-2 bg-white border border-neutral-200 hover:border-neutral-900 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#f7da21] text-black flex items-center justify-center font-bold text-[11px]">
                      ★
                    </div>
                    <span className="text-xs font-bold text-neutral-900">Spelling Bee</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-semibold">Play</span>
                </button>

                {/* The Mini */}
                <button
                  onClick={() => openGame('mini')}
                  className="flex items-center justify-between p-2 bg-white border border-neutral-200 hover:border-neutral-900 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-neutral-900 text-white flex items-center justify-center font-bold text-[11px]">
                      M
                    </div>
                    <span className="text-xs font-bold text-neutral-900">The Mini</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-semibold">Play</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* SECONDARY BROADSHEET SECTION: Deep Dives & Dispatches (4 columns) */}
        <div className="pt-6 mb-8">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-1.5 mb-5">
            <span className="text-xs uppercase tracking-widest font-extrabold text-neutral-900">
              Deep Dives & Dispatches
            </span>
            <span className="text-[11px] text-neutral-500 font-semibold">
              Updated continuously throughout the day
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* COLUMN 1: Tech & A.I. */}
            <div className="lg:border-r border-neutral-200 lg:pr-5">
              <div className="border-b border-neutral-200 pb-1 mb-2.5 flex items-center justify-between">
                <span className="text-xs uppercase text-neutral-900 font-bold">Tech & A.I.</span>
                <span className="text-[10px] text-[#3d627b] uppercase font-bold">Special Report</span>
              </div>
              <article
                onClick={() => handleSelectArticle(deepTech)}
                className="group cursor-pointer mb-3"
              >
                <div className="relative overflow-hidden mb-2 bg-neutral-100 border border-neutral-200">
                  <img
                    src={deepTech.imageUrl}
                    alt={deepTech.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-36 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-headline text-lg font-semibold text-neutral-950 group-hover:text-neutral-600 leading-snug mb-1.5">
                  {deepTech.title}
                </h3>
                <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                  {deepTech.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                  <span className="font-bold text-neutral-900">By {deepTech.author}</span>
                  <span>•</span>
                  <span>{deepTech.commentCount} comments</span>
                </div>
              </article>
              <div className="border-t border-neutral-200 pt-2">
                <article
                  onClick={() =>
                    handleSelectArticle(
                      ARTICLES.find((a) => a.id === 'anthropic-revenue') || deepTech
                    )
                  }
                  className="group cursor-pointer"
                >
                  <h4 className="font-headline text-base leading-snug text-neutral-950 group-hover:text-neutral-600 mb-1">
                    Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-semibold">
                    3 min read • Financial Markets
                  </span>
                </article>
              </div>
            </div>

            {/* COLUMN 2: Health & Medicine */}
            <div className="lg:border-r border-neutral-200 lg:pr-5">
              <div className="border-b border-neutral-200 pb-1 mb-2.5 flex items-center justify-between">
                <span className="text-xs uppercase text-neutral-900 font-bold">Health & Medicine</span>
              </div>
              <article
                onClick={() => handleSelectArticle(deepHealth)}
                className="group cursor-pointer mb-3"
              >
                <div className="relative overflow-hidden mb-2 bg-neutral-100 border border-neutral-200">
                  <img
                    src={deepHealth.imageUrl}
                    alt={deepHealth.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-36 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-headline text-lg font-semibold text-neutral-950 group-hover:text-neutral-600 leading-snug mb-1.5">
                  {deepHealth.title}
                </h3>
                <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                  {deepHealth.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                  <span className="font-bold text-neutral-900">By {deepHealth.author}</span>
                  <span>•</span>
                  <span>{deepHealth.commentCount} comments</span>
                </div>
              </article>
              <div className="border-t border-neutral-200 pt-2">
                <article
                  onClick={() =>
                    handleSelectArticle(
                      ARTICLES.find((a) => a.id === 'lung-cancer-screening') || deepHealth
                    )
                  }
                  className="group cursor-pointer"
                >
                  <h4 className="font-headline text-base leading-snug text-neutral-950 group-hover:text-neutral-600 mb-1">
                    Why So Many Eligible Americans Still Aren't Screened for Lung Cancer
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-semibold">
                    4 min read • Preventative Care
                  </span>
                </article>
              </div>
            </div>

            {/* COLUMN 3: The Great Read */}
            <div className="lg:border-r border-neutral-200 lg:pr-5">
              <div className="border-b border-neutral-200 pb-1 mb-2.5 flex items-center justify-between">
                <span className="text-xs uppercase text-[#b32727] font-bold">The Great Read</span>
              </div>
              <article
                onClick={() => handleSelectArticle(deepGreatRead)}
                className="group cursor-pointer mb-3"
              >
                <div className="relative overflow-hidden mb-2 bg-neutral-100 border border-neutral-200">
                  <img
                    src={deepGreatRead.imageUrl}
                    alt={deepGreatRead.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-36 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-headline text-lg font-semibold text-neutral-950 group-hover:text-neutral-600 leading-snug mb-1.5">
                  {deepGreatRead.title}
                </h3>
                <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                  {deepGreatRead.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                  <span className="font-bold text-neutral-900">{deepGreatRead.author}</span>
                  <span>•</span>
                  <span>{deepGreatRead.commentCount} comments</span>
                </div>
              </article>
              <div className="border-t border-neutral-200 pt-2">
                <article
                  onClick={() =>
                    handleSelectArticle(
                      ARTICLES.find((a) => a.id === 'toy-store-bird') || deepGreatRead
                    )
                  }
                  className="group cursor-pointer"
                >
                  <h4 className="font-headline text-base leading-snug text-neutral-950 group-hover:text-neutral-600 mb-1">
                    The Toy Store, and $15 Million Bird, at the Center of an Internet Frenzy
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-semibold">
                    5 min read • Brooklyn Culture
                  </span>
                </article>
              </div>
            </div>

            {/* COLUMN 4: Sports & The Athletic */}
            <div>
              <div className="border-b border-neutral-200 pb-1 mb-2.5 flex items-center justify-between">
                <span className="text-xs uppercase text-neutral-900 font-bold">The Athletic</span>
                <span className="text-[10px] text-[#d97706] uppercase font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#d97706] rounded-full animate-ping"></span>
                  Live
                </span>
              </div>
              <article
                onClick={() => handleSelectArticle(deepAthletic)}
                className="group cursor-pointer mb-3"
              >
                <div className="relative overflow-hidden mb-2 bg-neutral-100 border border-neutral-200">
                  <img
                    src={deepAthletic.imageUrl}
                    alt={deepAthletic.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-36 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#b32727] text-white text-[10px] uppercase font-bold px-1.5 py-0.5">
                    NLCS Game 3
                  </div>
                </div>
                <h3 className="font-headline text-lg font-semibold text-neutral-950 group-hover:text-neutral-600 leading-snug mb-1.5">
                  {deepAthletic.title}
                </h3>
                <p className="text-xs text-neutral-600 font-franklin mb-2 leading-relaxed">
                  {deepAthletic.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                  <span className="font-bold text-neutral-900">By {deepAthletic.author}</span>
                  <span>•</span>
                  <span className="text-[#b32727] font-semibold">Live Coverage</span>
                </div>
              </article>
              <div className="border-t border-neutral-200 pt-2">
                <article
                  onClick={() =>
                    handleSelectArticle(
                      ARTICLES.find((a) => a.id === 'shohei-ohtani-injury') || deepAthletic
                    )
                  }
                  className="group cursor-pointer"
                >
                  <h4 className="font-headline text-base leading-snug text-neutral-950 group-hover:text-neutral-600 mb-1">
                    Shohei Ohtani Insists He Can Play. The Dodgers’ Season Hinges on It.
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-semibold">
                    4 min read • From The Athletic
                  </span>
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker Banner: Real-time News Alert */}
        <div className="py-2.5 px-4 bg-[#f7f7f7] border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-franklin mb-10">
          <div className="flex items-center gap-3">
            <span className="uppercase text-[11px] font-extrabold text-[#b32727] flex items-center gap-1.5 shrink-0">
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              News Alert
            </span>
            <span className="text-neutral-900 font-medium">
              {pumpkinAlert.summary}
            </span>
          </div>
          <button
            onClick={() => handleSelectArticle(pumpkinAlert)}
            className="text-[#3d627b] font-bold hover:underline flex items-center gap-1 uppercase text-[10px] shrink-0"
          >
            Read the dispatch
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="w-full bg-white mt-10 border-t-2 border-neutral-900 font-franklin">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Masthead in footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
            <button
              onClick={handleBackToFrontpage}
              className="hover:opacity-90 transition-opacity"
            >
              <NytMastheadText size="sm" />
            </button>
            <div className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider text-neutral-600 flex-wrap">
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="text-neutral-950 hover:underline"
              >
                Subscribe
              </button>
              <button
                onClick={() => setIsTodayPaperModalOpen(true)}
                className="hover:text-black"
              >
                Home Delivery
              </button>
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="hover:text-black"
              >
                Digital Subscriptions
              </button>
              <button onClick={() => openGame('wordle')} className="hover:text-black">
                Crosswords & Games
              </button>
            </div>
          </div>

          {/* 6 Category Columns */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 py-8 border-b border-neutral-200 text-xs">
            {/* News */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase font-bold text-neutral-950 mb-1">News</span>
              <button onClick={handleBackToFrontpage} className="text-left text-neutral-600 hover:text-black">Home Page</button>
              <button onClick={() => handleSelectSection('World')} className="text-left text-neutral-600 hover:text-black">World</button>
              <button onClick={() => handleSelectSection('U.S.')} className="text-left text-neutral-600 hover:text-black">U.S. Politics</button>
              <button onClick={() => handleSelectSection('Business')} className="text-left text-neutral-600 hover:text-black">Business</button>
              <button onClick={() => handleSelectSection('Tech')} className="text-left text-neutral-600 hover:text-black">Tech</button>
              <button onClick={() => handleSelectSection('Science')} className="text-left text-neutral-600 hover:text-black">Science</button>
            </div>

            {/* Opinion */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase font-bold text-neutral-950 mb-1">Opinion</span>
              <button onClick={() => handleSelectSection('Opinion')} className="text-left text-neutral-600 hover:text-black">Today's Opinion</button>
              <button onClick={() => handleSelectSection('Opinion')} className="text-left text-neutral-600 hover:text-black">Columnists</button>
              <button onClick={() => handleSelectSection('Opinion')} className="text-left text-neutral-600 hover:text-black">Editorials</button>
              <button onClick={() => handleSelectSection('Opinion')} className="text-left text-neutral-600 hover:text-black">Guest Essays</button>
              <button onClick={() => handleSelectSection('Opinion')} className="text-left text-neutral-600 hover:text-black">Letters</button>
            </div>

            {/* Arts */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase font-bold text-neutral-950 mb-1">Arts</span>
              <button onClick={() => handleSelectSection('Arts')} className="text-left text-neutral-600 hover:text-black">Today's Arts</button>
              <button onClick={() => handleSelectSection('Arts')} className="text-left text-neutral-600 hover:text-black">Books</button>
              <button onClick={() => handleSelectSection('Arts')} className="text-left text-neutral-600 hover:text-black">Movies</button>
              <button onClick={() => handleSelectSection('Arts')} className="text-left text-neutral-600 hover:text-black">Theater</button>
              <button onClick={() => handleSelectSection('Arts')} className="text-left text-neutral-600 hover:text-black">Music</button>
            </div>

            {/* Living */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase font-bold text-neutral-950 mb-1">Living</span>
              <button onClick={() => handleSelectSection('Lifestyle')} className="text-left text-neutral-600 hover:text-black">Style</button>
              <button onClick={() => handleSelectSection('Cooking')} className="text-left text-neutral-600 hover:text-black">Food</button>
              <button onClick={() => handleSelectSection('Lifestyle')} className="text-left text-neutral-600 hover:text-black">Travel</button>
              <button onClick={() => handleSelectSection('Health')} className="text-left text-neutral-600 hover:text-black">Health</button>
              <button onClick={() => handleSelectSection('Lifestyle')} className="text-left text-neutral-600 hover:text-black">Real Estate</button>
            </div>

            {/* More */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase font-bold text-neutral-950 mb-1">More</span>
              <button onClick={() => handleSelectSection('Audio')} className="text-left text-neutral-600 hover:text-black">Audio & Podcasts</button>
              <button onClick={() => openGame('wordle')} className="text-left text-neutral-600 hover:text-black">Spelling Bee & Wordle</button>
              <button onClick={() => handleSelectSection('Cooking')} className="text-left text-neutral-600 hover:text-black">NYT Cooking</button>
              <button onClick={() => handleSelectSection('Wirecutter')} className="text-left text-neutral-600 hover:text-black">Wirecutter Reviews</button>
              <button onClick={() => handleSelectSection('The Athletic')} className="text-left text-neutral-600 hover:text-black">The Athletic</button>
            </div>

            {/* Account */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase font-bold text-neutral-950 mb-1">Account</span>
              <button onClick={() => setIsSubscriptionModalOpen(true)} className="text-left text-neutral-950 font-bold hover:underline">
                Manage Subscription
              </button>
              <button onClick={() => setIsAuthModalOpen(true)} className="text-left text-neutral-600 hover:text-black">
                My Account
              </button>
              <button onClick={() => setIsAuthModalOpen(true)} className="text-left text-neutral-600 hover:text-black">
                Saved Articles ({bookmarkedIds.length})
              </button>
              <button onClick={() => setIsSubscriptionModalOpen(true)} className="text-left text-neutral-600 hover:text-black">
                Email Newsletters
              </button>
            </div>
          </div>

          {/* Copyright & Legal links */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              <button className="hover:text-black">Privacy Policy</button>
              <button className="hover:text-black">Terms of Service</button>
              <button className="hover:text-black">Terms of Sale</button>
              <button className="hover:text-black">Site Map</button>
              <button className="hover:text-black">Help</button>
              <button onClick={() => setIsSubscriptionModalOpen(true)} className="hover:text-black">Subscriptions</button>
            </div>
            <div>
              <span>© 2026 The New York Times Company. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM MOBILE QUICK DOCK */}
      <div className="sm:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-xs border-t border-neutral-300 px-4 py-2 flex items-center justify-between text-xs text-neutral-700 shadow-lg">
        <button
          onClick={handleBackToFrontpage}
          className="flex flex-col items-center gap-0.5 text-neutral-900 font-bold"
        >
          <Newspaper className="w-4 h-4" />
          <span className="text-[10px]">Front Page</span>
        </button>
        <button
          onClick={() => openGame('wordle')}
          className="flex flex-col items-center gap-0.5 hover:text-black"
        >
          <span className="w-4 h-4 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-[9px]">
            W
          </span>
          <span className="text-[10px]">Games</span>
        </button>
        <button
          onClick={() => setIsPollingModalOpen(true)}
          className="flex flex-col items-center gap-0.5 hover:text-black"
        >
          <TrendingUp className="w-4 h-4 text-[#3d627b]" />
          <span className="text-[10px]">Polling</span>
        </button>
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex flex-col items-center gap-0.5 hover:text-black"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px]">Search</span>
        </button>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center gap-0.5 hover:text-black"
        >
          <Bookmark className="w-4 h-4" />
          <span className="text-[10px]">Saved</span>
        </button>
      </div>

      {/* ALL MODALS */}
      {isGamesModalOpen && (
        <NytGamesModal
          initialGame={initialGameTab}
          onClose={() => setIsGamesModalOpen(false)}
        />
      )}

      {isPollingModalOpen && (
        <PollingTrackerModal onClose={() => setIsPollingModalOpen(false)} />
      )}

      {isWeatherModalOpen && (
        <WeatherModal onClose={() => setIsWeatherModalOpen(false)} />
      )}

      {isMarketsModalOpen && (
        <MarketsModal onClose={() => setIsMarketsModalOpen(false)} />
      )}

      {isTodayPaperModalOpen && (
        <TodayPaperModal
          onClose={() => setIsTodayPaperModalOpen(false)}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          onClose={() => setIsSubscriptionModalOpen(false)}
          onSubscribed={() => {
            setCurrentUser({ email: 'subscriber@nytimes.com', name: 'Times Reader' });
            setIsSubscriptionModalOpen(false);
          }}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={currentUser}
          onLogin={(user) => {
            setCurrentUser(user);
            try {
              localStorage.setItem('nyt_user', JSON.stringify(user));
            } catch (e) {}
            setIsAuthModalOpen(false);
          }}
          onLogout={() => {
            setCurrentUser(null);
            try {
              localStorage.removeItem('nyt_user');
            } catch (e) {}
          }}
          savedArticles={bookmarkedArticles}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
          onSelectArticle={handleSelectArticle}
        />
      )}
    </div>
  );
}
