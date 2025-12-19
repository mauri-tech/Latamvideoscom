import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Interfaz para los editores destacados
interface FeaturedEditor {
  id: number;
  name: string;
  profilePicture: string;
  location: string;
  verified: boolean;
  rating: number;
  specialties: string[];
  baseRate: number;
  currency: string;
  reviewsCount: number;
}

// Datos de editores y videógrafos destacados
const featuredEditors: FeaturedEditor[] = [
  {
    id: 1,
    name: "Mauricio Treviño",
    profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇲🇽 México",
    verified: true,
    rating: 4.9,
    reviewsCount: 124,
    specialties: ["Cine", "YouTube", "Documental"],
    baseRate: 350,
    currency: "USD"
  },
  {
    id: 2,
    name: "Camila Valenzuela",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇨🇴 Colombia",
    verified: true,
    rating: 4.8,
    reviewsCount: 89,
    specialties: ["Animación 3D", "Motion Graphics"],
    baseRate: 400,
    currency: "USD"
  },
  {
    id: 3,
    name: "Diego Montero",
    profilePicture: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇦🇷 Argentina",
    verified: true,
    rating: 5.0,
    reviewsCount: 56,
    specialties: ["Comerciales", "Música"],
    baseRate: 380,
    currency: "USD"
  },
  {
    id: 4,
    name: "Sofia R.",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    location: "🇨🇱 Chile",
    verified: true,
    rating: 4.9,
    reviewsCount: 42,
    specialties: ["UGC", "TikTok"],
    baseRate: 150,
    currency: "USD"
  },
];

const FeaturedEditors = () => {

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Talento Destacado</h2>
            <p className="text-muted-foreground text-lg">Editores verificados listos para trabajar hoy.</p>
          </div>

          <Link href="/search">
            <Button variant="ghost" className="text-foreground font-semibold hover:bg-transparent hover:underline px-0">
              Ver todos los editores <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEditors.map((editor) => (
            <Link key={editor.id} href={`/editor/${editor.id}`}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative bg-gray-100">
                  <img
                    src={editor.profilePicture.replace('w=150', 'w=400')}
                    alt={editor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {editor.verified && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                      <CheckCircle className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Verificado</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-foreground truncate">{editor.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-black text-black" />
                      <span className="text-sm font-medium">{editor.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-2">{editor.specialties.join(", ")}</p>

                  <p className="text-sm">
                    <span className="font-bold text-foreground">Desde ${editor.baseRate}</span>
                    <span className="text-muted-foreground"> / proyecto</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEditors;