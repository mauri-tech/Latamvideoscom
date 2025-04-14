import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  FilmIcon, 
  BookOpen, 
  Settings, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash, 
  LineChart, 
  User, 
  Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Datos de ejemplo para la sección de editores
const mockEditors = [
  {
    id: 1,
    name: "Mauricio Treviño",
    email: "mauricio@example.com",
    location: "🇲🇽 México",
    status: "Activo",
    verified: true,
    memberSince: "12 Ene, 2025",
    projects: 25
  },
  {
    id: 2,
    name: "Camila Valenzuela",
    email: "camila@example.com",
    location: "🇨🇴 Colombia",
    status: "Activo",
    verified: true,
    memberSince: "4 Feb, 2025",
    projects: 18
  },
  {
    id: 3,
    name: "Diego Montero",
    email: "diego@example.com",
    location: "🇦🇷 Argentina",
    status: "Suspendido",
    verified: false,
    memberSince: "22 Mar, 2025",
    projects: 9
  },
  {
    id: 4,
    name: "Ana García",
    email: "ana@example.com",
    location: "🇪🇸 España",
    status: "Pendiente",
    verified: false,
    memberSince: "9 Abr, 2025",
    projects: 0
  }
];

// Datos de ejemplo para clientes
const mockClients = [
  {
    id: 1,
    name: "Agencia Creativa SAC",
    email: "contacto@agencia.com",
    location: "🇲🇽 México",
    status: "Activo",
    projects: 12,
    tipo: "Empresa",
    gasto: "$2,450 USD"
  },
  {
    id: 2,
    name: "Roberto Gómez",
    email: "roberto@gmail.com",
    location: "🇨🇱 Chile",
    status: "Activo",
    projects: 3,
    tipo: "Individual",
    gasto: "$560 USD"
  }
];

// Datos de ejemplo para proyectos
const mockProjects = [
  {
    id: 1,
    title: "Campaña Primavera 2025",
    client: "Agencia Creativa SAC",
    editor: "Mauricio Treviño",
    status: "En progreso",
    price: "$850 USD",
    deadline: "15 Mayo, 2025"
  },
  {
    id: 2,
    title: "Video corporativo anual",
    client: "Banco del Sur",
    editor: "Camila Valenzuela",
    status: "Completado",
    price: "$1,200 USD",
    deadline: "28 Marzo, 2025"
  },
  {
    id: 3,
    title: "Serie de 5 spots publicitarios",
    client: "Roberto Gómez",
    editor: "Diego Montero",
    status: "Retrasado",
    price: "$560 USD",
    deadline: "10 Abril, 2025"
  }
];

// Stats de ejemplo (métricas)
const mockStats = [
  { name: "Editores registrados", value: "78", icon: <Users size={24} className="text-blue-500" /> },
  { name: "Proyectos completados", value: "245", icon: <FilmIcon size={24} className="text-green-500" /> },
  { name: "Clientes activos", value: "52", icon: <User size={24} className="text-purple-500" /> },
  { name: "Países con cobertura", value: "12", icon: <Globe size={24} className="text-amber-500" /> }
];

const AdminPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const navigate = useNavigate();

  // Estado para el modo autenticado (en producción esto vendría de un hook de autenticación)
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Simulación de verificación de autenticación
  React.useEffect(() => {
    // En un caso real, aquí verificaríamos si el usuario tiene rol de administrador
    // Si no lo tiene, redirigiríamos
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Badge de estado con colores según el valor
  const getStatusBadge = (status: string) => {
    let variant: "default" | "secondary" | "destructive" | "outline" = "default";
    let bgColor = "bg-blue-100 text-blue-800 hover:bg-blue-100";
    
    switch(status.toLowerCase()) {
      case 'activo':
        bgColor = "bg-green-100 text-green-800 hover:bg-green-100";
        break;
      case 'suspendido':
        variant = "destructive";
        break;
      case 'pendiente':
        bgColor = "bg-amber-100 text-amber-800 hover:bg-amber-100";
        break;
      case 'en progreso':
        bgColor = "bg-blue-100 text-blue-800 hover:bg-blue-100";
        break;
      case 'completado':
        bgColor = "bg-green-100 text-green-800 hover:bg-green-100";
        break;
      case 'retrasado':
        variant = "destructive";
        break;
    }
    
    if (variant === "default" || variant === "secondary") {
      return <Badge className={bgColor}>{status}</Badge>;
    }
    
    return <Badge variant={variant}>{status}</Badge>;
  };

  if (!isAuthenticated) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Panel de Administración | latamvideos.com</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Panel de Administración</h1>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo elemento
                </Button>
              </div>
            </div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid grid-cols-5 w-full max-w-4xl">
                <TabsTrigger value="overview">
                  <LineChart className="mr-2 h-4 w-4" />
                  Vista general
                </TabsTrigger>
                <TabsTrigger value="editors">
                  <Users className="mr-2 h-4 w-4" />
                  Editores
                </TabsTrigger>
                <TabsTrigger value="clients">
                  <User className="mr-2 h-4 w-4" />
                  Clientes
                </TabsTrigger>
                <TabsTrigger value="projects">
                  <FilmIcon className="mr-2 h-4 w-4" />
                  Proyectos
                </TabsTrigger>
                <TabsTrigger value="courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Cursos
                </TabsTrigger>
              </TabsList>
              
              {/* Vista General */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockStats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">{stat.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center">
                          {stat.icon}
                          <span className="text-3xl font-bold ml-3">{stat.value}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Últimos editores registrados</CardTitle>
                      <CardDescription>Los 3 editores más recientes en la plataforma</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Desde</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockEditors.slice(0, 3).map(editor => (
                            <TableRow key={editor.id}>
                              <TableCell className="font-medium">{editor.name}</TableCell>
                              <TableCell>{getStatusBadge(editor.status)}</TableCell>
                              <TableCell>{editor.memberSince}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedTab("editors")}>
                        Ver todos los editores
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Proyectos activos</CardTitle>
                      <CardDescription>Los proyectos actualmente en progreso</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Proyecto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha límite</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockProjects.map(project => (
                            <TableRow key={project.id}>
                              <TableCell className="font-medium">{project.title}</TableCell>
                              <TableCell>{getStatusBadge(project.status)}</TableCell>
                              <TableCell>{project.deadline}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedTab("projects")}>
                        Ver todos los proyectos
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Editores */}
              <TabsContent value="editors">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Gestión de Editores</CardTitle>
                        <CardDescription>Lista de todos los editores registrados en la plataforma</CardDescription>
                      </div>
                      <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir editor
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Verificado</TableHead>
                          <TableHead>Proyectos</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockEditors.map(editor => (
                          <TableRow key={editor.id}>
                            <TableCell className="font-medium">{editor.name}</TableCell>
                            <TableCell>{editor.email}</TableCell>
                            <TableCell>{editor.location}</TableCell>
                            <TableCell>{getStatusBadge(editor.status)}</TableCell>
                            <TableCell>
                              {editor.verified ? 
                                <CheckCircle className="h-5 w-5 text-green-500" /> : 
                                <XCircle className="h-5 w-5 text-red-500" />
                              }
                            </TableCell>
                            <TableCell>{editor.projects}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Clientes */}
              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Gestión de Clientes</CardTitle>
                        <CardDescription>Lista de todos los clientes registrados en la plataforma</CardDescription>
                      </div>
                      <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir cliente
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Proyectos</TableHead>
                          <TableHead>Gasto total</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockClients.map(client => (
                          <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.location}</TableCell>
                            <TableCell>{getStatusBadge(client.status)}</TableCell>
                            <TableCell>{client.tipo}</TableCell>
                            <TableCell>{client.projects}</TableCell>
                            <TableCell>{client.gasto}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Proyectos */}
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Gestión de Proyectos</CardTitle>
                        <CardDescription>Lista de todos los proyectos en la plataforma</CardDescription>
                      </div>
                      <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Crear proyecto
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Editor</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Fecha límite</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockProjects.map(project => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.client}</TableCell>
                            <TableCell>{project.editor}</TableCell>
                            <TableCell>{getStatusBadge(project.status)}</TableCell>
                            <TableCell>{project.price}</TableCell>
                            <TableCell>{project.deadline}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Cursos */}
              <TabsContent value="courses">
                <Card>
                  <CardHeader className="text-center pb-10">
                    <CardTitle>Gestión de Cursos</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Esta sección está en desarrollo. Próximamente podrás gestionar los cursos y recursos educativos de la plataforma.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-10">
                    <Button>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Explorar cursos
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AdminPanel;