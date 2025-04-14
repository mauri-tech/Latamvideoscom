import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import EditorInteractiveProfiles from './EditorInteractiveProfiles';
import EditorQuickCatalog from './EditorQuickCatalog';

const EditorShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Editores destacados</h2>
          <p className="text-lg text-[#6c757d] max-w-2xl mx-auto">
            Descubre algunos de los mejores talentos disponibles en nuestra plataforma.
          </p>
        </div>
        
        {/* Sección 1: Perfiles Interactivos */}
        <div className="mb-32 min-h-[90vh] flex items-center justify-center">
          <EditorInteractiveProfiles />
        </div>
        
        {/* Divisor con gradiente */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-[#f8f9fa] via-white to-[#f8f9fa] px-6 text-sm text-[#6c757d]">
              Explora más talentos
            </span>
          </div>
        </div>
        
        {/* Sección 2: Catálogo Rápido de Editores */}
        <div className="min-h-[95vh] flex flex-col justify-center">
          <EditorQuickCatalog />
        </div>
        
        <div className="text-center mt-16">
          <Link href="/search" className="inline-flex items-center text-[#007AFF] font-medium hover:text-[#0069d9]">
            Ver todos los editores
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditorShowcase;
