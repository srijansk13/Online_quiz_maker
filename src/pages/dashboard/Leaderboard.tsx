import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { FadeIn, StaggerItem, HoverGlow } from '../../animations/wrappers';
import { Trophy, Star, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const mockLeaderboard = [
  { rank: 1, name: 'Alex Rivera', xp: 15420, level: 12, streak: 45, avatar: 'https://i.pravatar.cc/150?u=1' },
  { rank: 2, name: 'Sarah Jenkins', xp: 14200, level: 11, streak: 28, avatar: 'https://i.pravatar.cc/150?u=2' },
  { rank: 3, name: 'Mike Chen', xp: 13850, level: 11, streak: 15, avatar: 'https://i.pravatar.cc/150?u=3' },
  { rank: 4, name: 'Emma Watson', xp: 12100, level: 10, streak: 8, avatar: 'https://i.pravatar.cc/150?u=4' },
  { rank: 5, name: 'David Kim', xp: 11500, level: 10, streak: 31, avatar: 'https://i.pravatar.cc/150?u=5' },
  // Current user mock placement
  { rank: 1402, name: 'Current User', xp: 1250, level: 5, streak: 12, isCurrentUser: true },
];

export const Leaderboard: React.FC = () => {
  const { user } = useAuth();

  // Inject current user name
  const leaderboard = mockLeaderboard.map(item => 
    item.isCurrentUser ? { ...item, name: user?.name || 'You', avatar: `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff` } : item
  );

  return (
    <DashboardLayout>
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-white">Global Leaderboard</h1>
            <p className="text-brand-200">See how you rank against the top minds</p>
          </div>
          <div className="bg-dark-800/50 p-2 rounded-xl border border-white/5 backdrop-blur-md hidden sm:block">
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-brand-500 text-white font-medium text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)]">All Time</button>
              <button className="px-4 py-2 rounded-lg text-brand-200 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">This Week</button>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-12 mt-8 pt-12">
          {/* Rank 2 */}
          <StaggerItem className="w-full md:w-1/4 order-2 md:order-1 relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative">
                <img src={leaderboard[1].avatar} alt="" className="h-16 w-16 rounded-full border-4 border-dark-900 object-cover" />
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-slate-300 flex items-center justify-center border-2 border-dark-900 text-dark-900 font-bold text-xs">2</div>
              </div>
              <p className="text-white font-bold mt-2 text-center truncate w-full px-2">{leaderboard[1].name}</p>
              <p className="text-brand-300 text-xs font-mono">{leaderboard[1].xp.toLocaleString()} XP</p>
            </div>
            <div className="h-32 bg-gradient-to-t from-dark-800 to-slate-800/40 rounded-t-2xl border border-white/5 border-b-0 backdrop-blur-sm" />
          </StaggerItem>

          {/* Rank 1 */}
          <StaggerItem className="w-full md:w-1/3 order-1 md:order-2 relative z-10">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <Trophy className="h-8 w-8 text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              <div className="relative">
                <img src={leaderboard[0].avatar} alt="" className="h-24 w-24 rounded-full border-4 border-yellow-400 object-cover shadow-[0_0_30px_rgba(250,204,21,0.3)]" />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-dark-900 text-dark-900 font-bold text-sm">1</div>
              </div>
              <p className="text-white font-bold mt-3 text-lg text-center truncate w-full px-2">{leaderboard[0].name}</p>
              <p className="text-yellow-400 text-sm font-mono font-bold">{leaderboard[0].xp.toLocaleString()} XP</p>
            </div>
            <div className="h-48 bg-gradient-to-t from-dark-800 to-yellow-500/20 rounded-t-2xl border border-yellow-500/30 border-b-0 backdrop-blur-md shadow-[0_-10px_40px_rgba(250,204,21,0.1)]" />
          </StaggerItem>

          {/* Rank 3 */}
          <StaggerItem className="w-full md:w-1/4 order-3 relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative">
                <img src={leaderboard[2].avatar} alt="" className="h-16 w-16 rounded-full border-4 border-dark-900 object-cover" />
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-amber-600 flex items-center justify-center border-2 border-dark-900 text-white font-bold text-xs">3</div>
              </div>
              <p className="text-white font-bold mt-2 text-center truncate w-full px-2">{leaderboard[2].name}</p>
              <p className="text-brand-300 text-xs font-mono">{leaderboard[2].xp.toLocaleString()} XP</p>
            </div>
            <div className="h-28 bg-gradient-to-t from-dark-800 to-amber-900/40 rounded-t-2xl border border-white/5 border-b-0 backdrop-blur-sm" />
          </StaggerItem>
        </div>

        {/* List */}
        <Card className="p-0 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-dark-900/50 text-xs font-medium text-brand-300 uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-6 md:col-span-5">Player</div>
            <div className="col-span-4 md:col-span-2 text-right md:text-left">XP</div>
            <div className="hidden md:block col-span-2 text-center">Level</div>
            <div className="hidden md:block col-span-2 text-center">Streak</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {leaderboard.map((item, index) => {
              if (index < 3 && !item.isCurrentUser) return null; // Skip top 3 unless it's current user in a low rank (which we handle below)
              if (item.isCurrentUser && item.rank > 5) {
                // Insert a gap before current user
                return (
                  <React.Fragment key={item.rank}>
                    <div className="p-4 text-center border-b border-white/5 text-brand-400/50">
                      •••••
                    </div>
                    <HoverGlow className={`grid grid-cols-12 gap-4 p-4 items-center bg-brand-500/10 border-l-4 border-brand-500`}>
                      <div className="col-span-2 md:col-span-1 text-center font-bold text-brand-400">
                        {item.rank}
                      </div>
                      <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                        <img src={item.avatar} alt="" className="h-10 w-10 rounded-full" />
                        <span className="font-bold text-white">{item.name}</span>
                      </div>
                      <div className="col-span-4 md:col-span-2 font-mono font-medium text-brand-300 text-right md:text-left">
                        {item.xp.toLocaleString()}
                      </div>
                      <div className="hidden md:flex col-span-2 items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-brand-400" />
                        <span className="text-white">{item.level}</span>
                      </div>
                      <div className="hidden md:flex col-span-2 items-center justify-center gap-1">
                        <Flame className="h-4 w-4 text-orange-400" />
                        <span className="text-white">{item.streak}</span>
                      </div>
                    </HoverGlow>
                  </React.Fragment>
                )
              }

              return (
                <HoverGlow key={item.rank} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors">
                  <div className="col-span-2 md:col-span-1 text-center font-bold text-brand-300">
                    {item.rank}
                  </div>
                  <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                    <img src={item.avatar} alt="" className="h-10 w-10 rounded-full" />
                    <span className="font-medium text-white">{item.name}</span>
                  </div>
                  <div className="col-span-4 md:col-span-2 font-mono text-brand-200 text-right md:text-left">
                    {item.xp.toLocaleString()}
                  </div>
                  <div className="hidden md:flex col-span-2 items-center justify-center gap-1 text-brand-200">
                    <Star className="h-4 w-4" />
                    <span>{item.level}</span>
                  </div>
                  <div className="hidden md:flex col-span-2 items-center justify-center gap-1 text-brand-200">
                    <Flame className="h-4 w-4 text-orange-400/50" />
                    <span>{item.streak}</span>
                  </div>
                </HoverGlow>
              );
            })}
          </div>
        </Card>
      </FadeIn>
    </DashboardLayout>
  );
};
