import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/lib/protected-route";
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
