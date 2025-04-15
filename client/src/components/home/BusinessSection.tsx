import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { BarChart3, Briefcase, PieChart } from 'lucide-react';
import { colorPalette } from '@/lib/constants';

const BusinessSection = () => {
  return (
    <section id="business" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Imagen de un negocio utilizando contenido de video */}
          <div className="md:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Equipo de marketing revisando contenido de video" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            
            {/* Decoración de forma orgánica */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#6BA6FF]/20 -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#C084FC]/20 -z-10"></div>
          </div>
          
          {/* Texto y bullet points */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              ¿Buscas talento para tus proyectos audiovisuales?
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Eres parte de un negocio, agencia o equipo de marketing.
              Necesitas contenido de calidad que destaque tu marca.
              Aquí, encuentras al profesional indicado para cada proyecto.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#6BA6FF]/20 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-[#6BA6FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Encuentra profesionales verificados</h3>
                  <p className="text-gray-600">Conecta con editores y videógrafos con experiencia comprobada y portafolios destacados en tu industria.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#818CF8]/20 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-[#818CF8]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Contenido adaptado a tus objetivos</h3>
                  <p className="text-gray-600">Cada profesional ofrece servicios específicos según el tipo de contenido que necesitas: redes sociales, campañas publicitarias, videos corporativos.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#C084FC]/20 p-2 rounded-lg">
                  <PieChart className="w-5 h-5 text-[#C084FC]" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Optimiza tu presupuesto</h3>
                  <p className="text-gray-600">Filtra por rango de precios y servicios específicos para encontrar profesionales que se ajusten a tus necesidades financieras.</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="text-white rounded-lg font-medium bg-gradient-to-r from-[#6BA6FF] to-[#C084FC]"
              size="lg"
              asChild
            >
              <Link href="/search">Buscar profesionales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;