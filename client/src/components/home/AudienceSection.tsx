import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Users, Building2, Camera } from 'lucide-react';

const AudienceSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Imagen de un editor trabajando */}
          <div className="md:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1616832880334-b1004d9929ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Editor de video trabajando" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            
            {/* Decoración de forma orgánica */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#007AFF]/10 -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#A0C4FF]/20 -z-10"></div>
          </div>
          
          {/* Texto y bullet points */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              ¿Para quién es esta plataforma?
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Eres editor o videógrafo.
              Tienes talento, experiencia y un portafolio que merece ser visto.
              Aquí, te encuentran quienes buscan lo que haces: marcas, empresas, creadores y managers.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#007AFF]/10 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Agencias que buscan freelancers de confianza</h3>
                  <p className="text-gray-600">Conecta con agencias que necesitan reforzar sus equipos con talento especializado para proyectos específicos.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#007AFF]/10 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Negocios que necesitan contenido de calidad</h3>
                  <p className="text-gray-600">Empresas en busca de creadores de contenido para redes sociales, videos corporativos y materiales promocionales.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#007AFF]/10 p-2 rounded-lg">
                  <Camera className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Figuras públicas que quieren proyectarse bien</h3>
                  <p className="text-gray-600">Influencers, artistas y personalidades que necesitan contenido profesional para fortalecer su presencia digital.</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-lg font-medium"
              size="lg"
              asChild
            >
              <Link href="/how-it-works">Ver cómo funciona</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;