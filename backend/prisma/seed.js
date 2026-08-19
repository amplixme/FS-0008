import prisma from "../src/prisma.client.js";
import bcrypt from "bcrypt";

// Helper para calcular fechas distribuidas en los últimos 30 días
function getPostDate(index, totalPosts) {
  const baseDate = new Date("2026-08-19T11:00:00Z");
  // Distribuye los posts desde hace 30 días hasta hoy
  const daysAgo = Math.floor(
    ((totalPosts - 1 - index) / (totalPosts - 1)) * 30,
  );
  const date = new Date(baseDate);
  date.setDate(date.getDate() - daysAgo);
  // Variación en la hora para que no se publiquen todos al mismo minuto
  date.setHours(8 + (index % 12), (index * 7) % 60, 0, 0);
  return date;
}

async function main() {
  const categories = [
    { name: "Tecnología", slug: "tecnologia" },
    { name: "Diseño", slug: "diseno" },
    { name: "Programación", slug: "programacion" },
    { name: "DevOps", slug: "devops" },
    { name: "Opinión", slug: "opinion" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: { slug: category.slug },
      create: {
        name: category.name,
        slug: category.slug,
      },
    });
  }

  const saltRounds = 10;
  const defaultPassword = await bcrypt.hash("password123", saltRounds);

  // 8 Usuarios demo con avatar y bio
  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {
      name: "Flor Méndez",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      bio: "Tech Lead y entusiasta del código limpio. Explorando IA aplicada al desarrollo web.",
      password: defaultPassword,
      role: "ADMIN",
    },
    create: {
      email: "admin@admin.com",
      name: "Flor Méndez",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      bio: "Tech Lead y entusiasta del código limpio. Explorando IA aplicada al desarrollo web.",
      password: defaultPassword,
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "user@user.com" },
    update: {
      name: "Martín Rodríguez",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Desarrollador backend apasionado por la arquitectura de software y TypeScript.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user@user.com",
      name: "Martín Rodríguez",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Desarrollador backend apasionado por la arquitectura de software y TypeScript.",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@user.com" },
    update: {
      name: "Sofía Fernández",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Diseñadora de producto enfocada en accesibilidad, sistemas de diseño y UX.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user2@user.com",
      name: "Sofía Fernández",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Diseñadora de producto enfocada en accesibilidad, sistemas de diseño y UX.",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "user3@user.com" },
    update: {
      name: "Diego Morales",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Ingeniero DevOps y cloud. Automatizando infraestructuras y pipelines CI/CD.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user3@user.com",
      name: "Diego Morales",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Ingeniero DevOps y cloud. Automatizando infraestructuras y pipelines CI/CD.",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: "user4@user.com" },
    update: {
      name: "Lucía Gómez",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      bio: "Frontend Developer & contributor open-source. Fan de React y CSS moderno.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user4@user.com",
      name: "Lucía Gómez",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      bio: "Frontend Developer & contributor open-source. Fan de React y CSS moderno.",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user5 = await prisma.user.upsert({
    where: { email: "user5@user.com" },
    update: {
      name: "Carlos Benítez",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      bio: "Especialista en ciberseguridad, testing y buenas prácticas en APIs.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user5@user.com",
      name: "Carlos Benítez",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      bio: "Especialista en ciberseguridad, testing y buenas prácticas en APIs.",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user6 = await prisma.user.upsert({
    where: { email: "user6@user.com" },
    update: {
      name: "Valentina Torres",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Product Manager con perfil técnico. Interesada en métricas y agilidad real.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user6@user.com",
      name: "Valentina Torres",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Product Manager con perfil técnico. Interesada en métricas y agilidad real.",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user7 = await prisma.user.upsert({
    where: { email: "user7@user.com" },
    update: {
      name: "Mateo Silva",
      avatarUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      bio: "Desarrollador Full Stack Jr. Aprendiendo nuevas tecnologías y compartiendo el proceso.",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user7@user.com",
      name: "Mateo Silva",
      avatarUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      bio: "Desarrollador Full Stack Jr. Aprendiendo nuevas tecnologías y compartiendo el proceso.",
      password: defaultPassword,
      role: "USER",
    },
  });

  // 40 Publicaciones demo
  const postSeeds = [
    {
      title: "Cómo la inteligencia artificial está cambiando el desarrollo web",
      content:
        "La inteligencia artificial ya forma parte de muchas herramientas que usamos para programar, documentar y revisar código. Su mayor valor aparece cuando complementa el criterio del equipo en lugar de reemplazarlo.\n\nAdoptarla de manera responsable implica revisar sus resultados, proteger los datos sensibles y mantener estándares claros de calidad.",
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Tecnología", "Programación"],
    },
    {
      title: "Cinco hábitos que mejoran la calidad del código",
      content:
        "Nombrar con claridad, escribir funciones pequeñas y revisar los casos límite reduce buena parte de los errores cotidianos. También ayuda mantener cambios acotados para que las revisiones sean más simples.\n\nLa calidad no depende de una única herramienta, sino de hábitos sostenidos y acuerdos compartidos por todo el equipo.",
      coverImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Diseñar interfaces accesibles desde el primer boceto",
      content:
        "La accesibilidad debe considerarse desde las primeras decisiones de diseño. El contraste, la jerarquía visual y la navegación mediante teclado influyen directamente en la experiencia final.\n\nIncluir estas prácticas desde el comienzo resulta más efectivo que intentar corregir todos los problemas cuando el producto ya está terminado.",
      coverImage:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño", "Tecnología"],
    },
    {
      title: "Primeros pasos para automatizar despliegues",
      content:
        "Un flujo de integración continua puede comenzar con tareas sencillas: instalar dependencias, ejecutar pruebas y verificar que la aplicación compile. Esa base ya evita muchos errores manuales.\n\nA medida que el equipo gana confianza, el proceso puede incorporar despliegues automáticos, controles de seguridad y estrategias de reversión.",
      coverImage:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title: "Qué aprendí durante mi primer año como desarrollador",
      content:
        "Durante el primer año aprendí que pedir ayuda a tiempo es una habilidad profesional, no una señal de debilidad. Entender el problema antes de escribir código también evita muchas horas de trabajo innecesario.\n\nLa práctica constante, las revisiones respetuosas y una buena documentación aceleraron mi aprendizaje más que cualquier atajo.",
      coverImage:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
      authorId: user7.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Componentes reutilizables sin complicar el proyecto",
      content:
        "Un componente es verdaderamente reutilizable cuando tiene una responsabilidad clara y una interfaz fácil de entender. Agregar demasiadas opciones suele volverlo más difícil de mantener.\n\nConviene extraer patrones después de observar usos reales y evitar abstracciones creadas únicamente para necesidades hipotéticas.",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Programación", "Diseño"],
    },
    {
      title: "Monitoreo: saber qué ocurre antes de que llegue un reporte",
      content:
        "Los registros, las métricas y las alertas permiten comprender el comportamiento de una aplicación en producción. Sin observabilidad, resolver una incidencia se convierte en una búsqueda basada en suposiciones.\n\nUna buena alerta debe ser accionable y aportar contexto suficiente para que el equipo pueda responder con rapidez.",
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Cómo preparar una revisión de código útil",
      content:
        "Una revisión efectiva se concentra en el comportamiento, la claridad y los riesgos del cambio. Los comentarios deben explicar el motivo de la observación y proponer una dirección concreta.\n\nSeparar preferencias personales de problemas reales ayuda a mantener conversaciones técnicas más productivas.",
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Programación", "Opinión"],
    },
    {
      title: "La importancia del espacio en blanco en una interfaz",
      content:
        "El espacio en blanco no es espacio desperdiciado. Sirve para agrupar información, dirigir la atención y reducir la carga cognitiva de quienes utilizan el producto.\n\nCuando cada elemento compite por protagonismo, la interfaz pierde jerarquía y se vuelve más difícil de recorrer.",
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño"],
    },
    {
      title: "Variables de entorno y secretos: una guía práctica",
      content:
        "Las credenciales y claves privadas nunca deberían quedar dentro del código fuente. Las variables de entorno permiten separar la configuración sensible de la implementación.\n\nTambién es importante rotar cualquier secreto expuesto, limitar sus permisos y mantener archivos como .env fuera del control de versiones.",
      coverImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Elegir una especialización sin cerrar otras puertas",
      content:
        "Especializarse ayuda a profundizar conocimientos, pero no obliga a ignorar el resto del proceso de desarrollo. Comprender cómo colaboran diseño, frontend, backend e infraestructura mejora las decisiones técnicas.\n\nLa especialización puede cambiar con el tiempo; lo importante es desarrollar fundamentos que sigan siendo útiles en distintos contextos.",
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Pruebas automatizadas que aportan confianza",
      content:
        "Las mejores pruebas verifican comportamientos importantes y fallan por motivos comprensibles. Una gran cantidad de pruebas frágiles puede generar más ruido que seguridad.\n\nConviene priorizar reglas de negocio, casos límite e integraciones críticas, manteniendo cada prueba independiente y fácil de leer.",
      coverImage:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Contenedores para entornos de desarrollo consistentes",
      content:
        "Los contenedores ayudan a que todas las personas del equipo trabajen con versiones y servicios equivalentes. Esto reduce diferencias entre máquinas y simplifica la incorporación de nuevos integrantes.\n\nNo obstante, su configuración debe mantenerse clara y documentada para evitar que la herramienta oculte problemas importantes.",
      coverImage:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title: "Prototipos que ayudan a tomar mejores decisiones",
      content:
        "Un prototipo permite validar recorridos y supuestos antes de invertir tiempo en una implementación completa. Su nivel de detalle debe responder a la pregunta que el equipo intenta resolver.\n\nProbar temprano con usuarios revela confusiones que suelen pasar inadvertidas durante las conversaciones internas.",
      coverImage:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Diseño", "Opinión"],
    },
    {
      title: "Documentación técnica que el equipo realmente utiliza",
      content:
        "La documentación más útil explica decisiones, requisitos y procedimientos que no resultan evidentes al leer el código. Debe estar cerca del proyecto y actualizarse junto con los cambios relevantes.\n\nUn documento breve y vigente suele aportar más valor que una guía extensa que nadie puede mantener.",
      coverImage:
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Estrategias de caching para APIs de alto rendimiento",
      content:
        "Implementar capas de caché en memoria con herramientas como Redis puede reducir el tiempo de respuesta en un 80%. La clave reside en definir políticas de invalidación predecibles.\n\nNo todas las rutas necesitan almacenamiento en caché: priorizar endpoints con lecturas frecuentes y datos poco volátiles garantiza un uso óptimo de recursos.",
      coverImage:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Tecnología", "Programación"],
    },
    {
      title: "Microservicios vs Monolitos: evaluando el trade-off",
      content:
        "Distribuir un sistema antes de consolidar el dominio del negocio agrega complejidad operativa, problemas de red y desafíos de consistencia transaccional.\n\nUn monolito modular bien estructurado suele ser la mejor opción para la mayoría de los proyectos en etapas tempranas e intermedias.",
      coverImage:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Opinión"],
    },
    {
      title: "Sistemas de diseño: construyendo consistencia a escala",
      content:
        "Un sistema de diseño no es solo un conjunto de componentes en Figma o React; es un lenguaje común entre diseñadores y desarrolladores.\n\nEstandarizar tokens de diseño (espaciado, color, tipografía) reduce la deuda técnica en el frontend y agiliza notablemente los tiempos de entrega.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Diseño", "Programación"],
    },
    {
      title:
        "Seguridad en APIs REST: autenticación, autorización y rate limiting",
      content:
        "Asegurar un backend requiere aplicar defensa en profundidad: tokens JWT con tiempos de expiración cortos, validación estricta de esquemas y limitadores de tasa de peticiones.\n\nNunca confíes en los datos enviados por el cliente; sanitizar y validar en el servidor es la primera línea de protección.",
      coverImage:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title: "El auge de TypeScript y la seguridad de tipos en el backend",
      content:
        "La tipificación estática reduce drásticamente las fallas en tiempo de ejecución al interactuar con bases de datos y servicios externos.\n\nIntegrar TypeScript con herramientas modernas como Prisma o Zod asegura coherencia de datos de extremo a extremo en la aplicación.",
      coverImage:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Optimización de consultas SQL e indexación estratégica",
      content:
        "Crear índices sin analizar los patrones de lectura puede ralentizar las escrituras y consumir memoria innecesaria. El uso de EXPLAIN ANALYZE permite identificar cuellos de botella reales en la base de datos.",
      coverImage:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Arquitectura hexagonal en aplicaciones Node.js",
      content:
        "Desacoplar la lógica de dominio de los adaptadores externos (HTTP, bases de datos, colas) facilita el mantenimiento y permite cambiar librerías sin reescribir las reglas de negocio centrales.",
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Estrategias de branching: Trunk-based vs GitFlow",
      content:
        "Mantener ramas de larga duración retrasa la integración y genera conflictos complejos. Trunk-based development promueve fusiones frecuentes acompañadas de feature flags para reducir riesgos.",
      coverImage:
        "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Opinión"],
    },
    {
      title: "Gestión de estado global: cuándo usar Zustand o Context API",
      content:
        "Abusar de contextos globales en React provoca renderizados innecesarios en componentes no relacionados. Herramientas ligeras basadas en selectores resuelven este problema sin la complejidad de Redux clásico.",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Microfrontends: cuándo aportan valor real y cuándo complejidad",
      content:
        "Dividir la interfaz en múltiples aplicaciones independientes solo tiene sentido con equipos grandes que necesitan desplegar sin coordinación. En proyectos medianos suele añadir fricción excesiva.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Opinión", "Tecnología"],
    },
    {
      title:
        "WebSockets vs Server-Sent Events para comunicación en tiempo real",
      content:
        "Si tu aplicación solo necesita enviar actualizaciones unidireccionales desde el servidor al cliente (como notificaciones o feeds), SSE es más simple de implementar y funciona sobre HTTP estándar.",
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Principios SOLID aplicados con ejemplos cotidianos",
      content:
        "Los principios de diseño orientado a objetos no son reglas dogmáticas, sino guías para evitar el acoplamiento rígido. Entender la responsabilidad única evita que las clases crezcan sin control.",
      coverImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Modo oscuro: consideraciones de contraste y tokens de color",
      content:
        "Diseñar un tema oscuro no consiste en invertir los colores a negro puro (#000000). Utilizar escalas de gris oscuro y ajustar la saturación de los colores primarios protege la vista y mantiene la legibilidad.",
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño"],
    },
    {
      title: "Infraestructura como código con Terraform",
      content:
        "Declarar servidores, redes y bases de datos en código permite versionar la infraestructura, auditar cambios y recrear entornos de pruebas idénticos en minutos.",
      coverImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Buenas prácticas para escribir mensajes de commit legibles",
      content:
        "Un buen historial de Git ahorra horas de depuración con git bisect. Usar Conventional Commits (feat, fix, refactor) ayuda tanto a los revisores humanos como a las herramientas de changelog automático.",
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      authorId: user7.id,
      categoryNames: ["Programación", "Opinión"],
    },
    {
      title: "Cómo prevenir el agotamiento profesional en equipos de software",
      content:
        "Las fechas límite irreales y la falta de desconexión impactan directamente en la retención y en la calidad técnica. Fomentar la comunicación asíncrona y respetar los descansos es clave.",
      coverImage:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Opinión"],
    },
    {
      title: "Manejo centralizado de errores en Node.js y Express",
      content:
        "Interceptar errores en un middleware global y estandarizar la respuesta HTTP en formato JSON evita que se filtren stack traces sensibles a los clientes y simplifica el registro en logs.",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Autenticación moderna con OAuth 2.0 y OpenID Connect",
      content:
        "Delegar la identidad a proveedores consolidados (Google, GitHub) mejora la experiencia de usuario y reduce la responsabilidad de almacenar y custodiar contraseñas locales.",
      coverImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Optimización de Core Web Vitals en sitios web modernos",
      content:
        "Métricas como LCP, CLS e INP influyen directamente en la retención y el posicionamiento SEO. Diferir scripts no críticos y optimizar fuentes web son acciones de alto impacto.",
      coverImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Diseño", "Tecnología"],
    },
    {
      title: "Tipografía responsiva y jerarquía de lectura",
      content:
        "El uso de unidades relativas como rem y funciones como clamp() en CSS permite adaptar el tamaño de texto de forma fluida sin saturar la hoja de estilos con docenas de media queries.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño"],
    },
    {
      title: "Serverless: casos de uso adecuados y costos ocultos",
      content:
        "Las funciones serverless son excelentes para cargas de trabajo esporádicas y eventos asíncronos. Para APIs de alto tráfico constante, los contenedores gestionados suelen ser más predecibles en costo.",
      coverImage:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Qué evaluar antes de iniciar una refactorización mayor",
      content:
        "Reescribir un módulo completo desde cero casi siempre introduce nuevos errores. Refactorizar paso a paso mientras se mantiene una suite de pruebas verde asegura progreso continuo sin frenar el producto.",
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Programación", "Opinión"],
    },
    {
      title: "Cómo estructurar el feedback técnico en pull requests",
      content:
        "Etiquetar los comentarios como bloqueantes, sugerencias o preguntas ayuda al autor a priorizar cambios sin asumir que cada observación requiere una reescritura obligatoria.",
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Opinión"],
    },
    {
      title: "Logging estructurado con formato JSON en producción",
      content:
        "Generar logs como texto plano dificulta su análisis en plataformas como Datadog o Grafana Loki. Utilizar formato JSON con metadata contextual (correlationId, userId) acelera el diagnóstico de incidentes.",
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title:
        "Habilidades clave en la transición de desarrollador junior a senior",
      content:
        "El crecimiento profesional no consiste únicamente en conocer más frameworks. La capacidad de evaluar compensaciones técnicas, comunicar decisiones con claridad y desbloquear a compañeros es lo que define la seniority.",
      coverImage:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
      authorId: user7.id,
      categoryNames: ["Opinión", "Tecnología"],
    },
  ];

  const demoUserIds = [
    admin.id,
    user1.id,
    user2.id,
    user3.id,
    user4.id,
    user5.id,
    user6.id,
    user7.id,
  ];

  const legacySeedTitles = [
    "El futuro de la Programación",
    "Mejores prácticas en DevOps",
  ];
  const demoPostTitles = postSeeds.map((postSeed) => postSeed.title);

  await prisma.post.deleteMany({
    where: {
      authorId: { in: demoUserIds },
      title: {
        in: [...demoPostTitles, ...legacySeedTitles],
      },
    },
  });

  const createdPosts = [];

  for (let index = 0; index < postSeeds.length; index += 1) {
    const postSeed = postSeeds[index];
    const postCreatedAt = getPostDate(index, postSeeds.length);

    const post = await prisma.post.create({
      data: {
        title: postSeed.title,
        content: postSeed.content,
        coverImage: postSeed.coverImage,
        published: true,
        createdAt: postCreatedAt,
        updatedAt: postCreatedAt,
        authorId: postSeed.authorId,
        categories: {
          connect: postSeed.categoryNames.map((name) => ({ name })),
        },
      },
    });

    createdPosts.push({ ...post, calculatedCreatedAt: postCreatedAt });
  }

  // 120 Comentarios distribuidos de a 3 por post
  const commentSeeds = [
    "Muy buen punto de partida para entender el tema.",
    "Me gustó que el artículo incluya recomendaciones concretas.",
    "Voy a aplicar estas ideas en el próximo proyecto del equipo.",
    "La explicación es clara incluso para quienes recién comienzan.",
    "Sería interesante profundizar este tema en otra publicación.",
    "Coincido en que los hábitos del equipo son fundamentales.",
    "Este enfoque nos habría ahorrado varios problemas recientes.",
    "Gracias por explicar también los riesgos y no solo las ventajas.",
    "La parte sobre accesibilidad me pareció especialmente importante.",
    "Buen recordatorio para revisar nuestras decisiones actuales.",
    "Me llevo varias ideas para conversar con el resto del equipo.",
    "El ejemplo se parece mucho a situaciones que vemos a diario.",
    "Totalmente de acuerdo con mantener los cambios pequeños.",
    "La documentación suele subestimarse hasta que aparece una incidencia.",
    "Excelente resumen, directo y fácil de llevar a la práctica.",
    "Me interesa probar esta estrategia en nuestro flujo de trabajo.",
    "La observabilidad debería planificarse desde el inicio.",
    "Es una buena explicación de por qué menos opciones pueden ser mejores.",
    "Agregar pruebas sobre casos límite nos dio mucha más confianza.",
    "La rotación de secretos es un hábito que todos deberíamos incorporar.",
    "Muy útil la diferencia entre una preferencia y un problema real.",
    "Los prototipos tempranos nos ayudaron a evitar cambios costosos.",
    "La experiencia mejora mucho cuando existe una jerarquía clara.",
    "Compartir aprendizajes ayuda muchísimo a quienes recién empiezan.",
    "Un entorno consistente hace más sencillo colaborar y revisar errores.",
    "Me gustaría ver un ejemplo completo de integración continua.",
    "La combinación de fundamentos y especialización tiene mucho sentido.",
    "Buen contenido para compartir en una reunión de equipo.",
    "La recomendación sobre validar resultados de IA es esencial.",
    "Quedó muy claro qué acciones podemos empezar a aplicar hoy.",
    "El impacto del caché en la latencia es impresionante.",
    "Siempre es bueno recordar la importancia del rate limiting.",
    "Trabajar con tipado estricto ahorra muchísimos bugs silenciosos.",
    "La modularidad en monolitos está muy infravalorada hoy en día.",
    "Gran análisis de las ventajas y desventajas arquitectónicas.",
    "Los design tokens facilitan mucho la sincronización con diseño.",
    "Totalmente de acuerdo con no optimizar prematuramente.",
    "Un artículo muy completo y al grano.",
    "¿Tienen pensado agregar métricas de rendimiento en producción?",
    "Me sirvió mucho la referencia técnica que mencionaron.",
    "Lo comparto inmediatamente con mis compañeros de proyecto.",
    "La seguridad a nivel de esquema evita dolores de cabeza graves.",
    "Increíble ver cómo influyen los detalles visuales en la UX.",
    "Buena síntesis sobre patrones de testing limpios.",
    "El manejo de configuración externa debería ser estándar en todo stack.",
    "Conciso, técnico y bien estructurado.",
    "Me aclaró varias dudas que venía arrastrando con Docker.",
    "Clave el foco en resolver problemas de negocio primero.",
    "La gestión de secretos suele pasarse por alto en etapas iniciales.",
    "Excelente lectura para arrancar la semana técnica.",
    "Un buen paso a paso para mejorar la mantenibilidad del código.",
    "La simplificación de dependencias es un hábito que rinde a largo plazo.",
    "Interesante postura sobre las abstracciones tempranas.",
    "Gran enfoque sobre la accesibilidad como requerimiento funcional.",
    "Los ejemplos son muy representativos del trabajo diario.",
    "Me gustaría ver una segunda parte orientada a casos complejos.",
    "Muy claro el desglose de buenas prácticas en la API.",
    "Tener contratos de datos claros acelera mucho el desarrollo frontend.",
    "Un recurso indispensable para tener a mano en las revisiones.",
    "Quedó muy sólida la explicación de punta a punta.",
    "EXPLAIN ANALYZE me salvó de un colapso en producción la semana pasada.",
    "Los índices compuestos marcan una diferencia abismal en queries complejas.",
    "Excelente consejo el de no abusar de los índices innecesarios.",
    "La arquitectura hexagonal aporta mucha paz mental en refactorizaciones.",
    "Separar puertos y adaptadores hace los tests unitarios super limpios.",
    "Costó adoptarlo al inicio pero valió 100% la pena.",
    "Trunk-based development combinado con feature flags cambió la dinámica del team.",
    "Evitar merge conflicts gigantescos fue un alivio enorme.",
    "GitFlow funciona para releases tradicionales, pero para SaaS continuo esto es mejor.",
    "Zustand simplificó nuestro store un 80% comparado con Redux.",
    "Context API es genial, pero hay que tener mucho cuidado con los re-renders.",
    "Muy buen resumen de cuándo separar el estado local del global.",
    "La complejidad operativa de microfrontends casi nunca se justifica en equipos chicos.",
    "Gran análisis de los trade-offs de arquitectura frontend.",
    "Totalmente, nosotros volvimos a una SPA unificada y ganamos velocidad.",
    "SSE es la opción más limpia cuando no necesitas bidireccionalidad.",
    "Nos ahorró configurar toda una capa de WebSockets pesada.",
    "Súper útil para paneles de eventos y notificaciones push.",
    "La responsabilidad única es el principio más difícil de mantener pero el más útil.",
    "Explicado de forma accesible sin caer en academicismos.",
    "Ejemplos muy claros de aplicar en el día a día.",
    "El detalle de evitar el negro puro (#000000) en modo oscuro es clave.",
    "La fatiga visual disminuye muchísimo con contrastes bien calibrados.",
    "Excelente guía para estandarizar paletas en Figma.",
    "Terraform con módulos reutilizables acelera el provisioning de nuevos clientes.",
    "Poder versionar la infra en Git da muchísima tranquilidad.",
    "Gran recordatorio de nunca modificar recursos manualmente en consola cloud.",
    "Conventional Commits hace que los changelogs automáticos funcionen solos.",
    "Los commits atómicos facilitan encontrar bugs con git bisect.",
    "Regla de oro: un commit debe contar una historia coherente.",
    "El trabajo asíncrono reduce la ansiedad de respuestas inmediatas.",
    "Cuidar los tiempos de descanso impacta directo en la calidad del software.",
    "Excelente reflexión sobre la cultura de los equipos remotos.",
    "Centralizar los errores en un middleware evita fugas de información.",
    "Devolver códigos HTTP coherentes (400 vs 422) ayuda muchísimo al frontend.",
    "Un patrón básico que todos los proyectos de Node deberían implementar.",
    "Delegar el login a OAuth nos ahorró semanas de desarrollo de seguridad.",
    "El flujo PKCE es fundamental para clientes SPA y móviles.",
    "Muy claro el desglose de tokens de acceso vs tokens de identidad.",
    "Optimizar las fuentes y diferir scripts bajó nuestro LCP en 1.5s.",
    "Core Web Vitals no es solo SEO, es conversión directa.",
    "Gran enfoque en medir la experiencia real de usuario.",
    "El uso de clamp() para tipografía fluida simplifica una barbaridad el CSS.",
    "Menos media queries y un diseño mucho más natural en tablets.",
    "Directo y muy fácil de aplicar en cualquier proyecto web.",
    "Las cold starts en serverless pueden ser un dolor de cabeza si no se consideran.",
    "Muy buen análisis de costos cuando la carga es constante.",
    "Serverless para lambdas de background processing es insuperable.",
    "Las reescrituras totales casi siempre terminan en fracaso o retrasos.",
    "Refactorizar bajo una red de seguridad de tests es el único camino seguro.",
    "Gran consejo para convencer a producto de hacer cambios incrementales.",
    "Separar comentarios de bloqueo vs sugerencias agiliza los merges.",
    "El tono en los code reviews define la cultura técnica del equipo.",
    "Implementamos prefijos de comentarios y las discusiones mejoraron un montón.",
    "Los logs estructurados en JSON facilitan crear dashboards en Grafana.",
    "El correlationId es indispensable para rastrear requests entre servicios.",
    "Básico para cualquier aplicación que pretenda escalar a producción.",
    "La empatía y la comunicación clara distinguen a un buen referente técnico.",
    "Saber decir 'no' con fundamentos de negocio es una gran habilidad senior.",
    "Gran artículo para inspirar a quienes inician su carrera.",
  ];

  const commentAuthors = [
    admin,
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
  ];
  const COMMENTS_PER_POST = 3;

  for (let postIndex = 0; postIndex < createdPosts.length; postIndex += 1) {
    const post = createdPosts[postIndex];

    for (let offset = 0; offset < COMMENTS_PER_POST; offset += 1) {
      const commentIndex = postIndex * COMMENTS_PER_POST + offset;
      const authorIndex = (postIndex + offset + 1) % commentAuthors.length;

      // El comentario se crea entre 1 y 6 horas después de publicado el post
      const commentCreatedAt = new Date(
        post.calculatedCreatedAt.getTime() + (offset + 1) * 2 * 60 * 60 * 1000,
      );

      await prisma.comment.create({
        data: {
          content: commentSeeds[commentIndex],
          postId: post.id,
          authorId: commentAuthors[authorIndex].id,
          createdAt: commentCreatedAt,
          updatedAt: commentCreatedAt,
        },
      });
    }
  }

  console.log("Seed completado correctamente:");
  console.log("- 8 usuarios demo con avatar y bio: 1 ADMIN y 7 USER");
  console.log(`- ${categories.length} categorías`);
  console.log(
    `- ${createdPosts.length} posts distribuidos entre el 20/07/2026 y el 19/08/2026`,
  );
  console.log(
    `- ${createdPosts.length * COMMENTS_PER_POST} comentarios con fechas posteriores a cada post`,
  );
  console.log("- Contraseña de las cuentas demo: password123");
}

main()
  .catch((error) => {
    console.error("Error al ejecutar el seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
