import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Redirect } from "wouter";

const AdminPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  // Redirect if not admin
  if (!user || user.userType !== "admin") {
    return <Redirect to="/" />;
  }

  const createTestData = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/admin/create-test-data');
      const data = await response.json();
      
      toast({
        title: "Datos de prueba creados",
        description: `Se han creado ${data.profiles.length} perfiles de prueba con diferentes roles profesionales.`,
      });
    } catch (error) {
      console.error("Error creating test data:", error);
      toast({
        title: "Error",
        description: "No se pudieron crear los datos de prueba. Consulta la consola para más detalles.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Datos de Prueba</h2>
        <p className="mb-4">
          Crea usuarios y perfiles de prueba con diferentes tipos profesionales para probar la funcionalidad de filtrado.
        </p>
        <Button 
          onClick={createTestData} 
          disabled={isLoading}
        >
          {isLoading ? "Creando..." : "Crear Datos de Prueba"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;