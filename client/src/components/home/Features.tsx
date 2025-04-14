import { Check } from 'lucide-react';

const Features = () => {
  const editorFeatures = [
    "Crea un perfil profesional con tu información, herramientas y experiencia",
    "Sube tu portafolio con enlaces a tus mejores trabajos en YouTube o Vimeo",
    "Define tus tarifas por tipo de servicio: básico, medio o avanzado",
    "Establece tu disponibilidad y formas de pago preferidas",
    "Recibe estadísticas sobre visitas a tu perfil y solicitudes de contacto"
  ];

  const clientFeatures = [
    "Busca editores filtrando por tipo de video, tarifa, país o software",
    "Visualiza perfiles completos, portafolios, tarifas y disponibilidad",
    "Envía un brief rápido o solicita cotización directamente",
    "Encuentra talento específico sin pasar por plataformas genéricas",
    "Recibe recomendaciones de editores ideales según tus necesidades"
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona latamvideos.com?</h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
            Una plataforma diseñada para satisfacer las necesidades específicas del mercado de edición de video en Latinoamérica.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="rounded-lg shadow-md w-full h-auto mb-8 bg-gray-200 aspect-[3/2] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600783245998-22e58ca85d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Editor de video trabajando" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Para Editores</h3>
            <ul className="space-y-3">
              {editorFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-[#007AFF] mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="rounded-lg shadow-md w-full h-auto mb-8 bg-gray-200 aspect-[3/2] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Agencia buscando talento" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Para Marcas y Agencias</h3>
            <ul className="space-y-3">
              {clientFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-[#007AFF] mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
