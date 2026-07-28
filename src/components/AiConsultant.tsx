import React, { useState } from 'react';
import { AiArchitectResult } from '../types';
import { Sparkles, Cpu, Clock, CheckCircle2, ArrowRight, Loader2, Code, Shield, Terminal, Zap, X } from 'lucide-react';

interface AiConsultantProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectArchitecture?: (plan: AiArchitectResult) => void;
}

export const AiConsultant: React.FC<AiConsultantProps> = ({
  isOpen = false,
  onClose,
  onSelectArchitecture,
}) => {
  const [prompt, setPrompt] = useState('');
  const [projectType, setProjectType] = useState('SaaS Platformu');
  const [budget, setBudget] = useState('Standart (100k - 250k TL)');
  const [scope, setScope] = useState('Tam Kapsamlı (Frontend, Backend, Cloud)');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiArchitectResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    {
      title: 'Yapay Zeka Destekli SaaS',
      desc: 'LLM entegrasyonlu, abonelik yönetimli modern SaaS mimarisi.',
      type: 'SaaS Platformu',
    },
    {
      title: 'Fintek & E-Ticaret Core',
      desc: 'Sub-30ms ödeme ve sipariş altyapısı, yüksek güvenlik.',
      type: 'E-Ticaret & Fintek',
    },
    {
      title: 'Kurumsal Bulut ERP',
      desc: 'Mikroservis mimarili, rol bazlı yetkilendirme ve stok takibi.',
      type: 'Kurumsal Yazılım',
    },
    {
      title: 'SEO Odaklı Web Portalı',
      desc: 'Lighthouse 100/100, dinamik SSR ve ultra hızlı içerik sunumu.',
      type: 'Performanslı Web',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Lütfen projeniz için kısa bir açıklama veya fikir yazın.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, projectType, budget, scope }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || 'Mimari analiz oluşturulamadı. Lütfen tekrar deneyin.');
      }
    } catch (err: any) {
      console.error('AI Consultant fetch error:', err);
      setError('Sunucu bağlantı hatası oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div id="ai-danismani" className="space-y-8">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Gemini AI Mimarı • Bal Labs Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Yapay Zeka Destekli <span className="text-amber-400">Proje &amp; Mimari Analizörü</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Proje fikrinizi tanımlayın. Bal Labs AI Danışmanı ve Lead Developer Enes Utku mimari
          prensipleri doğrultusunda saniyeler içinde özel bir teknoloji haritası oluştursun.
        </p>
      </div>

      {/* Preset cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setPrompt(preset.desc);
              setProjectType(preset.type);
            }}
            className="text-left p-3.5 rounded-xl bg-[#131622] hover:bg-[#1a1e30] border border-white/10 hover:border-amber-500/40 transition-all group duration-200"
          >
            <div className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 flex items-center justify-between mb-1">
              <span>{preset.title}</span>
              <Zap className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              {preset.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Input Panel */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono font-medium text-slate-300">
            PROJE FİKRİNİZ VEYA İHTİYAÇLARINIZ:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="Örn: Kullanıcıların video içeriklerini yapay zeka ile otomatik özetleyen, Stripe ödeme entegrasyonlu ve yüksek SEO performanslı bir SaaS platformu..."
            className="w-full bg-[#090a0f] border border-white/10 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all font-sans"
          />
        </div>

        {/* Configurations */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5">PROJE TİPİ</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
            >
              <option value="SaaS Platformu">SaaS Platformu</option>
              <option value="E-Ticaret & Fintek">E-Ticaret &amp; Fintek Core</option>
              <option value="Yapay Zeka Entegrasyonu">Yapay Zeka &amp; LLM Entegrasyonu</option>
              <option value="Kurumsal Yazılım">Kurumsal Özel ERP / CRM</option>
              <option value="Performanslı Web">SEO &amp; Yüksek Hızlı Portal</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5">BÜTÇE DÜZEYİ</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
            >
              <option value="Başlangıç (50k - 100k TL)">Başlangıç MVP (50k - 100k TL)</option>
              <option value="Standart (100k - 250k TL)">Standart Proje (100k - 250k TL)</option>
              <option value="İleri Ölçek (250k+ TL)">İleri Ölçek Enterprise (250k+ TL)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1.5">KAPSAM</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
            >
              <option value="Tam Kapsamlı (Frontend, Backend, Cloud)">Tam Kapsamlı (End-to-End)</option>
              <option value="Yalnızca AI & Backend Mimarisi">AI &amp; Backend Mimarisi</option>
              <option value="UI/UX & Frontend Performansı">UI/UX &amp; High-Perf Frontend</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* Generate CTA Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090a0f] font-semibold text-sm shadow-xl shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#090a0f]" />
              <span>Bal Labs AI Mimarisi Analiz Ediliyor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#090a0f]" />
              <span>Mimari Analizi ve Haritayı Üret</span>
            </>
          )}
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-amber-500/30 space-y-6 amber-glow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                MİMARİ PLAN RAPORU
              </div>
              <h3 className="text-2xl font-bold text-slate-100">{result.projectTitle}</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Tahmini Süre: {result.estimatedTimelineWeeks} Hafta</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {result.architectureOverview}
          </p>

          {/* Tech Stack Badges */}
          <div>
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-amber-400" />
              ÖNERİLEN TEKNOLOJİ YIĞINI:
            </div>
            <div className="flex flex-wrap gap-2">
              {result.recommendedStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#131622] border border-white/10 text-xs font-mono text-amber-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Modules Grid */}
          <div>
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              TEMEL SİSTEM MODÜLLERİ:
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {result.keyModules.map((mod, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#090a0f]/80 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="text-amber-400 font-mono">0{idx + 1}.</span>
                    <span>{mod.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">{mod.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Advice Note from Enes Utku */}
          <div className="p-4 rounded-xl bg-[#131622] border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Lead Developer Enes Utku Notu:</span>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{result.expertAdvice}"
            </p>
          </div>

          {/* Contact Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Bu mimari plan Bal Labs altyapısına uyumlu olarak hemen projelendirilebilir.
            </div>

            <a
              href="#iletisim"
              onClick={() => {
                if (onSelectArchitecture) onSelectArchitecture(result);
                if (onClose) onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090a0f] font-semibold text-xs shadow-lg transition-all"
            >
              <span>Bu Mimari İle Proje Başlatın</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#090a0f] rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#131622] text-slate-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 relative bg-gradient-to-b from-transparent via-[#0d0f17] to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{content}</div>
    </section>
  );
};
