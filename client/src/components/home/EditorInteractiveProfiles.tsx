import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Package, 
  Monitor, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react';

// Tipo para el perfil de editor
interface EditorProfile {
  id: number;
  name: string;
  verified: boolean;
  profilePicture: string;
  country: string;
  city: string;
  specialties: string[];
  bio: string;
  experience: number;
  languages: string[];
  styles: string[];
  clients: string[];
  portfolio: {
    title: string;
    type: string;
    thumbnail: string;
    description: string;
  }[];
  equipment: {
    category: string;
    item: string;
  }[];
  software: string[];
  rates: {
    basic: {
      price: number;
      description: string;
      deliveryTime: string;
      includes: string[];
    };
    standard: {
      price: number;
      description: string;
      deliveryTime: string;
      includes: string[];
    };
    premium: {
      price: number;
      description: string;
      deliveryTime: string;
      includes: string[];
    };
  };
  reviews: {
    rating: number;
    count: number;
    recent: {
      author: string;
      text: string;
      rating: number;
    }[];
  };
}

// Datos de los perfiles de editores
const profiles: EditorProfile[] = [
  {
    id: 1,
    name: "Mauricio Treviño Botticelli",
    verified: true,
    profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    country: "México",
    city: "Ciudad de México",
    specialties: ["Editor de video", "Videógrafo", "Director de fotografía"],
    bio: "Especialista en contenido visual para redes, campañas y documentales. 5 años de experiencia en edición, grabación y postproducción. Mi enfoque se centra en narrativa visual y colorimetría para lograr un impacto emocional.",
    experience: 5,
    languages: ["Español (nativo)", "Inglés (avanzado)", "Portugués (intermedio)"],
    styles: ["🎬 Reels", "🎥 YouTube", "🎙️ Podcast", "📽️ Documental", "📸 Bodas"],
    clients: ["Netflix México", "Sony Music", "Televisa", "Red Bull LATAM"],
    portfolio: [
      {
        title: "Documental 'Alas de Libertad'",
        type: "Documental",
        description: "Serie documental sobre conservación de aves en Latinoamérica. Nominado en el Festival de Cine Ambiental.",
        thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      },
      {
        title: "Campaña 'Ritmos Urbanos'",
        type: "Comercial",
        description: "Campaña para Sony Music promocionando artistas urbanos emergentes en 5 países de LATAM.",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      },
      {
        title: "Podcast 'Voces del Cine'",
        type: "Podcast",
        description: "Serie de entrevistas con directores latinoamericanos sobre el proceso creativo cinematográfico.",
        thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      }
    ],
    equipment: [
      { category: "Cámara", item: "Sony Alpha 7 IV" },
      { category: "Lentes", item: "Sigma 24-70mm f/2.8 y 70-200mm f/2.8" },
      { category: "Computadora", item: "Mac Mini Pro M4 con 32GB RAM" },
      { category: "Iluminación", item: "Kit Godox SL-60W y Neewer RGB" },
      { category: "Cámaras extra", item: "Insta360 X4, GoPro Hero 12" }
    ],
    software: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Cinema 4D", "Logic Pro X"],
    rates: {
      basic: {
        price: 200,
        description: "Edición simple para redes sociales o YouTube",
        deliveryTime: "2-3 días",
        includes: ["1 revisión", "Hasta 3 minutos", "Música de librería", "Color básico"]
      },
      standard: {
        price: 350,
        description: "Edición profesional con efectos y transiciones",
        deliveryTime: "4-5 días",
        includes: ["3 revisiones", "Hasta 10 minutos", "Efectos visuales", "Corrección de color avanzada", "Mezcla de audio"]
      },
      premium: {
        price: 500,
        description: "Edición avanzada con tratamiento cinematográfico",
        deliveryTime: "7-10 días",
        includes: ["Revisiones ilimitadas", "Duración personalizada", "Efectos especiales", "Colorimetría profesional", "Diseño sonoro", "Animación de gráficos"]
      }
    },
    reviews: {
      rating: 4.9,
      count: 127,
      recent: [
        {
          author: "Sony Music LATAM",
          text: "Mauricio entendió perfectamente nuestro concepto y lo llevó más allá. El resultado fue impresionante y generó un gran impacto en redes.",
          rating: 5
        },
        {
          author: "Festival DocMX",
          text: "Su visión cinematográfica y capacidad narrativa hicieron que nuestro documental destacara. Excelente manejo del tiempo y la emoción.",
          rating: 5
        }
      ]
    }
  },
  {
    id: 2,
    name: "Valentina Quiroga Méndez",
    verified: true,
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    country: "Colombia",
    city: "Bogotá",
    specialties: ["Editora creativa", "Motion graphics", "Colorista"],
    bio: "Artista visual y editora con 7 años de experiencia en publicidad y cine. Especializada en narrativas dinámicas y estética visual distintiva para marcas de lujo y proyectos culturales.",
    experience: 7,
    languages: ["Español (nativo)", "Inglés (fluido)", "Francés (básico)"],
    styles: ["✨ Motion Graphics", "🎞️ Cinematográfico", "🎨 Experimental", "🎭 Publicidad", "📱 Social Media"],
    clients: ["Dior Latinoamérica", "Canal Caracol", "Festival de Cine de Cartagena", "Avianca"],
    portfolio: [
      {
        title: "Campaña 'Esencia Colombiana'",
        type: "Publicidad",
        description: "Serie de spots para Dior destacando artesanía colombiana. Ganó premio Cannes Lions en categoría Craft.",
        thumbnail: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      },
      {
        title: "Secuencias de títulos Festival FICCI",
        type: "Motion Graphics",
        description: "Diseño y animación de secuencias de apertura para el Festival Internacional de Cine de Cartagena.",
        thumbnail: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      },
      {
        title: "Colores de mi Tierra",
        type: "Documental",
        description: "Documental sobre expresiones artísticas contemporáneas en Colombia, con énfasis en colorimetría expresiva.",
        thumbnail: "https://images.unsplash.com/photo-1605702397326-f2f3913a0153?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      }
    ],
    equipment: [
      { category: "Computadora", item: "MacBook Pro M2 Max 64GB RAM" },
      { category: "Monitores", item: "Dual Apple Studio Display y Eizo ColorEdge" },
      { category: "Tableta", item: "Wacom Intuos Pro Large" },
      { category: "Panel de control", item: "Loupedeck CT y Blackmagic Micro Panel" },
      { category: "Audio", item: "Auriculares AKG K712 PRO" }
    ],
    software: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve Studio", "Cinema 4D", "Mocha Pro", "Photoshop"],
    rates: {
      basic: {
        price: 300,
        description: "Edición creativa para redes y plataformas digitales",
        deliveryTime: "3-4 días",
        includes: ["2 revisiones", "Hasta 2 minutos", "Tratamiento de color", "Animaciones básicas"]
      },
      standard: {
        price: 500,
        description: "Edición y dirección visual con estilo cinematográfico",
        deliveryTime: "5-7 días",
        includes: ["3 revisiones", "Hasta 5 minutos", "Diseño visual personalizado", "Motion graphics", "Look cinematográfico"]
      },
      premium: {
        price: 800,
        description: "Paquete completo de producción visual y narrativa",
        deliveryTime: "10-14 días",
        includes: ["Revisiones ilimitadas", "Duración personalizada", "Dirección creativa", "Animaciones complejas", "Grade de color premium", "Entregables en múltiples formatos"]
      }
    },
    reviews: {
      rating: 4.8,
      count: 94,
      recent: [
        {
          author: "Dior LATAM",
          text: "Valentina capturó perfectamente la esencia de nuestra marca mientras incorporaba elementos culturales locales. Su ojo para el color y detalle es extraordinario.",
          rating: 5
        },
        {
          author: "Festival FICCI",
          text: "Su trabajo en motion graphics elevó la identidad visual del festival. Profesional, creativa y excelente comunicación durante todo el proceso.",
          rating: 5
        }
      ]
    }
  },
  {
    id: 3,
    name: "Gabriel Fernández Rojas",
    verified: true,
    profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    country: "Argentina",
    city: "Buenos Aires",
    specialties: ["Editor de cine", "Montajista", "Narrador visual"],
    bio: "Editor cinematográfico con 12 años de experiencia en largometrajes y series. Formado en ENERC y especializado en narrativa, ritmo y estructura dramática. Mi trabajo ha sido seleccionado en festivales como San Sebastián, BAFICI y Sundance.",
    experience: 12,
    languages: ["Español (nativo)", "Inglés (avanzado)", "Italiano (intermedio)"],
    styles: ["🎬 Ficción", "🎭 Drama", "🎞️ Documental", "📺 Series", "🎨 Experimental"],
    clients: ["Netflix Argentina", "Canal Encuentro", "Patagonik Film Group", "HBO Latinoamérica"],
    portfolio: [
      {
        title: "La Luz Distante",
        type: "Largometraje",
        description: "Drama premiado en el Festival de San Sebastián. Editor principal con énfasis en estructura narrativa no lineal.",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      },
      {
        title: "Historias de la Pampa",
        type: "Serie Documental",
        description: "Serie de 8 episodios para Netflix sobre relatos rurales argentinos. Nominada a los Premios Platino.",
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      },
      {
        title: "El Último Tango",
        type: "Corto Experimental",
        description: "Cortometraje experimental sobre la evolución del tango. Selección oficial en BAFICI y Premio del Jurado.",
        thumbnail: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80"
      }
    ],
    equipment: [
      { category: "Estación de trabajo", item: "Mac Pro (2023) con 128GB RAM y GPU M2 Ultra" },
      { category: "Almacenamiento", item: "Sistema RAID 20TB + respaldo en la nube" },
      { category: "Pantallas", item: "Doble monitor profesional calibrado + TV OLED 4K" },
      { category: "Audio", item: "Sistema de monitoreo KRK con mezclador Focusrite" },
      { category: "Periféricos", item: "Controlador Avid Artist Color y consola Artist Mix" }
    ],
    software: ["Avid Media Composer", "DaVinci Resolve Studio", "Adobe Premiere Pro", "Pro Tools", "Final Cut Pro"],
    rates: {
      basic: {
        price: 450,
        description: "Montaje de cortometrajes o contenido digital premiun",
        deliveryTime: "5-7 días",
        includes: ["3 revisiones", "Hasta 15 minutos", "Estructura narrativa", "Corte y ajuste fino"]
      },
      standard: {
        price: 800,
        description: "Edición de proyectos extensos con tratamiento cinematográfico",
        deliveryTime: "14-21 días",
        includes: ["5 revisiones", "Hasta 30 minutos", "Diseño narrativo", "Supervisión de sonido", "Coordinación con colorista"]
      },
      premium: {
        price: 1500,
        description: "Edición integral para largometrajes o series completas",
        deliveryTime: "Personalizado",
        includes: ["Proceso iterativo completo", "Múltiples cortes", "Consultoría narrativa", "Supervisión de postproducción", "Entregables para distribución"]
      }
    },
    reviews: {
      rating: 4.9,
      count: 73,
      recent: [
        {
          author: "Netflix LATAM Productions",
          text: "Gabriel transformó nuestro material en una narrativa coherente y emocionante. Su capacidad para encontrar el ritmo perfecto y construir personajes a través del montaje es insuperable.",
          rating: 5
        },
        {
          author: "Festival de Cine de Mar del Plata",
          text: "Su trabajo editorial en 'La Luz Distante' demostró una sensibilidad extraordinaria. La estructura no lineal resultó perfectamente comprensible y emocionalmente impactante.",
          rating: 5
        }
      ]
    }
  }
];

// Opciones de pestañas 
const tabs = [
  { id: 'info', label: 'Información', icon: <Monitor className="w-4 h-4" /> },
  { id: 'portfolio', label: 'Portafolio', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'equipment', label: 'Equipamiento', icon: <Package className="w-4 h-4" /> },
  { id: 'rates', label: 'Tarifas', icon: <DollarSign className="w-4 h-4" /> }
];

const EditorInteractiveProfiles = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  
  // Referencia para el scroll de perfiles
  const profilesContainerRef = useRef<HTMLDivElement>(null);
  
  // Perfil activo actualmente
  const profile = profiles[currentProfileIndex];
  
  // Navegación entre perfiles
  const nextProfile = () => {
    setCurrentProfileIndex((prev) => 
      prev === profiles.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevProfile = () => {
    setCurrentProfileIndex((prev) => 
      prev === 0 ? profiles.length - 1 : prev - 1
    );
  };
  
  // Función para renderizar las estrellas de rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ));
  };
  
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-bold mb-4 text-center">Perfiles de Editores Destacados</h3>
        <p className="text-[#8E8E93] mb-10 text-center max-w-2xl mx-auto">
          Explora los perfiles interactivos de nuestros mejores editores. Navega entre las diferentes secciones para conocer su trabajo, equipamiento y tarifas.
        </p>
        
        {/* Navegación entre perfiles y contador */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={prevProfile}
            className="p-2 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#8E8E93]" />
          </button>
          
          <div className="text-sm text-[#8E8E93]">
            Perfil {currentProfileIndex + 1} de {profiles.length}
          </div>
          
          <button 
            onClick={nextProfile}
            className="p-2 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#8E8E93]" />
          </button>
        </div>
        
        {/* Tarjeta del perfil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
          {/* Cabecera con gradiente */}
          <div className="bg-gradient-to-r from-[#0093E9] to-[#80D0C7] p-6 text-center relative">
            {/* Efecto de brillo */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-white opacity-10 blur-2xl"></div>
            
            {/* Badge de verificación */}
            {profile.verified && (
              <div className="absolute top-4 right-4 bg-[#007AFF] text-white text-xs py-1 px-2 rounded-full flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verificado
              </div>
            )}
            
            <img 
              src={profile.profilePicture} 
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
            />
            <h3 className="font-bold text-xl text-white mt-3">{profile.name}</h3>
            
            <div className="flex items-center justify-center mt-1 text-white/90 text-sm">
              <MapPin className="w-3 h-3 mr-1" /> 
              {profile.city}, {profile.country}
            </div>
            
            <div className="flex items-center justify-center mt-2 space-x-1">
              {renderStars(profile.reviews.rating)}
              <span className="text-white/90 text-sm ml-1">
                ({profile.reviews.rating}) · {profile.reviews.count} reseñas
              </span>
            </div>
            
            <div className="flex items-center justify-center mt-2 text-white/90 text-sm">
              <Clock className="w-3 h-3 mr-1" />
              {profile.experience} años de experiencia
            </div>
          </div>
          
          {/* Navegación de pestañas */}
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center py-3 px-4 transition ${
                  activeTab === tab.id
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF] font-medium'
                    : 'text-gray-500 hover:text-[#007AFF]'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Contenido de las pestañas */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div>
                <h4 className="font-medium mb-3">Biografía</h4>
                <p className="text-gray-700 mb-5">{profile.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="font-medium mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.specialties.map((specialty, i) => (
                        <Badge key={i} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <h4 className="font-medium mb-2">Estilos</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.styles.map((style, i) => (
                        <Badge key={i} className="bg-[#007AFF]/5 text-[#007AFF] border-0">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Clientes destacados</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {profile.clients.map((client, i) => (
                        <li key={i}>{client}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium mb-2">Idiomas</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {profile.languages.map((language, i) => (
                        <li key={i}>{language}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Reseñas recientes */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Reseñas recientes</h4>
                  <div className="space-y-4">
                    {profile.reviews.recent.map((review, i) => (
                      <div key={i} className="bg-[#F5F5F7] p-4 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <h5 className="font-medium">{review.author}</h5>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-sm text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'portfolio' && (
              <div>
                <h4 className="font-medium mb-4">Proyectos destacados</h4>
                <div className="space-y-6">
                  {profile.portfolio.map((item, i) => (
                    <div key={i} className="bg-[#F5F5F7] rounded-lg overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium text-lg">{item.title}</h5>
                          <Badge className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'equipment' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Equipamiento profesional</h4>
                    <div className="space-y-3">
                      {profile.equipment.map((item, i) => (
                        <div key={i} className="p-3 bg-[#F5F5F7] rounded-lg">
                          <span className="font-medium text-[#007AFF]">{item.category}: </span>
                          <span>{item.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Software</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.software.map((item, i) => (
                        <Badge key={i} variant="outline" className="bg-[#F5F5F7]">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'rates' && (
              <div>
                <h4 className="font-medium mb-4">Planes de servicio</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Básico</h5>
                      <span className="text-[#007AFF] font-bold">${profile.rates.basic.price} USD</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{profile.rates.basic.description}</p>
                    <div className="text-xs text-gray-500 mb-3">
                      Tiempo de entrega: <span className="font-medium">{profile.rates.basic.deliveryTime}</span>
                    </div>
                    <h6 className="text-xs font-medium mb-1">Incluye:</h6>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {profile.rates.basic.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-[#007AFF] mr-1 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-2 border-[#007AFF] rounded-lg p-4 bg-[#007AFF]/5 relative">
                    <div className="absolute -top-3 right-4 bg-[#007AFF] text-white text-xs py-1 px-2 rounded-full">
                      Popular
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Estándar</h5>
                      <span className="text-[#007AFF] font-bold">${profile.rates.standard.price} USD</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{profile.rates.standard.description}</p>
                    <div className="text-xs text-gray-500 mb-3">
                      Tiempo de entrega: <span className="font-medium">{profile.rates.standard.deliveryTime}</span>
                    </div>
                    <h6 className="text-xs font-medium mb-1">Incluye:</h6>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {profile.rates.standard.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-[#007AFF] mr-1 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Premium</h5>
                      <span className="text-[#007AFF] font-bold">${profile.rates.premium.price} USD</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{profile.rates.premium.description}</p>
                    <div className="text-xs text-gray-500 mb-3">
                      Tiempo de entrega: <span className="font-medium">{profile.rates.premium.deliveryTime}</span>
                    </div>
                    <h6 className="text-xs font-medium mb-1">Incluye:</h6>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {profile.rates.premium.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-[#007AFF] mr-1 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Botones de acción */}
          <div className="p-4 border-t border-gray-200 flex gap-4">
            <Link href={`/editor/${profile.id}`} className="flex-1">
              <Button className="w-full bg-[#007AFF] hover:bg-[#0069d9]">
                Ver perfil completo
              </Button>
            </Link>
            <Link href="/contactar" className="flex-1">
              <Button variant="outline" className="w-full border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/5">
                Contactar editor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;