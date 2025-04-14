import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para mostrar tu trabajo al mundo?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Crea tu perfil profesional hoy mismo y conecta con marcas y creadores que buscan exactamente tu talento.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button 
              variant="secondary" 
              className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition font-medium w-full sm:w-auto"
            >
              Crear perfil como editor
            </Button>
          </Link>
          <Link href="/search">
            <Button 
              variant="outline" 
              className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-primary transition font-medium w-full sm:w-auto"
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
