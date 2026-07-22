import prisma from "../src/prisma.client.js";

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
      update: { slug: category.slug }, // actualiza el slug si la categoria ya existe
      create: {
        name: category.name,
        slug: category.slug,
      },
    });
  }

  console.log("Seed ejecutado: Categorías iniciales creadas con slugs.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
