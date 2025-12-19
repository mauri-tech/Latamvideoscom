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
import { Loader2, ArrowLeft, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MultiStepForm from '@/components/editor/MultiStepForm';
import { useAuth, type RegisterData } from '@/hooks/useAuth';
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
        <Helmet>
          <title>Completa tu perfil | LatamVideos</title>
        </Helmet>

        <div className="w-full max-w-3xl px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold">¡Cuenta creada con éxito!</h1>
              <p className="text-muted-foreground">Ahora cuéntanos sobre tu experiencia.</p>
            </div>
            <MultiStepForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <Helmet>
        <title>Regístrate | LatamVideos</title>
      </Helmet>

      {/* Right Column: Form (Swapped for variety or keep left?) Let's keep Left for consistency */}
      <div className="flex flex-col justify-center px-8 md:px-20 lg:px-32 bg-white relative py-12">
        <div className="absolute top-8 left-8">
          <Link href="/">
            <Button variant="ghost" className="rounded-full px-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Únete a LatamVideos</h1>
          <p className="text-muted-foreground mb-8">Crea una cuenta para empezar.</p>

          <Tabs defaultValue="editor" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 h-12 rounded-xl bg-gray-100 p-1">
              <TabsTrigger
                value="editor"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold h-full transition-all"
                onClick={() => form.setValue('userType', 'editor')}
              >
                Soy Editor
              </TabsTrigger>
              <TabsTrigger
                value="client"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold h-full transition-all"
                onClick={() => form.setValue('userType', 'client')}
              >
                Soy Contratante
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} className="rounded-xl h-12" />
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
                    <FormLabel className="font-semibold">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre@ejemplo.com" {...field} className="rounded-xl h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} className="rounded-xl h-12" />
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
                      <FormLabel className="font-semibold">Confirmar</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} className="rounded-xl h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-full h-12 font-bold text-base shadow-lg hover:shadow-xl transition-all mt-4"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : 'Crear cuenta'}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login">
                <a className="text-foreground font-bold hover:underline">Inicia sesión</a>
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs text-center text-gray-400 leading-relaxed">
              Al registrarte, aceptas nuestros <Link href="/terms"><a className="underline hover:text-gray-600">Términos de Servicio</a></Link> y <Link href="/privacy"><a className="underline hover:text-gray-600">Política de Privacidad</a></Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="hidden md:block bg-gray-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Video editing workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Tu carrera creativa empieza aquí.</h2>
          <p className="text-lg text-white/90">Únete a la comunidad de profesionales de video más grande de Latinoamérica.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
