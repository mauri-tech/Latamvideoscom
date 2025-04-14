import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Datos de preguntas frecuentes
const faqItems = [
  {
    question: "¿Tiene costo aparecer aquí?",
    answer: "Actualmente, crear un perfil básico en la plataforma es gratuito. En el futuro, existirán planes premium con beneficios adicionales como destacar tu perfil, acceder a funciones avanzadas y obtener mayor visibilidad."
  },
  {
    question: "¿Cómo me contacto con un editor?",
    answer: "El contacto con los editores es directo. Cada perfil cuenta con un botón para enviar un mensaje o solicitar una cotización. Algunos editores también pueden incluir sus datos de contacto adicionales como correo electrónico profesional."
  },
  {
    question: "¿Qué pasa si quiero cambiar mis tarifas?",
    answer: "Tienes total control sobre tu perfil. Puedes actualizar tus tarifas, servicios, portafolio y disponibilidad en cualquier momento desde tu panel de usuario."
  },
  {
    question: "¿La plataforma cobra comisión por los proyectos?",
    answer: "No, latamvideos.com no cobra comisiones por los proyectos que consigas a través de la plataforma. Los acuerdos económicos son directamente entre tú y tus clientes."
  },
  {
    question: "¿Cómo verifican los perfiles profesionales?",
    answer: "Realizamos un proceso de verificación que incluye la revisión del portafolio, credenciales profesionales y referencias. Los perfiles verificados cuentan con una insignia azul que garantiza su autenticidad."
  },
  {
    question: "¿Puedo filtrar por ubicación o tipo de proyecto?",
    answer: "Sí, ofrecemos filtros avanzados que te permiten buscar por ubicación geográfica, especialidad, software de edición, rango de precio, tipo de proyecto y más para encontrar el talento ideal para tus necesidades."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre cómo funciona la plataforma tanto para clientes como para profesionales.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 shadow-sm bg-white"
              >
                <AccordionTrigger className="text-left font-medium py-4 text-lg hover:text-[#007AFF] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 pt-0">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500">
            ¿Tienes más preguntas? <a href="/contacto" className="text-[#007AFF] hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;