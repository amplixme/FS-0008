import { Router } from "express";
import authRoutes from "./auth.routes.js";
import postRoutes from "./posts.routes.js";
import uploadRoutes from "./upload.routes.js";
import requireRole from "../middlewares/role.middleware.js";
import categoryRoutes from "./category.routes.js";
import commentRoutes from "./comment.routes.js";

const router = Router();

// Ruta de Health Check (Criterio de aceptación)
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
// Agregador de rutas principales
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/categories", categoryRoutes);
router.use("/upload", uploadRoutes);
// rutas de comentarios especificadas en criterio (/api/posts/:postId/comments) <- puede ser que se deba cambiar a /api/comments/:postId para normalizar con el resto
router.use("/posts", commentRoutes);

export default router;
