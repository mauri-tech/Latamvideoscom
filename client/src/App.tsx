import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/lib/protected-route";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import EditorProfilePage from "@/pages/EditorProfilePage";
import SearchPage from "@/pages/SearchPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminPanel from "@/pages/AdminPanel";
import AdminPage from "@/pages/AdminPage";
import ForumPage from "@/pages/ForumPage";
import NewTopicPage from "@/pages/NewTopicPage";
import TopicDetailPage from "@/pages/TopicDetailPage";
import FAQPage from "@/pages/FAQPage";
import TermsPage from "@/pages/TermsPage";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import CookiesPage from "@/pages/CookiesPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import ComoFuncionaPage from "@/pages/ComoFuncionaPage";
import MessagesPage from "@/pages/MessagesPage";
import EditProfilePage from "@/pages/EditProfilePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/editor/:id" component={EditorProfilePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/forum" component={ForumPage} />
      <Route path="/forum/new-topic" component={NewTopicPage} />
      <Route path="/forum/topic/:slug" component={TopicDetailPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/cookies" component={CookiesPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/como-funciona" component={ComoFuncionaPage} />
      <ProtectedRoute path="/mensajes" component={MessagesPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/editar-perfil" component={EditProfilePage} />
      <ProtectedRoute path="/admin" component={AdminPanel} />
      <ProtectedRoute path="/admin/test-data" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showModal, setShowModal] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  
  useEffect(() => {
    // Check if user has already dismissed the modal
    const hasSeenModal = localStorage.getItem('sawConstructionModal');
    if (hasSeenModal) {
      setShowModal(false);
    }
  }, []);
  
  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('sawConstructionModal', 'true');
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Banner de construcción */}
        {showBanner && (
          <div className="sticky top-0 left-0 right-0 bg-[#FFF3CD] text-gray-800 py-2 px-4 z-50 shadow-md">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="mr-2" role="img" aria-label="construction">⚙️</span>
                    <p className="text-sm font-medium">
                      Sitio en construcción — 63% completado
                    </p>
                  </div>
                  
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-[#28a745] h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '63%' }}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setShowBanner(false)}
                  className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
        
        <Router />
        <Toaster />
        
        {/* Modal de construcción - vanilla implementation */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 relative">
                <button 
                  onClick={handleCloseModal}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
                
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span role="img" aria-label="construction">🚧</span> 
                  Esta página está en construcción
                </h2>
                
                <p className="text-gray-600 mb-4">
                  Actualmente estamos finalizando módulos y funcionalidades. Lo que ves es una vista previa (carcasa) de cómo será el sitio final.
                </p>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <p className="font-medium mb-3">
                    ¿Quieres ser de los primeros en publicar tu trabajo? Llena el siguiente formulario:
                  </p>
                  
                  <div className="w-full rounded-md overflow-hidden bg-gray-50 border border-gray-200">
                    <iframe 
                      src="https://docs.google.com/forms/d/e/1FAIpQLSf_A9wsGu--SzvCw6TsHpAk5hSPXqP6jna1W5f2GnQDu4Tn2w/viewform?embedded=true"
                      width="100%" 
                      height="500" 
                      frameBorder="0" 
                      title="Formulario de registro"
                    >
                      Cargando...
                    </iframe>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-[#020617] text-white rounded hover:bg-[#1E293B] transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;