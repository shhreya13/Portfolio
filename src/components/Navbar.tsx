import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ExternalLink, Download } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const linkedinUrl = "https://www.linkedin.com/in/shreya-venkatesan-421305328/";
  
  // MATCH THIS: Ensure this matches public/assets/resume.pdf exactly
  const resumePath = "/assets/resume.pdf"; 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Experience', desc: 'My professional journey', type: 'scroll' },
    { name: 'Projects', desc: 'Case studies & work', type: 'scroll' },
    { name: 'Skills', desc: 'Tools & technologies', type: 'scroll' },
    { name: 'Resume', desc: 'Download PDF', type: 'download' },
    { name: 'Contact', desc: 'Let’s start a conversation', type: 'scroll' }
  ];

  const handleNavClick = (item: any) => {
    if (item.type === 'download') {
      const link = document.createElement('a');
      link.href = resumePath;
      // This is the name the recruiter sees when they download it
      link.download = 'Shreya_Venkatesan_Resume.pdf'; 
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(item.name.toLowerCase());
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? 'h-20 bg-black/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
            : 'h-32 bg-transparent' 
        }`}
      >
        {/* Top Accessory Bar */}
        {!scrolled && (
          <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-10 pt-4 opacity-50 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            <div className="flex gap-6">
              <a href="https://github.com/shhreya13" target="_blank" rel="noreferrer" className="hover:text-[#8B1538] transition-colors">Github</a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#8B1538] transition-colors">Linkedin</a>
            </div>
            <span>Open for Collaboration — 2025</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex flex-col group"
          >
            <span className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
              SHREYA<span className="text-[#8B1538]">.</span>
            </span>
            <div className="h-1 bg-[#8B1538] w-0 group-hover:w-full transition-all duration-500 rounded-full mt-1" />
          </div>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="group relative flex flex-col items-start outline-none"
              >
                <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                  {item.name}
                </span>
                <span className="text-[9px] text-[#8B1538] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap uppercase font-black">
                  {item.desc}
                </span>
              </button>
            ))}
            
            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="ml-6 px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#D72B3B] text-white text-xs font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(139,21,56,0.3)] flex items-center gap-2"
            >
              Get in touch
              <ExternalLink size={14} />
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-4 text-white bg-white/5 rounded-full"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-black md:hidden p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black italic text-white tracking-tighter">NAVIGATION</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-3 bg-white text-black rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-5xl font-black text-white text-left hover:text-[#8B1538] transition-all uppercase italic flex items-center justify-between group"
                >
                  {item.name}
                  {item.type === 'download' ? <Download size={40} /> : <ArrowRight size={40} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}