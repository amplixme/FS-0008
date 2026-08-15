import prisma from "../src/prisma.client.js";
import bcrypt from "bcrypt";

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

  // Hashear contraseña por defecto para los usuarios
  const saltRounds = 10;
  const defaultPassword = await bcrypt.hash("password123", saltRounds);

  // Crear o actualizar usuarios
  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {
      name: "Flor Méndez",
      password: defaultPassword,
      role: "ADMIN",
    },
    create: {
      email: "admin@admin.com",
      name: "Flor Méndez",
      password: defaultPassword,
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "user@user.com" },
    update: {
      name: "Martín Rodríguez",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user@user.com",
      name: "Martín Rodríguez",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@user.com" },
    update: {
      name: "Sofía Fernández",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user2@user.com",
      name: "Sofía Fernández",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "user3@user.com" },
    update: {
      name: "Diego Morales",
      password: defaultPassword,
      role: "USER",
    },
    create: {
      email: "user3@user.com",
      name: "Diego Morales",
      password: defaultPassword,
      role: "USER",
    },
  });

  // Crear posts
  // Datos de los posts utilizados en demos y presentaciones
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
      authorId: user1.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Componentes reutilizables sin complicar el proyecto",
      content:
        "Un componente es verdaderamente reutilizable cuando tiene una responsabilidad clara y una interfaz fácil de entender. Agregar demasiadas opciones suele volverlo más difícil de mantener.\n\nConviene extraer patrones después de observar usos reales y evitar abstracciones creadas únicamente para necesidades hipotéticas.",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
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
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Elegir una especialización sin cerrar otras puertas",
      content:
        "Especializarse ayuda a profundizar conocimientos, pero no obliga a ignorar el resto del proceso de desarrollo. Comprender cómo colaboran diseño, frontend, backend e infraestructura mejora las decisiones técnicas.\n\nLa especialización puede cambiar con el tiempo; lo importante es desarrollar fundamentos que sigan siendo útiles en distintos contextos.",
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Pruebas automatizadas que aportan confianza",
      content:
        "Las mejores pruebas verifican comportamientos importantes y fallan por motivos comprensibles. Una gran cantidad de pruebas frágiles puede generar más ruido que seguridad.\n\nConviene priorizar reglas de negocio, casos límite e integraciones críticas, manteniendo cada prueba independiente y fácil de leer.",
      coverImage:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
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
      authorId: user2.id,
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
  ];

  const demoUserIds = [admin.id, user1.id, user2.id, user3.id];

  // También se incluyen los títulos del seed anterior para limpiar datos
  // demo antiguos sin afectar publicaciones normales.
  const legacySeedTitles = [
    "El futuro de la Programación",
    "Mejores prácticas en DevOps",
  ];

  const demoPostTitles = postSeeds.map((postSeed) => postSeed.title);

  // Al eliminar un post demo, sus comentarios se eliminan por cascada.
  // No se modifican posts ni comentarios ajenos a estas cuentas y títulos.
  await prisma.post.deleteMany({
    where: {
      authorId: { in: demoUserIds },
      title: {
        in: [...demoPostTitles, ...legacySeedTitles],
      },
    },
  });

  const createdPosts = [];

  for (const postSeed of postSeeds) {
    const post = await prisma.post.create({
      data: {
        title: postSeed.title,
        content: postSeed.content,
        coverImage: postSeed.coverImage,
        published: true,
        authorId: postSeed.authorId,
        categories: {
          connect: postSeed.categoryNames.map((name) => ({ name })),
        },
      },
    });

    createdPosts.push(post);
  }

  // Se crean dos comentarios por cada post: 15 posts x 2 = 30.
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
  ];

  const commentAuthors = [admin, user1, user2, user3];

  if (createdPosts.length !== 15 || commentSeeds.length !== 30) {
    throw new Error(
      "El seed debe contener exactamente 15 posts y 30 comentarios.",
    );
  }

  for (let postIndex = 0; postIndex < createdPosts.length; postIndex += 1) {
    const post = createdPosts[postIndex];

    for (let commentOffset = 0; commentOffset < 2; commentOffset += 1) {
      const commentIndex = postIndex * 2 + commentOffset;
      const authorIndex =
        (postIndex + commentOffset + 1) % commentAuthors.length;

      await prisma.comment.create({
        data: {
          content: commentSeeds[commentIndex],
          postId: post.id,
          authorId: commentAuthors[authorIndex].id,
        },
      });
    }
  }

  console.log("Seed completado correctamente:");
  console.log("- 4 usuarios demo: 1 ADMIN y 3 USER");
  console.log(`- ${categories.length} categorías`);
  console.log(`- ${createdPosts.length} posts con portada`);
  console.log(`- ${commentSeeds.length} comentarios`);
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
