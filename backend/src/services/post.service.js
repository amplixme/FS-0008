import prisma from "../prisma.client.js";

export const createPost = async (
  title, 
  content, 
  authorId, 
  coverImage, 
  categoryIds = []) => {
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      coverImage,
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
       categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        }
      },
    },
  });

  return newPost;
};

export const getAllPosts = async (categorySlug) => {
  const where = categorySlug
    ? { categories: { some: { slug: categorySlug } } }
    : undefined;

  const posts = await prisma.post.findMany({
    where,
    orderBy: {
      createdAt: "desc", 
    },
    include: {
      author: {
        select: {
          name: true, 
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return posts;
};

export const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id), 
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return post;
};

export const updatePost = async (id, title, content, coverImage, categoryIds) => {
  const updatedPost = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
      coverImage,
      ...(categoryIds !== undefined && {
        categories: {
          set: categoryIds.map((catId) => ({ id: catId })),
        },
      }),
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return updatedPost;
};

export const deletePost = async (id) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  return deletedPost;
};
