import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import editorImage from '../../assets/editor-profile.png';

const Hero = () => {
  return (
    <div className="bg-white pt-10 md:pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Versión móvil con imagen arriba */}
        <div className="flex flex-col md:hidden mb-8">
          <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EAF2FF] rounded-xl p-4 shadow-lg mb-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={editorImage} 
                alt="Profesionales en video de LATAM"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center tracking-tight mb-4">
            Encuentra a profesionales en video de LATAM
          </h1>

          <div className="mb-6 text-center">
            <span className="text-3xl text-[#0050FF] font-bold">latamvideos</span>
            <span className="text-gray-800 font-normal">.com</span>
          </div>
          
          <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed text-center">
            La plataforma para conectar con editores, videógrafos y profesionales
            especializados por estilo, equipo y presupuesto.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button 
              className="bg-gradient-to-r from-[#041C32] to-[#0050FF] hover:from-[#0A2540] hover:to-[#0060FF] text-white" 
              size="lg"
              asChild
            >
              <Link href="/register">Registrarse</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#0050FF] text-[#0050FF] hover:bg-blue-50"
              size="lg"
              asChild
            >
              <Link href="/como-funciona">Conocer más</Link>
            </Button>
          </div>
        </div>

        {/* Versión desktop */}
        <div className="hidden md:flex md:flex-row items-center">
          {/* Contenido del texto */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                <span>Encuentra a profesionales</span><br />
                <span className="text-[#0050FF]">en video de LATAM</span>
              </h1>
              
              <div className="mb-6">
                <span className="text-3xl text-[#0050FF] font-bold">latamvideos</span>
                <span className="text-gray-800 font-normal">.com</span>
              </div>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
                La plataforma para conectar con editores, videógrafos y profesionales
                especializados por estilo, equipo y presupuesto.
              </p>
              
              <div className="flex flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-[#041C32] to-[#0050FF] hover:from-[#0A2540] hover:to-[#0060FF] text-white" 
                  size="lg"
                  asChild
                >
                  <Link href="/register">Registrarse</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#0050FF] text-[#0050FF] hover:bg-blue-50"
                  size="lg"
                  asChild
                >
                  <Link href="/como-funciona">Conocer más</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Imagen del editor trabajando */}
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EAF2FF] rounded-xl p-4 shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={editorImage} 
                  alt="Profesionales en video de LATAM"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;