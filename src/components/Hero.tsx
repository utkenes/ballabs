import React, { useState, useEffect, useRef } from 'react';
import { BalLabsLogo } from './BalLabsLogo';
import { Sparkles, ArrowRight, Terminal, ShieldCheck, Cpu, Code2, Zap, Layers } from 'lucide-react';

interface HeroProps {
  onOpenConsultant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultant }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeParticles, setActiveParticles] = useState(0);

  // Interactive Orbital Ring Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system following Bal Labs orbital paths
    interface Particle {
      angle: number;
      speed: number;
      radiusX: number;
      radiusY: number;
      orbitType: 'hTop' | 'hBottom' | 'vCenter';
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      const orbitTypes: ('hTop' | 'hBottom' | 'vCenter')[] = ['hTop', 'hBottom', 'vCenter'];
      const orbit = orbitTypes[i % 3];
      particles.push({
        angle: Math.random() * Math.PI * 2,
        speed: (0.005 + Math.random() * 0.01) * (i % 2 === 0 ? 1 : -1),
        radiusX: orbit === 'vCenter' ? 65 : 140,
        radiusY: orbit === 'vCenter' ? 140 : 65,
        orbitType: orbit,
        size: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.4 ? '#fbbf24' : '#f8fafc',
        alpha: 0.3 + Math.random() * 0.7,
      });
    }

    setActiveParticles(particles.length);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw faint wireframe orbits matching Bal Labs Logo
      ctx.lineWidth = 1;

      // Top Orbit
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 25, 130, 60, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.stroke();

      // Bottom Orbit
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 25, 130, 60, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.stroke();

      // Vertical Orbit
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 60, 130, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.stroke();

      // Golden Intersecting Highlights
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 25, 130, 60, 0, Math.PI * 0.1, Math.PI * 0.9);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 25, 130, 60, 0, Math.PI * 1.1, Math.PI * 1.9);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Render moving particles
      particles.forEach((p) => {
        p.angle += p.speed;

        let px = centerX;
        let py = centerY;

        if (p.orbitType === 'hTop') {
          px = centerX + Math.cos(p.angle) * p.radiusX;
          py = centerY - 25 + Math.sin(p.angle) * p.radiusY;
        } else if (p.orbitType === 'hBottom') {
          px = centerX + Math.cos(p.angle) * p.radiusX;
          py = centerY + 25 + Math.sin(p.angle) * p.radiusY;
        } else {
          px = centerX + Math.cos(p.angle) * p.radiusX;
          py = centerY + Math.sin(p.angle) * p.radiusY;
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.8 + 0.2 * Math.sin(frame * 0.05));
        ctx.fill();

        // Connect nearby particles with subtle energy lines
        particles.forEach((p2) => {
          if (p === p2) return;
          let p2x = centerX;
          let p2y = centerY;
          if (p2.orbitType === 'hTop') {
            p2x = centerX + Math.cos(p2.angle) * p2.radiusX;
            p2y = centerY - 25 + Math.sin(p2.angle) * p2.radiusY;
          } else if (p2.orbitType === 'hBottom') {
            p2x = centerX + Math.cos(p2.angle) * p2.radiusX;
            p2y = centerY + 25 + Math.sin(p2.angle) * p2.radiusY;
          } else {
            p2x = centerX + Math.cos(p2.angle) * p2.radiusX;
            p2y = centerY + Math.sin(p2.angle) * p2.radiusY;
          }

          const dx = px - p2x;
          const dy = py - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 55) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern bg-radial-glow">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131622] border border-amber-500/20 text-slate-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-amber-400 font-semibold tracking-wider uppercase">
                Bal Labs
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Software & Tech Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.12]">
              Geleceğin Yazılım Teknolojileri &amp;{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Dijital Ürün Laboratuvarı
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Bal Labs; Lead Developer{' '}
              <span className="text-slate-100 font-semibold underline decoration-amber-500/50 underline-offset-4">
                Enes Utku
              </span>{' '}
              yönetiminde yüksek performanslı web sistemleri, yapay zeka mimarileri, mikroservis
              altyapıları ve minimalist kullanıcı deneyimleri inşa eder.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#090a0f] bg-amber-400 hover:bg-amber-300 rounded-full shadow-xl shadow-amber-500/25 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Projenizi Başlatın</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenConsultant}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-[#131622] hover:bg-[#1c2033] border border-amber-500/30 hover:border-amber-400 rounded-full transition-all duration-200 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Mimarı İle Keşfet</span>
              </button>

              <a
                href="#enes-utku"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Lead Dev: Enes Utku</span>
              </a>
            </div>

            {/* Badges Ribbon */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-xl font-mono font-bold text-slate-100 flex items-center gap-1">
                  <span>&lt;30ms</span>
                  <Zap className="w-4 h-4 text-amber-400 inline" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Hedef API Latency</div>
              </div>

              <div>
                <div className="text-xl font-mono font-bold text-slate-100 flex items-center gap-1">
                  <span>99.99%</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Cloud Uptime</div>
              </div>

              <div>
                <div className="text-xl font-mono font-bold text-slate-100 flex items-center gap-1">
                  <span>100/100</span>
                  <Cpu className="w-4 h-4 text-indigo-400 inline" />
                </div>
                <div className="text-xs text-slate-400 font-medium">SEO & Performance</div>
              </div>

              <div>
                <div className="text-xl font-mono font-bold text-amber-400 flex items-center gap-1">
                  <span>Enes Utku</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">Software Architect</div>
              </div>
            </div>
          </div>

          {/* Right Interactive Orbital Canvas Component */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-square rounded-3xl glass-card p-6 border border-white/10 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Orbital Particle Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              />

              {/* Center Logo Showcase */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4 my-auto">
                <div className="p-4 rounded-2xl bg-[#090a0f]/80 border border-amber-500/30 shadow-2xl amber-glow-lg group hover:scale-105 transition-transform duration-500">
                  <BalLabsLogo size="xl" showText={false} animated />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-100 font-sans">
                    bal <span className="text-amber-500">a</span> labs
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    High-Performance Systems Laboratory
                  </p>
                </div>

                {/* Floating Micro-Badges */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#131622] border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-amber-400" /> React 19 / Node
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#131622] border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" /> Gemini AI
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#131622] border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-emerald-400" /> SEO &amp; Cloud
                  </span>
                </div>
              </div>

              {/* Live Status Overlay */}
              <div className="relative z-10 w-full mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Orbital Engine: Active</span>
                </div>
                <span>Lead Dev: Enes Utku</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
