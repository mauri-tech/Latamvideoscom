import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/**
 * HomePage test component - Para probar renderización
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
          <div className="container mx-auto py-20 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Página de Prueba</h1>
            <p className="text-center text-lg mb-8">
              Esta es una página de prueba para verificar si el componente HomePage está cargando correctamente.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;