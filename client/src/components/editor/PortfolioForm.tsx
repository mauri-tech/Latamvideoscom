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
import { Plus, X, MoveUp, MoveDown } from 'lucide-react';

// Define regex patterns for video links
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)([\d]+)$/;
const googleDriveRegex = /^(https?:\/\/)?(www\.)?(drive\.google\.com\/)([a-zA-Z0-9_-]+)$/;

// Validation schema
const portfolioItemSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  videoUrl: z.string().refine(val => {
    return youtubeRegex.test(val) || vimeoRegex.test(val) || googleDriveRegex.test(val);
  }, {
    message: "Ingresa una URL válida de YouTube, Vimeo o Google Drive"
  }),
  thumbnailUrl: z.string().optional(),
  order: z.number()
});

const portfolioSchema = z.object({
  portfolioItems: z.array(portfolioItemSchema).min(1, "Agrega al menos un proyecto a tu portafolio")
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

interface PortfolioFormProps {
  data: any;
  onSave: (data: PortfolioFormValues) => void;
}

const PortfolioForm = ({ data, onSave }: PortfolioFormProps) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      portfolioItems: data.portfolioItems || []
    }
  });
  
  const portfolioItems = form.watch('portfolioItems');
  
  const onSubmit = (values: PortfolioFormValues) => {
    onSave(values);
  };
  
  const addPortfolioItem = () => {
    if (!newTitle || !newVideoUrl) return;
    
    // Validate URL
    const isValidUrl = youtubeRegex.test(newVideoUrl) || 
                      vimeoRegex.test(newVideoUrl) || 
                      googleDriveRegex.test(newVideoUrl);
    
    if (!isValidUrl) {
      form.setError('portfolioItems', { 
        message: "Ingresa una URL válida de YouTube, Vimeo o Google Drive" 
      });
      return;
    }
    
    // Get thumbnail from YouTube or Vimeo
    let thumbnailUrl = '';
    
    if (youtubeRegex.test(newVideoUrl)) {
      const videoId = newVideoUrl.match(/([a-zA-Z0-9_-]{11})$/)?.[0];
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    
    form.setValue('portfolioItems', [
      ...portfolioItems,
      { 
        title: newTitle, 
        description: newDescription, 
        videoUrl: newVideoUrl,
        thumbnailUrl,
        order: portfolioItems.length
      }
    ]);
    
    setNewTitle('');
    setNewDescription('');
    setNewVideoUrl('');
  };
  
  const removePortfolioItem = (index: number) => {
    const updatedItems = [...portfolioItems];
    updatedItems.splice(index, 1);
    
    // Update order values
    const reorderedItems = updatedItems.map((item, idx) => ({
      ...item,
      order: idx
    }));
    
    form.setValue('portfolioItems', reorderedItems);
  };
  
  const moveItemUp = (index: number) => {
    if (index === 0) return;
    
    const updatedItems = [...portfolioItems];
    const temp = updatedItems[index];
    updatedItems[index] = updatedItems[index - 1];
    updatedItems[index - 1] = temp;
    
    // Update order values
    const reorderedItems = updatedItems.map((item, idx) => ({
      ...item,
      order: idx
    }));
    
    form.setValue('portfolioItems', reorderedItems);
  };
  
  const moveItemDown = (index: number) => {
    if (index === portfolioItems.length - 1) return;
    
    const updatedItems = [...portfolioItems];
    const temp = updatedItems[index];
    updatedItems[index] = updatedItems[index + 1];
    updatedItems[index + 1] = temp;
    
    // Update order values
    const reorderedItems = updatedItems.map((item, idx) => ({
      ...item,
      order: idx
    }));
    
    form.setValue('portfolioItems', reorderedItems);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-1">Tu portafolio</h3>
          <p className="text-sm text-[#8E8E93] mb-4">
            Agrega tus mejores trabajos para mostrar tu talento. Soportamos enlaces de YouTube, Vimeo y Google Drive.
          </p>
          
          <div className="bg-[#F2F2F7] p-4 rounded-md mb-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Título del proyecto
                </label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Video corporativo para Empresa X"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Descripción (opcional)
                </label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Breve descripción del proyecto, tu rol, técnicas utilizadas..."
                  className="resize-none h-20"
                />
              </div>
              
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
                  URL del video
                </label>
                <div className="flex">
                  <Input
                    id="videoUrl"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={addPortfolioItem}
                    className="ml-2"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Usa enlaces de YouTube, Vimeo o Google Drive
                </p>
              </div>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="portfolioItems"
            render={() => (
              <FormItem>
                <div className="space-y-4">
                  {portfolioItems.length === 0 ? (
                    <p className="text-center text-[#8E8E93] py-4">No has agregado ningún proyecto aún.</p>
                  ) : (
                    portfolioItems.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-md"
                      >
                        <div className="md:w-1/3">
                          <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                            {item.thumbnailUrl ? (
                              <img 
                                src={item.thumbnailUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#8E8E93]">
                                No preview
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            {item.description && (
                              <p className="text-sm text-[#8E8E93] mt-1">{item.description}</p>
                            )}
                            <p className="text-xs text-primary mt-2 truncate">{item.videoUrl}</p>
                          </div>
                          <div className="flex justify-end gap-1 mt-4">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => moveItemUp(index)}
                              disabled={index === 0}
                            >
                              <MoveUp className="h-4 w-4 text-[#8E8E93]" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => moveItemDown(index)}
                              disabled={index === portfolioItems.length - 1}
                            >
                              <MoveDown className="h-4 w-4 text-[#8E8E93]" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removePortfolioItem(index)}
                            >
                              <X className="h-4 w-4 text-[#8E8E93]" />
                            </Button>
                          </div>
                        </div>
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

export default PortfolioForm;
