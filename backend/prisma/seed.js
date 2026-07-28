import prisma from "../src/prisma.client.js";
import bcrypt from "bcrypt";

async function main() {
  // Limpiar tablas para evitar duplicados en cada ejecución del seed
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();

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
    update: { password: defaultPassword, role: "ADMIN" },
    create: {
      email: "admin@admin.com",
      name: "Admin User",
      password: defaultPassword,
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "user@user.com" },
    update: { password: defaultPassword, role: "USER" },
    create: {
      email: "user@user.com",
      name: "Standard User 1",
      password: defaultPassword,
      role: "USER",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@user.com" },
    update: { password: defaultPassword, role: "USER" },
    create: {
      email: "user2@user.com",
      name: "Standard User 2",
      password: defaultPassword,
      role: "USER",
    },
  });

  // Crear posts
  const post1 = await prisma.post.create({
    data: {
      title: "El futuro de la Programación",
      content:
        "Este post habla sobre las nuevas tendencias en desarrollo de software y cómo prepararse para los próximos años.",
      coverImage: "https://ejemplo.com/imagen1.jpg",
      authorId: admin.id,
      categories: {
        connect: [{ name: "Programación" }, { name: "Tecnología" }],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Mejores prácticas en DevOps",
      content:
        "Automatización y despliegue continuo son la clave para mantener un ciclo de vida de desarrollo saludable.",
      authorId: user1.id,
      categories: {
        connect: [{ name: "DevOps" }],
      },
    },
  });

  // Crear comentarios
  await prisma.comment.create({
    data: {
      content: "Excelente artículo, muy informativo.",
      authorId: user2.id,
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Totalmente de acuerdo con este enfoque.",
      authorId: user1.id,
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Me sirvió mucho para configurar mi CI/CD. ¡Gracias!",
      authorId: user2.id,
      postId: post2.id,
    },
  });

  console.log(
    "Seed ejecutado: Categorías, Usuarios, Posts y Comentarios creados.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
