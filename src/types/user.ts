export interface UserAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  total: number;
  percentage: number;
  timeTaken: number;
  createdAt: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  lastActive?: number;
  achievements: string[];
  attempts: UserAttempt[];
  createdQuizzes: string[]; // IDs of quizzes created by this user
  bio?: string;
  interests?: string[];
  preferences?: {
    theme: 'dark' | 'light';
    soundEnabled: boolean;
    notificationsEnabled: boolean;
    profilePublic: boolean;
  };
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
}
