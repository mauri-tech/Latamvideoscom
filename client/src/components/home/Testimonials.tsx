import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Martínez",
    role: "Editora de video, Perú",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    text: "Desde que creé mi perfil en editoreslatam he recibido consultas de clientes que realmente valoran mi trabajo. La plataforma me permite mostrar mi portafolio de forma profesional y establecer mis tarifas sin intermediarios."
  },
  {
    name: "Miguel Sánchez",
    role: "Director de marketing, México",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    text: "Encontramos en editoreslatam una forma eficiente de contactar con talento especializado para nuestras campañas digitales. Los filtros son exactamente lo que necesitábamos para encontrar editores que se adapten al estilo de nuestra marca."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
            Editores y marcas que han encontrado lo que buscaban en editoreslatam.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-14 h-14 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-[#8E8E93] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[#8E8E93] mb-4">{testimonial.text}</p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
