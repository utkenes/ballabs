import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Code2, Cpu, Globe2, ShieldCheck, Database, Layers, ArrowUpRight, Check, Terminal } from 'lucide-react';

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services: ServiceItem[] = [
    {
      id: 'saas',
      title: 'Özel Yazılım & SaaS Mimarisi',
      shortDesc: 'Ölçeklenebilir, modüler ve yüksek eşzamanlılıklı (high-concurrency) SaaS ürünleri.',
      fullDesc:
        'Bal Labs; şirketinizin iş süreçlerine özel uçtan uca yazılım mimarileri tasarlar. Sıfır karmaşa, katmanlı güvenlik ve mikroservis uyumluluğu ile kurumsal büyümenizi destekler.',
      iconName: 'Code2',
      techStack: ['Node.js', 'React 19', 'PostgreSQL', 'Redis', 'Docker'],
      features: [
        'Abonelik ve Rol Bazlı Yetkilendirme (RBAC)',
        'Çoklu Kiracılı (Multi-Tenant) Veritabanı Mimarisi',
        'REST & GraphQL Yüksek Hızlı API Katmanı',
        'Otomatik Veri Yedekleme ve Audit Loglama',
      ],
      codeSnippet: `// Bal Labs SaaS Core Route Handler
export async function handleTenantRequest(req: Request) {
  const tenant = await db.tenants.findUnique({ where: { id: req.tenantId } });
  if (!tenant?.active) throw new UnauthorizedError();
  
  return await cache.wrap(\`tenant:\${tenant.id}\`, () => {
    return processMicroservicePipeline(req);
  }, { ttl: 300 });
}`,
    },
    {
      id: 'ai',
      title: 'Yapay Zeka & LLM Entegrasyonu',
      shortDesc: 'Gemini, otonom ajanslar, RAG mimarileri ve veri işleme otomasyonları.',
      fullDesc:
        'İşletmenizin verilerini yapay zeka ile canlandırın. Gemini API ve RAG (Retrieval-Augmented Generation) mimarileriyle müşteri hizmetleri, otomasyon ve veri analitiği asistanları kuruyoruz.',
      iconName: 'Cpu',
      techStack: ['Gemini 3.6 Flash', '@google/genai', 'Python', 'Vector DB', 'LangChain'],
      features: [
        'Özel Kurumsal Veri Tabanlı RAG Arama Engine',
        'Çok Modlu (Görsel, Ses, Metin) AI İşleme',
        'Otomatik Belge Analizi ve Veri Çıkarımı',
        'Sunucu Tarafı Güvenli Gemini API Proxy',
      ],
      codeSnippet: `// Bal Labs AI Proxy Layer
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateArchitectPlan(prompt: string) {
  return await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: { temperature: 0.2, responseMimeType: "application/json" }
  });
}`,
    },
    {
      id: 'web-mobile',
      title: 'Yüksek Performanslı Web & Mobil',
      shortDesc: 'React 19, Vite ve Cross-Platform mobil çözümler ile sıfır gecikmeli UI.',
      fullDesc:
        '60 FPS akıcı animasyonlar, göz yormayan karanlık mod tasarımları ve mobil uyumlu hafif kütüphaneler ile kullanıcı deneyimini mükemmelleştiriyoruz.',
      iconName: 'Globe2',
      techStack: ['React 19', 'Tailwind CSS v4', 'React Native', 'TypeScript', 'Motion'],
      features: [
        'Lighthouse Score 100/100 Hedefi',
        'Tam Erişilebilir (WCAG 2.1) Bileşen Tasarımı',
        'Çevrimdışı (Offline-First) Destek ve PWA',
        'Akıcı Sayfa ve Animasyon Geçişleri',
      ],
      codeSnippet: `// High-Performance Motion Transition
import { motion } from "motion/react";

export const DynamicCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    className="glass-card p-6 rounded-2xl border border-white/10"
  >
    {children}
  </motion.div>
);`,
    },
    {
      id: 'cloud',
      title: 'Dağıtık Bulut & Microservice',
      shortDesc: 'Docker, Cloud Run, CI/CD otomasyonları ve sıfır kesinti deployment.',
      fullDesc:
        'Trafik dalgalanmalarına karşı anında ölçeklenen bulut mimarileri. Docker ve Kubernetes konteyner orkestrasyonu ile kesintisiz (zero-downtime) yayın altyapısı.',
      iconName: 'Layers',
      techStack: ['Cloud Run', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions'],
      features: [
        'Otomatik Yük Dengeleme (Load Balancing)',
        'Saniyeler İçinde Sıfırdan Ölçeklenme',
        'Güvenli Mimarili SSL/TLS Sonlandırma',
        'Merkezi Loglama ve Metrik İzleme (Prometheus/Grafana)',
      ],
      codeSnippet: `// Dockerfile Cloud Deployment Blueprint
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]`,
    },
    {
      id: 'seo',
      title: 'SEO & Sorumlu Performans Mühendisliği',
      shortDesc: 'Arama motorlarında zirveye çıkan semantik HTML, JSON-LD ve hızlı indeksleme.',
      fullDesc:
        'Arama motorlarının ve web botlarının sitenizi mükemmel anlaması için teknik SEO altyapısı, Core Web Vitals optimizasyonları ve structured data mimarisi kuruyoruz.',
      iconName: 'ShieldCheck',
      techStack: ['JSON-LD Schema', 'OpenGraph Protocol', 'Sitemap Automation', 'Web Vitals'],
      features: [
        'Dinamik JSON-LD Schema.org İşaretleme',
        'Görsel ve Varlık Sıkıştırma (WebP/AVIF)',
        'Canonical & OpenGraph Meta Etiket Yönetimi',
        'Arama Motorları İçin Hızlı İndeksleme Yapısı',
      ],
      codeSnippet: `<!-- Bal Labs Structured Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareHouse",
  "name": "Bal Labs",
  "founder": "Enes Utku",
  "knowsAbout": ["Full Stack Software", "AI Systems", "SEO Engineering"]
}
</script>`,
    },
  ];

  return (
    <section id="cozumler" className="py-24 relative bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-amber-500/20 text-slate-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Mühendislik Kapsamı &amp; Çözümler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Yazılımda <span className="text-amber-400">Yüksek Standartlar</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Enes Utku liderliğinde Bal Labs; fikir aşamasından bulut canlısına kadar modern ve
            sürdürülebilir yazılım mimarileri üretir.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-[#131622] border border-white/10">
          {services.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-3 rounded-xl text-xs font-medium transition-all duration-200 text-left flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-amber-400 text-[#090a0f] font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="font-mono opacity-60">0{idx + 1}.</span>
              <span className="truncate">{service.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Service Detail */}
        {services[activeTab] && (
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  ÇÖZÜM MODÜLÜ 0{activeTab + 1}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                  {services[activeTab].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {services[activeTab].fullDesc}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">TEKNOLOJİ YIĞINI:</div>
                <div className="flex flex-wrap gap-2">
                  {services[activeTab].techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#090a0f] border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {services[activeTab].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="p-0.5 rounded-full bg-amber-500/20 text-amber-400 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#iletisim"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#090a0f] text-slate-200 text-xs font-semibold transition-all duration-200"
                >
                  <span>Bu Hizmet İçin Görüşün</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Interactive Code Snippet */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0d0f17] border border-white/10 p-4 font-mono text-xs text-slate-300 space-y-3 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-[11px] text-slate-500 ml-2">bal-labs-{services[activeTab].id}.ts</span>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-500" />
                </div>

                <pre className="overflow-x-auto text-[11px] leading-relaxed text-amber-200/90 font-mono py-2">
                  <code>{services[activeTab].codeSnippet}</code>
                </pre>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Architecture Verified by Enes Utku</span>
                  <span className="text-emerald-400">● Live Compile OK</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
