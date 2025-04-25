import { useState } from 'react';
import { X } from 'lucide-react';

interface ConstructionBannerProps {
  progress: number;
}

export const ConstructionBanner = ({ progress }: ConstructionBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 left-0 right-0 bg-[#FFF3CD] text-gray-800 py-2 px-4 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="mr-2" role="img" aria-label="construction">⚙️</span>
            <p className="text-sm font-medium">
              Sitio en construcción — {progress}% completado
            </p>
          </div>
          
          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#28a745] h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Cerrar banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ConstructionBanner;