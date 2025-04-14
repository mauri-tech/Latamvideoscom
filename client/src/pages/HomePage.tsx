import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import EditorInteractiveProfiles from '@/components/home/EditorInteractiveProfiles';
import BusinessSection from '@/components/home/BusinessSection';
import FeaturedEditors from '@/components/home/FeaturedEditors';
import HiringProcess from '@/components/home/HiringProcess';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>latamvideos.com - El portafolio inteligente para editores de video</title>
        <meta name="description" content="Conectamos a editores de video con marcas, agencias y creadores que buscan talento específico por estilo, equipo y precio." />
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <Features />
        <EditorInteractiveProfiles />
        <BusinessSection />
        <FeaturedEditors />
        <HiringProcess />
        <Testimonials />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;