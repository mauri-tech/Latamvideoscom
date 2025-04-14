import { Link } from 'wouter';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="flex">
                <span className="text-[#E63946] font-bold text-xl">l</span>
                <span className="text-[#F4B400] font-bold text-xl">a</span>
                <span className="text-[#50BFA5] font-bold text-xl">t</span>
                <span className="text-[#2D6A4F] font-bold text-xl">a</span>
                <span className="text-[#2A9D8F] font-bold text-xl">m</span>
                <span className="text-[#1C1C1E] font-bold text-xl">videos</span>
              </span>
              <span className="text-[#B0B0B0] font-light text-base">.com</span>
            </Link>
            <p className="text-[#8E8E93] text-sm mb-4">
              El portafolio inteligente para editores de video en Latinoamérica.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#8E8E93] hover:text-[#2A9D8F]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8E8E93] hover:text-[#2A9D8F]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8E8E93] hover:text-[#2A9D8F]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#8E8E93] hover:text-[#2A9D8F]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Editores</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/register" className="hover:text-[#2A9D8F]">Crear perfil</Link></li>
              <li><Link href="/#como-funciona" className="hover:text-[#2A9D8F]">Cómo funciona</Link></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Precios y planes</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Tips para tu portafolio</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Historias de éxito</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Marcas</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/search" className="hover:text-[#2A9D8F]">Buscar editores</Link></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Publicar proyecto</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Solicitar recomendación</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Casos de éxito</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">FAQ para contratantes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><a href="#" className="hover:text-[#2A9D8F]">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Blog</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Contacto</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-[#2A9D8F]">Política de privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#8E8E93] text-sm mb-4 md:mb-0">
            © 2023-2025 latamvideos.com. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-[#8E8E93]">
            <a href="#" className="hover:text-[#2A9D8F]">Términos</a>
            <a href="#" className="hover:text-[#2A9D8F]">Privacidad</a>
            <a href="#" className="hover:text-[#2A9D8F]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
