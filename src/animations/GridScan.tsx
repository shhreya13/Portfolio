import { motion } from 'framer-motion';

interface GridScanProps {
  linesColor?: string;
  scanColor?: string;
  scanOpacity?: number;
}

export default function GridScan({
  linesColor = "#392e4e",
  scanColor = "#FF9FFC",
  scanOpacity = 0.2
}: GridScanProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* The Static Grid */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${linesColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${linesColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* The Animated Scan Line */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-x-0 h-1/4 w-full z-10"
        style={{
          background: `linear-gradient(to bottom, transparent, ${scanColor})`,
          opacity: scanOpacity,
        }}
      />
      
      {/* Vignette Overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none" />
    </div>
  );
}