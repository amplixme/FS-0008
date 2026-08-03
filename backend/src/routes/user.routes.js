import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/users/:id - Ruta para mostrar el perfil Público
router.get("/:id", userController.getPublicProfile);

// PUT /api/users/me - Ruta para actualizar el perfil
router.put(
  "/me",
  authMiddleware,
  userController.updateProfile
);

export default router;
