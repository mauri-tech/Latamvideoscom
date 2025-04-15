import React from 'react';
import { Search, UserCheck, Video, ArrowRight } from 'lucide-react';
import { colorPalette } from '@/lib/constants';

// Interfaz para los pasos
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

// Datos de los pasos para "Cómo funciona"
const steps: Step[] = [
  {
    id: 1,
    title: "Encuentra al profesional perfecto",
    description: "Usa nuestros filtros por especialidad, equipo y presupuesto para encontrar el talento ideal para tu proyecto.",
    icon: <Search className="h-8 w-8" style={{ color: colorPalette.pastel.blue }} />,
    bgColor: "bg-gradient-to-br from-white to-[#f2f2f7]",
    iconColor: ""
  },
  {
    id: 2,
    title: "Revisa perfiles detallados",
    description: "Explora portafolios, reseñas verificadas y la experiencia del profesional antes de contactar.",
    icon: <UserCheck className="h-8 w-8" style={{ color: colorPalette.pastel.indigo }} />,
    bgColor: "bg-gradient-to-br from-[#fafafa] to-[#f2f2f7]",
    iconColor: ""
  },
  {
    id: 3,
    title: "Obtén resultados profesionales",
    description: "Recibe un trabajo de calidad y solicita revisiones según el paquete contratado.",
    icon: <Video className="h-8 w-8" style={{ color: colorPalette.pastel.purple }} />,
    bgColor: "bg-gradient-to-br from-white to-[#fafafa]",
    iconColor: ""
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conectamos talento audiovisual con clientes en toda Latinoamérica en tres simples pasos
          </p>
        </div>
        
        {/* Versión móvil - cards apiladas verticalmente */}
        <div className="md:hidden space-y-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative"
            >
              <div className={`${step.bgColor} rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/30 transform translate-x-12 -translate-y-12 opacity-50"></div>
                <div className="flex flex-col items-center text-center mb-4 relative z-10">
                  <div 
                    className="inline-block text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center mb-3 shadow-sm"
                    style={{ backgroundColor: colorPalette.grayscale.primary }}
                  >
                    {step.id}
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight text-gray-800">{step.title}</h3>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-full mb-3 shadow-md">
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
              
              {step.id < steps.length && (
                <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2">
                  <div className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md">
                    <ArrowRight 
                      className="h-5 w-5 rotate-90" 
                      style={{ color: colorPalette.grayscale.primary }}
                      fill="#F8FAFC" 
                      stroke={colorPalette.grayscale.primary} 
                      strokeWidth={2} 
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Versión desktop - proceso horizontal */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              <div className={`${step.bgColor} rounded-xl p-8 shadow-lg h-full border border-gray-100 transition-all group-hover:shadow-xl group-hover:translate-y-[-5px] duration-300 overflow-hidden relative`}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/30 transform translate-x-16 -translate-y-16 opacity-50"></div>
                <div className="flex flex-col items-center text-center mb-6 relative z-10">
                  <div 
                    className="text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center mb-6 shrink-0 shadow-md"
                    style={{ backgroundColor: colorPalette.grayscale.primary }}
                  >
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-gray-800">{step.title}</h3>
                  <div className="bg-white/70 backdrop-blur-sm p-5 rounded-full mb-4 shadow-md">
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                    <ArrowRight 
                      className="h-5 w-5" 
                      style={{ color: colorPalette.grayscale.primary }}
                      fill="#F8FAFC" 
                      stroke={colorPalette.grayscale.primary} 
                      strokeWidth={2} 
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;