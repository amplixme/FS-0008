import authService from "../services/auth.service.js";
import { success } from "../utils/response.js";
import commentService from "../services/comment.service.js";

export const create = async (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;
  const authorId = req.user.id;

  const newComment = await commentService.createComment({
    postId,
    content,
    authorId,
  });

  return success(res, newComment, 201);
};

export const update = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  const updatedComment = await commentService.updateComment({
    commentId,
    content,
    userId,
  });

  return success(res, updatedComment, 200);
};

export const remove = async (req, res, next) => {
  const { commentId } = req.params;
  const user = req.user;

  const deletedComment = await commentService.deleteComment({
    commentId,
    user,
  });

  return success(res, { message: "Comentario eliminado correctamente" }, 200);
};

export default { create, update, remove };
