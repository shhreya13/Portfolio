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
    { icon: Users, title: 'DyselxiCore', description: 'AI-integrated dyslexia support platform featuring automated assessments and gamified literacy challenges.', tech: ['TypeScript', 'Python', 'React'], image: Dyselxia, github: 'https://github.com/shhreya13/DyslexiCore' },
    { icon: BarChart3, title: 'AI ESG Risk', description: 'Streamlit analytics dashboard for ESG risk analysis and sustainability metrics using NLP.', tech: ['Python', 'Streamlit', 'NLP'], image: ESG, github: 'https://github.com/shhreya13/-AI-Driven-ESG-Risk-Assessment' },
    { icon: Lock, title: 'Multi-sig Treasury', description: 'Secure Move-based blockchain treasury with multi-signature authentication.', tech: ['Move', 'Blockchain', 'Contracts'], image: MultiSig, github: 'https://github.com/shhreya13/Multi-sig-treasury' },
    { icon: Brain, title: 'EndSem QB Gen', description: 'Automated Question Paper Generator extracting data from Word docs based on Bloom Level logic.', tech: ['Python', 'Streamlit', 'Jupyter'], image: Endsem, github: 'https://shhreya13-endsem-qb-endsem-lr8emn.streamlit.app/' },
    { icon: AlertTriangle, title: 'EmpowerHer', description: "Women's safety app with SOS alerts and voice activation for emergency situations.", tech: ['React Native', 'Firebase'], image: Women , github: 'https://shreyaaa.neocities.org/women/inde' },
    { icon: Shield, title: 'DropCare', description: 'Privacy-first delivery app with OTP masking technology for secure package handling.', tech: ['React', 'Node.js', 'MongoDB'], image: Dropcare, github: 'https://github.com/shhreya13/Dropsafe-backend' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#3d0808] relative overflow-hidden min-h-screen">
      
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Threads amplitude={1.2} distance={0} enableMouseInteraction={true} color="#e2e8f0" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#1a0303_100%)] z-[1] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-12">
          {/* Reduced from text-4xl/5xl to text-2xl/3xl */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-2xl md:text-3xl font-black italic tracking-tighter text-[#f1f5f9] uppercase mb-3"
          >
            Featured Projects
          </motion.h2>
          <div className="w-16 h-1 bg-[#f1f5f9] mx-auto rounded-full shadow-[0_0_15px_rgba(241,245,249,0.5)]" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const isFocused = focusedIndex === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setFocusedIndex(index)}
                animate={{ 
                  scale: isFocused ? 1.02 : 1,
                  opacity: isFocused ? 1 : 0.8
                }}
                className="relative group h-full"
              >
                <AnimatePresence>
                  {isFocused && (
                    <motion.div 
                      layoutId="focusBorder"
                      className="absolute -inset-1.5 z-10 border border-[#f1f5f9]/20 rounded-xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                <div className="h-full bg-[#f8fafc] border border-white/20 rounded-xl overflow-hidden flex flex-col relative shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent" />
                  </div>

                  {/* Reduced padding from p-6 to p-5 */}
                  <div className="flex-1 p-5 flex flex-col relative z-20">
                    <div className="flex items-start justify-between mb-3">
                      {/* Scaled down icon tile */}
                      <div className="w-9 h-9 rounded-lg bg-[#3d0808] flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                        <project.icon className="w-4 h-4 text-[#f8fafc]" />
                      </div>
                      
                      <div className="flex gap-1.5">
                        <a href={project.github} className="p-1.5 rounded-md bg-black/5 hover:bg-black/10 text-[#3d0808] transition-colors">
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        <a href={project.github} className="p-1.5 rounded-md bg-black/5 hover:bg-black/10 text-[#3d0808] transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Title reduced from text-xl to text-base */}
                    <h3 className="text-base font-bold text-[#1e293b] mb-1.5 uppercase tracking-tight">
                      {project.title}
                    </h3>
                    
                    {/* Description reduced from text-sm to text-[12px] */}
                    <p className="text-[12px] text-[#475569] leading-snug mb-4 flex-1 font-medium">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, i) => (
                        /* Tag text reduced from 10px to 8px */
                        <span key={i} className="px-2 py-0.5 text-[8px] font-black bg-[#3d0808] rounded text-[#f8fafc] uppercase tracking-wider">
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