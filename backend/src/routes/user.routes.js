import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfileSchema } from "../schemas/user.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// GET /api/users/:id - Ruta para mostrar el perfil Público
router.get("/:id", userController.getProfile);

// PUT /api/users/me - Ruta para actualizar el perfil
router.put(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  userController.update,
);

export default router;
