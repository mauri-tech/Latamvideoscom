import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProfileForm from './ProfileForm';
import SkillsForm from './SkillsForm';
import EquipmentForm from './EquipmentForm';
import PortfolioForm from './PortfolioForm';
import RatesForm from './RatesForm';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';

interface FormStep {
  title: string;
  component: React.ReactNode;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    profile: {},
    skills: {},
    equipment: {},
    portfolio: {},
    rates: {}
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  // Define steps and their corresponding components
  const steps: FormStep[] = [
    {
      title: "Información personal",
      component: (
        <ProfileForm 
          data={formData.profile} 
          onSave={(data) => updateFormData('profile', data)}
        />
      )
    },
    {
      title: "Softwares y estilos",
      component: (
        <SkillsForm 
          data={formData.skills} 
          onSave={(data) => updateFormData('skills', data)}
        />
      )
    },
    {
      title: "Equipo técnico",
      component: (
        <EquipmentForm 
          data={formData.equipment} 
          onSave={(data) => updateFormData('equipment', data)}
        />
      )
    },
    {
      title: "Portafolio",
      component: (
        <PortfolioForm 
          data={formData.portfolio} 
          onSave={(data) => updateFormData('portfolio', data)}
        />
      )
    },
    {
      title: "Tarifas y disponibilidad",
      component: (
        <RatesForm 
          data={formData.rates} 
          onSave={(data) => updateFormData('rates', data)}
        />
      )
    }
  ];

  const updateFormData = (step: string, data: any) => {
    setFormData({
      ...formData,
      [step]: data
    });
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const submitForm = async () => {
    setLoading(true);
    
    try {
      // This is where you would send the form data to your backend API
      // For this MVP example, we'll simulate a successful registration
      
      // In a real implementation, you would handle user creation, profile creation, etc.
      // const response = await apiRequest('POST', '/api/editor-profiles', combinedData);
      
      setTimeout(() => {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu perfil ha sido creado correctamente. Ahora puedes comenzar a recibir propuestas.",
        });
        
        // Redirect to the dashboard or profile page
        navigate('/dashboard');
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error al registrar",
        description: "Ha ocurrido un error al crear tu perfil. Por favor, intenta nuevamente.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${index <= currentStep ? 'text-primary' : 'text-gray-400'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${
                index < currentStep 
                  ? 'bg-primary text-white border-primary' 
                  : index === currentStep 
                    ? 'border-primary text-primary' 
                    : 'border-gray-300 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs hidden md:block ${index <= currentStep ? 'font-medium' : ''}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6">{steps[currentStep].title}</h2>
        
        {steps[currentStep].component}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 0 || loading}
        >
          Anterior
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={goToNextStep}>
            Siguiente
          </Button>
        ) : (
          <Button 
            onClick={submitForm} 
            disabled={loading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {loading ? 'Registrando...' : 'Finalizar registro'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
