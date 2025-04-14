import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import AudienceSection from '@/components/home/AudienceSection';
import HowItWorks from '@/components/home/HowItWorks';
import EditorInteractiveProfile from '@/components/home/EditorInteractiveProfile';
import FeaturedEditors from '@/components/home/FeaturedEditors';
import DoubleCTA from '@/components/home/DoubleCTA';
import Benefits from '@/components/home/Benefits';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>latamvideos.com - Conecta con los mejores editores y videógrafos de LATAM</title>
        <meta name="description" content="Conecta tu talento con quienes más lo necesitan. Los mejores editores y videógrafos de LATAM, listos para trabajar con agencias, negocios y figuras públicas." />
      </Helmet>
      <Header />
      
      <main>
        {/* 1. Hero principal – Posicionamiento inmediato */}
        <Hero />
        
        {/* 2. ¿Para quién es esta plataforma? */}
        <AudienceSection />
        
        {/* 3. ¿Cómo funciona? (flujo simple) */}
        <HowItWorks />
        
        {/* 4. Perfil interactivo (demo visual del UI) */}
        <EditorInteractiveProfile />
        
        {/* 5. Editores & videógrafos destacados */}
        <FeaturedEditors />
        
        {/* 6. CTA con doble camino (elige tu perfil) */}
        <DoubleCTA />
        
        {/* 7. Beneficios claros (comprobación social) */}
        <Benefits />
        
        {/* 8. Testimonios o frases aspiracionales */}
        <Testimonials />
        
        {/* 9. Preguntas frecuentes (FAQ) */}
        <FAQ />
        
        {/* 10. CTA final con diseño aspiracional */}
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
