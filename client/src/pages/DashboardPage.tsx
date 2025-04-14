import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Mail, 
  Plus, 
  FileText, 
  Clock, 
  Check, 
  X,
  Upload
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch profile stats for editor
  const { 
    data: editorProfile,
    isLoading: profileLoading
  } = useQuery({
    queryKey: [user ? `/api/editor-profiles/user/${user.id}` : null],
    enabled: !!user && user.userType === 'editor',
  });
  
  // Fetch portfolio items
  const {
    data: portfolioItems = [],
    isLoading: portfolioLoading
  } = useQuery({
    queryKey: [editorProfile ? `/api/portfolio/${editorProfile.id}` : null],
    enabled: !!editorProfile,
  });
  
  // Fetch briefs for editor
  const {
    data: editorBriefs = [],
    isLoading: editorBriefsLoading
  } = useQuery({
    queryKey: [editorProfile ? `/api/briefs/editor/${editorProfile.id}` : null],
    enabled: !!editorProfile,
  });
  
  // Fetch briefs for client
  const {
    data: clientBriefs = [],
    isLoading: clientBriefsLoading
  } = useQuery({
    queryKey: [user && user.userType === 'client' ? `/api/briefs/client/${user.id}` : null],
    enabled: !!user && user.userType === 'client',
  });
  
  // Default empty data structures
  const emptyProfile = {
    id: 0,
    viewCount: 0,
    contactClickCount: 0,
  };
  
  const emptyPortfolioItems: any[] = [];
  
  const emptyBriefs: any[] = [];
  
  // Chart data
  const viewsData = [
    { name: 'Lun', views: 23 },
    { name: 'Mar', views: 45 },
    { name: 'Mié', views: 32 },
    { name: 'Jue', views: 67 },
    { name: 'Vie', views: 89 },
    { name: 'Sáb', views: 53 },
    { name: 'Dom', views: 39 },
  ];
  
  // Use real data if available, otherwise use empty data
  const profile = editorProfile || emptyProfile;
  const portfolio = portfolioItems.length > 0 ? portfolioItems : emptyPortfolioItems;
  const briefs = user?.userType === 'editor' 
    ? (editorBriefs.length > 0 ? editorBriefs : emptyBriefs)
    : (clientBriefs.length > 0 ? clientBriefs : emptyBriefs);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date instanceof Date ? date : new Date(date));
  };
  
  const getBriefStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pendiente</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Aceptado</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rechazado</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Completado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F2F2F7]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso restringido</h1>
          <p className="text-[#8E8E93] mb-6">Debes iniciar sesión para acceder a tu dashboard.</p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button>Iniciar sesión</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">Registrarme</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Dashboard | EditoresLATAM</title>
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <div className="flex space-x-4">
            <Link href="/editar-perfil">
              <Button variant="secondary">
                <Plus className="mr-2 h-4 w-4" />
                {editorProfile ? 'Editar mi perfil' : 'Crear perfil profesional'}
              </Button>
            </Link>
            
            {user.userType === 'editor' && editorProfile && (
              <Link href={`/editor/${profile.id}`}>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver mi perfil público
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Resumen</TabsTrigger>
            {user.userType === 'editor' && (
              <>
                <TabsTrigger value="portfolio" className="flex-1">Portafolio</TabsTrigger>
                <TabsTrigger value="stats" className="flex-1">Estadísticas</TabsTrigger>
              </>
            )}
            <TabsTrigger value="briefs" className="flex-1">
              {user.userType === 'editor' ? 'Solicitudes recibidas' : 'Mis solicitudes'}
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {user.userType === 'editor' && (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Visitas al perfil</CardTitle>
                      <CardDescription>Últimos 30 días</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-2xl font-bold">{profile.viewCount}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Clics en contacto</CardTitle>
                      <CardDescription>Últimos 30 días</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-2xl font-bold">{profile.contactClickCount}</span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    {user.userType === 'editor' ? 'Briefs pendientes' : 'Solicitudes activas'}
                  </CardTitle>
                  <CardDescription>Requieren tu atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">
                      {briefs.filter(brief => brief.status === 'pending').length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Actividad reciente</h2>
              
              {briefs.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[#8E8E93] mb-4">No hay actividad reciente para mostrar.</p>
                    {user.userType === 'client' && (
                      <Link href="/search">
                        <Button>Buscar editores</Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {briefs.slice(0, 3).map((brief) => (
                    <Card key={brief.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {user.userType === 'editor' ? brief.clientName : 'Tu solicitud a un editor'}
                            </p>
                            <p className="text-sm text-[#8E8E93] mt-1">
                              {brief.projectType.charAt(0).toUpperCase() + brief.projectType.slice(1)}: {brief.description}
                            </p>
                            <div className="flex items-center mt-2">
                              <Clock className="h-4 w-4 text-[#8E8E93] mr-1" />
                              <span className="text-xs text-[#8E8E93]">
                                {formatDate(brief.createdAt)}
                              </span>
                              <div className="ml-4">{getBriefStatusBadge(brief.status)}</div>
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-semibold text-primary">${brief.budget} USD</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Portfolio Tab (Editor only) */}
          {user.userType === 'editor' && (
            <TabsContent value="portfolio" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Mi Portafolio</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar proyecto
                </Button>
              </div>
              
              {portfolioLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-full h-24 rounded-lg" />
                  ))}
                </div>
              ) : portfolio.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[#8E8E93] mb-4">
                      Aún no tienes proyectos en tu portafolio. Agrega algunos para mostrar tu trabajo.
                    </p>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Subir mi primer proyecto
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {portfolio.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <a 
                              href={item.videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              {item.videoUrl}
                            </a>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Editar</Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
          
          {/* Stats Tab (Editor only) */}
          {user.userType === 'editor' && (
            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitas a tu perfil</CardTitle>
                  <CardDescription>Últimos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={viewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#007AFF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tasa de conversión</CardTitle>
                    <CardDescription>
                      Porcentaje de visitas que resultan en contactos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-center text-primary">
                      {profile.viewCount > 0 
                        ? Math.round((profile.contactClickCount / profile.viewCount) * 100) 
                        : 0}%
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Proyectos completados</CardTitle>
                    <CardDescription>
                      Basado en briefs marcados como completados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-center text-primary">
                      {briefs.filter(brief => brief.status === 'completed').length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
          
          {/* Briefs Tab */}
          <TabsContent value="briefs" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {user.userType === 'editor' ? 'Solicitudes recibidas' : 'Mis solicitudes'}
              </h2>
              
              {user.userType === 'client' && (
                <Link href="/search">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva solicitud
                  </Button>
                </Link>
              )}
            </div>
            
            {(user.userType === 'editor' ? editorBriefsLoading : clientBriefsLoading) ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-32 rounded-lg" />
                ))}
              </div>
            ) : briefs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-[#8E8E93] mb-4">
                    {user.userType === 'editor' 
                      ? 'Aún no has recibido solicitudes de clientes.' 
                      : 'Aún no has enviado solicitudes a editores.'}
                  </p>
                  {user.userType === 'client' && (
                    <Link href="/search">
                      <Button>Buscar editores</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {briefs.map((brief) => (
                  <Card key={brief.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">
                              {user.userType === 'editor' 
                                ? `Solicitud de ${brief.clientName}` 
                                : `Solicitud para ${brief.projectType}`}
                            </h3>
                            {getBriefStatusBadge(brief.status)}
                          </div>
                          
                          <p className="text-sm mb-2">{brief.description}</p>
                          
                          <div className="flex items-center text-xs text-[#8E8E93]">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Recibido el {formatDate(brief.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-right">
                            <p className="text-sm text-[#8E8E93]">Presupuesto</p>
                            <p className="text-xl font-semibold text-primary">${brief.budget} USD</p>
                          </div>
                          
                          {user.userType === 'editor' && brief.status === 'pending' && (
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                                <Check className="h-4 w-4 mr-1" />
                                Aceptar
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                                <X className="h-4 w-4 mr-1" />
                                Rechazar
                              </Button>
                            </div>
                          )}
                          
                          {user.userType === 'client' && (
                            <Button size="sm" variant="outline" className="mt-4">
                              Ver detalles
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
