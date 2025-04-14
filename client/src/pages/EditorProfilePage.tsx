import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/editor/ProfileCard';
import BriefForm from '@/components/client/BriefForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, PencilIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';

const EditorProfilePage = () => {
  const { id } = useParams();
  const editorId = parseInt(id);
  const { user } = useAuth();
  const { toast } = useToast();
  const [viewIncremented, setViewIncremented] = useState(false);
  
  // Fetch editor profile data
  const { 
    data: profileData, 
    isLoading: profileLoading,
    error: profileError
  } = useQuery({
    queryKey: [`/api/editor-profiles/${editorId}`],
    enabled: !isNaN(editorId),
  });
  
  // Fetch user data
  const { 
    data: userData, 
    isLoading: userLoading,
    error: userError
  } = useQuery({
    queryKey: [profileData ? `/api/users/${profileData.userId}` : null],
    enabled: !!profileData,
  });
  
  // Fetch portfolio items
  const { 
    data: portfolioItems = [], 
    isLoading: portfolioLoading,
    error: portfolioError
  } = useQuery({
    queryKey: [`/api/portfolio/${editorId}`],
    enabled: !isNaN(editorId),
  });
  
  useEffect(() => {
    // Increment view count when profile is viewed
    if (editorId && !viewIncremented && !profileLoading && profileData) {
      const incrementView = async () => {
        try {
          await apiRequest('POST', `/api/editor-profiles/${editorId}/view`, {});
          setViewIncremented(true);
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      };
      
      incrementView();
    }
  }, [editorId, profileLoading, profileData, viewIncremented]);
  
  // For MVP, we'll use mock data until the API is fully implemented
  const mockEditorData = {
    id: editorId,
    name: "Carlos Mendoza",
    profilePicture: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Ciudad de México, México",
    country: "México",
    software: ["Premiere Pro", "After Effects"],
    styles: ["YouTube", "Reels"],
    experience: "5 años de experiencia en edición de videos para marcas y creadores de contenido.",
    bio: "Editor de video profesional especializado en contenido para redes sociales y plataformas digitales. Mi enfoque se centra en contar historias cautivadoras mediante una edición dinámica y visualmente atractiva.",
    equipment: [
      { type: "Computadora", description: "MacBook Pro M1, 16GB RAM, 1TB SSD" },
      { type: "Cámara", description: "Sony A7III" },
      { type: "Micrófono", description: "Rode VideoMic Pro+" }
    ],
    basicRate: 75,
    mediumRate: 150,
    advancedRate: 250,
    viewCount: 120,
  };
  
  const mockPortfolioItems = [
    {
      id: 1,
      title: "Campaña Viral para Marca Internacional",
      description: "Edición de video de alta calidad con efectos visuales y transiciones optimizadas para redes sociales.",
      videoUrl: "https://www.youtube.com/watch?v=Gt21qy7m15k",
      thumbnailUrl: "https://i3.ytimg.com/vi/Gt21qy7m15k/maxresdefault.jpg",
    },
    {
      id: 2,
      title: "Contenido de Formato Corto - Reels y TikTok",
      description: "Serie de clips virales con edición dinámica y efectos visuales impactantes para maximizar engagement.",
      videoUrl: "https://www.youtube.com/watch?v=hlRa5XSNDfA",
      thumbnailUrl: "https://i3.ytimg.com/vi/hlRa5XSNDfA/maxresdefault.jpg",
    },
    {
      id: 3,
      title: "Resumen de Evento Corporativo Premium",
      description: "Edición profesional de evento empresarial con múltiples ángulos de cámara y gráficos corporativos.",
      videoUrl: "https://www.youtube.com/watch?v=dyBrdZRgFqU",
      thumbnailUrl: "https://i3.ytimg.com/vi/dyBrdZRgFqU/maxresdefault.jpg",
    }
  ];
  
  // Combine real data if available, otherwise use mock data
  const editor = userData && profileData ? {
    id: editorId,
    name: userData.name,
    profilePicture: userData.profilePicture,
    location: `${userData.country || 'Internacional'}`,
    country: userData.country,
    software: profileData.software?.map((id: number) => {
      // Map software IDs to names (this would be more robust in production)
      const softwareMap: {[key: number]: string} = {
        1: "Premiere Pro",
        2: "Final Cut Pro",
        3: "DaVinci Resolve",
        4: "After Effects",
        5: "CapCut"
      };
      return softwareMap[id] || `Software ${id}`;
    }) || [],
    styles: profileData.editingStyles?.map((id: number) => {
      // Map style IDs to names
      const styleMap: {[key: number]: string} = {
        1: "YouTube",
        2: "Reels/TikTok",
        3: "Comerciales",
        4: "Eventos",
        5: "Video corporativo"
      };
      return styleMap[id] || `Estilo ${id}`;
    }) || [],
    experience: `${userData.yearsOfExperience || ''} años de experiencia.`,
    equipment: profileData.equipment || [],
    basicRate: profileData.basicRate,
    mediumRate: profileData.mediumRate,
    advancedRate: profileData.advancedRate,
    viewCount: profileData.viewCount || 0,
  } : mockEditorData;
  
  // Use real portfolio items if available
  const portfolio = portfolioItems.length > 0 ? portfolioItems : mockPortfolioItems;
  
  const handleContactClick = () => {
    // If user is not logged in, show toast message
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Para contactar al editor, primero debes iniciar sesión o registrarte.",
        variant: "destructive"
      });
    }
  };
  
  if (profileLoading || userLoading) {
    return (
      <div className="min-h-screen bg-[#F2F2F7]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="w-full h-[300px] rounded-lg mb-8" />
            
            <Tabs defaultValue="portfolio" className="mb-6">
              <TabsList className="w-full">
                <Skeleton className="h-10 w-full" />
              </TabsList>
              <div className="mt-6">
                <Skeleton className="w-full h-[400px] rounded-lg" />
              </div>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (profileError || userError) {
    return (
      <div className="min-h-screen bg-[#F2F2F7]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Error al cargar el perfil</h1>
          <p className="text-[#8E8E93] mb-6">No pudimos encontrar el perfil solicitado. El editor podría no existir o hubo un problema al cargar los datos.</p>
          <Button onClick={() => window.history.back()}>Volver atrás</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>{editor.name} | Editor de video | EditoresLATAM</title>
        <meta name="description" content={`${editor.name} - Editor de video en ${editor.location}. ${editor.experience}`} />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Editor Profile Card */}
          <div className="mb-8">
            <ProfileCard editor={editor} onContactClick={handleContactClick} />
          </div>
          
          {/* Tabs for Portfolio, Equipment, Rates */}
          <Tabs defaultValue="portfolio" className="mb-6">
            <TabsList className="w-full border-b-0 rounded-t-lg bg-[#F2F2F7] p-1">
              <TabsTrigger 
                value="portfolio" 
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all"
              >
                Portfolio
              </TabsTrigger>
              <TabsTrigger 
                value="equipment" 
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all"
              >
                Equipo
              </TabsTrigger>
              <TabsTrigger 
                value="rates" 
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all"
              >
                Tarifas y Contacto
              </TabsTrigger>
            </TabsList>
            
            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="mt-6">
              <div className="space-y-8">
                {portfolioLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="w-full h-[300px] rounded-lg" />
                    ))}
                  </div>
                ) : portfolio.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-[#8E8E93]">El editor aún no ha agregado proyectos a su portafolio.</p>
                  </div>
                ) : (
                  portfolio.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all transform hover:translate-y-[-3px] duration-300">
                      <div className="aspect-video bg-gray-100 relative">
                        {item.thumbnailUrl ? (
                          <>
                            <img 
                              src={item.thumbnailUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                            <a 
                              href={item.videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md hover:bg-primary/90 transition-colors"
                            >
                              Ver en YouTube
                              <ExternalLink className="ml-1 h-3.5 w-3.5" />
                            </a>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#8E8E93]">
                            No preview available
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-[#8E8E93] text-sm leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            {/* Equipment Tab */}
            <TabsContent value="equipment" className="mt-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Equipo técnico</h3>
                
                {editor.equipment.length === 0 ? (
                  <p className="text-[#8E8E93] py-8 text-center">El editor aún no ha agregado información sobre su equipo.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editor.equipment.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow"
                      >
                        <h4 className="font-medium text-primary mb-2">{item.type}</h4>
                        <p className="text-[#8E8E93] text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <h4 className="font-semibold mb-2 text-[#495057]">Acerca de mi equipo</h4>
                  <p className="text-sm text-[#6C757D]">
                    Todos mis equipos son de alta calidad y están actualizados para garantizar un trabajo profesional. 
                    Realizo mantenimiento periódico para asegurar el mejor rendimiento en cada proyecto.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Rates Tab */}
            <TabsContent value="rates" className="mt-6" id="contact">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Tarifas y Contacto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all bg-white hover:translate-y-[-3px] duration-300">
                    <div className="mb-4">
                      <h4 className="text-lg font-medium">Básica</h4>
                      <div className="h-1 w-12 bg-blue-200 mx-auto mt-2"></div>
                    </div>
                    <p className="text-sm text-[#8E8E93] mb-4">Edición simple, sin efectos complejos</p>
                    <div className="text-3xl font-bold text-primary mb-6">
                      ${editor.basicRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
                    </div>
                    <ul className="text-left mb-6 text-sm space-y-2">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Cortes simples
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Ajustes básicos de audio
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Transiciones sencillas
                      </li>
                    </ul>
                    <BriefForm editorId={editorId} />
                  </div>
                  
                  <div className="border-2 border-primary rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all bg-white hover:translate-y-[-3px] duration-300 relative">
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-primary text-white text-xs rounded-full">
                      Más popular
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-medium">Media</h4>
                      <div className="h-1 w-12 bg-primary mx-auto mt-2"></div>
                    </div>
                    <p className="text-sm text-[#8E8E93] mb-4">Edición con efectos básicos, corrección de color</p>
                    <div className="text-3xl font-bold text-primary mb-6">
                      ${editor.mediumRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
                    </div>
                    <ul className="text-left mb-6 text-sm space-y-2">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Todo lo básico
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Corrección de color
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Efectos de movimiento
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Mezcla de sonido
                      </li>
                    </ul>
                    <BriefForm editorId={editorId} />
                  </div>
                  
                  <div className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all bg-white hover:translate-y-[-3px] duration-300">
                    <div className="mb-4">
                      <h4 className="text-lg font-medium">Avanzada</h4>
                      <div className="h-1 w-12 bg-blue-200 mx-auto mt-2"></div>
                    </div>
                    <p className="text-sm text-[#8E8E93] mb-4">Edición compleja, animaciones, efectos especiales</p>
                    <div className="text-3xl font-bold text-primary mb-6">
                      ${editor.advancedRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
                    </div>
                    <ul className="text-left mb-6 text-sm space-y-2">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Todo lo de tarifa media
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Animaciones personalizadas
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Efectos visuales avanzados
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Producción de alta calidad
                      </li>
                    </ul>
                    <BriefForm editorId={editorId} />
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-[#8E8E93]">
                    * Las tarifas son referenciales. El precio final puede variar según los requerimientos específicos del proyecto.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Edit Profile Button (only visible to profile owner) */}
          {user && user.id === profileData?.userId && (
            <div className="text-right">
              <Button variant="outline" className="mt-4">
                <PencilIcon className="h-4 w-4 mr-2" />
                Editar perfil
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditorProfilePage;
