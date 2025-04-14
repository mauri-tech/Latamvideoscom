import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo con gradiente Apple-style */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041C32] via-[#0050FF]/40 to-[#A0C4FF]/30 opacity-90 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYxMCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Elementos decorativos circulares */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#007AFF]/10 mix-blend-overlay blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#A0C4FF]/10 mix-blend-overlay blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Haz que tu trabajo se vea tan bien como lo editas.
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            O encuentra al talento que lo hará por ti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              className="bg-white text-[#0050FF] hover:bg-white/90 rounded-lg px-8 py-6 font-medium text-lg" 
              asChild
            >
              <Link href="/search">Explorar editores</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 rounded-lg px-8 py-6 font-medium text-lg"
              asChild
            >
              <Link href="/register">Unirme como creador</Link>
            </Button>
          </div>
          
          {/* Diseño aspiracional */}
          <div className="mt-16">
            <p className="text-sm opacity-70">
              Únete a la comunidad líder de editores y videógrafos en Latinoamérica
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;