import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import LightRays from '../animations/LightRays'; 

export default function Resume() {
  // Use the clean, lowercase string path
  const resumeUrl = "/assets/resume.pdf";

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays 
          raysOrigin="top-right" raysColor="#8B1538" raysSpeed={0.5} 
          lightSpread={0.8} rayLength={1.5} pulsating={true} 
          followMouse={true} mouseInfluence={0.05} 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-md">
        
        {/* Back Button */}
        <motion.button 
          onClick={() => window.history.back()}
          className="absolute -top-32 left-1/2 -translate-x-1/2 md:top-[-150px] md:left-[-200px] flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={16} /> Back
        </motion.button>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm"
        >
          <FileText size={48} className="text-[#8B1538]" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
            Curriculum Vitae<span className="text-[#8B1538]">.</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em]">
            Shreya Venkatesan — 2025
          </p>
        </div>

        {/* --- DOWNLOAD BUTTON --- */}
        <motion.a
          href={resumeUrl}
          download="resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black font-black uppercase tracking-widest transition-all hover:bg-[#8B1538] hover:text-white overflow-hidden cursor-pointer"
        >
          <Download size={20} />
          <span>Download My Resume</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.a>

        <p className="text-[10px] text-gray-600 uppercase italic tracking-widest">
          PDF Format • Direct Download
        </p>
      </div>
    </div>
  );
}