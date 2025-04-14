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
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    location: "Ciudad de México, México",
    country: "México",
    software: ["Premiere Pro", "After Effects"],
    styles: ["YouTube", "Reels"],
    experience: "5 años de experiencia en edición de videos para marcas y creadores de contenido.",
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
      title: "Campaña de marketing digital",
      description: "Serie de videos para redes sociales de una reconocida marca de ropa deportiva.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
    },
    {
      id: 2,
      title: "Intro para canal de YouTube",
      description: "Animación de logotipo e intro para canal de tecnología con más de 500K suscriptores.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1626379591937-29b8b9653261?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
    },
    {
      id: 3,
      title: "Resumen de evento corporativo",
      description: "Video resumen de una conferencia internacional de tecnología.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
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
            <TabsList className="w-full">
              <TabsTrigger value="portfolio" className="flex-1">Portfolio</TabsTrigger>
              <TabsTrigger value="equipment" className="flex-1">Equipo</TabsTrigger>
              <TabsTrigger value="rates" className="flex-1">Tarifas</TabsTrigger>
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
                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="aspect-video bg-gray-100">
                        {item.thumbnailUrl ? (
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#8E8E93]">
                            No preview available
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            {item.description && (
                              <p className="text-[#8E8E93] mb-4">{item.description}</p>
                            )}
                          </div>
                          <a 
                            href={item.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center"
                          >
                            Ver video
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
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
                <h3 className="text-xl font-semibold mb-4">Equipo técnico</h3>
                
                {editor.equipment.length === 0 ? (
                  <p className="text-[#8E8E93] py-4">El editor aún no ha agregado información sobre su equipo.</p>
                ) : (
                  <div className="space-y-4">
                    {editor.equipment.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-medium">{item.type}</h4>
                        <p className="text-[#8E8E93]">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Rates Tab */}
            <TabsContent value="rates" className="mt-6" id="contact">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Tarifas y Contacto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium mb-1">Básica</h4>
                    <p className="text-sm text-[#8E8E93] mb-4">Edición simple, sin efectos complejos</p>
                    <div className="text-3xl font-bold text-primary mb-6">
                      ${editor.basicRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
                    </div>
                    <BriefForm editorId={editorId} />
                  </div>
                  
                  <div className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium mb-1">Media</h4>
                    <p className="text-sm text-[#8E8E93] mb-4">Edición con efectos básicos, corrección de color</p>
                    <div className="text-3xl font-bold text-primary mb-6">
                      ${editor.mediumRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
                    </div>
                    <BriefForm editorId={editorId} />
                  </div>
                  
                  <div className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium mb-1">Avanzada</h4>
                    <p className="text-sm text-[#8E8E93] mb-4">Edición compleja, animaciones, efectos especiales</p>
                    <div className="text-3xl font-bold text-primary mb-6">
                      ${editor.advancedRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
                    </div>
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
