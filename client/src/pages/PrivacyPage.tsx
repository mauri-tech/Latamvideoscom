import { Helmet } from 'react-helmet';

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad | LatamVideos</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-lg text-gray-700 mb-8">
              Última actualización: 15 de abril de 2025
            </p>
            
            <p>
              Esta Política de Privacidad describe cómo LatamVideos.com ("nosotros", "nuestro" o "la plataforma") 
              recopila, utiliza, almacena y comparte su información cuando utiliza nuestro sitio web y servicios.
            </p>
            
            <h2>1. Información que Recopilamos</h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>
            
            <h3>Información personal que usted nos proporciona:</h3>
            <ul>
              <li>Información de registro: nombre, dirección de correo electrónico, contraseña</li>
              <li>Información de perfil: foto, biografía, experiencia profesional, habilidades, tarifas</li>
              <li>Contenido del portafolio: imágenes, videos, enlaces a trabajos</li>
              <li>Información de contacto: número de teléfono, país, ciudad</li>
              <li>Información de pago: si aplicable, para servicios premium</li>
            </ul>
            
            <h3>Información recopilada automáticamente:</h3>
            <ul>
              <li>Datos de uso: páginas visitadas, tiempo en el sitio, enlaces en los que hace clic</li>
              <li>Información del dispositivo: tipo de dispositivo, sistema operativo, navegador</li>
              <li>Datos de ubicación: país, ciudad (basado en dirección IP)</li>
            </ul>
            
            <h2>2. Cómo Utilizamos Su Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul>
              <li>Proporcionar, mantener y mejorar nuestros servicios</li>
              <li>Facilitar la creación y autenticación de su cuenta</li>
              <li>Mostrar su perfil profesional a potenciales clientes</li>
              <li>Facilitar la comunicación entre profesionales y clientes</li>
              <li>Enviar notificaciones, actualizaciones y comunicaciones de marketing</li>
              <li>Analizar tendencias y mejorar la experiencia del usuario</li>
              <li>Prevenir actividades fraudulentas y proteger la seguridad de los usuarios</li>
            </ul>
            
            <h2>3. Compartición de Información</h2>
            <p>Podemos compartir su información en las siguientes circunstancias:</p>
            <ul>
              <li>Con otros usuarios de la plataforma, según la funcionalidad del servicio</li>
              <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
              <li>Para cumplir con obligaciones legales o en respuesta a solicitudes legales</li>
              <li>Para proteger los derechos y la seguridad de LatamVideos y sus usuarios</li>
              <li>En conexión con una fusión, venta o adquisición de la empresa</li>
            </ul>
            
            <h2>4. Sus Derechos y Opciones</h2>
            <p>Usted tiene los siguientes derechos respecto a su información personal:</p>
            <ul>
              <li>Acceder y actualizar su información desde la configuración de su cuenta</li>
              <li>Solicitar una copia de sus datos personales</li>
              <li>Solicitar la eliminación de su cuenta y datos personales</li>
              <li>Objetar o restringir ciertos procesamientos de sus datos</li>
              <li>Optar por no recibir comunicaciones de marketing</li>
            </ul>
            
            <h2>5. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas diseñadas para proteger su información personal. 
              Sin embargo, ninguna transmisión por Internet o sistema de almacenamiento electrónico es 100% seguro.
            </p>
            
            <h2>6. Retención de Datos</h2>
            <p>
              Conservamos su información personal mientras mantenga una cuenta activa o según sea necesario para 
              proporcionar servicios. Podemos retener cierta información para cumplir con obligaciones legales, 
              resolver disputas y hacer cumplir nuestros acuerdos.
            </p>
            
            <h2>7. Uso Internacional de Datos</h2>
            <p>
              LatamVideos opera en América Latina, pero sus servidores pueden estar ubicados en diferentes países. 
              Su información puede ser transferida y procesada en países distintos a su país de residencia, 
              donde las leyes de protección de datos pueden ser diferentes.
            </p>
            
            <h2>8. Privacidad de Menores</h2>
            <p>
              Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos 
              intencionalmente información personal de menores. Si descubrimos que hemos recopilado 
              información personal de un menor, tomaremos medidas para eliminar esa información.
            </p>
            
            <h2>9. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Notificaremos cambios significativos 
              mediante un aviso en nuestro sitio web o por correo electrónico. Le recomendamos revisar 
              esta política regularmente.
            </p>
            
            <h2>10. Contacto</h2>
            <p>
              Si tiene preguntas o inquietudes sobre esta Política de Privacidad o nuestras prácticas de datos, 
              contáctenos en privacy@latamvideos.com.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;