import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

// Interfaz para categoría de foro
interface ForumCategory {
  id: number;
  name: string;
  description: string | null;
  slug: string;
}

// Slugify text function
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const NewTopicPage: React.FC = () => {
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login?redirect=/forum/new-topic');
    }
  }, [user, navigate]);

  // Consulta para obtener categorías
  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useQuery<ForumCategory[]>({
    queryKey: ['/api/forum/categories'],
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Mutación para crear nuevo tema
  const createTopicMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/forum/topics', data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el tema');
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidar consultas relacionadas
      queryClient.invalidateQueries({ queryKey: ['/api/forum/topics'] });
      
      // Mostrar mensaje de éxito
      toast({
        title: "Tema creado con éxito",
        description: "Tu tema ha sido publicado",
        variant: "default",
      });
      
      // Redirigir al foro
      navigate('/forum');
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear el tema",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Título requerido",
        description: "Por favor ingresa un título para tu tema",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Contenido requerido",
        description: "Por favor ingresa contenido para tu tema",
        variant: "destructive",
      });
      return;
    }
    
    if (!categoryId) {
      toast({
        title: "Categoría requerida",
        description: "Por favor selecciona una categoría para tu tema",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const topicData = {
      title,
      content,
      categoryId: parseInt(categoryId),
      slug: slugify(title) + '-' + Date.now().toString().slice(-6)
    };
    
    createTopicMutation.mutate(topicData);
  };

  if (!user) {
    return null; // El useEffect manejará la redirección
  }

  return (
    <Layout>
      <Helmet>
        <title>Crear Nuevo Tema | Foro de Comunidad | latamvideos.com</title>
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
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#041C32] to-[#0050FF] bg-clip-text text-transparent mb-6">
          Crear Nuevo Tema
        </h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Información del Tema</CardTitle>
              <CardDescription>
                Completa los siguientes campos para crear un nuevo tema de discusión
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del tema <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Introduce un título claro y descriptivo"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoría <span className="text-red-500">*</span></Label>
                <Select
                  value={categoryId}
                  onValueChange={setCategoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesLoading ? (
                      <SelectItem value="loading" disabled>Cargando categorías...</SelectItem>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Contenido <span className="text-red-500">*</span></Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe tu pregunta o tema en detalle"
                  required
                  className="min-h-[200px] w-full"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#0050FF] hover:bg-[#0040E0] gap-2"
                disabled={isSubmitting}
              >
                <Save size={16} />
                {isSubmitting ? 'Publicando...' : 'Publicar Tema'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default NewTopicPage;