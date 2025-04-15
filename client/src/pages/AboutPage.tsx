import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Users, Globe, Target, Heart } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Mauricio Treviño',
      role: 'CEO & Fundador',
      bio: 'Especialista en producción audiovisual con más de 10 años de experiencia conectando talento creativo.',
      image: '/uploads/team/mauricio.jpg'
    },
    {
      name: 'Alejandra Sosa',
      role: 'Directora de Operaciones',
      bio: 'Experta en gestión de proyectos y optimización de procesos para empresas creativas.',
      image: '/uploads/team/alejandra.jpg'
    },
    {
      name: 'Carlos Vega',
      role: 'Director Técnico',
      bio: 'Ingeniero de sistemas con experiencia en plataformas de contratación y mercados digitales.',
      image: '/uploads/team/carlos.jpg'
    },
    {
      name: 'Maria Jiménez',
      role: 'Directora de Marketing',
      bio: 'Especialista en crecimiento de startups y estrategias digitales para industrias creativas.',
      image: '/uploads/team/maria.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | LatamVideos</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Nuestra Misión</h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Conectamos a los mejores talentos de video en Latinoamérica con marcas y proyectos 
              que buscan calidad y creatividad, transformando la manera en que se contrata 
              talento audiovisual en la región.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-[#020617] hover:bg-[#1E293B] px-8 py-6 text-lg"
                asChild
              >
                <Link href="/search">Explorar profesionales</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#020617] text-[#020617] hover:bg-[#020617]/5 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/contact">Contactar al equipo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Historia */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  LatamVideos nació en 2023 como respuesta a una necesidad clara en el mercado audiovisual latinoamericano: 
                  conectar de manera eficiente al talento creativo con las empresas y proyectos que necesitan sus habilidades.
                </p>
                <p>
                  Nuestro fundador, Mauricio Treviño, después de años trabajando en la industria audiovisual, 
                  identificó un problema recurrente: marcas y empresas gastaban demasiado tiempo y recursos 
                  buscando al profesional adecuado, mientras que editores y videógrafos talentosos tenían 
                  dificultades para conseguir proyectos.
                </p>
                <p>
                  A partir de esta observación, reunió a un equipo con experiencia en tecnología y producción 
                  audiovisual para crear una plataforma que simplificara el proceso de búsqueda y contratación, 
                  valorando la calidad, el estilo y las habilidades específicas de cada profesional.
                </p>
                <p>
                  Hoy, LatamVideos se ha convertido en el punto de encuentro para el talento audiovisual en Latinoamérica, 
                  transformando la manera en que las marcas encuentran a los mejores profesionales para sus proyectos.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#6BA6FF]/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#6BA6FF] mb-2">500+</div>
                  <div className="text-gray-700">Profesionales activos</div>
                </div>
                <div className="bg-[#818CF8]/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#818CF8] mb-2">12</div>
                  <div className="text-gray-700">Países cubiertos</div>
                </div>
                <div className="bg-[#C084FC]/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#C084FC] mb-2">120+</div>
                  <div className="text-gray-700">Empresas registradas</div>
                </div>
                <div className="bg-[#A5B4FC]/10 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#A5B4FC] mb-2">1500+</div>
                  <div className="text-gray-700">Proyectos completados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Valores */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Nuestros Valores</h2>
            <p className="text-gray-600">
              En LatamVideos, nos guiamos por principios fundamentales que definen cómo trabajamos y cómo 
              construimos relaciones con profesionales y clientes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6BA6FF]/10 mb-6">
                <Users className="h-8 w-8 text-[#6BA6FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Creemos en el poder de una comunidad audiovisual fuerte y conectada en toda Latinoamérica.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#818CF8]/10 mb-6">
                <Globe className="h-8 w-8 text-[#818CF8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusión</h3>
              <p className="text-gray-600">
                Valoramos la diversidad de talentos y perspectivas que enriquecen la creatividad visual.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C084FC]/10 mb-6">
                <Target className="h-8 w-8 text-[#C084FC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excelencia</h3>
              <p className="text-gray-600">
                Promovemos los más altos estándares de calidad en la producción audiovisual.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A5B4FC]/10 mb-6">
                <Heart className="h-8 w-8 text-[#A5B4FC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pasión</h3>
              <p className="text-gray-600">
                Amamos lo que hacemos y trabajamos con profesionales que comparten esta pasión.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Equipo */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Nuestro Equipo</h2>
            <p className="text-gray-600">
              Somos un equipo con diversa experiencia en tecnología y medios audiovisuales, 
              comprometidos con conectar al mejor talento creativo en Latinoamérica.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <div 
                    className="absolute inset-0 bg-center bg-cover" 
                    style={{ 
                      backgroundImage: `url(${member.image})`,
                      backgroundPosition: 'center top'
                    }}
                  ></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-[#6BA6FF] text-sm mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#020617] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres unirte a nuestra comunidad?</h2>
            <p className="text-xl opacity-90 mb-8">
              Ya sea que busques talento o quieras mostrar tus habilidades, 
              LatamVideos es tu plataforma en Latinoamérica.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary"
                className="px-8 py-6 text-lg bg-white text-[#020617] hover:bg-white/90"
                asChild
              >
                <Link href="/register">Crear perfil profesional</Link>
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/search">Buscar profesionales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;