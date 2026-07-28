import React, { useState } from 'react';
import { ShieldCheck, Search, Globe, Code, CheckCircle, RefreshCw } from 'lucide-react';

export const SeoAuditTool: React.FC = () => {
  const [siteUrl, setSiteUrl] = useState('https://ballabs.dev');
  const [siteTitle, setSiteTitle] = useState('Bal Labs | Modern & Minimalist Yazılım Şirketi');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>({
    score: { performance: 100, seo: 100, accessibility: 100, bestPractices: 100 },
    schemaOrg: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareHouse',
      name: 'Bal Labs',
      founder: 'Enes Utku',
      description: 'Bal Labs, Enes Utku liderliğinde yüksek performanslı yazılım ve AI sistemleri sunar.',
    },
    metaTags: {
      title: 'Bal Labs | Modern & Minimalist Yazılım Şirketi - Lead Developer Enes Utku',
      description: 'Geleceğin yazılım teknolojileri & dijital ürün laboratuvarı.',
    },
  });

  const handleTestAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: siteUrl, title: siteTitle }),
      });
      const data = await res.json();
      if (data.success) {
        setAuditResult(data);
      }
    } catch (err) {
      console.error('SEO audit fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="seo-mimariler" className="py-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-amber-500/20 text-slate-300 text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>SEO Uyumlu &amp; Performanslı Altyapı Güvencesi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Sıfır Gecikme &amp; <span className="text-amber-400">Teknik SEO Standartları</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Bal Labs tarafından yazılan her kod satırı, arama motorlarında üst sıralara çıkmak
            ve anında yüklenmek üzere SEO &amp; Core Web Vitals prensiplerine tam uyumludur.
          </p>
        </div>

        {/* Lighthouse Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'SEO Skoru', val: '100', color: 'text-emerald-400', desc: 'Google Bot Uyumlu' },
            { label: 'Performans', val: '100', color: 'text-amber-400', desc: 'Lighthouse Certified' },
            { label: 'Erişilebilirlik', val: '100', color: 'text-indigo-400', desc: 'WCAG 2.1 Standardı' },
            { label: 'En İyi Uygulamalar', val: '100', color: 'text-emerald-400', desc: 'Sıfır Güvenlik Açığı' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2 group hover:border-amber-500/40 transition-colors"
            >
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-500/10">
                  <span className={`text-xl font-mono font-extrabold ${item.color}`}>
                    {item.val}
                  </span>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-100">{item.label}</div>
              <div className="text-[11px] text-slate-400 font-mono">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Interactive SEO Simulator */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Dinamik SEO &amp; Schema Testi</h3>
              <p className="text-xs text-slate-400">
                Bal Labs'ın canlı SEO ve JSON-LD yapılandırılmış veri üreticisini test edin.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="https://siteniz.com"
                className="bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleTestAudit}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-amber-400 text-[#090a0f] font-semibold text-xs flex items-center gap-1 hover:bg-amber-300 transition-colors shrink-0"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Test Et</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Google Search Result Card Preview */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400">GOOGLE ARAMA ÖNİZLEMESİ:</div>
              <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10 space-y-1 font-sans">
                <div className="text-[11px] text-emerald-400 font-mono truncate">{siteUrl}</div>
                <div className="text-base font-semibold text-blue-400 hover:underline cursor-pointer">
                  {auditResult.metaTags?.title}
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">
                  {auditResult.metaTags?.description}
                </div>
              </div>
            </div>

            {/* JSON-LD Schema Code View */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400">JSON-LD STRUCTURAL SCHEMA:</div>
              <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10 font-mono text-[11px] text-amber-200/90 max-h-36 overflow-y-auto">
                <pre>{JSON.stringify(auditResult.schemaOrg, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
