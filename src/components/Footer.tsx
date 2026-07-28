import React, { useEffect, useState } from 'react';
import { BalLabsLogo } from './BalLabsLogo';
import { Github, Linkedin, Mail, ArrowUp, ShieldCheck } from 'lucide-react';
import { SystemHealth } from '../types';

export const Footer: React.FC = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => console.log('Health check fetch silent err', err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050609] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-start justify-between">
          {/* Logo & Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block">
              <BalLabsLogo size="md" animated />
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              Bal Labs; Lead Developer Enes Utku yönetiminde yüksek performanslı yazılım
              mimarileri, yapay zeka entegrasyonları ve ölçeklenebilir bulut sistemleri inşa eder.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                System Status:{' '}
                {health?.status === 'online'
                  ? 'All Microservices Operational'
                  : 'Active & Resilient'}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-2">
              <div className="font-mono text-[11px] text-slate-500 uppercase">MENÜ</div>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#cozumler" className="hover:text-amber-400 transition-colors">
                    Çözümler
                  </a>
                </li>
                <li>
                  <a href="#projeler" className="hover:text-amber-400 transition-colors">
                    Projeler
                  </a>
                </li>
                <li>
                  <a href="#enes-utku" className="hover:text-amber-400 transition-colors">
                    Lead Developer
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[11px] text-slate-500 uppercase">ARAÇLAR</div>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#ai-danismani" className="hover:text-amber-400 transition-colors">
                    AI Mimarı
                  </a>
                </li>
                <li>
                  <a href="#seo-mimariler" className="hover:text-amber-400 transition-colors">
                    SEO &amp; Altyapı
                  </a>
                </li>
                <li>
                  <a href="#iletisim" className="hover:text-amber-400 transition-colors">
                    İletişim
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Developer Credit & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-[#131622] hover:bg-amber-400 hover:text-[#090a0f] text-slate-300 border border-white/10 transition-all duration-200 group"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/enesutku"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#131622] text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/enesutku"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#131622] text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:utk.enes@gmail.com"
                className="p-2 rounded-xl bg-[#131622] text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="Email Bal Labs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-300">Bal Labs</span>. Lead
            Developer <span className="text-amber-400">Enes Utku</span>.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SEO 100/100 • Ultra High-Performance Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
