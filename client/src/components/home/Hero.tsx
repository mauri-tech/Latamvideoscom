import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-20">
      {/* Fondo con el gradiente premium */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 gradient-premium-blue"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Contenido del texto */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="text-white">latamvideos</span>
                <span className="text-[#A0C4FF] font-light">.com</span>
              </h1>
              
              <p className="text-[#E0E7FF] text-lg md:text-xl mb-8 leading-relaxed">
                Conectamos editores de video con marcas, agencias y creadores que 
                buscan talento específico por estilo, equipo y precio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-[#0050FF] hover:bg-white/90 shadow-lg" 
                  size="lg"
                  asChild
                >
                  <Link href="/register">Registrarse</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
                  size="lg"
                  asChild
                >
                  <Link href="/about">Conocer más</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Imagen del editor trabajando con DaVinci Resolve */}
          <div className="md:w-1/2">
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/10">
              <h3 className="font-medium text-lg mb-3 text-white">Editor trabajando en DaVinci Resolve</h3>
              <div className="aspect-video rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="https://cdn.pixabay.com/photo/2022/05/06/20/32/video-editing-7178041_1280.jpg" 
                  alt="Interfaz de edición de video en DaVinci Resolve"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección Para Editores con fondo claro */}
      <div className="mt-20 py-16 relative bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Para Editores</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E5E5EA] gradient-card-soft relative">
              <div className="flex items-start">
                <div className="bg-[#0050FF]/10 p-2 rounded-full mr-4 flex-shrink-0">
                  <Check className="h-5 w-5 text-[#0050FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Perfil profesional destacado</h3>
                  <p className="text-gray-700">
                    Crea un perfil completo con tus herramientas, habilidades y experiencia para destacar ante potenciales clientes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E5E5EA] gradient-card-soft relative">
              <div className="flex items-start">
                <div className="bg-[#0050FF]/10 p-2 rounded-full mr-4 flex-shrink-0">
                  <Check className="h-5 w-5 text-[#0050FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Portafolio visual impactante</h3>
                  <p className="text-gray-700">
                    Sube tu portafolio con enlaces a tus mejores trabajos en YouTube o Vimeo para mostrar tu estilo único.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E5E5EA] gradient-card-soft relative">
              <div className="flex items-start">
                <div className="bg-[#0050FF]/10 p-2 rounded-full mr-4 flex-shrink-0">
                  <Check className="h-5 w-5 text-[#0050FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Tarifas personalizadas</h3>
                  <p className="text-gray-700">
                    Define tus tarifas según el servicio y experiencia que ofreces, con paquetes para diferentes necesidades.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E5E5EA] gradient-card-soft relative">
              <div className="flex items-start">
                <div className="bg-[#0050FF]/10 p-2 rounded-full mr-4 flex-shrink-0">
                  <Check className="h-5 w-5 text-[#0050FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Clientes específicos</h3>
                  <p className="text-gray-700">
                    Recibe solicitudes de clientes que buscan específicamente tu perfil y experiencia para sus proyectos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;