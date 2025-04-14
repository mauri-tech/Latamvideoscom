import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const FAQPage: React.FC = () => {
  // Preguntas por categoría
  const faqCategories = [
    {
      title: "Para Editores",
      questions: [
        {
          question: "¿Cómo puedo crear un perfil en latamvideos.com?",
          answer: "Registrarte en latamvideos.com es muy sencillo. Haz clic en el botón 'Registrarse' en la esquina superior derecha, selecciona 'editor' como tipo de usuario, completa tus datos básicos y sigue las instrucciones para completar tu perfil profesional con tu portafolio, especialidades y tarifas."
        },
        {
          question: "¿Qué tipo de trabajos puedo encontrar en la plataforma?",
          answer: "En latamvideos.com encontrarás proyectos de edición de todo tipo: videos corporativos, contenido para redes sociales, documentales, videoclips, producciones publicitarias, eventos, y mucho más. La plataforma está diseñada para conectar a editores con marcas y creadores en toda Latinoamérica."
        },
        {
          question: "¿Cómo me destacaré entre otros editores?",
          answer: "Tu perfil debe mostrar claramente tu especialidad. Mantén actualizado tu portafolio con tus mejores trabajos, sé específico sobre tus habilidades técnicas, responde rápidamente a los mensajes, y pide reseñas a clientes satisfechos. También puedes participar activamente en el foro de la comunidad para aumentar tu visibilidad."
        },
        {
          question: "¿Cómo establecer mis tarifas?",
          answer: "Te recomendamos investigar las tarifas promedio en tu país y especialidad. En tu perfil puedes establecer rangos de precios según complejidad del proyecto (básico, medio, avanzado). Recuerda que los clientes valorarán la calidad y experiencia por encima del precio, así que establece tarifas que reflejen justamente tu nivel profesional."
        },
        {
          question: "¿Cómo funcionan los pagos?",
          answer: "Actualmente, los acuerdos y pagos se realizan directamente entre tú y el cliente. Recomendamos establecer términos claros desde el principio, incluyendo anticipos, plazos de entrega y número de revisiones. En el futuro, implementaremos un sistema de pagos integrado para facilitar las transacciones de manera segura."
        }
      ]
    },
    {
      title: "Para Clientes",
      questions: [
        {
          question: "¿Cómo encuentro al editor perfecto para mi proyecto?",
          answer: "Utiliza nuestro buscador avanzado para filtrar por país, especialidad, software y rango de precios. Revisa cuidadosamente los portafolios, prestando atención al estilo que mejor se ajuste a tu visión. También puedes publicar tu proyecto y recibir propuestas de editores interesados, o solicitar recomendaciones a través de nuestra función de búsqueda asistida."
        },
        {
          question: "¿Cómo sé que puedo confiar en un editor?",
          answer: "Todos los editores pasan por un proceso de verificación básica. Además, puedes revisar sus calificaciones y reseñas de clientes anteriores. Recomendamos comenzar con un proyecto pequeño o solicitar una muestra si es tu primera vez trabajando con un editor específico."
        },
        {
          question: "¿Cuánto debería pagar por servicios de edición?",
          answer: "Los precios varían según el país, la experiencia del editor, y la complejidad del proyecto. Un video sencillo puede costar desde $50 USD, mientras que producciones complejas pueden superar los $500 USD. Cada editor establece sus tarifas en su perfil, lo que te permite encontrar opciones dentro de tu presupuesto."
        },
        {
          question: "¿Cómo funciona el proceso de contratación?",
          answer: "Una vez que encuentres al editor adecuado, puedes contactarlo directamente a través de la plataforma. Recomendamos definir claramente el alcance del proyecto, plazos, presupuesto y entregables antes de comenzar. Puedes utilizar nuestra plantilla de brief para asegurarte de proporcionar toda la información necesaria."
        },
        {
          question: "¿Qué hago si no estoy satisfecho con el resultado?",
          answer: "Te recomendamos establecer de antemano el número de revisiones incluidas en el precio y los criterios de aceptación. La mayoría de los editores están dispuestos a realizar ajustes razonables para asegurar tu satisfacción. En caso de desacuerdos serios, contáctanos a soporte@latamvideos.com y te ayudaremos a encontrar una solución."
        }
      ]
    },
    {
      title: "Sobre la Plataforma",
      questions: [
        {
          question: "¿Qué es latamvideos.com?",
          answer: "latamvideos.com es la primera plataforma especializada en conectar profesionales de la edición de video con clientes en toda Latinoamérica. Ofrecemos un espacio para que los editores muestren su talento, y para que las marcas y creadores encuentren al profesional perfecto para sus proyectos audiovisuales."
        },
        {
          question: "¿Cómo se diferencia de otras plataformas freelance?",
          answer: "A diferencia de sitios genéricos, nos especializamos exclusivamente en video y producción audiovisual en Latinoamérica. Esto significa perfiles más relevantes, portfolios visuales especializados, y una comunidad vibrante de profesionales del mismo sector. Entendemos las particularidades culturales y del mercado audiovisual latinoamericano."
        },
        {
          question: "¿La plataforma está disponible en toda Latinoamérica?",
          answer: "Sí, nuestra plataforma está disponible para profesionales y clientes de todos los países de Latinoamérica. Contamos con editores de México, Colombia, Argentina, Chile, Perú, y más países de la región, facilitando tanto colaboraciones locales como internacionales."
        },
        {
          question: "¿Tiene algún costo usar la plataforma?",
          answer: "Actualmente el registro y uso básico de la plataforma es gratuito tanto para editores como para clientes. En el futuro, implementaremos planes premium con características adicionales, pero siempre mantendremos una opción gratuita funcional."
        },
        {
          question: "¿Cómo puedo contactar al soporte?",
          answer: "Puedes contactarnos a través de soporte@latamvideos.com para cualquier consulta, sugerencia o problema que encuentres. Nuestro equipo está disponible para ayudarte en todo lo que necesites."
        }
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Preguntas Frecuentes | latamvideos.com</title>
      </Helmet>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#041C32] to-[#0050FF] bg-clip-text text-transparent">
            Preguntas Frecuentes
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Encuentra respuestas a las preguntas más comunes sobre latamvideos.com
          </p>

          {faqCategories.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[#041C32]">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${index}-${faqIndex}`}
                    className="border-b border-[#A0C4FF]/30"
                  >
                    <AccordionTrigger className="text-lg font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="py-2 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="bg-gradient-to-r from-[#041C32] to-[#0050FF] rounded-lg p-8 text-white mt-12">
            <h2 className="text-2xl font-bold mb-3">¿No encuentras lo que buscas?</h2>
            <p className="mb-6">
              Estamos aquí para ayudarte con cualquier otra pregunta que puedas tener sobre nuestra plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                className="bg-white text-[#0050FF] hover:bg-gray-100"
                asChild
              >
                <Link href="/contact">
                  Contactar Soporte
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
                asChild
              >
                <Link href="/forum">
                  Visitar el Foro
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;