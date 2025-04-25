import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConstructionModalProps {
  formUrl: string;
}

export const ConstructionModal = ({ formUrl }: ConstructionModalProps) => {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem('sawConstructionModal');
    
    if (!hasSeenModal) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleClose = () => {
    setOpen(false);
    // Save in localStorage to prevent showing again in the same session
    localStorage.setItem('sawConstructionModal', 'true');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="construction">🚧</span> 
            Esta página está en construcción
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          <p className="text-gray-600 mb-4 text-lg">
            Actualmente estamos finalizando módulos y funcionalidades. Lo que ves es una vista previa (carcasa) de cómo será el sitio final.
          </p>
          
          <div className="border-t border-gray-200 my-4 pt-4">
            <p className="font-medium text-lg mb-3">
              ¿Quieres ser de los primeros en publicar tu trabajo? Llena el siguiente formulario:
            </p>
            
            <div className="w-full rounded-md overflow-hidden bg-gray-50 border border-gray-200">
              <iframe 
                src={formUrl}
                width="100%" 
                height="600" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                title="Formulario de registro"
                className="mx-auto"
              >
                Cargando...
              </iframe>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button onClick={handleClose} className="bg-[#020617] hover:bg-[#1E293B] px-6">
              Entendido
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConstructionModal;