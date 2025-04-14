import { Link } from 'wouter';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="font-bold text-xl text-[#1C1C1E]">latamvideos</span>
              <span className="text-[#B0B0B0] font-light text-base">.com</span>
            </Link>
            <p className="text-[#8E8E93] text-sm mb-4">
              El portafolio inteligente para editores de video en Latinoamérica.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-[#8E8E93] hover:text-[#007AFF]">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" className="text-[#8E8E93] hover:text-[#007AFF]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-[#8E8E93] hover:text-[#007AFF]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-[#8E8E93] hover:text-[#007AFF]">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Editores</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/register" className="hover:text-[#007AFF]">Crear perfil</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-[#007AFF]">Cómo funciona</Link></li>
              <li><a href="#" className="hover:text-[#007AFF]">Precios y planes</a></li>
              <li><a href="#" className="hover:text-[#007AFF]">Tips para tu portafolio</a></li>
              <li><a href="#" className="hover:text-[#007AFF]">Historias de éxito</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Marcas</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/editors" className="hover:text-[#007AFF]">Buscar editores</Link></li>
              <li><Link href="/#business" className="hover:text-[#007AFF]">Para negocios</Link></li>
              <li><Link href="/#features" className="hover:text-[#007AFF]">¿Por qué elegirnos?</Link></li>
              <li><Link href="/testimonials" className="hover:text-[#007AFF]">Testimonios</Link></li>
              <li><Link href="/#faq" className="hover:text-[#007AFF]">FAQ para contratantes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-[#8E8E93]">
              <li><Link href="/about" className="hover:text-[#007AFF]">Sobre nosotros</Link></li>
              <li><Link href="/blog" className="hover:text-[#007AFF]">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#007AFF]">Contacto</Link></li>
              <li><Link href="/terms" className="hover:text-[#007AFF]">Términos y condiciones</Link></li>
              <li><Link href="/privacy" className="hover:text-[#007AFF]">Política de privacidad</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#8E8E93] text-sm mb-4 md:mb-0">
            © 2023-2025 latamvideos.com. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-[#8E8E93]">
            <Link href="/terms" className="hover:text-[#007AFF]">Términos</Link>
            <Link href="/privacy" className="hover:text-[#007AFF]">Privacidad</Link>
            <Link href="/cookies" className="hover:text-[#007AFF]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
