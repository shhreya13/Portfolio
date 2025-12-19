import { motion, Variants } from 'framer-motion';
import { Zap, Target, Lightbulb } from 'lucide-react';
import TargetCursor from '../animations/TargetCursor';
import Threads from '../animations/Threads';

export default function AboutMe() {
  const highlights = [
    {
      icon: Zap,
      title: 'Fast Learner',
      description: 'Rapidly adapting to new technologies and methodologies to stay ahead of industry trends.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Driven by clear objectives, delivering results that exceed expectations on every project.',
    },
    {
      icon: Lightbulb,
      title: 'Innovative Thinker',
      description: 'Creating unique solutions by combining technical expertise with creative problem-solving.',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      
      {/* Threads Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Threads
          amplitude={1.5}
          distance={0}
          enableMouseInteraction={true}
          color="#8B1538"
        />
      </div>

      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header - Reduced Font */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-[#8B1538] to-[#D72B3B] bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#8B1538] to-[#D72B3B] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Bio Side - Reduced Font Sizes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-4">
              <motion.p>
                <span className="text-[#D72B3B] font-semibold">Full-stack developer</span> and Computer Science & Design undergraduate with a strong enthusiasm for <span className="text-[#D72B3B] font-semibold">Artificial Intelligence & Machine Learning</span> and experience working with <span className="text-[#D72B3B] font-semibold">blockchain technologies</span>.
              </motion.p>
              <motion.p>
                Skilled in <span className="text-[#D72B3B] font-semibold">React, JavaScript, Python, Java, Node</span> with hands-on experience building real-world projects.
              </motion.p>
              <motion.p>
                With experience spanning from <span className="text-[#D72B3B] font-semibold">blockchain development</span> to <span className="text-[#D72B3B] font-semibold">machine learning</span>, I deliver impactful solutions.
              </motion.p>
            </div>

            {/* Achievement Badges - Smaller Font */}
            <motion.div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="cursor-target flex items-center gap-2 text-[11px] sm:text-xs text-gray-200 bg-[#8B1538]/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#8B1538]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D72B3B] animate-pulse" />
                <span>1,000+ students network built</span>
              </div>
              <div className="cursor-target flex items-center gap-2 text-[11px] sm:text-xs text-gray-200 bg-[#8B1538]/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#8B1538]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D72B3B] animate-pulse" />
                <span>Top Intern @1M1B</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlight Cards Side - Reduced Font Sizes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-5"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -3 }}
                className="group cursor-target" 
              >
                <div className="bg-black/60 backdrop-blur-xl border border-[#8B1538]/40 rounded-xl p-5 hover:border-[#D72B3B]/60 transition-all shadow-xl">
                  <div className="flex items-start gap-3 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1538] to-[#D72B3B] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-[#D72B3B] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-gray-400 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}