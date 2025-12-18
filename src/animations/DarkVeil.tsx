import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';

const vertex = `
attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}
`;

const fragment = `
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform float uWarp;

vec4 buf[8];
float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}

mat3 rgb2yiq=mat3(0.299,0.587,0.114,0.596,-0.274,-0.322,0.211,-0.523,0.312);
mat3 yiq2rgb=mat3(1.0,0.956,0.621,1.0,-0.272,-0.647,1.0,-1.106,1.703);

vec3 hueShiftRGB(vec3 col,float deg){
    vec3 yiq=rgb2yiq*col;
    float rad=radians(deg);
    float cosh=cos(rad),sinh=sin(rad);
    vec3 yiqShift=vec3(yiq.x,yiq.y*cosh-yiq.z*sinh,yiq.y*sinh+yiq.z*cosh);
    return clamp(yiq2rgb*yiqShift,0.0,1.0);
}

vec4 sigmoid(vec4 x){return 1./(1.+exp(-x));}

vec4 cppn_fn(vec2 coordinate,float in0,float in1,float in2){
    // This is the mathematical 'brain' of the veil
    buf[6]=vec4(coordinate.x,coordinate.y,0.394+in0,0.36+in1);
    buf[7]=vec4(0.14+in2,sqrt(coordinate.x*coordinate.x+coordinate.y*coordinate.y),0.,0.);
    buf[0]=mat4(vec4(6.54,-3.61,0.75,-1.13),vec4(2.45,3.16,1.22,0.06),vec4(-5.47,-6.15,1.87,-4.77),vec4(6.03,-5.54,-0.90,3.25))*buf[6]+mat4(vec4(0.84,-5.72,3.97,1.65),vec4(-0.24,0.58,-1.76,-5.35),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(0.21,1.12,-1.79,5.02);
    buf[1]=mat4(vec4(-3.35,-6.06,0.55,-4.47),vec4(0.86,1.74,5.64,1.61),vec4(2.49,-3.50,1.71,6.35),vec4(3.31,8.20,1.13,-1.16))*buf[6]+mat4(vec4(5.24,-13.03,0.009,15.87),vec4(2.98,3.12,-0.89,-1.68),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-5.94,-6.57,-0.88,1.54);
    buf[0]=sigmoid(buf[0]);buf[1]=sigmoid(buf[1]);
    buf[2]=mat4(vec4(-15.21,8.09,-2.42,-1.93),vec4(-5.95,4.31,2.63,1.27),vec4(-7.31,6.72,5.24,5.94),vec4(5.07,8.97,-1.72,-1.15))*buf[6]+mat4(vec4(-11.96,-11.60,6.14,11.23),vec4(2.12,-6.26,-1.70,-0.70),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-4.17,-3.22,-4.57,-3.64);
    buf[3]=mat4(vec4(3.18,-13.73,1.87,3.23),vec4(0.64,12.76,1.91,0.50),vec4(-0.04,4.48,1.47,1.80),vec4(5.00,13.00,3.39,-4.55))*buf[6]+mat4(vec4(-0.12,7.72,-3.14,4.74),vec4(0.63,3.71,-0.81,-0.39),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-1.18,-21.62,0.78,1.23);
    buf[2]=sigmoid(buf[2]);buf[3]=sigmoid(buf[3]);
    buf[4]=mat4(vec4(5.21,-7.18,2.72,2.65),vec4(-5.60,-25.35,4.06,0.46),vec4(-10.57,24.28,21.10,37.54),vec4(4.30,-1.96,2.34,-1.37))*buf[0]+mat4(vec4(-17.65,-10.50,2.25,12.46),vec4(6.26,-502.75,-12.64,0.91),vec4(-10.98,20.74,-9.70,-0.76),vec4(5.38,1.48,-4.19,-4.84))*buf[1]+mat4(vec4(12.78,-16.34,-0.39,1.79),vec4(-30.48,-1.83,1.45,-1.11),vec4(19.87,-7.33,-42.94,-98.52),vec4(8.33,-2.73,-2.29,-36.14))*buf[2]+mat4(vec4(-16.29,3.54,-0.44,-9.44),vec4(57.50,-35.60,16.16,-4.15),vec4(-0.07,-3.86,-7.09,3.15),vec4(-12.55,-7.07,1.49,-0.82))*buf[3]+vec4(-7.67,15.92,1.32,-1.66);
    buf[5]=mat4(vec4(-1.41,-0.37,-3.77,-21.36),vec4(-6.21,-9.35,0.92,8.82),vec4(11.46,-22.34,13.62,-18.69),vec4(-0.34,-3.99,-2.46,-0.45))*buf[0]+mat4(vec4(7.34,-4.36,-6.30,-3.86),vec4(1.54,6.54,1.97,-0.58),vec4(6.58,-2.21,3.71,-1.37),vec4(-5.79,10.13,-2.33,-5.96))*buf[1]+mat4(vec4(-2.51,-6.66,-1.40,-0.16),vec4(-0.37,0.53,4.38,-1.30),vec4(-0.70,2.01,-5.16,-3.72),vec4(-13.56,10.48,-0.91,-2.64))*buf[2]+mat4(vec4(-8.64,6.55,-6.39,-5.59),vec4(-0.57,-1.07,36.91,5.73),vec4(14.28,3.71,7.14,-4.59),vec4(2.71,3.60,-4.36,-2.36))*buf[3]+vec4(-5.90,-4.32,1.24,8.59);
    buf[4]=sigmoid(buf[4]);buf[5]=sigmoid(buf[5]);
    buf[6]=mat4(vec4(-1.61,0.79,1.46,0.20),vec4(-28.79,-7.13,1.50,4.65),vec4(-10.94,39.66,0.74,-10.09),vec4(-0.72,-1.54,0.73,2.16))*buf[0]+mat4(vec4(3.25,21.48,-1.01,-3.31),vec4(-3.73,-3.37,-7.22,-0.23),vec4(13.18,0.79,5.33,5.68),vec4(-4.16,-17.79,-6.81,-1.64))*buf[1]+mat4(vec4(0.60,-7.80,-7.21,-2.74),vec4(-3.52,-0.12,-0.52,0.43),vec4(9.67,-22.85,2.06,0.09),vec4(-4.31,-17.73,2.51,5.30))*buf[2]+mat4(vec4(-6.54,-15.79,-6.04,-5.41),vec4(-43.59,28.55,-16.00,18.84),vec4(4.21,8.39,3.09,8.65),vec4(-5.02,-4.45,-4.47,-5.50))*buf[3]+mat4(vec4(1.69,-67.05,6.89,1.90),vec4(1.86,2.39,2.52,4.08),vec4(11.15,1.72,2.07,7.38),vec4(-4.25,-306.24,8.25,-17.13))*buf[4]+mat4(vec4(1.68,-4.58,3.85,-6.34),vec4(1.35,-1.26,9.93,2.90),vec4(-5.27,0.07,-0.13,3.32),vec4(28.34,-4.91,6.10,4.08))*buf[5]+vec4(6.68,12.52,-3.70,-4.10);
    buf[7]=mat4(vec4(-8.26,-4.70,5.09,0.75),vec4(8.65,-17.15,16.51,-8.88),vec4(-4.03,-2.39,-2.60,-1.98),vec4(-2.21,-1.81,-5.97,4.88))*buf[0]+mat4(vec4(6.77,3.50,-2.81,-2.70),vec4(-5.74,-0.27,1.49,-5.05),vec4(13.12,15.73,-2.93,-4.10),vec4(-14.37,-5.03,-6.25,2.98))*buf[1]+mat4(vec4(4.09,-0.94,-5.67,4.75),vec4(4.38,4.83,1.74,-3.43),vec4(2.11,0.16,-104.56,16.94),vec4(-5.22,-2.99,3.835,-1.93))*buf[2]+mat4(vec4(-5.90,1.79,-13.60,-3.80),vec4(6.65,31.91,25.16,91.81),vec4(11.84,4.15,-0.73,6.76),vec4(-6.39,4.03,6.17,-0.32))*buf[3]+mat4(vec4(3.49,-196.91,-8.92,2.81),vec4(3.48,-3.18,5.17,5.18),vec4(-2.40,15.58,1.28,2.02),vec4(-71.25,-62.44,-8.13,0.50))*buf[4]+mat4(vec4(-12.29,-11.17,-7.34,4.39),vec4(10.80,5.63,-0.93,-4.73),vec4(-12.86,-7.03,5.30,7.54),vec4(1.45,8.91,3.51,5.84))*buf[5]+vec4(2.24,-6.70,-0.98,-2.11);
    buf[6]=sigmoid(buf[6]);buf[7]=sigmoid(buf[7]);
    buf[0]=mat4(vec4(1.67,1.38,2.96,0.),vec4(-1.88,-1.48,-3.59,0.),vec4(-1.32,-1.09,-2.31,0.),vec4(0.26,0.23,0.44,0.))*buf[0]+mat4(vec4(-0.62,-0.59,-0.91,0.),vec4(0.17,0.18,0.18,0.),vec4(-2.96,-2.58,-4.90,0.),vec4(1.41,1.18,2.51,0.))*buf[1]+mat4(vec4(-1.25,-1.05,-2.16,0.),vec4(-0.72,-0.52,-1.43,0.),vec4(0.15,0.15,0.27,0.),vec4(0.94,0.88,1.27,0.))*buf[2]+mat4(vec4(-2.42,-1.96,-4.35,0.),vec4(-22.68,-18.05,-41.95,0.),vec4(0.63,0.54,1.10,0.),vec4(-1.54,-1.30,-2.64,0.))*buf[3]+mat4(vec4(-0.49,-0.39,-0.91,0.),vec4(0.95,0.79,1.64,0.),vec4(0.30,0.15,0.86,0.),vec4(1.18,0.94,2.17,0.))*buf[4]+mat4(vec4(0.35,0.32,0.59,0.),vec4(-0.58,-0.48,-1.06,0.),vec4(2.52,1.99,4.68,0.),vec4(0.13,0.08,0.30,0.))*buf[5]+mat4(vec4(-1.77,-1.40,-3.33,0.),vec4(3.16,2.63,5.37,0.),vec4(-3.17,-2.61,-5.54,0.),vec4(-2.85,-2.24,-5.30,0.))*buf[6]+mat4(vec4(1.52,1.22,2.84,0.),vec4(1.52,1.26,2.68,0.),vec4(2.97,2.43,5.23,0.),vec4(2.22,1.88,3.80,0.))*buf[7]+vec4(-1.54,-3.61,0.24,0.);
    buf[0]=sigmoid(buf[0]);
    return vec4(buf[0].x,buf[0].y,buf[0].z,1.);
}

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    // Center UVs for the CPPN
    vec2 cppn_uv = uv * 2.0 - 1.0;
    cppn_uv.x *= uResolution.x / uResolution.y;

    // Apply warp
    cppn_uv += uWarp * vec2(sin(cppn_uv.y * 3.0 + uTime * 0.5), cos(cppn_uv.x * 3.0 + uTime * 0.5)) * 0.1;

    // Get the complex color pattern
    vec4 col = cppn_fn(cppn_uv, 0.1*sin(uTime * 0.3), 0.1*sin(uTime * 0.5), 0.1*sin(uTime * 0.7));

    // Shift color and apply effects
    vec3 finalRGB = hueShiftRGB(col.rgb, uHueShift);
    
    // Add scanlines
    float scanline = sin(gl_FragCoord.y * uScanFreq) * 0.5 + 0.5;
    finalRGB *= 1.0 - (scanline * uScan);

    // Add noise
    finalRGB += (rand(gl_FragCoord.xy + uTime) - 0.5) * uNoise;

    gl_FragColor = vec4(finalRGB, 1.0);
}
`;

export default function DarkVeil({
    hueShift = 0,
    noiseIntensity = 0.02,
    scanlineIntensity = 0.1,
    speed = 0.5,
    scanlineFrequency = 2.0,
    warpAmount = 0.1,
    resolutionScale = 0.5
}) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            canvas,
            alpha: true
        });

        const gl = renderer.gl;
        const geometry = new Triangle(gl);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uHueShift: { value: hueShift },
                uNoise: { value: noiseIntensity },
                uScan: { value: scanlineIntensity },
                uScanFreq: { value: scanlineFrequency },
                uWarp: { value: warpAmount }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            const w = parent.clientWidth, h = parent.clientHeight;
            renderer.setSize(w, h);
            program.uniforms.uResolution.value.set(w * renderer.dpr, h * renderer.dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        let frame = 0;
        const start = performance.now();
        const loop = () => {
            program.uniforms.uTime.value = ((performance.now() - start) / 1000) * speed;
            program.uniforms.uHueShift.value = hueShift;
            program.uniforms.uNoise.value = noiseIntensity;
            program.uniforms.uScan.value = scanlineIntensity;
            program.uniforms.uScanFreq.value = scanlineFrequency;
            program.uniforms.uWarp.value = warpAmount;
            renderer.render({ scene: mesh });
            frame = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale]);

    return <canvas ref={ref} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}