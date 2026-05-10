import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FadeIn, StaggerContainer, StaggerItem } from '../../animations/wrappers';
import { Target, ArrowRight, Check, X as XIcon, RotateCcw, Eye, Sparkles, TrendingUp, Layers, Zap, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

import { useQuizStore } from '../../store/quizStore';

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getQuizById } = useQuizStore();
  const [showReview, setShowReview] = React.useState(false);

  const { 
    quizId = '',
    quizTitle = 'Analysis Complete',
    score = 0,
    total = 0,
    percentage = 0,
    xpEarned = 0,
    answers = []
  } = location.state || {};

  const quiz = getQuizById(quizId);
  const isVictory = percentage >= 70;

  // Cleanup/Success Animations
  useEffect(() => {
    if (isVictory) {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#6366f1', '#a855f7', '#00f2ff'] };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isVictory]);

  if (!location.state) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-black text-white mb-2 font-heading uppercase tracking-widest">Protocol Out of Sync</h2>
        <p className="text-brand-800 mb-8 uppercase tracking-widest font-black text-[10px]">No session data detected in current buffer.</p>
        <Button onClick={() => navigate('/discover')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-start py-24 px-6 relative overflow-hidden selection:bg-brand-500/30">
      {/* Background Cinematic Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[150px] transition-all duration-1000",
          isVictory ? "bg-brand-500/10" : "bg-red-500/5"
        )} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </div>

      <FadeIn className="w-full max-w-4xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-xl">
            <Zap className="h-4 w-4 text-brand-400" />
            <span className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em]">Deployment Session Finalized</span>
          </div>
          <h1 className={cn(
            "text-6xl md:text-8xl font-black font-heading mb-4 tracking-tighter leading-none uppercase",
            isVictory ? "text-white" : "text-red-500"
          )}>
            {isVictory ? "Mission Success" : "Sync Failed"}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-white/10" />
            <p className="text-brand-500 text-lg font-black uppercase tracking-[0.3em]">{quizTitle}</p>
            <div className="h-px w-8 bg-white/10" />
          </div>
        </div>

        {/* Hero Result Card */}
        <Card className="p-12 md:p-20 mb-12 border-white/[0.08] bg-dark-900/40 relative overflow-hidden text-center backdrop-blur-3xl rounded-[3rem]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50" />
          
          <StaggerContainer>
            <StaggerItem className="flex justify-center mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-500/10 blur-[80px] group-hover:bg-brand-500/20 transition-all rounded-full" />
                <div className="relative w-64 h-64 rounded-full flex items-center justify-center border-[14px] border-dark-950 shadow-2xl overflow-hidden bg-dark-950/80 backdrop-blur-md">
                  <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[1.05]" viewBox="0 0 100 100">
                    <circle
                      className="text-white/[0.02] stroke-current"
                      strokeWidth="8"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                    ></circle>
                    <motion.circle
                      initial={{ strokeDashoffset: 264 }}
                      animate={{ strokeDashoffset: 264 - (264 * percentage) / 100 }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className={cn(
                        "stroke-current",
                        isVictory ? "text-brand-500" : "text-red-500"
                      )}
                      strokeWidth="8"
                      strokeDasharray="264"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                    ></motion.circle>
                  </svg>
                  <div className="relative z-10 text-center">
                    <div className="flex items-baseline justify-center">
                      <span className="text-7xl font-black font-heading text-white tracking-tighter leading-none">{Math.round(percentage)}</span>
                      <span className="text-2xl font-black text-brand-700 ml-1">%</span>
                    </div>
                    <p className="text-[9px] font-black text-brand-800 uppercase tracking-[0.3em] mt-3">Accuracy Threshold</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <StaggerItem>
                <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/[0.04] group hover:border-brand-500/20 transition-all">
                  <Target className="h-5 w-5 text-brand-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-4xl font-black text-white leading-none mb-1">{score}<span className="text-brand-900 text-xl ml-1">/{total}</span></p>
                  <p className="text-[9px] font-black text-brand-800 uppercase tracking-widest">Valid Nodes</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/[0.04] group hover:border-neon-cyan/20 transition-all">
                  <Sparkles className="h-5 w-5 text-neon-cyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-4xl font-black text-white leading-none mb-1">+{xpEarned}</p>
                  <p className="text-[9px] font-black text-brand-800 uppercase tracking-widest">XP Synthesized</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/[0.04] group hover:border-brand-400/20 transition-all">
                  <TrendingUp className="h-5 w-5 text-brand-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-4xl font-black text-white leading-none mb-1">Top 3<span className="text-brand-900 text-xl ml-1">%</span></p>
                  <p className="text-[9px] font-black text-brand-800 uppercase tracking-widest">Efficiency Rank</p>
                </div>
              </StaggerItem>
            </div>

            <StaggerItem className="flex flex-wrap items-center justify-center gap-6">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')} 
                className="bg-brand-500 text-white h-16 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-500/20"
              >
                Return to Dashboard <ArrowRight className="h-4 w-4 ml-3" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => setShowReview(!showReview)}
                className="bg-white/[0.03] border-white/[0.08] text-brand-500 h-16 px-10 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/[0.06] hover:text-white"
              >
                <Eye className="h-4 w-4 mr-3" />
                Review Data
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => navigate(`/play/${quizId}`)}
                className="text-brand-900 hover:text-white h-16 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px]"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Initiate Retry
              </Button>
            </StaggerItem>
          </StaggerContainer>
        </Card>

        {/* Review Matrix */}
        <AnimatePresence>
          {showReview && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="space-y-8 pb-32"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="h-px flex-1 bg-white/[0.05]" />
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-brand-500" />
                  <h3 className="text-2xl font-black text-white font-heading uppercase tracking-widest">Protocol Review Matrix</h3>
                </div>
                <div className="h-px flex-1 bg-white/[0.05]" />
              </div>

              {quiz?.questions.map((q, idx) => {
                const attempt = answers.find((a: any) => a.questionId === q.id);
                return (
                  <Card key={q.id} className={cn(
                    "p-10 border-white/[0.08] bg-dark-900/40 relative group transition-all rounded-[2rem]",
                    attempt?.isCorrect ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"
                  )}>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[10px] font-black text-brand-900 uppercase tracking-widest">Node Path 0{idx + 1}</span>
                          <Badge variant={attempt?.isCorrect ? "success" : "danger"} size="sm" className="font-black text-[8px] uppercase tracking-widest">
                            {attempt?.isCorrect ? "Validated" : "Corrupted"}
                          </Badge>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-10 tracking-tight leading-snug">{q.text}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((opt, optIdx) => (
                            <div 
                              key={optIdx}
                              className={cn(
                                "p-6 rounded-2xl text-sm font-bold border transition-all flex items-center justify-between",
                                optIdx === q.correctOptionIndex 
                                  ? "bg-green-500/10 border-green-500/30 text-green-400" 
                                  : attempt?.selectedOptionIndex === optIdx
                                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                                    : "bg-dark-950/40 border-white/[0.03] text-brand-800"
                              )}
                            >
                              <span className="flex-1">{opt}</span>
                              {optIdx === q.correctOptionIndex && <Check className="h-4 w-4" />}
                              {attempt?.selectedOptionIndex === optIdx && optIdx !== q.correctOptionIndex && <XIcon className="h-4 w-4" />}
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <div className="mt-8 p-6 bg-brand-500/[0.02] rounded-2xl border border-brand-500/10 border-dashed">
                            <div className="flex items-center gap-2 mb-2 text-brand-600">
                              <Sparkles className="h-3 w-3" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Synthetic Insight</span>
                            </div>
                            <p className="text-sm text-brand-400 leading-relaxed italic">"{q.explanation}"</p>
                          </div>
                        )}
                      </div>

                      <div className={cn(
                        "h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl relative z-10 overflow-hidden",
                        attempt?.isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                      )}>
                        <div className="absolute inset-0 bg-current opacity-5 animate-pulse" />
                        {attempt?.isCorrect ? <Check className="h-8 w-8" /> : <XIcon className="h-8 w-8" />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </FadeIn>
    </div>
  );
};
