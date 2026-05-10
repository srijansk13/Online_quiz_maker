/**
 * Progression Utility for Quizify
 * Handles Level and XP calculations consistently across the app.
 */

export const XP_PER_LEVEL = 500;

/**
 * Calculate level based on XP
 * Level 1: 0 - 499
 * Level 2: 500 - 999
 * etc.
 * Or a more dynamic curve:
 */
export const calculateLevel = (xp: number): number => {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 800) return 4;
  if (xp < 1200) return 5;
  
  // Exponential growth for higher levels
  // level = floor(sqrt(xp / 50)) + 1 approximately
  // But let's stick to the user's specific request for early levels
  // and then a predictable curve.
  
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

export const getXpForLevel = (level: number): number => {
  if (level === 1) return 0;
  if (level === 2) return 100;
  if (level === 3) return 250;
  if (level === 4) return 500;
  if (level === 5) return 800;
  
  return Math.pow(level - 1, 2) * 50;
};

export const getXpProgress = (xp: number) => {
  const currentLevel = calculateLevel(xp);
  const nextLevel = currentLevel + 1;
  
  const currentLevelMinXp = getXpForLevel(currentLevel);
  const nextLevelMinXp = getXpForLevel(nextLevel);
  
  const totalXpInLevel = nextLevelMinXp - currentLevelMinXp;
  const xpEarnedInLevel = xp - currentLevelMinXp;
  
  const percentage = Math.min(Math.max((xpEarnedInLevel / totalXpInLevel) * 100, 0), 100);
  
  return {
    currentLevel,
    nextLevel,
    currentLevelMinXp,
    nextLevelMinXp,
    xpEarnedInLevel,
    totalXpInLevel,
    percentage
  };
};

export const getXpReward = (difficulty: string, score: number, total: number): number => {
  const baseMultipliers: Record<string, number> = {
    'Beginner': 10,
    'Intermediate': 20,
    'Advanced': 35,
    'Expert': 50
  };
  
  const multiplier = baseMultipliers[difficulty] || 10;
  const baseReward = score * multiplier;
  
  // Bonus for perfect score
  const perfectBonus = score === total && total > 0 ? 100 : 0;
  
  return baseReward + perfectBonus;
};
