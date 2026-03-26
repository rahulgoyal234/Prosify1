import React, { useEffect, useRef } from 'react';

const CITIES: [number, number, string][] = [
  [28.6, 77.2, 'Delhi'],
  [19.0, 72.8, 'Mumbai'],
  [12.9, 77.6, 'Bangalore'],
  [22.5, 88.3, 'Kolkata'],
  [40.7, -74.0, 'New York'],
  [37.7, -122.4, 'San Francisco'],
  [34.0, -118.2, 'Los Angeles'],
  [51.5, -0.1, 'London'],
  [48.8, 2.3, 'Paris'],
  [52.5, 13.4, 'Berlin'],
  [52.3, 4.9, 'Amsterdam'],
  [25.2, 55.3, 'Dubai'],
  [24.4, 54.4, 'Abu Dhabi'],
  [1.3, 103.8, 'Singapore'],
  [-33.8, 151.2, 'Sydney'],
  [-37.8, 144.9, 'Melbourne'],
  [43.7, -79.4, 'Toronto'],
  [45.5, -73.6, 'Montreal'],
  [35.6, 139.6, 'Tokyo'],
  [37.5, 126.9, 'Seoul'],
  [31.2, 121.4, 'Shanghai'],
  [22.3, 114.1, 'Hong Kong'],
  [-23.5, -46.6, 'São Paulo'],
  [19.4, -99.1, 'Mexico City'],
  [55.7, 37.6, 'Moscow'],
  [-1.3, 36.8, 'Nairobi'],
  [6.5, 3.3, 'Lagos'],
];

const ARCS = [
  [0, 4], [0, 5], [1, 11], [3, 7], [4, 14], [5, 13], [7, 11], [7, 18], [4, 17], [0, 7], [2, 22]
];

const LAT_LINES = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
const LON_LINES = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];

export const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W: number, H: number, R: number;
    let rot = 0;
    let dragging = false;
    let lastX = 0;
    let vel = 0;
    let animationFrameId: number;

    const resize = () => {
      const b = canvas.parentElement?.getBoundingClientRect();
      if (!b) return;
      W = b.width;
      H = b.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      R = Math.min(W, H) * 0.435;
    };

    const project = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + rot * 180 / Math.PI) * Math.PI / 180;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      return { x: W / 2 + x, y: H / 2 - y, z, vis: z > -r * 0.08 };
    };

    const drawLine = (pts: { x: number; y: number; vis: boolean }[], color: string, lineWidth: number, dash?: number[]) => {
      ctx.beginPath();
      let first = true;
      for (const p of pts) {
        if (!p.vis) {
          first = true;
          continue;
        }
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(dash || []);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Atmosphere glow
      const atm = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.28);
      atm.addColorStop(0, 'rgba(201,168,76,.07)');
      atm.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.28, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // Base sphere
      const base = ctx.createRadialGradient(cx - R * .22, cy - R * .18, R * .04, cx, cy, R);
      base.addColorStop(0, '#2a2420');
      base.addColorStop(1, '#0f0d0c');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = base;
      ctx.fill();

      // Latitude grid
      LAT_LINES.forEach(lat => {
        const pts = [];
        for (let l = -180; l <= 180; l += 2) pts.push(project(lat, l, R));
        const isEq = lat === 0;
        drawLine(pts,
          isEq ? 'rgba(201,168,76,.25)' : 'rgba(201,168,76,.08)',
          isEq ? 0.9 : 0.35
        );
      });

      // Tropics (dashed)
      [23.4, -23.4].forEach(lat => {
        const pts = [];
        for (let l = -180; l <= 180; l += 2) pts.push(project(lat, l, R));
        drawLine(pts, 'rgba(201,168,76,.13)', 0.5, [3, 5]);
      });

      // Longitude grid
      LON_LINES.forEach(lon => {
        const pts = [];
        for (let l = -88; l <= 88; l += 2) pts.push(project(l, lon, R));
        const isPM = lon === 0;
        drawLine(pts,
          isPM ? 'rgba(201,168,76,.22)' : 'rgba(201,168,76,.07)',
          isPM ? 0.7 : 0.35
        );
      });

      // City arc connections
      ARCS.forEach(([a, b]) => {
        const pa = project(CITIES[a][0], CITIES[a][1], R);
        const pb = project(CITIES[b][0], CITIES[b][1], R);
        if (!pa.vis || !pb.vis) return;
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - R * 0.22;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y);
        ctx.strokeStyle = 'rgba(201,168,76,.12)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // City dots + pulse rings
      const now = performance.now();
      CITIES.forEach((city, i) => {
        const p = project(city[0], city[1], R);
        if (!p.vis) return;

        const depth = (p.z / R + 1) / 2;
        const alpha = 0.22 + depth * 0.78;

        const phase = ((now * 0.00055 + i * 0.43) % 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8 + phase * 15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,168,76,${(1 - phase) * 0.42 * alpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8 + depth * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx.fill();

        if (depth > 0.6 && R > 100) {
          const fs = Math.max(8.5, Math.min(11.5, R * 0.022));
          ctx.font = `300 ${fs}px 'DM Sans', sans-serif`;
          ctx.fillStyle = `rgba(201,168,76,${alpha * 0.65})`;
          ctx.fillText(city[2], p.x + 5, p.y + 3.5);
        }
      });

      // Edge depth vignette
      const edge = ctx.createRadialGradient(cx, cy, R * 0.68, cx, cy, R);
      edge.addColorStop(0, 'rgba(0,0,0,0)');
      edge.addColorStop(1, 'rgba(0,0,0,.62)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = edge;
      ctx.fill();

      // Specular glint
      const spec = ctx.createRadialGradient(
        cx - R * .28, cy - R * .25, 0,
        cx - R * .12, cy - R * .12, R * .42
      );
      spec.addColorStop(0, 'rgba(255,244,210,.08)');
      spec.addColorStop(1, 'rgba(255,244,210,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      // Rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,168,76,.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!dragging) {
        vel *= 0.92;
        rot += 0.004 + vel * 0.28;
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    const handleMouseDown = (e: MouseEvent) => {
      dragging = true;
      lastX = e.clientX;
      vel = 0;
    };

    const handleMouseUp = () => {
      dragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const d = (e.clientX - lastX) / R;
      vel = d;
      rot += d;
      lastX = e.clientX;
    };

    const handleTouchStart = (e: TouchEvent) => {
      dragging = true;
      lastX = e.touches[0].clientX;
      vel = 0;
    };

    const handleTouchEnd = () => {
      dragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const d = (e.touches[0].clientX - lastX) / R * 0.65;
      vel = d;
      rot += d;
      lastX = e.touches[0].clientX;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-[500px] mx-auto">
      <div className="absolute inset-[-40px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.15)_0%,transparent_65%)] pointer-events-none animate-globe-halo" />
      <canvas ref={canvasRef} className="block w-full h-full cursor-grab active:cursor-grabbing rounded-full" />
    </div>
  );
};
