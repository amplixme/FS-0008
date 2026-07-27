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

export default { create };
