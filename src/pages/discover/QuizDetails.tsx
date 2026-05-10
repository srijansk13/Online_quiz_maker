import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { FadeIn } from '../../animations/wrappers';
import { 
  Play, 
  Clock, 
  HelpCircle, 
  Trophy, 
  Calendar, 
  Share2, 
  Bookmark,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

export const QuizDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { getQuizById } = useQuizStore();
  const quiz = getQuizById(id || '');

  if (!quiz) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Quiz Not Found</h2>
        <p className="text-brand-300 mb-6">The quiz you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
      </div>
    );
  }

  const startQuiz = () => {
    navigate(`/play/${quiz.id}`);
  };

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header Hero Area */}
        <section className="container mx-auto px-6 mb-12 relative z-10">
          <div className="absolute top-[-10%] left-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-600/10 blur-[120px] mix-blend-screen pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Left Col - Details */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="glow">{quiz.category}</Badge>
                  <Badge variant={quiz.difficulty === 'Expert' ? 'danger' : 'warning'}>{quiz.difficulty}</Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">
                  {quiz.title}
                </h1>
                
                <p className="text-xl text-brand-200 mb-8 leading-relaxed">
                  {quiz.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-brand-300 border-t border-white/10 pt-8 mt-8">
                  <div className="flex flex-col">
                    <p className="text-sm text-white font-medium">{quiz.authorId || 'System'}</p>
                    <p className="text-xs">Creator</p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-white font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {quiz.rating}
                    </span>
                    <span className="text-xs">({((quiz.attempts || 0) / 10).toFixed(0)} reviews)</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-white font-medium flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-brand-400" /> {(quiz.attempts || 0).toLocaleString()}
                    </span>
                    <span className="text-xs">Attempts</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-white font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-brand-400" /> {format(quiz.createdAt, 'MMM d, yyyy')}
                    </span>
                    <span className="text-xs">Published</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Col - Action Card */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.2} className="sticky top-32">
                <Card hoverGlow glowColor="cyan" className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-dark-900/50 rounded-xl p-4 border border-white/5 text-center">
                      <HelpCircle className="h-6 w-6 text-brand-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold font-heading text-white">{quiz.questions.length}</p>
                      <p className="text-xs text-brand-300 uppercase tracking-wider">Questions</p>
                    </div>
                    <div className="bg-dark-900/50 rounded-xl p-4 border border-white/5 text-center">
                      <Clock className="h-6 w-6 text-neon-cyan mx-auto mb-2" />
                      <p className="text-2xl font-bold font-heading text-white">{(quiz.timeLimit || 600) / 60}</p>
                      <p className="text-xs text-brand-300 uppercase tracking-wider">Minutes</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      fullWidth 
                      size="lg" 
                      onClick={startQuiz}
                      className="text-lg shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                    >
                      <Play className="h-5 w-5 mr-2 fill-current" /> Start Quiz Now
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="secondary" fullWidth leftIcon={<Bookmark className="h-4 w-4" />}>
                        Save
                      </Button>
                      <Button variant="secondary" fullWidth leftIcon={<Share2 className="h-4 w-4" />}>
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white mb-4">Rewards for completing:</h4>
                    <div className="flex items-center gap-3 bg-dark-900/50 rounded-xl p-3 border border-white/5">
                      <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                        <Star className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">+500 XP</p>
                        <p className="text-xs text-brand-300">Completion Bonus</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
