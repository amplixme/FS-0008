export const CATEGORIAS = [
  {
    id: "1",
    name: "Tecnología",
    slug: "tecnologia",
    description:
      "Noticias, tendencias y artículos sobre desarrollo y tecnología.",
  },
  {
    id: "2",
    name: "Programación",
    slug: "programacion",
    description: "Tutoriales, guías y buenas prácticas de código.",
  },
  {
    id: "3",
    name: "Diseño UI/UX",
    slug: "diseno-ui-ux",
    description: "Principios de diseño, experiencia de usuario e interfaces.",
  },
  {
    id: "4",
    name: "Inteligencia Artificial",
    slug: "inteligencia-artificial",
    description: "Avances en IA, Machine Learning y herramientas modernas.",
  },
  {
    id: "5",
    name: "DevOps",
    slug: "devops",
    description: "Despliegue, arquitectura cloud y CI/CD.",
  },
];

export const USER = {
  name: "Alex Rivera",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB62b7yMm1NQoaVoxOLJVYpdgjgjS7ldvZHJ_awq6AzaUJ1Gr_D7HExHtqBdHan9pACW90EZl5G1_8SKAQ7oUN2m7CkbCQGunYi_3tjAwWcwHL4lQRnFuuupJBY2xeWoaE6_mn4UJ8q1jhq9Mlehw31qmBiZRZlJJF2WaXPNOE7jttKozVj3EjvSXL3OXY95A2gGTbuiHBGfmgcwbMhrfrdz4EMyx-He1th5I7xHM3dmJ-eVYzbbCHsvW06f18V3ux0U3Yi3abBKAN8",
  email: "alex@ejemplo.com",
};

export const POSTS = [
  {
    id: "1",
    title: "Introducción a React 19 y sus nuevas funcionalidades",
    slug: "introduccion-a-react-19",
    content:
      "React 19 introduce cambios significativos en el ecosistema del desarrollo web...",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    createdAt: "2026-07-15T10:00:00.000Z",
    author: {
      name: "Alex Dev",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    category: {
      name: "Programación",
      slug: "programacion",
    },
  },
  {
    id: "2",
    title: "Principios clave de UI/UX para desarrolladores Frontend",
    slug: "principios-ui-ux-frontend",
    excerpt:
      "Aprende a diseñar interfaces atractivas y accesibles sin necesidad de ser un experto en diseño.",
    content:
      "La experiencia de usuario es fundamental para el éxito de cualquier aplicación web...",
    coverImage:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
    createdAt: "2026-07-18T14:30:00.000Z",
    author: {
      name: "Maria Ruiz",
      avatar: "https://i.pravatar.cc/150?u=maria",
    },
    category: {
      name: "Diseño UI/UX",
      slug: "diseno-ui-ux",
    },
  },
  {
    id: "3",
    title: "Cómo la IA está transformando el flujo de trabajo en desarrollo",
    slug: "ia-transformando-desarrollo-web",
    excerpt:
      "Análisis sobre herramientas de Inteligencia Artificial generativa y su impacto en la productividad.",
    content:
      "La IA ha dejado de ser una promesa para convertirse en una herramienta cotidiana...",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800",
    createdAt: "2026-07-20T09:15:00.000Z",
    author: {
      name: "Alex Dev",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    category: {
      name: "Inteligencia Artificial",
      slug: "inteligencia-artificial",
    },
  },
  {
    id: "4",
    title: "Configuración de pipelines CI/CD simples con GitHub Actions",
    slug: "configuracion-cicd-github-actions",
    excerpt:
      "Guía paso a paso para automatizar pruebas y despliegues en proyectos Node y React.",
    content:
      "Automatizar la integración y despliegue continuo garantiza código estable en producción...",
    coverImage:
      "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800",
    createdAt: "2026-07-21T11:45:00.000Z",
    author: {
      name: "Carlos Ops",
      avatar: "https://i.pravatar.cc/150?u=carlos",
    },
    category: {
      name: "DevOps",
      slug: "devops",
    },
  },
];
