import React, { useState } from 'react';
import { X, User, Bookmark, Check, LogOut, Mail } from 'lucide-react';
import { Article } from '../data/newsData';

interface AuthModalProps {
  onClose: () => void;
  currentUser: { email: string; name: string } | null;
  onLogin: (user: { email: string; name: string }) => void;
  onLogout: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  currentUser,
  onLogin,
  onLogout,
  savedArticles,
  onSelectArticle,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'account' | 'saved'>('account');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const name = email.split('@')[0];
    onLogin({
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-6 py-4 bg-[#f7f7f7]">
          <div>
            <span className="font-masthead text-2xl font-bold tracking-tight text-neutral-900">
              The New York Times
            </span>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              {currentUser ? 'Subscriber Account' : 'Log In to The Times'}
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

        {/* Tab switcher if logged in */}
        {currentUser && (
          <div className="flex border-b border-neutral-300 bg-white px-6 pt-2">
            <button
              onClick={() => setTab('account')}
              className={`pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                tab === 'account'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Account Overview
            </button>
            <button
              onClick={() => setTab('saved')}
              className={`flex items-center gap-1.5 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                tab === 'saved'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Articles ({savedArticles.length})
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {currentUser ? (
            tab === 'account' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200">
                  <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base">{currentUser.name}</h4>
                    <p className="text-xs text-neutral-500">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-[#3d627b] text-white px-2 py-0.5">
                      All-Access Subscriber
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-neutral-700">
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Subscription Status</span>
                    <span className="font-bold text-emerald-700">Active (Renews Oct 2027)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Edition Preference</span>
                    <span className="font-bold">U.S. National Broadsheet</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-500">Saved Articles</span>
                    <span className="font-bold">{savedArticles.length} stories</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 px-4 py-2 border border-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-100"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
                  >
                    Continue Reading
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-600">
                  Your Reading List
                </h4>
                {savedArticles.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500 text-xs">
                    <Bookmark className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                    <p>No saved articles yet.</p>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Click the bookmark icon on any article to save it for later.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-200">
                    {savedArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          onSelectArticle(article);
                          onClose();
                        }}
                        className="py-3 cursor-pointer group"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d627b] block">
                          {article.section}
                        </span>
                        <h5 className="font-headline font-semibold text-sm group-hover:text-neutral-600 transition-colors">
                          {article.title}
                        </h5>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          {article.author} • {article.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="font-masthead text-2xl font-bold text-neutral-900">
                  Log in or create an account
                </h3>
                <p className="text-xs text-neutral-600 font-franklin mt-1">
                  Access your subscriber benefits, saved articles, and personalized newsletters.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-neutral-900 text-sm focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold uppercase text-xs tracking-wider transition-colors"
              >
                Continue with Email
              </button>

              <div className="text-center text-[11px] text-neutral-500 pt-2">
                By continuing, you agree to the Terms of Service and Privacy Policy of The New York Times.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
