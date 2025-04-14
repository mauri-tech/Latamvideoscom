import React from 'react';
import { Shield, DollarSign, MessageSquare, Briefcase, BadgeCheck } from 'lucide-react';

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué confiar en latamvideos.com?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una plataforma diseñada para facilitar la conexión entre profesionales audiovisuales y clientes, con un enfoque en la transparencia y calidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Beneficio 1 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
              <BadgeCheck className="w-8 h-8 text-[#007AFF]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Perfiles verificados</h3>
            <p className="text-gray-600">
              Todos los profesionales pasan por un proceso de verificación para garantizar la autenticidad de su perfil y experiencia.
            </p>
          </div>
          
          {/* Beneficio 2 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
              <DollarSign className="w-8 h-8 text-[#007AFF]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Tarifas claras</h3>
            <p className="text-gray-600">
              Precios transparentes y sin sorpresas. Cada editor establece sus tarifas y paquetes de servicios con total claridad.
            </p>
          </div>
          
          {/* Beneficio 3 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
              <MessageSquare className="w-8 h-8 text-[#007AFF]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Contacto directo</h3>
            <p className="text-gray-600">
              Comunícate directamente con los profesionales sin intermediarios, agilizando el proceso y personalizando tu proyecto.
            </p>
          </div>
          
          {/* Beneficio 4 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
              <Briefcase className="w-8 h-8 text-[#007AFF]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Portafolios profesionales</h3>
            <p className="text-gray-600">
              Visualiza el trabajo previo de cada profesional para evaluar su estilo y calidad antes de contactarlo.
            </p>
          </div>
          
          {/* Beneficio 5 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
              <Shield className="w-8 h-8 text-[#007AFF]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Sin comisiones ocultas</h3>
            <p className="text-gray-600">
              No cobramos comisiones por proyecto. Los acuerdos se realizan directamente entre el profesional y el cliente.
            </p>
          </div>
        </div>
        
        {/* Decoración */}
        <div className="relative max-w-6xl mx-auto mt-16">
          <div className="absolute bottom-0 left-1/4 w-64 h-16 bg-gradient-to-r from-[#007AFF]/5 to-transparent rounded-full blur-xl -z-10 transform -rotate-3"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-16 bg-gradient-to-r from-transparent to-[#A0C4FF]/10 rounded-full blur-xl -z-10 transform rotate-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;