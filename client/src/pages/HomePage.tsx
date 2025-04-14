import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import BusinessSection from '@/components/home/BusinessSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>latamvideos.com - El portafolio inteligente para editores de video</title>
        <meta name="description" content="Conectamos a editores de video con marcas, agencias y creadores que buscan talento específico por estilo, equipo y precio." />
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <BusinessSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;