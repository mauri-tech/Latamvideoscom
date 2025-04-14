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

/**
 * HomePage component - Main landing page of the application
 * Structure:
 * 1. Hero - Main landing section with introduction
 * 2. Features - Features for editors
 * 3. EditorInteractiveProfiles - Interactive editor profiles showcase
 * 4. BusinessSection - Section for businesses explaining benefits
 * 5. FeaturedEditors - Showcase of featured editors
 * 6. HiringProcess - Explanation of the hiring process
 * 7. Testimonials - User testimonials
 * 8. CTASection - Call to action
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
          
          {/* 2. Features for Editors */}
          <Features />
          
          {/* 3. Interactive Profiles */}
          <EditorInteractiveProfiles />
          
          {/* 4. Business Section */}
          <BusinessSection />
          
          {/* 5. Featured Editors */}
          <FeaturedEditors />
          
          {/* 6. Hiring Process */}
          <HiringProcess />
          
          {/* 7. Testimonials */}
          <Testimonials />
          
          {/* 8. Call to Action */}
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;