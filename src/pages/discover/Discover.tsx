import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FadeIn, StaggerContainer, StaggerItem } from '../../animations/wrappers';
import { Search, Filter, Clock, Hash, Compass, ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Discover: React.FC = () => {
  const { quizzes } = useQuizStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'newest'>('trending');
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['All', 'Programming', 'AI', 'Science', 'Movies', 'Sports', 'Geography', 'Space', 'History', 'Gaming', 'Music', 'Startups', 'Business', 'General Knowledge'];

  const filteredQuizzes = quizzes
    .filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           quiz.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return (b.attempts || 0) - (a.attempts || 0);
      return b.createdAt - a.createdAt;
    });

  return (
    <div className="min-h-screen bg-dark-950 overflow-hidden selection:bg-brand-500/30">
      <Navbar />

      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-600/5 blur-[120px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] rounded-full bg-neon-cyan/5 blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />
      </div>

      <main className="relative z-10 pt-40 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-brand-400" />
              <span className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em]">Universe Exploration</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-white mb-6 tracking-tight leading-none">
              Explore the <span className="text-gradient">Knowledge Layer</span>
            </h1>
            <p className="text-brand-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Synthesize your skills across thousands of community-built learning protocols.
            </p>
          </FadeIn>
        </section>

        {/* Search & Intelligence Bar */}
        <section className="container mx-auto px-6 mb-16 relative z-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <div className={cn(
                "group relative p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl transition-all duration-500 shadow-2xl",
                isSearching ? "border-brand-500/50 shadow-brand-500/10" : "hover:border-white/20"
              )}>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-brand-700 group-hover:text-brand-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search for subjects, creators, or tags..."
                      onFocus={() => setIsSearching(true)}
                      onBlur={() => setIsSearching(false)}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-16 bg-transparent pl-16 pr-6 text-xl font-bold text-white placeholder:text-brand-900 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto p-1">
                    <div className="h-10 w-px bg-white/10 hidden md:block mx-2" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="h-14 px-6 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.05] text-brand-400 font-black uppercase tracking-widest text-[10px] outline-none focus:border-brand-500 cursor-pointer hover:bg-white/[0.06] transition-all"
                    >
                      <option value="trending">Trending</option>
                      <option value="newest">Newest</option>
                    </select>
                    <button className="h-14 w-14 flex items-center justify-center rounded-[1.5rem] bg-brand-500 text-white shadow-xl shadow-brand-500/20 hover:scale-105 transition-all">
                      <Filter className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories Ribbon */}
              <div className="mt-8 flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mask-fade-edges">
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full shrink-0">
                  <Compass className="h-4 w-4 text-brand-400" />
                  <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Domains</span>
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border",
                      selectedCategory === cat 
                        ? "bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/20" 
                        : "bg-white/[0.03] border-white/[0.05] text-brand-600 hover:text-white hover:border-white/20"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Discovery Grid */}
        <section className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center border border-brand-500/20 text-brand-400">
                <Hash className="h-4 w-4" />
              </div>
              <h2 className="text-2xl font-black text-white font-heading tracking-tight uppercase tracking-[0.1em]">Protocol List</h2>
            </div>
            <p className="text-[10px] font-black text-brand-700 uppercase tracking-widest">{filteredQuizzes.length} Results Found</p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredQuizzes.map((quiz: any) => (
              <StaggerItem key={quiz.id}>
                <Link to={`/quiz/${quiz.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <Card className="h-full p-0 overflow-hidden border-white/[0.08] bg-dark-900/40 hover:border-brand-500/40 transition-all duration-500 group flex flex-col">
                      {/* Premium Cover */}
                      <div className="h-48 w-full relative overflow-hidden shrink-0">
                        <img 
                          src={quiz.coverImage || `https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800`} 
                          alt="" 
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge variant="glow" size="sm" className="bg-dark-950/80 backdrop-blur-md border-white/10 font-black text-[8px] uppercase">{quiz.difficulty}</Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge size="sm" className="bg-brand-500 text-white border-none font-black text-[8px] uppercase tracking-widest px-3 py-1 shadow-xl">{quiz.category}</Badge>
                        </div>
                      </div>

                      {/* Content Layer */}
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-white font-heading mb-3 tracking-tight group-hover:text-brand-400 transition-colors leading-tight line-clamp-2">
                            {quiz.title}
                          </h3>
                          <p className="text-brand-500 text-sm font-medium mb-8 line-clamp-2 leading-relaxed italic">
                            "{quiz.description || 'No data stream provided for this asset.'}"
                          </p>
                        </div>

                        {/* Footer Intelligence */}
                        <div className="pt-6 border-t border-white/[0.05] grid grid-cols-2 gap-y-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-brand-600">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-brand-800 uppercase tracking-widest">Duration</p>
                              <p className="text-[10px] font-bold text-white">15 Minutes</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-brand-600">
                              <Layers className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-brand-800 uppercase tracking-widest">Segments</p>
                              <p className="text-[10px] font-bold text-white">{quiz.questions?.length || 0} Points</p>
                            </div>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-premium overflow-hidden border border-white/20">
                              <img src={`https://ui-avatars.com/api/?name=${quiz.authorId || 'U'}&background=random`} alt="" />
                            </div>
                            <span className="text-[10px] font-black text-brand-700 uppercase tracking-widest">{quiz.authorId || 'System'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-brand-400 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            <span className="text-[10px] font-black uppercase tracking-widest">Access Protocol</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <FadeIn className="text-center py-40">
            <div className="h-24 w-24 rounded-[2rem] bg-brand-500/5 border border-brand-500/10 flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Search className="h-10 w-10 text-brand-900" />
            </div>
            <h3 className="text-3xl font-black text-white font-heading mb-4">No Data Stream Detected</h3>
            <p className="text-brand-600 font-bold uppercase tracking-[0.2em] text-xs">Try recalibrating your search parameters.</p>
          </FadeIn>
        )}
      </main>

      <Footer />
    </div>
  );
};
