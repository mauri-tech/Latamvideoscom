import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2, Plus, Trash2, PenLine, ArrowLeft, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Esquema para creación/edición de elementos del portafolio
const portfolioItemSchema = z.object({
  title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  videoUrl: z.string().url({ message: "Debe ser una URL válida" }),
  thumbnailUrl: z.string().url({ message: "Debe ser una URL válida para la miniatura" }).optional(),
  videoType: z.string().optional(),
  duration: z.string().optional(),
  order: z.coerce.number().min(0).default(0),
});

type PortfolioItemFormValues = z.infer<typeof portfolioItemSchema>;

const VIDEO_TYPES = [
  { value: "corporate", label: "Corporativo" },
  { value: "commercial", label: "Comercial" },
  { value: "documentary", label: "Documental" },
  { value: "social", label: "Redes Sociales" },
  { value: "event", label: "Evento" },
  { value: "wedding", label: "Boda" },
  { value: "music", label: "Video Musical" },
  { value: "product", label: "Producto" },
  { value: "animation", label: "Animación" },
  { value: "other", label: "Otro" },
];

const ManagePortfolioPage = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  
  // Form para elementos del portafolio
  const form = useForm<PortfolioItemFormValues>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      videoType: "other",
      duration: "",
      order: 0,
    },
  });
  
  // Obtener datos del usuario actual
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/user'],
    retry: false,
    onError: () => {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para gestionar tu portafolio",
        variant: "destructive",
      });
      setLocation('/auth');
    }
  });
  
  // Obtener perfil profesional del usuario
  const { data: editorProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [currentUser ? `/api/editor-profiles/user/${currentUser.id}` : null],
    enabled: !!currentUser?.id,
    onError: (error: Error) => {
      if ((error as any).status !== 404) {
        toast({
          title: "Error",
          description: "No se pudo cargar tu perfil profesional",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Perfil no encontrado",
          description: "Primero debes crear tu perfil profesional",
          variant: "destructive",
        });
        setLocation('/edit-profile');
      }
    }
  });
  
  // Obtener elementos del portafolio
  const { data: portfolioItems, isLoading: isLoadingPortfolio } = useQuery({
    queryKey: ['/api/portfolio', editorProfile?.id],
    enabled: !!editorProfile?.id,
  });
  
  // Mutación para crear un nuevo elemento de portafolio
  const createPortfolioItemMutation = useMutation({
    mutationFn: async (data: PortfolioItemFormValues) => {
      const res = await apiRequest('POST', '/api/portfolio', {
        ...data,
        editorProfileId: editorProfile?.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({
        title: "¡Éxito!",
        description: "Elemento de portafolio creado correctamente",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo crear el elemento de portafolio: " + error.message,
        variant: "destructive",
      });
    }
  });
  
  // Mutación para actualizar un elemento existente
  const updatePortfolioItemMutation = useMutation({
    mutationFn: async (data: { id: number, values: PortfolioItemFormValues }) => {
      const res = await apiRequest('PUT', `/api/portfolio/${data.id}`, data.values);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({
        title: "¡Éxito!",
        description: "Elemento de portafolio actualizado correctamente",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el elemento de portafolio: " + error.message,
        variant: "destructive",
      });
    }
  });
  
  // Mutación para eliminar un elemento
  const deletePortfolioItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/portfolio/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({
        title: "Elemento eliminado",
        description: "El elemento ha sido eliminado del portafolio",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo eliminar el elemento: " + error.message,
        variant: "destructive",
      });
    }
  });
  
  // Manejar envío del formulario
  const onSubmit = (values: PortfolioItemFormValues) => {
    if (isEditMode && currentItemId) {
      updatePortfolioItemMutation.mutate({ id: currentItemId, values });
    } else {
      createPortfolioItemMutation.mutate(values);
    }
  };
  
  // Abrir el formulario para crear un nuevo elemento
  const openCreateForm = () => {
    setIsEditMode(false);
    setCurrentItemId(null);
    form.reset({
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      videoType: "other",
      duration: "",
      order: portfolioItems?.length ? portfolioItems.length : 0,
    });
    setIsDialogOpen(true);
  };
  
  // Abrir el formulario para editar un elemento existente
  const openEditForm = (item: any) => {
    setIsEditMode(true);
    setCurrentItemId(item.id);
    form.reset({
      title: item.title,
      description: item.description || "",
      videoUrl: item.videoUrl,
      thumbnailUrl: item.thumbnailUrl || "",
      videoType: item.videoType || "other",
      duration: item.duration || "",
      order: item.order || 0,
    });
    setIsDialogOpen(true);
  };
  
  // Eliminar un elemento
  const deleteItem = (id: number) => {
    deletePortfolioItemMutation.mutate(id);
  };
  
  const isLoading = isLoadingUser || isLoadingProfile || isLoadingPortfolio;
  const isPending = createPortfolioItemMutation.isPending || updatePortfolioItemMutation.isPending || deletePortfolioItemMutation.isPending;
  
  // Extraer el ID de YouTube o Vimeo de una URL
  const getVideoId = (url: string): string | null => {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) return youtubeMatch[1];
    
    // Vimeo
    const vimeoRegex = /vimeo\.com\/(?:video\/)?([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) return vimeoMatch[1];
    
    return null;
  };
  
  // Generar URL de miniatura si no se proporciona una
  const generateThumbnail = () => {
    const videoUrl = form.getValues("videoUrl");
    if (!videoUrl) return;
    
    const videoId = getVideoId(videoUrl);
    if (!videoId) return;
    
    let thumbnailUrl = "";
    
    if (videoUrl.includes("youtube")) {
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } else if (videoUrl.includes("vimeo")) {
      // Vimeo requiere API para miniaturas, usamos un placeholder
      thumbnailUrl = `https://i.vimeocdn.com/video/${videoId}_640.jpg`;
    }
    
    if (thumbnailUrl) {
      form.setValue("thumbnailUrl", thumbnailUrl);
    }
  };
  
  // Formatear duración
  const formatDuration = (duration: string) => {
    if (!duration) return "";
    
    // Si ya tiene formato MM:SS o HH:MM:SS, devolverlo tal cual
    if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(duration)) {
      return duration;
    }
    
    // Intentar convertir segundos a formato MM:SS
    const seconds = parseInt(duration);
    if (!isNaN(seconds)) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return duration;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Gestionar portafolio | latamvideos.com</title>
        <meta name="description" content="Gestiona tu portafolio de trabajos en latamvideos.com para mostrar tus mejores proyectos a potenciales clientes." />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-2"
              onClick={() => setLocation('/edit-profile')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver a perfil
            </Button>
            <h1 className="text-2xl font-bold">Gestionar Portafolio</h1>
            <p className="text-gray-500">Añade y organiza tus trabajos destacados</p>
          </div>
          
          <Button onClick={openCreateForm}>
            <Plus className="h-4 w-4 mr-2" /> Agregar proyecto
          </Button>
        </div>
        
        {!portfolioItems || portfolioItems.length === 0 ? (
          <Card className="text-center p-12">
            <CardContent className="pt-10">
              <p className="text-gray-500 mb-4">Aún no has agregado proyectos a tu portafolio</p>
              <Button onClick={openCreateForm}>
                <Plus className="h-4 w-4 mr-2" /> Agregar mi primer proyecto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...portfolioItems].sort((a: any, b: any) => a.order - b.order).map((item: any) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  {item.thumbnailUrl ? (
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">Sin miniatura</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={item.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white text-primary p-2 rounded-full"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  )}
                  {item.videoType && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      {VIDEO_TYPES.find(t => t.value === item.videoType)?.label || item.videoType}
                    </div>
                  )}
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openEditForm(item)}
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente este elemento de tu portafolio.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Diálogo para crear/editar elementos del portafolio */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Editar proyecto" : "Agregar nuevo proyecto"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Actualiza la información de este elemento de tu portafolio" 
                : "Agrega un nuevo proyecto a tu portafolio para mostrar tus habilidades"
              }
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del proyecto *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Video promocional para Nike" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="videoType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de video</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {VIDEO_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duración</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="00:00 (MM:SS)" 
                          {...field} 
                          onChange={(e) => {
                            const formatted = formatDuration(e.target.value);
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Formato: Minutos:Segundos (MM:SS)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL del video *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          // Al actualizar la URL, intentar generar la miniatura automáticamente
                          setTimeout(generateThumbnail, 500);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      URL de YouTube, Vimeo u otra plataforma de video
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miniatura</FormLabel>
                    <div className="space-y-4">
                      {field.value && (
                        <div className="relative w-full h-40 rounded-md overflow-hidden border">
                          <img 
                            src={field.value.startsWith('/uploads') ? field.value : field.value} 
                            alt="Miniatura"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <FormControl>
                            <Input placeholder="URL de imagen (opcional)" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL de miniatura o sube una imagen
                          </FormDescription>
                        </div>
                        
                        <div className="space-y-2">
                          <Input 
                            type="file" 
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0] && currentItemId) {
                                const formData = new FormData();
                                formData.append('thumbnail', e.target.files[0]);
                                
                                try {
                                  const res = await fetch(`/api/portfolio/${currentItemId}/thumbnail`, {
                                    method: 'POST',
                                    credentials: 'include',
                                    body: formData
                                  });
                                  
                                  if (!res.ok) {
                                    throw new Error('Error al subir la imagen');
                                  }
                                  
                                  const data = await res.json();
                                  field.onChange(data.thumbnailUrl);
                                  
                                  toast({
                                    title: "¡Éxito!",
                                    description: "Miniatura actualizada correctamente",
                                  });
                                  
                                  // Invalidar la consulta del portafolio para actualizar los datos en caché
                                  queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
                                } catch (error) {
                                  toast({
                                    title: "Error",
                                    description: error instanceof Error ? error.message : "Error al subir la imagen",
                                    variant: "destructive",
                                  });
                                }
                              } else if (e.target.files && e.target.files[0] && !currentItemId) {
                                toast({
                                  title: "Información",
                                  description: "Primero guarda el proyecto para poder subir una imagen",
                                });
                              }
                            }}
                          />
                          <div className="text-xs text-muted-foreground mt-1">
                            Archivos de hasta 5MB (JPG, PNG, GIF)
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          variant="link" 
                          size="sm" 
                          onClick={generateThumbnail}
                          className="text-xs px-0"
                        >
                          Generar automáticamente desde YouTube/Vimeo
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe brevemente este proyecto" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden en el portafolio</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Número que determina el orden de visualización (menor número = aparece primero)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditMode ? "Actualizar" : "Agregar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ManagePortfolioPage;