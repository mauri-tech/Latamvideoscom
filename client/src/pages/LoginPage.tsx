import { useState } from 'react';
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const { login } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    
    try {
      // In a real implementation, this would make an API call to authenticate
      // For MVP, we'll simulate a successful login
      
      // Fake login - in production this would be a real API call
      setTimeout(() => {
        // Simulate successful login
        login({
          id: 1,
          email: values.email,
          name: 'Usuario de Prueba',
          userType: 'editor',
        });
        
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de nuevo a EditoresLATAM",
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
        setSubmitting(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Las credenciales son incorrectas. Verifica tu correo y contraseña.",
        variant: "destructive"
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Iniciar sesión | EditoresLATAM</title>
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  
                  <div className="text-right">
                    <Link href="/forgot-password">
                      <a className="text-sm text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    disabled={submitting}
                  >
                    {submitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-[#8E8E93]">
                ¿No tienes cuenta?{' '}
                <Link href="/register">
                  <a className="text-primary hover:underline">Registrarme</a>
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

export default LoginPage;
