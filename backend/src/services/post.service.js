import prisma from "../prisma.client.js";

export const createPost = async (
  title,
  content,
  authorId,
  coverImage,
  categoryIds = [],
) => {
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
        },
      },
    },
  });

  return newPost;
};

export const getAllPosts = async ({
  page = 1,
  limit = 10,
  sort = "newest",
  category: categorySlug,
  search,
}) => {
  const MAX_LIMIT = 40; // limite maximo de posts por pagina (para evitar DoS)

  // Sanitizar y parsear numeros
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(Math.max(1, parseInt(limit, 10) || 10), MAX_LIMIT);
  const skip = (pageNum - 1) * limitNum;

  let where = {};

  if (categorySlug) {
    where = { categories: { some: { slug: categorySlug } } };
  }

  const searchTerm = typeof search === "string" ? search.trim() : "";

  if (searchTerm) {
    where.OR = [
      {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ];
  }

  let orderBy = { createdAt: "desc" }; // Default: sort -> newest

  if (sort === "oldest") {
    orderBy = { createdAt: "asc" };
  }

  if (sort === "comments") {
    orderBy = {
      comments: {
        _count: "desc",
      },
    };
  }

  // Ejecuta la busqueda de posts y el conteo total en paralelo
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limitNum,
      orderBy,
      include: {
        categories: true,
        author: {
          select: { id: true, name: true, avatarUrl: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    // Aplanamos _count.comments (formato de Prisma) a commentCount (lo que espera el frontend)
    posts: posts.map(({ _count, ...post }) => ({
      ...post,
      commentCount: _count.comments,
    })),
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
    },
  };
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
          avatarUrl: true,
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

export const updatePost = async (
  id,
  title,
  content,
  coverImage,
  categoryIds,
) => {
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
