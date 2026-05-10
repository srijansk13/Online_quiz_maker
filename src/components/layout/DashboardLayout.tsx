import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserStore } from '../../store/userStore';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Compass, 
  Trophy, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { getUserData } = useUserStore();
  const userData = getUserData(user?.id || null);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Create', href: '/dashboard/create', icon: PlusCircle },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-dark-950/50">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-premium flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-brand-500/20">
            <span className="text-white font-bold font-heading text-2xl">Q</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading tracking-tight text-white leading-none">Quizify</span>
            <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mt-1">SaaS Platform</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em]">General</p>
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group",
                isActive 
                  ? "text-white" 
                  : "text-brand-300 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white/[0.05] border border-white/[0.08] rounded-xl shadow-inner"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <div className="flex items-center gap-3 relative z-10">
                <Icon className={cn("h-5 w-5 transition-colors duration-300", isActive ? "text-brand-400" : "text-brand-500/50 group-hover:text-brand-400")} />
                <span className="tracking-tight">{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-brand-400 relative z-10" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/[0.05] bg-dark-950/80 backdrop-blur-3xl">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] group transition-all hover:bg-white/[0.05]">
          <div className="h-10 w-10 rounded-xl bg-gradient-premium flex items-center justify-center text-white font-bold shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            {user?.name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-400" />
              <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">Lvl {userData?.level || 1}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden text-white selection:bg-brand-500/30">
      {/* Animated background glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-600/5 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 blur-[120px] rounded-full animate-blob animation-delay-2000" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-white/[0.05] bg-dark-950/50 flex-col backdrop-blur-3xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-dark-950 z-50 lg:hidden shadow-2xl border-r border-white/10"
            >
              <SidebarContent />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-6 p-2 rounded-xl bg-white/[0.05] text-brand-200 hover:text-white border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10">
        {/* Topbar */}
        <header className="h-20 border-b border-white/[0.05] bg-dark-950/30 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 z-30">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.05] text-brand-200 hover:text-white border border-white/[0.08]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold font-heading text-white tracking-tight">
                {navItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-0.5">
                <span>Quizify</span>
                <span className="h-1 w-1 rounded-full bg-brand-600" />
                <span>Production Environment</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] group focus-within:border-brand-500/40 focus-within:bg-white/[0.05] transition-all duration-300">
              <Search className="h-4 w-4 text-brand-500 group-focus-within:text-brand-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-brand-700 w-48 lg:w-72 font-medium"
              />
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-dark-800 border border-white/10 text-[10px] font-mono text-brand-500">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-brand-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all relative group">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-brand-500 border-2 border-dark-950 group-hover:scale-110 transition-transform" />
              </button>
              
              <Link to="/dashboard/settings" className="lg:hidden h-10 w-10 rounded-xl bg-gradient-premium flex items-center justify-center text-white font-bold shadow-lg text-sm border border-white/10">
                {user?.name?.[0]}
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-10 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation - High Fidelity */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-dark-950/80 backdrop-blur-2xl border-t border-white/[0.05] flex items-center justify-around px-6 z-40 pb-2">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4",
                isActive ? "text-brand-400 scale-110" : "text-brand-500 hover:text-brand-300"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-active"
                  className="absolute -top-3 h-1 w-8 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                />
              )}
              <Icon className="h-6 w-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                {item.name === 'Dashboard' ? 'Home' : item.name.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

