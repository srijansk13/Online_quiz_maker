import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserStore } from '../../store/userStore';
import { useQuizStore } from '../../store/quizStore';
import { getXpProgress } from '../../utils/progression';
import { getDailyChallenge, getRecommendations } from '../../utils/recommendations';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { FadeIn, StaggerContainer, StaggerItem } from '../../animations/wrappers';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Trophy, 
  Flame, 
  Star, 
  PlayCircle, 
  Plus, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Clock, 
  ChevronRight,
  Target,
  Sparkles,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserData } = useUserStore();
  const userData = getUserData(user?.id || null);
  const { quizzes } = useQuizStore();
  
  const { xp = 0, level = 1, streak = 0, attempts = [], achievements = [], interests = [] } = userData || {};
  const [viewMode, setViewMode] = React.useState<'player' | 'creator'>('player');

  const recommendedQuizzes = getRecommendations(interests, 4);
  const dailyChallenge = getDailyChallenge();
  
  const uniqueAttemptedIds = Array.from(new Set(attempts.map(a => a.quizId)));
  const continueLearningQuizzes = uniqueAttemptedIds
    .map(id => quizzes.find(q => q.id === id))
    .filter((q): q is any => !!q)
    .slice(0, 3);

  const myQuizzes = quizzes.filter(q => q.authorId === user?.id || q.authorId === 'u1');
  const totalPlays = myQuizzes.reduce((acc, q) => acc + (q.attempts || 0), 0);
  const avgRating = myQuizzes.length > 0 
    ? (myQuizzes.reduce((acc, q) => acc + (q.rating || 0), 0) / myQuizzes.length).toFixed(1)
    : '0.0';

  const progression = getXpProgress(xp);
  const xpProgress = progression.percentage;
  const xpForNextLevel = progression.nextLevelMinXp;

  if (!userData) {
    return (
      <DashboardLayout>
        <div className="space-y-8 animate-pulse">
          <div className="h-20 bg-white/5 rounded-3xl w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-48 bg-white/5 rounded-3xl" />
            <div className="h-48 bg-white/5 rounded-3xl" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="h-80 bg-white/5 rounded-3xl" />
              <div className="h-80 bg-white/5 rounded-3xl" />
            </div>
            <div className="h-80 bg-white/5 rounded-3xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <FadeIn className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="glow" size="sm" className="bg-brand-500/10 text-brand-400 border-brand-500/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Personal Workspace
              </Badge>
              <span className="text-brand-700 text-xs font-bold uppercase tracking-widest">v2.4.0 Stable</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-none">
              Welcome, <span className="text-gradient">{user?.name}</span>
            </h1>
            <p className="text-brand-400 font-medium mt-3 text-lg">Your learning journey is accelerating. You gained <span className="text-white">1,240 XP</span> this week.</p>
          </div>
          
          <div className="flex items-center p-1.5 bg-white/[0.03] rounded-2xl border border-white/[0.05] backdrop-blur-xl">
            <button
              onClick={() => setViewMode('player')}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                viewMode === 'player' 
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                  : "text-brand-500 hover:text-white"
              )}
            >
              <Target className="h-4 w-4" />
              <span>Player</span>
            </button>
            <button
              onClick={() => setViewMode('creator')}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                viewMode === 'creator' 
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                  : "text-brand-500 hover:text-white"
              )}
            >
              <Layout className="h-4 w-4" />
              <span>Creator</span>
            </button>
          </div>
        </div>
      </FadeIn>

      <AnimatePresence mode="wait">
        {viewMode === 'player' ? (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="space-y-10"
          >
            {/* Stats Overview */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerItem className="md:col-span-2">
                <Card hoverGlow glowColor="violet" className="h-full relative overflow-hidden p-8 border-white/[0.08] bg-dark-900/40">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-6">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-premium flex items-center justify-center shadow-2xl relative group">
                        <Star className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-neon-cyan border-4 border-dark-900 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-black text-white font-heading tracking-tight">Level {level || 1}</h3>
                          <Badge className="bg-brand-500/10 text-brand-400 border-none text-[10px] uppercase font-black">Veteran</Badge>
                        </div>
                        <p className="text-brand-400 font-bold mt-0.5 tracking-tight">
                          <span className="text-white">{(xp || 0).toLocaleString()}</span> / {(xpForNextLevel || 100).toLocaleString()} Total XP
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-1">Rank Progress</p>
                      <p className="text-3xl font-black text-white font-heading">{xpProgress || 0}%</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <div className="h-4 w-full bg-dark-950 rounded-full overflow-hidden border border-white/[0.05] p-1 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress || 0}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-brand-600 via-neon-violet to-neon-cyan rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 bg-white rounded-full blur-md opacity-50" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between mt-3 px-1">
                      <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Level {level}</span>
                      <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Level {level + 1}</span>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card hoverGlow glowColor="orange" className="h-full p-8 border-white/[0.08] bg-dark-900/40 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/5 blur-3xl rounded-full" />
                  <div className="flex flex-col h-full">
                    <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6 group-hover:scale-110 transition-transform">
                      <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
                    </div>
                    <p className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.2em] mb-1">Active Streak</p>
                    <p className="text-5xl font-black text-white font-heading tracking-tight">{streak || 0} <span className="text-xl text-brand-500">Days</span></p>
                    <p className="text-brand-500 text-sm font-bold mt-4">Top 5% of all creators this month.</p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerContainer>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                {/* Continue Learning - Enhanced */}
                {continueLearningQuizzes.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                          <PlayCircle className="h-4 w-4 text-brand-400" />
                        </div>
                        <h3 className="text-xl font-black text-white font-heading tracking-tight">Continue Learning</h3>
                      </div>
                      <Link to="/discover" className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-brand-400 transition-colors">See History</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {continueLearningQuizzes.map(quiz => {
                        const lastAttempt = attempts.find(a => a.quizId === quiz.id);
                        return (
                          <Link key={quiz.id} to={`/play/${quiz.id}`}>
                            <Card className="p-0 border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-all group overflow-hidden h-32 flex">
                              <div className="w-32 relative overflow-hidden shrink-0">
                                <img src={quiz.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-dark-950/40 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="h-10 w-10 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                    <PlayCircle className="h-6 w-6" />
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                                <div>
                                  <h4 className="text-white font-black truncate text-sm">{quiz.title}</h4>
                                  <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mt-1">{quiz.category}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-brand-500">Progress</span>
                                    <span className="text-white">{lastAttempt?.percentage || 0}%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-dark-950 rounded-full overflow-hidden border border-white/[0.05]">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${lastAttempt?.percentage || 0}%` }}
                                      className="h-full bg-brand-500" 
                                    />
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Recommended - Modernized */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
                        <TrendingUp className="h-4 w-4 text-neon-cyan" />
                      </div>
                      <h3 className="text-xl font-black text-white font-heading tracking-tight">Recommended for You</h3>
                    </div>
                    <Link to="/discover" className="flex items-center gap-1 text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-brand-400 transition-colors">
                      Browse All <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedQuizzes.map(quiz => (
                      <Link key={quiz.id} to={`/play/${quiz.id}`}>
                        <Card className="p-0 bg-white/[0.02] border-white/[0.05] hover:border-brand-500/40 group overflow-hidden">
                          <div className="h-40 relative">
                            <img src={quiz.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <Badge variant="glow" size="sm" className="bg-dark-950/80 backdrop-blur-md mb-2">{quiz.difficulty}</Badge>
                              <h4 className="text-white font-black text-lg leading-tight group-hover:text-brand-400 transition-colors">{quiz.title}</h4>
                            </div>
                          </div>
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-[10px] font-black text-brand-500 uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 15m</span>
                              <span className="flex items-center gap-1.5"><Target className="h-3 w-3" /> {quiz.questions.length} Qs</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-brand-500/30">Play</Button>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Timeline Activity */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-8 rounded-lg bg-neon-violet/10 flex items-center justify-center border border-neon-violet/20">
                      <Calendar className="h-4 w-4 text-neon-violet" />
                    </div>
                    <h3 className="text-xl font-black text-white font-heading tracking-tight">Recent Activity</h3>
                  </div>
                  <div className="space-y-4 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/[0.05]">
                    {attempts.slice(0, 4).map((attempt, idx) => {
                      const quiz = quizzes.find(q => q.id === attempt.quizId);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={attempt.id} 
                          className="flex items-start gap-6 relative"
                        >
                          <div className="h-12 w-12 rounded-2xl bg-dark-900 border border-white/[0.08] flex items-center justify-center shrink-0 z-10 relative overflow-hidden group">
                            {quiz?.coverImage ? (
                              <img src={quiz.coverImage} alt="" className="h-full w-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                            ) : (
                              <Zap className="h-5 w-5 text-brand-500" />
                            )}
                          </div>
                          <Card className="flex-1 p-4 border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.03] transition-all flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-black text-sm">{quiz?.title || 'System Protocol'}</h4>
                              <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mt-1">
                                {new Date(attempt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={attempt.percentage >= 80 ? 'glow' : attempt.percentage >= 50 ? 'secondary' : 'danger'}
                                className={cn(
                                  "font-black text-[10px] tracking-[0.1em]",
                                  attempt.percentage >= 80 ? "text-green-400" : attempt.percentage >= 50 ? "text-yellow-400" : "text-red-400"
                                )}
                              >
                                {attempt.percentage}% SCORE
                              </Badge>
                              <p className="text-[10px] font-bold text-brand-700 uppercase tracking-widest mt-1">+{Math.floor(attempt.percentage * 1.5)} XP</p>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-10">
                {/* Daily Challenge - High Impact */}
                <Card className="bg-gradient-premium border-none relative overflow-hidden group p-8 shadow-2xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10">
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md mb-6 font-black text-[10px] tracking-[0.2em] uppercase">Limited Time</Badge>
                    <h4 className="text-3xl font-black text-white mb-2 font-heading tracking-tight leading-tight">{dailyChallenge.title}</h4>
                    <p className="text-brand-100 font-bold text-sm mb-8 leading-relaxed opacity-80">{dailyChallenge.description}</p>
                    <Link to={`/play/${dailyChallenge.id}`}>
                      <Button fullWidth size="lg" className="bg-white text-brand-950 hover:bg-white/90 font-black uppercase tracking-[0.1em] h-14 rounded-2xl shadow-xl shadow-brand-950/20">
                        Launch <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <p className="text-center mt-4 text-[10px] font-black text-brand-200 uppercase tracking-widest">Expires in 14h 22m</p>
                  </div>
                </Card>

                {/* Insights - Premium Visuals */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                      <TrendingUp className="h-4 w-4 text-brand-400" />
                    </div>
                    <h3 className="text-lg font-black text-white font-heading uppercase tracking-widest">Learning Insights</h3>
                  </div>
                  <Card className="border-white/[0.05] bg-white/[0.02] p-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Focus Level</span>
                        <span className="text-xs font-black text-green-400">OPTIMAL</span>
                      </div>
                      <div className="h-1.5 w-full bg-dark-950 rounded-full overflow-hidden p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          className="h-full bg-green-400 rounded-full" 
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2 space-y-4">
                      {[
                        { label: 'Dominant Domain', value: 'Software Eng.', color: 'text-brand-400' },
                        { label: 'Growth Vector', value: '+14% Week', color: 'text-neon-cyan' },
                        { label: 'Consistency', value: 'High', color: 'text-neon-violet' }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/[0.03] pb-3 last:border-none last:pb-0">
                          <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{stat.label}</span>
                          <span className={cn("text-xs font-black uppercase tracking-tight", stat.color)}>{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Achievements - Modern Badges */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <Trophy className="h-4 w-4 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-black text-white font-heading uppercase tracking-widest">Hall of Fame</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {(achievements.length > 0 ? achievements : ['Welcome', 'Explorer', 'Genius', 'Streak_King']).slice(0, 4).map((id, i) => (
                      <Card key={i} className="p-4 border-white/[0.05] bg-white/[0.02] flex flex-col items-center text-center group hover:bg-white/[0.05] transition-all">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-600/20 to-neon-violet/20 flex items-center justify-center text-brand-400 border border-white/[0.05] mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                          <Trophy className="h-7 w-7" />
                        </div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{id.replace('_', ' ')}</h4>
                      </Card>
                    ))}
                  </div>
                  <Button variant="ghost" fullWidth className="mt-6 text-[10px] font-black uppercase tracking-widest text-brand-500 hover:text-white border border-white/[0.05]">View All 24 Rewards</Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="creator"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="space-y-10"
          >
            {/* Creator Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Published Assets', value: myQuizzes.length, color: 'violet' },
                { label: 'Total Interactions', value: totalPlays.toLocaleString(), color: 'cyan' },
                { label: 'User Feedback', value: avgRating, color: 'green' },
              ].map((stat, i) => (
                <Card key={i} hoverGlow glowColor={stat.color as any} className="p-8 bg-dark-900/40 border-white/[0.08]">
                  <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <p className="text-4xl font-black text-white font-heading tracking-tight">{stat.value}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-green-400 uppercase tracking-widest">
                    <TrendingUp className="h-3 w-3" /> +12% this month
                  </div>
                </Card>
              ))}
              <Link to="/dashboard/create" className="group h-full">
                <Card className="h-full flex flex-col items-center justify-center border-dashed border-2 border-brand-500/20 bg-brand-500/[0.02] hover:bg-brand-500/[0.05] hover:border-brand-500/50 transition-all duration-500 p-8 text-center shadow-xl shadow-brand-500/5">
                  <div className="h-12 w-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
                    <Plus className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Deploy New Quiz</span>
                </Card>
              </Link>
            </div>

            {/* Asset Management */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                    <Layout className="h-4 w-4 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-black text-white font-heading tracking-tight uppercase tracking-widest">Asset Repository</h3>
                </div>
                <div className="flex items-center gap-4">
                  <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-500 outline-none focus:border-brand-500/50 transition-all">
                    <option>Sort by: Recent</option>
                    <option>Sort by: Plays</option>
                    <option>Sort by: Rating</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {myQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="p-0 overflow-hidden group border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                    <div className="flex h-40">
                      <div className="w-40 bg-dark-900 relative shrink-0">
                        {quiz.coverImage ? (
                          <img src={quiz.coverImage} alt="" className="h-full w-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-premium opacity-10" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 bg-white text-brand-950 font-black uppercase text-[10px] tracking-widest border-none">Manage</Button>
                        </div>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="glow" size="sm" className="bg-brand-500/10 text-brand-400 border-none text-[8px] uppercase tracking-widest font-black">{quiz.category}</Badge>
                            <span className="text-[10px] font-black text-brand-700 uppercase tracking-widest">{quiz.difficulty}</span>
                          </div>
                          <h4 className="text-white font-black text-lg mb-1 truncate leading-tight">{quiz.title}</h4>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/[0.03]">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-brand-400"><PlayCircle className="h-3.5 w-3.5" /> {quiz.attempts || 0}</span>
                            <span className="flex items-center gap-1.5 text-brand-400"><Target className="h-3.5 w-3.5" /> {quiz.questions.length}</span>
                          </div>
                          <span className="text-green-400">ACTIVE</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

