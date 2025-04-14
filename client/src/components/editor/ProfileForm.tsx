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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { countries } from '@/lib/constants';

// Validation schema
const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  profilePicture: z.string().optional(),
  country: z.string().min(1, "Selecciona tu país"),
  timezone: z.string().min(1, "Selecciona tu zona horaria"),
  yearsOfExperience: z.string().min(1, "Indica tus años de experiencia"),
  bio: z.string().min(20, "La biografía debe tener al menos 20 caracteres").max(500, "La biografía no debe exceder los 500 caracteres")
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  data: any;
  onSave: (data: ProfileFormValues) => void;
}

const ProfileForm = ({ data, onSave }: ProfileFormProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(data.profilePicture || null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data.name || '',
      email: data.email || '',
      profilePicture: data.profilePicture || '',
      country: data.country || '',
      timezone: data.timezone || '',
      yearsOfExperience: data.yearsOfExperience || '',
      bio: data.bio || ''
    }
  });
  
  const onSubmit = (values: ProfileFormValues) => {
    onSave(values);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
        form.setValue("profilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const timeZones = [
    { value: "America/Mexico_City", label: "Ciudad de México (GMT-6)" },
    { value: "America/Bogota", label: "Bogotá (GMT-5)" },
    { value: "America/Lima", label: "Lima (GMT-5)" },
    { value: "America/Santiago", label: "Santiago (GMT-4)" },
    { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (GMT-3)" }
  ];

  const experienceOptions = [
    "Menos de 1 año",
    "1-2 años",
    "3-5 años",
    "6-10 años",
    "Más de 10 años"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="text-center">
              <label htmlFor="profileImage" className="cursor-pointer text-primary hover:text-primary/80 text-sm font-medium">
                Subir foto
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <p className="text-[#8E8E93] text-xs mt-1">JPG, PNG. Max 2MB</p>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Juan Pérez" {...field} />
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu país" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zona horaria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu zona horaria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeZones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Años de experiencia</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tus años de experiencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografía profesional</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Cuéntanos sobre ti, tu experiencia y enfoque como editor..."
                      className="resize-none h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-[#8E8E93] text-xs mt-1">{field.value.length}/500 caracteres</p>
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

export default ProfileForm;
