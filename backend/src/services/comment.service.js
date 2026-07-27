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

export default { createComment };
