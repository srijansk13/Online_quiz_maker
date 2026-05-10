import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FadeIn, StaggerContainer, StaggerItem } from '../../animations/wrappers';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data.email, data.name, data.password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account.');
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Account created with Google!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google signup failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Password strength logic
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, score);
  };

  const strength = calculateStrength(passwordValue);
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-brand-500', 'bg-green-500'];

  return (
    <div className="flex min-h-screen bg-dark-900 overflow-hidden relative">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-600/20 blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-neon-cyan/10 blur-[150px] mix-blend-screen animate-blob animation-delay-2000" />

      {/* Left Visual Section */}
      <div className="relative hidden w-full flex-1 lg:block overflow-hidden border-r border-white/5 order-2 lg:order-1">
        <div className="absolute inset-0 bg-dark-800" />
        <div className="absolute inset-0 bg-gradient-premium opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] mix-blend-overlay opacity-20 object-cover" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <FadeIn delay={0.3} className="w-full max-w-lg">
            <h3 className="text-4xl font-bold text-white font-heading mb-6">
              Create. Challenge.<br />
              <span className="text-gradient">Conquer.</span>
            </h3>
            <p className="text-lg text-brand-100">
              Join thousands of creators building the next generation of interactive quizzes and assessments.
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl flex flex-col items-center">
                <span className="text-3xl font-bold text-white">10k+</span>
                <span className="text-sm text-brand-200">Creators</span>
              </div>
              <div className="glass-card p-4 rounded-xl flex flex-col items-center">
                <span className="text-3xl font-bold text-white">1M+</span>
                <span className="text-sm text-brand-200">Quizzes Taken</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:flex-none lg:w-[480px] xl:w-[560px] relative z-10 order-1 lg:order-2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <FadeIn>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-8 w-8 rounded-lg bg-gradient-premium flex items-center justify-center">
                <span className="text-white font-bold font-heading text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold font-heading tracking-tight text-white">Quizify</span>
            </div>
            
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-white font-heading">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-brand-200">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-neon-cyan hover:text-brand-300 transition-colors">
                Sign in here
              </Link>
            </p>
          </FadeIn>

          <StaggerContainer className="mt-8">
            <StaggerItem>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  leftIcon={<User className="h-5 w-5" />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail className="h-5 w-5" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="space-y-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="h-5 w-5" />}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                  
                  {passwordValue.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-1 h-1.5">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className={`flex-1 rounded-full transition-colors duration-300 ${
                              index < strength ? strengthColors[strength - 1] : 'bg-dark-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-brand-200 w-16 text-right">
                        {strength === 0 ? 'Weak' : strength === 1 ? 'Fair' : strength === 2 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  fullWidth
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="mt-6"
                >
                  Create account
                </Button>
              </form>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-dark-900 px-2 text-dark-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    type="button"
                    fullWidth
                    onClick={handleGoogleSignup}
                    isLoading={isGoogleLoading}
                    leftIcon={
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    }
                  >
                    Google
                  </Button>
                  <Button variant="secondary" type="button" fullWidth leftIcon={<Github className="h-5 w-5" />}>
                    GitHub
                  </Button>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};
