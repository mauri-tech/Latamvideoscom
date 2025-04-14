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
          <span className="font-bold text-xl text-[#1C1C1E]">latamvideos</span>
          <span className="text-[#B0B0B0] font-light text-base">.com</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/#como-funciona" className="text-[#1c1c1e] hover:text-[#007AFF] transition">
            Cómo funciona
          </Link>
          <Link href="/#para-editores" className="text-[#1c1c1e] hover:text-[#007AFF] transition">
            Para editores
          </Link>
          <Link href="/#para-marcas" className="text-[#1c1c1e] hover:text-[#007AFF] transition">
            Para marcas
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-[#1c1c1e] hover:text-[#007AFF] hidden md:inline">
            Iniciar sesión
          </Link>
          <Link href="/register">
            <Button className="bg-[#007AFF] text-white px-4 py-2 rounded-md hover:bg-[#0060CF] transition font-medium">
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
            <Link href="/#como-funciona" className="text-[#1c1c1e] hover:text-[#007AFF] py-2">
              Cómo funciona
            </Link>
            <Link href="/#para-editores" className="text-[#1c1c1e] hover:text-[#007AFF] py-2">
              Para editores
            </Link>
            <Link href="/#para-marcas" className="text-[#1c1c1e] hover:text-[#007AFF] py-2">
              Para marcas
            </Link>
            <Link href="/login" className="text-[#1c1c1e] hover:text-[#007AFF] py-2">
              Iniciar sesión
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
