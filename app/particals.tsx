"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
};

export default function MinimalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let raf = 0;

    const particles: Particle[] = [];
    const COUNT = 20;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;

      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.05,
          vy: -(Math.random() * 0.1 + 0.02),
          alpha: Math.random() * 0.2 + 0.05,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, w, h);

      const gradient = ctx.createRadialGradient(
        w / 2,
        h * 0.2,
        0,
        w / 2,
        h * 0.2,
        300
      );

      gradient.addColorStop(0, "rgba(255,255,255,0.03)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }

        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;

        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
    </>
  );
}