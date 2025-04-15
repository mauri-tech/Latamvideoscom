import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import editorImage from '../../assets/editor-hero.jpg';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { countries } from '@/lib/constants';

const Hero = () => {
  const [, setLocation] = useLocation();
  const [professionalType, setProfessionalType] = useState('');
  const [country, setCountry] = useState('');
  const [maxRate, setMaxRate] = useState(150);

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

  const handleSearch = () => {
    // Construir la URL con los parámetros de búsqueda
    let searchParams = new URLSearchParams();
    if (professionalType && professionalType !== 'all') {
      searchParams.append('professionalType', professionalType);
    }
    if (country && country !== 'all') {
      searchParams.append('country', country);
    }
    if (maxRate !== 150) {
      searchParams.append('maxRate', maxRate.toString());
    }

    // Navegar a la página de búsqueda con los filtros
    const queryString = searchParams.toString();
    setLocation(`/search${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div className="bg-white pt-10 md:pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Versión móvil con imagen arriba */}
        <div className="flex flex-col md:hidden mb-8">
          <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EAF2FF] rounded-xl p-4 shadow-lg mb-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={editorImage} 
                alt="Profesionales en video de LATAM"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center tracking-tight mb-2 leading-tight">
            Encuentra a profesionales en video de LATAM
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed text-center">
            La plataforma para conectar con editores, videógrafos y profesionales
            especializados por estilo, equipo y presupuesto.
          </p>

          {/* Buscador simplificado para móvil */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold text-[#041C32] mb-4">Buscar profesionales</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="professionalType-mobile" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                  Tipo de profesional
                </label>
                <Select
                  value={professionalType}
                  onValueChange={setProfessionalType}
                >
                  <SelectTrigger id="professionalType-mobile" className="w-full">
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
              
              <Button
                className="w-full bg-[#0050FF] hover:bg-[#0040E0]"
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>
          </div>
          
          {/* Botones removidos por petición del usuario */}
        </div>

        {/* Versión desktop */}
        <div className="hidden md:flex md:flex-row items-center">
          {/* Contenido del texto */}
          <div className="md:w-1/2 mb-12 md:mb-0 pr-8">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-tight">
                <span>Encuentra a profesionales</span><br />
                <span className="text-[#0050FF]">en video de LATAM</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
                La plataforma para conectar con editores, videógrafos y profesionales
                especializados por estilo, equipo y presupuesto.
              </p>
              
              {/* Buscador desktop */}
              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="professionalType-desktop" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                      Tipo de profesional
                    </label>
                    <Select
                      value={professionalType}
                      onValueChange={setProfessionalType}
                    >
                      <SelectTrigger id="professionalType-desktop" className="w-full">
                        <SelectValue placeholder="Todos" />
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
                  
                  <div>
                    <label htmlFor="country-desktop" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                      País
                    </label>
                    <Select
                      value={country}
                      onValueChange={setCountry}
                    >
                      <SelectTrigger id="country-desktop" className="w-full">
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
                </div>
                
                <div className="mb-6">
                  <label htmlFor="price-desktop" className="block text-sm font-medium text-[#1c1c1e] mb-2">
                    Presupuesto máximo: ${maxRate} USD
                  </label>
                  <Slider
                    id="price-desktop"
                    defaultValue={[maxRate]}
                    max={500}
                    min={0}
                    step={10}
                    onValueChange={(value) => setMaxRate(value[0])}
                  />
                </div>
                
                <Button
                  className="w-full bg-[#0050FF] hover:bg-[#0040E0]"
                  onClick={handleSearch}
                >
                  Buscar profesionales
                </Button>
              </div>
              
              {/* Botones removidos por petición del usuario */}
            </div>
          </div>
          
          {/* Imagen del editor trabajando */}
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EAF2FF] rounded-xl p-4 shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={editorImage} 
                  alt="Profesionales en video de LATAM"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;