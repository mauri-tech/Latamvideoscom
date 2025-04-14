import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import EditorInteractiveProfiles from './EditorInteractiveProfiles';
import EditorQuickCatalog from './EditorQuickCatalog';

const EditorShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F2F2F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Editores destacados</h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
            Descubre algunos de los mejores talentos disponibles en nuestra plataforma.
          </p>
        </div>
        
        {/* Sección 1: Perfiles Interactivos */}
        <div className="mb-16">
          <EditorInteractiveProfiles />
        </div>
        
        {/* Divisor */}
        <div className="border-t my-12 max-w-4xl mx-auto"></div>
        
        {/* Sección 2: Catálogo Rápido de Editores */}
        <div>
          <EditorQuickCatalog />
        </div>
        
        <div className="text-center mt-12">
          <Link href="/search" className="inline-flex items-center text-primary font-medium hover:text-[#0056B3]">
            Ver todos los editores
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditorShowcase;
