import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "red",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeElement = container.children[focusedIndex] as HTMLElement;
    if (activeElement) {
      setRect({
        width: activeElement.offsetWidth,
        height: activeElement.offsetHeight,
        left: activeElement.offsetLeft,
        top: activeElement.offsetTop,
      });
    }
  }, [focusedIndex, words]);

  return (
    <div className="relative flex flex-wrap justify-center gap-4" ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          className="relative text-3xl md:text-5xl font-normal uppercase transition-all duration-300 select-none"
          style={{
            filter: manualMode
              ? focusedIndex === index ? 'none' : `blur(${blurAmount}px)`
              : focusedIndex === index ? 'none' : `blur(${blurAmount}px)`,
            color: 'white',
            fontFamily: 'Arial, sans-serif'
          }}
          onMouseEnter={() => manualMode && setFocusedIndex(index)}
        >
          {word}
        </span>
      ))}

      <motion.div
        className="absolute pointer-events-none border-2 z-10"
        animate={{
          width: rect.width + 20,
          height: rect.height + 10,
          left: rect.left - 10,
          top: rect.top - 5,
        }}
        transition={{
          duration: animationDuration,
          ease: "easeInOut",
        }}
        style={{ borderColor: borderColor }}
      />
    </div>
  );
};

export default TrueFocus;