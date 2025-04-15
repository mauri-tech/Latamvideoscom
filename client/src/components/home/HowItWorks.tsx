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
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconColor: "text-[#0050FF]"
  },
  {
    id: 2,
    title: "Revisa perfiles detallados",
    description: "Explora portafolios, reseñas verificadas y la experiencia del profesional antes de contactar.",
    icon: <UserCheck className="h-8 w-8" />,
    bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    iconColor: "text-[#0050FF]"
  },
  {
    id: 3,
    title: "Obtén resultados profesionales",
    description: "Recibe un trabajo de calidad y solicita revisiones según el paquete contratado.",
    icon: <Video className="h-8 w-8" />,
    bgColor: "bg-gradient-to-br from-sky-50 to-sky-100",
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
        <div className="md:hidden space-y-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="inline-block bg-[#0050FF] text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center mb-3">
                    {step.id}
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight">{step.title}</h3>
                  <div className={`${step.bgColor} p-4 rounded-full mb-3`}>
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                  <p className="text-gray-600 leading-snug text-sm">{step.description}</p>
                </div>
              </div>
              
              {step.id < steps.length && (
                <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 text-[#0050FF]">
                  <ArrowRight className="h-5 w-5 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Versión desktop - proceso horizontal */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 transition-all group-hover:shadow-xl group-hover:translate-y-[-5px] duration-300">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-[#0050FF] text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center mb-6 shrink-0">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                  <div className={`${step.bgColor} p-5 rounded-full mb-4`}>
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>
                  <p className="text-gray-600 leading-snug text-sm">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-1 shadow-md">
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