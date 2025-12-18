import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

/**
 * High-Resolution Text Texture
 * Increased font size to 80px for maximum clarity when scaled up.
 */
function createTextTexture(gl: any, text: string, font = 'bold 80px sans-serif', color = '#FFFFFF') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  
  context.font = font;
  const metrics = context.measureText(text);
  
  // High-res canvas dimensions
  canvas.width = Math.ceil(metrics.width) + 120;
  canvas.height = 160; 

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  
  // Draw solid, bright white text
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { 
    generateMipmaps: false,
    premultiplyAlpha: true 
  });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  mesh: Mesh;
  constructor({ gl, plane, text, textColor = '#FFFFFF', font }: any) {
    autoBind(this);
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position; 
        attribute vec2 uv; 
        uniform mat4 modelViewMatrix; 
        uniform mat4 projectionMatrix; 
        varying vec2 vUv; 
        void main() { 
          vUv = uv; 
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
        }`,
      fragment: `
        precision highp float; 
        uniform sampler2D tMap; 
        varying vec2 vUv; 
        void main() { 
          vec4 color = texture2D(tMap, vUv); 
          if (color.a < 0.1) discard; 
          gl_FragColor = color; 
        }`,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });

    this.mesh = new Mesh(gl, { geometry, program });
    
    // INCREASED TEXT SIZE: set to 0.45 of the logo height
    const textHeight = plane.scale.y * 0.3; 
    const aspect = width / height;
    this.mesh.scale.set(textHeight * aspect, textHeight, 1);
    
    // POSITION: Moved further down and slightly forward (Z: 0.2) to ensure it's on top
    this.mesh.position.set(0, -plane.scale.y * 0.85, 0.2); 
    
    this.mesh.setParent(plane);
    this.mesh.renderOrder = 999;
  }
}

class Media {
  plane: Mesh; program: any; x = 0; extra = 0; width = 0; widthTotal = 0; viewport: any; bend: number; index: number; length: number; screen: any;
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font }: any) {
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      vertex: `precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform float uTime; uniform float uSpeed; varying vec2 vUv; void main() { vUv = uv; vec3 p = position; p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5); gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
      fragment: `precision highp float; uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform sampler2D tMap; uniform float uBorderRadius; varying vec2 vUv; float roundedBoxSDF(vec2 p, vec2 b, float r) { vec2 d = abs(p) - b; return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r; } void main() { vec2 ratio = vec2(min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0), min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)); vec2 uv = vUv * ratio + (1.0 - ratio) * 0.5; vec4 texColor = texture2D(tMap, uv); float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - 0.01), uBorderRadius); float borderThickness = 0.012; float borderEdge = smoothstep(0.0, 0.01, abs(d + borderThickness/2.0) - borderThickness/2.0); vec3 finalColor = mix(vec3(1.0), texColor.rgb, borderEdge); float alpha = 1.0 - smoothstep(-0.005, 0.005, d); gl_FragColor = vec4(finalColor, alpha); }`,
      uniforms: { tMap: { value: texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [0, 0] }, uSpeed: { value: 0 }, uTime: { value: 100 * Math.random() }, uBorderRadius: { value: borderRadius } },
      transparent: true
    });
    const img = new Image(); img.crossOrigin = 'anonymous'; img.src = image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);

    new Title({ gl, plane: this.plane, text, textColor, font });

    Object.assign(this, { index, length, screen, viewport, bend });
    this.onResize({ screen, viewport });
  }

  update(scroll: any, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    const B_abs = Math.abs(this.bend);
    const R = (H * H + B_abs * B_abs) / (2 * B_abs);
    const effectiveX = Math.min(Math.abs(x), H);
    const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
    this.plane.position.y = this.bend > 0 ? -arc : arc;
    this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R) * (this.bend > 0 ? 1 : -1);
    this.program.uniforms.uTime.value += 0.02;
    this.program.uniforms.uSpeed.value = Math.abs(scroll.current - scroll.last);
    if (direction === 'right' && this.plane.position.x + this.plane.scale.x / 2 < -this.viewport.width / 2) this.extra -= this.widthTotal;
    if (direction === 'left' && this.plane.position.x - this.plane.scale.x / 2 > this.viewport.width / 2) this.extra += this.widthTotal;
  }

  onResize({ screen, viewport }: any) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    const scale = this.screen.height / 1800;
    // Keeping logo size "calm" as requested
    this.plane.scale.y = (this.viewport.height * (380 * scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (380 * scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + 3.0; 
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  renderer: Renderer; gl: any; camera: Camera; scene: Transform; planeGeometry: Plane; medias: Media[] = [];
  scroll = { ease: 0.1, current: 0, target: 0, last: 0 }; 
  raf: any; isDown = false; start = 0; screen: any; viewport: any;
  autoPlaySpeed = 0.4; 

  constructor(container: HTMLElement, { items, bend, textColor, borderRadius, font }: any) {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: 2 });
    this.gl = this.renderer.gl;
    container.appendChild(this.gl.canvas);
    this.camera = new Camera(this.gl, { fov: 45 });
    this.camera.position.z = 20;
    this.scene = new Transform();
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
    this.onResize();
    const galleryItems = items.concat(items);
    this.medias = galleryItems.map((data: any, index: number) => new Media({ 
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index, length: galleryItems.length, 
      scene: this.scene, screen: this.screen, text: data.text, viewport: this.viewport, bend, textColor, borderRadius, font 
    }));
    this.update();
    this.addEventListeners(container);
  }

  addEventListeners(container: HTMLElement) {
    window.addEventListener('resize', this.onResize.bind(this));
    container.addEventListener('wheel', (e) => { this.scroll.target += e.deltaY * 0.05; }, { passive: true });
    container.addEventListener('mousedown', (e) => { this.isDown = true; this.start = e.clientX; this.scroll.position = this.scroll.current; });
    window.addEventListener('mousemove', (e) => { if (!this.isDown) return; this.scroll.target = this.scroll.position + (this.start - e.clientX) * 0.08; });
    window.addEventListener('mouseup', () => { this.isDown = false; });
  }

  onResize() {
    this.screen = { width: this.gl.canvas.clientWidth, height: this.gl.canvas.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    if (!this.isDown) this.scroll.target += this.autoPlaySpeed;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const dir = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias.forEach(m => m.update(this.scroll, dir));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    this.gl.canvas.remove();
  }
}

export default function CircularGallery({ 
  items, 
  bend = 1.2, 
  textColor = '#ffffff', 
  borderRadius = 0.08, 
  font = 'bold 80px sans-serif' // High default resolution
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      appRef.current = new App(containerRef.current, { items, bend, textColor, borderRadius, font });
    }
    return () => { appRef.current?.destroy(); };
  }, [items, bend, textColor, borderRadius, font]);

  // Height increased to 700px to accommodate large text and "calm" logo size
  return <div className="circular-gallery w-full h-[600px]" ref={containerRef} />;
}