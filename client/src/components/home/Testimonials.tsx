import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Kevin Ramírez",
    role: "Editor en Ciudad de México",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    text: "Gracias a esta plataforma me contrató una agencia en Nueva York. Nunca pensé que mostrar mi trabajo así tuviera tanto impacto.",
    rating: 5
  },
  {
    name: "Ana Martínez",
    role: "Videógrafa, Perú",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    text: "Desde que creé mi perfil en latamvideos.com he recibido consultas de clientes que realmente valoran mi trabajo. La plataforma me permite mostrar mi portafolio de forma profesional.",
    rating: 5
  },
  {
    name: "Miguel Sánchez",
    role: "Director de marketing, México",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    text: "Encontramos en latamvideos.com una forma eficiente de contactar con talento especializado para nuestras campañas digitales. Los filtros son exactamente lo que necesitábamos.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-[#007AFF]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-t from-[#A0C4FF]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiencias que inspiran</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Editores y marcas que han conectado a través de latamvideos.com, formando relaciones profesionales duraderas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative">
              <div className="absolute -top-3 -left-3 text-[#007AFF]/10">
                <Quote className="w-12 h-12 fill-current" />
              </div>
              
              <div className="flex flex-col h-full">
                <p className="text-gray-700 mb-6 relative z-10 flex-grow">"{testimonial.text}"</p>
                
                <div className="flex items-center mt-auto">
                  <img 
                    src={testimonial.image}
                    alt={`Foto de ${testimonial.name}`}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Video testimonial futuro */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500">
            *Estos testimonios reflejan la visión de futuro para la plataforma.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
