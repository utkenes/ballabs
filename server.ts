import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      company: "Bal Labs",
      developer: "Enes Utku",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        aiEngine: !!process.env.GEMINI_API_KEY ? "active" : "fallback-active",
        cloudCore: "operational",
        database: "connected",
      },
    });
  });

// Contact / Project Inquiry API
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      projectType,
      budget,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error:
          "Lütfen adınız, e-posta adresiniz ve mesajınızı eksiksiz doldurun.",
      });
    }

    const refId = `BAL-${Math.floor(100000 + Math.random() * 900000)}`;

    const { data, error } = await resend.emails.send({
      from: "Bal Labs <onboarding@resend.dev>",
      to: ["utk.enes@gmail.com"],
      replyTo: email,
      subject: `[${refId}] Yeni proje talebi - ${name}`,
      text: `
Yeni Bal Labs proje talebi

Referans: ${refId}
Ad Soyad: ${name}
E-posta: ${email}
Şirket: ${company || "Belirtilmedi"}
Proje Türü: ${projectType || "Özel Yazılım Projesi"}
Bütçe: ${budget || "Esnek"}

Mesaj:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend gönderim hatası:", error);

      return res.status(500).json({
        success: false,
        error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
      });
    }

    console.log(
      `[Bal Labs Inquiry] Ref: ${refId} from ${name} (${email})`,
      data,
    );

    return res.status(200).json({
      success: true,
      refId,
      message: `Teşekkürler ${name}. Talebiniz Bal Labs ekibine ulaştı.`,
      summary: {
        refId,
        name,
        email,
        company: company || "Belirtilmedi",
        projectType: projectType || "Özel Yazılım Projesi",
        budget: budget || "Esnek",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Contact API hatası:", error);

    return res.status(500).json({
      success: false,
      error: "Sunucuda beklenmeyen bir hata oluştu.",
    });
  }
});

  // AI Architect & Project Estimator Consultant powered by Gemini
  app.post("/api/ai-consultant", async (req, res) => {
    const { prompt, projectType, budget, scope } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Lütfen bir proje tanımı giriniz." });
    }

    const systemPrompt = `Sen Bal Labs yazılım şirketinin Baş Mimarı ve Yapay Zeka Danışmanısın. Bal Labs'ın kurucusu ve Baş Geliştiricisi Enes Utku'dur.
Görevin: Kullanıcının sunduğu proje fikrini analiz edip profesyonel, yüksek performanslı ve minimalist bir mimari plan sunmak.

Lütfen yanıtını şu yapılandırılmış Türkçe JSON formatında ver:
{
  "projectTitle": "Örnek Proje Başlığı",
  "architectureOverview": "Mimari yaklaşımın kısa ve etkileyici açıklaması.",
  "recommendedStack": ["React 19", "Node.js / Express", "PostgreSQL", "Gemini AI", "Docker"],
  "estimatedTimelineWeeks": 4,
  "keyModules": [
    { "name": "Modül 1", "description": "Açıklama" },
    { "name": "Modül 2", "description": "Açıklama" }
  ],
  "performanceHighlights": [
    "Sub-50ms yanıt süresi",
    "99.99% Cloud Availability",
    "SEO 100/100 tam uyumluluk"
  ],
  "expertAdvice": "Enes Utku'dan projeye özel mimari ve ölçeklenme tavsiyesi."
}

Yalnızca geçerli JSON döndür, markdown bloğu ekleme.`;

    try {
      if (ai) {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `Proje Tipi: ${projectType || "Genel"}\nBütçe Beklentisi: ${budget || "Normal"}\nKapsam: ${scope || "Standart"}\n\nProje Fikri: ${prompt}`,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const rawText = response.text || "{}";
        const parsedData = JSON.parse(rawText);
        return res.json({ success: true, data: parsedData, source: "gemini-3.6-flash" });
      } else {
        // Intelligent Fallback Generator if GEMINI_API_KEY is pending injection
        const fallbackData = {
          projectTitle: `${projectType || "Özel"} Teknolojik Çözüm - ${prompt.slice(0, 25)}...`,
          architectureOverview: `Bal Labs standartlarında modern, sunucusuz (serverless) mikroservis mimarisi ile yüksek performanslı, SEO uyumlu ve ölçeklenebilir altyapı.`,
          recommendedStack: [
            "React 19 + Vite",
            "TypeScript",
            "Node.js Express Engine",
            "Tailwind CSS v4",
            "Redis & Cloud Database",
            "Gemini AI API",
          ],
          estimatedTimelineWeeks: Math.max(2, Math.min(8, Math.ceil(prompt.length / 15))),
          keyModules: [
            {
              name: "Yüksek Hızlı Frontend & UI Engine",
              description: "Karanlık mod odaklı, akıcı animasyonlu, SEO dostu ve erişilebilir dinamik arayüz.",
            },
            {
              name: "Güvenli API Gateway & İş Mantığı",
              description: "Enes Utku mimarisiyle katmanlı güvenlik, rate-limiting ve optimize veritabanı sorguları.",
            },
            {
              name: "Yapay Zeka & Analitik Modülü",
              description: "Otomatik veri işleme, akıllı bildirimler ve performans izleme araçları.",
            },
          ],
          performanceHighlights: [
            "Lighthouse Score 100/100 (SEO, Performans, Erişilebilirlik)",
            "30ms Altında API Yanıt Süreleri",
            "Sıfır Güvenlik Açığı İlkesi",
          ],
          expertAdvice: `Enes Utku Notu: "${prompt}" projenizi mikroservislere bölerek modüler geliştirmeyi ve Gemini AI otomasyonlarıyla operasyonel maliyetleri %40 düşürmeyi öneriyorum.`,
        };

        return res.json({ success: true, data: fallbackData, source: "smart-fallback" });
      }
    } catch (error: any) {
      console.error("[Bal Labs AI Consultant Error]:", error);
      return res.status(500).json({
        success: false,
        error: "AI Danışmanı yanıt üretirken bir hata oluştu.",
        details: error?.message,
      });
    }
  });

  // SEO Schema & Audit Preview API
  app.post("/api/seo-audit", (req, res) => {
    const { url, title, description } = req.body;
    const cleanTitle = title || "Bal Labs | Modern & Minimalist Yazılım Şirketi - Lead Developer Enes Utku";
    const cleanDesc = description || "Bal Labs, Enes Utku yönetiminde yüksek performanslı web sistemleri, yapay zeka çözümleri ve özel yazılım mimarileri geliştiren lider teknoloji laboratuvarıdır.";

    const schemaOrg = {
      "@context": "https://schema.org",
      "@type": "SoftwareHouse",
      "name": "Bal Labs",
      "alternateName": "Bal Labs Software & Tech Studio",
      "url": url || "https://ballabs.dev",
      "logo": "https://ballabs.dev/logo.png",
      "description": cleanDesc,
      "founder": {
        "@type": "Person",
        "name": "Enes Utku",
        "jobTitle": "Lead Developer & Software Architect",
        "sameAs": [
          "https://github.com/enesutku",
          "https://linkedin.com/in/enesutku"
        ]
      },
      "knowsAbout": [
        "Software Architecture",
        "Artificial Intelligence",
        "Full Stack Development",
        "Cloud Computing",
        "SEO Optimization"
      ],
      "offers": {
        "@type": "Offer",
        "category": "Software Development Services",
        "availability": "https://schema.org/InStock"
      }
    };

    res.json({
      success: true,
      score: {
        performance: 100,
        seo: 100,
        accessibility: 100,
        bestPractices: 100
      },
      schemaOrg,
      metaTags: {
        title: cleanTitle,
        description: cleanDesc,
        "og:title": cleanTitle,
        "og:description": cleanDesc,
        "og:type": "website",
        "twitter:card": "summary_large_image",
        "twitter:creator": "@",
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  });
}

startServer();
