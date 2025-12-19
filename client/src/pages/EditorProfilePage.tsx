import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ExternalLink,
  Star,
  ThumbsUp,
  EyeIcon,
  MailIcon,
  DollarSign,
  BriefcaseIcon,
  MessageSquare,
  Settings,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import BriefForm from '@/components/client/BriefForm';

interface User {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
  country?: string;
  bio?: string;
  yearsOfExperience?: number;
  userType: string;
}

interface EditorProfile {
  id: number;
  userId: number;
  basicRate: number;
  mediumRate?: number;
  advancedRate?: number;
  software?: number[];
  editingStyles?: number[];
  expertise?: string[];
  technologyTags?: string[];
  equipment?: any[];
  weeklyAvailability?: any;
  paymentMethods?: any[];
  viewCount?: number;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

interface Review {
  id: number;
  editorProfileId: number;
  clientId: number;
  clientName?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const EditorProfilePage = () => {
  const { id } = useParams();
  const editorId = parseInt(id || '0');
  const { user } = useAuth();
  const { toast } = useToast();
  const [viewIncremented, setViewIncremented] = useState(false);

  // Fetch editor profile data
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError
  } = useQuery<EditorProfile>({
    queryKey: [`/api/editor-profiles/${editorId}`],
    enabled: !isNaN(editorId),
  });

  // Fetch user data
  const {
    data: userData,
    isLoading: userLoading,
    error: userError
  } = useQuery<User>({
    queryKey: [profileData ? `/api/users/${profileData.userId}` : null],
    enabled: !!profileData,
  });

  // Fetch software list
  const {
    data: softwareList = [],
    isLoading: softwareLoading
  } = useQuery<any[]>({
    queryKey: ['/api/software'],
    enabled: !!profileData,
  });

  // Fetch editing styles list
  const {
    data: editingStylesList = [],
    isLoading: stylesLoading
  } = useQuery<any[]>({
    queryKey: ['/api/editing-styles'],
    enabled: !!profileData,
  });

  // Fetch portfolio items
  const {
    data: portfolioItems = [],
    isLoading: portfolioLoading
  } = useQuery<PortfolioItem[]>({
    queryKey: [`/api/portfolio/${editorId}`],
    enabled: !isNaN(editorId),
  });

  // Fetch reviews
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery<Review[]>({
    queryKey: [`/api/reviews/editor/${editorId}`],
    enabled: !isNaN(editorId),
  });

  // Create a review mutation
  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: {
      editorProfileId: number;
      clientId: number;
      rating: number;
      comment: string;
    }) => {
      const res = await apiRequest('POST', '/api/reviews', reviewData);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Reseña publicada",
        description: "Tu reseña ha sido publicada exitosamente.",
      });
      // Refresh reviews data
      refetchReviews();
    },
    onError: (error: any) => {
      toast({
        title: "Error al publicar reseña",
        description: error.message || "Ha ocurrido un error al publicar tu reseña.",
        variant: "destructive",
      });
    },
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
    userId: 0,
    name: "Carlos Mendoza",
    profilePicture: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Ciudad de México, México",
    country: "México",
    software: [1, 2], // IDs for uniformity, or handle mixed types
    styles: [1, 2],
    editingStyles: [1, 2],
    yearsOfExperience: 5,
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
    technologyTags: ["Adobe Premiere", "After Effects"],
    weeklyAvailability: {},
    paymentMethods: [],
    expertise: ["YouTube", "Social Media"]
  };

  const mockPortfolioItems: PortfolioItem[] = [
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
    userId: userData.id,
    name: userData.name,
    profilePicture: userData.profilePicture,
    location: `${userData.country || 'Internacional'}`,
    country: userData.country,
    bio: userData.bio || '',
    software: profileData.software || [],
    styles: profileData.editingStyles || [],
    editingStyles: profileData.editingStyles || [],
    expertise: profileData.expertise || [],
    technologyTags: profileData.technologyTags || [],
    equipment: profileData.equipment || [],
    yearsOfExperience: userData.yearsOfExperience,
    experience: `${userData.yearsOfExperience || ''} años de experiencia.`,
    basicRate: profileData.basicRate,
    mediumRate: profileData.mediumRate,
    advancedRate: profileData.advancedRate,
    weeklyAvailability: profileData.weeklyAvailability || {},
    paymentMethods: profileData.paymentMethods || [],
    viewCount: profileData.viewCount || 0,
  } : mockEditorData;

  // Use real portfolio items if available
  const portfolio = portfolioItems && portfolioItems.length > 0 ? portfolioItems : mockPortfolioItems;

  const [, setLocation] = useLocation();

  const handleContactClick = () => {
    // If user is not logged in, show toast message
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Para contactar al editor, primero debes iniciar sesión o registrarte.",
        variant: "destructive"
      });
      return;
    }

    // Navegar a la página de mensajes con parámetros para crear una nueva conversación
    const editorUserId = profileData?.userId;
    const editorName = userData?.name || 'Editor';

    // Guardar en sessionStorage para usar en la página de mensajes
    if (editorUserId) {
      sessionStorage.setItem('newConversation', JSON.stringify({
        recipientId: editorUserId,
        recipientName: editorName,
        subject: `Consulta para ${editorName}`
      }));

      // Navegar a la página de mensajes usando setLocation de wouter
      setLocation('/mensajes');
    } else {
      toast({
        title: "Error",
        description: "No se pudo obtener la información del editor para contactarlo.",
        variant: "destructive"
      });
    }
  };

  if (profileLoading || userLoading) {
    return (
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Error al cargar el perfil</h1>
          <p className="text-gray-500 mb-6">No pudimos encontrar el perfil solicitado. El editor podría no existir o hubo un problema al cargar los datos.</p>
          <Button onClick={() => window.history.back()}>Volver atrás</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{editor.name} | Editor de video | LatamVideos</title>
        <meta name="description" content={`${editor.name} - Editor de video en ${editor.location}. ${editor.experience}`} />
      </Helmet>
      <Header />

      <div className="container mx-auto px-0 md:px-4 py-0 md:py-8">
        <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            {/* SIDEBAR - Columna izquierda fija */}
            <div className="md:w-1/4 border-r border-gray-100 p-8">
              {/* Foto de perfil */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                  {editor.profilePicture ? (
                    <img
                      src={editor.profilePicture}
                      alt={`Foto de ${editor.name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Photo
                    </div>
                  )}
                </div>

                {/* Nombre y ubicación */}
                <h1 className="text-2xl font-bold text-[#1C1C1E] text-center mb-1">{editor.name}</h1>
                <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{editor.location || "International"}</span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mb-6">4.9</div>
              </div>

              {/* About me */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">About me</h3>
                <p className="text-sm text-gray-600 mb-6">
                  {editor.bio || `Editor de video con ${editor.experience}`}
                </p>
              </div>

              {/* Tags/Especialidades */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {editor.technologyTags && editor.technologyTags.length > 0 ? (
                    editor.technologyTags.map((tag, index) => (
                      <span key={index} className="inline-flex bg-gray-100 text-gray-800 text-xs px-2.5 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="inline-flex bg-gray-100 text-gray-800 text-xs px-2.5 py-1.5 rounded-full">Tag</span>
                      <span className="inline-flex bg-gray-100 text-gray-800 text-xs px-2.5 py-1.5 rounded-full">Tag</span>
                      <span className="inline-flex bg-gray-100 text-gray-800 text-xs px-2.5 py-1.5 rounded-full">Tag</span>
                    </>
                  )}
                </div>
              </div>

              {/* Edit profile button - visible only to owner */}
              {user && user.id === profileData?.userId && (
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  onClick={() => setLocation(`/editar-perfil/${editorId}`)}
                >
                  Edit profile
                </Button>
              )}

              {/* Contact button - not visible to owner */}
              {(!user || (user && user.id !== profileData?.userId)) && (
                <Button
                  className="w-full text-white font-bold text-lg h-12 shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] mb-4"
                  onClick={handleContactClick}
                >
                  Contactar
                </Button>
              )}
            </div>

            {/* CONTENT AREA - Columna derecha con tabs */}
            <div className="md:w-3/4 p-0">
              {/* Tabs navigation */}
              <Tabs defaultValue="portfolio" className="w-full h-full">
                <div className="border-b border-gray-200">
                  <TabsList className="flex p-0 bg-transparent border-0">
                    <TabsTrigger
                      value="portfolio"
                      className="flex-1 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-0 bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground font-medium hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <BriefcaseIcon className="h-4 w-4" />
                        <span>Portfolio</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="equipment"
                      className="flex-1 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-0 bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground font-medium hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Herramientas</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="rates"
                      className="flex-1 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-0 bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground font-medium hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Tarifas</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="flex-1 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-0 bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground font-medium hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reseñas</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Portafolio Tab */}
                <TabsContent value="portfolio" className="p-6">
                  <h2 className="text-2xl font-bold mb-8">Proyectos destacados</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioLoading ? (
                      <>
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="w-full aspect-video rounded-lg" />
                        ))}
                      </>
                    ) : portfolio && portfolio.length === 0 ? (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">El profesional aún no ha agregado proyectos a su portafolio.</p>
                      </div>
                    ) : (
                      portfolio.map((item: any) => (
                        <div key={item.id} className="group bg-white rounded-2xl border-0 shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
                          <div className="aspect-video bg-gray-100 relative overflow-hidden">
                            {item.thumbnailUrl ? (
                              <>
                                <img
                                  src={item.thumbnailUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                  <a
                                    href={item.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-lg"
                                  >
                                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm3.33 10.72l-4.33 3a.8.8 0 0 1-1.25-.72V7a.8.8 0 0 1 1.25-.72l4.33 3a.8.8 0 0 1 0 1.44z" />
                                    </svg>
                                  </a>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No preview available
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* Equipment Tab */}
                <TabsContent value="equipment" className="p-6">
                  <h2 className="text-2xl font-bold mb-8">Herramientas y Equipos</h2>

                  <div className="bg-white rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Software</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {editor.software && editor.software.length > 0 ? (
                        softwareList
                          .filter((sw: any) => editor.software.includes(sw.id))
                          .map((sw: any) => (
                            <span key={sw.id} className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center">
                              {sw.name}
                            </span>
                          ))
                      ) : (
                        <p className="text-gray-500">No se ha especificado software.</p>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Equipo técnico</h3>
                    {editor.equipment && editor.equipment.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(editor.equipment) && editor.equipment.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <h4 className="font-medium text-[#007AFF] mb-2">
                              {typeof item === 'string' ? item : item.type}
                            </h4>
                            {typeof item !== 'string' && item.description && (
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No se ha especificado equipo técnico.</p>
                    )}
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Especialidades</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {editor.styles && editor.styles.length > 0 ? (
                        editingStylesList
                          .filter((style: any) => editor.styles.includes(style.id))
                          .map((style: any) => (
                            <span key={style.id} className="bg-blue-50 text-[#007AFF] px-3 py-2 rounded-lg text-sm">
                              {style.name}
                            </span>
                          ))
                      ) : (
                        <p className="text-gray-500">No se han especificado estilos de edición.</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Rates Tab */}
                <TabsContent value="rates" className="p-6">
                  <h2 className="text-2xl font-bold mb-8">Tarifas y Servicios</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="border border-gray-100 rounded-2xl p-8 text-center bg-white hover:shadow-hover transition-all duration-300">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">Básica</h3>
                        <div className="h-1 w-12 bg-gray-200 mx-auto mt-3 rounded-full"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Edición simple, sin efectos complejos</p>
                      <div className="text-4xl font-bold text-primary mb-8">
                        ${editor.basicRate} <span className="text-sm font-normal text-muted-foreground">USD</span>
                      </div>
                      <ul className="text-left mb-8 text-sm space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Cortes simples
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Ajustes básicos de audio
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Transiciones sencillas
                        </li>
                      </ul>
                      <Button
                        className="w-full rounded-full font-bold"
                        onClick={handleContactClick}
                      >
                        Contactar
                      </Button>
                    </div>

                    <div className="border-2 border-primary rounded-2xl p-8 text-center bg-white shadow-soft hover:shadow-hover transition-all duration-300 relative scale-105 z-10">
                      <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                        Más popular
                      </div>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">Media</h3>
                        <div className="h-1 w-12 bg-primary mx-auto mt-3 rounded-full"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Edición con efectos básicos, corrección de color</p>
                      <div className="text-4xl font-bold text-primary mb-8">
                        ${editor.mediumRate} <span className="text-sm font-normal text-muted-foreground">USD</span>
                      </div>
                      <ul className="text-left mb-8 text-sm space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Todo lo básico
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Corrección de color
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Efectos de movimiento
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Mezcla de sonido
                        </li>
                      </ul>
                      <Button
                        className="w-full rounded-full font-bold shadow-lg"
                        onClick={handleContactClick}
                      >
                        Contactar
                      </Button>
                    </div>

                    <div className="border border-gray-100 rounded-2xl p-8 text-center bg-white hover:shadow-hover transition-all duration-300">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">Avanzada</h3>
                        <div className="h-1 w-12 bg-gray-200 mx-auto mt-3 rounded-full"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Edición compleja, animaciones, efectos especiales</p>
                      <div className="text-4xl font-bold text-primary mb-8">
                        ${editor.advancedRate} <span className="text-sm font-normal text-muted-foreground">USD</span>
                      </div>
                      <ul className="text-left mb-8 text-sm space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Todo lo de tarifa media
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Animaciones personalizadas
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Efectos visuales avanzados
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Producción de alta calidad
                        </li>
                      </ul>
                      <Button
                        className="w-full rounded-full font-bold"
                        onClick={handleContactClick}
                      >
                        Contactar
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500">
                    * Las tarifas son referenciales. El precio final puede variar según los requerimientos específicos del proyecto.
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="p-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Reseñas</h2>

                    {user && user.id !== profileData?.userId && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Mostrar un modal de revisión que llamaría a createReviewMutation
                          // Por ahora, sólo mostraremos un toast informativo
                          toast({
                            title: "Dejar reseña",
                            description: "Esta función estará disponible pronto.",
                          });
                        }}
                      >
                        Escribir una reseña
                      </Button>
                    )}
                  </div>

                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="w-full h-[100px] rounded-lg" />
                      ))}
                    </div>
                  ) : reviews && Array.isArray(reviews) && reviews.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                      <p className="text-gray-500">Este profesional aún no tiene reseñas. ¡Sé el primero en compartir tu experiencia!</p>
                    </div>
                  ) : reviews && Array.isArray(reviews) && (
                    <div className="space-y-6">
                      {reviews.map((review: any) => (
                        <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center mb-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                  />
                                ))}
                                <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                              </div>
                              <p className="text-sm font-medium">{review.clientName || "Cliente"}</p>
                            </div>
                            <span className="text-xs text-gray-500">
                              {review.createdAt ? format(new Date(review.createdAt), 'dd/MM/yyyy') : ''}
                            </span>
                          </div>

                          <p className="text-sm text-gray-700 my-3">{review.comment}</p>

                          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                            <div className="flex items-center cursor-pointer hover:text-gray-700">
                              <ThumbsUp className="h-3 w-3 mr-1" /> Útil
                            </div>

                            {/* Only show delete option for admin or the review author */}
                            {user && (user.id === review.clientId || (user.userType as string) === "admin") && (
                              <button
                                className="text-red-500 hover:text-red-600"
                                onClick={async () => {
                                  if (window.confirm("¿Seguro que deseas eliminar esta reseña?")) {
                                    try {
                                      await apiRequest('DELETE', `/api/reviews/${review.id}`);
                                      toast({
                                        title: "Reseña eliminada",
                                        description: "La reseña ha sido eliminada exitosamente."
                                      });
                                      refetchReviews();
                                    } catch (error) {
                                      toast({
                                        title: "Error",
                                        description: "No se pudo eliminar la reseña.",
                                        variant: "destructive"
                                      });
                                    }
                                  }
                                }}
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditorProfilePage;