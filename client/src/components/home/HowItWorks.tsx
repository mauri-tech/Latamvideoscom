import React from 'react';
import { Search, Filter, MessageSquare } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Así de fácil es formar parte</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Un proceso simple para conectar con oportunidades profesionales o encontrar el talento que necesitas.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Paso 1 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-lg font-bold">1</div>
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
                <Search className="w-8 h-8 text-[#007AFF]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Explora perfiles profesionales</h3>
              <p className="text-gray-600 mb-4 flex-grow">Navega por nuestra colección de editores y videógrafos destacados de toda Latinoamérica.</p>
              <div className="w-16 h-1 bg-[#007AFF] rounded-full mt-auto"></div>
            </div>
          </div>
          
          {/* Paso 2 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-lg font-bold">2</div>
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
                <Filter className="w-8 h-8 text-[#007AFF]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Filtra por estilos, software y precios</h3>
              <p className="text-gray-600 mb-4 flex-grow">Personaliza tu búsqueda según tus necesidades específicas y encuentra el profesional ideal.</p>
              <div className="w-16 h-1 bg-[#007AFF] rounded-full mt-auto"></div>
            </div>
          </div>
          
          {/* Paso 3 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-lg font-bold">3</div>
            <div className="flex flex-col items-center text-center h-full">
              <div className="bg-[#007AFF]/10 p-4 rounded-full mb-6">
                <MessageSquare className="w-8 h-8 text-[#007AFF]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Contacta directo al talento</h3>
              <p className="text-gray-600 mb-4 flex-grow">Comunícate directamente con los profesionales sin intermediarios ni comisiones.</p>
              <div className="w-16 h-1 bg-[#007AFF] rounded-full mt-auto"></div>
            </div>
          </div>
        </div>
        
        {/* Decoración de formas orgánicas */}
        <div className="relative max-w-6xl mx-auto mt-16">
          <div className="absolute -bottom-10 left-1/4 w-64 h-16 bg-gradient-to-r from-[#A0C4FF]/20 to-transparent rounded-full blur-xl -z-10 transform -rotate-12"></div>
          <div className="absolute -bottom-16 right-1/4 w-64 h-16 bg-gradient-to-r from-transparent to-[#007AFF]/10 rounded-full blur-xl -z-10 transform rotate-12"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;