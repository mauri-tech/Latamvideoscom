import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Interfaz para los editores destacados
interface FeaturedEditor {
  id: number;
  name: string;
  profilePicture: string;
  location: string;
  verified: boolean;
  rating: number;
  specialties: string[];
  software: string[];
  baseRate: number;
  currency: string;
}

// Datos de editores y videógrafos destacados
const featuredEditors: FeaturedEditor[] = [
  {
    id: 1,
    name: "Mauricio Treviño",
    profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇲🇽 México",
    verified: true,
    rating: 4.9,
    specialties: ["Cine", "YouTube", "Documental"],
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    baseRate: 350,
    currency: "USD"
  },
  {
    id: 2,
    name: "Camila Valenzuela",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇨🇴 Colombia",
    verified: true,
    rating: 4.8,
    specialties: ["Animación 3D", "Motion Graphics", "VFX"],
    software: ["After Effects", "Cinema 4D", "Blender"],
    baseRate: 400,
    currency: "USD"
  },
  {
    id: 3,
    name: "Diego Montero",
    profilePicture: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇦🇷 Argentina",
    verified: true,
    rating: 5.0,
    specialties: ["Comerciales", "Música", "Videoclips"],
    software: ["Final Cut Pro", "DaVinci Resolve", "Logic Pro"],
    baseRate: 380,
    currency: "USD"
  },

];

const FeaturedEditors = () => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = React.useState(true);
  const autoScrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Función para desplazamiento manual
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Iniciar autoscroll
  React.useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollEnabled && scrollContainer.current) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (scrollContainer.current) {
            // Verificar si estamos al final del scroll
            const isAtEnd = 
              scrollContainer.current.scrollLeft + scrollContainer.current.offsetWidth >= 
              scrollContainer.current.scrollWidth - 10;
              
            if (isAtEnd) {
              // Si estamos al final, volver al inicio
              scrollContainer.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              // Si no, continuar avanzando
              scrollContainer.current.scrollBy({ left: 320, behavior: 'smooth' });
            }
          }
        }, 5000); // Scroll cada 5 segundos
      }
    };
    
    startAutoScroll();
    
    // Limpiar intervalo cuando el componente se desmonte
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [autoScrollEnabled]);
  
  // Pausar autoscroll cuando el usuario interactúa con el carrusel
  const handleMouseEnter = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };
  
  // Reanudar autoscroll cuando el usuario deja de interactuar
  const handleMouseLeave = () => {
    if (!autoScrollIntervalRef.current && autoScrollEnabled) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainer.current) {
          const isAtEnd = 
            scrollContainer.current.scrollLeft + scrollContainer.current.offsetWidth >= 
            scrollContainer.current.scrollWidth - 10;
            
          if (isAtEnd) {
            scrollContainer.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollContainer.current.scrollBy({ left: 320, behavior: 'smooth' });
          }
        }
      }, 5000);
    }
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Algunos de los talentos de la plataforma</h2>
          
          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-[#E5E5EA] bg-white hover:border-[#007AFF]/30 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-[#007AFF]" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-[#E5E5EA] bg-white hover:border-[#007AFF]/30 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-[#007AFF]" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={scrollContainer}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {featuredEditors.map((editor) => (
              <div 
                key={editor.id}
                className="flex-shrink-0 w-full sm:w-[300px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden snap-start hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img 
                        src={editor.profilePicture} 
                        alt={editor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      />
                      {editor.verified && (
                        <span className="absolute bottom-0 right-0 text-[#007AFF] bg-white rounded-full p-0.5 shadow">
                          <CheckCircle className="w-3.5 h-3.5 fill-[#007AFF]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{editor.name}</h3>
                      <p className="text-gray-500 text-sm">{editor.location}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < Math.floor(editor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-600">({editor.rating})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-xs uppercase text-gray-500 mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {editor.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal bg-gray-50">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <h4 className="text-xs uppercase text-gray-500 mb-2">Software</h4>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {editor.software.map((sw, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-normal">
                          {sw}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <div>
                        <p className="text-gray-500 text-xs">Tarifa base</p>
                        <p className="text-[#007AFF] font-bold">
                          ${editor.baseRate} {editor.currency}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/5"
                        asChild
                      >
                        <Link href={`/editor/${editor.id}`}>Ver más</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-50 to-transparent w-12 h-full"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-50 to-transparent w-12 h-full"></div>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            className="bg-[#007AFF] hover:bg-[#007AFF]/80 text-white"
            size="lg"
            asChild
          >
            <Link href="/editors">Ver todos los talentos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEditors;