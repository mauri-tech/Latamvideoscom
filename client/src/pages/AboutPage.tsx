import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Sobre Nosotros | latamvideos.com</title>
        <meta name="description" content="Conoce más sobre el equipo detrás de latamvideos.com, la plataforma líder para conectar editores de video con clientes en Latinoamérica." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#041C32]">Sobre Nosotros</h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">Nuestra Misión</h2>
          <p className="text-[#1c1c1e] mb-6">
            En latamvideos.com, nuestra misión es conectar al talento creativo latinoamericano con marcas y empresas que necesitan contenido audiovisual de alta calidad. Creemos en el poder transformador del video y en el talento excepcional que existe en nuestra región.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">¿Por qué existimos?</h2>
          <p className="text-[#1c1c1e] mb-6">
            Fundamos latamvideos.com al identificar dos grandes desafíos en nuestro mercado:
          </p>
          <ul className="list-disc pl-6 mb-6 text-[#1c1c1e]">
            <li className="mb-2">Profesionales talentosos del video que tenían dificultades para encontrar clientes y proyectos consistentes.</li>
            <li className="mb-2">Empresas que necesitaban contenido de video pero no sabían cómo encontrar profesionales confiables y adecuados para sus proyectos.</li>
          </ul>
          <p className="text-[#1c1c1e] mb-6">
            Construimos la primera plataforma integral de Latinoamérica que resuelve ambos problemas a través de un sistema de perfiles verificados, búsqueda avanzada y un ecosistema protegido para todos los participantes.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">Nuestro Equipo</h2>
          <p className="text-[#1c1c1e] mb-6">
            Somos un equipo diverso de profesionales con experiencia en producción audiovisual, desarrollo tecnológico y negocios digitales. Entendemos las necesidades específicas de la industria porque venimos de ella.
          </p>
          <p className="text-[#1c1c1e] mb-6">
            Nuestra sede principal está en Ciudad de México, pero operamos y servimos a toda Latinoamérica con un equipo distribuido en varios países de la región.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">Nuestros Valores</h2>
          <ul className="list-disc pl-6 mb-6 text-[#1c1c1e]">
            <li className="mb-2"><span className="font-medium">Calidad:</span> Promovemos y facilitamos la creación de contenido audiovisual de alta calidad.</li>
            <li className="mb-2"><span className="font-medium">Comunidad:</span> Creemos en el poder de una comunidad colaborativa y en el crecimiento conjunto.</li>
            <li className="mb-2"><span className="font-medium">Transparencia:</span> Todas nuestras operaciones, comisiones y procesos son claros para todos los participantes.</li>
            <li className="mb-2"><span className="font-medium">Innovación:</span> Constantemente mejoramos nuestra plataforma para ofrecer mejores herramientas a profesionales y clientes.</li>
            <li className="mb-2"><span className="font-medium">Inclusión:</span> Trabajamos para que el talento latinoamericano tenga un espacio sin importar su origen o circunstancias.</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres ser parte de nuestra historia?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Si eres un editor de video, videógrafo o profesional audiovisual, únete a nuestra plataforma. Si eres una empresa buscando talento creativo, encuéntralo aquí.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register" className="bg-white text-[#0050FF] font-medium py-2 px-6 rounded-md hover:bg-opacity-90 transition-all">
              Crear cuenta
            </a>
            <a href="/search" className="border border-white text-white font-medium py-2 px-6 rounded-md hover:bg-white hover:bg-opacity-10 transition-all">
              Buscar profesionales
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;