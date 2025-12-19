import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Iridescence from '../animations/Iridescence'; 

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
    <section id="contact" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      
      {/* --- IRIDESCENCE BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Iridescence 
          color={[0.55, 0.08, 0.22]} 
          speed={0.5} 
          amplitude={0.2} 
          mouseReact={true}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Reduced from 4xl/6xl to 2xl/4xl */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tighter text-[#FFFDD0] uppercase mb-3">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-[#D72B3B] mx-auto rounded-full mb-4 shadow-[0_0_15px_#D72B3B]" />
          {/* Reduced from text-lg to text-sm */}
          <p className="text-gray-300 text-sm font-medium">
            Let's collaborate and build something amazing together!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -3 }}
              className="group"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block h-full bg-[#FFFDD0] border border-black/10 rounded-xl p-5 hover:shadow-[0_10px_30px_rgba(215,43,59,0.3)] transition-all"
                >
                  <ContactCardContent item={item} isLink={true} />
                </a>
              ) : (
                <div className="h-full bg-[#FFFDD0] border border-black/10 rounded-xl p-5 shadow-xl">
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
          className="bg-[#FFFDD0] border border-black/10 rounded-xl p-6 text-center shadow-2xl"
        >
          <motion.a
            href="mailto:shrevenk13@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Reduced padding and font size
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black text-[#FFFDD0] text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg hover:bg-[#D72B3B] transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Me an Email
          </motion.a>
          {/* Reduced from text-sm to text-[10px] */}
          <p className="mt-4 text-black/60 text-[10px] font-bold uppercase tracking-tighter">
            Freelance • Collaborations • Opportunities
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCardContent({ item, isLink }) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        whileHover={isLink ? { rotate: 360 } : {}}
        transition={{ duration: 0.6 }}
        // Reduced icon tile size from 12 to 10
        className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-3 shadow-lg group-hover:bg-[#D72B3B] transition-colors"
      >
        <item.icon className="w-5 h-5 text-[#FFFDD0]" />
      </motion.div>
      {/* Label reduced to text-[9px] */}
      <h3 className="text-[9px] font-black text-black/40 uppercase tracking-widest mb-1.5">{item.label}</h3>
      {/* Value reduced to text-xs/sm */}
      <p className="text-xs sm:text-sm text-black font-bold break-words leading-tight">{item.value}</p>
    </div>
  );
}