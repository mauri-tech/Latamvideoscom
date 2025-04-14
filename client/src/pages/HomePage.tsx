import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import EditorInteractiveProfiles from '@/components/home/EditorInteractiveProfiles';
import BusinessSection from '@/components/home/BusinessSection';

/**
 * HomePage - Agregando componentes uno a uno
 */
const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>latamvideos.com - El portafolio inteligente para editores de video</title>
        <meta 
          name="description" 
          content="Conectamos a editores de video con marcas, agencias y creadores que buscan talento específico por estilo, equipo y precio." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* 1. Hero Section */}
          <Hero />
          
          {/* 2. Features */}
          <Features />
          
          {/* 3. Editor Interactive Profiles */}
          <EditorInteractiveProfiles />
          
          {/* 4. Business Section */}
          <BusinessSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;