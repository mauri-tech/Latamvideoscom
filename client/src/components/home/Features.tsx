import React from 'react';
import { Check } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
          <Check className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const creativeFeatures = [
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
    }
  ];

  const businessFeatures = [
    {
      title: "Búsqueda avanzada por especialidad",
      description: "Filtra profesionales según el tipo de edición, estilo visual, herramientas y experiencia que necesitas para tu proyecto."
    },
    {
      title: "Presupuestos transparentes",
      description: "Visualiza claramente las tarifas de cada profesional y qué incluye cada paquete, evitando costos sorpresa."
    },
    {
      title: "Verificación de portafolios",
      description: "Cada portafolio es revisado para verificar la calidad y autenticidad, garantizando que contrates talento real."
    }
  ];

  return (
    <div id="features" className="py-16 bg-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué funciona?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Conectamos creativos con negocios, agencias y personas mediante una plataforma inteligente
            que facilita la búsqueda por estilo, especialización y presupuesto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">👨‍🎨</span>
              Para Creativos
            </h3>
            <div className="grid gap-6">
              {creativeFeatures.map((feature, index) => (
                <Feature
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-2">🏢</span>
              Para Negocios
            </h3>
            <div className="grid gap-6">
              {businessFeatures.map((feature, index) => (
                <Feature
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;