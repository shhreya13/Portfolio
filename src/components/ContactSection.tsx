import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Iridescence from '../animations/Iridescence'; // Adjust path if necessary

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shrevenk13@gmail.com',
      href: 'mailto:shrevenk13@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8248799909',
      href: 'tel:+918248799909',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: null,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      
      {/* --- IRIDESCENCE BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Iridescence 
          color={[0.55, 0.08, 0.22]} // Matches your #8B1538 Maroon
          speed={0.5} 
          amplitude={0.2} 
          mouseReact={true}
        />
      </div>

      {/* Subtle overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter text-[#FFFDD0] uppercase mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-[#D72B3B] mx-auto rounded-full mb-6 shadow-[0_0_15px_#D72B3B]" />
          <p className="text-gray-300 text-lg font-medium">
            Let's collaborate and build something amazing together!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block h-full bg-[#FFFDD0] border border-black/10 rounded-2xl p-6 hover:shadow-[0_10px_30px_rgba(215,43,59,0.3)] transition-all"
                >
                  <ContactCardContent item={item} isLink={true} />
                </a>
              ) : (
                <div className="h-full bg-[#FFFDD0] border border-black/10 rounded-2xl p-6 shadow-xl">
                  <ContactCardContent item={item} isLink={false} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#FFFDD0] border border-black/10 rounded-2xl p-8 text-center shadow-2xl"
        >
          <motion.a
            href="mailto:shrevenk13@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-[#FFFDD0] font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#D72B3B] transition-colors"
          >
            <Send className="w-5 h-5" />
            Send Me an Email
          </motion.a>
          <p className="mt-6 text-black/60 text-sm font-bold uppercase tracking-tighter">
            Freelance • Collaborations • Opportunities
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component for card content to keep code clean
function ContactCardContent({ item, isLink }) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        whileHover={isLink ? { rotate: 360 } : {}}
        transition={{ duration: 0.6 }}
        className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 shadow-lg group-hover:bg-[#D72B3B] transition-colors"
      >
        <item.icon className="w-6 h-6 text-[#FFFDD0]" />
      </motion.div>
      <h3 className="text-xs font-black text-black/40 uppercase tracking-widest mb-2">{item.label}</h3>
      <p className="text-sm sm:text-base text-black font-bold break-words leading-tight">{item.value}</p>
    </div>
  );
}