import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#F2F6FF] to-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            El portafolio inteligente para editores de video en LATAM
          </h1>
          <p className="text-lg md:text-xl text-[#8E8E93] mb-8 leading-relaxed">
            Conectamos a editores de video con marcas, agencias y creadores que buscan talento específico por estilo, equipo y precio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button className="bg-[#007AFF] text-white px-6 py-3 rounded-md hover:bg-[#0060CF] transition-colors font-medium w-full sm:w-auto">
                Crear mi perfil como editor
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="outline" className="border border-[#007AFF] text-[#007AFF] px-6 py-3 rounded-md hover:bg-[#F0F7FF] transition-colors font-medium w-full sm:w-auto">
                Buscar editores
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
