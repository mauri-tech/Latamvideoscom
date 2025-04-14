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
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { data: softwareList = [] } = useQuery({
    queryKey: ['/api/software'],
    staleTime: Infinity,
  });
  
  const { data: stylesList = [] } = useQuery({
    queryKey: ['/api/editing-styles'],
    staleTime: Infinity,
  });
  
  // Mock data until API is implemented
  const mockSoftware = [
    { id: 1, name: "Adobe Premiere Pro" },
    { id: 2, name: "Final Cut Pro" },
    { id: 3, name: "DaVinci Resolve" },
    { id: 4, name: "Adobe After Effects" },
    { id: 5, name: "CapCut" },
    { id: 6, name: "iMovie" },
    { id: 7, name: "Filmora" },
    { id: 8, name: "Vegas Pro" }
  ];

  const mockStyles = [
    { id: 1, name: "YouTube" },
    { id: 2, name: "Reels / TikTok" },
    { id: 3, name: "Comerciales" },
    { id: 4, name: "Eventos (bodas, conciertos)" },
    { id: 5, name: "Video corporativo" },
    { id: 6, name: "Documental" },
    { id: 7, name: "Motion graphics" },
    { id: 8, name: "Videoclips musicales" }
  ];
  
  // Use mock data if API isn't ready
  const software = softwareList.length > 0 ? softwareList : mockSoftware;
  const styles = stylesList.length > 0 ? stylesList : mockStyles;
  
  const projectTypes = [
    { value: "", label: "Todos los tipos" },
    { value: "reel", label: "Reel/Contenido corto" },
    { value: "youtube", label: "Video para YouTube" },
    { value: "comercial", label: "Comercial/Anuncio" },
    { value: "evento", label: "Video de evento" },
    { value: "corporativo", label: "Video corporativo" }
  ];
  
  const updateFilter = (key: string, value: any) => {
    // Si el valor es "all" para el país, convertirlo a string vacío para mantener la lógica existente
    const processedValue = key === 'country' && value === 'all' ? '' : value;
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
  
  const resetFilters = () => {
    const resetValues = {
      projectType: '',
      country: '',
      software: [],
      styles: [],
      maxRate: 150,
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
            value={filters.projectType}
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
            value={filters.country}
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
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="software">
            <AccordionTrigger className="text-sm font-medium text-[#1c1c1e]">
              Software
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 pt-2">
                {software.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`software-${item.id}`}
                      checked={filters.software.includes(item.id)}
                      onCheckedChange={() => toggleSoftware(item.id)}
                    />
                    <label
                      htmlFor={`software-${item.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
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
            max={300}
            min={30}
            step={10}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-xs text-[#8E8E93] mt-2">
            <span>$30</span>
            <span>$300+</span>
          </div>
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
