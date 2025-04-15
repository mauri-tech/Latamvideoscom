import { Helmet } from 'react-helmet';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones | LatamVideos</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-lg text-gray-700 mb-8">
              Última actualización: 15 de abril de 2025
            </p>
            
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar LatamVideos.com, usted acepta estos términos y condiciones en su totalidad. 
              Si no está de acuerdo con estos términos, no utilice este sitio web.
            </p>
            
            <h2>2. Cambios en los Términos</h2>
            <p>
              LatamVideos se reserva el derecho de cambiar estos términos en cualquier momento. 
              Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. 
              El uso continuado del sitio después de dichos cambios constituirá su aceptación de los mismos.
            </p>
            
            <h2>3. Cuentas de Usuario</h2>
            <p>
              Al registrarse en LatamVideos, usted acepta proporcionar información precisa y completa. 
              Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.
              LatamVideos no será responsable por ningún daño o pérdida que resulte de su falta de protección de esta información.
            </p>
            
            <h2>4. Perfiles Profesionales</h2>
            <p>
              Al crear un perfil profesional en LatamVideos, usted garantiza que toda la información proporcionada es verdadera y precisa. 
              Usted mantiene todos los derechos sobre el contenido que sube a su perfil, pero otorga a LatamVideos una licencia no exclusiva 
              para usar, mostrar y distribuir dicho contenido en relación con los servicios de la plataforma.
            </p>
            
            <h2>5. Conducta del Usuario</h2>
            <p>
              Al utilizar LatamVideos, usted acepta no:
            </p>
            <ul>
              <li>Publicar contenido difamatorio, ofensivo, o ilegal</li>
              <li>Suplantar a otra persona o entidad</li>
              <li>Publicar información falsa o engañosa</li>
              <li>Realizar actividades que puedan dañar, sobrecargar o comprometer la seguridad de la plataforma</li>
              <li>Utilizar la plataforma para actividades comerciales no autorizadas</li>
            </ul>
            
            <h2>6. Transacciones y Pagos</h2>
            <p>
              LatamVideos facilita la conexión entre profesionales y clientes, pero no participa directamente en las transacciones 
              entre los mismos. Los términos específicos de cualquier contrato o servicio deben ser acordados directamente entre las partes.
            </p>
            
            <h2>7. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de LatamVideos, incluyendo logotipos, diseño, texto, gráficos y código, 
              está protegido por derechos de autor y otras leyes de propiedad intelectual.
            </p>
            
            <h2>8. Limitación de Responsabilidad</h2>
            <p>
              LatamVideos proporciona la plataforma "tal cual" y no garantiza que el servicio será ininterrumpido o libre de errores. 
              En ningún caso LatamVideos será responsable por daños indirectos, incidentales, especiales o consecuentes 
              que resulten del uso o la imposibilidad de usar la plataforma.
            </p>
            
            <h2>9. Indemnización</h2>
            <p>
              Usted acepta indemnizar y mantener indemne a LatamVideos de cualquier reclamo, demanda, responsabilidad, 
              costo o gasto, incluyendo honorarios razonables de abogados, que surjan de su uso de la plataforma 
              o de cualquier violación de estos términos.
            </p>
            
            <h2>10. Ley Aplicable</h2>
            <p>
              Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde LatamVideos tenga su sede principal, 
              sin dar efecto a ningún principio de conflicto de leyes.
            </p>
            
            <h2>11. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos en legal@latamvideos.com.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;