import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import editorImage from '../../assets/editor-profile.png';

const Hero = () => {
  return (
    <div className="bg-white pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Contenido del texto */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="text-[#0050FF]">latamvideos</span>
                <span className="text-gray-800 font-normal">.com</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
                La plataforma para conectar creativos con negocios y empresas
                buscando talento específico por estilo, equipo y precio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#0050FF] hover:bg-[#0069d9] text-white shadow-md" 
                  size="lg"
                  asChild
                >
                  <Link href="/register">Registrarse</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#0050FF] text-[#0050FF] hover:bg-[#0050FF]/5"
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
            <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EAF2FF] rounded-xl p-4 shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={editorImage} 
                  alt="Editor profesional trabajando"
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