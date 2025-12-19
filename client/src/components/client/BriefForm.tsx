import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

// Validation schema
const briefSchema = z.object({
  projectType: z.string().min(1, "Selecciona un tipo de proyecto"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  budget: z.string().min(1, "Ingresa un presupuesto"),
  deadline: z.date().optional(),
});

type BriefFormValues = z.infer<typeof briefSchema>;

interface BriefFormProps {
  editorId: number;
  onSubmitSuccess?: () => void;
}

const BriefForm = ({ editorId, onSubmitSuccess }: BriefFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<BriefFormValues>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      projectType: '',
      description: '',
      budget: '',
    }
  });

  const onSubmit = async (values: BriefFormValues) => {
    if (!user) {
      toast({
        title: "Necesitas iniciar sesión",
        description: "Para enviar un brief, primero debes iniciar sesión o registrarte.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API
      const briefData = {
        clientId: user.id,
        editorId,
        projectType: values.projectType,
        description: values.description,
        budget: parseFloat(values.budget),
        deadline: values.deadline,
      };

      // Send request to API
      await apiRequest('POST', '/api/briefs', briefData);

      toast({
        title: "Brief enviado correctamente",
        description: "Tu solicitud ha sido enviada al editor. Te contactará pronto.",
      });

      // Reset form and close dialog
      form.reset();
      setOpen(false);

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      toast({
        title: "Error al enviar el brief",
        description: "Hubo un problema al enviar tu solicitud. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    { value: "reel", label: "Reel/Contenido corto" },
    { value: "youtube", label: "Video para YouTube" },
    { value: "comercial", label: "Comercial/Anuncio" },
    { value: "evento", label: "Video de evento" },
    { value: "corporativo", label: "Video corporativo" }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg font-bold h-12">
          Contactar / Enviar Brief
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <div className="p-6 pb-0">
          <DialogHeader className="mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-bold">Detalles del Proyecto</DialogTitle>
            <p className="text-muted-foreground mt-1">
              Cuéntale al editor sobre tu proyecto para recibir una cotización exacta.
            </p>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground">Tipo de proyecto</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-12 px-4 shadow-sm border border-input bg-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                        {...field}
                      >
                        <option value="" disabled>Selecciona un tipo</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground">Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu proyecto, duración aproximada, estilo visual deseado, y si tienes referencias..."
                        className="resize-none h-32 rounded-xl border-input focus-visible:ring-ring"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground">Presupuesto (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                          <Input placeholder="100" {...field} className="pl-8 rounded-xl" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-semibold text-foreground">Fecha límite (opcional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal rounded-xl h-12 border-input",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Seleccionar fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl shadow-xl" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className="rounded-xl"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-6 bg-gray-50 -mx-6 mt-8 flex justify-end gap-3 border-t border-gray-100">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="rounded-full h-12 px-6 border-0 bg-white hover:bg-gray-100 text-foreground font-medium">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white hover:bg-primary/90 rounded-full h-12 px-8 font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BriefForm;
