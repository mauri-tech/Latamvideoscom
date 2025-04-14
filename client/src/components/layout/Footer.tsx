import { Link } from 'wouter';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-primary font-bold text-xl">latamvideos</span>
              <span className="text-[#1c1c1e] font-light text-xl">.com</span>
            </Link>
            <p className="text-[#8E8E93] text-sm mb-4">
              El portafolio inteligente para editores de video en Latinoamérica.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#8E8E93] hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8E8E93] hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8E8E93] hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8E8E93] hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Editores</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/register" className="hover:text-primary">Crear perfil</Link></li>
              <li><Link href="/#como-funciona" className="hover:text-primary">Cómo funciona</Link></li>
              <li><a href="#" className="hover:text-primary">Precios y planes</a></li>
              <li><a href="#" className="hover:text-primary">Tips para tu portafolio</a></li>
              <li><a href="#" className="hover:text-primary">Historias de éxito</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Marcas</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/search" className="hover:text-primary">Buscar editores</Link></li>
              <li><a href="#" className="hover:text-primary">Publicar proyecto</a></li>
              <li><a href="#" className="hover:text-primary">Solicitar recomendación</a></li>
              <li><a href="#" className="hover:text-primary">Casos de éxito</a></li>
              <li><a href="#" className="hover:text-primary">FAQ para contratantes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><a href="#" className="hover:text-primary">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Contacto</a></li>
              <li><a href="#" className="hover:text-primary">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-primary">Política de privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#8E8E93] text-sm mb-4 md:mb-0">
            © 2023-2025 latamvideos.com. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-[#8E8E93]">
            <a href="#" className="hover:text-primary">Términos</a>
            <a href="#" className="hover:text-primary">Privacidad</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
