import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Search, MessageSquare, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const MobileNav = () => {
    const [location] = useLocation();
    const { user } = useAuth();

    const navItems = [
        { icon: Home, label: 'Inicio', href: '/' },
        { icon: Search, label: 'Explorar', href: '/search' },
        { icon: Heart, label: 'Favoritos', href: '/favorites', requiresAuth: true },
        { icon: MessageSquare, label: 'Mensajes', href: '/messages', requiresAuth: true },
        { icon: User, label: 'Perfil', href: user ? '/dashboard' : '/login' },
    ];

    // Filter items if needed (e.g. only show favorites if logged in, or redirect to login)
    // For this UI demo, we'll show them but they might redirect to login if clicked

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));

                    if (item.requiresAuth && !user) return null; // Optionally hide auth-only items

                    return (
                        <Link key={item.label} href={item.href}>
                            <div className={cn(
                                "flex flex-col items-center justify-center w-full h-full px-2 py-1 space-y-1 transition-colors duration-200",
                                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
                            )}>
                                <item.icon
                                    className={cn("w-6 h-6", isActive && "fill-current")}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}

                {/* If user is not logged in, show a simplified menu or just Profile -> Login */}
                {!user && (
                    <Link href="/login">
                        <div className={cn(
                            "flex flex-col items-center justify-center w-full h-full px-2 py-1 space-y-1 transition-colors duration-200",
                            location === '/login' ? "text-primary" : "text-gray-400 hover:text-gray-600"
                        )}>
                            <User className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Ingresar</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MobileNav;
