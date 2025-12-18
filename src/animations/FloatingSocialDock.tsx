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
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center gap-2 sm:gap-4 bg-black/40 backdrop-blur-md border border-[#8B1538]/30 rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-lg shadow-[#8B1538]/20"
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
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B1538] to-[#D72B3B] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#8B1538]/50 transition-all"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}
