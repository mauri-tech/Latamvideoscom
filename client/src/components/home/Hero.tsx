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
import { countries, colorPalette } from '@/lib/constants';

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
    <div className="bg-background pt-16 md:pt-24 pb-20">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground max-w-4xl">
          Encuentra a los mejores <br className="hidden md:block" />
          <span className="text-primary">profesionales de video</span> en LATAM
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
          Conecta con editores, videógrafos, animadores y directores verificados.
          Gestión segura, pagos protegidos y talento de clase mundial.
        </p>

        {/* Airbnb-style Floating Pill Search Bar - Optimized for Mobile */}
        <div className="bg-white rounded-3xl md:rounded-full shadow-hover p-4 md:p-2 flex flex-col md:flex-row items-center w-full max-w-4xl border border-gray-100 gap-4 md:gap-0">

          <div className="flex-1 w-full md:w-auto px-2 md:px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 relative group text-left">
            <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">Rol</label>
            <Select value={professionalType} onValueChange={setProfessionalType}>
              <SelectTrigger className="w-full border-0 shadow-none p-0 h-auto text-base text-muted-foreground font-normal focus:ring-0 bg-transparent">
                <SelectValue placeholder="¿Qué buscas?" />
              </SelectTrigger>
              <SelectContent>
                {professionalTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 w-full md:w-auto px-2 md:px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 relative group text-left">
            <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">País</label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full border-0 shadow-none p-0 h-auto text-base text-muted-foreground font-normal focus:ring-0 bg-transparent">
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los países</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 w-full md:w-auto px-2 md:px-6 py-2 relative group text-left">
            <div className="flex justify-between mb-1">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">Presupuesto</label>
              <span className="text-xs text-muted-foreground">${maxRate}</span>
            </div>
            <Slider
              defaultValue={[maxRate]}
              max={500}
              step={10}
              onValueChange={(val) => setMaxRate(val[0])}
              className="py-2"
            />
          </div>

          <div className="p-2 w-full md:w-auto">
            <Button
              size="lg"
              className="rounded-xl md:rounded-full w-full md:w-auto h-12 md:h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;