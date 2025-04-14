import { useState } from 'react';
import { Link } from 'wouter';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
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
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/#como-funciona" className="text-[#1c1c1e] hover:text-[#2A9D8F] transition">
            Cómo funciona
          </Link>
          <Link href="/#para-editores" className="text-[#1c1c1e] hover:text-[#2A9D8F] transition">
            Para editores
          </Link>
          <Link href="/#para-marcas" className="text-[#1c1c1e] hover:text-[#2A9D8F] transition">
            Para marcas
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-[#1c1c1e] hover:text-[#2A9D8F] hidden md:inline">
            Iniciar sesión
          </Link>
          <Link href="/register">
            <Button className="bg-[#2A9D8F] text-white px-4 py-2 rounded-md hover:bg-[#21867A]">
              Registrarse
            </Button>
          </Link>
          <button className="md:hidden text-[#1c1c1e]" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-2 px-4">
          <nav className="flex flex-col space-y-3">
            <Link href="/#como-funciona" className="text-[#1c1c1e] hover:text-[#2A9D8F] py-2">
              Cómo funciona
            </Link>
            <Link href="/#para-editores" className="text-[#1c1c1e] hover:text-[#2A9D8F] py-2">
              Para editores
            </Link>
            <Link href="/#para-marcas" className="text-[#1c1c1e] hover:text-[#2A9D8F] py-2">
              Para marcas
            </Link>
            <Link href="/login" className="text-[#1c1c1e] hover:text-[#2A9D8F] py-2">
              Iniciar sesión
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
