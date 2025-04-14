import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Check } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido.",
  }),
  subject: z.string().min(1, {
    message: "Selecciona un asunto.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
      });
      
      form.reset();
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contacto | latamvideos.com</title>
        <meta name="description" content="Ponte en contacto con el equipo de latamvideos.com para resolver tus dudas sobre nuestra plataforma para editores de video y empresas." />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#041C32]">Contáctanos</h1>
        
        <div className="grid md:grid-cols-5 gap-8 mb-16">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#041C32]">Estamos aquí para ayudarte</h2>
              <p className="text-[#8E8E93] mb-6">
                ¿Tienes alguna pregunta o comentario sobre latamvideos.com? Nuestro equipo está listo para ayudarte.
                Completa el formulario o utiliza alguno de nuestros canales de contacto.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-[#0050FF] mt-1" />
                <div>
                  <h3 className="font-medium text-[#1c1c1e]">Correo electrónico</h3>
                  <p className="text-[#8E8E93]">contacto@latamvideos.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-[#0050FF] mt-1" />
                <div>
                  <h3 className="font-medium text-[#1c1c1e]">Teléfono</h3>
                  <p className="text-[#8E8E93]">+52 55 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-[#0050FF] mt-1" />
                <div>
                  <h3 className="font-medium text-[#1c1c1e]">Oficina</h3>
                  <p className="text-[#8E8E93]">
                    Av. Insurgentes Sur 1602<br />
                    Col. Crédito Constructor<br />
                    Ciudad de México, CP 03940
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium mb-3 text-[#1c1c1e]">Síguenos en redes sociales</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="text-[#8E8E93] hover:text-[#0050FF] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://facebook.com" className="text-[#8E8E93] hover:text-[#0050FF] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" className="text-[#8E8E93] hover:text-[#0050FF] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-[#8E8E93] hover:text-[#0050FF] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-[#041C32]">¡Mensaje enviado!</h2>
                  <p className="text-[#8E8E93] mb-6">
                    Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo más pronto posible.
                  </p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre" {...field} />
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
                              <Input placeholder="tu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asunto</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un asunto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">Información general</SelectItem>
                              <SelectItem value="account">Problemas con mi cuenta</SelectItem>
                              <SelectItem value="payment">Pagos y facturación</SelectItem>
                              <SelectItem value="feature">Sugerencia de funcionalidad</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Escribe tu mensaje aquí..."
                              className="resize-none min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#041C32] to-[#0050FF] hover:from-[#0A2540] hover:to-[#0060FF]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.1035916220336!2d-99.18549958521424!3d19.407921546125865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff7f3ad48d37%3A0x91a7600faa686995!2sAv.%20Insurgentes%20Sur%201602%2C%20Cr%C3%A9dito%20Constructor%2C%20Benito%20Ju%C3%A1rez%2C%2003940%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1642777444563!5m2!1ses-419!2smx" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Ubicación de latamvideos"
          ></iframe>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;