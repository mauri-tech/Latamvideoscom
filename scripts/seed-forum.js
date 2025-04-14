/**
 * Script para crear categorías y temas de prueba en el foro
 */

import { pool } from '../server/db.js';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import { neonConfig } from '@neondatabase/serverless';
import { hashPassword } from './utils.js';

neonConfig.webSocketConstructor = ws;

// Importar esquemas necesarios
import * as schema from '../shared/schema.js';
const { users, forumCategories, forumTopics, forumPosts } = schema;

// Configuración de la base de datos
const db = drizzle(pool);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Función principal que ejecuta el sembrado de datos
 */
async function seedForum() {
  console.log('Iniciando sembrado de datos del foro...');

  try {
    // 1. Crear categorías del foro
    const categories = [
      {
        name: 'Edición de Video',
        description: 'Discusiones sobre técnicas, herramientas y consejos para edición de video profesional.',
        slug: 'edicion-de-video',
        iconName: 'video',
        order: 1
      },
      {
        name: 'Filmación y Cámaras',
        description: 'Todo sobre equipos, técnicas de filmación y consejos para videógrafos.',
        slug: 'filmacion-y-camaras',
        iconName: 'camera',
        order: 2
      },
      {
        name: 'Audio y Sonido',
        description: 'Discusiones sobre grabación de audio, mezcla de sonido y efectos para producciones de video.',
        slug: 'audio-y-sonido',
        iconName: 'music',
        order: 3
      },
      {
        name: 'Efectos Visuales',
        description: 'Compartir técnicas, tutoriales y discusiones sobre VFX y motion graphics.',
        slug: 'efectos-visuales',
        iconName: 'sparkles',
        order: 4
      },
      {
        name: 'Networking y Oportunidades',
        description: 'Ofertas de trabajo, colaboraciones y networking para profesionales de video en Latinoamérica.',
        slug: 'networking-y-oportunidades',
        iconName: 'briefcase',
        order: 5
      }
    ];

    // Buscar categorías existentes para no duplicar
    const existingCategories = await db.select().from(forumCategories);
    const existingCategorySlugs = existingCategories.map(cat => cat.slug);

    // Filtrar solo las categorías que no existen aún
    const categoriesToCreate = categories.filter(cat => !existingCategorySlugs.includes(cat.slug));

    // Insertar categorías
    if (categoriesToCreate.length > 0) {
      console.log(`Creando ${categoriesToCreate.length} categorías...`);
      await db.insert(forumCategories).values(categoriesToCreate);
    } else {
      console.log('Todas las categorías ya existen.');
    }

    // 2. Obtener usuario para crear temas
    const [admin] = await db.select().from(users).where({ email: 'admin@latamvideos.com' });
    let authorId;

    if (admin) {
      authorId = admin.id;
    } else {
      // Crear usuario admin si no existe
      const [newAdmin] = await db.insert(users).values({
        name: 'Administrador',
        email: 'admin@latamvideos.com',
        password: await hashPassword('admin123'),
        userType: 'editor'
      }).returning();
      authorId = newAdmin.id;
    }

    console.log(`Usando usuario con ID ${authorId} como autor.`);

    // 3. Crear temas de prueba
    // Primero obtener las categorías recién creadas
    const allCategories = await db.select().from(forumCategories);
    
    // Preparar temas de prueba
    const testTopics = [
      {
        title: 'Test: ¿Cuál es el mejor software para edición de video en 2025?',
        content: 'Estoy comenzando en la edición de video profesional y me gustaría saber qué software recomiendan los profesionales en 2025. ¿Adobe Premiere sigue siendo el estándar o hay mejores alternativas? ¿Qué opinan de DaVinci Resolve y Final Cut Pro?',
        slug: 'test-cual-es-el-mejor-software-para-edicion-de-video-en-2025',
        categoryId: allCategories.find(c => c.slug === 'edicion-de-video').id,
        authorId: authorId,
        isPinned: true,
        isClosed: false,
        viewCount: 120
      },
      {
        title: 'Test: Consejos para grabar con luz natural en exteriores',
        content: 'Hola comunidad, tengo un proyecto donde necesito grabar varias escenas en exteriores dependiendo solo de luz natural. ¿Qué consejos pueden darme para lograr una buena exposición y colores consistentes a lo largo del día?',
        slug: 'test-consejos-para-grabar-con-luz-natural-en-exteriores',
        categoryId: allCategories.find(c => c.slug === 'filmacion-y-camaras').id,
        authorId: authorId,
        isPinned: false,
        isClosed: false,
        viewCount: 89
      },
      {
        title: 'Test: ¿Cómo cobrar correctamente por servicios de edición en Latinoamérica?',
        content: 'Quiero establecer un precio justo para mis servicios de edición de video, pero encuentro mucha variación en el mercado latinoamericano. ¿Alguien podría compartir sus experiencias sobre cómo estructurar sus tarifas según complejidad y tiempo? ¿Cómo manejan los pagos internacionales?',
        slug: 'test-como-cobrar-correctamente-por-servicios-de-edicion-en-latinoamerica',
        categoryId: allCategories.find(c => c.slug === 'networking-y-oportunidades').id,
        authorId: authorId,
        isPinned: false,
        isClosed: false,
        viewCount: 215
      },
      {
        title: 'Test: Problemas comunes de audio en producciones de bajo presupuesto',
        content: 'En mi experiencia, el audio suele ser uno de los aspectos más descuidados en producciones con presupuesto limitado. ¿Cuáles son los errores más comunes y cómo solucionarlos? Comparto mi lista inicial: 1) Ruido de fondo, 2) Distorsión por niveles incorrectos, 3) Eco por mala ubicación de micrófonos...',
        slug: 'test-problemas-comunes-de-audio-en-producciones-de-bajo-presupuesto',
        categoryId: allCategories.find(c => c.slug === 'audio-y-sonido').id,
        authorId: authorId,
        isPinned: false,
        isClosed: false,
        viewCount: 152
      },
      {
        title: 'Test: Recursos gratis para efectos visuales en After Effects',
        content: 'Estoy armando una colección de recursos gratuitos para After Effects que pueden ayudar a colegas con presupuesto limitado. ¿Qué plugins, presets o packs de efectos gratuitos recomiendan? Empiezo con algunos: 1) Plugin Saber para efectos de luz, 2) Magic Bullet Looks edición gratuita, 3) Plantillas de Motion Array...',
        slug: 'test-recursos-gratis-para-efectos-visuales-en-after-effects',
        categoryId: allCategories.find(c => c.slug === 'efectos-visuales').id,
        authorId: authorId,
        isPinned: false,
        isClosed: false,
        viewCount: 178
      }
    ];

    // Verificar temas existentes para no duplicar
    const existingTopics = await db.select().from(forumTopics);
    const existingTopicSlugs = existingTopics.map(topic => topic.slug);

    // Filtrar solo los temas que no existen aún
    const topicsToCreate = testTopics.filter(topic => !existingTopicSlugs.includes(topic.slug));

    // Insertar temas
    if (topicsToCreate.length > 0) {
      console.log(`Creando ${topicsToCreate.length} temas de prueba...`);
      await db.insert(forumTopics).values(topicsToCreate);
    } else {
      console.log('Todos los temas de prueba ya existen.');
    }

    // 4. Crear algunas respuestas para los temas
    // Obtener todos los temas
    const allTopics = await db.select().from(forumTopics);
    
    // Crear respuestas solo para el primer tema (como ejemplo)
    const firstTopic = allTopics.find(t => t.slug === testTopics[0].slug);
    
    if (firstTopic) {
      // Verificar si ya existen respuestas
      const existingPosts = await db.select().from(forumPosts).where({ topicId: firstTopic.id });
      
      if (existingPosts.length === 0) {
        const testPosts = [
          {
            topicId: firstTopic.id,
            authorId: authorId,
            content: 'En mi experiencia, DaVinci Resolve se ha convertido en el software más completo en 2025. La versión gratuita ofrece casi todas las funcionalidades que necesitas para edición profesional, y la integración de Fusion para VFX y Fairlight para audio lo hace muy poderoso.',
            isAcceptedAnswer: false
          },
          {
            topicId: firstTopic.id,
            authorId: authorId,
            content: 'Yo sigo utilizando Premiere Pro porque se integra perfectamente con After Effects y todo el ecosistema de Adobe. Si ya tienes una suscripción a Creative Cloud, tiene sentido aprovecharlo al máximo. La función de transcripción automática ha mejorado mucho en las últimas versiones.',
            isAcceptedAnswer: false
          },
          {
            topicId: firstTopic.id,
            authorId: authorId,
            content: 'No olvides considerar Final Cut Pro si trabajas principalmente en Mac. Es extremadamente eficiente con los recursos y la renderización es notablemente más rápida que Premiere en el mismo hardware. Sin embargo, tiene una curva de aprendizaje diferente si vienes de otros editores.',
            isAcceptedAnswer: true
          }
        ];
        
        console.log(`Creando ${testPosts.length} respuestas para el tema "${firstTopic.title}"...`);
        await db.insert(forumPosts).values(testPosts);
      } else {
        console.log(`El tema "${firstTopic.title}" ya tiene respuestas.`);
      }
    }

    console.log('¡Sembrado de datos del foro completado con éxito!');
  } catch (error) {
    console.error('Error al sembrar datos del foro:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await pool.end();
  }
}

// Ejecutar el script
seedForum();