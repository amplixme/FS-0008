import prisma from "../prisma.client.js"; 

export const categoryService = {
  // Read: Obtener todas las categorías
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { name: "asc" }
    });
  },

  // Read: Obtener una categoría por ID
  async getById(id) {
    return await prisma.category.findUnique({
      where: { id: String(id) }
    });
  },

  // Create: Crear una categoría nueva
  async create(data) {
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug
      }
    });
  },

  // Update: Actualizar una categoría existente
  async update(id, data) {
    return await prisma.category.update({
      where: { id: String(id) },
      data: {
        name: data.name,
        slug: data.slug
      }
    });
  },

  // Delete: Eliminar una categoría (validando si tiene posts asociados)
  async delete(id) {
    const categoryId = String(id);
    
    // Verificamos si la categoría tiene posts asociados
    const categoryWithPosts = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { posts: true }
    });

    if (categoryWithPosts && categoryWithPosts.posts.length > 0) {
      const error = new Error("No se puede eliminar una categoría que tiene posts asociados");
      error.statusCode = 409; // Conflicto
      throw error;
    }

    return await prisma.category.delete({
      where: { id: categoryId }
    });
  }
};