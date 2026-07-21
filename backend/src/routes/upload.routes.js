import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

// Middleware de error (4 parametros): 
// Express lo reconoce como manejador de errores y SOLO se ejecuta si multer llamo a next(err) - archivo con tipo invalido o que supera el limite de tamano. 
// Normalizamos a 400 porque multer no setea "status" por su cuenta (error.middleware.js central caeria al 500 generico sin este paso).

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("image"),
  (err, req, res, next) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    next();
  },
  uploadImage,
);

export default router;
