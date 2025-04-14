import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Términos y Condiciones | latamvideos.com</title>
      </Helmet>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-blue">
          <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-[#041C32] to-[#0050FF] bg-clip-text text-transparent">
            Términos y Condiciones
          </h1>
          <p className="text-muted-foreground mb-8">
            Última actualización: 15 de abril de 2023
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">1. Introducción</h2>
            <p>
              Bienvenido a latamvideos.com, una plataforma diseñada para conectar profesionales de la edición de video con clientes en toda Latinoamérica. Estos Términos y Condiciones regulan el uso de nuestra plataforma y todos los servicios asociados.
            </p>
            <p>
              Al acceder o utilizar latamvideos.com, usted acepta estar legalmente vinculado por estos términos. Si no está de acuerdo con alguno de estos términos, no podrá acceder ni utilizar nuestros servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">2. Definiciones</h2>
            <ul>
              <li><strong>"Plataforma"</strong> se refiere al sitio web latamvideos.com y todos sus servicios asociados.</li>
              <li><strong>"Usuario"</strong> se refiere a cualquier persona que accede o utiliza la Plataforma.</li>
              <li><strong>"Editor"</strong> se refiere a los profesionales de la edición de video que ofrecen sus servicios en la Plataforma.</li>
              <li><strong>"Cliente"</strong> se refiere a las personas o entidades que buscan contratar servicios de edición de video.</li>
              <li><strong>"Contenido"</strong> se refiere a cualquier información, texto, gráficos, fotos, vídeos u otros materiales cargados o mostrados en la Plataforma.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">3. Registro y Cuentas</h2>
            <p>
              Para utilizar ciertas funciones de nuestra Plataforma, deberá registrarse y crear una cuenta. Al hacerlo, usted se compromete a:
            </p>
            <ul>
              <li>Proporcionar información precisa, actualizada y completa.</li>
              <li>Mantener la confidencialidad de su contraseña y limitar el acceso a su cuenta.</li>
              <li>Aceptar la responsabilidad por todas las actividades que ocurran bajo su cuenta.</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</li>
            </ul>
            <p>
              Nos reservamos el derecho de suspender o terminar su cuenta si determinamos, a nuestra sola discreción, que ha violado estos términos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">4. Servicios y Transacciones</h2>
            <p>
              La Plataforma facilita la conexión entre Editores y Clientes, pero no es parte de ningún acuerdo contractual entre ellos. Los usuarios son responsables de:
            </p>
            <ul>
              <li>Negociar y acordar los términos específicos de sus servicios, incluyendo precios, plazos y entregables.</li>
              <li>Cumplir con las obligaciones acordadas con otros usuarios.</li>
              <li>Resolver cualquier disputa que pueda surgir en relación con los servicios contratados.</li>
            </ul>
            <p>
              latamvideos.com no garantiza la calidad, seguridad o legalidad de los servicios ofrecidos, ni la veracidad o exactitud de los perfiles de usuario.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">5. Propiedad Intelectual</h2>
            <p>
              Al cargar Contenido en la Plataforma, usted mantiene todos sus derechos de propiedad intelectual, pero otorga a latamvideos.com una licencia no exclusiva, mundial, libre de regalías para usar, reproducir, adaptar, publicar, traducir y distribuir dicho Contenido para los fines de operar y promover la Plataforma.
            </p>
            <p>
              Usted declara y garantiza que:
            </p>
            <ul>
              <li>Es el creador y propietario del Contenido que publica o tiene todos los derechos, licencias y permisos necesarios para conceder los derechos otorgados a latamvideos.com.</li>
              <li>Su Contenido no infringe ni viola los derechos de propiedad intelectual o de otro tipo de terceros.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">6. Contenido Prohibido</h2>
            <p>
              Usted acuerda no publicar ni compartir a través de la Plataforma ningún Contenido que:
            </p>
            <ul>
              <li>Sea ilegal, difamatorio, obsceno, pornográfico, abusivo, acosador, amenazante, discriminatorio o de alguna manera objetable.</li>
              <li>Infrinja derechos de propiedad intelectual o de otro tipo de terceros.</li>
              <li>Contenga virus, malware, o cualquier otro código dañino o destructivo.</li>
              <li>Interfiera con el funcionamiento de la Plataforma o imponga una carga irrazonable en nuestra infraestructura.</li>
            </ul>
            <p>
              Nos reservamos el derecho de eliminar cualquier Contenido que, a nuestra sola discreción, viole estos términos, sin previo aviso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">7. Limitación de Responsabilidad</h2>
            <p>
              En la medida máxima permitida por la ley, latamvideos.com no será responsable por ningún daño indirecto, incidental, especial, consecuente o punitivo, resultante de:
            </p>
            <ul>
              <li>El uso o la imposibilidad de uso de nuestra Plataforma.</li>
              <li>Cualquier transacción o acuerdo entre Usuarios.</li>
              <li>Acceso no autorizado, alteración o transmisión de datos.</li>
              <li>Declaraciones o conductas de terceros en la Plataforma.</li>
            </ul>
            <p>
              Nuestra responsabilidad total hacia usted por cualquier reclamación relacionada con estos Términos estará limitada a la cantidad que usted nos haya pagado durante los 12 meses anteriores a dicha reclamación, o $100 USD, lo que sea mayor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">8. Indemnización</h2>
            <p>
              Usted acuerda indemnizar, defender y mantener indemne a latamvideos.com, sus afiliados, directores, empleados y agentes, de y contra cualquier reclamación, responsabilidad, daño, pérdida, y gasto, incluyendo, sin limitación, costos legales y de abogados razonables, que surjan de o estén de alguna manera relacionados con:
            </p>
            <ul>
              <li>Su acceso o uso de la Plataforma.</li>
              <li>Su Contenido.</li>
              <li>Su violación de estos Términos.</li>
              <li>Su violación de cualquier derecho de terceros, incluyendo derechos de privacidad o propiedad intelectual.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">9. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Plataforma. Es su responsabilidad revisar periódicamente estos Términos. El uso continuado de la Plataforma después de tales modificaciones constituirá su consentimiento a los nuevos términos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">10. Legislación Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República de México, sin dar efecto a ningún principio de conflictos de ley. Cualquier disputa que surja en relación con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de Ciudad de México.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#041C32]">11. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos Términos, por favor contáctenos a: <a href="mailto:legal@latamvideos.com" className="text-primary hover:underline">legal@latamvideos.com</a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;