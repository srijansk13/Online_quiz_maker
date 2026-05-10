export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  timeLimit?: number; // in seconds
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  coverImage?: string;
  questions: Question[];
  isPublic: boolean;
  createdAt: number;
  authorId: string;
  attempts?: number;
  rating?: number;
  timeLimit?: number; // in seconds
}

export const QUIZ_TYPES_VERSION = '1.0.0';
