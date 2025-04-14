import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Contenido del texto */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                <span className="text-[#007AFF]">latamvideos</span>
                <span className="text-black font-normal">.com</span>
              </h1>
              
              <p className="text-gray-600 text-lg mb-8">
                Conectamos editores de video con marcas, agencias y creadores que 
                buscan talento específico por estilo, equipo y precio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#007AFF] hover:bg-[#0069d9] text-white" 
                  size="lg"
                  asChild
                >
                  <Link href="/register">Registrarse</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/5"
                  size="lg"
                  asChild
                >
                  <Link href="/about">Conocer más</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Imagen del editor trabajando */}
          <div className="md:w-1/2">
            <div className="bg-[#F5F5F7] rounded-xl p-4">
              <h3 className="font-medium text-lg mb-3">Editor de video trabajando</h3>
              <div className="aspect-video rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="Interfaz de edición de video en DaVinci Resolve"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Para Editores</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-[#007AFF] mr-3 mt-1 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-gray-800">
                Crea un perfil profesional con tu información, herramientas y experiencia
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="text-[#007AFF] mr-3 mt-1 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-gray-800">
                Sube tu portafolio con enlaces a tus mejores trabajos en YouTube o Vimeo
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="text-[#007AFF] mr-3 mt-1 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-gray-800">
                Define tus tarifas según el servicio y experiencia que ofreces
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="text-[#007AFF] mr-3 mt-1 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-gray-800">
                Recibe solicitudes de clientes que buscan específicamente tu perfil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;