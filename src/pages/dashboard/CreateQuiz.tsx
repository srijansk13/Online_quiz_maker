import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useQuizStore } from '../../store/quizStore';
import type { Quiz } from '../../types/quiz';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FadeIn } from '../../animations/wrappers';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Settings2, 
  Image as ImageIcon, 
  Sparkles,
  Eye,
  Globe,
  Layers,
  ArrowRight,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const questionSchema = z.object({
  id: z.string(),
  text: z.string().min(5, 'Question text must be at least 5 characters'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).min(2, 'At least 2 options required'),
  correctOptionIndex: z.number().min(0),
  explanation: z.string().optional(),
  timeLimit: z.number().min(5).max(120),
});

const quizSchema = z.object({
  title: z.string().min(3, 'Title is too short').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  category: z.string().min(2, 'Category is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Expert']),
  isPublic: z.boolean(),
  questions: z.array(questionSchema).min(1, 'You must add at least one question'),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export const CreateQuiz: React.FC = () => {
  const { user } = useAuth();
  const { addQuiz } = useQuizStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'settings' | 'builder'>('settings');

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      difficulty: 'Intermediate',
      isPublic: true,
      questions: [
        {
          id: uuidv4(),
          text: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
          timeLimit: 30,
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const title = watch('title');

  const onSubmit = async (data: QuizFormValues) => {
    try {
      const newQuiz: Quiz = {
        id: uuidv4(),
        ...data,
        description: data.description || '',
        createdAt: Date.now(),
        authorId: user?.id || 'u1',
        attempts: 0,
        rating: 0,
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800'
      };
      
      addQuiz(newQuiz);
      toast.success('Asset deployed successfully!', { icon: '🚀', className: 'glass' });
      navigate('/dashboard');
    } catch (error) {
      toast.error('Deployment failed');
    }
  };

  const handleSetCorrectOption = (questionIndex: number, optionIndex: number) => {
    setValue(`questions.${questionIndex}.correctOptionIndex`, optionIndex);
  };

  return (
    <DashboardLayout>
      <FadeIn>
        {/* Futuristic Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="glow" size="sm" className="bg-brand-500/10 text-brand-400 border-brand-500/20 uppercase tracking-[0.2em] font-black text-[8px]">
                Deployment Module
              </Badge>
              <div className="h-px w-8 bg-white/10" />
              <span className="text-brand-700 text-[10px] font-black uppercase tracking-widest">Editor v4.0.2</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-none">
              {title || "Untitled_Project"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-brand-500 hover:text-white border-white/[0.05]" onClick={() => navigate('/dashboard')}>
              Discard
            </Button>
            <Button 
              size="lg"
              className="bg-brand-500 text-white shadow-2xl shadow-brand-500/20 h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs"
              onClick={handleSubmit(onSubmit)} 
              isLoading={isSubmitting}
            >
              Publish Asset <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Builder Navigation */}
        <div className="flex items-center p-1.5 bg-white/[0.03] rounded-2xl border border-white/[0.05] backdrop-blur-xl w-fit mb-12">
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300",
              activeTab === 'settings' 
                ? "bg-brand-500 text-white shadow-lg" 
                : "text-brand-500 hover:text-white"
            )}
          >
            <Settings2 className="h-4 w-4" />
            <span>01. Configuration</span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300",
              activeTab === 'builder' 
                ? "bg-brand-500 text-white shadow-lg" 
                : "text-brand-500 hover:text-white"
            )}
          >
            <Layers className="h-4 w-4" />
            <span>02. Architecture</span>
            <Badge className="ml-2 bg-dark-950/50 text-[10px] font-black">{fields.length}</Badge>
          </button>
        </div>

        <form className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'settings' ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20"
              >
                <div className="lg:col-span-2 space-y-10">
                  <Card className="p-10 border-white/[0.08] bg-dark-900/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="flex items-center gap-3 mb-10">
                      <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                        <Sparkles className="h-5 w-5 text-brand-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white font-heading tracking-tight">Project Identity</h3>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="group">
                        <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-brand-400 transition-colors">Asset Title</label>
                        <input
                          className="w-full bg-transparent border-b-2 border-white/[0.05] focus:border-brand-500 transition-all py-4 text-3xl font-black text-white placeholder:text-brand-800 outline-none"
                          placeholder="Project name here..."
                          {...register('title')}
                        />
                        {errors.title && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2">{errors.title.message}</p>}
                      </div>
                      
                      <div className="group">
                        <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-3 block group-focus-within:text-brand-400 transition-colors">Extended Description</label>
                        <textarea
                          className="w-full h-40 rounded-2xl border border-white/[0.05] bg-dark-950/30 p-6 text-lg text-brand-100 placeholder:text-brand-800 focus:border-brand-500 transition-all outline-none resize-none"
                          placeholder="Briefly describe the learning objectives..."
                          {...register('description')}
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-10 border-white/[0.08] bg-dark-900/40">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="h-10 w-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
                        <Target className="h-5 w-5 text-neon-cyan" />
                      </div>
                      <h3 className="text-2xl font-black text-white font-heading tracking-tight">Classification</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="group">
                        <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-3 block">Primary Domain</label>
                        <input
                          className="w-full h-14 rounded-xl border border-white/[0.05] bg-dark-950/30 px-5 text-white placeholder:text-brand-800 focus:border-brand-500 outline-none transition-all"
                          placeholder="e.g. Computer Science"
                          {...register('category')}
                        />
                      </div>
                      
                      <div className="group">
                        <label className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-3 block">Skill Requirement</label>
                        <select
                          className="w-full h-14 rounded-xl border border-white/[0.05] bg-dark-950/30 px-5 text-white focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer"
                          {...register('difficulty')}
                        >
                          <option value="Beginner">Level 01: Junior</option>
                          <option value="Intermediate">Level 02: Architect</option>
                          <option value="Expert">Level 03: Specialist</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-10">
                  <Card className="p-8 border-white/[0.08] bg-dark-900/40 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-6">Visual Interface</h3>
                    <div className="aspect-[4/3] w-full rounded-[2rem] border-2 border-dashed border-white/[0.08] bg-dark-950/50 flex flex-col items-center justify-center text-brand-700 hover:border-brand-500/40 hover:text-brand-400 transition-all cursor-pointer group/upload overflow-hidden relative">
                      <ImageIcon className="h-10 w-10 mb-4 group-hover/upload:scale-110 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">Inject Cover Art</span>
                      <p className="text-[10px] font-bold mt-2 opacity-50">PNG, WEBP, AVIF (1920x1080)</p>
                    </div>
                  </Card>

                  <Card className="p-8 border-white/[0.08] bg-dark-900/40">
                    <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-8">Access Protocol</h3>
                    <div className="space-y-6">
                      <label className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] cursor-pointer group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-all">
                            <Globe className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-white uppercase tracking-widest">Public Asset</p>
                            <p className="text-[10px] font-bold text-brand-600 uppercase tracking-tight">Discoverable by all nodes</p>
                          </div>
                        </div>
                        <input type="checkbox" className="h-5 w-5 rounded-md bg-dark-950 border-white/[0.1] text-brand-500 focus:ring-brand-500" {...register('isPublic')} />
                      </label>
                      
                      <div className="p-4 rounded-2xl bg-brand-500/[0.03] border border-brand-500/10">
                        <div className="flex items-center gap-3 text-brand-400 mb-2">
                          <Eye className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Global Status</span>
                        </div>
                        <p className="text-[10px] font-bold text-brand-600 uppercase leading-relaxed">This asset will be indexed in the global repository upon deployment.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10 max-w-4xl mx-auto pb-40"
              >
                {fields.map((field, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={field.id}
                  >
                    <Card className="p-10 border-white/[0.08] bg-dark-900/40 relative group overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-500/20 group-hover:bg-brand-500 transition-all" />
                      
                      <div className="flex items-start justify-between mb-10">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-dark-950 border border-white/[0.08] flex items-center justify-center text-xl font-black text-brand-500 shadow-inner">
                            {(index + 1).toString().padStart(2, '0')}
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-1">Sequence Point</h4>
                            <h3 className="text-xl font-black text-white font-heading uppercase tracking-widest">Question Segment</h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col items-end">
                            <label className="text-[10px] font-black text-brand-700 uppercase tracking-widest mb-2">Time Limit (s)</label>
                            <input 
                              type="number" 
                              className="w-20 h-10 rounded-xl border border-white/[0.05] bg-dark-950/50 px-3 text-center text-sm font-black text-white outline-none focus:border-brand-500 transition-all"
                              {...register(`questions.${index}.timeLimit`, { valueAsNumber: true })}
                            />
                          </div>
                          
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-10">
                        <textarea
                          className="w-full bg-transparent border-b border-white/[0.08] py-4 text-2xl font-bold text-white placeholder:text-brand-900 focus:border-brand-500 outline-none transition-all resize-none min-h-[100px]"
                          placeholder="Enter your question text..."
                          {...register(`questions.${index}.text`)}
                        />
                        {errors.questions?.[index]?.text && (
                          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.questions[index]?.text?.message}</p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[0, 1, 2, 3].map((optIndex) => {
                            const isCorrect = watch(`questions.${index}.correctOptionIndex`) === optIndex;
                            return (
                              <div 
                                key={optIndex} 
                                className={cn(
                                  "relative group/opt p-2 rounded-[1.5rem] border-2 transition-all duration-300",
                                  isCorrect 
                                    ? "bg-green-500/10 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]" 
                                    : "bg-dark-950/30 border-white/[0.05] focus-within:border-brand-500"
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleSetCorrectOption(index, optIndex)}
                                  className={cn(
                                    "absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl border flex items-center justify-center transition-all z-10",
                                    isCorrect 
                                      ? "bg-green-500 border-green-400 text-white shadow-lg" 
                                      : "bg-dark-900 border-white/20 text-brand-800 hover:border-brand-500"
                                  )}
                                >
                                  {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <div className="h-2 w-2 rounded-full bg-current" />}
                                </button>
                                <div className="flex items-center gap-4 px-4">
                                  <span className="text-[10px] font-black text-brand-800 uppercase group-focus-within/opt:text-brand-500 transition-colors">0{optIndex + 1}</span>
                                  <input
                                    type="text"
                                    className="w-full h-12 bg-transparent text-sm font-bold text-white placeholder:text-brand-900 focus:outline-none"
                                    placeholder={`Option payload ${optIndex + 1}`}
                                    {...register(`questions.${index}.options.${optIndex}`)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                <button
                  type="button"
                  onClick={() => append({ id: uuidv4(), text: '', options: ['', '', '', ''], correctOptionIndex: 0, timeLimit: 30 })}
                  className="w-full h-24 rounded-[2rem] border-2 border-dashed border-brand-500/30 bg-brand-500/[0.03] flex items-center justify-center gap-4 text-brand-400 font-black uppercase tracking-[0.2em] text-sm hover:bg-brand-500/10 hover:border-brand-500 transition-all group shadow-2xl"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-500 text-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                    <Plus className="h-6 w-6" />
                  </div>
                  Append New Segment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </FadeIn>
    </DashboardLayout>
  );
};
