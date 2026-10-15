import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Check, Sparkles, Trophy, HelpCircle } from 'lucide-react';

interface NytGamesModalProps {
  initialGame?: 'wordle' | 'connections' | 'spelling-bee' | 'mini';
  onClose: () => void;
}

export const NytGamesModal: React.FC<NytGamesModalProps> = ({ initialGame = 'wordle', onClose }) => {
  const [activeTab, setActiveTab] = useState<'wordle' | 'mini' | 'connections' | 'spelling-bee'>(initialGame);

  // WORDLE STATE
  const WORD_OF_THE_DAY = 'TIMES';
  const [guesses, setGuesses] = useState<string[]>(['']);
  const [wordleStatus, setWordleStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [shake, setShake] = useState(false);

  // MINI CROSSWORD STATE (5x5 grid)
  // Grid layout (5x5):
  // P A P E R
  // R O U N D
  // E L I T E
  // S A L E S
  // S C E N E
  const MINI_SOLUTION = [
    ['P', 'A', 'P', 'E', 'R'],
    ['R', 'O', 'U', 'N', 'D'],
    ['E', 'L', 'I', 'T', 'E'],
    ['S', 'A', 'L', 'E', 'S'],
    ['S', 'C', 'E', 'N', 'E'],
  ];
  const [miniGrid, setMiniGrid] = useState<string[][]>(() =>
    Array(5).fill('').map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [miniDirection, setMiniDirection] = useState<'across' | 'down'>('across');
  const [miniWon, setMiniWon] = useState(false);
  const [miniTimer, setMiniTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!miniWon) setMiniTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [miniWon]);

  // Handle Wordle key press
  const handleWordleKey = (key: string) => {
    if (wordleStatus !== 'playing') return;
    const currentGuess = guesses[guesses.length - 1];

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }
      if (currentGuess === WORD_OF_THE_DAY) {
        setWordleStatus('won');
      } else if (guesses.length >= 6) {
        setWordleStatus('lost');
      } else {
        setGuesses([...guesses, '']);
      }
    } else if (key === 'BACKSPACE' || key === 'DEL') {
      if (currentGuess.length > 0) {
        const next = [...guesses];
        next[next.length - 1] = currentGuess.slice(0, -1);
        setGuesses(next);
      }
    } else if (/^[A-Z]$/.test(key.toUpperCase()) && currentGuess.length < 5) {
      const next = [...guesses];
      next[next.length - 1] = currentGuess + key.toUpperCase();
      setGuesses(next);
    }
  };

  // Keyboard listener for Wordle and Mini
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === 'wordle') {
        if (e.key === 'Enter') handleWordleKey('ENTER');
        else if (e.key === 'Backspace') handleWordleKey('BACKSPACE');
        else if (/^[a-zA-Z]$/.test(e.key)) handleWordleKey(e.key.toUpperCase());
      } else if (activeTab === 'mini') {
        if (/^[a-zA-Z]$/.test(e.key)) {
          const char = e.key.toUpperCase();
          const next = miniGrid.map((row) => [...row]);
          next[selectedCell.r][selectedCell.c] = char;
          setMiniGrid(next);

          // Check win
          let allCorrect = true;
          for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
              if (next[r][c] !== MINI_SOLUTION[r][c]) allCorrect = false;
            }
          }
          if (allCorrect) setMiniWon(true);

          // Advance cursor
          if (miniDirection === 'across' && selectedCell.c < 4) {
            setSelectedCell({ r: selectedCell.r, c: selectedCell.c + 1 });
          } else if (miniDirection === 'down' && selectedCell.r < 4) {
            setSelectedCell({ r: selectedCell.r + 1, c: selectedCell.c });
          }
        } else if (e.key === 'Backspace') {
          const next = miniGrid.map((row) => [...row]);
          next[selectedCell.r][selectedCell.c] = '';
          setMiniGrid(next);
          if (miniDirection === 'across' && selectedCell.c > 0) {
            setSelectedCell({ r: selectedCell.r, c: selectedCell.c - 1 });
          } else if (miniDirection === 'down' && selectedCell.r > 0) {
            setSelectedCell({ r: selectedCell.r - 1, c: selectedCell.c });
          }
        } else if (e.key === 'ArrowRight') {
          setSelectedCell((prev) => ({ ...prev, c: Math.min(4, prev.c + 1) }));
        } else if (e.key === 'ArrowLeft') {
          setSelectedCell((prev) => ({ ...prev, c: Math.max(0, prev.c - 1) }));
        } else if (e.key === 'ArrowDown') {
          setSelectedCell((prev) => ({ ...prev, r: Math.min(4, prev.r + 1) }));
        } else if (e.key === 'ArrowUp') {
          setSelectedCell((prev) => ({ ...prev, r: Math.max(0, prev.r - 1) }));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, guesses, wordleStatus, miniGrid, selectedCell, miniDirection]);

  // Wordle cell coloring
  const getCellColor = (guess: string, char: string, index: number, isSubmitted: boolean) => {
    if (!isSubmitted) return 'border-neutral-300 bg-white text-black';
    if (WORD_OF_THE_DAY[index] === char) return 'bg-[#6aaa64] text-white border-[#6aaa64] font-bold';
    if (WORD_OF_THE_DAY.includes(char)) return 'bg-[#c9b458] text-white border-[#c9b458] font-bold';
    return 'bg-[#787c7e] text-white border-[#787c7e] font-bold';
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 px-5 py-3 bg-[#f7f7f7]">
          <div className="flex items-center gap-3">
            <span className="font-masthead text-2xl font-bold tracking-tight text-neutral-900">
              The New York Times
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-l border-neutral-300 pl-3">
              Games Broadsheet
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 transition-colors text-neutral-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Navigation Tabs */}
        <div className="flex border-b border-neutral-300 bg-white px-5 pt-2">
          <button
            onClick={() => setActiveTab('wordle')}
            className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'wordle'
                ? 'border-[#6aaa64] text-[#6aaa64]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 bg-[#6aaa64] text-white flex items-center justify-center text-[10px] font-bold">W</span>
            Wordle
          </button>
          <button
            onClick={() => setActiveTab('mini')}
            className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'mini'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">M</span>
            The Mini
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'connections'
                ? 'border-[#bda4eb] text-[#7a48d8]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 bg-[#bda4eb] text-white flex items-center justify-center text-[10px] font-bold">C</span>
            Connections
          </button>
        </div>

        {/* Game Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          {activeTab === 'wordle' && (
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="text-center mb-4">
                <h3 className="font-masthead text-xl font-bold">Wordle #1,214</h3>
                <p className="text-xs text-neutral-500">Get 6 chances to guess a 5-letter word.</p>
              </div>

              {/* Grid 6x5 */}
              <div className={`grid grid-rows-6 gap-1.5 mb-6 ${shake ? 'animate-bounce' : ''}`}>
                {Array.from({ length: 6 }).map((_, rowIdx) => {
                  const guess = guesses[rowIdx] || '';
                  const isSubmitted = rowIdx < guesses.length - 1 || wordleStatus !== 'playing';

                  return (
                    <div key={rowIdx} className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 5 }).map((_, colIdx) => {
                        const char = guess[colIdx] || '';
                        const colorClass = getCellColor(guess, char, colIdx, isSubmitted && char !== '');

                        return (
                          <div
                            key={colIdx}
                            className={`w-11 h-11 border-2 flex items-center justify-center text-xl font-bold uppercase select-none transition-all ${colorClass}`}
                          >
                            {char}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Status Message */}
              {wordleStatus === 'won' && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 text-center w-full">
                  <p className="font-bold flex items-center justify-center gap-1.5">
                    <Trophy className="w-4 h-4 text-emerald-600" /> Splendid! You solved it!
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">The word was {WORD_OF_THE_DAY}.</p>
                </div>
              )}
              {wordleStatus === 'lost' && (
                <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-900 text-center w-full">
                  <p className="font-bold">Next time!</p>
                  <p className="text-xs text-red-700 mt-1">The word was {WORD_OF_THE_DAY}.</p>
                </div>
              )}

              {/* Virtual Keyboard */}
              <div className="w-full space-y-1.5 select-none">
                {keyboardRows.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1">
                    {row.map((k) => (
                      <button
                        key={k}
                        onClick={() => handleWordleKey(k)}
                        className={`h-11 px-2.5 rounded-none font-bold text-xs uppercase bg-[#d3d6da] hover:bg-[#bbb] active:scale-95 transition-colors ${
                          k.length > 1 ? 'px-3 text-[10px]' : 'min-w-[32px]'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 w-full flex justify-between items-center text-xs text-neutral-500">
                <button
                  onClick={() => {
                    setGuesses(['']);
                    setWordleStatus('playing');
                  }}
                  className="flex items-center gap-1 hover:text-black font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Board
                </button>
                <span>Editorial Puzzles Department</span>
              </div>
            </div>
          )}

          {activeTab === 'mini' && (
            <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
              {/* Left: 5x5 Crossword Grid */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3 text-xs font-bold uppercase tracking-wider text-neutral-600">
                  <span>The Mini Crossword</span>
                  <span className="font-mono text-neutral-900">
                    {Math.floor(miniTimer / 60)}:{String(miniTimer % 60).padStart(2, '0')}
                  </span>
                </div>

                <div className="grid grid-cols-5 border-2 border-neutral-900 select-none bg-neutral-900 gap-[1px]">
                  {miniGrid.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isSelected = selectedCell.r === rIdx && selectedCell.c === cIdx;
                      const isInActiveClue =
                        miniDirection === 'across'
                          ? selectedCell.r === rIdx
                          : selectedCell.c === cIdx;

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => {
                            if (isSelected) {
                              setMiniDirection((prev) => (prev === 'across' ? 'down' : 'across'));
                            } else {
                              setSelectedCell({ r: rIdx, c: cIdx });
                            }
                          }}
                          className={`w-12 h-12 flex flex-col items-center justify-center relative cursor-pointer font-bold text-xl transition-colors ${
                            isSelected
                              ? 'bg-[#ffda00] text-black'
                              : isInActiveClue
                              ? 'bg-[#a7d8ff] text-black'
                              : 'bg-white text-black hover:bg-neutral-100'
                          }`}
                        >
                          {/* Cell number */}
                          {(rIdx === 0 && cIdx === 0 && <span className="absolute top-0.5 left-0.5 text-[9px] font-normal leading-none text-neutral-500">1</span>) ||
                            (rIdx === 0 && cIdx === 1 && <span className="absolute top-0.5 left-0.5 text-[9px] font-normal leading-none text-neutral-500">2</span>) ||
                            (rIdx === 0 && cIdx === 2 && <span className="absolute top-0.5 left-0.5 text-[9px] font-normal leading-none text-neutral-500">3</span>) ||
                            (rIdx === 1 && cIdx === 0 && <span className="absolute top-0.5 left-0.5 text-[9px] font-normal leading-none text-neutral-500">4</span>) ||
                            (rIdx === 2 && cIdx === 0 && <span className="absolute top-0.5 left-0.5 text-[9px] font-normal leading-none text-neutral-500">5</span>)}
                          <span>{cell}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {miniWon && (
                  <div className="mt-4 p-3 bg-emerald-100 border border-emerald-400 text-emerald-900 text-center w-full">
                    <p className="font-bold flex items-center justify-center gap-1">
                      <Sparkles className="w-4 h-4 text-emerald-600" /> Congratulations!
                    </p>
                    <p className="text-xs">
                      You solved the Mini in {Math.floor(miniTimer / 60)}m {miniTimer % 60}s.
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setMiniGrid(Array(5).fill('').map(() => Array(5).fill('')));
                      setMiniWon(false);
                      setMiniTimer(0);
                    }}
                    className="px-3 py-1 border border-neutral-400 text-xs font-semibold hover:bg-neutral-100"
                  >
                    Clear Grid
                  </button>
                  <button
                    onClick={() => {
                      setMiniGrid(MINI_SOLUTION);
                      setMiniWon(true);
                    }}
                    className="px-3 py-1 bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                  >
                    Reveal Solution
                  </button>
                </div>
              </div>

              {/* Right: Clues */}
              <div className="flex-1 space-y-4 text-xs">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
                    Across
                  </h4>
                  <ul className="space-y-1.5 text-neutral-700">
                    <li className={selectedCell.r === 0 && miniDirection === 'across' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">1</span> Daily broadsheet material (5)
                    </li>
                    <li className={selectedCell.r === 1 && miniDirection === 'across' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">4</span> Like a clock face or a golf stage (5)
                    </li>
                    <li className={selectedCell.r === 2 && miniDirection === 'across' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">5</span> Best of the best (5)
                    </li>
                    <li className={selectedCell.r === 3 && miniDirection === 'across' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">6</span> Store clearance transactions (5)
                    </li>
                    <li className={selectedCell.r === 4 && miniDirection === 'across' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">7</span> Setting of an act in a play (5)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
                    Down
                  </h4>
                  <ul className="space-y-1.5 text-neutral-700">
                    <li className={selectedCell.c === 0 && miniDirection === 'down' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">1</span> Journalistic journalism room (5)
                    </li>
                    <li className={selectedCell.c === 1 && miniDirection === 'down' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">2</span> Botanical flower bulb, or garlic piece (5)
                    </li>
                    <li className={selectedCell.c === 2 && miniDirection === 'down' ? 'font-bold text-neutral-900 bg-amber-50 p-1' : ''}>
                      <span className="font-bold mr-1">3</span> School pupil or student (5)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="max-w-md mx-auto text-center">
              <h3 className="font-masthead text-xl font-bold mb-1">Connections</h3>
              <p className="text-xs text-neutral-500 mb-4">
                Group words that share a common thread.
              </p>

              {/* Sample puzzle grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  'HEADLINE', 'COLUMN', 'BYLINE', 'MASTHEAD',
                  'SPADE', 'CLUB', 'DIAMOND', 'HEART',
                  'EAGLE', 'BIRDIE', 'PAR', 'BOGEY',
                  'NEW YORK', 'CHICAGO', 'BOSTON', 'SEATTLE'
                ].map((word) => (
                  <button
                    key={word}
                    className="p-3 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 font-bold text-xs uppercase tracking-tight active:bg-neutral-900 active:text-white transition-colors"
                  >
                    {word}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-3">
                <button className="px-4 py-2 border border-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-100">
                  Shuffle
                </button>
                <button className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800">
                  Submit (4 Selected)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-neutral-300 px-5 py-3 bg-[#f7f7f7] flex items-center justify-between text-xs text-neutral-600">
          <span>The New York Times Games & Puzzles Syndicate</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 text-white font-bold uppercase text-[11px] tracking-wider hover:bg-neutral-800"
          >
            Return to Front Page
          </button>
        </div>
      </div>
    </div>
  );
};
