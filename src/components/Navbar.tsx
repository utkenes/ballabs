import React, { useState, useEffect } from 'react';
import { BalLabsLogo } from './BalLabsLogo';
import { Menu, X, ArrowUpRight, Sparkles, Code2, Terminal, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenConsultant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultant }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Çözümler', href: '#cozumler' },
    { name: 'Projeler', href: '#projeler' },
    { name: 'Lead Developer', href: '#enes-utku' },
    { name: 'AI Danışmanı', href: '#ai-danismani' },
    { name: 'SEO & Mimariler', href: '#seo-mimariler' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <BalLabsLogo size="md" animated />
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#131622]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-amber-400 px-3 py-1.5 rounded-full transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions & Developer Status */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Status pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Enes Utku • Müsait</span>
            </div>

            {/* AI Assistant Button */}
            {onOpenConsultant && (
              <button
                onClick={onOpenConsultant}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-full transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>AI Mimarı</span>
              </button>
            )}

            {/* Primary Action */}
            <a
              href="#iletisim"
              className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#090a0f] bg-amber-400 hover:bg-amber-300 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-200 hover:scale-105"
            >
              <span>Proje Başlat</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-[#131622] border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0f17]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Lead Developer Enes Utku - Aktif</span>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#090a0f] bg-amber-400 rounded-xl shadow-lg shadow-amber-500/20"
            >
              <span>Proje Başlatın</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
