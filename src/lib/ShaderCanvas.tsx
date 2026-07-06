import React, { useEffect, useRef } from 'react';
import { useMounted } from './useMounted';

/**
 * A small WebGL fragment-shader surface for the landing pages' ambient layers
 * (the ports of the apps' Metal shaders).
 *
 * Behavior contract:
 *  - SSR-safe: renders nothing until mounted, so prerendered HTML stays clean
 *    and every page must keep a static CSS fallback painted underneath.
 *  - Pauses when off-screen (IntersectionObserver) and when the tab is hidden.
 *  - `prefers-reduced-motion` → draws exactly one frame at t = 0, no loop.
 *  - DPR capped (grain wants ≥1; blurred fields don't need more than 1.5).
 *  - Survives context loss; failure is silent (the CSS fallback remains).
 *
 * The fragment source receives:
 *   uniform vec2  u_res;   // canvas size in physical px
 *   uniform float u_time;  // seconds since start
 *   plus any custom float/vec uniforms passed via `uniforms`.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

interface ShaderCanvasProps {
  frag: string;
  uniforms?: Record<string, number | number[]>;
  dprCap?: number;
  /** Approximate frame budget; ambient washes don't need 60fps. */
  fps?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ShaderCanvas: React.FC<ShaderCanvasProps> = ({
  frag,
  uniforms,
  dprCap = 1.5,
  fps = 60,
  className,
  style,
}) => {
  const mounted = useMounted();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[ShaderCanvas]', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[ShaderCanvas]', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Fullscreen triangle.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let lastFrame = 0;
    const frameBudget = 1000 / fps;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const setCustomUniforms = () => {
      const u = uniformsRef.current;
      if (!u) return;
      for (const [name, val] of Object.entries(u)) {
        const l = gl.getUniformLocation(prog, name);
        if (!l) continue;
        if (typeof val === 'number') gl.uniform1f(l, val);
        else if (val.length === 2) gl.uniform2f(l, val[0], val[1]);
        else if (val.length === 3) gl.uniform3f(l, val[0], val[1], val[2]);
        else if (val.length === 4) gl.uniform4f(l, val[0], val[1], val[2], val[3]);
      }
    };

    const draw = (t: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      setCustomUniforms();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !pageVisible) return;
      if (now - lastFrame < frameBudget) return;
      lastFrame = now;
      draw((now - start) / 1000);
    };

    if (reduced) {
      // Static single frame — the texture without the motion.
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onVis = () => (pageVisible = !document.hidden);
    document.addEventListener('visibilitychange', onVis);
    // If the GPU ever evicts the context, a dead canvas can composite as an
    // opaque white rect — hide it so the CSS fallback layer shows instead.
    const onLost = (e: Event) => {
      e.preventDefault();
      canvas.style.display = 'none';
    };
    const onRestored = () => {
      canvas.style.display = 'block';
    };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    return () => {
      // Note: never loseContext() here — React StrictMode remounts effects on
      // the same canvas element, and a lost context can't be re-acquired.
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [mounted, frag, dprCap, fps]);

  if (!mounted) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }}
    />
  );
};
