import { Router } from "express";
import authRoutes from "./auth.routes.js";
import postRoutes from "./posts.routes.js";
import uploadRoutes from "./upload.routes.js";
import requireRole from "../middlewares/role.middleware.js";
import categoryRoutes from "./category.routes.js";
import commentRoutes from "./comment.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";

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
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;
