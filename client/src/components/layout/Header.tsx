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
        <Link href="/" className="flex items-center gap-1">
          <span className="font-bold text-2xl text-primary tracking-tight">latamvideos</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/como-funciona" className="text-sm font-medium text-foreground hover:text-primary transition">
            Cómo funciona
          </Link>
          <Link href="/faq" className="text-sm font-medium text-foreground hover:text-primary transition">
            FAQ
          </Link>
          <Link href="/forum" className="text-sm font-medium text-foreground hover:text-primary transition">
            Foros
          </Link>
          <Link href="/search" className="text-sm font-medium text-foreground hover:text-primary transition">
            Buscar profesionales
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/dashboard">
              <Button>
                Mi perfil
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition hidden md:flex items-center text-foreground">
                Iniciar sesión
              </Link>
              <Link href="/register">
                <Button>
                  Registrarse
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Hamburger Button */}
          <button className="md:hidden text-foreground" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Simplified Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-2 px-4 shadow-md border-t border-gray-100 absolute left-0">
          <nav className="flex flex-col space-y-3">
            <Link href="/como-funciona" className="text-foreground hover:text-primary py-2 font-medium">
              Cómo funciona
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary py-2 font-medium">
              FAQ
            </Link>
            <Link href="/forum" className="text-foreground hover:text-primary py-2 font-medium">
              Foros
            </Link>
            {!user && (
              <Link href="/register" className="text-foreground hover:text-primary py-2 font-medium border-t border-gray-100 mt-2 pt-3">
                Regístrate como Editor
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
