import express from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { success } from "../utils/response.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

// TEMPORAL: ruta de prueba para validar que req.user incluye el rol.
// Remover cuando exista una ruta protegida real que cumpla este proposito.
router.get("/me", authMiddleware, (req, res) => {
  return success(res, { user: req.user });
});

export default router;
