import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import ProfileCard from '../editor/ProfileCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Smartphone } from 'lucide-react';

// Perfiles de muestra para el carrusel
const sampleProfiles = [
  {
    id: 1,
    name: "Carlos Mendoza",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    location: "Ciudad de México",
    country: "MX",
    software: ["Premiere Pro", "After Effects"],
    styles: ["YouTube", "Reels / TikTok"],
    experience: "Editor de video con 5 años de experiencia especializado en contenido para redes sociales y YouTube.",
    basicRate: 75,
    viewCount: 120
  },
  {
    id: 2,
    name: "Valeria Gómez",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    location: "Bogotá",
    country: "CO",
    software: ["Final Cut Pro", "DaVinci Resolve"],
    styles: ["Comerciales", "Video corporativo"],
    experience: "Editora con 7 años de experiencia en producciones nacionales e internacionales. Especialista en comerciales.",
    basicRate: 120,
    viewCount: 185
  },
  {
    id: 3,
    name: "Matías Rodríguez",
    profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    location: "Buenos Aires",
    country: "AR",
    software: ["Premiere Pro", "CapCut"],
    styles: ["TikTok", "Instagram"],
    experience: "Creador de contenido y editor especializado en videos cortos para redes sociales con enfoque en tendencias actuales.",
    basicRate: 60,
    viewCount: 98
  }
];

const EditorProfileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  
  // Auto-rotate carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);
  
  // Hide swipe hint after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sampleProfiles.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setIsTransitioning(false), 300);
  };
  
  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === sampleProfiles.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsTransitioning(false), 300);
  };
  
  // Touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setShowSwipeHint(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNext();
    } else if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrev();
    }
  };
  
  const currentProfile = sampleProfiles[currentIndex];
  
  return (
    <div className="relative">
      {/* Swipe Hint */}
      {showSwipeHint && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg pointer-events-none transition-opacity duration-500">
          <div className="text-center p-4">
            <Smartphone className="h-12 w-12 mx-auto mb-2 animate-pulse" />
            <p className="text-lg font-medium">Desliza para ver más perfiles</p>
          </div>
        </div>
      )}
      
      <div 
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <ProfileCard 
              editor={currentProfile} 
              onContactClick={() => {}} 
            />
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {sampleProfiles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow Controls */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full hidden sm:flex"
        onClick={handlePrev}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full hidden sm:flex"
        onClick={handleNext}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
      
      {/* Mobile Navigation Buttons */}
      <div className="flex justify-between mt-4 sm:hidden">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrev}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNext}
          className="flex items-center"
        >
          Siguiente
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* View All Button */}
      <div className="text-center mt-6">
        <Link href="/search">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Ver todos los editores
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditorProfileCarousel;