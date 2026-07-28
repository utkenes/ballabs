import React, { useState } from 'react';
import { FlagshipProject } from '../types';
import { ExternalLink, Layers, Shield, Cpu, Activity, Zap, Code, CheckCircle2, X } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [activeProject, setActiveProject] = useState<FlagshipProject | null>(null);

  const projects: FlagshipProject[] = [
    {
      id: 'aura-ai',
      title: 'Aura AI Engine',
      subtitle: 'Otonom AI Temsilci & LLM Orkestrasyonu',
      category: 'AI & ML',
      description:
        'Kurumsal süreçleri otomatize eden, Gemini 3.6 Flash modelleri ile canlı veri akışlarını işleyen yüksek performanslı yapay zeka ajanı.',
      tags: ['Gemini 3.6 Flash', 'Node.js', 'Redis Cache', 'TypeScript'],
      metrics: [
        { label: 'Yanıt Süresi', value: '28ms' },
        { label: 'Doğruluk Oranı', value: '99.4%' },
      ],
      architecture: [
        'Sunucu tarafı güvenli Gemini API Proxy',
        'Redis tabanlı anlık sohbet hafızası',
        'Çoklu model yönlendirme mantığı',
      ],
      featured: true,
      imageAlt: 'Aura AI Engine Dashboard',
    },
    {
      id: 'vortex-cloud',
      title: 'Vortex Cloud Core',
      subtitle: 'Dağıtık Mikroservis Gateway',
      category: 'Cloud Architecture',
      description:
        'Saniyede 100,000 istek kapasiteli, borsa ve fintek sistemleri için tasarlanmış düşük gecikmeli bulut ağ yönlendiricisi.',
      tags: ['Go / Express', 'Docker', 'Kubernetes', 'Cloud Run'],
      metrics: [
        { label: 'Throughput', value: '100K tps' },
        { label: 'Cloud Uptime', value: '99.999%' },
      ],
      architecture: [
        'Otomatik yatay ölçeklenme (Auto-scaling)',
        'Rate limiting ve DDoS koruma katmanı',
        'Merkezi Prometheus metrik izleme',
      ],
      featured: true,
      imageAlt: 'Vortex Cloud Network',
    },
    {
      id: 'apex-saas',
      title: 'Apex Enterprise SaaS',
      subtitle: 'Çok Kiracılı ERP Platformu',
      category: 'Enterprise SaaS',
      description:
        'Büyük ölçekli şirketler için stok, cari, fatura ve personel süreçlerini tek merkezden yöneten modüler SaaS yazılımı.',
      tags: ['React 19', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
      metrics: [
        { label: 'Aktif Modül', value: '24+' },
        { label: 'Veri Güvenliği', value: 'SOC2 Ready' },
      ],
      architecture: [
        'Çoklu kiracılı veritabanı izolasyonu',
        'Rol ve yetki bazlı erişim kontrolü (RBAC)',
        'Excel & PDF dinamik raporlama motoru',
      ],
      featured: true,
      imageAlt: 'Apex Enterprise Software',
    },
    {
      id: 'hyperion-seo',
      title: 'Hyperion Portal Engine',
      subtitle: 'SEO 100/100 Web Mimarisi',
      category: 'High-Perf Web',
      description:
        'Arama motoru optimizasyonunda zirve performansa ulaşan, sıfır gecikmeli dinamik sayfa oluşturma (SSR/SSG) motoru.',
      tags: ['React 19', 'Vite', 'JSON-LD', 'Edge CDN'],
      metrics: [
        { label: 'Lighthouse Score', value: '100/100' },
        { label: 'First Contentful Paint', value: '0.3s' },
      ],
      architecture: [
        'Dinamik JSON-LD structured data üretimi',
        'Görsel ve JS bundle minification',
        'CDN kenar sunucu önbellekleme',
      ],
      featured: false,
      imageAlt: 'Hyperion SEO Dashboard',
    },
  ];

  const categories = ['Hepsi', 'AI & ML', 'Cloud Architecture', 'Enterprise SaaS', 'High-Perf Web'];

  const filteredProjects =
    selectedCategory === 'Hepsi'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projeler" className="py-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-amber-500/20 text-slate-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Bal Labs Proje Vitrini</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Öne Çıkan <span className="text-amber-400">Yazılım Projeleri</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Enes Utku mimarisiyle geliştirilmiş, yüksek performans ve güvenilirlik sunan
            referans çalışmalarımız.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-[#090a0f] font-semibold shadow-lg shadow-amber-500/20'
                    : 'bg-[#131622] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                {/* Category & Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Lead Dev: Enes Utku
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    {project.subtitle}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#090a0f]/80 border border-white/5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-xs font-mono text-slate-400">{m.label}</div>
                      <div className="text-base font-mono font-bold text-amber-400">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#131622] border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Mimari Detayları İncele</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#090a0f] rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#131622] text-slate-400 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                {activeProject.category}
              </span>
              <h3 className="text-2xl font-bold text-slate-100">{activeProject.title}</h3>
              <p className="text-xs font-mono text-slate-400">{activeProject.subtitle}</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {activeProject.description}
            </p>

            {/* Architecture breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> MİMARİ BİLEŞENLER &amp; PRENSİPLER:
              </div>
              <ul className="space-y-2">
                {activeProject.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#131622] border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Geliştirici Sorumlusu:</span>
              <span className="text-amber-400 font-semibold">Enes Utku (Lead Software Architect)</span>
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href="#iletisim"
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 rounded-full bg-amber-400 text-[#090a0f] font-semibold text-xs hover:bg-amber-300 transition-colors"
              >
                Benzer Proje Başlat
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
