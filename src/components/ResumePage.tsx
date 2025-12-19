import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import LightRays from '../animations/LightRays'; 

export default function Resume() {
  
  const handleDownload = () => {
    // 1. Path to your file (must be in public/resume.pdf)
    const fileUrl = "/resume.pdf";
    
    // 2. Create the link
    const link = document.createElement('a');
    link.href = fileUrl;
    
    // 3. Force the download attribute
    link.setAttribute('download', 'Shreya_Venkatesan_Resume.pdf');
    
    // 4. This is the secret: 'target=_blank' acts as a fallback.
    // If the browser blocks the "download", it will simply open the PDF 
    // in a new tab so the user can still see/save it.
    link.target = "_blank";
    
    document.body.appendChild(link);
    link.click();
    
    // 5. Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

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

        {/* Icon */}
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
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.4em]">
            Shreya Venkatesan — 2025
          </p>
        </div>

        {/* --- DOWNLOAD BUTTON --- */}
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] transition-all hover:bg-[#8B1538] hover:text-white overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(139,21,56,0.3)]"
        >
          <Download size={14} />
          <span>Download Resume</span>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>

        <p className="text-[8px] text-gray-600 uppercase italic tracking-widest">
          PDF Format • Direct Access
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}
