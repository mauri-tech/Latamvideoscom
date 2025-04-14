import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'wouter';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2, PaperPlane, Search, RefreshCw } from 'lucide-react';

// Esquema para enviar mensajes
const messageSchema = z.object({
  content: z.string().min(1, { message: "El mensaje no puede estar vacío" }),
});

type MessageFormValues = z.infer<typeof messageSchema>;

// Esquema para enviar nuevas conversaciones
const newConversationSchema = z.object({
  recipientId: z.number(),
  subject: z.string().min(1, { message: "El asunto no puede estar vacío" }),
  message: z.string().min(1, { message: "El mensaje no puede estar vacío" }),
});

type NewConversationFormValues = z.infer<typeof newConversationSchema>;

const MessagesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewConversation, setShowNewConversation] = useState(false);
  
  // Form para enviar mensajes
  const messageForm = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  
  // Form para nuevas conversaciones
  const newConversationForm = useForm<NewConversationFormValues>({
    resolver: zodResolver(newConversationSchema),
    defaultValues: {
      recipientId: 0,
      subject: "",
      message: "",
    },
  });
  
  // Obtener datos del usuario actual
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/user'],
    retry: false,
    onError: () => {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para acceder a tus mensajes",
        variant: "destructive",
      });
      navigate('/auth');
    }
  });
  
  // Obtener conversaciones del usuario
  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ['/api/messages/conversations'],
    enabled: !!currentUser?.id,
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });
  
  // Obtener mensajes de una conversación
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['/api/messages/conversation', activeConversation],
    enabled: !!activeConversation,
    refetchInterval: 10000, // Actualizar cada 10 segundos
  });
  
  // Obtener usuarios para nueva conversación
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['/api/users/directory'],
    enabled: showNewConversation,
  });
  
  // Marcar como leído
  const markAsReadMutation = useMutation({
    mutationFn: async (conversationId: number) => {
      const res = await apiRequest('POST', `/api/messages/conversations/${conversationId}/read`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversations'] });
    },
  });
  
  // Enviar mensaje
  const sendMessageMutation = useMutation({
    mutationFn: async ({ conversationId, content }: { conversationId: number, content: string }) => {
      const res = await apiRequest('POST', `/api/messages/conversations/${conversationId}/reply`, { content });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversation', activeConversation] });
      messageForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje: " + error.message,
        variant: "destructive",
      });
    }
  });
  
  // Crear nueva conversación
  const createConversationMutation = useMutation({
    mutationFn: async (data: NewConversationFormValues) => {
      const res = await apiRequest('POST', '/api/messages/conversations', data);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages/conversations'] });
      setActiveConversation(data.id);
      setShowNewConversation(false);
      newConversationForm.reset();
      toast({
        title: "Conversación creada",
        description: "Se ha iniciado una nueva conversación",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "No se pudo crear la conversación: " + error.message,
        variant: "destructive",
      });
    }
  });
  
  // Scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Marcar conversación como leída al seleccionarla
  useEffect(() => {
    if (activeConversation) {
      markAsReadMutation.mutate(activeConversation);
    }
  }, [activeConversation]);
  
  // Manejar envío de mensaje
  const onMessageSubmit = (values: MessageFormValues) => {
    if (!activeConversation) return;
    
    sendMessageMutation.mutate({
      conversationId: activeConversation,
      content: values.content,
    });
  };
  
  // Manejar creación de nueva conversación
  const onNewConversationSubmit = (values: NewConversationFormValues) => {
    createConversationMutation.mutate(values);
  };
  
  // Filtrar conversaciones por búsqueda
  const filteredConversations = conversations ? conversations.filter((conversation: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      conversation.subject?.toLowerCase().includes(searchLower) ||
      conversation.otherUser?.name?.toLowerCase().includes(searchLower)
    );
  }) : [];
  
  // Filtrar usuarios por búsqueda para nueva conversación
  const filteredUsers = users ? users.filter((user: any) => {
    if (user.id === currentUser?.id) return false; // No mostrar al usuario actual
    
    const searchLower = searchQuery.toLowerCase();
    return user.name?.toLowerCase().includes(searchLower) || user.email?.toLowerCase().includes(searchLower);
  }) : [];
  
  const isLoading = isLoadingUser || isLoadingConversations;
  const isPendingSend = sendMessageMutation.isPending;
  const isPendingCreate = createConversationMutation.isPending;
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Hoy ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Ayer ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return date.toLocaleDateString('es-ES', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };
  
  // Obtener iniciales para avatar
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <Helmet>
        <title>Mensajes | latamvideos.com</title>
        <meta name="description" content="Sistema de mensajería para comunicarte con profesionales y clientes en latamvideos.com" />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mensajes</h1>
          
          <Button 
            onClick={() => {
              setShowNewConversation(true);
              setActiveConversation(null);
              setSearchQuery("");
            }}
          >
            Nueva conversación
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Lista de conversaciones */}
            <div className="border-r">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar conversaciones..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[550px]">
                {filteredConversations.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    {searchQuery 
                      ? "No se encontraron conversaciones que coincidan con tu búsqueda" 
                      : "No tienes conversaciones aún"}
                  </div>
                ) : (
                  filteredConversations.map((conversation: any) => (
                    <div key={conversation.id}>
                      <button
                        className={`w-full p-3 text-left hover:bg-gray-50 ${activeConversation === conversation.id ? 'bg-blue-50' : ''} ${conversation.unread ? 'font-semibold' : ''}`}
                        onClick={() => {
                          setActiveConversation(conversation.id);
                          setShowNewConversation(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.otherUser?.profilePicture} />
                            <AvatarFallback>{getInitials(conversation.otherUser?.name || "?")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{conversation.otherUser?.name}</h3>
                              <span className="text-xs text-gray-500">{formatDate(conversation.updatedAt)}</span>
                            </div>
                            <p className="text-sm font-medium truncate">{conversation.subject}</p>
                            <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                        {conversation.unread && (
                          <div className="flex justify-end mt-1">
                            <span className="inline-flex h-2 w-2 rounded-full bg-primary"></span>
                          </div>
                        )}
                      </button>
                      <Separator />
                    </div>
                  ))
                )}
              </ScrollArea>
            </div>
            
            {/* Área de visualización de mensajes */}
            <div className="col-span-2 flex flex-col h-full">
              {showNewConversation ? (
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-semibold">Nueva conversación</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowNewConversation(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                  
                  <div className="p-4 flex-1 overflow-y-auto">
                    <Form {...newConversationForm}>
                      <form onSubmit={newConversationForm.handleSubmit(onNewConversationSubmit)} className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Destinatario</h3>
                          <div className="relative mb-4">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Buscar usuario..."
                              className="pl-8"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          
                          <div className="border rounded-md h-[120px] overflow-y-auto">
                            {isLoadingUsers ? (
                              <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                              </div>
                            ) : filteredUsers.length === 0 ? (
                              <div className="p-4 text-center text-gray-500 text-sm">
                                No se encontraron usuarios
                              </div>
                            ) : (
                              filteredUsers.map((user: any) => (
                                <div 
                                  key={user.id} 
                                  className={`p-2 hover:bg-gray-50 cursor-pointer ${newConversationForm.getValues("recipientId") === user.id ? 'bg-blue-50' : ''}`}
                                  onClick={() => newConversationForm.setValue("recipientId", user.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.profilePicture} />
                                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium">{user.name}</p>
                                      <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          {newConversationForm.formState.errors.recipientId && (
                            <p className="text-sm text-red-500 mt-1">Debes seleccionar un destinatario</p>
                          )}
                        </div>
                        
                        <FormField
                          control={newConversationForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <h3 className="text-sm font-medium mb-2">Asunto</h3>
                              <FormControl>
                                <Input placeholder="Asunto de la conversación" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={newConversationForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <h3 className="text-sm font-medium mb-2">Mensaje</h3>
                              <FormControl>
                                <Textarea 
                                  placeholder="Escribe tu mensaje inicial..." 
                                  className="min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isPendingCreate}
                          >
                            {isPendingCreate && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Iniciar conversación
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              ) : activeConversation ? (
                <>
                  <div className="p-3 border-b flex justify-between items-center">
                    {isLoadingMessages ? (
                      <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      <div>
                        <h2 className="font-semibold">
                          {conversations?.find((c: any) => c.id === activeConversation)?.subject}
                        </h2>
                        <p className="text-xs text-gray-500">
                          con {conversations?.find((c: any) => c.id === activeConversation)?.otherUser?.name}
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/messages/conversation', activeConversation] })}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Actualizar
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4">
                    {isLoadingMessages ? (
                      <div className="flex flex-col gap-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <div className={`h-12 ${i % 2 === 0 ? 'w-40' : 'w-52'} bg-gray-200 animate-pulse rounded-lg`}></div>
                          </div>
                        ))}
                      </div>
                    ) : messages?.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        No hay mensajes en esta conversación
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages?.map((message: any) => {
                          const isOwnMessage = message.senderId === currentUser?.id;
                          return (
                            <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                              <div className="flex gap-2 max-w-[70%]">
                                {!isOwnMessage && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={message.sender?.profilePicture} />
                                    <AvatarFallback>{getInitials(message.sender?.name)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div>
                                  <div className={`p-3 rounded-lg ${isOwnMessage ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                                    <p className="text-sm">{message.content}</p>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(message.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 border-t mt-auto">
                    <Form {...messageForm}>
                      <form onSubmit={messageForm.handleSubmit(onMessageSubmit)} className="flex gap-2">
                        <FormField
                          control={messageForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input 
                                  placeholder="Escribe un mensaje..." 
                                  {...field} 
                                  disabled={isPendingSend}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" size="sm" disabled={isPendingSend}>
                          {isPendingSend ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <PaperPlane className="h-4 w-4" />
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 flex-col p-4">
                  <p className="mb-3">Selecciona una conversación o inicia una nueva</p>
                  <Button 
                    variant="outline"
                    onClick={() => setShowNewConversation(true)}
                  >
                    Iniciar nueva conversación
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MessagesPage;