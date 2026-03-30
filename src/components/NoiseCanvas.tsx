"use client";

import { useEffect, useRef } from "react";

// Value noise — hash two integer coords to a float in [0, 1)
function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

// Smoothed value noise with bilinear interpolation
function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  // Smoothstep
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

// Fractional Brownian Motion — 3 octaves
function fbm(x: number, y: number): number {
  return (
    valueNoise(x, y) * 0.5 +
    valueNoise(x * 2.1 + 5.2, y * 2.1 + 1.3) * 0.25 +
    valueNoise(x * 4.3 + 2.1, y * 4.3 + 8.4) * 0.125
  );
}

const W = 96;
const H = 54;

export default function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen buffer at low resolution for performance
    const offCanvas = document.createElement("canvas");
    offCanvas.width = W;
    offCanvas.height = H;
    const offCtx = offCanvas.getContext("2d")!;
    const imgData = offCtx.createImageData(W, H);

    const state = { time: 0, mx: 0, my: 0, targetMx: 0, targetMy: 0, rafId: 0, lastFrame: 0 };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const onResize = () => setSize();
    const onMouse = (e: MouseEvent) => {
      state.targetMx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      state.targetMy = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });

    const INTERVAL = 1000 / 20; // 20fps cap

    function draw(timestamp: number) {
      state.rafId = requestAnimationFrame(draw);

      const elapsed = timestamp - state.lastFrame;
      if (elapsed < INTERVAL) return;
      state.lastFrame = timestamp - (elapsed % INTERVAL);
      state.time += 0.003;

      // Smooth mouse lerp — laggy, physical feel
      state.mx += (state.targetMx - state.mx) * 0.04;
      state.my += (state.targetMy - state.my) * 0.04;

      const t = state.time;
      const data = imgData.data;

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const nx = (x / W) * 2.8 + t * 0.25 + state.mx;
          const ny = (y / H) * 2.8 + t * 0.18 + state.my;
          const n = fbm(nx, ny);

          // fBm gives ~0.25–0.75 range; remap to 0–1
          const intensity = Math.max(0, Math.min(1, (n - 0.25) * 2.0));

          // Warm dark palette: base #0c0b0a, peak #201c17
          const r = Math.round(12 + intensity * 20);
          const g = Math.round(11 + intensity * 15);
          const b = Math.round(10 + intensity * 9);

          const i = (y * W + x) * 4;
          data[i]     = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }

      offCtx.putImageData(imgData, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(offCanvas, 0, 0, canvas.width, canvas.height);
    }

    state.rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
