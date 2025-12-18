import React, { useEffect, useRef } from 'react';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
}

export default function Aurora({
  colorStops = ["#4a0404", "#8B1538", "#000000"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.01 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create flowing gradient effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      colorStops.forEach((color, index) => {
        const offset = (index / (colorStops.length - 1));
        // Add some wave movement to the gradient stops
        const shift = Math.sin(time + index) * 0.1 * amplitude;
        gradient.addColorStop(Math.max(0, Math.min(1, offset + shift)), color);
      });

      ctx.fillStyle = gradient;
      ctx.globalAlpha = blend;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}