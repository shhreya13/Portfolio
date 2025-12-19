import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles, Rocket } from 'lucide-react';
import Picture from '../assets/Picture.jpeg';
import Iridescence from '../animations/Iridescence'; 
import FuzzyText from '../animations/FuzzyText';
import PixelTransition from '../animations/PixelTransition'; 

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    // Changed: Removed fixed height, added large bottom padding to let the red background expand
    <section className="relative min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-42 pb-40 overflow-hidden bg-black">
      
      {/* BACKGROUND SHADER - Set to absolute inset-0 to cover the entire expanded section */}
      <div className="absolute inset-0 z-0">
        <Iridescence 
          color={[0.25, 0.01, 0.01]} 
          speed={0.4} 
          amplitude={0.15} 
          mouseReact={true}
        />
      </div>

      {/* VIGNETTE - Modified to fade out at the bottom so it flows into the next section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.7)_100%)] z-[1] pointer-events-none" />

      {/* CONTENT */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* PROFILE PICTURE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-red-900/10 blur-[80px] -z-10 animate-pulse" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 w-56 h-72 sm:w-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-zinc-900" 
              >
                <PixelTransition
                  firstContent={
                    <img
                      src={Picture}
                      alt="Shreya Venkatesan"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        display: "block" 
                      }}
                    />
                  }
                  secondContent={
                    <div className="w-full h-full flex items-center justify-center bg-black p-4">
                      <p className="font-black text-lg italic text-center text-white uppercase tracking-tighter">
                        Welcome to <br/> my portfolio ❤️
                      </p>
                    </div>
                  }
                  gridSize={10} 
                  pixelColor='#ffffff'
                  once={false}
                  animationStepDuration={0.4}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            <div className="mb-4 flex justify-center md:justify-start text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white italic">
              <FuzzyText baseIntensity={0.1} hoverIntensity={0.2} enableHover={true}>
                SHREYA VENKATESAN
              </FuzzyText>
            </div>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto md:mx-0 font-medium">
              Developing secure and scalable solutions with a strong interest in AI and modern web technologies.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white font-bold text-[9px] uppercase tracking-widest">Full Stack Dev</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white font-bold text-[9px] uppercase tracking-widest">ML Enthusiast</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] text-center hover:bg-gray-200 transition-colors">
                View Work
              </a>
              <a href="#contact" className="px-8 py-3 border border-white/20 text-white font-black uppercase tracking-widest text-[10px] text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                Connect
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}