import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Briefcase, Package, Monitor, DollarSign } from 'lucide-react';

// Perfil interactivo con categorías para el deslizamiento horizontal
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

// Tipos de categorías para el deslizamiento horizontal
type CategoryType = 'info' | 'portfolio' | 'equipamiento' | 'tarifas';

// Definición de categorías disponibles
const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
  { id: 'info', label: 'Información', icon: <Monitor className="w-5 h-5" /> },
  { id: 'portfolio', label: 'Portafolio', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'equipamiento', label: 'Equipamiento', icon: <Package className="w-5 h-5" /> },
  { id: 'tarifas', label: 'Tarifas', icon: <DollarSign className="w-5 h-5" /> }
];

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
  // Estado para la categoría activa
  const [activeCategory, setActiveCategory] = useState<CategoryType>('info');
  
  // Perfiles (por ahora solo uno)
  const profiles = [sampleInteractiveProfile];
  const profile = profiles[0];
  
  // Referencia para el contenedor de tarjetas
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  // Función para cambiar a una categoría específica con animación suave
  const scrollToCategory = (categoryId: CategoryType) => {
    setActiveCategory(categoryId);
    
    // Encuentra la posición de desplazamiento para la categoría seleccionada
    if (cardsContainerRef.current) {
      const categoryIndex = categories.findIndex(c => c.id === categoryId);
      const cardWidth = cardsContainerRef.current.offsetWidth;
      const scrollPosition = categoryIndex * cardWidth;
      
      // Desplazamiento suave
      cardsContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Efecto para manejar el desplazamiento y actualizar la categoría activa
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      if (!container) return;
      
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const categoryIndex = Math.round(scrollPosition / cardWidth);
      
      const newCategory = categories[categoryIndex]?.id;
      if (newCategory && newCategory !== activeCategory) {
        setActiveCategory(newCategory);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);
  
  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold mb-4 text-center">Perfiles Interactivos</h3>
      <p className="text-[#8E8E93] mb-8 text-center max-w-2xl mx-auto">
        Explora un ejemplo de perfil interactivo. Desliza horizontalmente para ver diferentes secciones.
      </p>
      
      {/* Tarjeta principal con cabecera fija y contenido deslizable */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Cabecera fija */}
        <div className="px-5 py-5 text-center relative">
          {/* Fondo con gradiente */}
          <div 
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, #0075FF 0%, #00D1FF 100%)",
              opacity: 0.05
            }}
          />
          
          <img 
            src={profile.profilePicture} 
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-[#007AFF] shadow-lg"
          />
          <h3 className="font-bold text-xl">{profile.name}</h3>
          <p className="text-[#8E8E93] text-sm">{profile.country}</p>
        </div>
        
        {/* Navegación por categorías */}
        <div className="border-t border-b border-[#E5E5EA]">
          <div className="flex overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 min-w-[80px] transition-colors ${
                  activeCategory === category.id 
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF]' 
                    : 'text-[#8E8E93] hover:text-[#007AFF]/80'
                }`}
              >
                <div className="mb-1">{category.icon}</div>
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Contenedor para deslizar horizontalmente entre categorías */}
        <div 
          ref={cardsContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          {/* Tarjeta 1: Información */}
          <div className="min-w-full flex-shrink-0 snap-start p-5">
            {/* Mini Bio */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[#8E8E93] mb-2">Bio</h4>
              <p className="text-sm">{profile.miniBio}</p>
            </div>
            
            {/* Especialidades */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[#8E8E93] mb-2">Especialidades</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.specialties.map((specialty, idx) => (
                  <Badge key={idx} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Estilos */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[#8E8E93] mb-2">Estilos</h4>
              <div className="flex flex-wrap gap-2">
                {profile.styles.map((style, idx) => (
                  <Badge key={idx} className="bg-[#007AFF]/5 text-[#007AFF] border-0">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tarjeta 2: Portafolio */}
          <div className="min-w-full flex-shrink-0 snap-start p-5">
            <h4 className="text-sm font-medium text-[#8E8E93] mb-3">Proyectos destacados</h4>
            <div className="grid grid-cols-1 gap-4">
              {profile.portafolio.map((item, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-[160px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-[#007AFF] hover:bg-[#0069d9]">
                      Ver proyecto
                    </Button>
                  </div>
                  <div className="p-3">
                    <h5 className="font-medium">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tarjeta 3: Equipamiento */}
          <div className="min-w-full flex-shrink-0 snap-start p-5">
            <h4 className="text-sm font-medium text-[#8E8E93] mb-3">Equipamiento profesional</h4>
            <div className="space-y-3">
              {profile.equipamiento.map((equip, idx) => (
                <div key={idx} className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] p-3 rounded-lg">
                  <span className="text-sm font-medium text-[#007AFF]">{equip.category}: </span>
                  <span className="text-sm">{equip.item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tarjeta 4: Tarifas */}
          <div className="min-w-full flex-shrink-0 snap-start p-5">
            <h4 className="text-sm font-medium text-[#8E8E93] mb-3">Planes de servicio</h4>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Básico</h5>
                  <span className="text-[#007AFF] font-bold">${profile.tarifas.basic.price} USD</span>
                </div>
                <p className="text-sm text-[#8E8E93]">{profile.tarifas.basic.description}</p>
              </div>
              
              <div className="border-2 border-[#007AFF] rounded-lg p-4 bg-[#007AFF]/5">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Estándar</h5>
                  <span className="text-[#007AFF] font-bold">${profile.tarifas.standard.price} USD</span>
                </div>
                <p className="text-sm text-[#8E8E93]">{profile.tarifas.standard.description}</p>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Premium</h5>
                  <span className="text-[#007AFF] font-bold">${profile.tarifas.premium.price} USD</span>
                </div>
                <p className="text-sm text-[#8E8E93]">{profile.tarifas.premium.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="p-5 border-t border-[#E5E5EA]">
          <Link href={`/editor/${profile.id}`}>
            <Button className="w-full bg-[#007AFF] hover:bg-[#0069d9]">
              Ver perfil completo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;