
import React, { useState, useCallback, useMemo } from 'react';
import { SectionType, QuestionCircle } from './types';
import { PART1_QUESTIONS, PART2_QUESTIONS, PART3_QUESTIONS, PART4_QUESTIONS } from './constants';
import { audioService } from './services/audioService';

// --- 可愛裝飾元件 ---
const DecorativeIcons = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Pizza.webp" className="absolute top-10 left-10 w-24 h-24 animate-bounce" style={{ animationDelay: '0s' }} alt="裝飾" />
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Hamburger.webp" className="absolute top-40 right-10 w-24 h-24 animate-pulse" style={{ animationDelay: '1s' }} alt="裝飾" />
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/French%20Fries.webp" className="absolute bottom-40 left-10 w-24 h-24 animate-bounce" style={{ animationDelay: '0.5s' }} alt="裝飾" />
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Ice%20Cream.webp" className="absolute bottom-10 right-10 w-24 h-24 animate-pulse" style={{ animationDelay: '1.5s' }} alt="裝飾" />
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Doughnut.webp" className="absolute top-1/2 left-5 w-20 h-20 animate-bounce" style={{ animationDelay: '2s' }} alt="裝飾" />
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Sushi.webp" className="absolute top-1/4 right-5 w-20 h-20 animate-pulse" style={{ animationDelay: '0.2s' }} alt="裝飾" />
  </div>
);

// --- Sub-components ---

const CoverPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-[85vh] text-center p-6 space-y-10 animate-fade-in relative z-10">
    <div className="relative group">
      <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400 via-orange-300 to-pink-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <img 
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Shortcake.webp" 
        alt="蛋糕" 
        className="w-64 h-64 relative transform hover:scale-110 transition-transform cursor-pointer" 
      />
      <div className="absolute -top-6 -right-6 bg-red-500 text-white w-24 h-24 flex items-center justify-center rounded-full shadow-2xl transform rotate-12 font-black text-3xl border-4 border-white ring-4 ring-red-100">
        四下
      </div>
    </div>
    
    <div className="space-y-6 w-full max-w-5xl">
      <div className="inline-block w-full px-12 py-10 bg-white rounded-[60px] shadow-2xl border-8 border-orange-100 relative">
        <div className="absolute -top-4 -left-4 text-4xl">🥟</div>
        <div className="absolute -bottom-4 -right-4 text-4xl">🍜</div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-orange-900 font-zcool tracking-wider leading-tight">
            第一課 上茶樓（兒化音）
          </h1>
          <h1 className="text-3xl md:text-5xl font-black text-orange-900 font-zcool tracking-wider leading-tight">
            第二課 逛商場（輕聲）
          </h1>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-1.5 flex-1 bg-pink-100 rounded-full"></div>
          <p className="text-2xl md:text-4xl text-pink-500 font-black drop-shadow-sm px-4">互動練習小任務</p>
          <div className="h-1.5 flex-1 bg-pink-100 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <p className="text-xl md:text-2xl text-orange-700 font-bold bg-white/75 px-12 py-4 rounded-full inline-block backdrop-blur-sm border-2 border-orange-200 shadow-sm">
          🍱 歡迎來到普通話快樂餐廳！ 🍱
        </p>
      </div>
    </div>

    <button 
      onClick={onStart}
      className="group relative bg-orange-500 hover:bg-orange-600 text-white text-4xl font-black py-8 px-28 rounded-full shadow-[0_15px_0_rgb(194,65,12)] transform transition hover:-translate-y-2 active:translate-y-2 active:shadow-none flex items-center gap-6"
    >
      <span>進入餐廳闖關</span>
      <span className="group-hover:translate-x-4 transition-transform text-5xl">🍴</span>
    </button>
  </div>
);

const SectionNav: React.FC<{ current: SectionType, onChange: (s: SectionType) => void }> = ({ current, onChange }) => {
  const items = [
    { type: SectionType.TRANSLATION, label: '粵普點餐', icon: '🍲', color: 'bg-orange-400' },
    { type: SectionType.NEUTRAL_TONE, label: '輕聲判別', icon: '☁️', color: 'bg-blue-400' },
    { type: SectionType.ERHUA, label: '兒化練習', icon: '👶', color: 'bg-pink-400' },
    { type: SectionType.VOWEL_ER, label: 'er 判別', icon: '👂', color: 'bg-green-400' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-[0_-15px_40px_rgba(0,0,0,0.1)] p-4 flex justify-around items-end z-50 rounded-t-[50px] border-t-8 border-orange-50 h-32">
      {items.map((item) => (
        <button
          key={item.type}
          onClick={() => onChange(item.type)}
          className={`flex flex-col items-center gap-1 transition-all px-4 py-3 rounded-3xl ${
            current === item.type 
              ? `${item.color} text-white -translate-y-6 shadow-2xl scale-110 ring-8 ring-white` 
              : 'text-gray-400 hover:text-orange-400 hover:bg-orange-50'
          }`}
        >
          <span className="text-3xl">{item.icon}</span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const QuizPart1: React.FC<{ onScoreUpdate: (isCorrect: boolean) => void }> = ({ onScoreUpdate }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = PART1_QUESTIONS[qIndex];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelected(opt);
    setIsAnswered(true);
    const correct = opt === currentQ.correctAnswer;
    if (correct) {
      audioService.playCorrect();
      onScoreUpdate(true);
    } else {
      audioService.playWrong();
      onScoreUpdate(false);
    }
    
    setTimeout(() => {
      if (qIndex < PART1_QUESTIONS.length - 1) {
        setQIndex(prev => prev + 1);
        setSelected(null);
        setIsAnswered(false);
      }
    }, 1500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 pb-40 relative z-10 animate-fade-in">
      <div className="bg-white p-12 rounded-[60px] shadow-2xl border-8 border-orange-100 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-50 rounded-full opacity-50 blur-xl"></div>
        <div className="flex justify-between items-center mb-8 relative z-10">
          <span className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-black text-sm border-2 border-orange-200">
            點餐任務 {qIndex + 1} / {PART1_QUESTIONS.length}
          </span>
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Food%20and%20Drink/Cookie.webp" className="w-14 h-14" alt="餅乾" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          {/* 左側：廣東話原詞 */}
          <div className="md:w-[40%] flex flex-col items-center justify-center text-center space-y-8">
            <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest">廣東話點餐</h3>
            <div className="w-full text-5xl md:text-7xl font-black text-orange-600 bg-orange-50 py-16 px-6 rounded-[50px] border-4 border-dashed border-orange-200 shadow-inner min-h-[250px] flex items-center justify-center leading-tight">
              {currentQ.cantonese}
            </div>
            <div className="hidden md:flex flex-col items-center animate-bounce">
               <span className="text-orange-300 text-4xl">➡️</span>
               <p className="text-xl font-black text-gray-400 mt-2">對應的是？</p>
            </div>
          </div>

          {/* 右側：選項 */}
          <div className="md:w-[60%] flex flex-col justify-center space-y-6">
            <div className="md:hidden text-center mb-4">
               <p className="text-xl font-black text-gray-500">對應的普通話詞語是？</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentQ.options.map((opt) => {
                let style = "bg-white border-gray-100 text-gray-700 hover:border-orange-400 hover:bg-orange-50 shadow-md";
                if (isAnswered) {
                  if (opt === currentQ.correctAnswer) style = "bg-green-100 border-green-500 text-green-700 ring-8 ring-green-100 scale-105 z-20";
                  else if (opt === selected) style = "bg-red-100 border-red-500 text-red-700 opacity-70";
                  else style = "bg-gray-50 border-gray-100 text-gray-300 opacity-40 grayscale";
                }
                return (
                  <button
                    key={opt}
                    disabled={isAnswered}
                    onClick={() => handleSelect(opt)}
                    className={`py-8 px-8 rounded-[35px] border-b-8 font-black text-2xl md:text-3xl transition-all transform active:scale-95 flex items-center justify-center text-center min-h-[120px] ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizPartCircle: React.FC<{ 
  questions: QuestionCircle[], 
  type: SectionType,
  onScoreUpdate: (isCorrect: boolean) => void 
}> = ({ questions, type, onScoreUpdate }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selectedChars, setSelectedChars] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const currentQ = questions[qIndex];
  
  // Create tokens and handle correctness memoization
  // Fix for line 207: Explicitly type tokens as string[] and provide types for the inner loop to prevent unknown inference.
  const tokens = useMemo<string[]>(() => {
    const pattern = new RegExp(`(${currentQ.targets.join('|')})`, 'g');
    const initialParts = currentQ.sentence.split(pattern).filter(Boolean);
    
    const finalTokens: string[] = [];
    initialParts.forEach((part: string) => {
        if (currentQ.targets.includes(part)) {
            finalTokens.push(part);
        } else {
            // Use split('') to safely convert character string to string array
            finalTokens.push(...part.split(''));
        }
    });
    return finalTokens;
  }, [currentQ.sentence, currentQ.targets]);

  // Fix: Move correctness logic to a memoized variable to resolve type inference errors in JSX
  const isCorrect = useMemo(() => {
    const selectedStrings: string[] = selectedChars
      .map(idx => tokens[idx])
      .filter((token): token is string => typeof token === 'string');
    
    return currentQ.targets.every((t: string) => selectedStrings.includes(t)) 
        && selectedStrings.length === currentQ.targets.length;
  }, [selectedChars, tokens, currentQ.targets]);

  const handleTokenClick = (index: number) => {
    if (revealed) return;
    if (selectedChars.includes(index)) {
        setSelectedChars(selectedChars.filter(i => i !== index));
    } else {
        setSelectedChars([...selectedChars, index]);
    }
  };

  const handleCheck = () => {
    setRevealed(true);
    if (isCorrect) {
      audioService.playCorrect();
      onScoreUpdate(true);
    } else {
      audioService.playWrong();
      onScoreUpdate(false);
    }

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(prev => prev + 1);
        setSelectedChars([]);
        setRevealed(false);
      }
    }, 2500);
  };

  const headerColor = type === SectionType.NEUTRAL_TONE ? 'bg-blue-500' : type === SectionType.ERHUA ? 'bg-pink-500' : 'bg-green-500';

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 pb-40 relative z-10 animate-fade-in">
      <div className="bg-white p-12 rounded-[60px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border-8 border-white relative">
        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 ${headerColor} text-white px-12 py-3 rounded-full font-black shadow-2xl ring-8 ring-white whitespace-nowrap text-2xl`}>
            {type === SectionType.NEUTRAL_TONE ? '☁️ 輕聲字找找看' : type === SectionType.ERHUA ? '👶 兒化練習' : '👂 er 判別'}
        </div>
        
        <div className="flex justify-between items-center mb-10 mt-6 text-gray-400 font-black tracking-widest uppercase px-4">
            <span>第 {qIndex + 1} / {questions.length} 份點心</span>
            <span className="flex items-center gap-2">請圈出答案 <span className="text-orange-400 text-2xl">⭕</span></span>
        </div>

        <div className="bg-gray-50/80 backdrop-blur-sm px-16 py-12 rounded-[50px] border-4 border-dashed border-gray-200 mb-12 relative overflow-hidden w-full">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 rounded-full border-4 border-dashed border-gray-100"></div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-12 justify-center leading-relaxed">
            {tokens.map((token: string, idx: number) => {
              const isTarget = currentQ.targets.includes(token);
              const isSelected = selectedChars.includes(idx);
              
              let style = "border-transparent bg-white/40";
              if (revealed) {
                  if (isTarget) style = "border-green-500 bg-green-100 text-green-700 ring-8 ring-green-100 shadow-lg scale-110 z-10";
                  else if (isSelected && !isTarget) style = "border-red-500 bg-red-100 text-red-700";
              } else {
                  if (isSelected) style = "border-orange-400 bg-orange-100 text-orange-800 scale-125 shadow-2xl z-20";
              }

              return (
                <span
                  key={`${idx}-${token}`}
                  onClick={() => handleTokenClick(idx)}
                  className={`cursor-pointer px-6 py-4 text-5xl font-black rounded-[35px] border-4 transition-all duration-300 ${style} select-none active:scale-75 min-w-[80px] text-center shadow-sm`}
                >
                  {token}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
            <button
                onClick={handleCheck}
                disabled={revealed || selectedChars.length === 0}
                className={`group relative py-6 px-20 rounded-full font-black text-3xl shadow-2xl transition-all ${
                    revealed || selectedChars.length === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                    : `${headerColor} text-white hover:scale-110 active:scale-90 hover:shadow-inner`
                }`}
            >
                {revealed ? '主廚檢查中...' : '我選好了！🍽️'}
            </button>

            {revealed && (
                <div className={`text-3xl font-black animate-bounce px-10 py-5 rounded-3xl shadow-sm ${
                    isCorrect ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                    {isCorrect ? '叮咚！完全正確！✨' : `正確答案是：${currentQ.targets.join('、')}`}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<SectionType>(SectionType.HOME);
  const [scores, setScores] = useState<Record<string, number>>({
    [SectionType.TRANSLATION]: 0,
    [SectionType.NEUTRAL_TONE]: 0,
    [SectionType.ERHUA]: 0,
    [SectionType.VOWEL_ER]: 0,
  });

  const handleScoreUpdate = useCallback((section: SectionType, isCorrect: boolean) => {
    if (isCorrect) {
      setScores(prev => ({ ...prev, [section]: (prev[section] || 0) + 1 }));
    }
  }, []);

  const totalPossible = PART1_QUESTIONS.length + PART2_QUESTIONS.length + PART3_QUESTIONS.length + PART4_QUESTIONS.length;
  const totalCorrect = Object.values(scores).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#FFF9E5] text-gray-800 font-sans relative">
      <DecorativeIcons />
      
      <header className="bg-white/90 backdrop-blur-xl p-6 shadow-2xl flex items-center justify-between sticky top-0 z-40 border-b-8 border-orange-100 rounded-b-[40px] px-10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="font-black text-2xl md:text-3xl text-orange-900 leading-tight">四下 第一～二課</h1>
            <p className="text-lg md:text-xl text-orange-600 font-black">兒化音 & 輕聲</p>
          </div>
        </div>
        
        {gameState !== SectionType.HOME && (
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Total Stars</span>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-orange-600 tabular-nums">{totalCorrect}</span>
                        <span className="text-2xl animate-pulse">⭐</span>
                    </div>
                </div>
                <button 
                  onClick={() => setGameState(SectionType.HOME)}
                  className="bg-gray-100 hover:bg-orange-100 text-gray-400 hover:text-orange-500 transition-all p-4 rounded-[25px] border-b-8 border-gray-200 active:border-b-0 active:translate-y-2 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </button>
            </div>
        )}
      </header>

      <main className="relative z-10 pt-8">
        {gameState === SectionType.HOME && (
          <CoverPage onStart={() => setGameState(SectionType.TRANSLATION)} />
        )}
        {gameState === SectionType.TRANSLATION && (
          <QuizPart1 onScoreUpdate={(correct) => handleScoreUpdate(SectionType.TRANSLATION, correct)} />
        )}
        {gameState === SectionType.NEUTRAL_TONE && (
          <QuizPartCircle questions={PART2_QUESTIONS} type={SectionType.NEUTRAL_TONE} onScoreUpdate={(correct) => handleScoreUpdate(SectionType.NEUTRAL_TONE, correct)} />
        )}
        {gameState === SectionType.ERHUA && (
          <QuizPartCircle questions={PART3_QUESTIONS} type={SectionType.ERHUA} onScoreUpdate={(correct) => handleScoreUpdate(SectionType.ERHUA, correct)} />
        )}
        {gameState === SectionType.VOWEL_ER && (
          <QuizPartCircle questions={PART4_QUESTIONS} type={SectionType.VOWEL_ER} onScoreUpdate={(correct) => handleScoreUpdate(SectionType.VOWEL_ER, correct)} />
        )}
      </main>

      {gameState !== SectionType.HOME && (
        <>
          <SectionNav current={gameState} onChange={setGameState} />
          <div className="fixed bottom-[135px] left-1/2 -translate-x-1/2 w-[85%] max-w-xl h-8 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-2xl z-30 border-4 border-orange-50">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 via-pink-400 to-red-500 rounded-full transition-all duration-1000 relative" 
                style={{ width: `${Math.max(5, (Number(totalCorrect) / Number(totalPossible)) * 100)}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-orange-200">
                    <span className="text-xl animate-bounce">🥟</span>
                </div>
              </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
