import React, { useEffect, useRef } from 'react';

interface ShaderBackgroundProps {
  speedMultiplier?: number;
  interactive?: boolean;
  opacity?: number;
  className?: string;
}

export const ShaderBackground: React.FC<ShaderBackgroundProps> = ({
  speedMultiplier = 1.0,
  interactive = true,
  opacity = 0.5,
  className = 'fixed inset-0 w-full h-full -z-10 pointer-events-none'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let isCleanedUp = false;

    // Sync WebGL buffer resolution with CSS layout size
    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth || 1280;
      const h = canvas.clientHeight || window.innerHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported on this device/browser');
      return;
    }

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      vec3 hsb2rgb(in vec3 c){
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        rgb = rgb * rgb * (3.0 - 2.0 * rgb);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }

      void main() {
        vec2 st = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        float t = u_time * 0.15;
        
        // Create multiple moving centers for the "aurora" effect
        vec2 p1 = vec2(0.5 + 0.3 * cos(t), 0.5 + 0.2 * sin(t * 1.2));
        vec2 p2 = vec2(0.2 + 0.2 * sin(t * 0.8), 0.8 + 0.1 * cos(t * 1.5));
        vec2 p3 = vec2(0.8 + 0.1 * cos(t * 1.1), 0.2 + 0.2 * sin(t * 0.9));
        
        // Interactions with mouse
        p1 = mix(p1, mouse, 0.12);
        
        float d1 = length(st - p1);
        float d2 = length(st - p2);
        float d3 = length(st - p3);
        
        // Vibrant colors from Aether Glass design system
        vec3 blue = vec3(0.23, 0.51, 0.96);    // Electric Blue (#4D8EFF)
        vec3 cyan = vec3(0.02, 0.71, 0.83);    // Cyan (#03B5D3)
        vec3 purple = vec3(0.55, 0.36, 0.96);  // Purple (#A078FF)
        
        // Mix them based on distance and time
        vec3 color = blue * smoothstep(0.8, 0.0, d1);
        color += cyan * smoothstep(0.6, 0.0, d2);
        color += purple * smoothstep(0.7, 0.0, d3);
        
        // Subtle shimmer / noise
        float noise = fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
        color += noise * 0.025;
        
        // Background base (Deep Navy #0B1326)
        vec3 bg = vec3(0.043, 0.074, 0.149);
        
        gl_FragColor = vec4(mix(bg, color, 0.45), 1.0);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader | null {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vShader = compileShader(gl.VERTEX_SHADER, vs);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vShader || !fShader) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas || !interactive) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function render(t: number) {
      if (isCleanedUp || !gl || !canvas) return;
      if (!resizeObserver) syncSize();

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001 * speedMultiplier);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isCleanedUp = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(prog);
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        gl.deleteBuffer(buf);
      }
    };
  }, [speedMultiplier, interactive]);

  return (
    <div className={className} style={{ opacity }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 bg-background/40 mix-blend-multiply pointer-events-none" />
    </div>
  );
};
