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

// Datos de muestra
const featuredEditors: FeaturedEditor[] = [
  {
    id: 1,
    name: "Mauricio Treviño",
    profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "Ciudad de México",
    verified: true,
    rating: 4.9,
    specialties: ["Reels", "YouTube", "Documental"],
    software: ["Adobe Premiere", "After Effects"],
    baseRate: 200,
    currency: "USD"
  },
  {
    id: 2,
    name: "Valentina Quiroga",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "Bogotá",
    verified: true,
    rating: 4.8,
    specialties: ["Comerciales", "Moda", "Viajes"],
    software: ["DaVinci Resolve", "Photoshop"],
    baseRate: 300,
    currency: "USD"
  },
  {
    id: 3,
    name: "Alejandro Ramos",
    profilePicture: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "Buenos Aires",
    verified: true,
    rating: 4.7,
    specialties: ["Cine", "Videoclips", "Animación"],
    software: ["Final Cut Pro", "Motion"],
    baseRate: 250,
    currency: "USD"
  },
  {
    id: 4,
    name: "Carolina Silva",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "Santiago",
    verified: true,
    rating: 4.9,
    specialties: ["Corporativo", "E-learning", "Entrevistas"],
    software: ["Adobe Premiere", "Audition"],
    baseRate: 180,
    currency: "USD"
  },
  {
    id: 5,
    name: "Diego Mendoza",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "Lima",
    verified: false,
    rating: 4.6,
    specialties: ["Reels", "TikTok", "Social Media"],
    software: ["CapCut", "Adobe Premiere"],
    baseRate: 150,
    currency: "USD"
  },
];

const FeaturedEditors = () => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Algunos de los talentos en la plataforma</h2>
          
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
            <Link href="/search">Ver todos los talentos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEditors;