import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'glow';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-brand-500/10 text-brand-300 border-brand-500/20',
    secondary: 'bg-dark-600 text-dark-100 border-white/10',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    glow: 'bg-neon-violet/10 text-neon-violet border-neon-violet/30 shadow-[0_0_10px_rgba(139,92,246,0.3)]',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold transition-colors",
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
