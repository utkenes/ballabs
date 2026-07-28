import React, { useState } from 'react';
import { ProjectInquiry } from '../types';
import { Mail, Send, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface ContactProps {
  initialArchitectureData?: any;
}

export const Contact: React.FC<ContactProps> = ({ initialArchitectureData }) => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    email: '',
    company: '',
    projectType: 'SaaS Platformu',
    budget: '100k - 250k TL',
    message: initialArchitectureData
      ? `AI Mimarı tarafından önerilen plan: ${initialArchitectureData.projectTitle}`
      : '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Lütfen Ad Soyad, E-posta ve Mesaj alanlarını doldurunuz.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmittedResponse(data);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: 'SaaS Platformu',
          budget: '100k - 250k TL',
          message: '',
        });
      } else {
        setError(data.error || 'İletişim talebi gönderilemedi.');
      }
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setError('Sunucu bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="iletisim" className="py-24 relative bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131622] border border-amber-500/20 text-slate-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Projenizi Görüşün</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Geleceğin Yazılımını <span className="text-amber-400">Birlikte İnşa Edelim</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Fikrinizi veya projenizin ihtiyaçlarını iletin. Lead Developer Enes Utku ve Bal Labs
            mühendislik ekibi 24 saat içinde size özel yol haritası sunsun.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-slate-100">Bal Labs Studio</h3>

              <div className="space-y-4 text-xs text-slate-300 font-sans">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-slate-400">DOĞRUDAN E-POSTA</div>
                    <a
                      href="mailto:utk.enes@gmail.com"
                      className="text-slate-100 font-semibold hover:text-amber-400 transition-colors"
                    >
                      utk.enes@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-slate-400">YANIT TAAHHÜDÜ</div>
                    <div className="text-slate-100 font-semibold">24 Saat İçinde Dönüş</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-slate-400">LEAD DEVELOPER</div>
                    <div className="text-slate-100 font-semibold">Enes Utku</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 p-4 rounded-2xl bg-[#090a0f] space-y-1">
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Gizlilik &amp; NDA Uyumlu</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  İlettiğiniz tüm proje fikirleri Bal Labs gizlilik sözleşmesi kapsamında güvence
                  altındadır.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {submittedResponse ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Talebiniz Alındı!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  {submittedResponse.message}
                </p>
                <div className="p-4 rounded-xl bg-[#090a0f] border border-white/10 font-mono text-xs text-amber-400 inline-block">
                  Referans No: {submittedResponse.refId}
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmittedResponse(null)}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-slate-200 text-xs font-semibold hover:bg-white/20 transition-colors"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      ADINIZ SOYADINIZ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      E-POSTA ADRESİNİZ *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmet@sirketiniz.com"
                      className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">ŞİRKET / KURUM</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Örn: Bal Tech A.Ş."
                      className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">PROJE TİPİ</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-3 py-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="SaaS Platformu">SaaS Platformu</option>
                      <option value="Yapay Zeka Entegrasyonu">Yapay Zeka &amp; LLM</option>
                      <option value="E-Ticaret & Fintek">E-Ticaret &amp; Fintek Core</option>
                      <option value="Kurumsal Özel ERP">Kurumsal Özel ERP</option>
                      <option value="SEO & Web Performance">SEO &amp; Web Performance</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">BÜTÇE DÜZEYİ</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#090a0f] border border-white/10 rounded-xl px-3 py-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="50k - 100k TL">50k - 100k TL (MVP)</option>
                      <option value="100k - 250k TL">100k - 250k TL (Standart)</option>
                      <option value="250k+ TL">250k+ TL (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300">PROJE DETAYLARI *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Projenizin hedeflerini, tarihlerini ve beklentilerinizi kısaca açıklayabilirsiniz..."
                    className="w-full bg-[#090a0f] border border-white/10 rounded-xl p-4 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090a0f] font-semibold text-sm shadow-xl shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <span>Proje Talebini Enes Utku'ya İlet</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
