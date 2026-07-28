import { Router } from "express";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../schemas/comment.schema.js";
import commentController from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// PUT /api/comments/:commentId
router.put(
  "/:commentId",
  authMiddleware,
  validate(updateCommentSchema),
  commentController.update,
);

// DELETE /api/comments/:commentId
router.delete("/:commentId", authMiddleware, commentController.remove);

export default router;
