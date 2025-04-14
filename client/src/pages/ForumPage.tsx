import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  User, 
  Clock, 
  Filter, 
  Eye, 
  MessageCircle, 
  PlusCircle,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';

// Interfaz para categoría de foro
interface ForumCategory {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  iconName: string | null;
  order: number;
  createdAt: string;
  topicCount?: number; // Agregado para mostrar cantidad de temas
}

// Interfaz para tema del foro
interface ForumTopic {
  id: number;
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
  isPinned: boolean;
  isClosed: boolean;
  viewCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: number;
    name: string;
    profilePicture: string | null;
  };
  replyCount?: number;
  lastActivity?: string;
}

// Mostrar tiempo transcurrido de forma amigable
function timeAgo(date: string) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diff < 60) return `hace ${diff} segundos`;
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
  if (diff < 2592000) return `hace ${Math.floor(diff / 86400)} días`;
  if (diff < 31536000) return `hace ${Math.floor(diff / 2592000)} meses`;
  return `hace ${Math.floor(diff / 31536000)} años`;
}

const ForumPage: React.FC = () => {
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recientes');
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 10;
  
  // Consulta para obtener categorías
  const { 
    data: categories, 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['/api/forum/categories'],
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
  
  // Consulta para obtener temas según filtro
  const { 
    data: topics, 
    isLoading: topicsLoading 
  } = useQuery({
    queryKey: ['/api/forum/topics', { filter: activeTab, page: currentPage }],
    staleTime: 1000 * 60, // 1 minuto
  });
  
  // Filtrar temas según búsqueda
  const filteredTopics = topics ? topics.filter((topic: ForumTopic) => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  
  // Calcular paginación
  const totalPages = Math.ceil((filteredTopics?.length || 0) / topicsPerPage);
  const currentTopics = filteredTopics.slice(
    (currentPage - 1) * topicsPerPage,
    currentPage * topicsPerPage
  );
  
  // Restablecer página al cambiar filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  
  // Restablecer página al buscar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  return (
    <Layout>
      <Helmet>
        <title>Foro de Comunidad | latamvideos.com</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#041C32] to-[#0050FF] bg-clip-text text-transparent">
              Foro de Comunidad
            </h1>
            <p className="text-muted-foreground mt-2">
              Conecta, aprende y comparte con otros profesionales del video en Latinoamérica
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Button 
                onClick={() => navigate('/forum/new-topic')}
                className="bg-[#0050FF] hover:bg-[#0040E0] gap-2"
              >
                <PlusCircle size={18} />
                Nuevo Tema
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/login?redirect=/forum/new-topic')}
                variant="outline"
                className="border-[#0050FF] text-[#0050FF] hover:bg-blue-50"
              >
                Iniciar sesión para participar
              </Button>
            )}
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar en el foro..."
                className="pl-9 w-full md:w-[260px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categoriesLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[100px] rounded-md" />
            ))
          ) : categories && categories.length > 0 ? (
            categories.map((category: ForumCategory) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <Link href={`/forum/category/${category.slug}`}>
                      <a className="hover:text-primary transition-colors">
                        {category.name}
                      </a>
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {category.description || 'Sin descripción disponible'}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <div className="text-muted-foreground text-sm flex items-center gap-1">
                    <MessageCircle size={14} />
                    <span>{category.topicCount || 0} temas</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 py-8 text-center">
              <p className="text-muted-foreground">No hay categorías disponibles</p>
            </div>
          )}
        </div>
        
        {/* Temas y filtros */}
        <Tabs defaultValue="recientes" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <TabsList className="h-auto">
              <TabsTrigger value="recientes" className="data-[state=active]:bg-[#0050FF] data-[state=active]:text-white">
                Recientes
              </TabsTrigger>
              <TabsTrigger value="populares" className="data-[state=active]:bg-[#0050FF] data-[state=active]:text-white">
                Populares
              </TabsTrigger>
              <TabsTrigger value="sin-respuesta" className="data-[state=active]:bg-[#0050FF] data-[state=active]:text-white">
                Sin respuesta
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Filtrar por:</span>
              <select className="bg-transparent border rounded px-2 py-1">
                <option value="all">Todas las categorías</option>
                {categories && categories.map((category: ForumCategory) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <TabsContent value="recientes" className="mt-0">
            <TopicList 
              topics={currentTopics} 
              isLoading={topicsLoading}
              emptyMessage="No hay temas recientes disponibles"
            />
          </TabsContent>
          
          <TabsContent value="populares" className="mt-0">
            <TopicList 
              topics={currentTopics} 
              isLoading={topicsLoading}
              emptyMessage="No hay temas populares disponibles"
            />
          </TabsContent>
          
          <TabsContent value="sin-respuesta" className="mt-0">
            <TopicList 
              topics={currentTopics} 
              isLoading={topicsLoading}
              emptyMessage="No hay temas sin respuesta disponibles"
            />
          </TabsContent>
        </Tabs>
        
        {/* Paginación */}
        {filteredTopics.length > 0 && totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </Layout>
  );
};

interface TopicListProps {
  topics: ForumTopic[];
  isLoading: boolean;
  emptyMessage: string;
}

const TopicList: React.FC<TopicListProps> = ({ topics, isLoading, emptyMessage }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-md" />
        ))}
      </div>
    );
  }
  
  if (topics.length === 0) {
    return (
      <div className="py-12 text-center border rounded-md">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <Card key={topic.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-lg">
                  <Link href={`/forum/topic/${topic.slug}`}>
                    <a className="hover:text-primary transition-colors">
                      {topic.title}
                    </a>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {topic.isPinned && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        Destacado
                      </Badge>
                    )}
                    {topic.isClosed && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                        Cerrado
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-1">
                  {topic.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{topic.author?.name || 'Usuario desconocido'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{timeAgo(topic.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{topic.viewCount} vistas</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{topic.replyCount || 0} respuestas</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ForumPage;