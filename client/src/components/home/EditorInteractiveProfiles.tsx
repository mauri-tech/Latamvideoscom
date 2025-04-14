import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Opciones de pestañas 
const tabs = [
  { id: 'info', label: 'Información' },
  { id: 'portfolio', label: 'Portafolio' },
  { id: 'equipment', label: 'Equipamiento' },
  { id: 'rates', label: 'Tarifas' }
];

const EditorInteractiveProfiles = () => {
  const [activeTab, setActiveTab] = useState('info');
  
  return (
    <div className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Perfiles de Editores Destacados</h2>
        <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
          Explora los perfiles interactivos de nuestros mejores editores de video en Latinoamérica. 
          Navega entre las diferentes secciones para conocer su trabajo y tarifas.
        </p>
        
        {/* Tarjeta de ejemplo */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-[#0093E9] to-[#80D0C7] p-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Mauricio Treviño Botticelli"
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
            />
            <h3 className="font-bold text-xl text-white mt-3">Mauricio Treviño Botticelli</h3>
            <p className="text-white/80 text-sm">Ciudad de México, México</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-white text-sm bg-[#007AFF] px-2 py-1 rounded-full text-xs">
                5 años de experiencia
              </span>
            </div>
          </div>
          
          {/* Pestañas */}
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 transition ${
                  activeTab === tab.id
                    ? 'text-[#007AFF] border-b-2 border-[#007AFF] font-medium'
                    : 'text-gray-500 hover:text-[#007AFF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Contenido de las pestañas */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div>
                <h4 className="font-medium mb-3">Biografía</h4>
                <p className="text-gray-700 mb-4">
                  Especialista en contenido visual para redes, campañas y documentales. 
                  Mi enfoque se centra en narrativa visual y colorimetría para lograr un impacto emocional.
                </p>
                
                <h4 className="font-medium mb-2">Especialidades</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Editor de video", "Videógrafo", "Director de fotografía"].map((specialty, i) => (
                    <Badge key={i} className="bg-[#007AFF]/10 text-[#007AFF] border-0">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'portfolio' && (
              <div>
                <h4 className="font-medium mb-4">Proyectos destacados</h4>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80" 
                      alt="Documental Alas de Libertad"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3 bg-[#F5F5F7]">
                      <h5 className="font-medium">Documental "Alas de Libertad"</h5>
                    </div>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169&q=80" 
                      alt="Campaña Ritmos Urbanos"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3 bg-[#F5F5F7]">
                      <h5 className="font-medium">Campaña "Ritmos Urbanos"</h5>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'equipment' && (
              <div>
                <h4 className="font-medium mb-4">Equipamiento profesional</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-[#F5F5F7] rounded-lg">
                    <span className="font-medium text-[#007AFF]">Cámara: </span>
                    <span>Sony Alpha 7 IV</span>
                  </div>
                  <div className="p-3 bg-[#F5F5F7] rounded-lg">
                    <span className="font-medium text-[#007AFF]">Computadora: </span>
                    <span>Mac Mini Pro M4 con 32GB RAM</span>
                  </div>
                  <div className="p-3 bg-[#F5F5F7] rounded-lg">
                    <span className="font-medium text-[#007AFF]">Software: </span>
                    <span>Adobe Premiere Pro, DaVinci Resolve, After Effects</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'rates' && (
              <div>
                <h4 className="font-medium mb-4">Planes de servicio</h4>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Básico</h5>
                      <span className="text-[#007AFF] font-bold">$200 USD</span>
                    </div>
                    <p className="text-sm text-gray-500">Edición simple para redes sociales o YouTube</p>
                  </div>
                  
                  <div className="border-2 border-[#007AFF] rounded-lg p-4 bg-[#007AFF]/5">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Estándar</h5>
                      <span className="text-[#007AFF] font-bold">$350 USD</span>
                    </div>
                    <p className="text-sm text-gray-500">Edición profesional con efectos y transiciones</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Premium</h5>
                      <span className="text-[#007AFF] font-bold">$500 USD</span>
                    </div>
                    <p className="text-sm text-gray-500">Edición avanzada con tratamiento cinematográfico</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Botón de acción */}
          <div className="p-4 border-t border-gray-200">
            <Link href="/editor/1">
              <Button className="w-full bg-[#007AFF] hover:bg-[#0069d9]">
                Ver perfil completo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorInteractiveProfiles;