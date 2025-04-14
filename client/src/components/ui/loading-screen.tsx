import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  message = "Cargando contenido..." 
}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
      setFadeOut(false);
    } else {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000); // Duración igual a la transición CSS
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (!show) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Fondo principal con gradiente */}
        <div className="absolute inset-0 gradient-premium-blue"></div>
        
        {/* Capas de efectos adicionales */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041C32]/10 via-transparent to-[#041C32]/10 animate-pulse-slow"></div>
        
        {/* Elementos etéreos flotantes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Círculos luminosos */}
          <div className="absolute w-32 h-32 rounded-full bg-[#0050FF]/20 blur-xl top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
          <div className="absolute w-40 h-40 rounded-full bg-[#A0C4FF]/30 blur-xl top-2/3 right-1/4 transform translate-x-1/2 translate-y-1/2 animate-float-reverse"></div>
          <div className="absolute w-24 h-24 rounded-full bg-[#0050FF]/20 blur-xl bottom-1/4 right-1/3 animate-pulse-slow"></div>
          
          {/* Líneas de código simuladas */}
          <div className="absolute top-1/4 left-1/3 w-1/3 h-px bg-white/20 animate-expand"></div>
          <div className="absolute top-1/3 left-1/4 w-1/3 h-px bg-white/30 animate-expand-delay"></div>
          <div className="absolute top-2/5 left-1/5 w-1/4 h-px bg-white/20 animate-expand-delay-2"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1/3 h-px bg-white/30 animate-expand-reverse"></div>
        </div>
      </div>
      
      {/* Contenido central */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl rounded-xl p-8 max-w-md flex flex-col items-center border border-white/10 shadow-2xl">
        <div className="mb-4 relative">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-[#A0C4FF] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-[#0050FF] animate-spin-slow"></div>
            <div className="absolute inset-4 rounded-full border-t-2 border-l-2 border-[#041C32] animate-spin-reverse"></div>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#0050FF]/10 blur-xl animate-pulse"></div>
        </div>
        
        <p className="text-white text-lg font-medium tracking-wider text-center">{message}</p>
        <p className="text-white/60 text-sm mt-2 animate-pulse-slow">Estamos preparando tu experiencia...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;