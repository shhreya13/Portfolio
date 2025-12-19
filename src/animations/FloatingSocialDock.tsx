import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function FloatingSocialDock() {
  const socials = [
    { icon: Github, href: 'https://github.com/shhreya13', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/shreya-venkatesan-421305328', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:shrevenk13@gmail.com', label: 'Email' },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        animate={{
          y: [0, -8, 0], // Reduced float height slightly
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        // Reduced padding from px-6 py-4 to px-3 py-2
        className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-[#8B1538]/30 rounded-full px-3 py-2 shadow-lg shadow-[#8B1538]/20"
      >
        {socials.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1, type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.15, rotate: 5 }} // Slightly lower hover scale
            whileTap={{ scale: 0.9 }}
            // Reduced button size from w-12/h-12 to w-9/h-9
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B1538] to-[#D72B3B] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#8B1538]/50 transition-all"
            aria-label={social.label}
          >
            {/* Reduced icon size from w-6 to w-4.5 */}
            <social.icon className="w-[18px] h-[18px]" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}