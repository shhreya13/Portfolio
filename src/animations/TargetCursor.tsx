import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
}

export default function TargetCursor({ 
  spinDuration = 2, 
  hideDefaultCursor = true,
  parallaxOn = true 
}: TargetCursorProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth spring physics for the cursor
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over a target
      const target = e.target as HTMLElement;
      if (target.closest('.cursor-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, hideDefaultCursor]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        translateX: cursorX,
        translateY: cursorY,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Outer Ring */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#D72B3B' : '#8B1538'
        }}
        transition={{ 
          rotate: { duration: spinDuration, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        className="w-8 h-8 -ml-4 -mt-4 border-2 border-dashed rounded-full opacity-70"
      />
      
      {/* Center Dot */}
      <motion.div 
        animate={{
          scale: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? '#D72B3B' : '#ffffff'
        }}
        className="absolute top-0 left-0 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full"
      />
    </motion.div>
  );
}