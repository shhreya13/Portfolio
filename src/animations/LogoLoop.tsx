import React from 'react';
import { motion } from 'framer-motion';

export default function LogoLoop({ logos, speed = 40, direction = 'left', gap = 20 }) {
  if (!logos || logos.length === 0) return null;

  const loopLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-2 bg-black">
      <motion.div
        className="flex items-center"
        animate={{
          x: direction === 'left' ? [0, -2000] : [-2000, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ gap: `${gap}px`, width: 'max-content' }}
      >
        {loopLogos.map((logo, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 px-5 py-4 rounded-xl bg-black border border-[#ffffff] min-w-[240px] shadow-md shadow-red-900/5 hover:border-[#D72B3B] transition-colors"
          >
            {/* Reduced Logo Size */}
            <div className="text-3xl flex-shrink-0" style={{ color: '#ffffff' }}>
              {logo.node}
            </div>

            <div className="flex flex-col justify-center">
              {/* Scaled down Cream Text */}
              <h3 
                className="text-lg font-[900] italic leading-none tracking-tight uppercase mb-0.5" 
                style={{ 
                    fontFamily: "'Archivo Black', sans-serif",
                    color: '#ffffff' 
                }}
              >
                {logo.title}
              </h3>
              <div className="flex items-center gap-1">
                {/* Scaled down Maroon Label */}
                <span className="text-[8px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: '#D72B3B' }}>
                  Proficiency: 100%
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}