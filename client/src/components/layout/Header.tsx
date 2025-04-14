import { useState } from 'react';
import { Link } from 'wouter';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

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
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/como-funciona" className="text-[#1c1c1e] hover:text-[#0050FF] transition">
            Cómo funciona
          </Link>
          <Link href="/faq" className="text-[#1c1c1e] hover:text-[#0050FF] transition">
            FAQ
          </Link>
          <Link href="/forum" className="text-[#1c1c1e] hover:text-[#0050FF] transition">
            Foros
          </Link>
          <Link href="/search" className="text-[#1c1c1e] hover:text-[#0050FF] transition">
            Buscar profesionales
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white px-4 py-2 rounded-md hover:from-[#0A2540] hover:to-[#0060FF] transition font-medium">
                Mi cuenta
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="border border-[#0050FF] text-[#0050FF] px-4 py-1.5 rounded-md hover:bg-blue-50 hidden md:flex items-center transition">
                Iniciar sesión
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white px-4 py-2 rounded-md hover:from-[#0A2540] hover:to-[#0060FF] transition font-medium">
                  Registrarse
                </Button>
              </Link>
            </>
          )}
          <button className="md:hidden text-[#1c1c1e]" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-2 px-4 shadow-md">
          <nav className="flex flex-col space-y-3">
            <Link href="/como-funciona" className="text-[#1c1c1e] hover:text-[#0050FF] py-2">
              Cómo funciona
            </Link>
            <Link href="/faq" className="text-[#1c1c1e] hover:text-[#0050FF] py-2">
              FAQ
            </Link>
            <Link href="/forum" className="text-[#1c1c1e] hover:text-[#0050FF] py-2">
              Foros
            </Link>
            <Link href="/search" className="text-[#1c1c1e] hover:text-[#0050FF] py-2">
              Buscar profesionales
            </Link>
            {!user && (
              <Link href="/login" className="text-[#1c1c1e] hover:text-[#0050FF] py-2">
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
