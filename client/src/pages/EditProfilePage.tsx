import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2, Save, X, Plus, Trash2 } from 'lucide-react';
import { countries } from '@/lib/constants';

// Esquema para editar información de usuario
const userFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  yearsOfExperience: z.coerce.number().min(0).optional(),
});

// Esquema para editar información de perfil profesional
const editorProfileSchema = z.object({
  professionalType: z.string().optional(),
  software: z.array(z.number()).optional(),
  editingStyles: z.array(z.number()).optional(),
  equipment: z.array(z.string()).optional(),
  basicRate: z.coerce.number().min(0).optional(),
  mediumRate: z.coerce.number().min(0).optional(),
  advancedRate: z.coerce.number().min(0).optional(),
  weeklyAvailability: z.record(z.boolean()).optional(),
  paymentMethods: z.array(z.string()).optional(),
  experience: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  technologyTags: z.array(z.string()).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;
type EditorProfileFormValues = z.infer<typeof editorProfileSchema>;

const PROFESSIONAL_TYPES = [
  { value: "editor", label: "Editor de video" },
  { value: "videographer", label: "Videógrafo" },
  { value: "sound", label: "Técnico de sonido" },
  { value: "lighting", label: "Técnico de iluminación" },
  { value: "colorist", label: "Colorista" },
  { value: "vfx", label: "Especialista en VFX" },
  { value: "animator", label: "Animador" },
  { value: "director", label: "Director" },
];

const EditProfilePage = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("basic-info");
  
  // Form para datos de usuario
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      profilePicture: "",
      country: "",
      timezone: "",
      yearsOfExperience: 0,
    },
  });
  
  // Form para perfil profesional
  const editorProfileForm = useForm<EditorProfileFormValues>({
    resolver: zodResolver(editorProfileSchema),
    defaultValues: {
      professionalType: "editor",
      software: [],
      editingStyles: [],
      equipment: [],
      basicRate: 0,
      mediumRate: 0,
      advancedRate: 0,
      weeklyAvailability: {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      paymentMethods: [],
      experience: "",
      expertise: [],
      technologyTags: [],
    },
  });
  
  // Estado para manejar campos tipo array
  const [newEquipment, setNewEquipment] = useState("");
  const [newPaymentMethod, setNewPaymentMethod] = useState("");
  const [newExpertise, setNewExpertise] = useState("");
  const [newTechnologyTag, setNewTechnologyTag] = useState("");
  
  // Obtener datos del usuario actual
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/user'],
    retry: false,
    onError: () => {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para editar tu perfil",
        variant: "destructive",
      });
      setLocation('/auth');
    }
  });
  
  // Obtener perfil profesional del usuario
  const { data: editorProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [currentUser ? `/api/editor-profiles/user/${currentUser.id}` : null],
    enabled: !!currentUser?.id,
    onError: (error: Error) => {
      if ((error as any).status !== 404) {
        toast({
          title: "Error",
          description: "No se pudo cargar tu perfil profesional",
          variant: "destructive",
        });
      }
    }
  });
  
  // Obtener lista de software disponible
  const { data: softwareList } = useQuery({
    queryKey: ['/api/software'],
    enabled: !!currentUser?.id,
  });
  
  // Obtener lista de estilos de edición disponibles
  const { data: stylesList } = useQuery({
    queryKey: ['/api/editing-styles'],
    enabled: !!currentUser?.id,
  });
  
  // Mutación para actualizar datos del usuario
  const updateUserMutation = useMutation({
    mutationFn: async (data: UserFormValues) => {
      const res = await apiRequest('PUT', `/api/users/${currentUser?.id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      toast({
        title: "¡Éxito!",
        description: "Información personal actualizada correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar tu información personal: " + error.message,
        variant: "destructive",
      });
    }
  });
  
  // Mutación para actualizar perfil profesional
  const updateProfileMutation = useMutation({
    mutationFn: async (data: EditorProfileFormValues) => {
      try {
        if (editorProfile?.id) {
          // Actualizar perfil existente
          const res = await apiRequest('PUT', `/api/editor-profiles/${editorProfile.id}`, data);
          return await res.json();
        } else if (currentUser?.id) {
          try {
            // Intentar crear nuevo perfil
            const res = await apiRequest('POST', '/api/editor-profiles', {
              ...data,
              userId: currentUser.id
            });
            return await res.json();
          } catch (error) {
            // Si ya existe un perfil (error 400), obtener el perfil existente y actualizarlo
            if ((error as any).status === 400) {
              // Obtener el perfil existente
              const profileRes = await apiRequest('GET', `/api/editor-profiles/user/${currentUser.id}`);
              const existingProfile = await profileRes.json();
              
              // Actualizar el perfil existente
              const updateRes = await apiRequest('PUT', `/api/editor-profiles/${existingProfile.id}`, data);
              return await updateRes.json();
            }
            throw error;
          }
        }
      } catch (error) {
        console.error("Error al actualizar perfil:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [currentUser ? `/api/editor-profiles/user/${currentUser.id}` : null] });
      toast({
        title: "¡Éxito!",
        description: "Perfil profesional actualizado correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar tu perfil profesional: " + (error.message || 'Error desconocido'),
        variant: "destructive",
      });
      console.error("Error completo:", error);
    }
  });
  
  // Llenar formularios con datos existentes cuando se cargan
  useEffect(() => {
    if (currentUser) {
      userForm.reset({
        name: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        profilePicture: currentUser.profilePicture || "",
        country: currentUser.country || "",
        timezone: currentUser.timezone || "",
        yearsOfExperience: currentUser.yearsOfExperience || 0,
      });
    }
  }, [currentUser, userForm]);
  
  useEffect(() => {
    if (editorProfile) {
      editorProfileForm.reset({
        professionalType: editorProfile.professionalType || "editor",
        software: editorProfile.software || [],
        editingStyles: editorProfile.editingStyles || [],
        equipment: editorProfile.equipment || [],
        basicRate: editorProfile.basicRate || 0,
        mediumRate: editorProfile.mediumRate || 0,
        advancedRate: editorProfile.advancedRate || 0,
        weeklyAvailability: editorProfile.weeklyAvailability || {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false,
        },
        paymentMethods: editorProfile.paymentMethods || [],
        experience: editorProfile.experience || "",
        expertise: editorProfile.expertise || [],
        technologyTags: editorProfile.technologyTags || [],
      });
    }
  }, [editorProfile, editorProfileForm]);
  
  // Manejar envío del formulario de usuario
  const onUserSubmit = (values: UserFormValues) => {
    updateUserMutation.mutate(values);
  };
  
  // Manejar envío del formulario de perfil profesional
  const onProfileSubmit = (values: EditorProfileFormValues) => {
    updateProfileMutation.mutate(values);
  };
  
  // Agregar nuevo equipo
  const addEquipment = () => {
    if (!newEquipment) return;
    
    const currentEquipment = editorProfileForm.getValues("equipment") || [];
    editorProfileForm.setValue("equipment", [...currentEquipment, newEquipment]);
    setNewEquipment("");
  };
  
  // Remover equipo
  const removeEquipment = (index: number) => {
    const currentEquipment = editorProfileForm.getValues("equipment") || [];
    editorProfileForm.setValue("equipment", currentEquipment.filter((_, i) => i !== index));
  };
  
  // Agregar nuevo método de pago
  const addPaymentMethod = () => {
    if (!newPaymentMethod) return;
    
    const currentMethods = editorProfileForm.getValues("paymentMethods") || [];
    editorProfileForm.setValue("paymentMethods", [...currentMethods, newPaymentMethod]);
    setNewPaymentMethod("");
  };
  
  // Remover método de pago
  const removePaymentMethod = (index: number) => {
    const currentMethods = editorProfileForm.getValues("paymentMethods") || [];
    editorProfileForm.setValue("paymentMethods", currentMethods.filter((_, i) => i !== index));
  };
  
  // Agregar nueva área de expertise
  const addExpertise = () => {
    if (!newExpertise) return;
    
    const currentExpertise = editorProfileForm.getValues("expertise") || [];
    editorProfileForm.setValue("expertise", [...currentExpertise, newExpertise]);
    setNewExpertise("");
  };
  
  // Remover área de expertise
  const removeExpertise = (index: number) => {
    const currentExpertise = editorProfileForm.getValues("expertise") || [];
    editorProfileForm.setValue("expertise", currentExpertise.filter((_, i) => i !== index));
  };
  
  // Agregar nuevo tag de tecnología
  const addTechnologyTag = () => {
    if (!newTechnologyTag) return;
    
    const currentTags = editorProfileForm.getValues("technologyTags") || [];
    editorProfileForm.setValue("technologyTags", [...currentTags, newTechnologyTag]);
    setNewTechnologyTag("");
  };
  
  // Remover tag de tecnología
  const removeTechnologyTag = (index: number) => {
    const currentTags = editorProfileForm.getValues("technologyTags") || [];
    editorProfileForm.setValue("technologyTags", currentTags.filter((_, i) => i !== index));
  };
  
  const isLoading = isLoadingUser || isLoadingProfile;
  const userIsPending = updateUserMutation.isPending;
  const profileIsPending = updateProfileMutation.isPending;
  
  const getDayLabel = (day: string) => {
    const labels: Record<string, string> = {
      mon: "Lunes",
      tue: "Martes",
      wed: "Miércoles",
      thu: "Jueves",
      fri: "Viernes",
      sat: "Sábado",
      sun: "Domingo",
    };
    return labels[day] || day;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Editar perfil | latamvideos.com</title>
        <meta name="description" content="Edita tu perfil profesional en latamvideos.com para destacar tus habilidades, tarifas y portafolio." />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="basic-info">Información personal</TabsTrigger>
            <TabsTrigger value="professional-info">Perfil profesional</TabsTrigger>
          </TabsList>
          
          {/* Pestaña de información personal */}
          <TabsContent value="basic-info">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tu información básica personal que se mostrará en tu perfil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...userForm}>
                  <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={userForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
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
                      
                      <FormField
                        control={userForm.control}
                        name="profilePicture"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de foto de perfil</FormLabel>
                            <FormControl>
                              <Input placeholder="https://ejemplo.com/tu-foto.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                              Ingresa la URL de tu foto de perfil
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
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
                                    {country.flag} {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zona horaria</FormLabel>
                            <FormControl>
                              <Input placeholder="America/Mexico_City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Años de experiencia</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={userForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biografía</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Cuéntanos un poco sobre ti y tu experiencia profesional" 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full md:w-auto" disabled={userIsPending}>
                      {userIsPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Guardar cambios
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de información profesional */}
          <TabsContent value="professional-info">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Profesional</CardTitle>
                <CardDescription>
                  Configura tu perfil profesional, tarifas, disponibilidad y especialidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...editorProfileForm}>
                  <form onSubmit={editorProfileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Información básica</h3>
                      
                      <FormField
                        control={editorProfileForm.control}
                        name="professionalType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de profesional</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona tu especialidad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PROFESSIONAL_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editorProfileForm.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción de experiencia</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe brevemente tu experiencia profesional" 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Escribe un resumen de tu experiencia profesional, proyectos destacados y especialidades
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Tarifas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={editorProfileForm.control}
                          name="basicRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tarifa básica (USD)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormDescription>
                                Proyectos sencillos
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={editorProfileForm.control}
                          name="mediumRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tarifa media (USD)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormDescription>
                                Proyectos intermedios
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={editorProfileForm.control}
                          name="advancedRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tarifa avanzada (USD)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormDescription>
                                Proyectos complejos
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Software y Estilos</h3>
                      
                      {/* Software */}
                      <FormField
                        control={editorProfileForm.control}
                        name="software"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Software que dominas</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {softwareList?.map((sw: any) => (
                                <div key={sw.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`sw-${sw.id}`}
                                    checked={field.value?.includes(sw.id)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, sw.id]);
                                      } else {
                                        field.onChange(current.filter(id => id !== sw.id));
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`sw-${sw.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {sw.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormDescription>
                              Selecciona todo el software que utilizas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Estilos de edición */}
                      <FormField
                        control={editorProfileForm.control}
                        name="editingStyles"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estilos de edición</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {stylesList?.map((style: any) => (
                                <div key={style.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`style-${style.id}`}
                                    checked={field.value?.includes(style.id)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, style.id]);
                                      } else {
                                        field.onChange(current.filter(id => id !== style.id));
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`style-${style.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {style.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormDescription>
                              Selecciona tus estilos de edición preferidos
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Equipamiento</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label htmlFor="equipment-input">Agregar equipo</Label>
                            <Input
                              id="equipment-input"
                              value={newEquipment}
                              onChange={(e) => setNewEquipment(e.target.value)}
                              placeholder="Ej: MacBook Pro M1, Sony A7III, etc."
                            />
                          </div>
                          <Button type="button" onClick={addEquipment} size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Agregar
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {editorProfileForm.watch("equipment")?.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                              <span>{item}</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeEquipment(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Disponibilidad semanal</h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                          <FormField
                            key={day}
                            control={editorProfileForm.control}
                            name={`weeklyAvailability.${day}` as any}
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between space-x-2 space-y-0">
                                <FormLabel>{getDayLabel(day)}</FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Métodos de pago aceptados</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label htmlFor="payment-input">Agregar método de pago</Label>
                            <Input
                              id="payment-input"
                              value={newPaymentMethod}
                              onChange={(e) => setNewPaymentMethod(e.target.value)}
                              placeholder="Ej: PayPal, Transferencia bancaria, etc."
                            />
                          </div>
                          <Button type="button" onClick={addPaymentMethod} size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Agregar
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {editorProfileForm.watch("paymentMethods")?.map((method, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                              <span>{method}</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removePaymentMethod(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Áreas de especialización</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label htmlFor="expertise-input">Agregar área de especialización</Label>
                            <Input
                              id="expertise-input"
                              value={newExpertise}
                              onChange={(e) => setNewExpertise(e.target.value)}
                              placeholder="Ej: Bodas, Reels, Documentales, etc."
                            />
                          </div>
                          <Button type="button" onClick={addExpertise} size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Agregar
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {editorProfileForm.watch("expertise")?.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                              <span>{item}</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeExpertise(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Tags de tecnología</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label htmlFor="tech-tag-input">Agregar tag de tecnología</Label>
                            <Input
                              id="tech-tag-input"
                              value={newTechnologyTag}
                              onChange={(e) => setNewTechnologyTag(e.target.value)}
                              placeholder="Ej: DaVinci Resolve, FCPX, After Effects, etc."
                            />
                          </div>
                          <Button type="button" onClick={addTechnologyTag} size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Agregar
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {editorProfileForm.watch("technologyTags")?.map((tag, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                              <span>{tag}</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeTechnologyTag(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto" disabled={profileIsPending}>
                      {profileIsPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Guardar cambios
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditProfilePage;