import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Briefcase, Clock, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';

// Tipo para el editor
interface Editor {
  id: number;
  name: string;
  profilePicture: string;
  location: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  specialties: string[];
  tags: string[];
  portfolioCount: number;
  price: {
    min: number;
    currency: string;
  };
  experience: number;
}

// Datos del editor de muestra
const editorProfile: Editor = {
  id: 1,
  name: "Mauricio Treviño B.",
  profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  location: "Ciudad de México",
  verified: true,
  rating: 4.9,
  reviewCount: 127,
  specialties: ["Editor de video", "Videógrafo"],
  tags: ["Reels", "YouTube", "Documental", "Bodas"],
  portfolioCount: 23,
  price: {
    min: 200,
    currency: "USD"
  },
  experience: 5
};

const EditorInteractiveProfile = () => {
  const [activeTab, setActiveTab] = useState<string>('portafolio');

  // Renderizar estrellas para el rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Así se ve tu perfil aquí</h2>
        
        {/* Área del perfil interactivo */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          {/* Cabecera del perfil */}
          <div className="flex flex-col md:flex-row">
            {/* Foto de perfil y detalles básicos */}
            <div className="md:w-1/3 flex flex-col items-center p-6 text-center border-r border-gray-200 bg-gradient-to-b from-[#F9F9F9] to-white">
              <img 
                src={editorProfile.profilePicture} 
                alt={editorProfile.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold flex items-center gap-1">
                {editorProfile.name}
                {editorProfile.verified && (
                  <span className="text-[#007AFF]" title="Perfil verificado">
                    <CheckCircle className="w-4 h-4 fill-[#007AFF]" />
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{editorProfile.location}</p>
              
              <div className="flex justify-center mb-4">
                {renderRating(editorProfile.rating)}
                <span className="text-gray-500 text-sm ml-1">({editorProfile.reviewCount})</span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {editorProfile.specialties.map((specialty, idx) => (
                  <Badge key={idx} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="bg-gray-50 rounded p-2 text-center">
                  <p className="text-sm font-bold text-[#007AFF]">{editorProfile.portfolioCount}</p>
                  <p className="text-xs text-gray-500">Proyectos</p>
                </div>
                <div className="bg-gray-50 rounded p-2 text-center">
                  <p className="text-sm font-bold text-[#007AFF]">${editorProfile.price.min}</p>
                  <p className="text-xs text-gray-500">Desde</p>
                </div>
                <div className="bg-gray-50 rounded p-2 text-center">
                  <p className="text-sm font-bold text-[#007AFF]">{editorProfile.experience}</p>
                  <p className="text-xs text-gray-500">Años exp.</p>
                </div>
              </div>
            </div>
            
            {/* Contenido de las pestañas */}
            <div className="md:w-2/3 flex flex-col">
              {/* Barra de pestañas */}
              <div className="flex border-b border-gray-200">
                <button 
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'portafolio' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('portafolio')}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Portafolio</span>
                  </div>
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'equipamiento' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('equipamiento')}
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span>Equipamiento</span>
                  </div>
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'tarifas' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('tarifas')}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Tarifas</span>
                  </div>
                </button>
              </div>
              
              {/* Contenido de la pestaña */}
              <div className="p-6">
                {activeTab === 'portafolio' && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Proyectos destacados</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-gray-400">Proyecto 1</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-gray-400">Proyecto 2</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-gray-400">Proyecto 3</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-gray-400">Proyecto 4</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'equipamiento' && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Equipo de trabajo</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#007AFF]"></div>
                        <span>MacBook Pro M1 Max</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#007AFF]"></div>
                        <span>Cámara Sony A7III</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#007AFF]"></div>
                        <span>Micrófono Rode PodMic</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#007AFF]"></div>
                        <span>Iluminación Aputure</span>
                      </li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'tarifas' && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Paquetes y tarifas</h4>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium">Paquete Básico</h5>
                        <p className="text-[#007AFF] font-bold">${editorProfile.price.min}</p>
                        <p className="text-sm text-gray-600">Edición básica de video, hasta 5 minutos de duración.</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium">Paquete Estándar</h5>
                        <p className="text-[#007AFF] font-bold">${editorProfile.price.min * 2}</p>
                        <p className="text-sm text-gray-600">Edición profesional con efectos básicos, hasta 10 minutos.</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium">Paquete Premium</h5>
                        <p className="text-[#007AFF] font-bold">${editorProfile.price.min * 3}</p>
                        <p className="text-sm text-gray-600">Edición avanzada con efectos, corrección de color y hasta 20 minutos.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="p-4 bg-gray-50 flex justify-end">
            <Button 
              className="bg-[#007AFF] hover:bg-[#007AFF]/80 text-white"
              asChild
            >
              <Link href={`/editor/${editorProfile.id}`}>Ver perfil completo</Link>
            </Button>
          </div>
        </div>
        
        {/* Texto informativo */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-600">
            Un perfil profesional interactivo que destaca tu experiencia, especialidades y equipamiento técnico, 
            permitiendo a los potenciales clientes ver exactamente lo que ofreces.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditorInteractiveProfile;