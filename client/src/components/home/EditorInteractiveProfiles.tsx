import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Perfil interactivo según las nuevas especificaciones
interface EditorInteractiveProfile {
  id: number;
  name: string;
  profilePicture: string;
  country: string;
  specialties: string[];
  miniBio: string;
  yearsOfExperience: number;
  styles: string[];
  portafolio: {
    title: string;
    thumbnail: string;
  }[];
  equipamiento: {
    category: string;
    item: string;
  }[];
  tarifas: {
    basic: {
      price: number;
      description: string;
    };
    standard: {
      price: number;
      description: string;
    };
    premium: {
      price: number;
      description: string;
    };
  };
}

// Datos de ejemplo actualizados según las especificaciones
const sampleInteractiveProfile: EditorInteractiveProfile = {
  id: 1,
  name: "Mauricio Treviño Botticelli",
  profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
  country: "México",
  specialties: ["Editor de video", "Videógrafo"],
  miniBio: "Especialista en contenido visual para redes, campañas y documentales. 5 años de experiencia en edición, grabación y postproducción.",
  yearsOfExperience: 5,
  styles: ["🎬 Reels", "🎥 YouTube", "🎙️ Podcast", "📽️ Documental", "📸 Bodas"],
  portafolio: [
    {
      title: "Documental Urbano",
      thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
    },
    {
      title: "Campaña de Marca",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
    },
    {
      title: "Serie de Podcasts",
      thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
    }
  ],
  equipamiento: [
    { category: "Cámara", item: "Sony Alpha 7 IV" },
    { category: "Lentes", item: "Sigma 24-70mm f/2.8 y 70-200mm f/2.8" },
    { category: "Computadora", item: "Mac Mini Pro M4" },
    { category: "Iluminación", item: "Neewer CB200 RGB con Bowens" },
    { category: "Cámaras extra", item: "Insta360 X4, GoPro Hero 11 y 12" }
  ],
  tarifas: {
    basic: {
      price: 200,
      description: "Edición simple, hasta 3 minutos"
    },
    standard: {
      price: 350,
      description: "Hasta 10 minutos, con efectos"
    },
    premium: {
      price: 500,
      description: "Edición avanzada + color"
    }
  }
};

const EditorInteractiveProfiles = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  
  // Para simplificar, usamos un solo perfil de muestra, pero se podría expandir a múltiples
  const profiles = [sampleInteractiveProfile];
  const activeProfile = profiles[currentProfileIndex];
  
  // Referencia para el scroll horizontal de las tarjetas
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Gestión del scroll horizontal con física tipo iOS
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Multiplicador de velocidad
    if (scrollContainerRef.current) {
      // Aplicamos límites para evitar que el scroll se bloquee
      const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const newScrollLeft = scrollLeft - walk;
      scrollContainerRef.current.scrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));
    }
  };
  
  // Para móvil, manejar toques
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      // Aplicamos los mismos límites para dispositivos táctiles
      const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const newScrollLeft = scrollLeft - walk;
      scrollContainerRef.current.scrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-6">Perfiles Interactivos</h3>
      <p className="text-gray-600 mb-6">
        Explora un ejemplo de perfil interactivo. Desliza verticalmente para ver toda la información.
      </p>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {profiles.map((profile, index) => (
          <div 
            key={profile.id}
            className="bg-white rounded-xl shadow-md w-[350px] flex-shrink-0 mx-auto snap-center overflow-y-auto max-h-[650px] hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* 1. Encabezado con datos esenciales */}
            <div className="p-5 border-b">
              <div className="flex items-center mb-3">
                <img 
                  src={profile.profilePicture} 
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{profile.name}</h3>
                  <p className="text-gray-600 text-sm">{profile.country}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 2. Mini Bio */}
              <div className="mb-3">
                <p className="text-sm text-gray-700">{profile.miniBio}</p>
              </div>
              
              {/* 3. Estilos (como badges) */}
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.styles.map((style, idx) => (
                  <Badge key={idx} className="bg-primary/10 text-primary font-normal">
                    {style}
                  </Badge>
                ))}
              </div>
              
              {/* 4. Cuota base */}
              <div className="bg-primary/5 p-3 rounded-lg flex justify-between items-center mb-4">
                <span className="text-sm text-gray-700">Cuota inicial</span>
                <span className="text-xl font-bold text-primary">Desde ${profile.tarifas.basic.price} USD</span>
              </div>
            </div>
            
            {/* 5. Portafolio */}
            {profile.portafolio.length > 0 && (
              <div className="p-5 border-b">
                <h4 className="font-medium text-base mb-3">🎞️ Portafolio</h4>
                <div className="grid grid-cols-1 gap-4">
                  {profile.portafolio.map((item, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-[120px] object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-white text-black hover:bg-white/90">
                          Ver proyecto
                        </Button>
                      </div>
                      <p className="mt-1 text-sm font-medium">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 6. Tarifas */}
            <div className="p-5 border-b">
              <h4 className="font-medium text-base mb-3">💰 Tarifas</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-medium">Básico</h5>
                    <span className="text-primary font-bold">${profile.tarifas.basic.price} USD</span>
                  </div>
                  <p className="text-xs text-gray-500">{profile.tarifas.basic.description}</p>
                </div>
                
                <div className="border rounded-lg p-3 border-primary bg-primary/5">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-medium">Estándar</h5>
                    <span className="text-primary font-bold">${profile.tarifas.standard.price} USD</span>
                  </div>
                  <p className="text-xs text-gray-500">{profile.tarifas.standard.description}</p>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-medium">Premium</h5>
                    <span className="text-primary font-bold">${profile.tarifas.premium.price} USD</span>
                  </div>
                  <p className="text-xs text-gray-500">{profile.tarifas.premium.description}</p>
                </div>
              </div>
            </div>
            
            {/* 7. Equipamiento */}
            {profile.equipamiento.length > 0 && (
              <div className="p-5 border-b">
                <h4 className="font-medium text-base mb-3">⚙️ Equipamiento</h4>
                <div className="space-y-2">
                  {profile.equipamiento.map((equip, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm font-medium">{equip.category}: </span>
                      <span className="text-sm text-gray-700">{equip.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 8. CTA */}
            <div className="p-5">
              <Link href={`/editor/${profile.id}`}>
                <Button className="w-full bg-[#007aff] hover:bg-[#007aff]/90">Ver perfil completo</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;