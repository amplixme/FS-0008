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

