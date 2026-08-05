import prisma from "../prisma.client.js";
export const getPublicProfile = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      bio: true,
      avatarUrl: true,
      createdAt: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          coverImage: true,
          createdAt: true,
          categories: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    posts: user.posts,
    postsCount: user._count.posts,
  };
};

export const updateProfile = async (userId, data) => {
  const { name, bio, avatarUrl } = data;

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      bio,
      avatarUrl,
    },
    select: {
      id: true,
      name: true,
      bio: true,
      avatarUrl: true,
    },
  });
};
