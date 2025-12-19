import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import Orb from '../animations/Orb.tsx'; 

export default function Footer() {
  const footerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const orbY = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);

  return (
    <footer 
      ref={footerRef}
      // Reduced vertical padding from py-20 to py-12
      className="relative py-12 bg-black border-t border-[#D72B3B]/10 overflow-hidden"
    >
      {/* --- THE ORB BACKGROUND LAYER --- */}
      <motion.div 
        style={{ y: orbY, scale: orbScale }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
      >
        {/* Slightly smaller Orb container */}
        <div className="w-[400px] h-[400px]">
          <Orb hue={0} hoverIntensity={0.5} />
        </div>
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-7xl mx-auto relative z-10 px-4 flex flex-col items-center space-y-6">
        
        {/* Social Icons - Scaled down */}
        <div className="flex gap-5">
          {[
            { Icon: Github, href: "https://github.com/shhreya13" },
            { Icon: Linkedin, href: "#" },
            { Icon: Mail, href: "mailto:shrevenk13@gmail.com" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, rotate: 5, color: '#D72B3B' }}
              whileTap={{ scale: 0.95 }}
              // Reduced padding (p-4 to p-3) and rounded corners
              className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-[#FFFDD0]/10 text-[#FFFDD0] transition-all shadow-xl"
            >
              <social.Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            // Reduced font from text-lg to text-sm
            className="flex items-center justify-center gap-2 text-[#FFFDD0] text-sm font-medium tracking-tight"
          >
            <span>Handcrafted with</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 0px #D72B3B)", "drop-shadow(0 0 8px #D72B3B)", "drop-shadow(0 0 0px #D72B3B)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Scaled down heart icon */}
              <Heart className="w-4 h-4 text-[#D72B3B] fill-[#D72B3B]" />
            </motion.span>
            <span>by <span className="font-black italic uppercase tracking-tighter">Shreya Venkatesan</span></span>
          </motion.div>

          {/* Reduced from text-xs to text-[9px] and tracking */}
          <p className="text-[#FFFDD0]/40 text-[9px] uppercase tracking-[0.3em] font-bold">
            © {new Date().getFullYear()} • Curating Digital Experiences
          </p>
        </div>

        {/* Decorative Maroon Line - Slightly shorter */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          className="h-1 bg-[#D72B3B] rounded-full shadow-[0_0_10px_#D72B3B]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-[1] pointer-events-none" />
    </footer>
  );
}