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
import { Calendar as CalendarIcon } from 'lucide-react';
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
        <Button className="w-full bg-primary text-white hover:bg-primary/90">
          Enviar brief
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enviar brief al editor</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de proyecto</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <FormLabel>Descripción del proyecto</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe tu proyecto, duración, estilo, referencias..."
                      className="resize-none h-32"
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
                    <FormLabel>Presupuesto (USD)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <Input placeholder="100" {...field} className="pl-7" />
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
                    <FormLabel>Fecha límite (opcional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {loading ? 'Enviando...' : 'Enviar brief'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BriefForm;
