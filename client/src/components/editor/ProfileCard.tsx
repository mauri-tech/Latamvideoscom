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
    <Card className="shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden bg-white rounded-2xl border-0">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Información del profesional */}
          <div className="lg:w-1/3 bg-gray-50 p-8 flex flex-col items-center text-center border-r border-gray-100 relative overflow-hidden">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-white mb-6 p-1 shadow-sm relative z-10">
              {editor.profilePicture ? (
                <img
                  src={editor.profilePicture}
                  alt={`Foto de ${editor.name}`}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 rounded-full">
                  <UserIcon className="w-16 h-16 opacity-50" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-1">{editor.name}</h2>

            <div className="flex items-center justify-center text-muted-foreground text-sm mb-6">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{editor.location}</span>
            </div>

            {/* Estadísticas clave */}
            <div className="grid grid-cols-2 gap-3 w-full mb-8 relative z-10">
              <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow-sm border border-gray-100">
                <BriefcaseIcon className="h-5 w-5 text-primary mb-2" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Experiencia</span>
                <span className="text-lg font-bold text-foreground mt-1">{editor.yearsOfExperience || "N/A"} años</span>
              </div>

              <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow-sm border border-gray-100">
                <DollarSignIcon className="h-5 w-5 text-primary mb-2" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Desde</span>
                <span className="text-lg font-bold text-foreground mt-1">${editor.basicRate}</span>
              </div>
            </div>

            {/* Tags y Especialidades */}
            {(editor.technologyTags && editor.technologyTags.length > 0) && (
              <div className="w-full mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 text-left">Tecnologías</h3>
                <div className="flex flex-wrap gap-2 justify-start">
                  {editor.technologyTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-white hover:bg-gray-100 text-foreground border border-gray-100 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Visitas y Métricas */}
            <div className="mt-auto w-full mb-6 flex items-center justify-center text-muted-foreground text-sm">
              <EyeIcon className="h-4 w-4 mr-1" />
              <span>{editor.viewCount} visitas</span>
            </div>

            {/* Botón de contacto */}
            <CustomButton
              variant="dark"
              size="lg"
              onClick={handleContactClick}
              className="w-full py-6 rounded-xl shadow-md font-bold text-base"
              disabled={contactLoading}
            >
              <MailIcon className="h-5 w-5 mr-2" />
              Contactar
            </CustomButton>
          </div>

          {/* Área principal - Datos del profesional */}
          <div className="lg:w-2/3 p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-foreground flex items-center">
                Acerca de mí
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {editor.bio || `Soy editor de video con ${editor.experience}. Especializado en crear contenido visual impactante para diversas plataformas.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              {/* Software */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center">
                  Software
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editor.software && editor.software.length > 0 ? (
                    editor.software.map((item, index) => (
                      <Link key={index} href={`/search?software=${encodeURIComponent(item)}`}>
                        <Badge variant="secondary" className="bg-primary/5 hover:bg-primary/10 text-primary border-0 cursor-pointer transition-colors px-3 py-1 text-sm font-medium">
                          {item}
                        </Badge>
                      </Link>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No especificado</span>
                  )}
                </div>
              </div>

              {/* Estilos de edición */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center">
                  Estilos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {editor.styles && editor.styles.length > 0 ? (
                    editor.styles.map((style, index) => (
                      <Link key={index} href={`/search?style=${encodeURIComponent(style)}`}>
                        <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-foreground border-0 cursor-pointer transition-colors px-3 py-1 text-sm">
                          {style}
                        </Badge>
                      </Link>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No especificado</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-0">
              {/* Tarifas */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center">
                  Tarifas
                </h3>
                <div className="space-y-3 bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <span className="text-muted-foreground font-medium">Básico</span>
                    <span className="font-bold text-foreground">${editor.basicRate}</span>
                  </div>
                  {editor.mediumRate && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                      <span className="text-muted-foreground font-medium">Estándar</span>
                      <span className="font-bold text-foreground">${editor.mediumRate}</span>
                    </div>
                  )}
                  {editor.advancedRate && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                      <span className="text-muted-foreground font-medium">Premium</span>
                      <span className="font-bold text-foreground">${editor.advancedRate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Disponibilidad */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center">
                  Disponibilidad
                </h3>
                <div className="flex items-center bg-gray-50 rounded-xl p-5 border border-gray-100 text-foreground font-medium">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span>{getAvailabilityText()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
