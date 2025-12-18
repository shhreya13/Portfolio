import React, { useRef, useEffect } from 'react';

interface ThreadsProps {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  color?: string;
}

const Threads: React.FC<ThreadsProps> = ({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  color = "#8B1538"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    resize();

    // Create 20 lines for a denser look
    const lines = Array.from({ length: 20 }, (_, i) => ({
      y: (canvas.height / 20) * i,
      speed: 0.001 + Math.random() * 0.002,
      offset: Math.random() * Math.PI * 2,
      phase: Math.random() * Math.PI
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // High visibility settings
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.15; // High opacity
      
      // Glow effect
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;

      lines.forEach((line) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 3) {
          // Wave calculation
          let wave = Math.sin(x * 0.004 + time * line.speed + line.offset) * 50 * amplitude;
          let y = line.y + wave;

          // Push threads away from mouse
          if (enableMouseInteraction) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (200 - dist) / 200;
              y += dy * force * 0.8; // Strong displacement
            }
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude, enableMouseInteraction, color]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

export default Threads;