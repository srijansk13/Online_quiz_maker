import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rectangular' }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/5 border border-white/5",
        variant === 'circular' ? 'rounded-full' : 'rounded-xl',
        className
      )}
    />
  );
};

export const QuizCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-white/5 bg-dark-800/50 p-4 space-y-4">
      <div className="flex gap-4">
        <Skeleton className="w-20 h-20 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
