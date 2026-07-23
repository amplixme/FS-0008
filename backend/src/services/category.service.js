import prisma from "../prisma.client.js"; 

export const categoryService = {
  
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { name: "asc" }
    });
  },

  
  async getById(id) {
    return await prisma.category.findUnique({
      where: { id: String(id) }
    });
  },

  
  async create(data) {
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug
      }
    });
  },


  async update(id, data) {
    return await prisma.category.update({
      where: { id: String(id) },
      data: {
        name: data.name,
        slug: data.slug
      }
    });
  },


  async delete(id) {
    const categoryId = String(id);
    
  
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