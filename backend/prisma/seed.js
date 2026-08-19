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

  const postSeeds = [
    {
      title: "Cómo la inteligencia artificial está cambiando el desarrollo web",
      content:
        "La inteligencia artificial ha dejado de ser una curiosidad de laboratorio para convertirse en una pieza estructural del flujo diario de ingeniería de software. Desde autocompletadores inteligentes integrados en los editores de código hasta agentes capaces de orquestar refactorizaciones complejas, la interacción del programador con el código está viviendo su transformación más profunda en décadas.\n\nEl cambio más notable ocurre en la velocidad de iteración. Tareas que antes consumían horas —como redactar esqueletos repetitivos de endpoints, generar esquemas de validación iniciales o escribir pruebas unitarias para caminos felices— ahora se resuelven en cuestión de segundos. Esto permite que los equipos concentren su ancho de banda mental en resolver problemas de arquitectura, modelado de datos y diseño de experiencia de usuario.\n\nSin embargo, esta aceleración introduce riesgos críticos si no se gestiona con criterio técnico. La facilidad para generar grandes volúmenes de código puede traducirse en bases de datos infladas de soluciones superficiales o código que funciona por accidente sin que nadie comprenda sus implicaciones en casos límite. La habilidad más demandada hoy no es la velocidad de escritura, sino la capacidad crítica de auditar, refactorizar y verificar la seguridad de lo generado.\n\nPara integrar IA en un equipo de forma responsable es necesario establecer acuerdos claros: auditar manualmente cada dependencia sugerida, evitar que datos sensibles o credenciales de la empresa viajen en los prompts y mantener una suite de pruebas automatizadas independiente que actúe como filtro implacable de calidad. La IA amplifica el criterio del desarrollador; si el criterio es sólido, el resultado es extraordinario, pero si no hay fundamentos, solo escala la deuda técnica.",
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Tecnología", "Programación"],
    },
    {
      title: "Cinco hábitos que mejoran la calidad del código",
      content:
        "La diferencia entre una base de código en la que da gusto trabajar y una que genera temor con cada despliegue no suele estar en las tecnologías utilizadas, sino en los hábitos cotidianos de las personas que la mantienen. La calidad del software es una disciplina de acumulación: pequeños descuidos diarios terminan en parálisis, mientras que buenas prácticas consistentes mantienen el sistema ágil.\n\nEl primer hábito es nombrar las cosas por su intención de negocio y no por su mecánica técnica. Una variable llamada `activeUserSubscription` comunica inmediatamente el propósito del dominio, mientras que `userDataObj2` obliga al lector a rastrear el contexto para entender qué contiene. El código se lee diez veces más de lo que se escribe; optimizar la legibilidad para el lector futuro es la mejor inversión de tiempo.\n\nEl segundo hábito consiste en limitar la responsabilidad de cada función. Cuando una función consulta la base de datos, transforma la información, envía un correo y formatea una respuesta HTTP, cualquier cambio en una de esas áreas puede romper las otras tres. Dividir los procesos en funciones puras y reutilizables hace que probar casos límite sea una tarea sencilla en lugar de un dolor de cabeza.\n\nEl tercer hábito es tratar el manejo de errores como un ciudadano de primera clase. En lugar de atrapar excepciones con bloques vacíos o asumir que las llamadas a servicios externos siempre responderán con éxito, el código robusto anticipa las fallas y define caminos de recuperación claros. Combinar esto con commits atómicos pequeños y la regla del boy scout (dejar el archivo un poco más limpio de lo que estaba) transforma radicalmente la salud técnica de cualquier proyecto a mediano plazo.",
      coverImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Diseñar interfaces accesibles desde el primer boceto",
      content:
        "Históricamente, la accesibilidad web (a11y) se ha tratado como una auditoría de último momento, una lista de verificación que se revisa apuradamente días antes de salir a producción. Esta postura reactiva casi siempre deriva en parches superficiales, código inflado con atributos ARIA innecesarios y una experiencia deficiente para las personas que dependen de tecnologías asistivas.\n\nDiseñar con accesibilidad desde la etapa de bocetos iniciales cambia radicalmente la ecuación. Cuando el equipo de diseño define paletas de colores garantizando de entrada ratios de contraste conformes con las pautas WCAG (4.5:1 para texto normal), se evitan rediseños traumáticos posteriores. De igual forma, planificar la jerarquía visual pensando en la navegación por teclado permite estructurar el documento HTML con etiquetas semánticas claras (`<main>`, `<nav>`, `<article>`, `<header>`) desde el primer día.\n\nEn el plano del desarrollo, la regla dorada es preferir siempre los elementos nativos del navegador por encima de soluciones personalizadas. Un elemento `<button>` nativo ya incluye el foco por teclado, la activación con barra espaciadora y Enter, y el anuncio adecuado para lectores de pantalla; recrear este comportamiento en un `<div>` requiere docenas de líneas de JavaScript propensas a fallas.\n\nLa accesibilidad universal no beneficia únicamente a usuarios con discapacidades permanentes. También mejora sustancialmente la interacción para usuarios en situaciones temporales —como alguien usando el móvil bajo la luz directa del sol, una persona con un brazo inmovilizado o un usuario en una conexión inestable—. Una web accesible es, en última instancia, una web con mejor código y mejor usabilidad para todo el mundo.",
      coverImage:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño", "Tecnología"],
    },
    {
      title: "Primeros pasos para automatizar despliegues",
      content:
        "El ritual del despliegue manual —conectarse por SSH a un servidor remoto, ejecutar `git pull`, compilar assets en vivo y reiniciar procesos manualmente— es una de las mayores fuentes de estrés e incidentes en el desarrollo web. Un solo paso omitido, una variable no configurada o un archivo residual pueden tirar abajo una aplicación entera en el momento de mayor tráfico.\n\nLa automatización de despliegues mediante pipelines de CI/CD (Integración y Entrega Continua) elimina la incertidumbre transformando cada paso en un proceso determinista y auditable. Un pipeline bien configurado actúa como un control de calidad automatizado: cada vez que un desarrollador empuja código a una rama, una máquina limpia clona el proyecto, instala dependencias desde cero, ejecuta formateadores, linters y suites de pruebas.\n\nPara empezar sin abrumarse con configuraciones complejas de Kubernetes o infraestructuras masivas, lo ideal es estructurar el pipeline en tres fases elementales: Validación (linting y tests unitarios), Empaquetado (creación de una imagen Docker versionada o artefacto inmutable) y Despliegue (actualización del entorno de staging o producción).\n\nAdoptar esta práctica cambia por completo la psicología del equipo: el miedo a publicar código desaparece. Los despliegues dejan de ser eventos extraordinarios que requieren guardias nocturnas y se convierten en eventos rutinarios que ocurren múltiples veces al día sin fricción.",
      coverImage:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title: "Qué aprendí durante mi primer año como desarrollador",
      content:
        "El paso del estudio académico o los bootcamps hacia un equipo de ingeniería profesional suele estar acompañado de una fuerte dosis de síndrome del impostor. Durante el primer año, la distancia entre construir aplicaciones personales desde cero y navegar una base de código corporativa con cientos de miles de líneas puede resultar abrumadora.\n\nEl primer gran aprendizaje fue comprender que nadie espera que un desarrollador junior tenga todas las respuestas memorizadas, pero sí se espera una comunicación transparente y proactiva. Aprender a levantar la mano y pedir ayuda de forma estructurada es una habilidad técnica en sí misma. Decir simplemente 'no me funciona' bloquea a los compañeros; explicar 'estoy intentando resolver X, probé el enfoque Y, revisé la documentación Z y obtuve este error puntual' ahorra tiempo valioso y demuestra rigor metodológico.\n\nLa segunda lección fundamental fue aprender a valorar la lectura de código por encima de la escritura. En el mundo laboral, el 80% del tiempo se pasa leyendo implementaciones existentes, comprendiendo decisiones de diseño previas y buscando puntos seguros de extensión. Desarrollar la paciencia de seguir el flujo de datos sin apresurarse a juzgar o reescribir código ajeno es lo que permite integrarse con éxito en proyectos de gran envergadura.\n\nPor último, comprendí que los errores son inevitables y forman parte del crecimiento. Romper un entorno de pruebas o cometer un bug que llega a staging no define tu capacidad técnica; lo que realmente define a un buen profesional es la actitud ante el error: documentar el post-mortem, aprender la causa raíz y crear una prueba automatizada para garantizar que esa falla no vuelva a repetirse jamás.",
      coverImage:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
      authorId: user7.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Componentes reutilizables sin complicar el proyecto",
      content:
        "La reutilización de componentes suele considerarse el objetivo supremo del desarrollo frontend, pero es también una de las trampas más frecuentes de sobreingeniería. Con el afán de no repetir una sola línea de código, muchos equipos crean componentes monstruosos repletos de condiciones booleanas, propiedades opcionales y lógica cruzada que terminan siendo imposibles de mantener.\n\nUn componente se vuelve difícil de sostener cuando intenta resolver demasiados contextos distintos. Si un botón genérico necesita recibir veinte props como `isCardHeader`, `customIconPadding`, `hasShadowAlt` o `variantModeSecondary`, hemos dejado de construir una abstracción limpia y hemos creado un acoplamiento encubierto entre partes no relacionadas de la interfaz.\n\nEl patrón más saludable para evitar este problema es diseñar mediante composición (Compound Components o el uso extensivo de slots y children). En lugar de pasar configuraciones gigantescas a través de propiedades, se divide el componente en piezas atómicas colaborativas (`Card.Header`, `Card.Body`, `Card.Footer`). De este modo, quien consume el componente tiene el control total sobre la estructura sin obligar al componente base a conocer cada detalle visual de la vista.\n\nLa regla empírica es clara: es preferible tolerar un poco de duplicación en las primeras implementaciones antes que apresurarse a crear una abstracción incorrecta. Extrae componentes compartidos únicamente cuando observes tres casos de uso reales y estables en la aplicación.",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Programación", "Diseño"],
    },
    {
      title: "Monitoreo: saber qué ocurre antes de que llegue un reporte",
      content:
        "Operar una plataforma en producción confiando únicamente en que los usuarios reporten los errores a través de soporte técnico es una receta garantizada para el desgaste y la pérdida de clientes. Cuando un usuario se toma el trabajo de avisar que un botón no funciona o que la página tarda diez segundos en cargar, significa que decenas de otros usuarios ya abandonaron el sitio en silencio.\n\nLa observabilidad moderna trasciende el simple ping de disponibilidad de servidores y se articula en tres pilares esenciales: métricas en tiempo real, logs estructurados y trazabilidad distribuida. Las métricas permiten detectar anomalías macro (como picos de consumo de CPU o aumentos en el ratio de errores HTTP 500); los logs aportan el contexto quirúrgico del fallo; y las trazas distribuidas permiten seguir el recorrido milimétrico de una petición a través de la red, bases de datos y microservicios.\n\nEl aspecto más crítico de cualquier sistema de observabilidad es la calidad de sus alertas. Un sistema que envía cientos de notificaciones al día por advertencias menores entrena al equipo a ignorarlas por fatiga de alertas. Las alertas deben configurarse en función del impacto real en el usuario (Service Level Objectives y Error Budgets), disparándose únicamente cuando las métricas clave de negocio o disponibilidad se ven comprometidas.\n\nInvertir en monitoreo preventivo permite que el equipo identifique cuellos de botella de base de datos o fallas de memoria mucho antes de que impacten a los usuarios finales, transformando la respuesta ante incidentes en una operación controlada y predecible.",
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Cómo preparar una revisión de código útil",
      content:
        "El proceso de revisión de código (Code Review) es uno de los espacios más enriquecedores para nivelar el conocimiento técnico y asegurar la consistencia de un proyecto. Sin embargo, cuando no existen acuerdos compartidos, puede transformarse rápidamente en un cuello de botella frustrante o en un campo de batalla de opiniones personales sobre sintaxis y estilo.\n\nPara que una revisión sea efectiva, el trabajo comienza antes de presionar el botón de crear Pull Request. El autor tiene la responsabilidad de entregar un cambio que respete el principio de responsabilidad única: un PR que resuelve un único problema puntual, incluye pruebas automatizadas que demuestran su funcionamiento y viene acompañado de una descripción clara que detalla el contexto, capturas de pantalla si aplica y posibles riesgos técnicos.\n\nPor el lado de los revisores, la atención debe focalizarse en la corrección funcional, la escalabilidad, la seguridad y el cumplimiento de las reglas de dominio. Discusiones menores como el formateo de espacios, el uso de comillas simples o el orden de imports deben ser delegadas por completo a herramientas automatizadas (linters y formateadores automáticos en CI) para no gastar energía humana en tareas triviales.\n\nEs fundamental cuidar la empatía en la comunicación: utilizar preguntas en lugar de órdenes imperativas ('¿Qué opinas de manejar este caso nulo aquí?' en lugar de 'Maneja el nulo'), explicitar cuándo un comentario es un bloqueo mandatorio o una sugerencia no obligatoria, y reconocer abiertamente soluciones bien ejecutadas.",
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Programación", "Opinión"],
    },
    {
      title: "La importancia del espacio en blanco en una interfaz",
      content:
        "Uno de los errores más comunes al concebir interfaces digitales es considerar que el espacio sin contenido es espacio desperdiciado. La tendencia a condensar información, agregar bordes innecesarios y saturar cada esquina con botones o datos responde al miedo intuitivo de dejar huecos vacíos, pero genera experiencias agobiantes donde nada destaca.\n\nEl espacio en blanco —también denominado espacio negativo— es un elemento de diseño tan activo y deliberado como la tipografía o el color. Cumple un rol biomecánico directo en la percepción visual: según la Ley de Proximidad de la psicología de la Gestalt, los elementos que se encuentran visualmente cercanos se perciben como pertenecientes a un mismo grupo o concepto, mientras que el espacio intermedio crea fronteras invisibles pero inmediatas.\n\nAl otorgar márgenes generosos a los títulos, separar los bloques de texto con interlineados cómodos y aislar los botones de acción principal del resto del contenido secundario, se reduce la carga cognitiva del usuario. Esto permite que la vista escanee la información con naturalidad, identifique prioridades sin esfuerzo y complete sus objetivos con mayor rapidez.\n\nEstandarizar una escala de espaciado estricta (por ejemplo, basada en múltiplos de 8px: 8, 16, 24, 32, 48, 64px) dentro del sistema de diseño elimina las dudas arbitrarias en el desarrollo frontend y dota a toda la aplicación de una cadencia visual pulida, armoniosa y profundamente profesional.",
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño"],
    },
    {
      title: "Variables de entorno y secretos: una guía práctica",
      content:
        "La filtración accidental de credenciales de bases de datos, claves de APIs de pago o certificados privados es una de las causas más frecuentes de incidentes de seguridad en el software moderno. En muchos casos, estos desastres comienzan con un desarrollador que 'temporalmente' escribe una clave privada en el código fuente para probar una función localmente y termina commiteándola al repositorio de Git.\n\nEl principio fundamental para mitigar este riesgo radica en la estricta separación entre el código base y la configuración dependiente del entorno, tal como lo estipula la metodología 12-Factor App. El código ejecutable debe ser exactamente el mismo en desarrollo, staging y producción; lo único que cambia son las variables de entorno inyectadas por el sistema operativo anfitrión durante el arranque del proceso.\n\nLos archivos `.env` deben ser tratados con extremo cuidado: son herramientas exclusivas para el desarrollo en máquinas locales y bajo ninguna circunstancia deben subirse al control de versiones. Es mandatorio que figuren en la primera línea de cualquier archivo `.gitignore`, acompañados de un `.env.example` sanitizado que sirva como plantilla documentada para los nuevos miembros del equipo.\n\nPara entornos distribuidos y productivos, la práctica recomendada es prescindir totalmente de archivos de texto plano y utilizar almacenes de secretos gestionados (como HashiCorp Vault, AWS Secrets Manager o GCP Secret Manager). Estas herramientas permiten cifrar credenciales en reposo y en tránsito, auditar qué servicios acceden a cada secreto y realizar rotaciones automáticas de claves sin interrumpir el servicio.",
      coverImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Elegir una especialización sin cerrar otras puertas",
      content:
        "La industria tecnológica evoluciona a un ritmo vertiginoso, lo que a menudo genera dilemas profesionales sobre cómo orientar la carrera: ¿conviene convertirse en un especialista hiperenfocado en una única tecnología o en un generalista capaz de tocar cualquier parte del stack sin profundizar demasiado?\n\nLa respuesta más equilibrada y sostenible es adoptar el modelo del profesional con perfil en 'T' (T-shaped). La barra horizontal de la 'T' representa un conocimiento amplio y transversal de los fundamentos de la computación: protocolos de red, bases de datos relacionales, estructuras de datos, seguridad web, fundamentos de UX y principios de arquitectura. La barra vertical representa una especialización profunda y rigurosa en un área específica, como puede ser la optimización de bases de datos, la accesibilidad frontend o la ingeniería de infraestructura cloud.\n\nContar con una base horizontal sólida es lo que permite que un desarrollador frontend entienda las restricciones de rendimiento de la API que consume, o que un ingeniero backend diseñe endpoints orientados a las necesidades reales de la interfaz. Facilita el diálogo interdisciplinario, reduce la fricción en las estimaciones y evita el aislamiento técnico.\n\nLas tecnologías específicas, librerías y frameworks cambian de moda constantemente cada cinco años; sin embargo, los fundamentos teóricos y las habilidades de resolución de problemas permanecen invariables. Mantener la curiosidad por el sistema completo mientras se domina una especialidad es el mejor seguro contra la obsolescencia profesional.",
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Pruebas automatizadas que aportan confianza",
      content:
        "Tener una cobertura de pruebas automatizadas del 90% sobre el papel no garantiza que una aplicación sea confiable si esas pruebas son frágiles, lentas o están excesivamente acopladas a la estructura interna del código. Cuando cada refactorización menor rompe decenas de pruebas unitarias que no fallaron por un error real sino por un cambio de nombre interno, los desarrolladores terminan perdiendo la paciencia y desactivando la suite.\n\nPara que las pruebas aporten valor real, deben verificar comportamientos y contratos de salida desde la perspectiva del consumidor, no detalles de implementación privada. Una buena prueba unitaria debe tratar a la función o módulo como una caja negra: ingresar datos de entrada, evaluar los resultados o efectos secundarios esperados y tolerar cualquier reestructuración interna que no altere el comportamiento convenido.\n\nEs fundamental estructurar la estrategia siguiendo una pirámide de pruebas equilibrada: una base amplia de pruebas unitarias rápidas y aisladas que validen la lógica pura y las reglas de negocio críticas; una capa intermedia de pruebas de integración que aseguren la correcta interacción con la base de datos y servicios externos; y una capa superior acotada de pruebas end-to-end (E2E) que recorran los flujos críticos de compra o registro del usuario.\n\nUna suite de pruebas rápida, determinista y mantenible es lo que permite a un equipo hacer despliegues a producción un viernes por la tarde con absoluta serenidad técnica.",
      coverImage:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Contenedores para entornos de desarrollo consistentes",
      content:
        "La clásica frase 'en mi máquina sí funciona' ha costado miles de horas de productividad a la industria del desarrollo de software. Diferencias sutiles entre sistemas operativos, versiones de compiladores locales, librerías del sistema incompatibles o configuraciones locales no documentadas crean discrepancias que solo salen a la luz cuando el código llega a los entornos compartidos.\n\nDocker y la tecnología de contenedores solucionan este problema empaquetando la aplicación junto con todo su entorno de ejecución exacto: versiones de runtime, binarios del sistema operativo, variables de configuración y dependencias. Al definir el entorno mediante archivos declarativos (`Dockerfile` y `docker-compose.yml`), cualquier desarrollador que se sume al proyecto puede clonar el repositorio, ejecutar un comando y tener toda la arquitectura operativa en minutos.\n\nPara optimizar el uso de contenedores en desarrollo local, es importante prestar atención al rendimiento del sistema de archivos. Configurar volúmenes bind montados adecuadamente para soportar recarga en caliente (hot reloading) sin penalizaciones de I/O en sistemas como macOS o Windows es clave para no perjudicar la experiencia del programador.\n\nAdemás, aprovechar los builds en múltiples etapas (multi-stage builds) permite utilizar herramientas pesadas de compilación durante el empaquetado inicial y descartarlas en la imagen final, generando contenedores de producción ultraligeros, rápidos de desplegar y con una superficie de ataque de seguridad reducida al mínimo.",
      coverImage:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title: "Prototipos que ayudan a tomar mejores decisiones",
      content:
        "Escribir software de producción es uno de los métodos más lentos y costosos para validar si una idea satisface las necesidades reales de los usuarios. Cuando un equipo se apresura a implementar bases de datos, APIs y componentes finales antes de poner a prueba los supuestos de negocio y usabilidad, cualquier cambio de rumbo posterior implica tirar a la basura semanas de trabajo de ingeniería.\n\nUn prototipo interactivo es una herramienta de aprendizaje diseñada para responder una hipótesis específica al menor costo posible. La clave de un buen prototipo radica en ajustar su fidelidad a la pregunta que se busca resolver: si el objetivo es validar el flujo de información o la navegación general, bocetos rápidos en papel o wireframes de baja fidelidad son más que suficientes.\n\nCuando se busca evaluar la claridad de un microcomponente, la respuesta emocional a la marca o la comprensión de un formulario complejo, un prototipo interactivo de alta fidelidad con datos realistas permite observar fricciones reales sin necesidad de haber conectado una sola base de datos en el backend.\n\nTestear estos prototipos con usuarios reales de forma temprana y continua permite descubrir ambigüedades, inconsistencias conceptuales y bloqueos en los flujos antes de que se conviertan en código costoso de modificar. Prototipar es, en esencia, comprar certidumbre técnica y de negocio al menor precio del mercado.",
      coverImage:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Diseño", "Opinión"],
    },
    {
      title: "Documentación técnica que el equipo realmente utiliza",
      content:
        "La documentación técnica suele habitar en dos extremos igualmente ineficientes: gigantescas páginas de wiki corporativas desactualizadas desde hace años que nadie lee, o la ausencia total de contexto bajo el lema ingenuo de que 'el código limpio se documenta a sí mismo'.\n\nEl código bien escrito puede explicar con claridad el *cómo* se ejecuta una tarea, pero rara vez puede transmitir el *por qué* se eligió un camino en lugar de otro, qué alternativas se descartaron o cuáles son las restricciones externas del negocio. La documentación verdaderamente valiosa vive lo más cerca posible del código fuente (en el mismo repositorio de Git) y se enfoca en el contexto arquitectónico que no resulta evidente a simple vista.\n\nUna de las mejores herramientas para este fin son los Registros de Decisiones Arquitectónicas (Architecture Decision Records o ADRs). Un ADR es un documento breve en Markdown que captura una decisión técnica relevante: el contexto del problema, las opciones evaluadas, la decisión final tomada y las consecuencias positivas y negativas asumidas por el equipo. Leer estos registros permite a los nuevos miembros comprender el contexto histórico sin caer en la tentación de refactorizar soluciones sin conocer los motivos de su existencia.\n\nPara que la documentación no muera con el paso del tiempo, debe ser parte del flujo de trabajo habitual: si un Pull Request modifica el contrato de un servicio o la arquitectura de un módulo, la actualización de la documentación asociada debe ser un requerimiento indispensable para aprobar el merge.",
      coverImage:
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Opinión", "Programación"],
    },
    {
      title: "Estrategias de caching para APIs de alto rendimiento",
      content:
        "En aplicaciones con alta concurrencia, ejecutar consultas repetitivas sobre bases de datos relacionales para responder peticiones de lectura idénticas es un desperdicio masivo de recursos computacionales. La implementación adecuada de capas de almacenamiento en caché en memoria (como Redis o Memcached) permite absorber cargas extremas y entregar respuestas con latencias de un solo dígito de milisegundo.\n\nEl patrón más extendido es Cache-Aside (o Lazy Loading). En este modelo, cuando el backend recibe una petición, consulta primero la memoria caché; si los datos existen (cache hit), los retorna de inmediato; si no están presentes (cache miss), ejecuta la consulta en la base de datos relacional, almacena el resultado en la caché con un tiempo de expiración (TTL) y finalmente responde al cliente.\n\nSin embargo, la complejidad del almacenamiento en caché no reside en guardar los datos, sino en garantizar su consistencia. Aplicar invalidación basada en eventos (borrar o actualizar la entrada en caché inmediatamente cuando una mutación modifica el registro original en base de datos) previene que los clientes lean estados obsoletos.\n\nAdicionalmente, en sistemas de alto tráfico es crucial protegerse contra el fenómeno de la estampida de caché (Cache Stampede). Cuando una clave muy solicitada expira, cientos de peticiones simultáneas pueden golpear la base de datos al mismo tiempo intentando regenerarla; implementar bloqueos distribuidos (locks) o técnicas de recarga probabilística en segundo plano asegura que solo un proceso consulte el origen mientras el resto aguarda el nuevo valor.",
      coverImage:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Tecnología", "Programación"],
    },
    {
      title: "Microservicios vs Monolitos: evaluando el trade-off",
      content:
        "La fascinación por las arquitecturas de microservicios adoptadas por gigantes de la tecnología llevó a una adopción masiva y a menudo desmedida en empresas de todos los tamaños. Equipos pequeños y startups se encontraron dividiendo prematuramente sistemas sencillos en docenas de servicios distribuidos, sufriendo toda la complejidad operativa del modelo antes de contar con un producto validado en el mercado.\n\nDistribuir un sistema introduce de inmediato desafíos técnicos no triviales: la red entre servicios es inherentemente lenta e insegura, las transacciones ACID simples se convierten en complejos patrones de orquestación (como el patrón Saga), el monitoreo distribuido requiere infraestructura especializada y la refactorización entre dominios se vuelve lenta y engorrosa.\n\nFrente a este escenario, el monolito modular bien estructurado se posiciona como una opción superior para la inmensa mayoría de los proyectos. Mantener todo el código dentro de un mismo proceso permite realizar refactorizaciones seguras asistidas por el compilador, garantiza transacciones de base de datos directas y simplifica radicalmente los despliegues y las pruebas locales.\n\nLa división en microservicios independientes se justifica de forma genuina cuando existen límites organizacionales claros: múltiples equipos independientes que necesitan desplegar sin coordinarse entre sí, o cuando módulos específicos tienen requerimientos de escalabilidad de hardware totalmente asimétricos. Comenzar con un monolito modular con límites de dominio bien definidos es la forma más inteligente de dejar la puerta abierta a una futura partición sin pagar el costo distributivo por adelantado.",
      coverImage:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Opinión"],
    },
    {
      title: "Sistemas de diseño: construyendo consistencia a escala",
      content:
        "A medida que una empresa crece y suma múltiples equipos de desarrollo trabajando simultáneamente sobre distintas partes de un producto, la experiencia visual del usuario tiende a fragmentarse rápidamente. Sin una fuente centralizada de verdad, surgen docenas de tonalidades distintas de azul, diálogos modales con interacciones contradictorias y componentes duplicados en cada rincón del repositorio.\n\nUn Sistema de Diseño (Design System) resuelve esta entropía estableciendo un conjunto unificado de estándares, componentes reutilizables y principios de interacción compartidos entre diseñadores y desarrolladores. El corazón técnico de este sistema reside en los Tokens de Diseño: variables atómicas que definen colores, tipografías, espaciados, bordes y transiciones de forma agnóstica a la tecnología.\n\nAl centralizar estos tokens en formatos estructurados como JSON, es posible compilar automáticamente variables para CSS, styled-components, Swift o Kotlin mediante pipelines automáticos. De este modo, un cambio de identidad de marca o un ajuste en la escala tipográfica se propaga de manera consistente a todas las plataformas web y móviles con un simple despliegue.\n\nConstruir y mantener un sistema de diseño no es un proyecto de una sola vez, sino un producto interno continuo. Requiere gobernanza clara, documentación viva con ejemplos interactivos y un proceso transparente para que cualquier miembro de ingeniería o diseño pueda proponer mejoras y extensiones a los componentes base.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Diseño", "Programación"],
    },
    {
      title:
        "Seguridad en APIs REST: autenticación, autorización y rate limiting",
      content:
        "La seguridad en el desarrollo backend no puede considerarse un añadido opcional que se revisa al final del ciclo de vida del software. Exponer endpoints HTTP públicos a internet implica asumir que serán sondeados continuamente por actores maliciosos en busca de vulnerabilidades lógicas, fallas de inyección o esquemas mal protegidos.\n\nUno de los errores más críticos y prevalentes en las APIs modernas es la Autorización Rota a Nivel de Objeto (BOLA, por sus siglas en inglés). Esta vulnerabilidad ocurre cuando un endpoint valida correctamente que el usuario está autenticado mediante un token JWT válido, pero omite verificar si ese usuario específico tiene permisos legítimos para acceder o modificar el registro particular solicitado en la URL (por ejemplo, `/api/orders/4521`). Toda consulta a base de datos debe filtrar estrictamente por el ID del usuario propietario de los datos.\n\nComplementariamente, la defensa en profundidad requiere implementar límites de peticiones (Rate Limiting) basados en la IP o en el identificador del usuario autenticado para neutralizar ataques de fuerza bruta y denegaciones de servicio. Asimismo, la validación estricta de esquemas de entrada en el servidor mediante librerías como Zod o Joi garantiza que ningún payload malicioso o parámetro no tipado ingrese al dominio de la aplicación.\n\nConfigurar cabeceras de seguridad HTTP adecuadas (CORS restrictivo, Content Security Policy, HSTS) y sanitizar meticulosamente las respuestas para no filtrar datos sensibles de la infraestructura completa la postura de seguridad esencial para operar en entornos productivos.",
      coverImage:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title: "El auge de TypeScript y la seguridad de tipos en el backend",
      content:
        "Durante más de una década, Node.js se consolidó como una de las plataformas predilectas para el desarrollo backend gracias a su agilidad, rendimiento asíncrono no bloqueante y el gigantesco ecosistema de paquetes de npm. Sin embargo, a medida que las bases de código crecieron en volumen y complejidad, la naturaleza puramente dinámica de JavaScript comenzó a manifestar su mayor desventaja: errores silenciosos en tiempo de ejecución que solo aparecían en producción bajo cargas reales.\n\nLa adopción generalizada de TypeScript ha transformado radicalmente los estándares de robustez en el desarrollo de servidores. Al incorporar un sistema de tipos estático y expresivo, el compilador actúa como una primera barrera implacable que previene incoherencias de datos, accesos a propiedades inexistentes (`undefined is not a function`) y discrepancias en los argumentos de las funciones antes de que una sola línea de código sea desplegada.\n\nEl verdadero salto de calidad se produce cuando se implementa seguridad de tipos de extremo a extremo (End-to-End Type Safety). Al utilizar ORMs modernos como Prisma combinados con esquemas de validación como Zod, los tipos definidos en la base de datos se propagan de manera automática hacia los controladores, las respuestas HTTP y los clientes frontend, asegurando que cualquier cambio en la estructura de una tabla alerte inmediatamente a todos los módulos dependientes durante el tiempo de compilación.",
      coverImage:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Optimización de consultas SQL e indexación estratégica",
      content:
        "El crecimiento en el volumen de datos de una aplicación suele poner a prueba el diseño inicial de las bases de datos relacionales. Consultas que respondían en cinco milisegundos cuando la tabla contenía mil filas pueden degradarse hasta tardar varios segundos una vez que se alcanzan los millones de registros, degradando la experiencia de usuario y colapsando el pool de conexiones del servidor.\n\nEl primer paso para solucionar estos problemas de rendimiento es aprender a interpretar el plan de ejecución de las consultas mediante `EXPLAIN ANALYZE`. Este comando permite identificar con precisión si el motor de la base de datos está recurriendo a costosos escaneos secuenciales de toda la tabla (Seq Scan) o si está aprovechando los índices existentes de manera óptima a través de escaneos de índice (Index Scan o Bitmap Index Scan).\n\nDiseñar índices requiere una comprensión profunda de los patrones reales de consulta. En índices compuestos por múltiples columnas, la regla del prefijo más a la izquierda (Leftmost Prefix Rule) es determinante: el índice solo será utilizado si los filtros de la cláusula `WHERE` coinciden con las columnas en el orden exacto en que fueron indexadas, colocando habitualmente primero las columnas con operadores de igualdad estricta y al final aquellas involucradas en rangos de fechas o valores.\n\nEs fundamental recordar que los índices no son gratuitos: cada índice adicional acelera las operaciones de lectura a costa de ralentizar las inserciones, actualizaciones y borrados, además de consumir memoria RAM valiosa. Auditar periódicamente la base de datos para eliminar índices redundantes o sin uso es una práctica indispensable para mantener la salud del motor.",
      coverImage:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Arquitectura hexagonal en aplicaciones Node.js",
      content:
        "En muchos proyectos de backend, es habitual que la lógica central de negocio termine íntimamente entrelazada con el framework web (como Express o Fastify), las consultas directas del ORM o librerías de terceros. Este acoplamiento rígido transforma cualquier cambio técnico —como migrar de motor de base de datos o reemplazar un proveedor de pagos— en una tarea de alto riesgo que requiere modificar código en docenas de archivos.\n\nLa Arquitectura Hexagonal (o patrón de Puertos y Adaptadores) resuelve este desafío aislando de forma estricta el dominio de la aplicación en el centro de la estructura. Las entidades de negocio y los casos de uso no tienen ninguna dependencia hacia librerías externas o detalles de infraestructura; en su lugar, definen contratos o interfaces abstractas denominadas 'Puertos' para declarar qué necesitan del exterior.\n\nLos 'Adaptadores' son las implementaciones concretas que se conectan a esos puertos desde la capa externa: adaptadores primarios que dirigen la aplicación (como controladores HTTP o comandos CLI) y adaptadores secundarios dirigidos por la aplicación (como repositorios de base de datos Postgres, clientes de Redis o conectores de correo electrónico).\n\nAdoptar este desacoplamiento permite probar la lógica de negocio pura mediante pruebas unitarias ultrarrápidas utilizando adaptadores en memoria (mocks o fakes), sin necesidad de levantar bases de datos reales durante los tests, garantizando una base de código sostenible, modular y preparada para evolucionar a lo largo del tiempo.",
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Estrategias de branching: Trunk-based vs GitFlow",
      content:
        "La metodología que elige un equipo para coordinar el trabajo en Git tiene un impacto directo sobre la velocidad de entrega y la frecuencia de incidentes en producción. Durante muchos años, GitFlow fue considerado el estándar indiscutible, estructurando el trabajo alrededor de ramas permanentes de larga duración como `main`, `develop`, ramas de features, ramas de release y hotfixes.\n\nSin embargo, a medida que los equipos adoptaron prácticas de integración continua y despliegue rápido, las ramas de larga duración comenzaron a evidenciar sus límites: mantener ramas de desarrollo aisladas durante semanas produce colisiones complejas de código ('merge hell') y retrasa el feedback sobre cómo interactúan los cambios de distintos desarrolladores.\n\nTrunk-Based Development propone una filosofía diametralmente opuesta: todos los desarrolladores integran sus cambios directamente en la rama principal (`main` o `trunk`) de forma diaria o mediante ramas de vida sumamente corta (que no superan las 24 o 48 horas). Esta dinámica obliga a descomponer las funcionalidades en incrementos pequeños, continuos y fácilmente auditables.\n\nPara aplicar Trunk-Based Development sin exponer funcionalidades incompletas a los usuarios finales, se utiliza la técnica de Feature Flags (banderas de funcionalidad). Esto permite desplegar código a producción de forma continua manteniendo la nueva funcionalidad desactivada a nivel lógico hasta que se encuentre completamente probada y lista para su lanzamiento comercial.",
      coverImage:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Opinión"],
    },
    {
      title: "Gestión de estado global: cuándo usar Zustand o Context API",
      content:
        "El manejo del estado en aplicaciones React ha recorrido un largo camino desde las arquitecturas monolíticas de Redux clásico con docenas de archivos de acciones y reducers. Sin embargo, en el afán de simplificar, muchos equipos cayeron en el extremo opuesto: utilizar el Context API nativo de React para almacenar la totalidad del estado global de la aplicación.\n\nEl problema fundamental del Context API es su mecánica interna de propagación: cualquier actualización en el valor provisto por un Context desencadena la reevaluación y el renderizado de todos los componentes que consumen ese contexto, sin importar si utilizan la propiedad modificada o no. Cuando se almacenan estados que mutan con alta frecuencia (como datos de formularios en tiempo real o listas interactivas), el rendimiento de la interfaz se degrada visiblemente.\n\nLibrerías modernas basadas en selectores como Zustand resuelven este problema con elegancia y un footprint mínimo. Zustand permite crear almacenes de estado atómicos fuera del árbol de renderizado de React, permitiendo que cada componente se suscriba de forma quirúrgica únicamente a la porción exacta de datos que necesita mediante funciones selectoras (`useStore(state => state.userAvatar)`).\n\nLa regla práctica para decidir es clara: utiliza Context API para valores de baja frecuencia de cambio que representan configuración contextual del entorno (como el tema visual, el idioma seleccionado o el token de autenticación), y apóyate en librerías dedicadas como Zustand para el estado interactivo y dinámico del negocio.",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Microfrontends: cuándo aportan valor real y cuándo complejidad",
      content:
        "La extensión de los principios de diseño de microservicios hacia el desarrollo de interfaces de usuario dio nacimiento a la arquitectura de Microfrontends: descomponer una aplicación web monolítica en múltiples aplicaciones frontend independientes, desarrolladas y desplegadas de forma autónoma por equipos distintos.\n\nSi bien esta arquitectura resuelve problemas de escala organizativa reales en organizaciones gigantescas con cientos de ingenieros trabajando en simultáneo, su adopción precipitada en equipos de tamaño moderado suele acarrear una sobrecarga técnica abrumadora. Coordinar estilos globales consistentes, gestionar dependencias compartidas para no obligar al usuario a descargar tres versiones diferentes de la misma librería y resolver la comunicación entre módulos distribuidos requiere un esfuerzo de infraestructura mayúsculo.\n\nHerramientas contemporáneas como Module Federation en Webpack o Vite han facilitado enormemente la carga dinámica de componentes remotos en tiempo de ejecución, pero la complejidad intrínseca de operar múltiples pipelines independientes, entornos de prueba fragmentados y monitoreo cruzado permanece intacta.\n\nAntes de dividir un frontend en microaplicaciones independientes, es indispensable evaluar alternativas más simples como el uso de monorrepositorios con herramientas como Turborepo o Nx, donde múltiples módulos comparten código y tipados de forma estricta dentro de un proceso de compilación unificado y predecible.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Opinión", "Tecnología"],
    },
    {
      title:
        "WebSockets vs Server-Sent Events para comunicación en tiempo real",
      content:
        "La demanda de experiencias interactivas con actualizaciones instantáneas de datos en tiempo real es una constante en aplicaciones web modernas: paneles financieros, feeds de actividad, notificaciones push y chats colaborativos. Sin embargo, muchos desarrolladores eligen WebSockets de forma automática sin evaluar si su caso de uso realmente requiere comunicación bidireccional continua.\n\nWebSockets establece un socket TCP full-duplex persistente sobre un protocolo independiente a HTTP. Esto resulta imprescindible en escenarios donde el cliente y el servidor necesitan enviarse mensajes mutuamente a alta frecuencia y con mínima latencia, como juegos multijugador online o lienzos de dibujo colaborativo en vivo. No obstante, mantener estas conexiones persistentes requiere infraestructura de balanceo de carga especializada y manejo manual de reconexiones por caída de red.\n\nPor el contrario, Server-Sent Events (SSE) es un estándar web nativo basado en HTTP tradicional diseñado específicamente para la transmisión unidireccional de eventos desde el servidor hacia el cliente. Cuenta con soporte nativo para reconexión automática en el navegador a través de la API `EventSource`, asignación de IDs de evento para recuperar mensajes perdidos tras una desconexión y compatibilidad transparente con balanceadores de carga y proxies HTTP existentes sin configuraciones adicionales.\n\nSi el flujo de información de tu aplicación consiste únicamente en enviar actualizaciones periódicas del servidor hacia la interfaz, Server-Sent Events ofrece una implementación notablemente más simple, ligera y robusta que un servidor completo de WebSockets.",
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación", "Tecnología"],
    },
    {
      title: "Principios SOLID aplicados con ejemplos cotidianos",
      content:
        "Los cinco principios SOLID formulados por Robert C. Martin son frecuentemente citados en entrevistas técnicas y manuales de arquitectura, pero a menudo se enseñan a través de analogías académicas abstractas que oscurecen su verdadero propósito pragmático en el código del día a día.\n\nEl principio de Responsabilidad Única (SRP) no significa que una clase deba tener un solo método, sino que debe tener una única razón para cambiar; separar la lógica de cálculo de una factura de la lógica encargada de renderizarla en PDF evita que un cambio estético en el diseño rompa el motor contable. El principio Abierto/Cerrado (OCP) promueve diseñar módulos que puedan extender su comportamiento mediante polimorfismo o composición sin necesidad de reescribir y alterar el código original ya probado en producción.\n\nLa Sustitución de Liskov (LSP) garantiza que cualquier subclase pueda utilizarse en reemplazo de su clase base sin alterar la correctitud del programa, evitando trampas comunes como métodos que lanzan excepciones inesperadas ante parámetros válidos. La Segregación de Interfaces (ISP) desaconseja crear interfaces gigantescas y sobrecargadas, prefiriendo contratos pequeños y específicos para que ningún cliente dependa de métodos que no utiliza.\n\nFinalmente, la Inversión de Dependencias (DIP) establece que los módulos de alto nivel no deben depender de implementaciones concretas de bajo nivel, sino de abstracciones. Aplicar SOLID de forma equilibrada no consiste en sobrecargar el sistema con capas innecesarias de interfaces, sino en identificar los puntos críticos de cambio y desacoplarlos para que el software pueda evolucionar sin fricción.",
      coverImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Modo oscuro: consideraciones de contraste y tokens de color",
      content:
        "La implementación de un modo oscuro (Dark Mode) en aplicaciones web y móviles se ha consolidado como un estándar de accesibilidad y preferencia de los usuarios. Sin embargo, diseñar un tema oscuro eficaz implica mucho más que invertir automáticamente la paleta de colores y pintar el fondo de negro absoluto (`#000000`).\n\nEl uso de negro puro como fondo produce contrastes excesivamente duros contra textos blancos brillantes, generando un fenómeno de fatiga ocular y distorsión visual conocido como halación, especialmente en pantallas OLED o en condiciones de baja iluminación. Un tema oscuro profesional utiliza superficies en escalas de gris oscuro profundo (como `#121212` o `#18181B`) para suavizar el impacto visual.\n\nOtro aspecto clave es el tratamiento de la elevación y la profundidad. Mientras que en un tema claro las capas elevadas (como modales, menús desplegables o tarjetas) comunican distancia mediante sombras proyectadas, en un fondo oscuro las sombras resultan invisibles; para comunicar jerarquía visual, las capas superiores deben adoptar tonalidades de gris progresivamente más claras a medida que se acercan virtualmente al usuario.\n\nAsimismo, los colores primarios y de acento con alta saturación que funcionan perfectamente sobre fondos blancos pueden resultar agresivos o ilegibles sobre fondos oscuros; ajustar la saturación y calibrar los contrastes según los estándares WCAG AA garantiza una experiencia visual descansada y estéticamente impecable.",
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño"],
    },
    {
      title: "Infraestructura como código con Terraform",
      content:
        "Aprovisionar infraestructura en la nube interactuando manualmente con las consolas web de los proveedores cloud es una práctica vulnerable a errores humanos, inconsistencias no documentadas y desastres operativos. La imposibilidad de auditar quién creó un recurso específico o de replicar fielmente el entorno productivo ante una contingencia representa un riesgo inaceptable para cualquier organización seria.\n\nTerraform y el paradigma de Infraestructura como Código (IaC) permiten declarar el estado deseado de servidores, redes, bases de datos gestionadas y políticas de seguridad en archivos de texto estructurados mediante el lenguaje declarativo HCL (HashiCorp Configuration Language). Estos archivos se versionan en Git exactamente igual que el código de la aplicación.\n\nEl flujo de trabajo de Terraform se basa en la predictibilidad: el comando `terraform plan` compara el estado actual de la infraestructura remota contra la configuración declarada en el código y genera un plan de ejecución detallado que muestra exactamente qué recursos serán creados, modificados o destruidos antes de que se aplique ningún cambio real.\n\nEstructurar la infraestructura en módulos reutilizables, almacenar los archivos de estado (`tfstate`) de forma remota con bloqueo concurrente en servicios de almacenamiento seguro como AWS S3 o GCS, y ejecutar validaciones de seguridad estáticas en el pipeline de CI/CD garantiza una gestión de infraestructura determinista, auditable y plenamente automatizada.",
      coverImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Buenas prácticas para escribir mensajes de commit legibles",
      content:
        "El historial de Git de un proyecto es la documentación más viva y duradera sobre las decisiones de ingeniería tomadas a lo largo del tiempo. Mensajes de commit crípticos como 'arreglos varios', 'wip' o 'cambios finales' destruyen por completo el valor forense del repositorio y convierten cualquier investigación de regresiones en una tarea titánica.\n\nAdoptar la convención de Conventional Commits dota al historial de una estructura estandarizada y fácilmente analizable tanto por humanos como por herramientas automáticas. Cada mensaje se compone de un tipo explícito (`feat` para funcionalidades, `fix` para correcciones de bugs, `refactor` para reestructuraciones sin cambio de comportamiento, `docs` para documentación), un alcance opcional y una descripción breve en modo imperativo.\n\nLa estructura de un commit de calidad debe priorizar el principio de atomicidad: cada commit debe representar un cambio lógico aislado que compile y pase todas las pruebas por sí mismo. Si un commit mezcla la corrección de un bug de seguridad con el formateo cosmético de diez archivos no relacionados, revertir ese cambio ante una emergencia se vuelve una tarea peligrosa.\n\nEn el cuerpo del mensaje de commit, el foco debe colocarse en explicar el *por qué* de la modificación y el contexto del problema resuelto en lugar de describir mecánicamente el código modificado, brindando un valor incalculable para los ingenieros que mantendrán el sistema en el futuro.",
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      authorId: user7.id,
      categoryNames: ["Programación", "Opinión"],
    },
    {
      title: "Cómo prevenir el agotamiento profesional en equipos de software",
      content:
        "El síndrome de desgaste profesional o agotamiento (burnout) es uno de los riesgos más destructivos y generalizados en la industria del software. La presión constante por fechas límite irreales, la sobrecarga de interrupciones en tiempo real, las guardias nocturnas mal remuneradas y la cultura de la urgencia permanente erosionan la salud mental de los ingenieros y disparan la rotación de talento.\n\nCombatir el agotamiento requiere intervenciones estructurales en la cultura y los procesos del equipo. En primer lugar, es prioritario migrar hacia una cultura de comunicación asíncrona por defecto: normalizar que los mensajes de chat no exigen respuestas inmediatas permite a los desarrolladores ingresar en estados prolongados de concentración profunda (Deep Work) sin la ansiedad constante de la notificación instantánea.\n\nEn segundo lugar, la gestión de la deuda técnica debe ser tratada como una inversión de primer orden y no como un lujo postergable. Trabajar sobre una base de código frágil que se rompe ante cualquier cambio genera una carga de frustración diaria que desgasta a los mejores profesionales; reservar un porcentaje fijo de cada sprint para refactorizaciones y mejoras de herramientas devuelve la tranquilidad al equipo.\n\nPor último, los líderes técnicos tienen la responsabilidad de modelar límites saludables: respetar estrictamente los horarios de descanso, desalentar los correos en fines de semana y asegurar que las retrospectivas se enfoquen en resolver fallas sistémicas en lugar de responsabilizar a individuos.",
      coverImage:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Opinión"],
    },
    {
      title: "Manejo centralizado de errores en Node.js y Express",
      content:
        "Manejar errores en una API backend mediante bloques `try/catch` manuales y dispersos en cada endpoint suele producir respuestas HTTP inconsistentes, estados no controlados y, en el peor de los casos, fugas de información interna como stack traces de base de datos directamente hacia los clientes.\n\nLa estrategia recomendada en aplicaciones Express consiste en canalizar todas las excepciones no controladas hacia un middleware de error centralizado. Al definir clases de error personalizadas que hereden de la clase nativa `Error` (como `AppError`, `NotFoundError`, `UnauthorizedError` o `ValidationError`), cada fallo puede encapsular su propio código de estado HTTP y un mensaje seguro para el cliente.\n\nUn middleware global de captura intercepta cualquier error emitido en la cadena de ejecución asíncrona, registra el incidente con metadatos completos en el sistema de logs y formatea una respuesta JSON unificada y sanitizada para el consumidor de la API, evitando que peticiones malformadas provoquen caídas inesperadas del proceso Node.js.\n\nEs fundamental complementar esta estructura escuchando los eventos globales del proceso `unhandledRejection` y `uncaughtException`. Ante fallos críticos no recuperables, la práctica segura dicta registrar el error y forzar un reinicio limpio del proceso mediante el orquestador de contenedores para evitar operar en estados de memoria corruptos.",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      authorId: user1.id,
      categoryNames: ["Programación"],
    },
    {
      title: "Autenticación moderna con OAuth 2.0 y OpenID Connect",
      content:
        "Diseñar e implementar sistemas de autenticación propios almacenando contraseñas locales en bases de datos es una responsabilidad de seguridad sumamente compleja que expone a los proyectos a ataques de relleno de credenciales (credential stuffing), inyecciones y filtraciones de datos masivas. Delegar la identidad a proveedores establecidos mediante estándares consolidados eleva drásticamente el nivel de seguridad.\n\nEs fundamental comprender la diferencia técnica entre ambos estándares: OAuth 2.0 es estrictamente un protocolo de *autorización* diseñado para otorgar a una aplicación acceso limitado a recursos en nombre de un usuario sin compartir su contraseña; OpenID Connect (OIDC) es una capa de *identidad* construida sobre OAuth 2.0 que estandariza la autenticación mediante la emisión de Tokens ID en formato JWT.\n\nPara aplicaciones web modernas de una sola página (SPA) y aplicaciones móviles, el flujo estándar y mandatorio es el Flujo de Código de Autorización con PKCE (Proof Key for Code Exchange). PKCE elimina la necesidad de almacenar secretos de cliente en el navegador o dispositivo móvil —donde podrían ser extraídos fácilmente por atacantes— utilizando desafíos criptográficos dinámicos generados en cada inicio de sesión.\n\nAdoptar estos estándares no solo simplifica el cumplimiento de normativas de privacidad y seguridad, sino que mejora sustancialmente la experiencia de usuario permitiendo accesos rápidos mediante inicio de sesión social o proveedores empresariales corporativos.",
      coverImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Optimización de Core Web Vitals en sitios web modernos",
      content:
        "Las métricas Core Web Vitals introducidas por Google han transformado la optimización del rendimiento web al reemplazar benchmarks sintéticos abstractos por mediciones cuantitativas directas de la experiencia real que percibe un usuario al navegar un sitio.\n\nLas tres métricas cardinales evalúan facetas críticas del rendimiento: Largest Contentful Paint (LCP) mide la velocidad con la que se renderiza el elemento de contenido principal de la pantalla; Cumulative Layout Shift (CLS) cuantifica la estabilidad visual registrando cualquier movimiento inesperado de elementos mientras la página carga; e Interaction to Next Paint (INP) evalúa la capacidad de respuesta de la interfaz ante clics o pulsaciones de teclado.\n\nOptimizar LCP exige priorizar los recursos críticos de la ruta inicial: pre-cargar la imagen principal mediante `<link rel='preload'>`, utilizar formatos modernos y comprimidos (como WebP o AVIF) con dimensionamiento responsivo, y eliminar el bloqueo de renderizado producido por scripts de terceros innecesarios.\n\nPara erradicar los problemas de CLS, la regla técnica indispensable es reservar siempre el espacio de imágenes, iframes y banners publicitarios mediante atributos explícitos `width` y `height` o la propiedad CSS `aspect-ratio`. Un sitio con métricas Core Web Vitals óptimas no solo mejora su posicionamiento en motores de búsqueda, sino que incrementa de forma directa las tasas de conversión y la retención de usuarios.",
      coverImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      authorId: user4.id,
      categoryNames: ["Diseño", "Tecnología"],
    },
    {
      title: "Tipografía responsiva y jerarquía de lectura",
      content:
        "La tipografía es el medio principal a través del cual los usuarios consumen la información en la web. Sin embargo, diseñar tipografías responsivas se redujo durante años a llenar las hojas de estilo con decenas de media queries rígidas que producían saltos de escala bruscos e incómodos al redimensionar la pantalla del dispositivo.\n\nEl desarrollo CSS moderno resuelve este desafío mediante el uso de tipografía fluida aprovechando funciones matemáticas como `clamp()`. Al definir un tamaño de fuente que combina un valor mínimo seguro, un valor preferido dependiente del ancho del viewport (`vw` o unidades de contenedor `cqi`) y un límite superior máximo, el texto escala con suavidad matemática y proporcional en cualquier resolución.\n\nMás allá del tamaño de los encabezados, la legibilidad descansa en proporciones de interlineado (`line-height`) y longitud de renglón (medida de lectura). Para textos de párrafo largos, mantener un ancho de lectura de entre 50 y 75 caracteres por línea previene la fatiga visual, evitando que el ojo del lector se pierda al saltar de un renglón al siguiente.\n\nEstructurar una escala modular armónica con ratios claros (como el ratio mayor o la escala de cuarta perfecta) dota a la interfaz de una jerarquía visual inmediata donde los títulos, subtítulos y cuerpos de texto comunican su importancia de forma natural e intuitiva.",
      coverImage:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      authorId: user2.id,
      categoryNames: ["Diseño"],
    },
    {
      title: "Serverless: casos de uso adecuados y costos ocultos",
      content:
        "El paradigma Serverless y las funciones como servicio (FaaS) revolucionaron la computación en la nube bajo la promesa de escalado automático instantáneo a cero, eliminación completa de la administración de servidores y un modelo de facturación estricto donde solo se paga por los milisegundos de cómputo consumidos.\n\nEsta arquitectura resulta imbatible en escenarios de cargas orientadas a eventos esporádicos o asíncronos: procesamiento y transformación de imágenes subidas por usuarios, consumidores de colas de mensajería, pipelines de ingestión de analíticas o tareas programadas de mantenimiento. En estos casos, mantener un servidor dedicado encendido las 24 horas representaría un gasto innecesario.\n\nSin embargo, aplicar Serverless como la solución universal para cualquier API backend introduce costos ocultos y fricciones operativas significativas. Para servicios con tráfico constante y sostenido, el costo acumulado de millones de invocaciones de funciones Serverless suele superar ampliamente el alquiler de contenedores dedicados gestionados.\n\nA esto se suman desafíos técnicos como los tiempos de arranque en frío (Cold Starts) que añaden latencias impredecibles a las peticiones, la saturación del pool de conexiones hacia bases de datos relacionales tradicionales debido a la naturaleza efímera de las funciones y la complejidad para depurar y recrear entornos de prueba completos en máquinas locales.",
      coverImage:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      authorId: user3.id,
      categoryNames: ["DevOps", "Tecnología"],
    },
    {
      title: "Qué evaluar antes de iniciar una refactorización mayor",
      content:
        "Cuando una base de código acumula años de cambios apresurados, dependencias obsoletas y deuda técnica, el impulso intuitivo de muchos equipos de ingeniería es plantear una reescritura total desde cero ('Greenfield rewrite'). Sin embargo, la historia del desarrollo de software demuestra que las reescrituras completas suelen terminar en retrasos gigantescos, presupuestos agotados y proyectos cancelados.\n\nLa trampa de la reescritura total reside en subestimar la cantidad masiva de conocimiento implícito, reglas de negocio sutiles y correcciones de casos límite oscuros que están codificados en el sistema legado. Comenzar desde cero implica tener que redescubrir y cometer nuevamente todos esos errores a lo largo de meses de trabajo mientras la competencia continúa lanzando funcionalidades al mercado.\n\nLa alternativa profesional es la refactorización incremental apoyada en el patrón Strangler Fig (Higuera Estranguladora). Esta técnica consiste en construir nuevos módulos y funcionalidades de forma moderna y aislada alrededor de la aplicación existente, interceptando el tráfico gradualmente mediante un proxy inverso y reemplazando piezas del monolito una a una sin interrumpir nunca la operación del negocio.\n\nPara que una refactorización tenga éxito, es indispensable contar con una red de seguridad: escribir pruebas de integración de caja negra que validen el comportamiento del sistema actual antes de tocar el código garantiza que la nueva implementación preserve la fidelidad de todas las operaciones existentes.",
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      authorId: admin.id,
      categoryNames: ["Programación", "Opinión"],
    },
    {
      title: "Cómo estructurar el feedback técnico en pull requests",
      content:
        "La revisión de código es una conversación técnica donde se construyen los estándares de calidad del equipo, pero también es un espacio donde la comunicación descuidada puede generar frustración, actitudes defensivas y rispideces interpersonales. Comentarios vagos como 'esto no me gusta' o demandas imperativas sin justificación deterioran la confianza entre pares.\n\nUna de las mejores prácticas para elevar el nivel de las revisiones es implementar la técnica de Conventional Comments. Anteponer etiquetas semánticas claras a cada observación —como `[bloqueante]`, `[sugerencia]`, `[pregunta]` o `[elogio]`— permite al autor del Pull Request entender de inmediato el peso de cada comentario, distinguiendo qué puntos impiden la aprobación y cuáles son simples opiniones o alternativas opcionales.\n\nAsimismo, un buen comentario técnico debe estructurarse siguiendo una regla de tres partes: describir la observación con precisión objetiva, explicar el impacto o riesgo técnico potencial (por ejemplo, 'esto podría provocar una condición de carrera si dos usuarios actualizan en simultáneo') y proponer una solución concreta o ejemplo de código alternativo.\n\nPor último, es fundamental equilibrar la crítica técnica con el reconocimiento explícito: destacar soluciones elegantes, refactorizaciones bien ejecutadas o pruebas exhaustivas refuerza los comportamientos positivos y consolida una cultura técnica orientada a la excelencia compartida.",
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      authorId: user6.id,
      categoryNames: ["Opinión"],
    },
    {
      title: "Logging estructurado con formato JSON en producción",
      content:
        "Generar registros de eventos imprimiendo cadenas de texto plano arbitrarias mediante funciones genéricas como `console.log()` es una práctica inviable en entornos productivos distribuidos. Cuando una aplicación escala a múltiples instancias y procesa miles de peticiones concurrentes, rastrear la causa raíz de un error en un archivo de texto desordenado se convierte en una pesadilla.\n\nEl logging estructurado resuelve este problema emitiendo cada entrada de log como un objeto JSON unificado con un esquema estricto y predecible: marca de tiempo en formato ISO 8601, nivel de severidad (`info`, `warn`, `error`), identificador de servicio, mensaje descriptivo y un bloque de contexto con metadatos específicos del evento.\n\nEl elemento más determinante en una estrategia de logging moderna es el Identificador de Correlación (`correlationId` o `traceId`). Este identificador único se genera en el middleware de entrada al momento en que una petición ingresa al sistema y se propaga a través de todas las llamadas internas, consultas a bases de datos y colas de mensajes asociadas.\n\nAl integrar estos logs estructurados en plataformas de observabilidad como Elasticsearch, Datadog o Grafana Loki, los ingenieros pueden filtrar millones de registros en segundos simplemente buscando por el `correlationId`, reconstruyendo la cronología exacta de una transacción fallida sin ambigüedades.",
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      authorId: user5.id,
      categoryNames: ["DevOps", "Programación"],
    },
    {
      title:
        "Habilidades clave en la transición de desarrollador junior a senior",
      content:
        "La evolución profesional en la ingeniería de software suele medirse inicialmente por el dominio de tecnologías puntuales, la velocidad para escribir código y la capacidad de resolver problemas algorítmicos complejos de forma aislada. Sin embargo, la verdadera transición hacia un rol senior no radica en acumular más frameworks, sino en el impacto multiplicador que se ejerce sobre el equipo y la organización.\n\nUn desarrollador senior se distingue por su capacidad para navegar la ambigüedad y traducir requerimientos de negocio vagos en soluciones técnicas simples, robustas y sostenibles. Comprende que la mejor solución de ingeniería no siempre es la más sofisticada tecnológicamente, y que el código más fácil de mantener es frecuentemente el código que no hubo necesidad de escribir.\n\nLa evaluación de trade-offs es otra marca registrada de la seniority: entender que no existen soluciones perfectas sino compromisos entre costo, tiempo de entrega, escalabilidad y mantenibilidad. Un senior no se enamora de las modas técnicas, sino que elige herramientas en función de las restricciones reales del problema.\n\nFinalmente, las habilidades humanas y pedagógicas resultan determinantes: comunicar conceptos técnicos complejos con claridad frente a partes interesadas de negocio, desbloquear a compañeros mediante mentorías pacientes y constructivas, y fomentar una cultura de colaboración que eleve el estándar de calidad de todo el equipo de ingeniería.",
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
