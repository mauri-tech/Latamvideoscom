import { storage } from "./storage";
import bcrypt from "bcrypt";
import { InsertUser, InsertEditorProfile, InsertPortfolioItem } from "@shared/schema";

// Función para crear un hash de contraseña
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seedTestProfiles() {
  console.log("Iniciando creación de perfiles de prueba...");
  
  // Lista de software (asumimos que ya están creados en la base de datos)
  const softwareList = await storage.getAllSoftware();
  const softwareIds = softwareList.map(s => s.id);
  
  // Lista de estilos de edición (asumimos que ya están creados)
  const stylesList = await storage.getAllEditingStyles();
  const stylesIds = stylesList.map(s => s.id);
  
  // Definición de los 10 perfiles de prueba
  const testProfiles = [
    {
      // Perfil 1: Editor principiante (3 años)
      user: {
        name: "[Prueba] Carlos Méndez",
        email: "carlos.test@latamvideos.com",
        password: "test123",
        country: "MX",
        bio: "Editor principiante con experiencia en contenido para redes sociales.",
        userType: "editor",
        yearsOfExperience: 3
      },
      profile: {
        software: [1, 5], // Premiere Pro, CapCut
        editingStyles: [1, 4], // YouTube, Redes Sociales
        equipment: ["Laptop HP", "Monitor externo 24 pulgadas"],
        basicRate: 30,
        mediumRate: 45,
        advancedRate: 70,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
        paymentMethods: ["PayPal", "Transferencia bancaria"],
        experience: "3 años creando contenido para redes sociales y YouTube. Especializado en edición rápida y dinámica.",
        expertise: ["Redes sociales", "YouTube", "TikTok"]
      },
      portfolio: [
        {
          title: "Demo Reel 2024",
          description: "Recopilación de mis mejores trabajos recientes",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
          videoType: "reel",
          duration: "2:30",
          order: 1
        }
      ]
    },
    {
      // Perfil 2: Editor con experiencia media (5 años)
      user: {
        name: "[Prueba] Ana Gutiérrez",
        email: "ana.test@latamvideos.com",
        password: "test123",
        country: "CO",
        bio: "Editora especializada en documentales y contenido narrativo.",
        userType: "editor",
        yearsOfExperience: 5
      },
      profile: {
        software: [1, 3], // Premiere Pro, DaVinci Resolve
        editingStyles: [2, 5], // Documental, Cinematic
        equipment: ["iMac 27\"", "Disco duro externo 4TB", "Tarjeta SD de alta velocidad"],
        basicRate: 60,
        mediumRate: 85,
        advancedRate: 120,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },
        paymentMethods: ["PayPal", "Transferencia bancaria", "Wise"],
        experience: "5 años trabajando en documentales y videos corporativos. Enfoque en narrativa visual y storytelling.",
        expertise: ["Documentales", "Videos corporativos", "Entrevistas"]
      },
      portfolio: [
        {
          title: "Documental: Voces del Amazonas",
          description: "Documental sobre comunidades indígenas y conservación",
          videoUrl: "https://vimeo.com/123456789",
          thumbnailUrl: "https://i.vimeocdn.com/video/123456789_640.jpg",
          videoType: "documental",
          duration: "15:45",
          order: 1
        }
      ]
    },
    {
      // Perfil 3: Editor senior (10+ años)
      user: {
        name: "[Prueba] Ricardo Vega",
        email: "ricardo.test@latamvideos.com",
        password: "test123",
        country: "AR",
        bio: "Editor senior con experiencia en publicidad y cine.",
        userType: "editor",
        yearsOfExperience: 12
      },
      profile: {
        software: [1, 2, 3, 4], // Premiere, Final Cut, DaVinci, After Effects
        editingStyles: [3, 5, 6], // Comercial, Cinematic, Narrativo
        equipment: ["Mac Pro", "Monitor calibrado de color", "Blackmagic Design Video Assist", "Sistema de almacenamiento RAID"],
        basicRate: 100,
        mediumRate: 150,
        advancedRate: 250,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
        paymentMethods: ["Transferencia bancaria", "PayPal", "Crypto"],
        experience: "12 años trabajando con agencias de publicidad, productoras y marcas internacionales. Especializado en comerciales de alto impacto visual.",
        expertise: ["Comerciales", "Spots publicitarios", "Videos de marca", "Cine"]
      },
      portfolio: [
        {
          title: "Comercial: Nueva colección verano",
          description: "Campaña para marca de moda internacional",
          videoUrl: "https://vimeo.com/987654321",
          thumbnailUrl: "https://i.vimeocdn.com/video/987654321_640.jpg",
          videoType: "comercial",
          duration: "0:45",
          order: 1
        }
      ]
    },
    {
      // Perfil 4: Editor freelance (7 años)
      user: {
        name: "[Prueba] Martina Rojas",
        email: "martina.test@latamvideos.com",
        password: "test123",
        country: "CL",
        bio: "Editora freelance especializada en videos musicales y fashion films.",
        userType: "editor",
        yearsOfExperience: 7
      },
      profile: {
        software: [1, 3, 4], // Premiere, DaVinci, After Effects
        editingStyles: [5, 7], // Cinematic, Fashion/Music Video
        equipment: ["MacBook Pro 16\"", "SSD externo 2TB", "Auriculares profesionales"],
        basicRate: 75,
        mediumRate: 110,
        advancedRate: 180,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true },
        paymentMethods: ["PayPal", "Transferencia bancaria", "Wise"],
        experience: "7 años trabajando con artistas independientes y sellos discográficos. Experiencia en fashion films y videoclips.",
        expertise: ["Videoclips", "Fashion films", "Contenido musical"]
      },
      portfolio: [
        {
          title: "Videoclip: Neón de Medianoche",
          description: "Videoclip para banda indie de Santiago",
          videoUrl: "https://www.youtube.com/watch?v=abcdefghijk",
          thumbnailUrl: "https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg",
          videoType: "music",
          duration: "4:12",
          order: 1
        }
      ]
    },
    {
      // Perfil 5: Editor corporativo (6 años)
      user: {
        name: "[Prueba] Fernando Molina",
        email: "fernando.test@latamvideos.com",
        password: "test123",
        country: "PE",
        bio: "Editor especializado en videos corporativos y marketing de contenidos.",
        userType: "editor",
        yearsOfExperience: 6
      },
      profile: {
        software: [1, 4], // Premiere, After Effects
        editingStyles: [3, 8], // Comercial, Corporativo
        equipment: ["PC personalizado de alta gama", "Monitor 4K", "Micrófono profesional"],
        basicRate: 65,
        mediumRate: 90,
        advancedRate: 140,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
        paymentMethods: ["Transferencia bancaria", "PayPal"],
        experience: "6 años trabajando con empresas tecnológicas y startups. Especializado en videos de marketing, demos de producto y tutoriales.",
        expertise: ["Videos corporativos", "Marketing de contenidos", "Tutoriales", "Demos de producto"]
      },
      portfolio: [
        {
          title: "Video corporativo: Lanzamiento de producto",
          description: "Presentación de nueva plataforma SaaS para empresas",
          videoUrl: "https://vimeo.com/112233445",
          thumbnailUrl: "https://i.vimeocdn.com/video/112233445_640.jpg",
          videoType: "corporativo",
          duration: "3:25",
          order: 1
        }
      ]
    },
    {
      // Perfil 6: Editor de eventos (4 años)
      user: {
        name: "[Prueba] Laura Soto",
        email: "laura.test@latamvideos.com",
        password: "test123",
        country: "MX",
        bio: "Editora especializada en videos de eventos, bodas y celebraciones.",
        userType: "editor",
        yearsOfExperience: 4
      },
      profile: {
        software: [1, 2], // Premiere, Final Cut
        editingStyles: [5, 9], // Cinematic, Wedding/Events
        equipment: ["MacBook Pro", "Cámara Sony A7III", "Estabilizador"],
        basicRate: 50,
        mediumRate: 80,
        advancedRate: 120,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },
        paymentMethods: ["PayPal", "Transferencia bancaria"],
        experience: "4 años documentando eventos sociales y corporativos. Especializada en bodas, celebraciones y conferencias.",
        expertise: ["Bodas", "Eventos sociales", "Conferencias", "Highlights de eventos"]
      },
      portfolio: [
        {
          title: "Wedding Film: Julia & Manuel",
          description: "Highlights de boda en Tulum, México",
          videoUrl: "https://vimeo.com/556677889",
          thumbnailUrl: "https://i.vimeocdn.com/video/556677889_640.jpg",
          videoType: "evento",
          duration: "7:15",
          order: 1
        }
      ]
    },
    {
      // Perfil 7: Editor de contenido educativo (8 años)
      user: {
        name: "[Prueba] Andrés Herrera",
        email: "andres.test@latamvideos.com",
        password: "test123",
        country: "CO",
        bio: "Editor especializado en contenido educativo y cursos online.",
        userType: "editor",
        yearsOfExperience: 8
      },
      profile: {
        software: [1, 4, 6], // Premiere, After Effects, iMovie
        editingStyles: [1, 10], // YouTube, Educational
        equipment: ["iMac 24\"", "Micrófono Blue Yeti", "Pantalla verde"],
        basicRate: 60,
        mediumRate: 85,
        advancedRate: 130,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
        paymentMethods: ["PayPal", "Transferencia bancaria", "Wise"],
        experience: "8 años trabajando con plataformas educativas y creadores de contenido. Especializado en cursos online, tutoriales y videos explicativos.",
        expertise: ["Contenido educativo", "Tutoriales", "Cursos online", "Animaciones explicativas"]
      },
      portfolio: [
        {
          title: "Curso: Introducción a la programación",
          description: "Módulo introductorio para curso de desarrollo web",
          videoUrl: "https://www.youtube.com/watch?v=lmnopqrst",
          thumbnailUrl: "https://i.ytimg.com/vi/lmnopqrst/hqdefault.jpg",
          videoType: "educativo",
          duration: "12:45",
          order: 1
        }
      ]
    },
    {
      // Perfil 8: Editor de deportes (5 años)
      user: {
        name: "[Prueba] Diego Ramírez",
        email: "diego.test@latamvideos.com",
        password: "test123",
        country: "AR",
        bio: "Editor especializado en contenido deportivo y videos de acción.",
        userType: "editor",
        yearsOfExperience: 5
      },
      profile: {
        software: [1, 3, 5], // Premiere, DaVinci, CapCut
        editingStyles: [1, 11], // YouTube, Sports/Action
        equipment: ["PC gaming de alta gama", "Monitor de alta frecuencia", "Tarjeta gráfica potente"],
        basicRate: 55,
        mediumRate: 85,
        advancedRate: 130,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true },
        paymentMethods: ["PayPal", "Transferencia bancaria"],
        experience: "5 años trabajando con equipos deportivos, atletas y eventos. Especializado en videos de deportes, highlights y contenido de acción.",
        expertise: ["Deportes", "Highlights", "Compilaciones", "Videos de acción"]
      },
      portfolio: [
        {
          title: "Highlights: Torneo Nacional Surfing 2023",
          description: "Mejores momentos del campeonato realizado en Mar del Plata",
          videoUrl: "https://www.youtube.com/watch?v=uvwxyz1234",
          thumbnailUrl: "https://i.ytimg.com/vi/uvwxyz1234/hqdefault.jpg",
          videoType: "deportes",
          duration: "5:30",
          order: 1
        }
      ]
    },
    {
      // Perfil 9: Editor de travel (2 años)
      user: {
        name: "[Prueba] Camila Blanco",
        email: "camila.test@latamvideos.com",
        password: "test123",
        country: "UY",
        bio: "Editora de travel videos y contenido de estilo de vida.",
        userType: "editor",
        yearsOfExperience: 2
      },
      profile: {
        software: [1, 6], // Premiere, iMovie
        editingStyles: [1, 12], // YouTube, Travel/Lifestyle
        equipment: ["MacBook Air", "GoPro Hero 10", "Drone DJI Mini 2"],
        basicRate: 35,
        mediumRate: 55,
        advancedRate: 85,
        weeklyAvailability: { mon: true, tue: true, wed: false, thu: true, fri: true, sat: false, sun: false },
        paymentMethods: ["PayPal"],
        experience: "2 años creando contenido para travel bloggers y creadores de contenido. Especializada en vlogs de viaje y estilo de vida.",
        expertise: ["Travel videos", "Vlogs", "Lifestyle", "Contenido de redes sociales"]
      },
      portfolio: [
        {
          title: "Travel Vlog: Descubriendo Uruguay",
          description: "Viaje por la costa uruguaya en temporada baja",
          videoUrl: "https://www.youtube.com/watch?v=zyx9876abc",
          thumbnailUrl: "https://i.ytimg.com/vi/zyx9876abc/hqdefault.jpg",
          videoType: "travel",
          duration: "9:15",
          order: 1
        }
      ]
    },
    {
      // Perfil 10: Editor senior de animación (15 años)
      user: {
        name: "[Prueba] Javier Montero",
        email: "javier.test@latamvideos.com",
        password: "test123",
        country: "CL",
        bio: "Editor y animador con 15 años de experiencia en motion graphics y VFX.",
        userType: "editor",
        yearsOfExperience: 15
      },
      profile: {
        software: [1, 3, 4], // Premiere, DaVinci, After Effects
        editingStyles: [3, 13], // Comercial, Animation/Motion Graphics
        equipment: ["Mac Pro", "Tableta Wacom", "Sistema de almacenamiento NAS", "Monitor calibrado"],
        basicRate: 120,
        mediumRate: 180,
        advancedRate: 250,
        weeklyAvailability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
        paymentMethods: ["Transferencia bancaria", "PayPal", "Crypto"],
        experience: "15 años trabajando con estudios de animación, publicidad y productoras. Especializado en motion graphics, animación 2D y efectos visuales.",
        expertise: ["Motion graphics", "Animación 2D", "VFX", "Comerciales animados"]
      },
      portfolio: [
        {
          title: "Show reel de animación 2023",
          description: "Compilación de proyectos de motion graphics y VFX",
          videoUrl: "https://vimeo.com/445566778",
          thumbnailUrl: "https://i.vimeocdn.com/video/445566778_640.jpg",
          videoType: "animacion",
          duration: "2:45",
          order: 1
        }
      ]
    }
  ];

  // Crear los perfiles
  for (const profileData of testProfiles) {
    try {
      // 1. Crear usuario
      const hashedPassword = await hashPassword(profileData.user.password);
      const userData: InsertUser = {
        ...profileData.user,
        password: hashedPassword
      } as InsertUser;
      
      const user = await storage.createUser(userData);
      console.log(`Usuario creado: ${user.name} (ID: ${user.id})`);
      
      // 2. Crear perfil de editor
      const editorProfileData: InsertEditorProfile = {
        ...profileData.profile,
        userId: user.id
      } as InsertEditorProfile;
      
      const profile = await storage.createEditorProfile(editorProfileData);
      console.log(`Perfil creado: ID ${profile.id} para usuario ID ${user.id}`);
      
      // 3. Crear elementos de portfolio
      for (const portfolioItem of profileData.portfolio) {
        const portfolioData: InsertPortfolioItem = {
          ...portfolioItem,
          editorProfileId: profile.id
        };
        
        const item = await storage.createPortfolioItem(portfolioData);
        console.log(`Portfolio item creado: ${item.title} (ID: ${item.id})`);
      }
      
    } catch (error) {
      console.error(`Error al crear perfil ${profileData.user.name}:`, error);
    }
  }
  
  console.log("Finalizado el proceso de creación de perfiles de prueba.");
}

// Ejecutar la función de seed
seedTestProfiles()
  .then(() => {
    console.log("Proceso completado con éxito");
    process.exit(0);
  })
  .catch(error => {
    console.error("Error en el proceso:", error);
    process.exit(1);
  });