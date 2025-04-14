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
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

// Validation schema
const equipmentItemSchema = z.object({
  type: z.string().min(1, "El tipo es requerido"),
  description: z.string().min(1, "La descripción es requerida")
});

const equipmentSchema = z.object({
  equipment: z.array(equipmentItemSchema).min(1, "Agrega al menos un equipo")
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

interface EquipmentFormProps {
  data: any;
  onSave: (data: EquipmentFormValues) => void;
}

const EquipmentForm = ({ data, onSave }: EquipmentFormProps) => {
  const [newEquipmentType, setNewEquipmentType] = useState('');
  const [newEquipmentDescription, setNewEquipmentDescription] = useState('');
  
  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipment: data.equipment || []
    }
  });
  
  const equipment = form.watch('equipment');
  
  const onSubmit = (values: EquipmentFormValues) => {
    onSave(values);
  };
  
  const addEquipment = () => {
    if (!newEquipmentType || !newEquipmentDescription) return;
    
    form.setValue('equipment', [
      ...equipment,
      { type: newEquipmentType, description: newEquipmentDescription }
    ]);
    
    setNewEquipmentType('');
    setNewEquipmentDescription('');
  };
  
  const removeEquipment = (index: number) => {
    const updatedEquipment = [...equipment];
    updatedEquipment.splice(index, 1);
    form.setValue('equipment', updatedEquipment);
  };
  
  const equipmentTypes = [
    "Computadora",
    "Cámara",
    "Micrófono",
    "Iluminación",
    "Monitor/Pantalla",
    "Tarjeta gráfica",
    "Almacenamiento",
    "Audio",
    "Accesorios"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-1">Tu equipo técnico</h3>
          <p className="text-sm text-[#8E8E93] mb-4">
            Agrega el equipo con el que trabajas. Esto ayudará a los clientes a entender tus capacidades técnicas.
          </p>
          
          <div className="bg-[#F2F2F7] p-4 rounded-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-1">
                <label htmlFor="equipmentType" className="block text-sm font-medium mb-1">
                  Tipo
                </label>
                <select
                  id="equipmentType"
                  value={newEquipmentType}
                  onChange={(e) => setNewEquipmentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar tipo</option>
                  {equipmentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="equipmentDescription" className="block text-sm font-medium mb-1">
                  Descripción
                </label>
                <div className="flex">
                  <Input
                    id="equipmentDescription"
                    value={newEquipmentDescription}
                    onChange={(e) => setNewEquipmentDescription(e.target.value)}
                    placeholder="Ej. MacBook Pro M1, 16GB RAM, 1TB SSD"
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={addEquipment}
                    className="ml-2"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="equipment"
            render={() => (
              <FormItem>
                <div className="space-y-4">
                  {equipment.length === 0 ? (
                    <p className="text-center text-[#8E8E93] py-4">No has agregado ningún equipo aún.</p>
                  ) : (
                    equipment.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
                      >
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-[#8E8E93]">{item.description}</p>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeEquipment(index)}
                        >
                          <X className="h-4 w-4 text-[#8E8E93]" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Guardar y continuar</Button>
        </div>
      </form>
    </Form>
  );
};

export default EquipmentForm;
