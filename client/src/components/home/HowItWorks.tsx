import React from 'react';
import { Search, UserCheck, Video, ArrowRight } from 'lucide-react';

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
    icon: <Search className="h-8 w-8" />,
    bgColor: "bg-[#EAF2FF]",
    iconColor: "text-[#0050FF]"
  },
  {
    id: 2,
    title: "Revisa perfiles detallados",
    description: "Explora portafolios, reseñas verificadas y la experiencia del profesional antes de contactar.",
    icon: <UserCheck className="h-8 w-8" />,
    bgColor: "bg-[#EAF2FF]",
    iconColor: "text-[#0050FF]"
  },
  {
    id: 3,
    title: "Obtén resultados profesionales",
    description: "Recibe un trabajo de calidad y solicita revisiones según el paquete contratado.",
    icon: <Video className="h-8 w-8" />,
    bgColor: "bg-[#EAF2FF]",
    iconColor: "text-[#0050FF]"
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
        <div className="md:hidden space-y-6">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className={`${step.bgColor} p-3 rounded-full mr-4`}>
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                  <div>
                    <div className="inline-block bg-[#0050FF] text-white text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center mb-1">
                      {step.id}
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">{step.description}</p>
              </div>
              
              {step.id < steps.length && (
                <div className="absolute left-7 -bottom-6 w-4 h-4 text-[#0050FF]">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Versión desktop - proceso horizontal */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 transition-all hover:shadow-lg hover:border-[#0050FF]/20">
                <div className="flex items-start mb-6">
                  <div className="bg-[#0050FF] text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <div className={`${step.bgColor} p-5 rounded-full`}>
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-1 shadow">
                    <ArrowRight className="h-5 w-5 text-[#0050FF]" />
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