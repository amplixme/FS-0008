import { Router } from "express";
import authRoutes from "./auth.routes.js";
import postRoutes from "./posts.routes.js";
import requireRole from "../middlewares/role.middleware.js";

const router = Router();

// Ruta de Health Check (Criterio de aceptación)
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Agregador de rutas principales
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;