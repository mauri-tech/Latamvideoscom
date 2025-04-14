import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search, UserCheck, Video } from 'lucide-react';

// Interfaz para los pasos
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// Datos de los pasos para "Cómo funciona"
const steps: Step[] = [
  {
    id: 1,
    title: "Encuentra al editor perfecto",
    description: "Busca utilizando filtros avanzados por especialidad, estilo, equipamiento y presupuesto para encontrar el profesional indicado.",
    icon: <Search className="h-8 w-8" />,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: 2,
    title: "Revisa perfiles detallados",
    description: "Explora portafolios, reseñas verificadas, equipamiento y experiencia del profesional para estar seguro de tu elección.",
    icon: <UserCheck className="h-8 w-8" />,
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: 3,
    title: "Obtén resultados profesionales",
    description: "Recibe un producto de calidad, con la posibilidad de solicitar revisiones según el paquete contratado.",
    icon: <Video className="h-8 w-8" />,
    color: "bg-green-100 text-green-700"
  }
];

const HowItWorks = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Función para desplazamiento manual
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo funciona en 3 pasos simples</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra el talento que necesitas y concreta tu proyecto audiovisual en minutos
          </p>
        </div>
        
        {/* Controles de navegación en pantallas grandes */}
        <div className="hidden md:flex justify-end mb-6 space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Contenedor con scroll horizontal */}
        <div 
          ref={scrollContainer}
          className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {steps.map((step) => (
            <div 
              key={step.id}
              className="flex-shrink-0 w-[300px] md:w-1/3 snap-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-md h-full border border-gray-100 transition-all hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className={`${step.color} p-4 rounded-xl mr-4`}>
                    {step.icon}
                  </div>
                  <span className="text-2xl font-bold text-[#0050FF]">{step.id}</span>
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;