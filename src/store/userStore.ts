import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, UserAttempt } from '../types/user';
import { calculateLevel } from '../utils/progression';

interface UserStoreState {
  users: Record<string, UserProfile>;
  activeUserId: string | null;
  
  // Actions
  setActiveUser: (userId: string | null) => void;
  upsertUser: (profile: Partial<UserProfile> & { id: string }) => void;
  addXp: (userId: string, amount: number) => void;
  addAttempt: (userId: string, attempt: UserAttempt) => void;
  updateStreak: (userId: string) => void;
  unlockAchievement: (userId: string, achievementId: string) => void;
  getUserData: (userId: string | null) => UserProfile | null;
}

const DEFAULT_PROFILE = (id: string, email: string, name: string): UserProfile => ({
  id,
  email,
  name,
  username: name.toLowerCase().replace(/\s+/g, '_'),
  xp: 0,
  level: 1,
  streak: 0,
  achievements: [],
  attempts: [],
  createdQuizzes: [],
  lastActive: Date.now(),
  bio: '',
  interests: [],
  preferences: {
    theme: 'dark',
    soundEnabled: true,
    notificationsEnabled: true,
    profilePublic: true,
  },
});

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      users: {},
      activeUserId: null,

      setActiveUser: (userId) => set({ activeUserId: userId }),

      upsertUser: (profile) => set((state) => {
        const existingUser = state.users[profile.id];
        const updatedUser = existingUser 
          ? { ...existingUser, ...profile }
          : { ...DEFAULT_PROFILE(profile.id, profile.email || '', profile.name || ''), ...profile };
        
        return {
          users: {
            ...state.users,
            [profile.id]: updatedUser
          }
        };
      }),

      addXp: (userId, amount) => set((state) => {
        const user = state.users[userId];
        if (!user) return state;

        const newXp = user.xp + amount;
        const newLevel = calculateLevel(newXp);

        return {
          users: {
            ...state.users,
            [userId]: {
              ...user,
              xp: newXp,
              level: newLevel
            }
          }
        };
      }),

      addAttempt: (userId, attempt) => set((state) => {
        const user = state.users[userId];
        if (!user) return state;

        // Prevent duplicate attempts with same ID
        if (user.attempts.some(a => a.id === attempt.id)) return state;

        const xpEarned = Math.floor(attempt.percentage * 1.5);
        const newXp = user.xp + xpEarned;
        const newLevel = calculateLevel(newXp);

        return {
          users: {
            ...state.users,
            [userId]: {
              ...user,
              attempts: [attempt, ...user.attempts],
              xp: newXp,
              level: newLevel,
              lastActive: Date.now()
            }
          }
        };
      }),

      updateStreak: (userId) => set((state) => {
        const user = state.users[userId];
        if (!user) return state;

        const now = Date.now();
        const lastActive = user.lastActive || 0;
        const oneDay = 24 * 60 * 60 * 1000;
        
        let newStreak = user.streak;
        if (now - lastActive > oneDay && now - lastActive < oneDay * 2) {
          newStreak += 1;
        } else if (now - lastActive >= oneDay * 2) {
          newStreak = 1;
        } else if (user.streak === 0) {
          newStreak = 1;
        }

        return {
          users: {
            ...state.users,
            [userId]: {
              ...user,
              streak: newStreak,
              lastActive: now
            }
          }
        };
      }),

      unlockAchievement: (userId, achievementId) => set((state) => {
        const user = state.users[userId];
        if (!user || user.achievements.includes(achievementId)) return state;

        return {
          users: {
            ...state.users,
            [userId]: {
              ...user,
              achievements: [...user.achievements, achievementId]
            }
          }
        };
      }),

      getUserData: (userId) => {
        if (!userId) return null;
        return get().users[userId] || null;
      }
    }),
    {
      name: 'quizify-multi-user-storage',
    }
  )
);
