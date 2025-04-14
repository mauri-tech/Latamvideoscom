import { CalendarDays, MapPin, EyeIcon, MailIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    bio?: string;
    basicRate: number;
    viewCount: number;
    country: string;
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

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 shadow-lg border-4 border-white">
              {editor.profilePicture ? (
                <img 
                  src={editor.profilePicture} 
                  alt={`Foto de ${editor.name}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-semibold text-[#1c1c1e]">{editor.name}</h2>
            
            <div className="flex items-center justify-center text-[#525252] text-sm mt-1 mb-2">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span>{editor.location}</span>
            </div>
            
            <div className="flex items-center justify-center text-[#525252] text-sm mb-6">
              <EyeIcon className="h-4 w-4 mr-1 text-primary" />
              <span>{editor.viewCount} visitas al perfil</span>
            </div>
            
            <Button 
              onClick={handleContactClick} 
              className="w-full bg-primary text-white hover:bg-primary/90 transition-all py-6 rounded-md shadow-md hover:shadow-lg hover:translate-y-[-2px]"
              disabled={contactLoading}
            >
              <MailIcon className="h-5 w-5 mr-2" />
              Contactar
            </Button>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6 border-b pb-4">
              <h3 className="text-md font-medium mb-2 flex items-center">
                <UserIcon className="h-4 w-4 mr-2 text-primary" />
                Acerca de mí
              </h3>
              <p className="text-sm leading-relaxed text-[#1c1c1e]">
                {editor.bio || `Soy editor de video con ${editor.experience}. Especializado en crear contenido visual impactante para diversas plataformas.`}
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm text-[#1c1c1e] font-medium mb-2">Software</h3>
              <div className="flex flex-wrap gap-2">
                {editor.software.map((item, index) => (
                  <Badge key={index} variant="secondary" className="bg-[#0050FF]/10 hover:bg-[#0050FF]/15 text-[#0050FF] border-none">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm text-[#1c1c1e] font-medium mb-2">Estilos de edición</h3>
              <div className="flex flex-wrap gap-2">
                {editor.styles.map((style, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-none">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm text-[#1c1c1e] font-medium mb-2">Experiencia</h3>
              <p className="text-sm text-[#525252]">{editor.experience}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm text-[#1c1c1e] font-medium mb-2">Tarifas desde</h3>
              <div className="text-2xl font-bold text-primary">
                ${editor.basicRate} <span className="text-sm font-normal text-[#8E8E93]">USD</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-[#1c1c1e] font-medium mb-2">Disponibilidad</h3>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm text-[#525252]">Lunes a Viernes</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
