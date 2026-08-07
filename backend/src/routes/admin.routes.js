import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema, changeRoleSchema } from "../schemas/admin.schema.js";

const router = Router();

// Todas las rutas de este módulo requieren estar autenticado y ser ADMIN
router.use(authMiddleware, requireRole("ADMIN"));

// GET /api/admin/stats
router.get("/stats", adminController.getStats);

// GET /api/admin/users
router.get("/users", adminController.getAllUsers);

// POST /api/admin/users
router.post("/users", validate(createUserSchema), adminController.createUser);

// PATCH /api/admin/users/:id/role
router.patch(
  "/users/:id/role",
  validate(changeRoleSchema),
  adminController.changeUserRole,
);

// PATCH /api/admin/users/:id
router.patch(
  "/users/:id",
  validate(updateUserSchema),
  adminController.updateUser,
);

// DELETE /api/admin/users/:id
router.delete("/users/:id", adminController.deleteUser);

// DELETE /api/admin/posts/:id
router.delete("/posts/:id", adminController.deletePost);

// GET /api/admin/comments (adición: alimenta la sección "Comentarios recientes")
router.get("/comments", adminController.getRecentComments);

// DELETE /api/admin/comments/:id
router.delete("/comments/:id", adminController.deleteComment);

export default router;
