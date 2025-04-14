import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Secciones del perfil interactivo
type ProfileSection = 'edicion' | 'grabacion' | 'podcast' | 'portafolio' | 'equipamiento' | 'tarifas';

// Ejemplo de editor con información completa para el perfil interactivo
interface EditorInteractiveProfile {
  id: number;
  name: string;
  profilePicture: string;
  country: string;
  yearsOfExperience: number;
  software: string[];
  styles: string[];
  portafolio: {
    title: string;
    thumbnail: string;
  }[];
  equipamiento: string[];
  tarifas: {
    basic: number;
    standard: number;
    premium: number;
  };
}

// Datos de ejemplo para el perfil interactivo
const sampleInteractiveProfile: EditorInteractiveProfile = {
  id: 1,
  name: "Mauricio Treviño Botticelli",
  profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
  country: "México",
  yearsOfExperience: 5,
  software: ["Premiere Pro", "Final Cut", "CapCut"],
  styles: ["Reels", "YouTube", "Podcast"],
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
    "MacBook Pro M1 Max",
    "Cámara Sony A7III",
    "Micrófono Rode PodMic",
    "Iluminación Aputure"
  ],
  tarifas: {
    basic: 200,
    standard: 350,
    premium: 500
  }
};

const EditorInteractiveProfiles = () => {
  const [activeProfile, setActiveProfile] = useState<EditorInteractiveProfile>(sampleInteractiveProfile);
  const [activeSection, setActiveSection] = useState<ProfileSection>('portafolio');
  
  // Referencia para el scroll horizontal
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
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
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
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Función para renderizar el contenido según la sección activa
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'edicion':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">✂️ Edición</h3>
            <p className="text-gray-600 mb-4">Especialista en edición de contenido para:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProfile.styles.map((style, idx) => (
                <Badge key={idx} className="bg-primary/10 text-primary">
                  {style}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600">Experiencia: {activeProfile.yearsOfExperience} años</p>
          </div>
        );
      
      case 'grabacion':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">🎥 Grabación</h3>
            <p className="text-gray-600 mb-4">Servicios adicionales de grabación disponibles.</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                Equipo profesional para grabaciones en estudio y locación.
                Consulta disponibilidad para tu proyecto.
              </p>
            </div>
          </div>
        );
      
      case 'podcast':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">🎙️ Podcast</h3>
            <p className="text-gray-600 mb-4">Producción completa de podcasts:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Edición de audio</li>
              <li>Corrección de errores</li>
              <li>Nivelación de sonido</li>
              <li>Música y efectos</li>
              <li>Exportación para plataformas</li>
            </ul>
          </div>
        );
      
      case 'portafolio':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">📦 Portafolio</h3>
            <div className="grid grid-cols-1 gap-4">
              {activeProfile.portafolio.map((item, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-[120px] object-cover"
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
        );
      
      case 'equipamiento':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">⚙️ Equipamiento</h3>
            <div className="space-y-2">
              {activeProfile.equipamiento.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'tarifas':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">💰 Tarifas</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">Básico</h4>
                  <span className="text-primary font-bold">${activeProfile.tarifas.basic} USD</span>
                </div>
                <p className="text-xs text-gray-500">Edición simple, hasta 3 minutos</p>
              </div>
              
              <div className="border rounded-lg p-3 border-primary bg-primary/5">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">Estándar</h4>
                  <span className="text-primary font-bold">${activeProfile.tarifas.standard} USD</span>
                </div>
                <p className="text-xs text-gray-500">Edición completa con efectos, hasta 10 minutos</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">Premium</h4>
                  <span className="text-primary font-bold">${activeProfile.tarifas.premium} USD</span>
                </div>
                <p className="text-xs text-gray-500">Producción completa con corrección de color</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-6">Perfiles Interactivos</h3>
      <p className="text-gray-600 mb-6">
        Explora un ejemplo de perfil interactivo. Desliza horizontalmente para ver diferentes secciones.
      </p>
      
      <div className="bg-white rounded-xl shadow-md max-w-md mx-auto">
        {/* Header del perfil */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img 
              src={activeProfile.profilePicture} 
              alt={activeProfile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
            <div className="ml-4">
              <h3 className="font-bold text-xl">{activeProfile.name}</h3>
              <p className="text-gray-600">{activeProfile.country}</p>
            </div>
          </div>
        </div>
        
        {/* Navegación de secciones con emojis */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-2 border-b snap-x snap-mandatory hide-scrollbar"
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
          <button
            onClick={() => setActiveSection('edicion')}
            className={`flex-shrink-0 px-4 py-2 mx-1 snap-start rounded-md ${
              activeSection === 'edicion' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <span className="text-lg">✂️</span> Edición
          </button>
          <button
            onClick={() => setActiveSection('grabacion')}
            className={`flex-shrink-0 px-4 py-2 mx-1 snap-start rounded-md ${
              activeSection === 'grabacion' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <span className="text-lg">🎥</span> Grabación
          </button>
          <button
            onClick={() => setActiveSection('podcast')}
            className={`flex-shrink-0 px-4 py-2 mx-1 snap-start rounded-md ${
              activeSection === 'podcast' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <span className="text-lg">🎙️</span> Podcast
          </button>
          <button
            onClick={() => setActiveSection('portafolio')}
            className={`flex-shrink-0 px-4 py-2 mx-1 snap-start rounded-md ${
              activeSection === 'portafolio' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <span className="text-lg">📦</span> Portafolio
          </button>
          <button
            onClick={() => setActiveSection('equipamiento')}
            className={`flex-shrink-0 px-4 py-2 mx-1 snap-start rounded-md ${
              activeSection === 'equipamiento' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <span className="text-lg">⚙️</span> Equipamiento
          </button>
          <button
            onClick={() => setActiveSection('tarifas')}
            className={`flex-shrink-0 px-4 py-2 mx-1 snap-start rounded-md ${
              activeSection === 'tarifas' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            <span className="text-lg">💰</span> Tarifas
          </button>
        </div>
        
        {/* Contenido de la sección activa */}
        <div className="min-h-[300px]">
          {renderSectionContent()}
        </div>
        
        {/* Footer con CTA */}
        <div className="p-4 border-t">
          <Link href={`/editor/${activeProfile.id}`}>
            <Button className="w-full">Ver perfil completo</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;