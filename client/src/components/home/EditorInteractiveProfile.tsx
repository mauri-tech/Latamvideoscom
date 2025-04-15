import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Briefcase, Clock, Monitor, MessageSquare, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { countries } from '@/lib/constants';

// Tipo para el editor de demostración
interface Editor {
  id: number;
  name: string;
  profilePicture: string;
  location: string;
  country: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  specialties: string[];
  tags: string[];
  portfolioCount: number;
  price: {
    min: number;
    currency: string;
  };
  experience: number;
  userId: number;
}

// Tipo para reseñas
interface Review {
  id: number;
  author: string;
  company: string;
  rating: number;
  date: string;
  comment: string;
}

// Datos de respaldo en caso de que no se pueda cargar el perfil
const fallbackEditorProfile: Editor = {
  id: 11,
  name: "Mauricio Treviño Botticelli",
  profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  location: "🇲🇽 Ciudad de México",
  country: "MX",
  verified: true,
  rating: 4.9,
  reviewCount: 127,
  specialties: ["Editor de video", "Videógrafo"],
  tags: ["Reels", "YouTube", "Documental", "Bodas"],
  portfolioCount: 23,
  price: {
    min: 200,
    currency: "USD"
  },
  experience: 8,
  userId: 14
};

// Reseñas para el perfil interactivo
const editorReviews: Review[] = [
  {
    id: 1,
    author: "Carlos Mendoza",
    company: "NexTech Media",
    rating: 5,
    date: "12 de marzo, 2025",
    comment: "Excelente trabajo en la edición de nuestro video corporativo. Mauricio entendió perfectamente nuestra visión y entregó un resultado excepcional. Definitivamente volveremos a trabajar juntos."
  },
  {
    id: 2,
    author: "Ana Gutiérrez",
    company: "Freelance",
    rating: 5,
    date: "27 de febrero, 2025",
    comment: "Mauricio tiene un gran ojo para el detalle y la narrativa visual. La edición de mi documental quedó impecable y captó exactamente la emoción que buscaba transmitir."
  },
  {
    id: 3,
    author: "Miguel Torres",
    company: "StartupLATAM",
    rating: 4,
    date: "5 de febrero, 2025",
    comment: "Muy profesional y entregó antes del plazo acordado. La comunicación fue fluida y las revisiones se realizaron sin problemas. Recomendado para cualquier proyecto."
  }
];

const EditorInteractiveProfile = () => {
  const [activeTab, setActiveTab] = useState<'portafolio' | 'equipamiento' | 'tarifas' | 'reseñas'>('portafolio');
  
  // Tipos para los datos de la API
  interface UserData {
    id: number;
    email: string;
    name: string;
    profilePicture: string;
    bio: string;
    country: string;
    timezone: string;
    yearsOfExperience: number;
    userType: string;
    createdAt: string;
  }

  interface EditorProfileData {
    id: number;
    userId: number;
    software: number[];
    editingStyles: number[];
    equipment: string[];
    basicRate: number;
    mediumRate: number;
    advancedRate: number;
    weeklyAvailability: Record<string, boolean>;
    paymentMethods: string[];
    technologyTags: string[];
    experience: string;
    expertise: string[];
    professionalType: string;
    viewCount: number;
    contactClickCount: number;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }

  // Obtener el usuario admin (ID:14 - Mauricio)
  const { data: adminUser, isLoading: isLoadingUser } = useQuery<UserData>({
    queryKey: ['/api/users/14'],
    enabled: true,
  });
  
  // Obtener el perfil del editor del admin
  const { data: adminProfile, isLoading: isLoadingProfile } = useQuery<EditorProfileData>({
    queryKey: ['/api/editor-profiles/user/14'],
    enabled: true,
  });
  
  // Estado de carga
  const isLoading = isLoadingUser || isLoadingProfile;
  
  // Mensaje para debugging
  console.log("adminUser:", adminUser);
  console.log("adminProfile:", adminProfile);
  
  // Combinar datos del perfil con el fallback
  const editorProfile = adminProfile && adminUser ? {
    id: adminProfile?.id ?? fallbackEditorProfile.id,
    userId: adminProfile?.userId ?? fallbackEditorProfile.userId,
    name: adminUser?.name ?? fallbackEditorProfile.name,
    profilePicture: adminUser?.profilePicture ?? fallbackEditorProfile.profilePicture,
    location: adminUser?.country ? 
      `${countries.find(c => c.code === adminUser.country)?.flag || ''} ${countries.find(c => c.code === adminUser.country)?.name || adminUser.country}` : 
      fallbackEditorProfile.location,
    country: adminUser?.country ?? fallbackEditorProfile.country,
    verified: true,
    rating: 4.9, // Datos estáticos para la demo
    reviewCount: 127, // Datos estáticos para la demo
    specialties: ["Editor de video", "Videógrafo"],
    tags: (adminProfile?.technologyTags as string[]) ?? fallbackEditorProfile.tags,
    portfolioCount: 23, // Se podría obtener de la API
    price: {
      min: adminProfile?.basicRate ?? fallbackEditorProfile.price.min,
      currency: "USD"
    },
    experience: adminUser?.yearsOfExperience ?? fallbackEditorProfile.experience
  } : fallbackEditorProfile;

  // Renderizar estrellas para el rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div id="editor-profile" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Explora perfiles únicos</h2>
          <p className="text-gray-600 mt-2">
            Descubre por qué nuestros perfiles destacan en el mercado con información detallada y verificada
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center my-12">
            <Loader2 className="h-12 w-12 animate-spin text-[#0050FF]" />
            <span className="ml-2 text-lg text-gray-600">Cargando perfil...</span>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-200 max-w-5xl mx-auto">
              {/* Cabecera del perfil */}
              <div className="flex flex-col md:flex-row">
                {/* Foto de perfil y detalles básicos */}
                <div className="md:w-1/3 flex flex-col items-center p-6 text-center border-r border-gray-200">
                  <img 
                    src={editorProfile.profilePicture} 
                    alt={editorProfile.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold flex items-center gap-1">
                    {editorProfile.name}
                    {editorProfile.verified && (
                      <span className="text-[#020617]" title="Perfil verificado">
                        <CheckCircle className="w-4 h-4 fill-[#020617]" />
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{editorProfile.location}</p>
                  
                  <div className="flex justify-center mb-4">
                    {renderRating(editorProfile.rating)}
                    <span className="text-gray-500 text-sm ml-1">({editorProfile.reviewCount})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {editorProfile.specialties.map((specialty, idx) => (
                      <Badge key={idx} className="bg-[#020617]/10 text-[#020617] border-0">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 w-full mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center shadow-sm">
                      <p className="text-md font-bold text-[#020617]">{editorProfile.portfolioCount}</p>
                      <p className="text-xs text-gray-600">Proyectos</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-3 text-center shadow-sm">
                      <p className="text-md font-bold text-[#020617]">${editorProfile.price.min}</p>
                      <p className="text-xs text-gray-600">Desde</p>
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg p-3 text-center shadow-sm">
                      <p className="text-md font-bold text-[#020617]">{editorProfile.experience}</p>
                      <p className="text-xs text-gray-600">Años exp.</p>
                    </div>
                  </div>
                  
                  <Link href={`/editor/${editorProfile.id}`}>
                    <Button className="w-full bg-[#020617] hover:bg-[#1E293B] py-5 font-medium text-base shadow-md transition-all hover:shadow-lg">
                      Ver perfil completo
                    </Button>
                  </Link>
                </div>
                
                {/* Contenido de las pestañas */}
                <div className="md:w-2/3 flex flex-col">
                  {/* Barra de pestañas con scroll horizontal en móvil */}
                  <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-200">
                    <button 
                      className={`px-4 md:px-6 py-3 text-sm font-medium ${activeTab === 'portafolio' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('portafolio')}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Portafolio</span>
                      </div>
                    </button>
                    <button 
                      className={`px-4 md:px-6 py-3 text-sm font-medium ${activeTab === 'equipamiento' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('equipamiento')}
                    >
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        <span>Equipamiento</span>
                      </div>
                    </button>
                    <button 
                      className={`px-4 md:px-6 py-3 text-sm font-medium ${activeTab === 'tarifas' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('tarifas')}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Tarifas</span>
                      </div>
                    </button>
                    <button 
                      className={`px-4 md:px-6 py-3 text-sm font-medium ${activeTab === 'reseñas' ? 'text-[#0050FF] border-b-2 border-[#0050FF]' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('reseñas')}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Reseñas</span>
                      </div>
                    </button>
                  </div>
                  
                  {/* Contenido de la pestaña */}
                  <div className="p-6">
                    {activeTab === 'portafolio' && (
                      <div>
                        <h4 className="text-lg font-medium mb-4">Proyectos destacados</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Miniatura de Reel 1 */}
                          <div className="relative rounded-lg overflow-hidden shadow-md">
                            <div className="bg-gradient-to-b from-gray-700 to-gray-900 aspect-[9/16] md:aspect-video flex items-center justify-center relative">
                              <div className="absolute inset-0 opacity-60 bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=300)' }}></div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                                </div>
                                <span className="text-xs text-white">00:25</span>
                              </div>
                            </div>
                            <div className="p-2 text-sm font-medium">Reel promocional para marca de cosmética</div>
                          </div>

                          {/* Miniatura de Reel 2 */}
                          <div className="relative rounded-lg overflow-hidden shadow-md">
                            <div className="bg-gradient-to-b from-gray-700 to-gray-900 aspect-[9/16] md:aspect-video flex items-center justify-center relative">
                              <div className="absolute inset-0 opacity-60 bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551292831-023188e78222?q=80&w=300)' }}></div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                                </div>
                                <span className="text-xs text-white">00:58</span>
                              </div>
                            </div>
                            <div className="p-2 text-sm font-medium">Edición ejecutiva para StartupLATAM</div>
                          </div>

                          {/* Miniatura de Reel 3 */}
                          <div className="relative rounded-lg overflow-hidden shadow-md">
                            <div className="bg-gradient-to-b from-gray-700 to-gray-900 aspect-[9/16] md:aspect-video flex items-center justify-center relative">
                              <div className="absolute inset-0 opacity-60 bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300)' }}></div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                                </div>
                                <span className="text-xs text-white">01:43</span>
                              </div>
                            </div>
                            <div className="p-2 text-sm font-medium">Documental - Extracto comercial</div>
                          </div>

                          {/* Miniatura de Reel 4 */}
                          <div className="relative rounded-lg overflow-hidden shadow-md">
                            <div className="bg-gradient-to-b from-gray-700 to-gray-900 aspect-[9/16] md:aspect-video flex items-center justify-center relative">
                              <div className="absolute inset-0 opacity-60 bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=300)' }}></div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                                </div>
                                <span className="text-xs text-white">00:36</span>
                              </div>
                            </div>
                            <div className="p-2 text-sm font-medium">Vídeo de producto con técnica cinemática</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'equipamiento' && (
                      <div>
                        <h4 className="text-lg font-medium mb-4">Equipo de trabajo</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                            <div className="mr-3 bg-blue-100 p-2 rounded-full">
                              <Monitor className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-800">MacBook Pro M1 Max</span>
                          </div>
                          <div className="flex items-center p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-sm">
                            <div className="mr-3 bg-indigo-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-800">Cámara Sony A7III</span>
                          </div>
                          <div className="flex items-center p-3 bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg shadow-sm">
                            <div className="mr-3 bg-sky-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-800">Micrófono Rode PodMic</span>
                          </div>
                          <div className="flex items-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm">
                            <div className="mr-3 bg-purple-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-800">Iluminación Aputure</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'tarifas' && (
                      <div>
                        <h4 className="text-lg font-medium mb-4">Paquetes y tarifas</h4>
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 shadow-sm transition-all hover:shadow-md">
                            <h5 className="font-medium text-blue-700">Paquete Básico</h5>
                            <p className="text-2xl text-[#020617] font-bold my-2">${editorProfile.price.min}</p>
                            <p className="text-sm text-gray-700">Edición básica de video, hasta 5 minutos de duración.</p>
                          </div>
                          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-5 shadow-sm transition-all hover:shadow-md">
                            <h5 className="font-medium text-indigo-700">Paquete Estándar</h5>
                            <p className="text-2xl text-[#0050FF] font-bold my-2">${editorProfile.price.min * 2}</p>
                            <p className="text-sm text-gray-700">Edición profesional con efectos básicos, hasta 10 minutos.</p>
                          </div>
                          <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg p-5 shadow-sm transition-all hover:shadow-md">
                            <h5 className="font-medium text-sky-700">Paquete Premium</h5>
                            <p className="text-2xl text-[#0050FF] font-bold my-2">${editorProfile.price.min * 3}</p>
                            <p className="text-sm text-gray-700">Edición avanzada con efectos, corrección de color y hasta 20 minutos.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'reseñas' && (
                      <div>
                        <h4 className="text-lg font-medium mb-4">Lo que dicen los clientes</h4>
                        <div className="space-y-4">
                          {editorReviews.map(review => (
                            <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 shadow-sm border border-gray-100">
                              <div className="flex items-start mb-3">
                                <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mr-3 text-blue-600 font-bold">
                                  {review.author.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                      <h5 className="font-medium text-gray-900">{review.author}</h5>
                                      <p className="text-xs text-gray-500">{review.company}</p>
                                    </div>
                                    <div className="flex items-center mt-1 md:mt-0">
                                      <div className="flex mr-2">
                                        {[...Array(5)].map((_, i) => (
                                          <Star 
                                            key={i} 
                                            className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="pl-0 md:pl-13">
                                <p className="text-gray-700 text-sm leading-relaxed italic">"{review.comment}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="p-5 bg-gradient-to-b from-gray-50 to-white flex justify-end">
                <Button 
                  className="bg-[#0050FF] hover:bg-[#0040E0] text-white py-6 px-6 font-medium shadow-md transition-all hover:shadow-lg"
                  asChild
                >
                  <Link href={`/editor/${editorProfile.id}`}>
                    Ver perfil completo
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Botón para explorar más */}
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="border-[#0050FF] text-[#0050FF] hover:bg-[#0050FF]/5 py-6 px-8 text-base font-medium"
                asChild
              >
                <Link href="/search">Explorar todos los editores</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditorInteractiveProfile;