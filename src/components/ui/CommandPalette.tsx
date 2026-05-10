import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, PlusCircle, LayoutDashboard, Trophy, Settings } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Discover Quizzes', icon: Compass, href: '/discover' },
    { name: 'Create Quiz', icon: PlusCircle, href: '/dashboard/create' },
    { name: 'Leaderboard', icon: Trophy, href: '/dashboard/leaderboard' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-dark-800 border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-white/5">
              <Search className="h-5 w-5 text-brand-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 bg-transparent border-none text-white placeholder:text-brand-300 px-4 focus:outline-none"
              />
              <div className="flex items-center gap-1 text-xs text-brand-300 font-mono bg-dark-900 px-2 py-1 rounded border border-white/10">
                ESC
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(cmd.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-brand-200 hover:bg-brand-500/10 hover:text-white transition-colors group"
                    >
                      <Icon className="h-5 w-5 text-brand-400 group-hover:text-brand-300" />
                      <span className="font-medium">{cmd.name}</span>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-brand-300">
                  No results found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
