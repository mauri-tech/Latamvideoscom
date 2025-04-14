import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Smartphone, 
  Play, 
  Code, 
  Briefcase, 
  Star,
  Award,
  Monitor,
  CheckCircle2
} from 'lucide-react';

// Perfiles de muestra para el carrusel con videos de ejemplo
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
    expertise: ["Edición de contenido para redes sociales", "Motion graphics", "Color grading", "Efectos visuales básicos"],
    equipmentOwned: ["Laptop MSI Creator con RTX 3070", "Monitor calibrado para color", "Tableta gráfica Wacom"],
    videoPortfolio: [
      {
        id: "v1",
        title: "Documental de Naturaleza",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
        type: "Documental",
        duration: "05:32"
      },
      {
        id: "v2",
        title: "Campaña para Redes Sociales",
        thumbnail: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
        type: "Comercial",
        duration: "00:45"
      }
    ],
    reviews: [
      {
        id: "r1",
        client: "Agencia de Marketing Digital",
        rating: 5,
        comment: "Excelente trabajo y entrega rápida. Definitivamente lo recomendaría."
      }
    ],
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
    expertise: ["Edición de comerciales", "Colorización avanzada", "Producción audiovisual", "Dirección de fotografía"],
    equipmentOwned: ["Mac Studio M1 Max", "Monitor Eizo ColorEdge", "Cámara Sony A7III"],
    videoPortfolio: [
      {
        id: "v3",
        title: "Comercial Automotriz",
        thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
        type: "Comercial",
        duration: "00:30"
      },
      {
        id: "v4",
        title: "Video Corporativo",
        thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
        type: "Corporativo",
        duration: "03:15"
      }
    ],
    reviews: [
      {
        id: "r2",
        client: "Marca de automóviles",
        rating: 5,
        comment: "Valeria entendió perfectamente el concepto y lo ejecutó de manera brillante."
      }
    ],
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
    expertise: ["Edición ágil para redes", "Efectos virales", "Optimización para algoritmos", "Narrativa visual rápida"],
    equipmentOwned: ["MacBook Pro 16\"", "iPhone 13 Pro (grabación)", "Micrófonos Rode"],
    videoPortfolio: [
      {
        id: "v5",
        title: "Serie de TikToks Virales",
        thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
        type: "Redes sociales",
        duration: "Serie"
      },
      {
        id: "v6",
        title: "Reels para Marca de Moda",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
        type: "Redes sociales",
        duration: "00:60 (x5)"
      }
    ],
    reviews: [
      {
        id: "r3",
        client: "Influencer",
        rating: 4.8,
        comment: "Matías es increíblemente rápido y conoce todas las tendencias de edición actuales."
      }
    ],
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
  const [activeTab, setActiveTab] = useState("portfolio");
  
  // Auto-rotate carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 7000);
    
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
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg pointer-events-none transition-opacity duration-500">
          <div className="text-center p-4">
            <Smartphone className="h-12 w-12 mx-auto mb-2 animate-pulse" />
            <p className="text-lg font-medium">Desliza para ver más perfiles</p>
          </div>
        </div>
      )}
      
      <div 
        className="overflow-hidden bg-white rounded-xl shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          <div className="w-full">
            {/* Profile Header */}
            <div className="p-6 border-b">
              <div className="flex items-center">
                <img 
                  src={currentProfile.profilePicture} 
                  alt={currentProfile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div className="ml-4">
                  <div className="flex items-center">
                    <h3 className="font-bold text-xl">{currentProfile.name}</h3>
                    <CheckCircle2 className="w-5 h-5 text-primary ml-2" />
                  </div>
                  <p className="text-gray-600 flex items-center">
                    <span>{currentProfile.location}</span>
                    <Badge className="ml-2 bg-primary">{currentProfile.basicRate}USD/h</Badge>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Profile Tabs */}
            <Tabs defaultValue="portfolio" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="portfolio" className="flex items-center">
                  <Play className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Portfolio</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center">
                  <Code className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Habilidades</span>
                </TabsTrigger>
                <TabsTrigger value="equipment" className="flex items-center">
                  <Monitor className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Equipo</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Portfolio Content */}
              <TabsContent value="portfolio" className="px-2 py-4 focus-visible:outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProfile.videoPortfolio.map((video) => (
                    <div key={video.id} className="relative rounded-lg overflow-hidden">
                      <div className="aspect-video bg-black relative overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="outline" size="icon" className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-white rounded-full">
                            <Play className="h-6 w-6 text-white" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="font-medium text-sm truncate">{video.title}</p>
                        <p className="text-gray-500 text-xs">{video.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {currentProfile.reviews && currentProfile.reviews.length > 0 && (
                  <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium ml-1">
                        {currentProfile.reviews[0].rating} 
                        <span className="text-gray-500 ml-1 font-normal">
                          · {currentProfile.reviews[0].client}
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">"{currentProfile.reviews[0].comment}"</p>
                  </div>
                )}
              </TabsContent>
              
              {/* Skills Content */}
              <TabsContent value="skills" className="px-4 py-4 focus-visible:outline-none">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Award className="w-4 h-4 mr-1 text-primary" />
                      Experiencia
                    </h4>
                    <p className="text-sm text-gray-600">{currentProfile.experience}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Code className="w-4 h-4 mr-1 text-primary" />
                      Software
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.software.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-100">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Briefcase className="w-4 h-4 mr-1 text-primary" />
                      Especialidades
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.styles.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-100">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Star className="w-4 h-4 mr-1 text-primary" />
                      Habilidades destacadas
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {currentProfile.expertise.map((skill, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Equipment Content */}
              <TabsContent value="equipment" className="px-4 py-4 focus-visible:outline-none">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 flex items-center mb-2">
                    <Monitor className="w-4 h-4 mr-1 text-primary" />
                    Equipo profesional
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {currentProfile.equipmentOwned.map((item, idx) => (
                      <li key={idx} className="flex items-start bg-gray-50 p-2 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
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
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full hidden sm:flex z-10"
        onClick={handlePrev}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full hidden sm:flex z-10"
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
      
      {/* Register to Connect Button */}
      <div className="text-center mt-6">
        <Link href="/auth">
          <Button className="bg-primary text-white px-6 py-2 shadow-md hover:bg-primary/90">
            Regístrate para conectar con editores
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditorProfileCarousel;