import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Shield, Lock, Brain, Users, AlertTriangle, BarChart3 } from 'lucide-react';
import Threads from '../animations/Threads'; 
import Dyselxia from '../assets/Dyselxia.png'
import MultiSig from '../assets/MultiSig.png'
import ESG from '../assets/ESG.png'
import Endsem from '../assets/Endsem.png'
import Women from '../assets/Women.png'
import Dropcare from '../assets/DropCare.png'

export default function ProjectsGallery() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const projects = [
    { icon: Users, title: 'DyselxiCore', description: 'This project is an AI-integrated dyslexia support platform featuring automated assessments, gamified literacy challenges, and a FastAPI-driven backend for personalized intervention tracking.', tech: ['TypeScript', 'Python(Fast Api)', 'React'], image: Dyselxia, github: 'https://github.com/shhreya13/DyslexiCore' },
    { icon: BarChart3, title: 'AI-Driven ESG Risk Assessment', description: 'Streamlit analytics dashboard for ESG risk analysis and sustainability metrics.', tech: ['Python', 'Streamlit', 'Tableau','NLP'], image: ESG, github: 'https://github.com/shhreya13/-AI-Driven-ESG-Risk-Assessment' },
    { icon: Lock, title: 'Multi-sig Treasury', description: 'Secure Move-based blockchain treasury with multi-signature authentication.', tech: ['Move', 'Blockchain', 'Smart Contracts'], image: MultiSig, github: 'https://github.com/shhreya13/Multi-sig-treasury' },
    { icon: Brain, title: 'EndSem Qb generator', description: 'This project is an automated Question Paper Generator built with Streamlit that extracts questions, images, and metadata from a Word-based Question Bank and maps them into a specific template according to a defined unit and Bloom Level logic', tech: ['Python', 'Streamlit', 'Jupyter'], image: Endsem, github: 'https://shhreya13-endsem-qb-endsem-lr8emn.streamlit.app/' },
    { icon: AlertTriangle, title: 'EmpowerHer', description: "Women's safety app with SOS alerts and voice activation for emergency situations.", tech: ['React Native', 'Firebase', 'Geolocation'], image:Women , github: 'https://shreyaaa.neocities.org/women/inde' },
    { icon: Shield, title: 'DropCare', description: 'Privacy-first delivery app with OTP masking technology for secure package handling.', tech: ['React', 'Node.js', 'MongoDB'], image: Dropcare, github: 'https://github.com/shhreya13/Dropsafe-backend' },
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#3d0808] relative overflow-hidden min-h-screen">
      
      {/* 1. Threads Layer - Using Silver/White color */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Threads 
          amplitude={1.2} 
          distance={0} 
          enableMouseInteraction={true} 
          color="#e2e8f0" 
        />
      </div>

      {/* 2. Dark Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#1a0303_100%)] z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#f1f5f9] uppercase mb-4"
          >
            Featured Projects
          </motion.h2>
          <div className="w-24 h-1.5 bg-[#f1f5f9] mx-auto rounded-full shadow-[0_0_15px_rgba(241,245,249,0.5)]" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isFocused = focusedIndex === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setFocusedIndex(index)}
                animate={{ 
                  scale: isFocused ? 1.05 : 1,
                  opacity: isFocused ? 1 : 0.7
                }}
                className="relative group h-full"
              >
                {/* Silver focus glow */}
                <AnimatePresence>
                  {isFocused && (
                    <motion.div 
                      layoutId="focusBorder"
                      className="absolute -inset-2 z-10 border border-[#f1f5f9]/30 rounded-2xl pointer-events-none shadow-[0_0_30px_rgba(241,245,249,0.15)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* --- THE ICY SILVER PROJECT CARD --- */}
                <div className="h-full bg-[#f8fafc] border border-white/20 rounded-2xl overflow-hidden flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent" />
                  </div>

                  <div className="flex-1 p-6 flex flex-col relative z-20">
                    <div className="flex items-start justify-between mb-4">
                      {/* Deep Maroon Icon Tile */}
                      <div className="w-12 h-12 rounded-xl bg-[#3d0808] flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                        <project.icon className="w-6 h-6 text-[#f8fafc]" />
                      </div>
                      
                      <div className="flex gap-2">
                        <a href={project.github} className="p-2 rounded-lg bg-black/5 hover:bg-black/10 text-[#3d0808] transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                        <a href={project.github} className="p-2 rounded-lg bg-black/5 hover:bg-black/10 text-[#3d0808] transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#1e293b] mb-2 uppercase tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-[#475569] leading-relaxed mb-6 flex-1 font-medium">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-[10px] font-black bg-[#3d0808] rounded-md text-[#f8fafc] uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}