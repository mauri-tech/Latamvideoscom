import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Mock data for featured editors (would be fetched from API in production)
const featuredEditors = [
  {
    id: 1,
    name: "Carlos Mendoza",
    location: "Ciudad de México, México",
    software: ["Premiere Pro", "After Effects"],
    styles: ["YouTube", "Reels"],
    experience: "5 años de experiencia en edición de videos para marcas y creadores de contenido.",
    rate: 75,
    profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
  },
  {
    id: 2,
    name: "Valeria Gómez",
    location: "Bogotá, Colombia",
    software: ["Final Cut Pro", "DaVinci Resolve"],
    styles: ["Comerciales"],
    experience: "Especialista en edición para comerciales y contenido corporativo con 7 años de experiencia.",
    rate: 120,
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
  },
  {
    id: 3,
    name: "Matías Rodríguez",
    location: "Buenos Aires, Argentina",
    software: ["Premiere Pro", "CapCut"],
    styles: ["TikTok", "Instagram"],
    experience: "Creador de contenido y editor especializado en formatos cortos para redes sociales.",
    rate: 60,
    profilePic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=96&h=96&q=80",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
  }
];

const EditorShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F2F2F7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Editores destacados</h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
            Descubre algunos de los mejores talentos disponibles en nuestra plataforma.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEditors.map((editor) => (
            <div key={editor.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition hover:shadow-md">
              <div className="aspect-video relative bg-gray-100">
                <img 
                  src={editor.thumbnail}
                  alt={`${editor.name} showreel thumbnail`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button className="bg-primary text-white px-4 py-2 rounded-md font-medium">
                    Ver portafolio
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={editor.profilePic}
                    alt={`Foto de ${editor.name}`} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{editor.name}</h3>
                    <p className="text-[#8E8E93] text-sm">{editor.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...editor.software, ...editor.styles].map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-[#F2F2F7] text-[#8E8E93] text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[#8E8E93] text-sm mb-4">{editor.experience}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-[#8E8E93]">Desde</span>
                    <span className="font-semibold ml-1">${editor.rate} USD</span>
                  </div>
                  <Link href={`/editor/${editor.id}`} className="text-primary hover:text-[#0056B3] font-medium text-sm">
                    Ver perfil
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/search" className="inline-flex items-center text-primary font-medium hover:text-[#0056B3]">
            Ver todos los editores
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditorShowcase;
