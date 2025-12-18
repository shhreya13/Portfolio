import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';
import './Orb.css';

export default function Orb({ hue = 0, hoverIntensity = 0.5, rotateOnHover = true, forceHoverState = false }) {
  const ctnDom = useRef(null);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    varying vec2 vUv;

    // Helper functions for color space conversion
    vec3 rgb2yiq(vec3 c) {
      return vec3(dot(c, vec3(0.299, 0.587, 0.114)), dot(c, vec3(0.596, -0.274, -0.322)), dot(c, vec3(0.211, -0.523, 0.312)));
    }
    vec3 yiq2rgb(vec3 c) {
      return vec3(c.x + 0.956 * c.y + 0.621 * c.z, c.x - 0.272 * c.y - 0.647 * c.z, c.x - 1.106 * c.y + 1.703 * c.z);
    }
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad); float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i; yiq.z = q;
      return yiq2rgb(yiq);
    }

    float snoise3(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
    }

    // THEME COLORS: Maroon Red, Cream, and Deep Black-Red
    const vec3 baseColor1 = vec3(0.84, 0.17, 0.23); // #D72B3B
    const vec3 baseColor2 = vec3(1.0, 0.99, 0.82);  // #FFFDD0
    const vec3 baseColor3 = vec3(0.2, 0.02, 0.05);  // Deep Shadow

    void main() {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (vUv * iResolution.xy - center) / size * 2.0;

      // Rotation and Hover Distortions
      float angle = rot;
      float s = sin(angle); float c = cos(angle);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      uv += hover * hoverIntensity * 0.1 * sin(uv.yx * 10.0 + iTime);

      float len = length(uv);
      float v = smoothstep(0.9, 0.0, len);
      
      vec3 col1 = adjustHue(baseColor1, hue);
      vec3 col2 = adjustHue(baseColor2, hue);
      
      vec3 finalCol = mix(col1, col2, sin(iTime + len * 4.0) * 0.5 + 0.5);
      finalCol = mix(baseColor3, finalCol, v);

      gl_FragColor = vec4(finalCol * v, v);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity }
      }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + 'px';
      gl.canvas.style.height = height + 'px';
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 1);
    }

    window.addEventListener('resize', resize);
    resize();

    let targetHover = 0;
    let currentRot = 0;
    let rafId;

    const update = t => {
      rafId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      
      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

      if (rotateOnHover && effectiveHover > 0.5) currentRot += 0.01;
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };

    rafId = requestAnimationFrame(update);

    // Mouse interactivity
    const onMove = () => { targetHover = 1; };
    const onLeave = () => { targetHover = 0; };
    container.addEventListener('mouseenter', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mouseenter', onMove);
      container.removeEventListener('mouseleave', onLeave);
      if (gl.canvas.parentElement) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return <div ref={ctnDom} className="orb-container" />;
}