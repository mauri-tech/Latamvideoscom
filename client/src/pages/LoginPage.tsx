import { useEffect } from 'react';
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
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth, type LoginData } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [_, navigate] = useLocation();
  const { user, loginMutation } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    const loginData: LoginData = {
      email: values.email,
      password: values.password
    };

    loginMutation.mutate(loginData, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <Helmet>
        <title>Iniciar sesión | LatamVideos</title>
      </Helmet>

      {/* Left Column: Form */}
      <div className="flex flex-col justify-center px-8 md:px-20 lg:px-32 bg-white relative">
        <div className="absolute top-8 left-8">
          <Link href="/">
            <Button variant="ghost" className="rounded-full px-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-muted-foreground mb-8">Inicia sesión para continuar.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre@ejemplo.com" {...field} className="rounded-xl h-12" />
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="font-semibold">Contraseña</FormLabel>
                      <Link href="/forgot-password">
                        <a className="text-xs font-semibold text-primary hover:underline">
                          ¿Olvidaste tu contraseña?
                        </a>
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-full h-12 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : 'Iniciar sesión'}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link href="/register">
                <a className="text-foreground font-bold hover:underline">Regístrate gratis</a>
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LatamVideos Inc.
        </div>
      </div>

      {/* Right Column: Image/Branding */}
      <div className="hidden md:block bg-gray-50 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Cinematic cameraman"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Conecta con el mejor talento de Latinoamérica.</h2>
          <p className="text-lg text-white/90">Miles de editores, videógrafos y creadores listos para tu próximo proyecto.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
