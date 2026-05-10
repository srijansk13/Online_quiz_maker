import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FadeIn, StaggerContainer, StaggerItem, HoverGlow } from '../animations/wrappers';
import { ArrowRight, Sparkles, Zap, Shield, Trophy, Users, BarChart3, Code, Cpu, Globe, Rocket, Music, Briefcase } from 'lucide-react';
import { MOCK_QUIZZES } from '../data/mockData';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden selection:bg-brand-500/30 selection:text-brand-100">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-600/20 blur-[120px] mix-blend-screen animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full bg-neon-cyan/20 blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-[35vw] h-[35vw] rounded-full bg-neon-violet/20 blur-[100px] mix-blend-screen animate-blob animation-delay-4000" />

          <div className="container mx-auto relative z-10 text-center">
            <FadeIn delay={0.1}>
              <Badge variant="glow" className="mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                Quizify 2.0 is now live
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2} className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-heading text-white mb-6 leading-tight">
                Build Interactive Quizzes That <span className="text-gradient">People Love</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-brand-100 mb-10 leading-relaxed">
                Quizify helps creators, educators, and communities build engaging quiz experiences with beautiful analytics and gamification.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Start Creating for Free
                </Button>
              </Link>
              <Link to="/discover">
                <Button size="lg" variant="secondary">
                  Explore Quizzes
                </Button>
              </Link>
            </FadeIn>

            {/* Dashboard Mockup Showcase */}
            <FadeIn delay={0.6} className="mt-20 relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
              <HoverGlow className="relative rounded-2xl md:rounded-[2rem] border border-white/10 bg-dark-800/50 p-2 md:p-4 backdrop-blur-sm shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-br from-brand-500/10 to-neon-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                  alt="Dashboard Preview" 
                  className="rounded-xl md:rounded-2xl border border-white/5 shadow-inner object-cover aspect-[16/9] opacity-80"
                />
              </HoverGlow>
            </FadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                Everything you need to <span className="text-gradient">succeed</span>
              </h2>
              <p className="text-lg text-brand-200">
                A complete ecosystem designed to make creation effortless and participation addictive.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Zap />, title: 'Lightning Fast', desc: 'Built on React 18 and Vite for instant load times and buttery smooth transitions.' },
                { icon: <BarChart3 />, title: 'Deep Analytics', desc: 'Understand your audience with detailed insights, completion rates, and drop-off points.' },
                { icon: <Trophy />, title: 'Gamification', desc: 'Keep users engaged with XP points, streak tracking, leaderboards, and achievements.' },
                { icon: <Shield />, title: 'Enterprise Security', desc: 'Your data is secured with Firebase Auth and strict Firestore security rules.' },
                { icon: <Users />, title: 'Community Driven', desc: 'Build a following, share quizzes, and engage with users through comments and ratings.' },
                { icon: <Sparkles />, title: 'Premium Aesthetics', desc: 'Dark glassmorphism UI that looks professional and builds trust instantly.' },
              ].map((feature, i) => (
                <StaggerItem key={i}>
                  <div className="glass-card p-8 h-full hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-shadow">
                    <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h3>
                    <p className="text-brand-200 leading-relaxed">{feature.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Trending Quizzes Section */}
        <section className="py-24 relative overflow-hidden bg-dark-800/30">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                  Trending on <span className="text-gradient">Quizify</span>
                </h2>
                <p className="text-lg text-brand-200">
                  Join thousands of players in our most popular challenges. New quizzes added every hour.
                </p>
              </div>
              <Link to="/discover">
                <Button variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  View All Quizzes
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_QUIZZES.slice(0, 4).map((quiz) => (
                <Link key={quiz.id} to={`/play/${quiz.id}`} className="group">
                  <div className="glass-card overflow-hidden h-full flex flex-col border-white/5 group-hover:border-brand-500/30 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={quiz.coverImage} 
                        alt={quiz.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 right-3">
                        <Badge variant="glow" size="sm" className="bg-dark-900/80 backdrop-blur-md">
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <Badge variant="secondary" className="w-fit mb-3 text-[10px] uppercase tracking-wider">
                        {quiz.category}
                      </Badge>
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-brand-400 transition-colors">
                        {quiz.title}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-brand-300">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{(quiz.attempts || 0).toLocaleString()} plays</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-yellow-500" />
                          <span>{quiz.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                Explore <span className="text-gradient">Categories</span>
              </h2>
              <p className="text-lg text-brand-200">
                Whatever your passion, we have a quiz for it.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Coding', icon: <Code />, color: 'violet' },
                { name: 'AI', icon: <Cpu />, color: 'cyan' },
                { name: 'Global', icon: <Globe />, color: 'green' },
                { name: 'Space', icon: <Rocket />, color: 'blue' },
                { name: 'Music', icon: <Music />, color: 'pink' },
                { name: 'Business', icon: <Briefcase />, color: 'orange' },
              ].map((cat, i) => (
                <Link key={i} to={`/discover?category=${cat.name}`} className="group">
                  <div className="glass-card p-6 text-center hover:bg-white/5 transition-all group-hover:-translate-y-1 duration-300">
                    <div className={`h-12 w-12 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 bg-white/5 group-hover:bg-brand-500 group-hover:text-white`}>
                      {cat.icon}
                    </div>
                    <span className="text-white font-medium text-sm group-hover:text-brand-400 transition-colors">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-brand-900/20" />
          <div className="container mx-auto px-6 relative">
            <div className="glass-panel rounded-3xl p-12 text-center max-w-4xl mx-auto border-brand-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-premium opacity-10" />
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 relative z-10">
                  Ready to launch your first quiz?
                </h2>
                <p className="text-xl text-brand-200 mb-8 relative z-10">
                  Join the platform that elite creators trust. Setup takes less than two minutes.
                </p>
                <Link to="/signup" className="relative z-10">
                  <Button size="lg" className="shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] text-lg px-10 h-16">
                    Get Started Now
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
