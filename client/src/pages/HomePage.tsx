import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import CategoryNav from '@/components/home/CategoryNav';
import FeaturedEditors from '@/components/home/FeaturedEditors';
import HowItWorks from '@/components/home/HowItWorks';
import CTASection from '@/components/home/CTASection';

/**
 * HomePage - Rediseñado para simplicidad y conversión
 */
const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>LatamVideos - El Marketplace #1 de Editores de Video</title>
        <meta
          name="description"
          content="Encuentra al editor perfecto para YouTube, Reels, Bodas o Cine. Talento verificado y pagos seguros."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        <main>
          {/* 1. Hero with Central Search Pill */}
          <Hero />

          {/* 2. Social Proof */}
          <TrustStrip />

          {/* 3. Niche Navigation */}
          <CategoryNav />

          {/* 4. The Product (Talent) */}
          <FeaturedEditors />

          {/* 5. Simplicity Explanation */}
          <HowItWorks />

          {/* 6. Final Call to Action */}
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;