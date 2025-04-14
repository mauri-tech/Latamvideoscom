import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import EditorList from '@/components/search/EditorList';
import { Helmet } from 'react-helmet';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    projectType: '',
    country: '',
    software: [],
    styles: [],
    maxRate: 150,
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Buscar editores de video | latamvideos.com</title>
        <meta name="description" content="Encuentra editores de video especializados para tus proyectos. Filtra por tipo de proyecto, país, software y presupuesto." />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Buscar editores de video</h1>
        
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
            <EditorList filters={filters} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
