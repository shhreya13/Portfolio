import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  once?: boolean;
  animationStepDuration?: number;
  className?: string;
}

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 12,
  pixelColor = '#ffffff',
  animationStepDuration =5,
  className = ""
}: PixelTransitionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const pixels = Array.from({ length: gridSize * gridSize });

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-0">{firstContent}</div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div className="absolute inset-0 z-10 pointer-events-none">
            <div 
              className="grid w-full h-full" 
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`
              }}
            >
              {pixels.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.05, 
                    delay: Math.random() * animationStepDuration 
                  }}
                  style={{ backgroundColor: pixelColor }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ delay: animationStepDuration  }}
      >
        {secondContent}
      </motion.div>
    </div>
  );
}