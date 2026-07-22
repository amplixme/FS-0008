import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";
import * as uploadController from "../controllers/upload.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("image"),
  uploadController.uploadImage,
);

export default router;
