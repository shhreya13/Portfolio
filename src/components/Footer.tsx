import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import Orb from '../animations/Orb.tsx'; // Ensure this path matches your folder structure

export default function Footer() {
  const footerRef = useRef(null);
  
  // Create a subtle parallax effect for the Orb as you scroll
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const orbY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <footer 
      ref={footerRef}
      className="relative py-20 bg-black border-t border-[#D72B3B]/10 overflow-hidden"
    >
      {/* --- THE ORB BACKGROUND LAYER --- */}
      <motion.div 
        style={{ y: orbY, scale: orbScale }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none"
      >
        <div className="w-[500px] h-[500px]">
          <Orb hue={0} hoverIntensity={0.5} />
        </div>
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-7xl mx-auto relative z-10 px-4 flex flex-col items-center space-y-8">
        
        {/* Social Icons with Glassmorphism */}
        <div className="flex gap-8">
          {[
            { Icon: Github, href: "https://github.com/shhreya13" },
            { Icon: Linkedin, href: "#" },
            { Icon: Mail, href: "mailto:your-email@example.com" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 5, color: '#D72B3B' }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-[#FFFDD0]/10 text-[#FFFDD0] transition-all shadow-2xl"
            >
              <social.Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 text-[#FFFDD0] text-lg font-medium tracking-tight"
          >
            <span>Handcrafted with</span>
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
                filter: ["drop-shadow(0 0 0px #D72B3B)", "drop-shadow(0 0 10px #D72B3B)", "drop-shadow(0 0 0px #D72B3B)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-[#D72B3B] fill-[#D72B3B]" />
            </motion.span>
            <span>by <span className="font-black italic uppercase">Shreya Venkatesan</span></span>
          </motion.div>

          <p className="text-[#FFFDD0]/40 text-xs uppercase tracking-[0.4em] font-bold">
            © {new Date().getFullYear()} • Curating Digital Experiences
          </p>
        </div>

        {/* Decorative Maroon Line */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "60px" }}
          className="h-1 bg-[#D72B3B] rounded-full shadow-[0_0_15px_#D72B3B]"
        />
      </div>

      {/* Subtle Black Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-[1] pointer-events-none" />
    </footer>
  );
}