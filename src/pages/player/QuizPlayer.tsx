import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';
import { useUserStore } from '../../store/userStore';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { 
  ChevronRight, 
  Trophy, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX,
  Sparkles,
  Activity,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

export const QuizPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quizzes } = useQuizStore();
  const { addAttempt } = useUserStore();
  
  // Ref to track latest score and answers to avoid stale closure issues
  const stateRef = useRef({
    score: 0,
    answers: [] as { questionId: string, isCorrect: boolean, selectedOptionIndex: number }[]
  });

  const quiz = quizzes.find(q => q.id === id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);

  // Sync simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (quiz) {
      setTimeLeft(quiz.questions[currentQuestionIndex].timeLimit ?? 30);
    }
  }, [quiz, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished && !isAnswering && !isSyncing) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished && !isAnswering && !isSyncing) {
      // Auto-submit incorrect on timeout
      handleOptionSelect(-1, true);
    }
  }, [timeLeft, isFinished, isAnswering, isSyncing]);

  const finishQuiz = useCallback(() => {
    if (!quiz || !user) return;
    
    setIsFinished(true);
    const finalScore = stateRef.current.score;
    const finalAnswers = stateRef.current.answers;
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    const xpEarned = Math.floor(percentage * 1.5) + (percentage === 100 ? 50 : 0);
    const attemptId = Math.random().toString(36).substr(2, 9);
    
    // Persist attempt
    addAttempt(user.id, {
      id: attemptId,
      quizId: quiz.id,
      userId: user.id,
      score: finalScore,
      total: quiz.questions.length,
      percentage,
      timeTaken: 0,
      createdAt: Date.now(),
    });

    // Navigate to results with full state
    navigate('/results', { 
      state: { 
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: finalScore, 
        total: quiz.questions.length, 
        percentage,
        xpEarned,
        answers: finalAnswers,
        attemptId
      } 
    });
  }, [quiz, user, addAttempt, navigate]);

  const handleNextQuestion = useCallback(() => {
    if (!quiz) return;
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswering(false);
    } else {
      finishQuiz();
    }
  }, [currentQuestionIndex, quiz, finishQuiz]);

  const handleOptionSelect = (index: number, isTimeout = false) => {
    if (selectedOption !== null || isAnswering || isFinished || !quiz) return;
    
    setSelectedOption(index);
    setIsAnswering(true);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = !isTimeout && index === currentQuestion.correctOptionIndex;
    
    // Update score and answers in ref immediately for finishQuiz to see
    if (isCorrect) {
      stateRef.current.score += 1;
      setScore(s => s + 1);
    }
    
    const newAnswer = {
      questionId: currentQuestion.id,
      isCorrect,
      selectedOptionIndex: index
    };
    
    stateRef.current.answers.push(newAnswer);

    if (isCorrect) {
      toast.success('Protocol Validated', { 
        icon: '✨', 
        className: 'glass border-green-500/50 text-green-400 font-bold text-[10px] uppercase tracking-widest' 
      });
    } else {
      toast.error(isTimeout ? 'Sync Timeout' : 'Data Corruption', { 
        icon: '❌', 
        className: 'glass border-red-500/50 text-red-400 font-bold text-[10px] uppercase tracking-widest' 
      });
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1200);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || isAnswering || isSyncing) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleOptionSelect(parseInt(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, isAnswering, isSyncing, currentQuestionIndex]);

  if (isSyncing) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6">
        <div className="relative">
          <Activity className="h-16 w-16 text-brand-500 animate-pulse" />
          <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full" />
        </div>
        <h2 className="text-xl font-black text-white mt-8 font-heading tracking-widest uppercase">Initializing Sync...</h2>
        <div className="w-48 h-1 bg-white/[0.05] rounded-full mt-4 overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-1/2 h-full bg-brand-500"
          />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6">
        <Terminal className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-black text-white mb-2 font-heading tracking-tight">PROTOCOL_NOT_FOUND</h2>
        <p className="text-brand-800 mb-8 uppercase tracking-widest font-black text-[10px]">The requested node does not exist in the global mesh.</p>
        <Button onClick={() => navigate('/discover')} className="h-14 px-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-brand-400 font-black uppercase tracking-widest text-[10px]">Back to Discover</Button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

  return (
    <div className={cn(
      "min-h-screen bg-dark-950 text-white relative overflow-hidden flex flex-col transition-all duration-700 selection:bg-brand-500/30",
      isFullscreen ? "p-0" : "p-4 md:p-8"
    )}>
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent)] animate-glow" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-600/[0.05] blur-[160px] rounded-full animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-neon-cyan/[0.05] blur-[160px] rounded-full animate-blob animation-delay-4000" />
      </div>

      {/* Interface Header */}
      <header className="relative z-10 flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/discover')}
            className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-brand-700 hover:text-white hover:bg-white/[0.08] transition-all group"
          >
            <ChevronRight className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-brand-800 text-[10px] font-black uppercase tracking-[0.2em]">Deployment Session</span>
              <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
            </div>
            <h1 className="text-sm font-black text-white font-heading tracking-widest uppercase truncate max-w-md">
              {quiz.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-brand-700 hover:text-white transition-all"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button 
            onClick={toggleFullscreen}
            className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-brand-700 hover:text-white transition-all"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Main Focus Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-5xl mx-auto w-full pb-32">
        <div className="w-full space-y-16">
          {/* Question Meta */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="h-1 w-12 bg-white/[0.03] rounded-full" />
              <div className="text-brand-800 font-black text-[10px] uppercase tracking-[0.4em]">Node {currentQuestionIndex + 1} of {quiz.questions.length}</div>
              <div className="h-1 w-12 bg-white/[0.03] rounded-full" />
            </div>
            
            {/* Immersive Timer */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={currentQuestionIndex}
              className={cn(
                "h-24 w-24 rounded-[2rem] border-2 flex items-center justify-center relative transition-all duration-500",
                timeLeft <= 5 ? "border-red-500/30 bg-red-500/5 shadow-[0_0_40px_rgba(239,68,68,0.1)]" : "border-brand-500/20 bg-brand-500/5 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
              )}
            >
              <svg className="absolute inset-0 h-full w-full -rotate-90 scale-[1.1]">
                <circle 
                  cx="44" cy="44" r="40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  className={cn(
                    "transition-all duration-1000",
                    timeLeft <= 5 ? "text-red-500" : "text-brand-500"
                  )}
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * timeLeft) / (currentQuestion.timeLimit ?? 30)}
                />
              </svg>
              <div className="text-center z-10">
                <span className={cn(
                  "text-3xl font-black font-mono tracking-tighter leading-none block",
                  timeLeft <= 5 ? "text-red-400" : "text-white"
                )}>
                  {timeLeft.toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] font-black text-brand-800 uppercase tracking-widest">Sec</span>
              </div>
            </motion.div>
          </div>

          {/* Immersive Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="w-full text-center space-y-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white font-heading tracking-tight leading-[1.05] max-w-4xl mx-auto">
                {currentQuestion.text}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto w-full">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctOptionIndex;
                  const showResult = selectedOption !== null;
                  
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showResult ? { scale: 1.01, y: -2 } : {}}
                      whileTap={!showResult ? { scale: 0.99 } : {}}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={showResult}
                      className={cn(
                        "relative flex items-center gap-6 p-8 rounded-3xl border-2 transition-all duration-300 text-left overflow-hidden group",
                        showResult
                          ? isCorrect
                            ? "bg-green-500/10 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                            : isSelected
                              ? "bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
                              : "bg-white/[0.01] border-white/[0.05] opacity-30"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-brand-500/40 hover:bg-white/[0.04] shadow-xl"
                      )}
                    >
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 font-black text-[10px] border",
                        showResult
                          ? isCorrect
                            ? "bg-green-500 border-green-400 text-white"
                            : isSelected
                              ? "bg-red-500 border-red-400 text-white"
                              : "bg-dark-900 border-white/[0.1] text-brand-900"
                          : "bg-dark-900 border-white/[0.08] text-brand-800 group-hover:border-brand-500 group-hover:text-brand-500"
                      )}>
                        0{idx + 1}
                      </div>
                      <span className="text-lg font-bold tracking-tight text-white/90 flex-1">{option}</span>
                      
                      {showResult && isCorrect && (
                        <Sparkles className="h-5 w-5 text-green-400 animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating System Bar */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-20">
        <div className="bg-dark-900/60 backdrop-blur-3xl p-6 rounded-3xl border border-white/[0.08] flex items-center gap-10 shadow-2xl">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-[9px] font-black text-brand-700 uppercase tracking-[0.3em]">Network Throughput</span>
              </div>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">{Math.round(progress)}% Segmented</span>
            </div>
            <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand-500 rounded-full" 
              />
            </div>
          </div>

          <div className="h-10 w-px bg-white/[0.08]" />

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[8px] font-black text-brand-800 uppercase tracking-widest mb-1">Score Matrix</p>
              <p className="text-2xl font-black text-white font-mono leading-none tracking-tighter">{score.toString().padStart(2, '0')}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
