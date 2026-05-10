import React from 'react';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

export const FadeIn = ({ children, delay = 0, className, ...props }: React.HTMLAttributes<HTMLDivElement> & MotionProps & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.25, 0, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & MotionProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & MotionProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: [0.25, 0.25, 0, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverGlow = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & MotionProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
