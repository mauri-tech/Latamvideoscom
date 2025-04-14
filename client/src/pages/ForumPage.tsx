import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Users, Video, Headphones, PenTool, Film, MessageSquare, Clock, Eye, Pin, 
  Star, Lightbulb, MessageCircle, HelpCircle, Check, ChevronRight, BadgeCheck, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

export default function ForumPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    // Simulación de carga del foro
    toast({
      title: "Foro en desarrollo",
      description: "El foro está actualmente en desarrollo. ¡Pronto podrás participar!",
    });
  }, []);

  // Datos simulados para el diseño
  const forumCategories = [
    { id: 1, name: "Editores de Video", icon: <Video className="h-5 w-5 text-blue-500" />, count: 156, description: "Discusiones sobre técnicas, software y flujos de trabajo para edición de video" },
    { id: 2, name: "Videógrafos", icon: <Film className="h-5 w-5 text-green-500" />, count: 89, description: "Compartir consejos de filmación, equipo y producción audiovisual" },
    { id: 3, name: "Diseñadores", icon: <PenTool className="h-5 w-5 text-purple-500" />, count: 104, description: "Recursos y tendencias de diseño gráfico, motion graphics y animación" },
    { id: 4, name: "Audio y Música", icon: <Headphones className="h-5 w-5 text-red-500" />, count: 72, description: "Todo sobre sonido, mezcla, edición de audio y música para producciones" },
    { id: 5, name: "Producción", icon: <Film className="h-5 w-5 text-amber-500" />, count: 67, description: "Planificación, dirección y producción general de proyectos audiovisuales" },
    { id: 6, name: "General", icon: <MessageSquare className="h-5 w-5 text-gray-500" />, count: 183, description: "Temas diversos, novedades del sector y conversaciones off-topic" },
  ];

  const recentTopics = [
    {
      id: 1,
      title: "¿Cuál es el mejor flujo de trabajo para editar videos de YouTube en 2023?",
      author: { name: "Carlos Mendoza", role: "Editor", level: "Mentor", avatar: "" },
      category: "Editores de Video",
      replies: 23,
      views: 238,
      lastActivity: "hace 2 horas",
      isPinned: true,
    },
    {
      id: 2,
      title: "Problemas con la estabilización en DaVinci Resolve 18",
      author: { name: "Luciana Pérez", role: "Videógrafa", level: "Colaborador", avatar: "" },
      category: "Editores de Video",
      replies: 14,
      views: 126,
      lastActivity: "hace 4 horas",
      isPinned: false,
    },
    {
      id: 3,
      title: "Recursos gratuitos para Motion Graphics en After Effects",
      author: { name: "Manuel Ortega", role: "Diseñador", level: "Conector", avatar: "" },
      category: "Diseñadores",
      replies: 43,
      views: 512,
      lastActivity: "hace 6 horas",
      isPinned: false,
    },
    {
      id: 4,
      title: "¿Cómo cobrar por proyectos audiovisuales en Latinoamérica?",
      author: { name: "Diana Torres", role: "Productora", level: "Maestro", avatar: "" },
      category: "General",
      replies: 76,
      views: 894,
      lastActivity: "hace 1 día",
      isPinned: true,
    },
    {
      id: 5,
      title: "Técnicas avanzadas de correción de color para videoclips",
      author: { name: "Roberto Silva", role: "Editor", level: "Conector", avatar: "" },
      category: "Editores de Video",
      replies: 18,
      views: 214,
      lastActivity: "hace 1 día",
      isPinned: false,
    }
  ];

  const popularTopics = [
    {
      id: 6,
      title: "Lista completa de recursos gratuitos para editores en 2023",
      author: { name: "Raúl Jiménez", role: "Editor", level: "Maestro", avatar: "" },
      category: "General",
      replies: 158,
      views: 4287,
      lastActivity: "hace 3 días",
      isPinned: false,
    },
    {
      id: 7,
      title: "Guía definitiva para optimizar el rendimiento de Premiere Pro",
      author: { name: "Alejandra Montes", role: "Editora", level: "Mentor", avatar: "" },
      category: "Editores de Video",
      replies: 126,
      views: 3198,
      lastActivity: "hace 5 días",
      isPinned: false,
    }
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Explorador":
        return <Badge variant="outline" className="text-gray-500">Explorador</Badge>;
      case "Colaborador":
        return <Badge variant="outline" className="text-blue-400">Colaborador</Badge>;
      case "Conector":
        return <Badge variant="outline" className="text-blue-600">Conector</Badge>;
      case "Mentor":
        return <Badge variant="outline" className="text-emerald-600">Mentor</Badge>;
      case "Maestro":
        return <Badge variant="outline" className="text-amber-500">Maestro <BadgeCheck className="h-3 w-3 ml-1" /></Badge>;
      default:
        return <Badge variant="outline" className="text-gray-500">Explorador</Badge>;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Foro de la Comunidad | latamvideos.com</title>
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Foro de la Comunidad</h1>
              <p className="text-muted-foreground mt-2">
                Un espacio para compartir conocimientos, resolver dudas y conectar con otros profesionales del video.
              </p>
            </div>
            <div>
              {user ? (
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Crear tema
                </Button>
              ) : (
                <Button variant="outline" onClick={() => toast({
                  title: "Inicia sesión para participar",
                  description: "Necesitas una cuenta para crear temas en el foro",
                })}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Crear tema
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {forumCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {category.icon}
                      <CardTitle className="ml-2 text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <Button variant="link" className="px-0">
                    Explorar <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/40 p-4 rounded-lg mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold">Nivel de comunidad</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="border bg-background rounded p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Explorador</p>
                <p className="text-xs">+5 pts / post</p>
              </div>
              <div className="border bg-background rounded p-3 text-center">
                <p className="text-sm text-blue-400 mb-1">Colaborador</p>
                <p className="text-xs">+2 pts / comentario</p>
              </div>
              <div className="border bg-background rounded p-3 text-center">
                <p className="text-sm text-blue-600 mb-1">Conector</p>
                <p className="text-xs">+3 pts / voto positivo</p>
              </div>
              <div className="border bg-background rounded p-3 text-center">
                <p className="text-sm text-emerald-600 mb-1">Mentor</p>
                <p className="text-xs">+10 pts / resp. útil</p>
              </div>
              <div className="border bg-background rounded p-3 text-center">
                <p className="text-sm text-amber-500 mb-1">Maestro</p>
                <p className="text-xs">Nivel élite</p>
              </div>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">Todos los temas</TabsTrigger>
                <TabsTrigger value="recent">Más recientes</TabsTrigger>
                <TabsTrigger value="popular">Más populares</TabsTrigger>
                <TabsTrigger value="unanswered">Sin respuesta</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Actualizado hace 5 min</span>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div>
                {recentTopics.map((topic) => (
                  <div key={topic.id} className="border-b border-border last:border-0">
                    <div className="py-4 px-1">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <Avatar className="h-9 w-9 mr-4">
                            <AvatarImage src={topic.author.avatar} />
                            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              {topic.isPinned && <Pin className="h-4 w-4 text-red-500 mr-2" />}
                              <h3 className="font-semibold text-base">
                                <a href="#" className="hover:text-primary transition-colors">{topic.title}</a>
                              </h3>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {topic.replies} respuestas
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {topic.views} vistas
                              </span>
                              <span>{topic.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm">{topic.author.name}</span>
                            {getLevelBadge(topic.author.level)}
                          </div>
                          <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {popularTopics.map((topic) => (
                  <div key={topic.id} className="border-b border-border last:border-0">
                    <div className="py-4 px-1">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <Avatar className="h-9 w-9 mr-4">
                            <AvatarImage src={topic.author.avatar} />
                            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              {topic.isPinned && <Pin className="h-4 w-4 text-red-500 mr-2" />}
                              <h3 className="font-semibold text-base">
                                <a href="#" className="hover:text-primary transition-colors">{topic.title}</a>
                              </h3>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {topic.replies} respuestas
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {topic.views} vistas
                              </span>
                              <span>{topic.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm">{topic.author.name}</span>
                            {getLevelBadge(topic.author.level)}
                          </div>
                          <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Cargar más temas</Button>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div>
                {recentTopics.map((topic) => (
                  <div key={topic.id} className="border-b border-border last:border-0">
                    <div className="py-4 px-1">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <Avatar className="h-9 w-9 mr-4">
                            <AvatarImage src={topic.author.avatar} />
                            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              {topic.isPinned && <Pin className="h-4 w-4 text-red-500 mr-2" />}
                              <h3 className="font-semibold text-base">
                                <a href="#" className="hover:text-primary transition-colors">{topic.title}</a>
                              </h3>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {topic.replies} respuestas
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {topic.views} vistas
                              </span>
                              <span>{topic.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm">{topic.author.name}</span>
                            {getLevelBadge(topic.author.level)}
                          </div>
                          <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Cargar más temas</Button>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-4">
              <div>
                {popularTopics.map((topic) => (
                  <div key={topic.id} className="border-b border-border last:border-0">
                    <div className="py-4 px-1">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <Avatar className="h-9 w-9 mr-4">
                            <AvatarImage src={topic.author.avatar} />
                            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              <Star className="h-4 w-4 text-amber-500 mr-2" />
                              <h3 className="font-semibold text-base">
                                <a href="#" className="hover:text-primary transition-colors">{topic.title}</a>
                              </h3>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {topic.replies} respuestas
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {topic.views} vistas
                              </span>
                              <span>{topic.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm">{topic.author.name}</span>
                            {getLevelBadge(topic.author.level)}
                          </div>
                          <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Cargar más temas</Button>
              </div>
            </TabsContent>

            <TabsContent value="unanswered" className="space-y-4">
              <div className="text-center py-24">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay temas sin respuesta</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                  ¡Nuestra comunidad es muy activa! Todos los temas actuales han recibido al menos una respuesta.
                </p>
                <Button>Crear un nuevo tema</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}