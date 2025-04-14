import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MultiStepForm from '@/components/editor/MultiStepForm';
import { useAuth, type RegisterData } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  userType: z.enum(["editor", "client"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [_, navigate] = useLocation();
  const { user, registerMutation } = useAuth();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'editor',
    }
  });
  
  const onSubmit = async (values: RegisterFormValues) => {
    const registerData: RegisterData = {
      email: values.email,
      password: values.password,
      name: values.name,
      userType: values.userType
    };
    
    registerMutation.mutate(registerData, {
      onSuccess: (userData) => {
        if (values.userType === 'editor') {
          // If editor, set registered user to continue with profile creation
          setRegisteredUser(userData);
        } else {
          // If client, redirect to search page
          navigate('/search');
        }
      }
    });
  };

  if (registeredUser) {
    return (
      <div className="min-h-screen bg-[#F2F2F7]">
        <Helmet>
          <title>Crea tu perfil profesional | EditoresLATAM</title>
        </Helmet>
        <Header />
        
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold text-center mb-8">Crea tu perfil profesional</h1>
          <MultiStepForm />
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Regístrate | EditoresLATAM</title>
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Crea una cuenta</CardTitle>
              <CardDescription>
                Ingresa tus datos para registrarte en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="editor" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="editor"
                    onClick={() => form.setValue('userType', 'editor')}
                  >
                    Soy editor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="client"
                    onClick={() => form.setValue('userType', 'client')}
                  >
                    Soy contratante
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="mt-4">
                  <p className="text-sm text-[#8E8E93]">
                    Crea un perfil profesional para mostrar tu trabajo y conectar con potenciales clientes.
                  </p>
                </TabsContent>
                
                <TabsContent value="client" className="mt-4">
                  <p className="text-sm text-[#8E8E93]">
                    Encuentra editores de video especializados para tus proyectos.
                  </p>
                </TabsContent>
              </Tabs>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="ejemplo@correo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrando...
                      </>
                    ) : 'Registrarme'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-[#8E8E93]">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login">
                  <a className="text-primary hover:underline">Iniciar sesión</a>
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
