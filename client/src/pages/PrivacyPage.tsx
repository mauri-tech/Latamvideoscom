import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Política de Privacidad | latamvideos.com</title>
        <meta name="description" content="Conoce nuestra política de privacidad y cómo protegemos los datos personales de los usuarios de latamvideos.com." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#041C32]">Política de Privacidad</h1>
        
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p className="text-sm text-[#8E8E93] mb-8 text-center">
            Última actualización: 10 de abril de 2025
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">1. Introducción</h2>
            <p>
              En latamvideos.com, nos comprometemos a proteger tu privacidad y tus datos personales. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y compartimos tu información cuando utilizas nuestra plataforma.
            </p>
            <p>
              Al acceder o utilizar latamvideos.com, aceptas las prácticas descritas en esta política. Te recomendamos leerla detenidamente para entender nuestro enfoque respecto a tu información.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">2. Información que recopilamos</h2>
            <p>
              Recopilamos la siguiente información:
            </p>
            <h3 className="text-xl font-medium mb-2 mt-4">2.1 Información proporcionada por ti</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Información de registro: nombre, correo electrónico, contraseña, país de residencia.</li>
              <li>Información de perfil: foto, biografía, experiencia profesional, portafolio de trabajos.</li>
              <li>Datos de pago: información bancaria y financiera necesaria para procesar pagos (a través de procesadores de pago seguros).</li>
              <li>Comunicaciones: mensajes e interacciones con otros usuarios a través de nuestra plataforma.</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2 mt-4">2.2 Información recopilada automáticamente</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Datos de uso: páginas visitadas, tiempo en la plataforma, interacciones.</li>
              <li>Información del dispositivo: tipo de dispositivo, sistema operativo, navegador.</li>
              <li>Datos de ubicación: ubicación general basada en la dirección IP.</li>
              <li>Cookies y tecnologías similares: información almacenada en tu dispositivo para mejorar tu experiencia.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">3. Cómo utilizamos tu información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
              <li>Facilitar la conexión entre editores de video y clientes.</li>
              <li>Procesar transacciones y gestionar pagos.</li>
              <li>Personalizar tu experiencia en la plataforma.</li>
              <li>Enviar notificaciones, actualizaciones y comunicaciones relacionadas con el servicio.</li>
              <li>Proteger la seguridad e integridad de nuestra plataforma.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">4. Compartición de información</h2>
            <p>
              Podemos compartir tu información con:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Otros usuarios de la plataforma, según la naturaleza del servicio (editores con clientes potenciales).</li>
              <li>Proveedores de servicios que nos ayudan a operar la plataforma (procesadores de pago, servicios de almacenamiento en la nube).</li>
              <li>Autoridades legales cuando sea requerido por ley o para proteger nuestros derechos.</li>
            </ul>
            <p>
              No vendemos tu información personal a terceros.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">5. Seguridad de datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal, incluyendo:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encriptación de datos sensibles.</li>
              <li>Protocolos de acceso seguro.</li>
              <li>Revisiones regulares de seguridad.</li>
              <li>Limitación de acceso a información personal.</li>
            </ul>
            <p>
              Sin embargo, ningún sistema puede garantizar una seguridad absoluta, por lo que te recomendamos también tomar medidas para proteger tu información.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">6. Tus derechos</h2>
            <p>
              Dependiendo de tu ubicación, tienes ciertos derechos sobre tu información personal:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Acceder a los datos que tenemos sobre ti.</li>
              <li>Corregir información inexacta.</li>
              <li>Eliminar tus datos (sujeto a ciertas excepciones).</li>
              <li>Oponerte o limitar ciertos procesamientos de datos.</li>
              <li>Solicitar la portabilidad de tus datos.</li>
              <li>Retirar el consentimiento en cualquier momento.</li>
            </ul>
            <p>
              Para ejercer estos derechos, contacta a nuestro equipo de privacidad a través de privacy@latamvideos.com.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">7. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o por razones legales. La versión más reciente se publicará en nuestra plataforma con la fecha de actualización.
            </p>
            <p>
              Te animamos a revisar periódicamente esta política. El uso continuado de nuestros servicios después de cualquier cambio constituye tu aceptación de la política actualizada.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#041C32]">8. Contacto</h2>
            <p>
              Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de tus datos personales, contáctanos a:
            </p>
            <p className="mt-2">
              <strong>Correo electrónico:</strong> privacy@latamvideos.com<br />
              <strong>Dirección:</strong> Av. Insurgentes Sur 1602, Col. Crédito Constructor, Ciudad de México, CP 03940<br />
              <strong>Teléfono:</strong> +52 55 1234 5678
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;