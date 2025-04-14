import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const registrationSteps = [
  {
    number: 1,
    title: "Información personal",
    description: "Sube tu foto, nombre, correo, país y experiencia."
  },
  {
    number: 2,
    title: "Softwares y estilos",
    description: "Selecciona los programas que dominas y los estilos que manejas."
  },
  {
    number: 3,
    title: "Equipo técnico",
    description: "Especifica tu computadora, cámara, micrófono y otros equipos."
  },
  {
    number: 4,
    title: "Portafolio",
    description: "Sube tus videos o enlaces con miniaturas personalizadas."
  },
  {
    number: 5,
    title: "Tarifas y disponibilidad",
    description: "Define tus precios, disponibilidad y formas de pago."
  }
];

const RegistrationProcess = () => {
  return (
    <section id="para-editores" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Crea tu perfil profesional en minutos</h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
            Sigue estos simples pasos para crear un portafolio que destaque tu talento.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {registrationSteps.map((step) => (
            <div key={step.number} className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary bg-opacity-10 text-primary font-semibold mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-[#8E8E93] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/register">
            <Button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-[#0056B3] transition font-medium">
              Comenzar ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrationProcess;
