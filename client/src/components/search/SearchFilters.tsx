import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Filter } from 'lucide-react';
import { countries } from '@/lib/constants';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  initialFilters?: any;
}

const SearchFilters = ({ onFilterChange, initialFilters = {} }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    professionalType: initialFilters.professionalType || '',
    country: initialFilters.country || '',
    maxRate: initialFilters.maxRate || 150,
    page: initialFilters.page || 1,
    limit: initialFilters.limit || 10,
    sortBy: initialFilters.sortBy || 'relevance',
    sortDirection: initialFilters.sortDirection || 'desc',
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
  // Tipos de profesionales
  const professionalTypes = [
    { value: "all", label: "Todos los profesionales" },
    { value: "editor", label: "Editor de video" },
    { value: "videographer", label: "Videógrafo" },
    { value: "sound", label: "Microfonista/Sonidista" },
    { value: "lighting", label: "Iluminador" },
    { value: "colorist", label: "Colorista" },
    { value: "vfx", label: "Especialista VFX" },
    { value: "animator", label: "Animador" },
    { value: "director", label: "Director" }
  ];
  
  const updateFilter = (key: string, value: any) => {
    // Si el valor es "todos" para el país, convertirlo a string vacío para mantener la lógica existente
    const processedValue = key === 'country' && value === 'todos' ? '' : value;
    const newFilters = { ...filters, [key]: processedValue, page: 1 }; // Reset to page 1 when changing filters
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // Actualizar etiquetas activas
    updateActiveTags(key, value);
  };
  
  // Función para actualizar las etiquetas activas
  const updateActiveTags = (key: string, value: any) => {
    let newTags = [...activeTags];
    
    // Remover etiqueta existente para esta key si existe
    newTags = newTags.filter(tag => !tag.startsWith(`${key}:`));
    
    // Añadir nueva etiqueta si hay un valor
    if (value && value !== '' && value !== 'todos' && value !== 'all' && value !== 'none') {
      let tagText = '';
      
      switch(key) {
        case 'country':
          const countryObj = countries.find(c => c.code === value);
          tagText = `País: ${countryObj ? `${countryObj.flag} ${countryObj.name}` : value}`;
          break;
        case 'professionalType':
          tagText = `Profesional: ${professionalTypes.find(t => t.value === value)?.label || value}`;
          break;
        case 'maxRate':
          tagText = `Presupuesto: $${value} USD`;
          break;
        default:
          tagText = `${key}: ${value}`;
      }
      
      if (tagText) {
        newTags.push(`${key}:${tagText}`);
      }
    }
    
    setActiveTags(newTags);
  };
  
  // Función para remover una etiqueta específica
  const removeTag = (tag: string) => {
    const [key] = tag.split(':');
    
    // Valores por defecto según la key
    let defaultValue: any = '';
    if (key === 'maxRate') {
      defaultValue = 150;
    }
    
    // Actualizar filtros y quitar la etiqueta
    updateFilter(key, defaultValue);
  };
  
  const resetFilters = () => {
    const resetValues = {
      professionalType: '',
      country: '',
      maxRate: 150,
      page: 1,             // Mantener la primera página
      limit: 10,           // Mantener el límite estándar
      sortBy: 'relevance', // Restablecer orden
      sortDirection: 'desc' // Restablecer dirección
    };
    
    setFilters(resetValues);
    onFilterChange(resetValues);
    setActiveTags([]);
  };
  
  const handleSliderChange = (value: number[]) => {
    updateFilter('maxRate', value[0]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#041C32]">Buscar profesionales</h2>
        
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
            <Filter className="h-4 w-4 mr-1" />
            {isExpanded ? 'Ocultar' : 'Filtros'}
          </Button>
        </div>
      </div>
      
      {/* Etiquetas de filtros activos */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeTags.map((tag, index) => {
            const [key, ...restParts] = tag.split(':');
            const label = restParts.join(':');
            
            return (
              <Badge 
                key={index} 
                variant="secondary"
                className="px-2 py-1 bg-blue-50 text-[#0050FF] hover:bg-blue-100 flex items-center"
              >
                {label}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            );
          })}
        </div>
      )}
      
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Filtro: Tipo de profesional */}
        <div>
          <label htmlFor="professionalType" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            Tipo de profesional
          </label>
          <Select
            value={filters.professionalType || "all"}
            onValueChange={(value) => updateFilter('professionalType', value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los profesionales" />
            </SelectTrigger>
            <SelectContent>
              {professionalTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Filtro: País */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-[#1c1c1e] mb-2">
            País
          </label>
          <Select
            value={filters.country || "all"}
            onValueChange={(value) => updateFilter('country', value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los países" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los países</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Filtro: Presupuesto */}
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
            <span>$500+</span>
          </div>
        </div>
        
        {/* Mensaje informativo */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <p className="text-sm text-[#0050FF]">
            Estos filtros te ayudarán a encontrar rápidamente al profesional ideal para tu proyecto.
          </p>
        </div>
        
        <Button
          className="w-full bg-[#0050FF] hover:bg-[#0040E0] mt-4"
          onClick={() => {
            updateFilter('page', 1); // Reset to page 1 when applying filters
            setIsExpanded(false); // Close accordion on mobile
          }}
        >
          Buscar profesionales
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;