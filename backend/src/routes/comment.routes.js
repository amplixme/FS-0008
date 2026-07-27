import { Router } from "express";
import { createCommentSchema } from "../schemas/comment.schema.js";
import commentController from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/:postId/comments",
  authMiddleware,
  validate(createCommentSchema),
  commentController.create,
);

export default router;
