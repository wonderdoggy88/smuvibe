import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MessageSquare,
  Printer,
  Type,
  ThumbsUp,
  Sparkles,
  Check,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  RotateCcw
} from 'lucide-react';
import { Article, ArticleComment, INITIAL_COMMENTS, ARTICLES } from '../data/newsData';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [textSize, setTextSize] = useState<'standard' | 'large' | 'xlarge'>('standard');
  const [paperTheme, setPaperTheme] = useState<'white' | 'sepia' | 'dark'>('white');
  const [isSerif, setIsSerif] = useState(true);

  // Audio Speech Synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentTab, setCommentTab] = useState<'all' | 'picks'>('picks');
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speech when unmounting or switching articles
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. By ${article.author}. ${article.paragraphs.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = audioSpeed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setAudioSpeed(speed);
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.paragraphs.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = speed;
      utterance.onend = () => setIsPlayingAudio(false);
      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Comments state
  const [comments, setComments] = useState<ArticleComment[]>(() => {
    return (
      INITIAL_COMMENTS[article.id] || [
        {
          id: 'def1',
          author: 'Eleanor Vance',
          location: 'New York, NY',
          timestamp: '2 hours ago',
          content:
            'An incisive and thorough dispatch. The political and social implications outlined here will resonate far beyond Washington over the coming months.',
          upvotes: 48,
          isTimesPick: true,
        },
        {
          id: 'def2',
          author: 'David R. Miller',
          location: 'San Francisco, CA',
          timestamp: '1 hour ago',
          content:
            'The depth of sourcing here is exactly why independent investigative journalism remains indispensable in a polarized media ecosystem.',
          upvotes: 24,
        },
      ]
    );
  });

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentLocation, setNewCommentLocation] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ArticleComment = {
      id: `usr-${Date.now()}`,
      author: newCommentName.trim() || 'Reader in New York',
      location: newCommentLocation.trim() || 'United States',
      timestamp: 'Just now',
      content: newCommentText.trim(),
      upvotes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const handleUpvote = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
  };

  const textSizeClass =
    textSize === 'large'
      ? 'text-lg leading-[1.85]'
      : textSize === 'xlarge'
      ? 'text-xl leading-[1.9]'
      : 'text-base leading-[1.75]';

  const themeStyles = {
    white: 'bg-white text-[#1b1c1c]',
    sepia: 'bg-[#f8f5ee] text-[#2c2621]',
    dark: 'bg-[#181818] text-[#e0deda]',
  };

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeStyles[paperTheme]}`}>
      {/* Sticky Top Reading Bar */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-800 px-4 py-2 flex items-center justify-between max-w-7xl mx-auto nyt-no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Front Page</span>
        </button>

        <div className="font-masthead text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 hidden sm:block">
          The New York Times
        </div>

        <div className="flex items-center gap-2">
          {/* Paper theme selector */}
          <div className="hidden md:flex items-center border border-neutral-300 dark:border-neutral-700 text-xs">
            <button
              onClick={() => setPaperTheme('white')}
              className={`p-1.5 ${paperTheme === 'white' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}
              title="White paper"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPaperTheme('sepia')}
              className={`p-1.5 ${paperTheme === 'sepia' ? 'bg-[#78350f] text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}
              title="Warm newsprint sepia"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPaperTheme('dark')}
              className={`p-1.5 ${paperTheme === 'dark' ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}
              title="Night reading"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Serif vs Sans Toggle */}
          <button
            onClick={() => setIsSerif(!isSerif)}
            className="hidden sm:inline-flex px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100"
            title="Toggle Serif / Sans font"
          >
            {isSerif ? 'Serif' : 'Sans'}
          </button>

          {/* Text Size Control */}
          <div className="flex items-center border border-neutral-300 dark:border-neutral-700 text-xs">
            <button
              onClick={() => setTextSize('standard')}
              className={`px-2 py-1 font-semibold ${
                textSize === 'standard' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 dark:text-neutral-300'
              }`}
              title="Standard text"
            >
              A
            </button>
            <button
              onClick={() => setTextSize('large')}
              className={`px-2 py-1 text-sm font-semibold ${
                textSize === 'large' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 dark:text-neutral-300'
              }`}
              title="Larger text"
            >
              A+
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(article)}
            className={`p-1.5 border border-neutral-300 dark:border-neutral-700 transition-colors ${
              isBookmarked ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300'
            }`}
            title={isBookmarked ? 'Saved to reading list' : 'Save article'}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="p-1.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300 transition-colors hidden sm:block"
            title="Print this broadsheet article"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300 transition-colors relative"
            title="Share article"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-neutral-900 text-white text-[10px] py-1 px-2 font-bold whitespace-nowrap shadow-md">
                Link copied
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Section kicker */}
        <div className="mb-2">
          <span className="font-bold text-xs uppercase tracking-widest text-[#3d627b]">
            {article.kicker || article.section}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.12] mb-4 tracking-tight">
          {article.title}
        </h1>

        {/* Deck / Summary */}
        <p className="font-headline text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-snug mb-6 font-normal">
          {article.deck || article.summary}
        </p>

        {/* Byline and metadata */}
        <div className="border-t border-b border-neutral-200 dark:border-neutral-800 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-400">
          <div>
            <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
              {article.author}
            </div>
            {article.authorRole && (
              <div className="text-neutral-500 text-[11px]">{article.authorRole}</div>
            )}
          </div>
          <div className="flex items-center gap-3 text-neutral-500">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <a href="#comments" className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{comments.length} Comments</span>
            </a>
          </div>
        </div>

        {/* Audio Player Bar (Real Speech Synthesis) */}
        <div className="bg-[#f7f7f7] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 nyt-no-print">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={toggleAudio}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                isPlayingAudio
                  ? 'bg-[#b32727] text-white animate-pulse'
                  : 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90'
              }`}
              aria-label={isPlayingAudio ? 'Pause narration' : 'Listen to article'}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#3d627b]" />
                {isPlayingAudio ? 'Now Reading Aloud' : 'Listen to this story'}
              </div>
              <div className="text-[11px] text-neutral-500">
                {isPlayingAudio ? 'Active Speech Audio' : `Narrated by The Times Audio (${article.audioDuration || '5:10'})`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-neutral-500">Speed:</span>
            {[1, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                onClick={() => handleSpeedChange(spd)}
                className={`px-2 py-0.5 text-[11px] font-bold border ${
                  audioSpeed === spd
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-300'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Feature Image */}
        {article.imageUrl && (
          <figure className="mb-8">
            <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            {(article.imageCaption || article.imageCredit) && (
              <figcaption className="text-xs text-neutral-500 mt-2 flex justify-between items-start gap-4 font-franklin">
                <span>{article.imageCaption || article.summary}</span>
                {article.imageCredit && (
                  <span className="shrink-0 text-neutral-400 text-[11px] italic">
                    {article.imageCredit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Key Takeaways Box if available */}
        {article.keyFacts && article.keyFacts.length > 0 && (
          <div className="bg-[#f7f7f7] dark:bg-neutral-800 border-y-2 border-neutral-900 dark:border-neutral-200 p-5 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3d627b] block mb-2">
              Key Reporting Points
            </span>
            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
              {article.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-900 dark:text-neutral-100 font-bold mt-0.5">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div
          className={`space-y-6 ${isSerif ? 'font-headline' : 'font-franklin'} ${textSizeClass}`}
        >
          {article.paragraphs.map((paragraph, index) => {
            const isFirst = index === 0;

            return (
              <React.Fragment key={index}>
                <p className={isFirst ? 'nyt-drop-cap' : ''}>{paragraph}</p>

                {/* Pull Quote after paragraph 2 */}
                {index === 1 && article.pullQuote && (
                  <blockquote className="my-8 py-6 border-y border-neutral-300 dark:border-neutral-700 text-center px-4">
                    <p className="font-headline italic text-xl sm:text-2xl leading-snug">
                      {article.pullQuote}
                    </p>
                  </blockquote>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Byline Tag & Corrections policy */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 space-y-2 font-franklin">
          <p>
            Reporting was contributed by the Washington, New York, and International bureaus of The New York Times.
          </p>
          <p>
            A version of this article appears in print on Oct. 14, 2026, Section A, Page 1 of the National edition with the headline: “{article.title}”.
          </p>
        </div>

        {/* Related Articles / Next Stories */}
        <div className="mt-12 pt-8 border-t-2 border-neutral-900 dark:border-neutral-200 nyt-no-print">
          <div className="text-xs uppercase font-bold tracking-widest text-[#3d627b] mb-4">
            More From Today's Broadsheet
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                    {rel.section}
                  </span>
                  <h4 className="font-headline font-semibold text-base leading-snug group-hover:text-[#3d627b] transition-colors mb-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="text-[11px] text-neutral-400">
                  {rel.author} • {rel.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Comments Section */}
        <section id="comments" className="mt-12 pt-8 border-t-2 border-neutral-900 dark:border-neutral-200 nyt-no-print">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-masthead text-2xl font-bold">
                Comments ({comments.length})
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Moderated according to The Times community publishing guidelines.
              </p>
            </div>
            <div className="flex border border-neutral-300 dark:border-neutral-700 text-xs">
              <button
                onClick={() => setCommentTab('picks')}
                className={`px-3 py-1.5 font-bold uppercase tracking-wider ${
                  commentTab === 'picks'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                NYT Picks
              </button>
              <button
                onClick={() => setCommentTab('all')}
                className={`px-3 py-1.5 font-bold uppercase tracking-wider ${
                  commentTab === 'all'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                All Comments
              </button>
            </div>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="bg-[#f7f7f7] dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-4 mb-8 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
              Share your perspective
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="City, State"
                value={newCommentLocation}
                onChange={(e) => setNewCommentLocation(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-hidden"
              />
            </div>
            <textarea
              rows={3}
              required
              placeholder="What do you think of this reporting? What questions remain?"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-hidden font-franklin"
            />
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-neutral-500">
                Civil, constructive discourse encouraged.
              </span>
              <button
                type="submit"
                className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Submit Comment
              </button>
            </div>
            {commentSubmitted && (
              <div className="p-2 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1.5 border border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                <span>Thank you. Your comment has been published to the thread.</span>
              </div>
            )}
          </form>

          {/* Comments List */}
          <div className="space-y-4 divide-y divide-neutral-200 dark:divide-neutral-800">
            {comments
              .filter((c) => (commentTab === 'picks' ? c.isTimesPick || comments.length <= 2 : true))
              .map((c) => (
                <div key={c.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                        {c.author}
                      </span>
                      <span className="text-neutral-400 text-xs">•</span>
                      <span className="text-xs text-neutral-500">{c.location}</span>
                    </div>
                    {c.isTimesPick && (
                      <span className="bg-[#3d627b] text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5">
                        Times Pick
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-franklin mb-2">
                    {c.content}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-500">
                    <span>{c.timestamp}</span>
                    <button
                      onClick={() => handleUpvote(c.id)}
                      className="flex items-center gap-1 hover:text-black dark:hover:text-white font-semibold transition-colors"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{c.upvotes} Recommend</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </article>
    </div>
  );
};
