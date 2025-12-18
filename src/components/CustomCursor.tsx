import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="hidden lg:block fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9999] bg-white rounded-full mix-blend-difference"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0, // 0 duration makes it stick to the mouse instantly
      }}
    />
  );
}