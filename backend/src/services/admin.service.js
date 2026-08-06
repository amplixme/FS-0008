import prisma from "../prisma.client.js";

// GET /api/admin/stats
// Se mantiene acá porque es lógica de agregación/orquestación entre varias entidades (user, post, comment, category), no pertenece exclusivamente a ninguna de ellas.
export const getStats = async () => {
  const [totalUsers, totalPosts, totalComments, categoriesWithPostCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.comment.count(),
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          _count: { select: { posts: true } },
        },
        orderBy: { name: "asc" },
      }),
    ]);

  const postsByCategory = categoriesWithPostCount.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    postsCount: category._count.posts,
  }));

  return { totalUsers, totalPosts, totalComments, postsByCategory };
};
