import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { EnesUtkuProfile } from './components/EnesUtkuProfile';
import { AiConsultant } from './components/AiConsultant';
import { SeoAuditTool } from './components/SeoAuditTool';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiArchitectResult } from './types';

export default function App() {
  const [isConsultantModalOpen, setIsConsultantModalOpen] = useState(false);
  const [selectedArchitecturePlan, setSelectedArchitecturePlan] = useState<AiArchitectResult | null>(null);

  const handleSelectArchitecture = (plan: AiArchitectResult) => {
    setSelectedArchitecturePlan(plan);
    const contactElem = document.getElementById('iletisim');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-amber-500/20 selection:text-amber-300 font-sans relative overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar onOpenConsultant={() => setIsConsultantModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenConsultant={() => setIsConsultantModalOpen(true)} />

        {/* Services & Capabilities */}
        <Services />

        {/* Flagship Projects Showcase */}
        <Projects />

        {/* Lead Developer Enes Utku Profile & Interactive CLI */}
        <EnesUtkuProfile />

        {/* Gemini AI Project Consultant Embedded Tool */}
        <AiConsultant onSelectArchitecture={handleSelectArchitecture} />

        {/* Technical SEO & Performance Assurance Tool */}
        <SeoAuditTool />

        {/* Contact & Project Proposals */}
        <Contact initialArchitectureData={selectedArchitecturePlan} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Popup AI Consultant */}
      <AiConsultant
        isOpen={isConsultantModalOpen}
        onClose={() => setIsConsultantModalOpen(false)}
        onSelectArchitecture={handleSelectArchitecture}
      />
    </div>
  );
}
