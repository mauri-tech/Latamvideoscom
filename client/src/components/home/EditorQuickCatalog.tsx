import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Perfil básico para el catálogo rápido de editores
interface EditorQuickProfile {
  id: number;
  name: string;
  country: string;
  profilePicture: string;
  software: string[];
  styles: string[];
  basicRate: number;
}

// Lista inicial de editores para el catálogo rápido
const initialEditors: EditorQuickProfile[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    country: "México",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    software: ["Premiere Pro", "After Effects"],
    styles: ["YouTube", "Reels"],
    basicRate: 75
  },
  {
    id: 2,
    name: "Valeria Gómez",
    country: "Colombia",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    software: ["Final Cut Pro", "DaVinci Resolve"],
    styles: ["Comerciales", "Video corporativo"],
    basicRate: 120
  },
  {
    id: 3,
    name: "Matías Rodríguez",
    country: "Argentina",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    software: ["Premiere Pro", "CapCut"],
    styles: ["TikTok", "Instagram"],
    basicRate: 60
  },
  {
    id: 4,
    name: "Mauricio Treviño",
    country: "México",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    software: ["Premiere Pro", "Final Cut", "CapCut"],
    styles: ["Reels", "YouTube", "Podcast"],
    basicRate: 90
  },
  {
    id: 5,
    name: "Gabriela Méndez",
    country: "Chile",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    software: ["Adobe Premiere", "After Effects"],
    styles: ["Documentales", "Corporativo"],
    basicRate: 110
  },
  {
    id: 6,
    name: "Rodrigo Blanco",
    country: "Perú",
    profilePicture: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    software: ["DaVinci Resolve", "Premiere Pro"],
    styles: ["Cine", "Videoclips"],
    basicRate: 95
  }
];

const EditorQuickCatalog = () => {
  const [editors, setEditors] = useState<EditorQuickProfile[]>(initialEditors);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  
  // Función para añadir más editores cuando el usuario hace clic en "Ver más perfiles"
  const handleShowMore = () => {
    // Nuevos editores para añadir a la lista
    const additionalEditors: EditorQuickProfile[] = [
      {
        id: 7,
        name: "Ana Silva",
        country: "Brasil",
        profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
        software: ["Final Cut Pro", "Logic Pro"],
        styles: ["Musicales", "Videoclips"],
        basicRate: 85
      },
      {
        id: 8,
        name: "Jorge Ramírez",
        country: "Ecuador",
        profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
        software: ["Adobe Premiere", "Audition"],
        styles: ["Podcasts", "Redes sociales"],
        basicRate: 70
      },
      {
        id: 9,
        name: "Lucía Paredes",
        country: "Uruguay",
        profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
        software: ["DaVinci Resolve", "Fusion"],
        styles: ["Corporativo", "Animación"],
        basicRate: 110
      },
      {
        id: 10,
        name: "Daniel Ortega",
        country: "Costa Rica",
        profilePicture: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
        software: ["Adobe Premiere", "After Effects"],
        styles: ["Comerciales", "YouTube"],
        basicRate: 80
      },
      {
        id: 11,
        name: "Carolina Juárez",
        country: "Panamá",
        profilePicture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
        software: ["Final Cut Pro", "Motion"],
        styles: ["Eventos", "Social media"],
        basicRate: 65
      },
      {
        id: 12,
        name: "Alejandro Torres",
        country: "Puerto Rico",
        profilePicture: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
        software: ["Premiere Pro", "Lightroom"],
        styles: ["YouTube", "Instagram"],
        basicRate: 95
      }
    ];
    
    // Añadir a la lista existente
    setEditors([...editors, ...additionalEditors]);
    setShowMoreClicked(true);
  };
  
  // Horizontal scroll con snap effect
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative py-8">
      <h3 className="text-2xl font-bold mb-6">Catálogo de Editores</h3>
      
      {/* Controles de navegación */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <Button 
          size="icon" 
          className="bg-[#007AFF] text-white shadow-md rounded-full hover:bg-[#0069d9]" 
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <Button 
          size="icon" 
          className="bg-[#007AFF] text-white shadow-md rounded-full hover:bg-[#0069d9]" 
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Contenedor con scroll horizontal */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide mx-10"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {editors.map((editor) => (
          <div 
            key={editor.id}
            className="flex-shrink-0 w-[280px] snap-start mx-2 rounded-lg shadow-md overflow-hidden h-[420px]"
          >
            <div className="h-full flex flex-col">
              {/* Cabecera con gradiente glaciar */}
              <div className="h-1/3 p-4 relative flex items-center justify-center" 
                style={{
                  background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
                  overflow: "hidden"
                }}
              >
                {/* Efecto brillante superior */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white opacity-10 blur-xl transform -translate-y-1/2"></div>
                
                <div className="z-10 flex flex-col items-center">
                  <img 
                    src={editor.profilePicture} 
                    alt={`Foto de ${editor.name}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  <h4 className="font-semibold text-white mt-2 text-center">{editor.name}</h4>
                  <p className="text-sm text-white/90">{editor.country}</p>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="p-4 bg-white flex-grow flex flex-col">
                <div className="mb-4 flex-grow">
                  <div className="mb-3">
                    <p className="text-sm text-[#8E8E93] mb-1">Software:</p>
                    <div className="flex flex-wrap gap-1">
                      {editor.software.map((s, i) => (
                        <Badge key={i} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm text-[#8E8E93] mb-1">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {editor.styles.map((s, i) => (
                        <Badge key={i} className="bg-[#007AFF]/5 text-[#007AFF] border-0">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Tarifa y botón */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-sm text-[#8E8E93]">Desde</span>
                    <span className="text-lg font-bold text-[#007AFF] ml-1 block">${editor.basicRate} USD</span>
                  </div>
                  <Link href={`/editor/${editor.id}`}>
                    <Button 
                      size="sm" 
                      className="bg-[#007AFF] hover:bg-[#0069d9]"
                    >
                      Ver perfil
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Botón para ver más perfiles */}
      {!showMoreClicked && (
        <div className="text-center mt-8">
          <Button
            onClick={handleShowMore}
            className="mx-auto bg-[#007AFF] hover:bg-[#0069d9] px-6"
          >
            Ver más perfiles
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditorQuickCatalog;