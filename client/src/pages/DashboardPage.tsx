import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Eye,
  Mail,
  Plus,
  FileText,
  Clock,
  Check,
  X,
  Upload,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  // Use real data if available, otherwise use empty data
  const profile = editorProfile || emptyProfile;
  const portfolio = portfolioItems.length > 0 ? portfolioItems : emptyPortfolioItems;
  const briefs = user?.userType === 'editor'
    ? (editorBriefs.length > 0 ? editorBriefs : emptyBriefs)
    : (clientBriefs.length > 0 ? clientBriefs : emptyBriefs);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
    }).format(date instanceof Date ? date : new Date(date));
  };

  const getBriefStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 rounded-md font-medium">Pendiente</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-md font-medium">Aceptado</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 rounded-md font-medium">Rechazado</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded-md font-medium">Completado</Badge>;
      default:
        return <Badge variant="outline" className="rounded-md">Desconocido</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <Header />
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Acceso restringido</h1>
          <p className="text-muted-foreground mb-8">Inicia sesión para ver tu panel de control.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button className="rounded-full px-8">Iniciar sesión</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Dashboard | LatamVideos</title>
      </Helmet>
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Hola, {user.name.split(' ')[0]}</h1>
            <p className="text-muted-foreground mt-1">Aquí tienes un resumen de tu actividad.</p>
          </div>

          <div className="flex gap-3">
            {user.userType === 'editor' && editorProfile ? (
              <Link href={`/editor/${profile.id}`}>
                <Button variant="outline" className="rounded-full border-gray-200 hover:border-black hover:bg-transparent transition-all">
                  Ver mi perfil público
                </Button>
              </Link>
            ) : user.userType === 'editor' ? (
              <Link href="/editar-perfil">
                <Button className="rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear perfil profesional
                </Button>
              </Link>
            ) : (
              <Link href="/search">
                <Button className="rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Plus className="mr-2 h-4 w-4" />
                  Buscar editores
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Stats Overview - At a Glance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {user.userType === 'editor' && (
            <>
              <Card className="rounded-2xl border-0 shadow-card bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <Eye className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Vistas del perfil</p>
                    <h2 className="text-3xl font-bold text-foreground">{profile.viewCount}</h2>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-0 shadow-card bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">30d</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Solicitudes de contacto</p>
                    <h2 className="text-3xl font-bold text-foreground">{profile.contactClickCount}</h2>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="rounded-2xl border-0 shadow-card bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-50 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Activos</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {user.userType === 'editor' ? 'Briefs pendientes' : 'Solicitudes activas'}
                </p>
                <h2 className="text-3xl font-bold text-foreground">
                  {briefs.filter(brief => brief.status === 'pending').length}
                </h2>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-8 justify-start gap-8">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground transition-all"
            >
              Resumen
            </TabsTrigger>
            {user.userType === 'editor' && (
              <TabsTrigger
                value="portfolio"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground transition-all"
              >
                Portafolio
              </TabsTrigger>
            )}
            <TabsTrigger
              value="briefs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground transition-all"
            >
              {user.userType === 'editor' ? 'Solicitudes' : 'Mis proyectos'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Content */}
          <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
            <h3 className="text-xl font-bold mb-6">Actividad Reciente</h3>

            {briefs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-0 shadow-card">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sin actividad reciente</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                  {user.userType === 'editor'
                    ? 'Aún no has recibido solicitudes. Completa tu perfil para aumentar tu visibilidad.'
                    : 'Comienza tu primer proyecto contactando a un editor.'}
                </p>
                {user.userType === 'client' && (
                  <Link href="/search">
                    <Button className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">Explorar editores</Button>
                  </Link>
                )}
                {user.userType === 'editor' && !editorProfile && (
                  <Link href="/editar-perfil">
                    <Button className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">Crear Perfil</Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {briefs.slice(0, 5).map((brief) => (
                  <div key={brief.id} className="group bg-white rounded-2xl p-6 border-0 shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {user.userType === 'editor' ? brief.clientName : brief.projectType}
                        </h4>
                        {getBriefStatusBadge(brief.status)}
                      </div>
                      <p className="text-muted-foreground line-clamp-1 mb-3">{brief.description}</p>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {formatDate(brief.createdAt)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center min-w-[120px]">
                      <span className="text-2xl font-bold text-foreground">${brief.budget}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Presupuesto</span>
                    </div>
                  </div>
                ))}

                <Button variant="ghost" className="w-full mt-4 text-primary font-medium hover:bg-transparent hover:underline" onClick={() => setActiveTab('briefs')}>
                  Ver todas las solicitudes <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="mt-0 focus-visible:outline-none">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Mis proyectos destacados</h3>
              <Button className="rounded-full shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Agregar proyecto
              </Button>
            </div>

            {portfolioLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="rounded-2xl h-64 w-full" />
                ))}
              </div>
            ) : portfolio.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-0 shadow-card">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tu portafolio está vacío</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                  Sube tus mejores videos para impresionar a potenciales clientes.
                </p>
                <Button className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                  Subir primer proyecto
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group">
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {item.thumbnailUrl ? (
                        <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">No preview</div>
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-foreground line-clamp-1 mb-1">{item.title}</h4>
                      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors truncate block">
                        {item.videoUrl}
                      </a>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                        <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">Editar</Button>
                        <Button size="sm" variant="ghost" className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">Eliminar</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Briefs Tab Detail */}
          <TabsContent value="briefs" className="mt-0 focus-visible:outline-none">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Gestión de Solicitudes</h3>
              {user.userType === 'client' && (
                <Link href="/search">
                  <Button className="rounded-full shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva solicitud
                  </Button>
                </Link>
              )}
            </div>

            {briefs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tienes solicitudes activas en este momento.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {briefs.map((brief) => (
                  <div key={brief.id} className="bg-white rounded-2xl p-6 border-0 shadow-card hover:shadow-hover transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-bold text-lg">Brief #{brief.id}</h4>
                          {getBriefStatusBadge(brief.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Proyecto</span>
                            <p className="font-medium">{brief.projectType}</p>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Cliente/Editor</span>
                            <p className="font-medium">{user.userType === 'editor' ? brief.clientName : brief.editorName || 'Editor'}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Descripción</span>
                          <p className="text-sm text-gray-700 leading-relaxed">{brief.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0 min-w-[200px]">
                        <div className="text-right mb-6">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Presupuesto</span>
                          <span className="text-3xl font-bold text-primary">${brief.budget}</span>
                        </div>

                        {user.userType === 'editor' && brief.status === 'pending' ? (
                          <div className="flex flex-col w-full gap-2">
                            <Button className="w-full rounded-full bg-black hover:bg-gray-800 text-white shadow-md">
                              <Check className="w-4 h-4 mr-2" /> Aceptar trabajo
                            </Button>
                            <Button variant="outline" className="w-full rounded-full border-gray-200 hover:bg-gray-50">
                              <X className="w-4 h-4 mr-2" /> Rechazar
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" className="w-full rounded-full">
                            Ver detalles completos
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
