import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Users } from 'lucide-react';

// --- Threads Component (Optimized for Black BG) ---
const Threads: React.FC<{ color?: string }> = ({ color = "#8B1538" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const lines = Array.from({ length: 20 }, (_, i) => ({
      y: (canvas.height / 20) * i,
      speed: 0.0003 + Math.random() * 0.0005, 
      offset: Math.random() * Math.PI * 2,
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;         
      ctx.globalAlpha = 0.18; // Slightly increased for visibility on black
      
      lines.forEach((line) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          let wave = Math.sin(x * 0.004 + time * line.speed + line.offset) * 25;
          let y = line.y + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default function ExperienceTimeline() {
  const experiences = [
    { 
      icon: ShieldCheck, 
      title: 'Cybersecurity & Generative AI Intern', 
      company: 'VOIS & Vodafone Idea Foundation', 
      period: 'Dec 2025- Jan 2026 (Ongoing)', 
      description: 'Exploring the intersection of GenAI and security to identify vulnerabilities and enhance threat detection mechanisms.' 
    },
    { 
      icon: Cloud, 
      title: 'MS Elevate Azure Intern', 
      company: 'Microsoft (AICTE)', 
      period: 'Dec 2025- Jan 2026 (Ongoing)', 
      description: 'Upskilling in cloud architecture, deploying scalable solutions, and mastering Azure services through the Microsoft Elevate program.' 
    },
    { icon: Briefcase, title: 'AI Intern', company: 'Infosys', period: 'Sep 2025 - Dec 2025', description: 'Developed AI/ML pipelines and NLP models for automated text extraction.' },
    { icon: Briefcase, title: 'Java Developer Intern', company: 'VaultofCodes', period: 'Jul-Aug 2025', description: 'Developed Java backend features and APIs to support dynamic web applications.' },
    { icon: Award, title: '1M1B Green Skill Intern', company: 'Top Intern', period: 'Aug 2025 - Sep 2025', description: 'Selected as Top Intern; applied sustainable technology practices for environmental impact.' },
    { icon: Users, title: 'Campus Ambassador', company: 'E-Cell, IIT Bombay', period: 'Jun 2025 - Nov 2025', description: 'Led outreach campaigns and startup promotions to 1,000+ students.' },
  ];

  return (
    // Background changed to bg-black
    <section id="experience" className="relative py-24 px-4 bg-black overflow-hidden">
      {/* Darker Vignette for a clean look */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] pointer-events-none" />
      
      <Threads color="#8B1538" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight uppercase italic">Experience Timeline</h2>
          <div className="w-24 h-1.5 bg-[#8B1538] mx-auto rounded-full shadow-[0_0_20px_#8B1538]" />
        </header>

        <div className="relative">
          {/* Glowing central line */}
          <div 
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-[#8B1538] sm:-translate-x-1/2 z-0"
            style={{ boxShadow: '0 0 20px #8B1538', opacity: 0.8 }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative mb-20 flex items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
            >
              <div className="hidden sm:block w-1/2" />

              {/* Dot Icon */}
              <div className="absolute left-4 sm:left-1/2 w-12 h-12 -translate-x-1/2 bg-black border-2 border-[#8B1538] rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_#8B1538]">
                <exp.icon className="w-5 h-5 text-white" />
              </div>

              <div className="ml-14 sm:ml-0 sm:w-1/2 px-4 sm:px-12">
                <motion.div
                  whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                  className="p-8 rounded-3xl bg-[#F5E6CA] border-l-[10px] border-[#8B1538] shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B1538]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#8B1538]/20 transition-colors" />

                  <div className="relative z-10">
                    <span className="text-[10px] font-black text-[#8B1538] tracking-widest uppercase bg-[#8B1538]/10 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-bold text-black mt-3 mb-1">{exp.title}</h3>
                    <p className="text-[#8B1538] font-bold text-sm mb-4">{exp.company}</p>
                    <p className="text-gray-700 text-[12px] leading-relaxed font-medium">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
