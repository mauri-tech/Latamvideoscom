import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 text-white relative overflow-hidden bg-[#020617]">
      {/* Efectos decorativos de fondo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYxMCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/10 mix-blend-overlay blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/10 mix-blend-overlay blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para mostrar tu trabajo al mundo?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Crea tu perfil profesional hoy mismo y conecta con marcas y creadores que buscan exactamente tu talento.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button 
              variant="secondary" 
              className="bg-white text-[#020617] px-6 py-3 rounded-md hover:bg-gray-100 transition font-medium w-full sm:w-auto"
            >
              Crear perfil como editor
            </Button>
          </Link>
          <Link href="/search">
            <Button 
              variant="outline" 
              className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#020617] transition font-medium w-full sm:w-auto"
            >
              Buscar editores
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
