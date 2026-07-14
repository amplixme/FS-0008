import prisma from "../prisma.client.js";

export const createPost = async (title, content, authorId) => {
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId, 
    },
    include: {
      author: {
        select: {
          name: true, 
        },
      },
    },
  });

  return newPost;
};

// 1. NUEVA FUNCIÓN: Traer todos los posts
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc', // Criterio de la tarjeta: Los más recientes primero
    },
    include: {
      author: {
        select: {
          name: true, // Criterio de la tarjeta: Incluir datos del autor
        },
      },
    },
  });
  
  return posts;
};

// 2. NUEVA FUNCIÓN: Traer un post por su ID
export const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id), // Prisma pide que el ID sea número
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  
  return post;
};