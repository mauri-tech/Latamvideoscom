import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Users, CheckCircle, Calendar, Clock, Heart, MessageSquare, DollarSign } from 'lucide-react';

const ComoFuncionaPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Cómo funciona | latamvideos.com</title>
        <meta name="description" content="Conoce el proceso simple de 3 pasos para conectar con profesionales de video en Latinoamérica a través de nuestra plataforma." />
      </Helmet>
      <Header />
      
      <div className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Conecta con profesionales de video en 3 simples pasos</h1>
            <p className="text-xl text-blue-100 mb-8">
              En latamvideos.com hemos diseñado un proceso sencillo para que encuentres al profesional perfecto para tu proyecto.
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-16">
        {/* Pasos principales */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-20 relative">
          {/* Línea conectora (sólo visible en desktop) */}
          <div className="absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-[#041C32] to-[#0050FF] hidden md:block"></div>
          
          {/* Paso 1 */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#041C32] to-[#0050FF] flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto md:mb-10 relative z-10">
              1
            </div>
            <Card className="h-full transform transition hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <Search className="w-14 h-14 mx-auto text-[#0050FF]" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-[#041C32]">Busca profesionales</h2>
                <p className="text-[#8E8E93] mb-4">
                  Utiliza nuestros filtros avanzados para encontrar el profesional con las habilidades exactas que necesitas para tu proyecto.
                </p>
                <ul className="text-left text-sm space-y-2 text-[#1c1c1e]">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Filtra por tipo de profesional (editores, videógrafos, coloristas...)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Elige por ubicación, presupuesto y especialidad</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Explora portafolios verificados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Paso 2 */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#041C32] to-[#0050FF] flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto md:mb-10 relative z-10">
              2
            </div>
            <Card className="h-full transform transition hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <MessageSquare className="w-14 h-14 mx-auto text-[#0050FF]" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-[#041C32]">Contacta y cotiza</h2>
                <p className="text-[#8E8E93] mb-4">
                  Comunícate directamente con los profesionales, explica tu proyecto y recibe propuestas personalizadas.
                </p>
                <ul className="text-left text-sm space-y-2 text-[#1c1c1e]">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Sistema de mensajería integrado seguro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Recibe propuestas detalladas y presupuestos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Negocia términos y plazos de entrega</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Paso 3 */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#041C32] to-[#0050FF] flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto md:mb-10 relative z-10">
              3
            </div>
            <Card className="h-full transform transition hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <DollarSign className="w-14 h-14 mx-auto text-[#0050FF]" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-[#041C32]">Contrata y colabora</h2>
                <p className="text-[#8E8E93] mb-4">
                  Finaliza el acuerdo y gestiona el proyecto a través de nuestra plataforma segura hasta la entrega final.
                </p>
                <ul className="text-left text-sm space-y-2 text-[#1c1c1e]">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pagos seguros con garantía de satisfacción</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Seguimiento del progreso del proyecto</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Recibe el trabajo final y deja tu reseña</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Ventajas para clientes */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#041C32]">Para marcas y empresas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <Search className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Búsqueda simplificada</h3>
                <p className="text-[#8E8E93] text-sm">
                  Encuentra al profesional ideal para tu proyecto en minutos, no días, con nuestros filtros avanzados.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <Users className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Talento verificado</h3>
                <p className="text-[#8E8E93] text-sm">
                  Todos los profesionales pasan por un proceso de verificación para garantizar calidad y confianza.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Plazos transparentes</h3>
                <p className="text-[#8E8E93] text-sm">
                  Establece fechas de entrega claras y haz seguimiento del progreso durante todo el proyecto.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Pagos seguros</h3>
                <p className="text-[#8E8E93] text-sm">
                  Sistema de pagos protegido con liberación del dinero solo cuando estés satisfecho con el resultado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Ventajas para profesionales */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#041C32]">Para profesionales del video</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Perfil destacado</h3>
                <p className="text-[#8E8E93] text-sm">
                  Crea un portafolio impactante que muestre tu experiencia, especialidades y mejores trabajos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <Users className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Clientes cualificados</h3>
                <p className="text-[#8E8E93] text-sm">
                  Accede a proyectos y clientes verificados que valoran tu experiencia y están dispuestos a pagar por calidad.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Control de tu tiempo</h3>
                <p className="text-[#8E8E93] text-sm">
                  Establece tu disponibilidad, elige los proyectos que te interesan y trabaja en tus propios términos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-[#0050FF]">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 mb-4 text-[#0050FF]" />
                <h3 className="text-lg font-semibold mb-2 text-[#041C32]">Pagos garantizados</h3>
                <p className="text-[#8E8E93] text-sm">
                  Olvídate de perseguir pagos atrasados. Nuestro sistema asegura que siempre recibas tu compensación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Rápido */}
        <div className="bg-[#F2F2F7] rounded-xl p-6 md:p-10 mb-20">
          <h2 className="text-2xl font-bold mb-6 text-[#041C32]">Preguntas frecuentes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2 text-[#041C32]">¿Cuánto cuesta usar latamvideos.com?</h3>
              <p className="text-[#8E8E93] text-sm mb-4">
                Para clientes, la plataforma es completamente gratuita. Los profesionales pagan una comisión solo cuando completan un proyecto exitosamente.
              </p>
              
              <h3 className="font-medium mb-2 text-[#041C32]">¿Cómo se garantiza la calidad de los profesionales?</h3>
              <p className="text-[#8E8E93] text-sm">
                Todos los profesionales pasan por un proceso de verificación. Además, el sistema de reseñas y portafolios te permite evaluar su trabajo previo.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-[#041C32]">¿Qué pasa si no estoy satisfecho con el trabajo?</h3>
              <p className="text-[#8E8E93] text-sm mb-4">
                Nuestro sistema de garantía protege a ambas partes. Si hay problemas, ofrecemos mediación y opciones para resolver la situación.
              </p>
              
              <h3 className="font-medium mb-2 text-[#041C32]">¿Cómo se realizan los pagos?</h3>
              <p className="text-[#8E8E93] text-sm">
                Los pagos se realizan a través de nuestra plataforma segura. El dinero se mantiene en custodia hasta que el cliente aprueba el trabajo final.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/faq">
              <Button variant="outline" className="text-[#0050FF] border-[#0050FF] hover:bg-blue-50">
                Ver todas las preguntas frecuentes
              </Button>
            </Link>
          </div>
        </div>
        
        {/* CTA final */}
        <div className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Encuentra al profesional perfecto para tu próximo proyecto de video o únete a nuestra comunidad de creadores.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/search">
              <Button className="bg-white text-[#0050FF] hover:bg-opacity-90 transition-all w-full sm:w-auto">
                Buscar profesionales
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10 transition-all w-full sm:w-auto">
                Crear mi perfil
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComoFuncionaPage;