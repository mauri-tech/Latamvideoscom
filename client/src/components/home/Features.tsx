import React from 'react';
import { Check } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-[#E5E5EA] gradient-card-soft relative">
      <div className="flex items-start">
        <div className="bg-[#0050FF]/10 p-2 rounded-full mr-4 flex-shrink-0">
          <Check className="h-5 w-5 text-[#0050FF]" />
        </div>
        <div>
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Perfil profesional destacado",
      description: "Crea un perfil completo con tus herramientas, habilidades y experiencia para destacar ante potenciales clientes."
    },
    {
      title: "Portafolio visual impactante",
      description: "Sube tu portafolio con enlaces a tus mejores trabajos en YouTube o Vimeo para mostrar tu estilo único."
    },
    {
      title: "Tarifas personalizadas",
      description: "Define tus tarifas según el servicio y experiencia que ofreces, con paquetes para diferentes necesidades."
    },
    {
      title: "Clientes específicos",
      description: "Recibe solicitudes de clientes que buscan específicamente tu perfil y experiencia para sus proyectos."
    }
  ];

  return (
    <div className="py-16 bg-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Para Editores</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;