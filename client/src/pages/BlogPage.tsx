import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BlogPage = () => {
  // Datos simulados de artículos del blog
  const blogPosts = [
    {
      id: 1,
      title: "10 tendencias en edición de video para 2025",
      excerpt: "Descubre las técnicas y estilos de edición que dominarán la industria este año y cómo puedes implementarlas en tus proyectos.",
      category: "Tendencias",
      author: "Marina López",
      date: "12 Abr 2025",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
    },
    {
      id: 2,
      title: "Cómo optimizar tu flujo de trabajo en Premiere Pro",
      excerpt: "Aprende técnicas avanzadas para acelerar tu proceso de edición y aumentar tu productividad con este popular software.",
      category: "Tutoriales",
      author: "Carlos Mendez",
      date: "5 Abr 2025",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
    },
    {
      id: 3,
      title: "Entrevista: De freelancer a director de postproducción",
      excerpt: "Conversamos con Javier Ramírez sobre su trayectoria profesional y cómo utilizó plataformas como latamvideos.com para impulsar su carrera.",
      category: "Entrevistas",
      author: "Lucía Torres",
      date: "28 Mar 2025",
      imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
    },
    {
      id: 4,
      title: "La importancia del color grading en la narrativa visual",
      excerpt: "Analizamos cómo el color afecta la percepción del espectador y puede ser una herramienta poderosa para contar historias más efectivas.",
      category: "Técnicas",
      author: "Diego Fuentes",
      date: "20 Mar 2025",
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
    },
    {
      id: 5,
      title: "Cómo establecer tarifas competitivas como editor de video",
      excerpt: "Guía completa para determinar cuánto cobrar por tus servicios de edición según tu experiencia, región y tipo de proyecto.",
      category: "Negocios",
      author: "Ana María Vega",
      date: "12 Mar 2025",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
    },
    {
      id: 6,
      title: "5 plugins esenciales para After Effects en 2025",
      excerpt: "Revisamos las extensiones que todo editor debería tener en su arsenal para crear efectos visuales impactantes y ahorrar tiempo.",
      category: "Herramientas",
      author: "Roberto Sánchez",
      date: "5 Mar 2025",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=337&q=80"
    }
  ];

  const categoryColors: {[key: string]: string} = {
    "Tendencias": "bg-purple-100 text-purple-800 hover:bg-purple-100",
    "Tutoriales": "bg-blue-100 text-blue-800 hover:bg-blue-100",
    "Entrevistas": "bg-green-100 text-green-800 hover:bg-green-100",
    "Técnicas": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    "Negocios": "bg-red-100 text-red-800 hover:bg-red-100",
    "Herramientas": "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Blog | latamvideos.com</title>
        <meta name="description" content="Artículos, tutoriales y noticias sobre edición de video, tendencias audiovisuales y consejos para profesionales creativos." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#041C32]">Blog de latamvideos</h1>
          <p className="text-[#8E8E93] max-w-2xl mx-auto">
            Artículos, tutoriales y noticias sobre edición de video, tendencias audiovisuales y consejos para profesionales creativos.
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <Badge className="bg-white text-[#8E8E93] hover:bg-white cursor-pointer">Todos</Badge>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 cursor-pointer">Tendencias</Badge>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 cursor-pointer">Tutoriales</Badge>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer">Entrevistas</Badge>
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 cursor-pointer">Técnicas</Badge>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 cursor-pointer">Negocios</Badge>
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 cursor-pointer">Herramientas</Badge>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <Badge className={categoryColors[post.category] || "bg-gray-100 text-gray-800"}>
                    {post.category}
                  </Badge>
                  <span className="text-xs text-[#8E8E93]">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-[#8E8E93] text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#1c1c1e]">Por: {post.author}</span>
                  <a href={`/blog/${post.id}`} className="text-[#0050FF] text-sm font-medium hover:underline">
                    Leer más
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[#8E8E93] mb-6">¿Buscas más contenido sobre edición de video y producción audiovisual?</p>
          <a 
            href="/forum" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#041C32] to-[#0050FF] text-white font-medium rounded-lg hover:from-[#0A2540] hover:to-[#0060FF] transition-all"
          >
            Visitar nuestro foro de comunidad
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;