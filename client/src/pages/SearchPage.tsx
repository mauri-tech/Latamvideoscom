import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import EditorList from '@/components/search/EditorList';
import { Helmet } from 'react-helmet';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    professionalType: '',
    country: '',
    maxRate: 150,
    page: 1,             // Página actual
    limit: 10,           // Elementos por página
    sortBy: 'relevance', // Campo de ordenamiento
    sortDirection: 'desc' // Dirección de ordenamiento
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Buscar profesionales | latamvideos.com</title>
        <meta name="description" content="Encuentra profesionales de video especializados para tus proyectos en Latinoamérica. Filtra por tipo de profesional, país y presupuesto." />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Buscar profesionales en video</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <SearchFilters
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </div>
          
          {/* Results Section */}
          <div className="w-full md:w-3/4">
            <EditorList 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
