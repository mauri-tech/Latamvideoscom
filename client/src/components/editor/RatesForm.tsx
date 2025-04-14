import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

// Validation schema
const ratesSchema = z.object({
  basicRate: z.string().min(1, "La tarifa básica es requerida"),
  mediumRate: z.string().min(1, "La tarifa media es requerida"),
  advancedRate: z.string().min(1, "La tarifa avanzada es requerida"),
  paymentMethods: z.array(z.string()).min(1, "Selecciona al menos un método de pago"),
  availability: z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
  })
});

type RatesFormValues = z.infer<typeof ratesSchema>;

interface RatesFormProps {
  data: any;
  onSave: (data: RatesFormValues) => void;
}

const RatesForm = ({ data, onSave }: RatesFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<RatesFormValues>({
    resolver: zodResolver(ratesSchema),
    defaultValues: {
      basicRate: data.basicRate || '',
      mediumRate: data.mediumRate || '',
      advancedRate: data.advancedRate || '',
      paymentMethods: data.paymentMethods || [],
      availability: data.availability || {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      }
    }
  });
  
  const onSubmit = (values: RatesFormValues) => {
    onSave(values);
    toast({
      title: "Guardado correctamente",
      description: "Tus tarifas y disponibilidad han sido actualizadas",
    });
  };

  const paymentOptions = [
    { id: "paypal", label: "PayPal" },
    { id: "bank_transfer", label: "Transferencia bancaria" },
    { id: "mercadopago", label: "MercadoPago" },
    { id: "wise", label: "Wise" },
    { id: "crypto", label: "Criptomonedas" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Rates Section */}
        <div>
          <h3 className="text-base font-medium mb-4">Tus tarifas</h3>
          <p className="text-sm text-[#8E8E93] mb-4">
            Define tus tarifas para diferentes niveles de servicio. Los precios son en dólares estadounidenses (USD).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="basicRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Básica (USD)</FormLabel>
                  <FormDescription>
                    Edición simple, sin efectos complejos
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input placeholder="50" {...field} className="pl-7" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mediumRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media (USD)</FormLabel>
                  <FormDescription>
                    Edición con efectos básicos, corrección de color
                  </FormDescription>
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
              name="advancedRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avanzada (USD)</FormLabel>
                  <FormDescription>
                    Edición compleja, animaciones, efectos especiales
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input placeholder="150" {...field} className="pl-7" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Payment Methods */}
        <FormField
          control={form.control}
          name="paymentMethods"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Métodos de pago aceptados</FormLabel>
                <FormDescription>
                  Selecciona las formas de pago que aceptas para tus servicios
                </FormDescription>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentOptions.map((method) => (
                  <FormField
                    key={method.id}
                    control={form.control}
                    name="paymentMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={method.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(method.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, method.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== method.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {method.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Availability */}
        <div>
          <h3 className="text-base font-medium mb-4">Disponibilidad semanal</h3>
          <p className="text-sm text-[#8E8E93] mb-4">
            Indica los días de la semana en los que estás disponible para trabajar
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="availability.monday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Lunes</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability.tuesday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Martes</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability.wednesday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Miércoles</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability.thursday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Jueves</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability.friday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Viernes</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability.saturday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Sábado</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability.sunday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Domingo</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Guardar y continuar</Button>
        </div>
      </form>
    </Form>
  );
};

export default RatesForm;
