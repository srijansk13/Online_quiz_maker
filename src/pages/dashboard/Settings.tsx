import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUserStore } from '../../store/userStore';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { FadeIn } from '../../animations/wrappers';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  User, 
  Palette, 
  Bell, 
  Shield, 
  LogOut, 
  Moon,
  Sun,
  Volume2,
  Lock,
  Mail,
  Zap,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../utils/cn';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { getUserData, upsertUser } = useUserStore();
  const userData = getUserData(user?.id || null);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'appearance' | 'notifications' | 'privacy'>('profile');
  
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    username: userData?.username || '',
    bio: userData?.bio || '',
    email: userData?.email || '',
  });

  const [preferences, setPreferences] = useState(userData?.preferences || {
    theme: 'dark' as 'dark' | 'light',
    soundEnabled: true,
    notificationsEnabled: true,
    profilePublic: true,
  });

  const handleSave = () => {
    if (!user) return;
    
    upsertUser({
      id: user.id,
      ...formData,
      preferences
    });
    
    toast.success('System configuration updated', {
      icon: '⚙️',
      className: 'glass'
    });
  };

  const tabs = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'account', label: 'Access Control', icon: Lock },
    { id: 'appearance', label: 'Interface', icon: Palette },
    { id: 'notifications', label: 'Signals', icon: Bell },
    { id: 'privacy', label: 'Security', icon: Shield },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">System Preferences</span>
              </div>
              <h1 className="text-4xl font-black text-white font-heading tracking-tight leading-none uppercase tracking-widest">
                User Configuration
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-brand-700 hover:text-white">Discard</Button>
              <Button 
                onClick={handleSave} 
                className="bg-brand-500 text-white h-12 px-8 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-500/20"
              >
                Apply Changes <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* Navigation Matrix */}
          <aside className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 group",
                    activeTab === tab.id 
                      ? "bg-brand-500 text-white shadow-2xl shadow-brand-500/20" 
                      : "text-brand-700 hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={cn("h-4 w-4", activeTab === tab.id ? "scale-110" : "group-hover:scale-110 transition-transform")} />
                    <span>{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <div className="h-1 w-1 rounded-full bg-white animate-ping" />}
                </button>
              );
            })}
            <div className="h-px bg-white/[0.05] my-6" />
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all">
              <LogOut className="h-4 w-4" />
              <span>Terminate Session</span>
            </button>
          </aside>

          {/* Configuration Matrix */}
          <main className="lg:col-span-9">
            <FadeIn key={activeTab}>
              <Card className="p-10 border-white/[0.08] bg-dark-900/40 relative overflow-hidden min-h-[600px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full pointer-events-none" />
                
                {activeTab === 'profile' && (
                  <div className="space-y-10">
                    <div className="flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-white/[0.05]">
                      <div className="relative group shrink-0">
                        <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-premium flex items-center justify-center text-4xl font-black text-white shadow-2xl relative z-10 overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${formData.name}&background=6366f1&color=fff&size=256`} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-dark-950 border border-brand-500/30 text-brand-500 hover:text-white hover:bg-brand-500 transition-all shadow-2xl z-20">
                          <Palette className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black text-white font-heading tracking-tight mb-2 uppercase">Biological Identity</h3>
                        <p className="text-sm text-brand-600 font-bold uppercase tracking-widest mb-6">Manage your public representation across the node.</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                          <Button variant="secondary" size="sm" className="bg-white/[0.05] border-white/[0.1] text-[10px] font-black uppercase tracking-widest px-6 h-10">Upload Artifact</Button>
                          <Button variant="ghost" size="sm" className="text-brand-800 hover:text-red-500 text-[10px] font-black uppercase tracking-widest h-10">Purge Data</Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em] px-1">Display Designation</label>
                        <input 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-14 rounded-2xl border border-white/[0.05] bg-dark-950/50 px-6 text-white font-bold placeholder:text-brand-900 focus:border-brand-500 outline-none transition-all"
                          placeholder="Project Lead"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em] px-1">Node Identifier</label>
                        <div className="relative">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-700 font-black">@</span>
                          <input 
                            value={formData.username} 
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full h-14 rounded-2xl border border-white/[0.05] bg-dark-950/50 pl-12 pr-6 text-white font-bold placeholder:text-brand-900 focus:border-brand-500 outline-none transition-all"
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em] px-1">Biography Protocol</label>
                        <textarea 
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          className="w-full h-40 rounded-2xl border border-white/[0.05] bg-dark-950/50 p-6 text-white font-medium placeholder:text-brand-900 focus:border-brand-500 outline-none transition-all resize-none"
                          placeholder="Tell us a bit about your research objectives..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] group hover:border-brand-500/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                          {preferences.theme === 'dark' ? <Moon className="h-7 w-7" /> : <Sun className="h-7 w-7" />}
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-white uppercase tracking-tight">Dark Atmosphere</h4>
                          <p className="text-xs text-brand-700 font-bold uppercase tracking-widest mt-1">High-contrast nocturnal interface.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setPreferences({...preferences, theme: (preferences.theme === 'dark' ? 'light' : 'dark') as 'dark' | 'light'})}
                        className={cn(
                          "w-16 h-8 rounded-full p-1.5 transition-all duration-500",
                          preferences.theme === 'dark' ? "bg-brand-500" : "bg-dark-950"
                        )}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-500 transform",
                          preferences.theme === 'dark' ? "translate-x-8" : "translate-x-0"
                        )} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] group hover:border-neon-cyan/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform">
                          <Volume2 className="h-7 w-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-white uppercase tracking-tight">Audio Feedback</h4>
                          <p className="text-xs text-brand-700 font-bold uppercase tracking-widest mt-1">Haptic-style sound stream during play.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setPreferences({...preferences, soundEnabled: !preferences.soundEnabled})}
                        className={cn(
                          "w-16 h-8 rounded-full p-1.5 transition-all duration-500",
                          preferences.soundEnabled ? "bg-neon-cyan" : "bg-dark-950"
                        )}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-500 transform",
                          preferences.soundEnabled ? "translate-x-8" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                      <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Signal Transmission</h4>
                        <p className="text-xs text-brand-700 font-bold uppercase tracking-widest mt-1">Weekly analytics and achievement alerts.</p>
                      </div>
                      <button 
                        onClick={() => setPreferences({...preferences, notificationsEnabled: !preferences.notificationsEnabled})}
                        className={cn(
                          "w-16 h-8 rounded-full p-1.5 transition-all duration-500",
                          preferences.notificationsEnabled ? "bg-brand-500" : "bg-dark-950"
                        )}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-500 transform",
                          preferences.notificationsEnabled ? "translate-x-8" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                      <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Node Visibility</h4>
                        <p className="text-xs text-brand-700 font-bold uppercase tracking-widest mt-1">Allow peers to observe your progress stream.</p>
                      </div>
                      <button 
                        onClick={() => setPreferences({...preferences, profilePublic: !preferences.profilePublic})}
                        className={cn(
                          "w-16 h-8 rounded-full p-1.5 transition-all duration-500",
                          preferences.profilePublic ? "bg-brand-500" : "bg-dark-950"
                        )}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-500 transform",
                          preferences.profilePublic ? "translate-x-8" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em] px-1">Registered Mail</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-900" />
                        <input 
                          disabled 
                          value={formData.email} 
                          className="w-full h-14 rounded-2xl border border-white/[0.05] bg-dark-950/20 pl-16 pr-6 text-brand-700 font-bold outline-none cursor-not-allowed"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-brand-900 uppercase italic tracking-tight">Primary email cannot be modified after verification.</p>
                    </div>
                    
                    <div className="pt-10 border-t border-white/[0.05] space-y-6">
                      <div className="flex items-center gap-4 text-red-500/40">
                        <Zap className="h-5 w-5 animate-pulse" />
                        <h4 className="text-sm font-black uppercase tracking-[0.2em]">Destructive Sector</h4>
                      </div>
                      <Button variant="secondary" className="w-full md:w-auto h-12 px-10 rounded-xl bg-red-500/10 border-red-500/20 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-xl">
                        Purge User Node
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </FadeIn>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};
