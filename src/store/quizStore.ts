import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_QUIZZES } from '../data/mockData';
import type { Quiz } from '../types/quiz';

interface QuizState {
  quizzes: Quiz[];
  currentDraft: Partial<Quiz> | null;
  
  // Actions
  setQuizzes: (quizzes: Quiz[]) => void;
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (id: string, updates: Partial<Quiz>) => void;
  deleteQuiz: (id: string) => void;
  getQuizById: (id: string) => Quiz | undefined;
  
  // Draft Actions
  setDraft: (draft: Partial<Quiz>) => void;
  updateDraft: (updates: Partial<Quiz>) => void;
  clearDraft: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizzes: MOCK_QUIZZES,
      currentDraft: null,

      setQuizzes: (quizzes) => set({ quizzes }),
      
      addQuiz: (quiz) => set((state) => ({ 
        quizzes: [quiz, ...state.quizzes] 
      })),

      updateQuiz: (id, updates) => set((state) => ({
        quizzes: state.quizzes.map(q => q.id === id ? { ...q, ...updates } : q)
      })),

      deleteQuiz: (id) => set((state) => ({
        quizzes: state.quizzes.filter(q => q.id !== id)
      })),

      getQuizById: (id) => get().quizzes.find(q => q.id === id),

      setDraft: (draft) => set({ currentDraft: draft }),
      
      updateDraft: (updates) => set((state) => ({ 
        currentDraft: { ...state.currentDraft, ...updates } 
      })),
      
      clearDraft: () => set({ currentDraft: null }),
    }),
    {
      name: 'quizify-quiz-storage',
    }
  )
);
