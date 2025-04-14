import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';

// Tipo para los editores recomendados
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

// Datos de editores recomendados
const recommendedEditors: Editor[] = [
  {
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
  },
  {
    id: 2,
    name: "Valentina Quiroga",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Bogotá",
    verified: true,
    rating: 4.8,
    reviewCount: 94,
    specialties: ["Motion graphics", "Colorista"],
    tags: ["Comerciales", "Moda", "Lujo", "Viajes"],
    portfolioCount: 42,
    price: {
      min: 300,
      currency: "USD"
    },
    experience: 7
  },
  {
    id: 3,
    name: "Gabriel Fernández",
    profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Buenos Aires",
    verified: true,
    rating: 4.9,
    reviewCount: 73,
    specialties: ["Editor de cine", "Montajista"],
    tags: ["Largometrajes", "Series", "Documental"],
    portfolioCount: 18,
    price: {
      min: 450,
      currency: "USD"
    },
    experience: 12
  },
  {
    id: 4,
    name: "Sofía Ramírez",
    profilePicture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Santiago",
    verified: true,
    rating: 4.7,
    reviewCount: 85,
    specialties: ["VFX", "3D Animation"],
    tags: ["Películas", "Videojuegos", "Publicidad"],
    portfolioCount: 31,
    price: {
      min: 350,
      currency: "USD"
    },
    experience: 8
  },
  {
    id: 5,
    name: "Carlos Mendoza",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Lima",
    verified: false,
    rating: 4.5,
    reviewCount: 42,
    specialties: ["Editor deportivo", "Videógrafo"],
    tags: ["Deportes extremos", "Eventos", "Documentales"],
    portfolioCount: 15,
    price: {
      min: 180,
      currency: "USD"
    },
    experience: 4
  }
];

const EditorInteractiveProfiles = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  
  // Determinar el número de items a mostrar en base al tamaño de la pantalla
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setItemsToShow(3);
      } else if (width > 640) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };
    
    // Ejecutar al montar y en cada cambio de tamaño
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Limpiar event listener al desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Navegar por el carrusel
  const next = () => {
    setStartIndex(prev => 
      prev + itemsToShow >= recommendedEditors.length ? 0 : prev + 1
    );
  };
  
  const prev = () => {
    setStartIndex(prev => 
      prev === 0 ? Math.max(0, recommendedEditors.length - itemsToShow) : prev - 1
    );
  };
  
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Editores Recomendados</h2>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={prev}
              className="p-2 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={next}
              className="p-2 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Carrusel de editores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEditors.slice(startIndex, startIndex + itemsToShow).map((editor) => (
            <div key={editor.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              {/* Cabecera */}
              <div className="relative">
                <div className="bg-gradient-to-r from-[#0093E9] to-[#80D0C7] h-24"></div>
                <div className="absolute top-12 left-0 w-full flex flex-col items-center">
                  <img 
                    src={editor.profilePicture} 
                    alt={editor.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
              </div>
              
              {/* Información del editor */}
              <div className="pt-16 px-4 pb-4">
                <div className="text-center mb-2">
                  <div className="flex items-center justify-center">
                    <h3 className="font-bold text-lg">{editor.name}</h3>
                    {editor.verified && (
                      <div className="ml-1 text-[#007AFF]" title="Perfil verificado">
                        <CheckCircle className="w-4 h-4 fill-[#007AFF]" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{editor.location}</p>
                </div>
                
                <div className="flex justify-center mb-4">
                  {renderRating(editor.rating)}
                  <span className="text-gray-500 text-sm ml-1">({editor.reviewCount})</span>
                </div>
                
                {/* Especialidades */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {editor.specialties.map((specialty, idx) => (
                      <Badge key={idx} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {editor.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Información destacada */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-[#F5F5F7] p-2 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">{editor.portfolioCount}</p>
                    <p className="text-xs text-gray-500">Proyectos</p>
                  </div>
                  <div className="bg-[#F5F5F7] p-2 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">
                      <span className="text-[#007AFF]">${editor.price.min}</span>
                    </p>
                    <p className="text-xs text-gray-500">Desde</p>
                  </div>
                  <div className="bg-[#F5F5F7] p-2 rounded-lg">
                    <div className="flex items-center justify-center">
                      <Clock className="w-3 h-3 text-gray-600 mr-1" />
                      <p className="text-sm font-medium text-gray-800">{editor.experience}</p>
                    </div>
                    <p className="text-xs text-gray-500">Años exp.</p>
                  </div>
                </div>
                
                {/* CTA */}
                <Button 
                  className="w-full bg-[#007AFF] hover:bg-[#0069d9]"
                  onClick={() => window.location.href = `/editor/${editor.id}`}
                >
                  Ver perfil
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón para explorar todos */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/5"
            onClick={() => window.location.href = '/search'}
          >
            Explorar todos los editores
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;