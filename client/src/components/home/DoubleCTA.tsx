import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Users, Briefcase } from 'lucide-react';

const DoubleCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondo negro */}
      <div className="absolute inset-0 bg-[#020617] z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYwOCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Elementos decorativos circulares */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#6BA6FF]/10 mix-blend-overlay blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#C084FC]/10 mix-blend-overlay blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres contratar o ser contratado?</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto">
            Elige tu camino en latamvideos.com y comienza a conectar con profesionales o a mostrar tu talento.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Opción 1: Buscar talento */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-white hover:bg-white/15 transition-colors flex flex-col items-center text-center">
            <div className="bg-[#6BA6FF]/30 p-4 rounded-full mb-6 backdrop-blur-sm">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Estoy buscando talento</h3>
            <p className="mb-6 opacity-90">
              Encuentra editores y videógrafos profesionales que se ajusten exactamente a tus necesidades de proyecto.
            </p>
            <Button 
              className="bg-white hover:bg-white/90 mt-auto" 
              size="lg"
              asChild
              style={{ color: "#020617" }}
            >
              <Link href="/search">Explorar talento</Link>
            </Button>
          </div>
          
          {/* Opción 2: Mostrar trabajo */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-white hover:bg-white/15 transition-colors flex flex-col items-center text-center">
            <div className="bg-[#C084FC]/30 p-4 rounded-full mb-6 backdrop-blur-sm">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Quiero mostrar mi trabajo</h3>
            <p className="mb-6 opacity-90">
              Crea tu perfil profesional y conecta con marcas, agencias y creadores que buscan tu talento.
            </p>
            <Button 
              variant="outline" 
              className="border border-white text-white hover:bg-white/10 mt-auto" 
              size="lg"
              asChild
            >
              <Link href="/register">Crear mi perfil</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoubleCTA;