import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CookiesPage = () => {
  const [activeTab, setActiveTab] = useState('essential');
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Política de Cookies | latamvideos.com</title>
        <meta name="description" content="Información sobre cómo utilizamos las cookies en latamvideos.com y cómo puedes controlar su uso." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#041C32]">Política de Cookies</h1>
        <p className="text-sm text-[#8E8E93] mb-10 text-center max-w-2xl mx-auto">
          Última actualización: 10 de abril de 2025
        </p>
        
        <div className="max-w-3xl mx-auto">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">¿Qué son las cookies?</h2>
            <p className="text-[#1c1c1e] mb-4">
              Las cookies son pequeños archivos de texto que los sitios web colocan en tu dispositivo para almacenar información. 
              Son ampliamente utilizadas para hacer que los sitios web funcionen o funcionen de manera más eficiente, 
              así como para proporcionar información a los propietarios del sitio.
            </p>
            <p className="text-[#1c1c1e]">
              En latamvideos.com, utilizamos cookies y tecnologías similares para diversos fines, 
              incluido el funcionamiento de nuestra plataforma, análisis de uso, personalización de 
              contenido y publicidad dirigida cuando corresponda.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-[#041C32]">Tipos de cookies que utilizamos</h2>
            
            <div className="bg-[#F2F2F7] rounded-lg p-1 flex mb-6">
              <button 
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'essential' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                onClick={() => setActiveTab('essential')}
              >
                Esenciales
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'functional' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                onClick={() => setActiveTab('functional')}
              >
                Funcionales
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analíticas
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'advertising' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                onClick={() => setActiveTab('advertising')}
              >
                Publicidad
              </button>
            </div>
            
            <div className="bg-white border border-[#E5E5EA] rounded-lg p-6">
              {activeTab === 'essential' && (
                <div>
                  <h3 className="text-xl font-medium mb-3 text-[#041C32]">Cookies Esenciales</h3>
                  <p className="text-[#1c1c1e] mb-4">
                    Estas cookies son necesarias para el funcionamiento básico de nuestro sitio web y no pueden desactivarse en nuestros sistemas.
                    Generalmente solo se configuran en respuesta a acciones realizadas por ti, como configurar tus preferencias de privacidad,
                    iniciar sesión o completar formularios.
                  </p>
                  <div className="bg-[#F2F2F7] rounded-lg p-4">
                    <h4 className="font-medium mb-2">Ejemplos de cookies esenciales</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cookies de sesión para mantener tu inicio de sesión</li>
                      <li>Cookies de preferencias para recordar la configuración del sitio</li>
                      <li>Cookies de seguridad para proteger contra actividades fraudulentas</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'functional' && (
                <div>
                  <h3 className="text-xl font-medium mb-3 text-[#041C32]">Cookies Funcionales</h3>
                  <p className="text-[#1c1c1e] mb-4">
                    Estas cookies permiten que el sitio proporcione funcionalidades y personalización mejoradas.
                    Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos añadido a nuestras páginas.
                  </p>
                  <div className="bg-[#F2F2F7] rounded-lg p-4">
                    <h4 className="font-medium mb-2">Ejemplos de cookies funcionales</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cookies para recordar tus preferencias de visualización</li>
                      <li>Cookies para personalizar el contenido según tu uso previo</li>
                      <li>Cookies para integración con servicios de terceros como chat en vivo</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'analytics' && (
                <div>
                  <h3 className="text-xl font-medium mb-3 text-[#041C32]">Cookies Analíticas</h3>
                  <p className="text-[#1c1c1e] mb-4">
                    Estas cookies nos permiten contar visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio.
                    Nos ayudan a saber qué páginas son las más y menos populares y a ver cómo los visitantes navegan por el sitio.
                  </p>
                  <div className="bg-[#F2F2F7] rounded-lg p-4">
                    <h4 className="font-medium mb-2">Ejemplos de cookies analíticas</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Google Analytics para análisis de tráfico y comportamiento</li>
                      <li>Cookies de heatmap para entender patrones de clic</li>
                      <li>Cookies de rendimiento para medir tiempos de carga</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'advertising' && (
                <div>
                  <h3 className="text-xl font-medium mb-3 text-[#041C32]">Cookies de Publicidad</h3>
                  <p className="text-[#1c1c1e] mb-4">
                    Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios.
                    Pueden ser utilizadas por estas empresas para construir un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios.
                  </p>
                  <div className="bg-[#F2F2F7] rounded-lg p-4">
                    <h4 className="font-medium mb-2">Ejemplos de cookies publicitarias</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cookies de retargeting para mostrar anuncios basados en tu actividad previa</li>
                      <li>Cookies de redes sociales para integración y seguimiento</li>
                      <li>Cookies de socios publicitarios para mostrar anuncios relevantes</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">Cómo gestionar las cookies</h2>
            <p className="text-[#1c1c1e] mb-4">
              Puedes gestionar las cookies a través de la configuración de tu navegador. La mayoría de los navegadores
              te permiten rechazar o aceptar todas las cookies, o solo aceptar ciertos tipos de cookies.
            </p>
            <p className="text-[#1c1c1e] mb-4">
              También puedes configurar tus preferencias de cookies en nuestro sitio web utilizando
              el panel de preferencias de cookies accesible desde el pie de página.
            </p>
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => console.log('Abrir panel de preferencias')}
            >
              Configurar preferencias de cookies
            </Button>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="chrome">
                <AccordionTrigger className="text-[#1c1c1e] font-medium">
                  Gestionar cookies en Google Chrome
                </AccordionTrigger>
                <AccordionContent className="text-[#8E8E93]">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Haz clic en el menú de Chrome en la esquina superior derecha</li>
                    <li>Selecciona "Configuración"</li>
                    <li>Desplázate hacia abajo y haz clic en "Privacidad y seguridad"</li>
                    <li>Haz clic en "Cookies y otros datos del sitio"</li>
                    <li>Ajusta la configuración de cookies según tus preferencias</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="firefox">
                <AccordionTrigger className="text-[#1c1c1e] font-medium">
                  Gestionar cookies en Mozilla Firefox
                </AccordionTrigger>
                <AccordionContent className="text-[#8E8E93]">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Haz clic en el menú de Firefox en la esquina superior derecha</li>
                    <li>Selecciona "Opciones" o "Preferencias"</li>
                    <li>Selecciona el panel "Privacidad y seguridad"</li>
                    <li>En la sección "Cookies y datos del sitio", ajusta la configuración</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="safari">
                <AccordionTrigger className="text-[#1c1c1e] font-medium">
                  Gestionar cookies en Safari
                </AccordionTrigger>
                <AccordionContent className="text-[#8E8E93]">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Haz clic en "Safari" en la barra de menú</li>
                    <li>Selecciona "Preferencias"</li>
                    <li>Haz clic en la pestaña "Privacidad"</li>
                    <li>En la sección "Cookies y datos del sitio web", ajusta la configuración</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="edge">
                <AccordionTrigger className="text-[#1c1c1e] font-medium">
                  Gestionar cookies en Microsoft Edge
                </AccordionTrigger>
                <AccordionContent className="text-[#8E8E93]">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Haz clic en el menú de Edge en la esquina superior derecha</li>
                    <li>Selecciona "Configuración"</li>
                    <li>Haz clic en "Cookies y permisos del sitio"</li>
                    <li>Selecciona "Administrar y eliminar cookies y datos del sitio"</li>
                    <li>Ajusta la configuración según tus preferencias</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">Actualizaciones a esta política</h2>
            <p className="text-[#1c1c1e] mb-4">
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en nuestras prácticas o por razones legales.
              La versión más reciente se publicará en esta página con la fecha de actualización.
            </p>
            <p className="text-[#1c1c1e] mb-4">
              Te animamos a revisar periódicamente esta política para estar informado sobre cómo protegemos tu información.
            </p>
            <div className="bg-[#F2F2F7] rounded-lg p-6 mt-8">
              <h3 className="text-lg font-medium mb-3 text-[#041C32]">¿Tienes más preguntas sobre nuestras cookies?</h3>
              <p className="text-[#1c1c1e] mb-4">
                Si tienes preguntas o inquietudes sobre nuestra Política de Cookies o prácticas de privacidad, 
                no dudes en contactarnos:
              </p>
              <p className="text-[#1c1c1e]">
                <strong>Correo electrónico:</strong> privacy@latamvideos.com<br />
                <strong>Teléfono:</strong> +52 55 1234 5678
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPage;