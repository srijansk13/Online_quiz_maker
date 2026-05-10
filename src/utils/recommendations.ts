import { MOCK_QUIZZES } from '../data/mockData';
import type { Quiz } from '../types/quiz';

/**
 * Returns a stable "Daily Challenge" quiz based on the current date.
 */
export const getDailyChallenge = (): Quiz => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Deterministic pick based on day of year
  const index = dayOfYear % MOCK_QUIZZES.length;
  return MOCK_QUIZZES[index];
};

/**
 * Returns personalized quiz recommendations based on user interests.
 */
export const getRecommendations = (interests: string[] = [], limit: number = 3): Quiz[] => {
  if (interests.length === 0) {
    // Default to trending/high attempts if no interests
    return [...MOCK_QUIZZES].sort((a, b) => (b.attempts || 0) - (a.attempts || 0)).slice(0, limit);
  }
  
  const recommended = MOCK_QUIZZES.filter(quiz => 
    interests.some(interest => quiz.category.toLowerCase() === interest.toLowerCase())
  );
  
  if (recommended.length < limit) {
    // Fill with trending if not enough interest-based matches
    const extra = MOCK_QUIZZES.filter(q => !recommended.includes(q))
      .sort((a, b) => (b.attempts || 0) - (a.attempts || 0));
    return [...recommended, ...extra].slice(0, limit);
  }
  
  return recommended.slice(0, limit);
};
