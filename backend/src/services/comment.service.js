import prisma from "../prisma.client.js";

const createComment = async (commentData) => {
  const { postId, content, authorId } = commentData;

  // Validar si el post existe
  const existingPost = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });
  if (!existingPost) {
    const error = new Error("No existe el post con el ID proporcionado");
    error.status = 404;
    throw error;
  }

  // Crear comentario
  const newComment = await prisma.comment.create({
    data: {
      content,
      postId: Number(postId),
      authorId,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return newComment;
};

// Obtener comentarios
const getCommentsByPost = async (postId) => {
  return await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
};

// GET /api/admin/comments
// Comentarios recientes para el panel de admin (no filtra por post)
const getRecentComments = async (limit = 10) => {
  return await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      author: { select: { id: true, name: true } },
      post: { select: { id: true, title: true } },
    },
  });
};

const updateComment = async (commentData) => {
  const { commentId, content, userId } = commentData;

  // Fetchear comentario
  const comment = await prisma.comment.findUnique({
    where: { id: String(commentId) },
  });

  if (!comment) {
    const error = new Error("Comentario no encontrado.");
    error.status = 404;
    throw error;
  }

  if (comment.authorId !== userId) {
    const error = new Error(
      "No tienes permiso para modificar este comentario.",
    );
    error.status = 403;
    throw error;
  }

  // Actualizar comentario
  return await prisma.comment.update({
    where: { id: String(commentId) },
    data: { content },
  });
};

const deleteComment = async (commentData) => {
  const { commentId, user } = commentData;

  // Fetchear comentario
  const comment = await prisma.comment.findUnique({
    where: { id: String(commentId) },
  });

  if (!comment) {
    const error = new Error("Comentario no encontrado.");
    error.status = 404;
    throw error;
  }

  if (comment.authorId !== user.id && user.role !== "ADMIN") {
    const error = new Error("No tienes permiso para eliminar este comentario.");
    error.status = 403;
    throw error;
  }

  // Eliminar comentario
  return await prisma.comment.delete({
    where: { id: String(commentId) },
  });
};

export default {
  createComment,
  getCommentsByPost,
  getRecentComments,
  updateComment,
  deleteComment,
};
