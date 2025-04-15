import { CalendarDays, MapPin, EyeIcon, MailIcon, UserIcon, Star, BriefcaseIcon, DollarSignIcon, Clock } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { useState } from 'react';
import { Link } from 'wouter';

interface ProfileCardProps {
  editor: {
    id: number;
    name: string;
    profilePicture?: string;
    location: string;
    software: string[];
    styles: string[];
    experience: string;
    expertise?: string[];
    technologyTags?: string[];
    equipment?: string[];
    bio?: string;
    basicRate: number;
    mediumRate?: number;
    advancedRate?: number;
    viewCount: number;
    country: string;
    yearsOfExperience?: number;
    weeklyAvailability?: Record<string, boolean>;
  };
  onContactClick?: () => void;
}

const ProfileCard = ({ editor, onContactClick }: ProfileCardProps) => {
  const [contactLoading, setContactLoading] = useState(false);
  
  const handleContactClick = async () => {
    if (onContactClick) {
      setContactLoading(true);
      try {
        // Increment contact click count in the backend
        await apiRequest('POST', `/api/editor-profiles/${editor.id}/contact-click`, {});
        onContactClick();
      } catch (error) {
        console.error('Error incrementing contact clicks:', error);
      } finally {
        setContactLoading(false);
      }
    }
  };

  const getAvailabilityText = () => {
    if (!editor.weeklyAvailability) return "Lunes a Viernes";
    
    const days = {
      mon: "Lunes",
      tue: "Martes",
      wed: "Miércoles",
      thu: "Jueves",
      fri: "Viernes",
      sat: "Sábado",
      sun: "Domingo"
    };
    
    const availableDays = Object.entries(editor.weeklyAvailability)
      .filter(([_, isAvailable]) => isAvailable)
      .map(([day]) => days[day as keyof typeof days]);
    
    if (availableDays.length === 0) return "No especificada";
    if (availableDays.length === 7) return "Todos los días";
    
    return availableDays.join(", ");
  };

  return (
    <Card className="shadow-sm overflow-hidden bg-white rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Información del profesional */}
          <div className="lg:w-1/3 bg-[#F9F9F9] p-8 flex flex-col items-center text-center border-r border-gray-100">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200 mb-6 border-4 border-white shadow-lg">
              {editor.profilePicture ? (
                <img 
                  src={editor.profilePicture} 
                  alt={`Foto de ${editor.name}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                  <UserIcon className="w-16 h-16 opacity-30" />
                </div>
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-[#1c1c1e] mb-1">{editor.name}</h2>
            
            <div className="flex items-center justify-center text-[#525252] text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 text-primary/80" />
              <span>{editor.location}</span>
            </div>
            
            {/* Estadísticas clave */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="bg-[#F2F2F7] rounded-lg p-4 flex flex-col items-center">
                <BriefcaseIcon className="h-5 w-5 text-primary mb-1" />
                <span className="text-xs text-[#525252]">Experiencia</span>
                <span className="text-lg font-bold text-[#1c1c1e]">{editor.yearsOfExperience || "N/A"} años</span>
              </div>
              
              <div className="bg-[#F2F2F7] rounded-lg p-4 flex flex-col items-center">
                <DollarSignIcon className="h-5 w-5 text-primary mb-1" />
                <span className="text-xs text-[#525252]">Desde</span>
                <span className="text-lg font-bold text-[#1c1c1e]">${editor.basicRate} <small>USD</small></span>
              </div>
            </div>
            
            {/* Tags y Especialidades */}
            {(editor.technologyTags && editor.technologyTags.length > 0) && (
              <div className="w-full mb-6">
                <h3 className="text-sm font-semibold text-[#1c1c1e] mb-3 text-left">Tecnologías</h3>
                <div className="flex flex-wrap gap-2 justify-start">
                  {editor.technologyTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#A0C4FF] hover:bg-[#A0C4FF]/90 text-[#041C32] border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {(editor.expertise && editor.expertise.length > 0) && (
              <div className="w-full mb-6">
                <h3 className="text-sm font-semibold text-[#1c1c1e] mb-3 text-left">Especialización</h3>
                <div className="flex flex-wrap gap-2 justify-start">
                  {editor.expertise.map((item, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1c1c1e] border-none">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Visitas y Métricas */}
            <div className="mt-auto w-full mb-6 flex items-center text-[#525252] text-sm">
              <EyeIcon className="h-4 w-4 mr-1" />
              <span>{editor.viewCount} visitas al perfil</span>
            </div>
            
            {/* Botón de contacto */}
            <Button 
              onClick={handleContactClick} 
              className="w-full bg-[#0050FF] text-white hover:bg-[#0050FF]/90 transition-all py-6 rounded-md shadow-sm hover:shadow"
              disabled={contactLoading}
            >
              <MailIcon className="h-5 w-5 mr-2" />
              Contactar
            </Button>
            
            <Button 
              variant="outline"
              className="w-full mt-3 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all py-6 rounded-md"
            >
              Solicitar Cotización
            </Button>
          </div>
          
          {/* Área principal - Datos del profesional */}
          <div className="lg:w-2/3 p-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#1c1c1e] flex items-center">
                <span role="img" aria-label="Acerca de" className="mr-2">👨‍💻</span>
                Acerca de mí
              </h3>
              <p className="text-[#1c1c1e] leading-relaxed">
                {editor.bio || `Soy editor de video con ${editor.experience}. Especializado en crear contenido visual impactante para diversas plataformas.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Software */}
              <div>
                <h3 className="text-base font-semibold mb-4 text-[#1c1c1e] flex items-center">
                  <span role="img" aria-label="Software" className="mr-2">🖥️</span>
                  Software
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editor.software && editor.software.length > 0 ? (
                    editor.software.map((item, index) => (
                      <Link key={index} href={`/search?software=${encodeURIComponent(item)}`}>
                        <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-[#1c1c1e] border-none cursor-pointer transition-colors">
                          {item}
                        </Badge>
                      </Link>
                    ))
                  ) : (
                    <span className="text-[#8E8E93]">No especificado</span>
                  )}
                </div>
              </div>
              
              {/* Estilos de edición */}
              <div>
                <h3 className="text-base font-semibold mb-4 text-[#1c1c1e] flex items-center">
                  <span role="img" aria-label="Estilos" className="mr-2">🎨</span>
                  Estilos de edición
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editor.styles && editor.styles.length > 0 ? (
                    editor.styles.map((style, index) => (
                      <Link key={index} href={`/search?style=${encodeURIComponent(style)}`}>
                        <Badge variant="secondary" className="bg-[#0050FF]/10 hover:bg-[#0050FF]/20 text-[#0050FF] border-none cursor-pointer transition-colors">
                          {style}
                        </Badge>
                      </Link>
                    ))
                  ) : (
                    <span className="text-[#8E8E93]">No especificado</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Tarifas */}
              <div>
                <h3 className="text-base font-semibold mb-4 text-[#1c1c1e] flex items-center">
                  <span role="img" aria-label="Tarifas" className="mr-2">💰</span>
                  Tarifas
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#525252]">Básico:</span>
                    <span className="font-semibold text-[#1c1c1e]">${editor.basicRate} USD</span>
                  </div>
                  {editor.mediumRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#525252]">Estándar:</span>
                      <span className="font-semibold text-[#1c1c1e]">${editor.mediumRate} USD</span>
                    </div>
                  )}
                  {editor.advancedRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#525252]">Premium:</span>
                      <span className="font-semibold text-[#1c1c1e]">${editor.advancedRate} USD</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Disponibilidad */}
              <div>
                <h3 className="text-base font-semibold mb-4 text-[#1c1c1e] flex items-center">
                  <span role="img" aria-label="Disponibilidad" className="mr-2">📅</span>
                  Disponibilidad
                </h3>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-[#525252]">{getAvailabilityText()}</span>
                </div>
              </div>
            </div>
            
            {/* Equipo técnico */}
            {editor.equipment && editor.equipment.length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4 text-[#1c1c1e] flex items-center">
                  <span role="img" aria-label="Equipo" className="mr-2">⚙️</span>
                  Equipo técnico
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editor.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-[#F9F9F9] hover:bg-[#F2F2F7] text-[#525252] border-gray-200">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
