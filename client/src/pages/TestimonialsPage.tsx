import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Directora de marketing, Starbox",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      quote: "Encontramos al editor perfecto para nuestras campañas en latamvideos.com. La calidad y el profesionalismo han superado todas nuestras expectativas. El sistema de filtros nos ayudó a identificar exactamente el estilo que buscábamos.",
      rating: 5,
      companyLogo: "https://via.placeholder.com/150x50",
      projectType: "Comerciales para redes sociales"
    },
    {
      id: 2,
      name: "Carlos Fuentes",
      role: "CEO, TechStartup SAS",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      quote: "La plataforma simplificó enormemente nuestro proceso de contratación de editores. Pudimos revisar portafolios de calidad, comparar tarifas y elegir basados en reseñas reales. Hemos contratado a tres editores diferentes y todos han entregado un trabajo excepcional.",
      rating: 5,
      companyLogo: "https://via.placeholder.com/150x50",
      projectType: "Videos de producto"
    },
    {
      id: 3,
      name: "Sofía Martinez",
      role: "Productora audiovisual, Studio M",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      quote: "Como productora, necesitaba encontrar editores específicos para diferentes proyectos. latamvideos.com me ha permitido construir una red de colaboradores de confianza. La comunicación a través de la plataforma es fluida y los pagos son seguros.",
      rating: 4,
      companyLogo: "https://via.placeholder.com/150x50",
      projectType: "Documentales y cortometrajes"
    },
    {
      id: 4,
      name: "David Romero",
      role: "Gerente de contenidos, GlobalMedia",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      quote: "Nuestra empresa maneja docenas de proyectos simultáneamente y latamvideos.com ha sido fundamental para escalar nuestra producción de contenido. La verificación de perfiles nos da tranquilidad y la calidad del talento en la plataforma es excepcional.",
      rating: 5,
      companyLogo: "https://via.placeholder.com/150x50",
      projectType: "Contenido para YouTube"
    },
    {
      id: 5,
      name: "Marcela Vega",
      role: "Director creativo, Agencia Impulso",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      quote: "Hemos integrado latamvideos.com como parte esencial de nuestro flujo de trabajo para proyectos creativos. La plataforma nos permite encontrar talento especializado cuando lo necesitamos, sin la complejidad de procesos de contratación prolongados.",
      rating: 4,
      companyLogo: "https://via.placeholder.com/150x50",
      projectType: "Campañas publicitarias"
    },
    {
      id: 6,
      name: "Javier Torres",
      role: "Fundador, Explora Films",
      image: "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      quote: "Como pequeña productora independiente, latamvideos.com ha sido un recurso invaluable para encontrar editores especializados en nuestro nicho. La plataforma combina la personalización de contratar localmente con el alcance de un mercado global.",
      rating: 5,
      companyLogo: "https://via.placeholder.com/150x50",
      projectType: "Videos de viajes y aventuras"
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Cómo Starbox aumentó su engagement en redes un 300%",
      description: "La marca de moda encontró en latamvideos.com editores especializados en contenido viral que transformaron su estrategia digital.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
      category: "Moda"
    },
    {
      id: 2,
      title: "Producción remota: TechStartup y su serie de tutoriales",
      description: "Con un equipo distribuido en 5 países, coordinaron la producción de más de 50 videos educativos a través de la plataforma.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
      category: "Tecnología"
    },
    {
      id: 3,
      title: "Del concepto al éxito: El documental de Studio M",
      description: "Cómo una pequeña productora encontró al editor perfecto para su premiado documental utilizando los filtros avanzados de latamvideos.com.",
      image: "https://images.unsplash.com/photo-1604882355679-7e9142c8af5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
      category: "Documental"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Testimonios | latamvideos.com</title>
        <meta name="description" content="Conoce las experiencias de empresas y marcas que han encontrado editores de video profesionales a través de latamvideos.com." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#041C32]">Testimonios</h1>
        <p className="text-[#8E8E93] text-center max-w-2xl mx-auto mb-12">
          Descubre cómo empresas y marcas de toda Latinoamérica han encontrado el talento creativo que necesitaban a través de nuestra plataforma.
        </p>
        
        {/* Sección de testimonios destacados */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium text-[#1c1c1e]">{testimonial.name}</h3>
                      <p className="text-sm text-[#8E8E93]">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-[#1c1c1e] mb-4 flex-grow italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="mt-auto">
                    <Badge variant="secondary" className="bg-[#F2F2F7] text-[#8E8E93]">
                      {testimonial.projectType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Sección de estadísticas */}
        <section className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">El impacto de latamvideos.com</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Nuestra plataforma ha cambiado la forma en que las empresas encuentran talento creativo en Latinoamérica.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Empresas activas mensualmente</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">3,200+</div>
              <p className="text-blue-100">Proyectos completados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <p className="text-blue-100">Tasa de satisfacción</p>
            </div>
          </div>
        </section>
        
        {/* Sección de casos de estudio */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#041C32]">Casos de éxito</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <Card key={caseStudy.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">{caseStudy.category}</Badge>
                  <h3 className="text-lg font-medium mb-2">{caseStudy.title}</h3>
                  <p className="text-[#8E8E93] text-sm mb-4">{caseStudy.description}</p>
                  <a href={`/case-studies/${caseStudy.id}`} className="text-[#0050FF] text-sm font-medium hover:underline">
                    Leer caso completo →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Sección CTA */}
        <section className="text-center bg-[#F2F2F7] rounded-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#041C32]">¿Listo para encontrar el talento creativo que necesitas?</h2>
          <p className="text-[#8E8E93] mb-8 max-w-2xl mx-auto">
            Únete a cientos de empresas que han transformado su producción de contenido con los editores profesionales de latamvideos.com.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/search" 
              className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white font-medium py-3 px-6 rounded-md hover:from-[#0A2540] hover:to-[#0060FF] transition-all"
            >
              Buscar profesionales
            </a>
            <a 
              href="/register" 
              className="bg-white text-[#0050FF] border border-[#0050FF] font-medium py-3 px-6 rounded-md hover:bg-blue-50 transition-all"
            >
              Crear cuenta
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestimonialsPage;