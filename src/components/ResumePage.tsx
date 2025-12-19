import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import LightRays from '../animations/LightRays'; 

export default function Resume() {
  // Ensure resume.pdf is located in your /public folder
  const resumeUrl = "/resume.pdf";

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays 
          raysOrigin="top-right" 
          raysColor="#B11B48" 
          raysSpeed={0.8}     
          lightSpread={1.2}   
          rayLength={2.0}     
          pulsating={true} 
          followMouse={true} 
          mouseInfluence={0.1} 
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md">
        
        {/* Back Button */}
        <motion.button 
          onClick={() => window.history.back()}
          className="absolute -top-20 left-1/2 -translate-x-1/2 md:top-[-100px] md:left-[-120px] flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[9px] font-bold"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={14} /> Back
        </motion.button>

        {/* Icon Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm"
        >
          <FileText size={32} className="text-[#8B1538]" />
        </motion.div>

        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">
            Curriculum Vitae<span className="text-[#8B1538]">.</span>
          </h1>
          <p className="text-gray-500 text-[8px] sm:text-[9px] uppercase tracking-[0.4em]">
            Shreya Venkatesan — 2025
          </p>
        </div>

        {/* --- DOWNLOAD BUTTON --- */}
        <motion.a
          href={resumeUrl}
          download="Shreya_Venkatesan_Resume.pdf" // Specify filename for local save
          target="_blank" // Opens in new tab if download fails
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 px-8 py-3.5 bg-white text-black font-black uppercase tracking-widest text-[10px] transition-all hover:bg-[#8B1538] hover:text-white overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(139,21,56,0.2)]"
        >
          <Download size={14} />
          <span>Download Resume</span>
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.a>

        <p className="text-[8px] text-gray-600 uppercase italic tracking-widest">
          PDF Format • Direct Download
        </p>
      </div>
    </div>
  );
}