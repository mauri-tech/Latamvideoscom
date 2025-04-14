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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';

// Validation schema
const skillsSchema = z.object({
  software: z.array(z.number()).min(1, "Selecciona al menos un software"),
  editingStyles: z.array(z.number()).min(1, "Selecciona al menos un estilo de edición")
});

type SkillsFormValues = z.infer<typeof skillsSchema>;

interface SkillsFormProps {
  data: any;
  onSave: (data: SkillsFormValues) => void;
}

const SkillsForm = ({ data, onSave }: SkillsFormProps) => {
  // Fetch software list
  const { data: softwareList = [], isLoading: softwareLoading } = useQuery({
    queryKey: ['/api/software'],
    staleTime: Infinity,
  });

  // Fetch editing styles
  const { data: stylesList = [], isLoading: stylesLoading } = useQuery({
    queryKey: ['/api/editing-styles'],
    staleTime: Infinity,
  });

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      software: data.software || [],
      editingStyles: data.editingStyles || []
    }
  });
  
  const onSubmit = (values: SkillsFormValues) => {
    onSave(values);
  };

  // Mock data until API is implemented
  const mockSoftware = [
    { id: 1, name: "Adobe Premiere Pro" },
    { id: 2, name: "Final Cut Pro" },
    { id: 3, name: "DaVinci Resolve" },
    { id: 4, name: "Adobe After Effects" },
    { id: 5, name: "CapCut" },
    { id: 6, name: "iMovie" },
    { id: 7, name: "Filmora" },
    { id: 8, name: "Vegas Pro" }
  ];

  const mockStyles = [
    { id: 1, name: "YouTube" },
    { id: 2, name: "Reels / TikTok" },
    { id: 3, name: "Comerciales" },
    { id: 4, name: "Eventos (bodas, conciertos)" },
    { id: 5, name: "Video corporativo" },
    { id: 6, name: "Documental" },
    { id: 7, name: "Motion graphics" },
    { id: 8, name: "Videoclips musicales" }
  ];

  // Use mock data if API isn't ready
  const software = softwareList.length > 0 ? softwareList : mockSoftware;
  const styles = stylesList.length > 0 ? stylesList : mockStyles;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Software Selection */}
        <FormField
          control={form.control}
          name="software"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Software que dominas</FormLabel>
                <p className="text-sm text-[#8E8E93]">Selecciona todos los programas con los que trabajas habitualmente.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {software.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="software"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {item.name}
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

        {/* Editing Styles Selection */}
        <FormField
          control={form.control}
          name="editingStyles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Estilos de edición</FormLabel>
                <p className="text-sm text-[#8E8E93]">Selecciona los tipos de contenido que editas regularmente.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {styles.map((style) => (
                  <FormField
                    key={style.id}
                    control={form.control}
                    name="editingStyles"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={style.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(style.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, style.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== style.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {style.name}
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
        
        <div className="flex justify-end">
          <Button type="submit">Guardar y continuar</Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillsForm;
