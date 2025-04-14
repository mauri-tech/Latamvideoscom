import { Link } from 'wouter';
import { Search, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const HiringProcess = () => {
  const [priceValue, setPriceValue] = useState(150);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(parseInt(e.target.value));
  };

  return (
    <section id="para-marcas" className="py-16 md:py-24 bg-[#F2F2F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Encuentra al editor ideal para tu proyecto
          </h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
            Accede a talento especializado filtrado según tus necesidades específicas.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-[#007AFF] bg-opacity-10 rounded-full p-3 mr-4 flex-shrink-0">
                <Search className="h-6 w-6 text-[#007AFF]" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Busca con filtros precisos</h3>
                <p className="text-[#8E8E93] text-sm">
                  Filtra por país, tipo de contenido, software, presupuesto y más.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] bg-opacity-10 rounded-full p-3 mr-4 flex-shrink-0">
                <Eye className="h-6 w-6 text-[#007AFF]" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Revisa portafolios</h3>
                <p className="text-[#8E8E93] text-sm">
                  Visualiza trabajos previos, estilos y capacidades técnicas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] bg-opacity-10 rounded-full p-3 mr-4 flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-[#007AFF]" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contacta directamente</h3>
                <p className="text-[#8E8E93] text-sm">
                  Envía un brief o cotización sin intermediarios ni comisiones.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-2xl font-semibold mb-6">Buscador avanzado</h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                    Tipo de proyecto
                  </label>
                  <select 
                    id="projectType" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    defaultValue=""
                  >
                    <option value="">Todos los tipos</option>
                    <option value="reel">Reel/Contenido corto</option>
                    <option value="youtube">Video para YouTube</option>
                    <option value="comercial">Comercial/Anuncio</option>
                    <option value="evento">Video de evento</option>
                    <option value="corporativo">Video corporativo</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                    País
                  </label>
                  <select 
                    id="country" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    defaultValue=""
                  >
                    <option value="">Todos los países</option>
                    <option value="MX">México</option>
                    <option value="CO">Colombia</option>
                    <option value="AR">Argentina</option>
                    <option value="CL">Chile</option>
                    <option value="PE">Perú</option>
                    <option value="UY">Uruguay</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="software" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                    Software
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span>Premiere Pro</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span>Final Cut Pro</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span>DaVinci Resolve</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span>After Effects</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span>CapCut</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]" />
                      <span>iMovie</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                    Presupuesto máximo (USD)
                  </label>
                  <input 
                    type="range" 
                    id="price" 
                    min="30" 
                    max="300" 
                    step="10" 
                    value={priceValue}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-[#8E8E93] mt-1">
                    <span>$30</span>
                    <span id="priceValue">${priceValue}</span>
                    <span>$300+</span>
                  </div>
                </div>
                
                <Link href="/search">
                  <Button className="w-full bg-[#007AFF] text-white px-4 py-2 rounded-md hover:bg-[#0060CF] transition font-medium">
                    Buscar editores
                  </Button>
                </Link>
              </form>
            </div>
            
            <div className="bg-[#2A9D8F] text-white p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6">¿Necesitas ayuda con tu búsqueda?</h3>
              <p className="mb-6">
                Si prefieres que nosotros te ayudemos a encontrar al editor perfecto para tu proyecto, cuéntanos qué necesitas y te conectaremos con los mejores talentos.
              </p>
              <Link href="/contact" className="inline-block">
                <Button 
                  variant="secondary" 
                  className="px-6 py-3 bg-white text-[#2A9D8F] font-medium rounded-md hover:bg-gray-100 transition w-fit"
                >
                  Solicitar recomendación
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringProcess;
