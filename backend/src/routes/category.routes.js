import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js"; 
import { validate } from "../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schema.js";

const router = Router();

// GET /api/categories - Listar todas (Pública, sin autenticación)
router.get("/", categoryController.getAll);

// POST /api/categories - Crear (Protegida: Solo Admin)
router.post("/", authMiddleware, requireRole("ADMIN"), validate(createCategorySchema), categoryController.create);

// PUT /api/categories/:id - Actualizar (Protegida: Solo Admin)
router.put("/:id", authMiddleware, requireRole("ADMIN"), validate(updateCategorySchema), categoryController.update);

// DELETE /api/categories/:id - Eliminar (Protegida: Solo Admin)
router.delete("/:id", authMiddleware, requireRole("ADMIN"), categoryController.delete);

export default router;