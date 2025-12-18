import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export const LiquidChrome = ({
  baseColor = [0.2, 0.02, 0.05], // Deep Maroon
  speed = 0.15,
  amplitude = 0.5,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true, alpha: true });
    const gl = renderer.gl;

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 8.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y);
          }

          // Liquid "Chrome" lighting effect
          float intensity = abs(sin(uTime - uv.y - uv.x));
          vec3 color = uBaseColor / (intensity + 0.2);
          
          // Add a subtle cream highlight to the peaks
          vec3 creamHighlight = vec3(1.0, 0.99, 0.81); 
          color = mix(color, creamHighlight, pow(1.0 - intensity, 5.0) * 0.3);

          return vec4(color, 1.0);
      }

      void main() {
          gl_FragColor = renderImage(vUv);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([0, 0, 0]) },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]);
    }
    
    window.addEventListener('resize', resize);
    resize();

    let animationId;
    const update = (t) => {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentElement) gl.canvas.parentElement.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} {...props} />;
};

export default LiquidChrome;