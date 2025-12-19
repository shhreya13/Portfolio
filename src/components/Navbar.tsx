import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const linkedinUrl = "https://www.linkedin.com/in/shreya-venkatesan-421305328/";
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Experience', desc: 'Journey' },
    { name: 'Projects', desc: 'Work' },
    { name: 'Skills', desc: 'Stack' },
    { name: 'Resume', desc: 'CV' }, 
    { name: 'Contact', desc: 'Talk' }
  ];

  const handleNavClick = (id: string) => {
    const targetId = id.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            ? 'h-14 bg-black/90 backdrop-blur-md border-b border-white/5 shadow-xl' // Reduced from h-16
            : 'h-20 bg-transparent' // Reduced from h-24
        }`}
      >
        {!scrolled && (
          <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto px-8 pt-3 opacity-40 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
            <div className="flex gap-4">
              <a href="https://github.com/shhreya13" target="_blank" rel="noreferrer" className="hover:text-[#8B1538] transition-colors">Github</a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#8B1538] transition-colors">Linkedin</a>
            </div>
            <span>Available for Hire</span>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex flex-col group"
          >
            {/* Scaled logo slightly for better mobile fit */}
            <span className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
              SHREYA<span className="text-[#8B1538]">.</span>
            </span>
            <div className="h-0.5 bg-[#8B1538] w-0 group-hover:w-full transition-all duration-500 rounded-full mt-0.5" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className="group relative flex flex-col items-start outline-none"
              >
                <span className="text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.15em]">
                  {item.name}
                </span>
                <span className="text-[8px] text-[#8B1538] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3 whitespace-nowrap uppercase font-black">
                  {item.desc}
                </span>
              </button>
            ))}
            
            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-[#8B1538] to-[#D72B3B] text-white text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              Contact
              <ExternalLink size={10} />
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white bg-white/5 rounded-full"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-black md:hidden p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-sm font-black italic text-white/40 tracking-widest">MENU</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-[#8B1538] text-white rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  // Reduced from text-3xl to text-xl for a cleaner mobile look
                  className="py-3 text-xl font-black text-white text-left hover:text-[#8B1538] border-b border-white/5 transition-all uppercase italic flex items-center justify-between group"
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-[9px] text-[#8B1538] non-italic font-bold tracking-widest">{item.desc}</span>
                  </div>
                  <ArrowRight size={20} className="text-[#8B1538]" />
                </button>
              ))}
            </div>

            <div className="mt-auto pb-6">
               <a 
                href={linkedinUrl}
                className="w-full py-4 bg-[#8B1538] text-white text-center font-black uppercase italic tracking-tighter flex items-center justify-center gap-2"
               >
                 Let's Talk <ExternalLink size={16} />
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}