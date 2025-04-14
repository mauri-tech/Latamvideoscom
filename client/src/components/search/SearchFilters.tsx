import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { countries } from '@/lib/constants';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  initialFilters?: any;
}

const SearchFilters = ({ onFilterChange, initialFilters = {} }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    projectType: initialFilters.projectType || '',
    country: initialFilters.country || '',
    software: initialFilters.software || [],
    styles: initialFilters.styles || [],
    maxRate: initialFilters.maxRate || 150,
    experienceLevel: initialFilters.experienceLevel || '',
    languages: initialFilters.languages || [],
    camera: initialFilters.camera || [],
    availability: initialFilters.availability || '',
    deliveryTime: initialFilters.deliveryTime || '',
    rating: initialFilters.rating || 0,
    page: initialFilters.page || 1,
    limit: initialFilters.limit || 10,
    sortBy: initialFilters.sortBy || 'relevance',
    sortDirection: initialFilters.sortDirection || 'desc',
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  interface Software {
    id: number;
    name: string;
    icon?: string;
  }
  
  interface EditingStyle {
    id: number;
    name: string;
  }
  
  const { data: softwareList = [] } = useQuery<Software[]>({
    queryKey: ['/api/software'],
    staleTime: Infinity,
  });
  
  const { data: stylesList = [] } = useQuery<EditingStyle[]>({
    queryKey: ['/api/editing-styles'],
    staleTime: Infinity,
  });
  
  // Use API data
  const software: Software[] = softwareList;
  const styles: EditingStyle[] = stylesList;
  
  const projectTypes = [
    { value: "todos", label: "Todos los tipos" },
    { value: "reel", label: "Reel/Contenido corto" },
    { value: "youtube", label: "Video para YouTube" },
    { value: "comercial", label: "Comercial/Anuncio" },
    { value: "evento", label: "Video de evento" },
    { value: "corporativo", label: "Video corporativo" }
  ];
  
  const experienceLevels = [
    { value: "", label: "Cualquier nivel" },
    { value: "junior", label: "Junior (1-2 años)" },
    { value: "mid", label: "Intermedio (3-5 años)" },
    { value: "senior", label: "Senior (5+ años)" },
    { value: "expert", label: "Experto (10+ años)" }
  ];
  
  const languages = [
    { id: 1, name: "Español" },
    { id: 2, name: "Inglés" },
    { id: 3, name: "Portugués" },
    { id: 4, name: "Francés" }
  ];
  
  const cameraEquipment = [
    { id: 1, name: "Sony Alpha" },
    { id: 2, name: "Canon EOS" },
    { id: 3, name: "Blackmagic" },
    { id: 4, name: "DJI (Drones)" },
    { id: 5, name: "GoPro" }
  ];
  
  const availabilityOptions = [
    { value: "", label: "Cualquier disponibilidad" },
    { value: "fulltime", label: "Tiempo completo" },
    { value: "parttime", label: "Tiempo parcial" },
    { value: "weekends", label: "Fines de semana" },
    { value: "evenings", label: "Tardes/Noches" }
  ];
  
  const deliveryTimeOptions = [
    { value: "", label: "Cualquier plazo" },
    { value: "24h", label: "24 horas o menos" },
    { value: "3days", label: "1-3 días" },
    { value: "week", label: "1 semana" },
    { value: "2weeks", label: "2 semanas" },
    { value: "custom", label: "Personalizado" }
  ];
  
  const updateFilter = (key: string, value: any) => {
    // Si el valor es "todos" para el país, convertirlo a string vacío para mantener la lógica existente
    const processedValue = key === 'country' && value === 'todos' ? '' : value;
    const newFilters = { ...filters, [key]: processedValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const toggleSoftware = (id: number) => {
    const currentSoftware = [...filters.software];
    const index = currentSoftware.indexOf(id);
    
    if (index === -1) {
      currentSoftware.push(id);
    } else {
      currentSoftware.splice(index, 1);
    }
    
    updateFilter('software', currentSoftware);
  };
  
  const toggleStyle = (id: number) => {
    const currentStyles = [...filters.styles];
    const index = currentStyles.indexOf(id);
    
    if (index === -1) {
      currentStyles.push(id);
    } else {
      currentStyles.splice(index, 1);
    }
    
    updateFilter('styles', currentStyles);
  };
  
  const toggleLanguage = (id: number) => {
    const currentLangs = [...filters.languages];
    const index = currentLangs.indexOf(id);
    
    if (index === -1) {
      currentLangs.push(id);
    } else {
      currentLangs.splice(index, 1);
    }
    
    updateFilter('languages', currentLangs);
  };
  
  const toggleCamera = (id: number) => {
    const currentCameras = [...filters.camera];
    const index = currentCameras.indexOf(id);
    
    if (index === -1) {
      currentCameras.push(id);
    } else {
      currentCameras.splice(index, 1);
    }
    
    updateFilter('camera', currentCameras);
  };
  
  const resetFilters = () => {
    const resetValues = {
      projectType: '',
      country: '',
      software: [],
      styles: [],
      maxRate: 150,
      experienceLevel: '',
      languages: [],
      camera: [],
      availability: '',
      deliveryTime: '',
      rating: 0,
      page: 1,             // Mantener la primera página
      limit: 10,           // Mantener el límite estándar
      sortBy: 'relevance', // Restablecer orden
      sortDirection: 'desc' // Restablecer dirección
    };
    
    setFilters(resetValues);
    onFilterChange(resetValues);
  };
  
  const handleSliderChange = (value: number[]) => {
    updateFilter('maxRate', value[0]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-[#8E8E93] hover:text-primary hover:bg-transparent"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
          
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary md:hidden"
          >
            {isExpanded ? 'Ocultar' : 'Mostrar'}
          </Button>
        </div>
      </div>
      
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            Tipo de proyecto
          </label>
          <Select
            value={filters.projectType || "todos"}
            onValueChange={(value) => updateFilter('projectType', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            País
          </label>
          <Select
            value={filters.country || "all"}
            onValueChange={(value) => updateFilter('country', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los países" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los países</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="software" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            Software preferido
          </label>
          <Select
            value={filters.software.length > 0 ? filters.software[0].toString() : "none"}
            onValueChange={(value) => {
              if (value === "none") {
                updateFilter('software', []);
              } else {
                const softwareId = parseInt(value);
                updateFilter('software', [softwareId]);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona software" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Cualquier software</SelectItem>
              {software.filter(item => item.id > 0).map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="styles">
            <AccordionTrigger className="text-sm font-medium text-[#1c1c1e]">
              Estilos de edición
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 pt-2">
                {styles.map((style) => (
                  <div key={style.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`style-${style.id}`}
                      checked={filters.styles.includes(style.id)}
                      onCheckedChange={() => toggleStyle(style.id)}
                    />
                    <label
                      htmlFor={`style-${style.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {style.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#1c1c1e] mb-4">
            Presupuesto máximo: ${filters.maxRate} USD
          </label>
          <Slider
            defaultValue={[filters.maxRate]}
            max={500}
            min={0}
            step={10}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-xs text-[#8E8E93] mt-2">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            Nivel de experiencia
          </label>
          <Select
            value={filters.experienceLevel || "any"}
            onValueChange={(value) => updateFilter('experienceLevel', value === "any" ? "" : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Cualquier nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="any" value="any">Cualquier nivel</SelectItem>
              {experienceLevels.filter(level => level.value !== "").map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="languages">
            <AccordionTrigger className="text-sm font-medium text-[#1c1c1e]">
              Idiomas
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 pt-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`language-${language.id}`}
                      checked={filters.languages.includes(language.id)}
                      onCheckedChange={() => toggleLanguage(language.id)}
                    />
                    <label
                      htmlFor={`language-${language.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {language.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="camera">
            <AccordionTrigger className="text-sm font-medium text-[#1c1c1e]">
              Equipo de cámara
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 pt-2">
                {cameraEquipment.map((camera) => (
                  <div key={camera.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`camera-${camera.id}`}
                      checked={filters.camera.includes(camera.id)}
                      onCheckedChange={() => toggleCamera(camera.id)}
                    />
                    <label
                      htmlFor={`camera-${camera.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {camera.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            Disponibilidad
          </label>
          <Select
            value={filters.availability || "any"}
            onValueChange={(value) => updateFilter('availability', value === "any" ? "" : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Cualquier disponibilidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="any" value="any">Cualquier disponibilidad</SelectItem>
              {availabilityOptions.filter(option => option.value !== "").map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            Tiempo de entrega
          </label>
          <Select
            value={filters.deliveryTime || "any"}
            onValueChange={(value) => updateFilter('deliveryTime', value === "any" ? "" : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Cualquier plazo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="any" value="any">Cualquier plazo</SelectItem>
              {deliveryTimeOptions.filter(option => option.value !== "").map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="w-full bg-primary text-white hover:bg-primary/90"
          onClick={() => onFilterChange(filters)}
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
