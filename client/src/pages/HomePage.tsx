import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import EditorShowcase from '@/components/home/EditorShowcase';
import RegistrationProcess from '@/components/home/RegistrationProcess';
import HiringProcess from '@/components/home/HiringProcess';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import EditorInteractiveProfiles from '@/components/home/EditorInteractiveProfiles';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>latamvideos.com - El portafolio inteligente para editores de video</title>
        <meta name="description" content="Conectamos a editores de video con marcas, agencias y creadores que buscan talento específico por estilo, equipo y precio." />
      </Helmet>
      <Header />
      
      <main>
        <Hero />
        <Features />
        <EditorInteractiveProfiles />
        <HiringProcess />
        <Testimonials />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
