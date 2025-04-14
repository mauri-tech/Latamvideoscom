import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Briefcase, Clock, Monitor, MessageSquare } from 'lucide-react';

// Tipo para el editor de demostración
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

// Tipo para reseñas
interface Review {
  id: number;
  author: string;
  company: string;
  rating: number;
  date: string;
  comment: string;
}

// Datos del perfil de demostración interactivo (solo Mauricio Treviño)
const editorProfile: Editor = {
  id: 1,
  name: "Mauricio Treviño B.",
  profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  location: "🇲🇽 Ciudad de México",
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

// Reseñas para el perfil interactivo
const editorReviews: Review[] = [
  {
    id: 1,
    author: "Carlos Mendoza",
    company: "NexTech Media",
    rating: 5,
    date: "12 de marzo, 2025",
    comment: "Excelente trabajo en la edición de nuestro video corporativo. Mauricio entendió perfectamente nuestra visión y entregó un resultado excepcional. Definitivamente volveremos a trabajar juntos."
  },
  {
    id: 2,
    author: "Ana Gutiérrez",
    company: "Freelance",
    rating: 5,
    date: "27 de febrero, 2025",
    comment: "Mauricio tiene un gran ojo para el detalle y la narrativa visual. La edición de mi documental quedó impecable y captó exactamente la emoción que buscaba transmitir."
  },
  {
    id: 3,
    author: "Miguel Torres",
    company: "StartupLATAM",
    rating: 4,
    date: "5 de febrero, 2025",
    comment: "Muy profesional y entregó antes del plazo acordado. La comunicación fue fluida y las revisiones se realizaron sin problemas. Recomendado para cualquier proyecto."
  }
];

const EditorInteractiveProfiles = () => {
  const [selectedEditor, setSelectedEditor] = useState<Editor>(recommendedEditors[0]);
  const [activeTab, setActiveTab] = useState<string>('portafolio');
  const [searchType, setSearchType] = useState<'editor' | 'videografo' | 'fotografo'>('editor');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

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
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Encuentra a tu profesional ideal</h2>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex items-center border border-gray-300 rounded-full p-1 bg-white mr-4">
              <button 
                onClick={() => setSearchType('editor')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${searchType === 'editor' ? 'bg-[#0050FF] text-white' : 'hover:bg-gray-100'}`}
              >
                Editor
              </button>
              <button 
                onClick={() => setSearchType('videografo')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${searchType === 'videografo' ? 'bg-[#0050FF] text-white' : 'hover:bg-gray-100'}`}
              >
                Videógrafo
              </button>
              <button 
                onClick={() => setSearchType('fotografo')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${searchType === 'fotografo' ? 'bg-[#0050FF] text-white' : 'hover:bg-gray-100'}`}
              >
                Fotógrafo
              </button>
            </div>
          
            <button 
              onClick={() => {
                const currentIndex = recommendedEditors.findIndex(e => e.id === selectedEditor.id);
                const prevIndex = currentIndex === 0 ? recommendedEditors.length - 1 : currentIndex - 1;
                setSelectedEditor(recommendedEditors[prevIndex]);
              }}
              className="p-3 rounded-full border border-[#E5E5EA] bg-white hover:border-[#0050FF]/30 transition-colors shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-[#0050FF]" />
            </button>
            <button 
              onClick={() => {
                const currentIndex = recommendedEditors.findIndex(e => e.id === selectedEditor.id);
                const nextIndex = (currentIndex + 1) % recommendedEditors.length;
                setSelectedEditor(recommendedEditors[nextIndex]);
              }}
              className="p-3 rounded-full border border-[#E5E5EA] bg-white hover:border-[#0050FF]/30 transition-colors shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-[#0050FF]" />
            </button>
          </div>
        </div>
        
        {/* Área del perfil interactivo */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-200">
          {/* Cabecera del perfil */}
          <div className="flex flex-col md:flex-row">
            {/* Foto de perfil y detalles básicos */}
            <div className="md:w-1/3 flex flex-col items-center p-6 text-center border-r border-gray-200">
              <img 
                src={selectedEditor.profilePicture} 
                alt={selectedEditor.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold flex items-center gap-1">
                {selectedEditor.name}
                {selectedEditor.verified && (
                  <span className="text-[#007AFF]" title="Perfil verificado">
                    <CheckCircle className="w-4 h-4 fill-[#007AFF]" />
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{selectedEditor.location}</p>
              
              <div className="flex justify-center mb-4">
                {renderRating(selectedEditor.rating)}
                <span className="text-gray-500 text-sm ml-1">({selectedEditor.reviewCount})</span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {selectedEditor.specialties.map((specialty, idx) => (
                  <Badge key={idx} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="bg-gray-50 rounded p-2 text-center">
                  <p className="text-sm font-bold text-[#0050FF]">{selectedEditor.portfolioCount}</p>
                  <p className="text-xs text-gray-500">Proyectos</p>
                </div>
                <div className="bg-gray-50 rounded p-2 text-center">
                  <p className="text-sm font-bold text-[#0050FF]">${selectedEditor.price.min}</p>
                  <p className="text-xs text-gray-500">Desde</p>
                </div>
                <div className="bg-gray-50 rounded p-2 text-center">
                  <p className="text-sm font-bold text-[#0050FF]">{selectedEditor.experience}</p>
                  <p className="text-xs text-gray-500">Años exp.</p>
                </div>
              </div>
            </div>
            
            {/* Contenido de las pestañas */}
            <div className="md:w-2/3 flex flex-col">
              {/* Barra de pestañas */}
              <div className="flex border-b border-gray-200">
                <button 
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'portafolio' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('portafolio')}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Portafolio</span>
                  </div>
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'equipamiento' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('equipamiento')}
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span>Equipamiento</span>
                  </div>
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'tarifas' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
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
                        <div className="h-2 w-2 rounded-full bg-[#0050FF]"></div>
                        <span>MacBook Pro M1 Max</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0050FF]"></div>
                        <span>Cámara Sony A7III</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0050FF]"></div>
                        <span>Micrófono Rode PodMic</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0050FF]"></div>
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
                        <p className="text-[#0050FF] font-bold">${selectedEditor.price.min}</p>
                        <p className="text-sm text-gray-600">Edición básica de video, hasta 5 minutos de duración.</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium">Paquete Estándar</h5>
                        <p className="text-[#0050FF] font-bold">${selectedEditor.price.min * 2}</p>
                        <p className="text-sm text-gray-600">Edición profesional con efectos básicos, hasta 10 minutos.</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium">Paquete Premium</h5>
                        <p className="text-[#0050FF] font-bold">${selectedEditor.price.min * 3}</p>
                        <p className="text-sm text-gray-600">Edición avanzada con efectos, corrección de color y hasta 20 minutos.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Barra de filtros avanzados */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm font-medium mb-1">País</p>
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Todos los países</option>
                  <option value="mexico">🇲🇽 México</option>
                  <option value="argentina">🇦🇷 Argentina</option>
                  <option value="colombia">🇨🇴 Colombia</option>
                  <option value="chile">🇨🇱 Chile</option>
                  <option value="peru">🇵🇪 Perú</option>
                </select>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Especialidad</p>
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Todas</option>
                  <option value="comercial">Comerciales</option>
                  <option value="documental">Documentales</option>
                  <option value="youtube">YouTube</option>
                  <option value="eventos">Bodas y Eventos</option>
                  <option value="motion">Motion Graphics</option>
                </select>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Precio</p>
                <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Cualquier precio</option>
                  <option value="0-200">$0 - $200</option>
                  <option value="200-500">$200 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000+">$1000+</option>
                </select>
              </div>
              
              <div className="flex-grow"></div>
              
              <Button 
                className="bg-[#0050FF] hover:bg-[#0069d9] text-white"
                asChild
              >
                <Link href={`/editor/${selectedEditor.id}`}>Ver perfil completo</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Selector de perfiles */}
        <div className="flex justify-center mb-10 gap-3">
          {recommendedEditors.map((editor) => (
            <button
              key={editor.id}
              className={`relative overflow-hidden rounded-full transition-all ${selectedEditor.id === editor.id ? 'ring-2 ring-[#0050FF] ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
              onClick={() => setSelectedEditor(editor)}
            >
              <img 
                src={editor.profilePicture} 
                alt={editor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {editor.verified && (
                <span className="absolute bottom-0 right-0 text-[#007AFF] bg-white rounded-full p-0.5 shadow">
                  <CheckCircle className="w-3 h-3 fill-[#007AFF]" />
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Botón para explorar todos */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-[#0050FF] text-[#0050FF] hover:bg-[#0050FF]/5"
            asChild
          >
            <Link href="/search">Explorar todos los editores</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;