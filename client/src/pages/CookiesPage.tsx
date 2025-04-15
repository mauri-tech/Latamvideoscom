import { Helmet } from 'react-helmet';

const CookiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Cookies | LatamVideos</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-lg text-gray-700 mb-8">
              Última actualización: 15 de abril de 2025
            </p>
            
            <p>
              Esta Política de Cookies explica cómo LatamVideos.com ("nosotros", "nuestro" o "la plataforma") 
              utiliza cookies y tecnologías similares para reconocerlo cuando visita nuestro sitio web. 
              Esta política explica qué son estas tecnologías y por qué las usamos, así como sus derechos 
              para controlar nuestro uso de ellas.
            </p>
            
            <h2>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de datos que se almacenan en su dispositivo cuando visita un sitio web. 
              Las cookies se utilizan ampliamente para que los sitios web funcionen de manera más eficiente, 
              así como para proporcionar información a los propietarios del sitio.
            </p>
            
            <h2>2. ¿Qué Tipos de Cookies Utilizamos?</h2>
            <p>Utilizamos los siguientes tipos de cookies:</p>
            
            <h3>Cookies estrictamente necesarias</h3>
            <p>
              Estas cookies son esenciales para permitirle utilizar las funciones básicas del sitio web, 
              como iniciar sesión en su cuenta y navegar por el sitio. Sin estas cookies, 
              los servicios que ha solicitado no se pueden proporcionar.
            </p>
            
            <h3>Cookies de análisis y rendimiento</h3>
            <p>
              Estas cookies nos permiten reconocer y contar el número de visitantes y ver cómo los visitantes 
              navegan por nuestro sitio web. Esto nos ayuda a mejorar el funcionamiento de nuestro sitio, 
              por ejemplo, asegurando que los usuarios encuentren fácilmente lo que buscan.
            </p>
            
            <h3>Cookies de funcionalidad</h3>
            <p>
              Estas cookies permiten al sitio web proporcionar funcionalidades y personalización mejoradas. 
              Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos añadido a nuestras páginas.
            </p>
            
            <h3>Cookies de publicidad y seguimiento</h3>
            <p>
              Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. 
              Pueden ser utilizadas por estas empresas para crear un perfil de sus intereses y mostrarle 
              anuncios relevantes en otros sitios.
            </p>
            
            <h2>3. ¿Cómo Utilizamos las Cookies?</h2>
            <p>Utilizamos cookies para:</p>
            <ul>
              <li>Entender cómo utiliza nuestro sitio para mejorar su experiencia</li>
              <li>Recordar sus preferencias y configuraciones</li>
              <li>Mantener activa su sesión mientras navega por el sitio</li>
              <li>Medir la efectividad de nuestras campañas de marketing</li>
              <li>Recopilar datos estadísticos anónimos sobre el uso del sitio</li>
            </ul>
            
            <h2>4. Control de Cookies</h2>
            <p>
              La mayoría de los navegadores le permiten controlar las cookies a través de sus preferencias. 
              Puede configurar su navegador para que rechace cookies, o para que le alerte cuando se está enviando una cookie. 
              Sin embargo, si bloquea o elimina cookies, es posible que algunas partes de nuestro sitio no funcionen correctamente.
            </p>
            
            <h3>Cómo modificar la configuración de cookies en los navegadores comunes:</h3>
            <ul>
              <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos del sitio</li>
              <li><strong>Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies y datos del sitio</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos del sitio web</li>
              <li><strong>Edge:</strong> Configuración → Permisos del sitio → Cookies y datos del sitio</li>
            </ul>
            
            <h2>5. Cookies de Terceros</h2>
            <p>
              Algunos de nuestros socios comerciales (por ejemplo, anunciantes) utilizan cookies en nuestro sitio. 
              No tenemos acceso ni control sobre estas cookies. Esta política de cookies se aplica únicamente 
              a LatamVideos.com y no cubre sitios web de terceros.
            </p>
            
            <h2>6. Cambios en esta Política de Cookies</h2>
            <p>
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en nuestras prácticas 
              o por otros motivos operativos, legales o regulatorios. Por favor, visite esta página periódicamente 
              para mantenerse informado sobre nuestro uso de cookies.
            </p>
            
            <h2>7. Contacto</h2>
            <p>
              Si tiene preguntas o comentarios sobre esta Política de Cookies, por favor contáctenos en cookies@latamvideos.com.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPage;