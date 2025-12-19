import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProfileForm from './ProfileForm';
import SkillsForm from './SkillsForm';
import EquipmentForm from './EquipmentForm';
import PortfolioForm from './PortfolioForm';
import RatesForm from './RatesForm';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';

interface FormStep {
  title: string;
  subtitle: string;
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

  const updateFormData = (step: string, data: any) => {
    setFormData({
      ...formData,
      [step]: data
    });
  };

  // Define steps and their corresponding components
  const steps: FormStep[] = [
    {
      title: "Identidad",
      subtitle: "Quién eres",
      component: (
        <ProfileForm
          data={formData.profile}
          onSave={(data) => updateFormData('profile', data)}
        />
      )
    },
    {
      title: "Habilidades",
      subtitle: "Qué sabes hacer",
      component: (
        <SkillsForm
          data={formData.skills}
          onSave={(data) => updateFormData('skills', data)}
        />
      )
    },
    {
      title: "Equipo",
      subtitle: "Tus herramientas",
      component: (
        <EquipmentForm
          data={formData.equipment}
          onSave={(data) => updateFormData('equipment', data)}
        />
      )
    },
    {
      title: "Portafolio",
      subtitle: "Tu trabajo",
      component: (
        <PortfolioForm
          data={formData.portfolio}
          onSave={(data) => updateFormData('portfolio', data)}
        />
      )
    },
    {
      title: "Tarifas",
      subtitle: "Tu valor",
      component: (
        <RatesForm
          data={formData.rates}
          onSave={(data) => updateFormData('rates', data)}
        />
      )
    }
  ];

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
      // Simulation of API call
      setTimeout(() => {
        toast({
          title: "¡Perfil completado!",
          description: "Tu perfil profesional ha sido creado exitosamente.",
        });

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
      {/* Stepper Header - Cleaner Look */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Paso {currentStep + 1} de {steps.length}</p>
            <h1 className="text-3xl font-bold text-foreground">{steps[currentStep].title}</h1>
            <p className="text-gray-500">{steps[currentStep].subtitle}</p>
          </div>

          <div className="hidden md:flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="h-1 w-full bg-gray-100 rounded-full md:hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content Card */}
      <Card className="rounded-2xl shadow-card border-0 bg-white mb-8 overflow-hidden">
        <CardContent className="p-8">
          {steps[currentStep].component}
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 0 || loading}
          className={`rounded-full border-gray-200 ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
        </Button>

        <div className="flex gap-4">
          {/* Optional: Add "Save for later" button here */}
        </div>

        {currentStep < steps.length - 1 ? (
          <Button onClick={goToNextStep} className="rounded-full shadow-lg bg-black hover:bg-gray-800 text-white px-8 h-12">
            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={submitForm}
            disabled={loading}
            className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white px-8 h-12 font-bold"
          >
            {loading ? 'Guardando...' : 'Completar Perfil'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
