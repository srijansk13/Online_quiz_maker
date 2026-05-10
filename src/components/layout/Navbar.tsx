import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { Menu, X, Command, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { getUserData } = useUserStore();
  const userData = getUserData(user?.id || null);
  const location = useLocation();
  const { level = 1 } = userData || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Architecture', href: '#features' },
    { name: 'Discover', href: '/discover' },
    { name: 'Network', href: '/dashboard/leaderboard' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled 
            ? 'bg-dark-950/80 backdrop-blur-2xl border-b border-white/[0.05] py-3' 
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center transition-all group-hover:rotate-12 shadow-lg shadow-brand-500/20">
                <span className="text-white font-black font-heading text-xl">Q</span>
              </div>
              <span className="text-xl font-black font-heading tracking-tighter text-white uppercase tracking-widest hidden sm:block">Quizify</span>
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#22d3ee]" />
            </Link>

            {/* Desktop Nav Matrix */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                    location.pathname === link.href 
                      ? "text-brand-400 bg-brand-500/10" 
                      : "text-brand-700 hover:text-white hover:bg-white/[0.03]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[10px] font-black text-brand-700 uppercase tracking-widest hover:bg-white/[0.06] hover:text-white transition-all group">
              <Command className="h-3 w-3" />
              <span>OmniSearch</span>
              <div className="h-4 w-[1px] bg-white/10 mx-1" />
              <kbd className="text-[8px] opacity-50">CMD K</kbd>
            </button>
            
            <div className="h-6 w-px bg-white/10" />

            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/dashboard" className="flex items-center gap-4 group">
                  <div className="text-right hidden sm:block">
                    <p className="text-[8px] font-black text-brand-700 uppercase tracking-widest">Protocol Sync</p>
                    <p className="text-[10px] font-black text-white uppercase">Level {level}</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-gradient-premium border border-white/20 flex items-center justify-center text-white font-black shadow-xl group-hover:scale-105 transition-all">
                    {user.name?.[0] || 'U'}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-brand-700 hover:text-white font-black uppercase tracking-widest text-[10px]">
                    Access
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-brand-500 text-white shadow-lg shadow-brand-500/20 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] h-10">
                    Initialize
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="lg:hidden h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-brand-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Neural Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-3xl pt-32 px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              <div className="text-[10px] font-black text-brand-900 uppercase tracking-[0.3em] mb-4">Navigation Matrix</div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-lg font-black text-white uppercase tracking-widest group"
                >
                  {link.name}
                  <ChevronRight className="h-5 w-5 text-brand-800 group-hover:text-brand-500 transition-colors" />
                </Link>
              ))}
              
              <div className="h-px bg-white/10 w-full my-8" />
              
              {user ? (
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-16 bg-brand-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
                    Return to Dashboard
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs">
                      Access Terminal
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-16 bg-brand-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
                      Initialize Account
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
