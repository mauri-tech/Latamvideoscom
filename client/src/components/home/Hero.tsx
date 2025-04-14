import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Fondo con gradiente azul elegante estilo Apple */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041C32] via-[#0050FF]/40 to-[#A0C4FF]/30 opacity-90 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYxMCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Contenido del texto */}
          <div className="md:w-1/2 text-white">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
              Conecta tu talento con quienes más lo necesitan.
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 leading-relaxed opacity-90 max-w-xl">
              Los mejores editores y videógrafos de LATAM, listos para trabajar con agencias, negocios y figuras públicas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-lg px-8 py-6 font-medium text-lg" 
                asChild
              >
                <Link href="/search">Ver editores y videógrafos</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 rounded-lg px-8 py-6 font-medium text-lg"
                asChild
              >
                <Link href="/register">Quiero aparecer aquí</Link>
              </Button>
            </div>
          </div>
          
          {/* Mockup de laptop o celular */}
          <div className="md:w-5/12">
            <div className="relative perspective-1000">
              <div className="mockup-window bg-white border-2 border-gray-200 rounded-xl shadow-2xl transform rotate-y-5 rotate-z-2 transition-all duration-500 hover:rotate-y-2 hover:scale-105">
                {/* Pantalla del mockup mostrando un perfil */}
                <div className="p-4 bg-white rounded-b-xl">
                  <div className="flex items-center mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-xs text-gray-500">latamvideos.com</div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 border border-gray-100 rounded-lg p-4 shadow-sm">
                    <div className="flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                        alt="Perfil de editor"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-bold">Mauricio Treviño</h3>
                        <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Verificado</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="mr-2">Ciudad de México</span>
                        <span>•</span>
                        <div className="ml-2 flex">
                          <span>⭐⭐⭐⭐⭐</span>
                          <span className="ml-1">(127)</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Editor de video</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Reels</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">DaVinci Resolve</span>
                      </div>
                      <div className="mt-auto">
                        <span className="text-sm font-medium">Desde $200 USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Efecto de reflejo */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent transform scale-y-[-1] translate-y-[98%] opacity-50 blur-sm rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-6 h-6 text-white transform rotate-90" />
      </div>
    </div>
  );
};

export default Hero;