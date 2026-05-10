import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>, MotionProps {
  glass?: boolean;
  hoverGlow?: boolean;
  glowColor?: 'cyan' | 'violet' | 'orange' | 'green';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, hoverGlow = false, glowColor = 'violet', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/5 bg-dark-800/50 p-6 shadow-xl",
          glass && "backdrop-blur-xl",
          hoverGlow && "transition-all duration-300",
          hoverGlow && glowColor === 'violet' && "hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:border-neon-violet/30",
          hoverGlow && glowColor === 'cyan' && "hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:border-neon-cyan/30",
          hoverGlow && glowColor === 'orange' && "hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:border-orange-500/30",
          hoverGlow && glowColor === 'green' && "hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:border-green-500/30",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
