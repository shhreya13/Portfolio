import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles, Rocket } from 'lucide-react';
import Picture from '../assets/Picture.jpeg';
import Iridescence from '../animations/Iridescence'; 
import FuzzyText from '../animations/FuzzyText';
import PixelTransition from '../animations/PixelTransition'; 

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden bg-black">
      
      {/* BACKGROUND SHADER */}
      <div className="absolute inset-0 z-0">
        <Iridescence 
          color={[0.35, 0.02, 0.02]} 
          speed={0.6} 
          amplitude={0.2} 
          mouseReact={true}
        />
      </div>

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.9)_100%)] z-[1] pointer-events-none" />

      {/* CONTENT */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* PROFILE PICTURE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-red-900/20 blur-[100px] -z-10 animate-pulse" />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-900" 
              >
                {/* FIX: If the image is still not visible, 
                   ensure 'Picture' is not undefined by console.logging it.
                */}
                <PixelTransition
                  firstContent={
                    <img
                      src={Picture}
                      alt="Shreya Venkatesan"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        display: "block" // Ensures no weird inline spacing
                      }}
                    />
                  }
                  secondContent={
                    <div className="w-full h-full flex items-center justify-center bg-black p-6">
                      <p className="font-black text-2xl italic text-center text-white uppercase tracking-tighter">
                        Welcome to <br/> my PORTFOLIO ❤️
                      </p>
                    </div>
                  }
                  gridSize={12} 
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            
            <div className="mb-6 inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Full Stack Dev</span>
            </div>
          

            <div className="mb-6 flex justify-center md:justify-start text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white italic">
              <FuzzyText baseIntensity={0.15} hoverIntensity={0.3} enableHover={true}>
                SHREYA VENKATESAN
              </FuzzyText>
            </div>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-10 max-w-md font-medium">
              Developing secure and scalable solutions with a strong interest in artificial intelligence and modern web technologies
            </p>
               <div className="mb-6 inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-white animate-ping" />
               <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">ML Enthusiast</span>
            </div>
              

            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <a href="#projects" className="px-10 py-4 bg-white text-black font-black uppercase tracking-tighter text-xs text-center">
                View Work
              </a>
              <a href="#contact" className="px-10 py-4 border border-white/20 text-white font-black uppercase tracking-tighter text-xs text-center backdrop-blur-sm">
                Connect
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}