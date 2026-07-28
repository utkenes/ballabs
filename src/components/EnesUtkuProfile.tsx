import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Code, Cpu, ShieldCheck, Github, Linkedin, Mail, ArrowUpRight, Zap } from 'lucide-react';

export const EnesUtkuProfile: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [history, setHistory] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([
    {
      command: 'bal-labs status',
      output: 'SYSTEM ONLINE • Lead Developer: Enes Utku • All Microservices Operational',
    },
    {
      command: 'help',
      output:
        'Kullanılabilir komutlar: enesutku, stack, projects, philosophy, status, contact, clear',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = 'Kullanılabilir komutlar: enesutku, stack, projects, philosophy, status, contact, clear';
        break;
      case 'enesutku':
        output =
          'Enes Utku | Founder & Lead Software Architect at Bal Labs. Yüksek performanslı dağıtık sistemler, AI mimarileri ve modern web teknolojileri üzerine uzmanlaşmıştır.';
        break;
      case 'stack':
        output =
          'Core Stack: React 19, TypeScript, Node.js Express, Gemini 3.6 Flash, Redis, PostgreSQL, Docker, Cloud Run, Tailwind CSS v4.';
        break;
      case 'projects':
        output =
          'Aura AI Engine, Vortex Cloud Core, Apex Enterprise SaaS, Hyperion SEO Engine.';
        break;
      case 'philosophy':
        output =
          '"Temiz kod, sıfır gereksiz yük (zero bloat), alt-30ms yanıt süreleri ve %100 SEO uyumu Bal Labs mühendislik ilkesidir."';
        break;
      case 'status':
        output =
          'Bal Labs System Health: OK (Uptime 99.99%) • Enes Utku: Q3/Q4 projeleri kabul ediliyor.';
        break;
      case 'contact':
        output = 'E-posta: utk.enes@gmail.com | Form: #iletisim bölümünü kullanın.';
        break;
      case 'clear':
        setHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Komut bulunamadı: '${cmd}'. Kullanılabilir komutları görmek için 'help' yazın.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setTerminalInput('');
  };

  return (
    <section id="enes-utku" className="py-24 relative bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-amber-500/20 text-slate-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Developer Spotlight &amp; Mimari Liderlik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Lead Developer <span className="text-amber-400">Enes Utku</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Bal Labs'ın arkasındaki mühendislik zekası. Modern yazılım standartlarını,
            performans odaklı kod yapısını ve yapay zeka otomasyonlarını bir araya getiriyor.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Bio Card */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-xl">
                  <div className="w-full h-full rounded-[14px] bg-[#090a0f] flex items-center justify-center font-mono font-extrabold text-2xl text-amber-400">
                    EU
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Enes Utku</h3>
                  <p className="text-xs font-mono text-amber-400">
                    Founder &amp; Lead Systems Architect
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">Bal Labs Studio</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                "Bal Labs'ta temel amacımız, karmaşık iş gereksinimlerini en sade, en hızlı ve en
                güvenli dijital mimarilere dönüştürmektir. Kullanıcı deneyimini yavaşlatan hiç bir
                gereksiz yükü (bloatware) kabul etmiyoruz."
              </p>

              {/* Engineering Principles */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  MÜHENDİSLİK İLKELERİ:
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Performance First:</strong> Sub-30ms API yanıt süreleri &amp; 60 FPS UI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong>Katmanlı Güvenlik:</strong> Sıfır güven mimarisi ve API koruma
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>
                      <strong>Clean Architecture:</strong> Modüler, test edilebilir ve sürdürülebilir kod
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/enesutku"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#131622] hover:bg-white/10 text-slate-300 hover:text-amber-400 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/enesutku"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#131622] hover:bg-white/10 text-slate-300 hover:text-amber-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:utk.enes@gmail.com"
                  className="p-2 rounded-xl bg-[#131622] hover:bg-white/10 text-slate-300 hover:text-amber-400 transition-colors"
                  aria-label="Email Enes Utku"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <a
                href="#iletisim"
                className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Enes Utku İle Görüşün</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Interactive CLI Terminal */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0d0f17] border border-white/10 p-5 sm:p-6 font-mono text-xs text-slate-300 flex flex-col justify-between shadow-2xl space-y-4">
            <div>
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-[11px] text-slate-400 ml-2">enes-utku@bal-labs:~</span>
                </div>
                <span className="text-[10px] text-amber-400">Interactive CLI</span>
              </div>

              {/* Terminal Console Stream */}
              <div className="py-4 space-y-3 max-h-[260px] overflow-y-auto pr-2">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold">
                      <span>bal-labs$&gt;</span>
                      <span className="text-slate-100">{item.command}</span>
                    </div>
                    <div className="text-slate-300 pl-4 text-[11px] leading-relaxed">
                      {item.output}
                    </div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Terminal Command Input Form */}
            <form onSubmit={handleCommandSubmit} className="pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Komut yazın (örn: help, stack, enesutku)..."
                className="w-full bg-transparent border-none text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
              />
              <button type="submit" className="text-[10px] text-amber-400 font-mono hover:underline">
                [ENTER]
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
