import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation, useRoute } from 'wouter';
import { Helmet } from 'react-helmet';
import { 
  MessageSquare, 
  User, 
  Clock, 
  Eye, 
  ArrowLeft,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

// Interfaces
interface ForumAuthor {
  id: number;
  name: string;
  profilePicture: string | null;
}

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
  author?: ForumAuthor;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface ForumPost {
  id: number;
  content: string;
  authorId: number;
  topicId: number;
  isAcceptedAnswer: boolean;
  createdAt: string;
  updatedAt: string;
  author?: ForumAuthor;
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

const TopicDetailPage: React.FC = () => {
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const [match, params] = useRoute('/forum/topic/:slug');
  const [replyContent, setReplyContent] = useState('');
  const slug = params?.slug;
  
  // Consulta para obtener detalles del tema
  const { 
    data: topic,
    isLoading: topicLoading,
    error: topicError
  } = useQuery<ForumTopic>({
    queryKey: ['/api/forum/topics/slug', slug],
    enabled: !!slug,
    staleTime: 1000 * 60, // 1 minuto
  });
  
  // Consulta para obtener respuestas
  const { 
    data: posts = [],
    isLoading: postsLoading
  } = useQuery<ForumPost[]>({
    queryKey: ['/api/forum/posts', topic?.id],
    enabled: !!topic?.id,
    staleTime: 1000 * 60, // 1 minuto
  });
  
  // Mutación para crear respuesta
  const createReplyMutation = useMutation({
    mutationFn: async (data: { content: string; topicId: number }) => {
      const response = await apiRequest('POST', '/api/forum/posts', data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al publicar respuesta');
      }
      return response.json();
    },
    onSuccess: () => {
      // Limpiar el campo de respuesta
      setReplyContent('');
      
      // Invalidar consultas relacionadas
      queryClient.invalidateQueries({ queryKey: ['/api/forum/posts', topic?.id] });
      
      // Mostrar mensaje de éxito
      toast({
        title: "Respuesta publicada",
        description: "Tu respuesta ha sido publicada correctamente",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sesión requerida",
        description: "Debes iniciar sesión para responder",
        variant: "destructive",
      });
      navigate('/login?redirect=/forum/topic/' + slug);
      return;
    }
    
    if (!replyContent.trim()) {
      toast({
        title: "Contenido requerido",
        description: "Por favor ingresa contenido para tu respuesta",
        variant: "destructive",
      });
      return;
    }
    
    if (topic) {
      createReplyMutation.mutate({
        content: replyContent,
        topicId: topic.id
      });
    }
  };
  
  // Error y carga
  if (topicError) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tema no encontrado
            </h2>
            <p className="text-muted-foreground mb-6">
              El tema que estás buscando no existe o ha sido eliminado.
            </p>
            <Button onClick={() => navigate('/forum')}>
              Volver al foro
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (topicLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[300px] w-full mb-6" />
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-[150px] w-full" />
            <Skeleton className="h-[150px] w-full" />
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Helmet>
        <title>{topic ? `${topic.title} | Foro` : 'Cargando tema...'} | latamvideos.com</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/forum')}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Volver al foro
          </Button>
        </div>
        
        {topic && (
          <>
            <div className="flex flex-col gap-2 mb-6">
              <h1 className="text-3xl font-bold">
                {topic.title}
              </h1>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
                  <span>{posts.length} respuestas</span>
                </div>
                {topic.category && (
                  <Badge variant="outline">
                    {topic.category.name}
                  </Badge>
                )}
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
            </div>
            
            {/* Contenido principal */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <Avatar className="h-10 w-10">
                  {topic.author?.profilePicture ? (
                    <AvatarImage src={topic.author.profilePicture} alt={topic.author.name} />
                  ) : (
                    <AvatarFallback>{topic.author?.name.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{topic.author?.name || 'Usuario desconocido'}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag size={16} className="mr-2" />
                          Reportar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <span className="text-xs text-muted-foreground">Autor del tema • {timeAgo(topic.createdAt)}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="prose prose-blue max-w-none">
                  {topic.content}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ThumbsUp size={16} />
                  <span>Me gusta</span>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Respuestas */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">
                Respuestas ({posts.length})
              </h2>
              
              {postsLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-[150px] w-full" />
                  <Skeleton className="h-[150px] w-full" />
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <Avatar className="h-10 w-10">
                          {post.author?.profilePicture ? (
                            <AvatarImage src={post.author.profilePicture} alt={post.author.name} />
                          ) : (
                            <AvatarFallback>{post.author?.name.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{post.author?.name || 'Usuario desconocido'}</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Flag size={16} className="mr-2" />
                                  Reportar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <span className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="prose prose-blue max-w-none">
                          {post.content}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md">
                  <p className="text-muted-foreground mb-2">
                    No hay respuestas aún. ¡Sé el primero en responder!
                  </p>
                </div>
              )}
            </div>
            
            {/* Formulario de respuesta */}
            {!topic.isClosed ? (
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">
                  Tu respuesta
                </h2>
                
                <form onSubmit={handleSubmitReply}>
                  <Textarea
                    placeholder={user ? "Escribe tu respuesta aquí..." : "Inicia sesión para responder"}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    disabled={!user || topic.isClosed || createReplyMutation.isPending}
                    className="min-h-[120px] mb-4"
                  />
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#0050FF] hover:bg-[#0040E0] gap-2"
                      disabled={!user || topic.isClosed || createReplyMutation.isPending}
                    >
                      <Send size={16} />
                      {createReplyMutation.isPending ? 'Enviando...' : 'Enviar respuesta'}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center text-red-800">
                <p>Este tema está cerrado y no acepta nuevas respuestas.</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default TopicDetailPage;