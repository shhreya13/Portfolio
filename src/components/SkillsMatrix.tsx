import React, { useState } from 'react';
import CircularGallery from '../animations/CircularGallery';
import LightRays from '../animations/LightRays';

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('technical');

  const technicalSkills = [
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/python.png', text: 'Python | 80%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/java-coffee-cup-logo.png', text: 'Java | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/javascript.png', text: 'JavaScript | 80%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/html-5.png', text: 'HTML | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/css3.png', text: 'CSS | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/react-native.png', text: 'React.js | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/programming.png', text: 'Node.js | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/tableau-software.png', text: 'Tableau | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/visual-studio.png', text: 'VS Code | 100%' },
  ];

  const softSkills = [
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/brain.png', text: 'Problem Solving | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/comments.png', text: 'Communication | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/alarm-clock.png', text: 'Time Mgmt | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/conference-call.png', text: 'Teamwork | 100%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/process.png', text: 'Agile | 90%' },
    { image: 'https://img.icons8.com/ios-filled/250/ffffff/design.png', text: 'UI/UX | 100%' },
  ];

  return (
    <section id="skills" className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-10">
      
      {/* --- LAYER 0: THE LIGHT RAYS (BACKGROUND) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#8B1538"
          raysSpeed={0.5}
          lightSpread={0.6}
          rayLength={1.2}
          pulsating={true}
          followMouse={true}
          mouseInfluence={0.05}
        />
        <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, black 90%)" />
      </div>

      {/* --- LAYER 1: NAVIGATION --- */}
      {/* Changed mb-12 to mb-2 to decrease distance to gallery */}
      <div className="relative z-20 flex flex-col md:flex-row gap-6 md:gap-16 mb-2 items-center">
        <button 
          onClick={() => setActiveTab('technical')}
          className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-all duration-500 ${
            activeTab === 'technical' 
              ? 'text-white scale-105 drop-shadow-[0_0_20px_rgba(139,21,56,0.8)]' 
              : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          Technical
        </button>

        <div className="hidden md:block w-[1px] h-10 bg-zinc-600/50 rotate-[20deg]" />

        <button 
          onClick={() => setActiveTab('non-technical')}
          className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-all duration-500 ${
            activeTab === 'non-technical' 
              ? 'text-white scale-105 drop-shadow-[0_0_20px_rgba(139,21,56,0.8)]' 
              : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          Professional
        </button>
      </div>

      {/* --- LAYER 2: CIRCULAR GALLERY --- */}
      <div className="relative z-10 w-full h-[450px]">
        <CircularGallery 
          key={activeTab} 
          items={activeTab === 'technical' ? technicalSkills : softSkills} 
          bend={1.2} 
          font="900 48px Inter, sans-serif" 
        />
      </div>

      {/* Help Hint */}
      <div className="relative z-20 mt-2">
        <p className="text-[8px] uppercase tracking-[1em] text-zinc-600 font-bold animate-pulse">
          Drag horizontally
        </p>
      </div>

    </section>
  );
}