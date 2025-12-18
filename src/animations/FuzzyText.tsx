import React from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
}

export default function FuzzyText({ 
  children, 
  baseIntensity = 10, 
  hoverIntensity = 10, 
  enableHover = true 
}: FuzzyTextProps) {
  return (
    <div className="relative group cursor-default">
      <svg className="absolute hidden">
        <filter id="fuzzyFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={baseIntensity * 50} />
        </filter>
        <filter id="fuzzyFilterHover">
          <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={hoverIntensity * 50} />
        </filter>
      </svg>
      
      <span className={`inline-block filter transition-all duration-300`} 
            style={{ filter: 'url(#fuzzyFilter)' }}>
        <span className={enableHover ? "group-hover:hidden" : ""}>
          {children}
        </span>
        {enableHover && (
          <span className="hidden group-hover:inline-block" style={{ filter: 'url(#fuzzyFilterHover)' }}>
            {children}
          </span>
        )}
      </span>
    </div>
  );
}