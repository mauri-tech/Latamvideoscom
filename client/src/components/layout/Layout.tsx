import React from 'react';
import { Navbar } from './Navbar';
import Footer from './Footer';
import { ConstructionBanner } from '@/components/ui/ConstructionBanner';
import { ConstructionModal } from '@/components/ui/modal/ConstructionModal';

interface LayoutProps {
  children: React.ReactNode;
}

// URL del formulario de Google Forms
const CONSTRUCTION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf_A9wsGu--SzvCw6TsHpAk5hSPXqP6jna1W5f2GnQDu4Tn2w/viewform?embedded=true";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de progreso de construcción */}
      <ConstructionBanner progress={63} />
      
      {/* Modal de construcción */}
      <ConstructionModal formUrl={CONSTRUCTION_FORM_URL} />
      
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}