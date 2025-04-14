import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface EditorListProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

const EditorList = ({ filters }: EditorListProps) => {
  // In a real implementation, we would transform the filters into query parameters
  const filterParams = new URLSearchParams();
  
  if (filters.software && filters.software.length) {
    filterParams.set('software', filters.software.join(','));
  }
  
  if (filters.styles && filters.styles.length) {
    filterParams.set('editingStyles', filters.styles.join(','));
  }
  
  if (filters.maxRate) {
    filterParams.set('maxRate', filters.maxRate.toString());
  }
  
  const queryString = filterParams.toString();
  const queryKey = queryString ? `/api/editor-profiles?${queryString}` : '/api/editor-profiles';
  
  const { data: response, isLoading, error } = useQuery({
    queryKey: [queryKey],
    staleTime: 60000, // 1 minute
  });
  
  const editors = response?.results || [];
  
  // Function to get country name from country code
  const getCountryName = (countryCode: string) => {
    // This would typically be a lookup in a real implementation
    const countryMap: {[key: string]: string} = {
      'MX': 'México',
      'CO': 'Colombia',
      'AR': 'Argentina',
      'CL': 'Chile',
      'PE': 'Perú',
      'UY': 'Uruguay',
    };
    
    return countryMap[countryCode] || countryCode;
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full max-w-md mt-2" />
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <Skeleton className="h-10 w-24 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-[#8E8E93] mb-4">Error al cargar los resultados. Por favor, intenta nuevamente.</p>
      </div>
    );
  }
  
  if (editors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#8E8E93] mb-4">No se encontraron editores con los filtros seleccionados.</p>
        <p className="text-sm">Intenta ajustar tus filtros para ver más resultados.</p>
      </div>
    );
  }
  
  // Datos de ejemplo para mostrar cuando la API no devuelve resultados
  const sampleEditors = [
    {
      id: 1,
      name: "Carlos Mendoza",
      location: "Ciudad de México, México",
      country: "MX",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      software: ["Premiere Pro", "After Effects"],
      styles: ["YouTube", "Reels"],
      bio: "Editor de video con 5 años de experiencia especializado en creación de contenido para redes sociales y YouTube.",
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
      basicRate: 75,
    },
    {
      id: 2,
      name: "Valeria Gómez",
      location: "Bogotá, Colombia",
      country: "CO",
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      software: ["Final Cut Pro", "DaVinci Resolve"],
      styles: ["Comerciales", "Corporativo"],
      bio: "Especialista en edición para comerciales y contenido corporativo con 7 años de experiencia en producciones nacionales e internacionales.",
      thumbnailUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
      basicRate: 120,
    },
    {
      id: 3,
      name: "Matías Rodríguez",
      location: "Buenos Aires, Argentina",
      country: "AR",
      profilePicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
      software: ["Premiere Pro", "CapCut"],
      styles: ["TikTok", "Instagram"],
      bio: "Creador de contenido y editor especializado en formatos cortos para redes sociales con enfoque en tendencias actuales y engagement.",
      thumbnailUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80",
      basicRate: 60,
    },
  ];
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Manejo de tipo de datos
  interface EditorData {
    id: number;
    name: string;
    location: string;
    country: string;
    profilePicture: string;
    software: string[];
    styles: string[];
    bio: string;
    thumbnailUrl: string;
    basicRate: number;
  }
  
  // Obtener información de paginación del API
  const totalItems = response?.pagination?.total || 0;
  const totalPages = response?.pagination?.totalPages || 1;
  
  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    // Agregar el parámetro de página a los filtros
    const newParams = new URLSearchParams(filterParams.toString());
    newParams.set('page', page.toString());
    newParams.set('limit', itemsPerPage.toString());
    
    // Triggering a new search with the updated page
    onFilterChange({
      ...filters,
      page,
      limit: itemsPerPage
    });
  };
  
  // Convertir datos de API a formato esperado o usar datos de ejemplo
  const displayEditors: EditorData[] = editors && Array.isArray(editors) && editors.length > 0 ? 
    editors.map((editor: any) => {
      if (editor.profile) {
        // Extraer información de software y estilos de API
        const softwareItems = (editor.profile.software || []) as any[]; 
        const styleItems = (editor.profile.editingStyles || []) as any[];
        
        // Si hay datos de perfil de API, formatearlos
        return {
          id: editor.profile.id,
          name: editor.user.name,
          location: editor.user.country ? getCountryName(editor.user.country) : "Internacional",
          country: editor.user.country || "",
          profilePicture: editor.user.profilePicture || "https://via.placeholder.com/96",
          software: Array.isArray(softwareItems) ? softwareItems.map((item: any) => typeof item === 'object' ? item.name : 'Software') : ["Premier Pro"],
          styles: Array.isArray(styleItems) ? styleItems.map((item: any) => typeof item === 'object' ? item.name : 'Edición General') : ["Edición General"],
          bio: editor.user.bio || "Editor profesional",
          thumbnailUrl: editor.featuredPortfolio?.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=337&q=80",
          basicRate: editor.profile.basicRate || 75,
        };
      }
      return editor; // Si ya está en el formato correcto
    }) 
    : sampleEditors;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-[#8E8E93]">
          {displayEditors.length} editores encontrados
        </p>
        <select 
          className="text-sm border rounded-md p-1"
          aria-label="Ordenar resultados"
        >
          <option value="relevance">Más relevantes</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="experience">Más experiencia</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {displayEditors.map((editor) => (
          <Card key={editor.id} className="shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img 
                    src={editor.thumbnailUrl}
                    alt={`Portfolio de ${editor.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-primary hover:bg-white">
                      {editor.country ? getCountryName(editor.country) : 'Internacional'}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={editor.profilePicture} 
                          alt={editor.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{editor.name}</h3>
                          <p className="text-sm text-[#8E8E93]">{editor.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[...editor.software, ...editor.styles].slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-[#F2F2F7] hover:bg-[#F2F2F7] text-[#8E8E93]">
                            {tag}
                          </Badge>
                        ))}
                        {[...editor.software, ...editor.styles].length > 4 && (
                          <Badge variant="secondary" className="bg-[#F2F2F7] hover:bg-[#F2F2F7] text-[#8E8E93]">
                            +{[...editor.software, ...editor.styles].length - 4} más
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm mt-3 text-[#1c1c1e] line-clamp-2">
                        {editor.bio}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="mb-2">
                        <p className="text-sm text-[#8E8E93]">Desde</p>
                        <p className="text-xl font-semibold text-primary">${editor.basicRate} USD</p>
                      </div>
                      <Link href={`/editor/${editor.id}`} className="inline-block text-primary text-sm font-medium hover:underline">
                        Ver perfil completo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {displayEditors.length > 5 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default EditorList;
