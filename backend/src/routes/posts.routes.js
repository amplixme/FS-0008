import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta de prueba protegida
router.post('/', authMiddleware, (req, res) => {
    res.json({ message: "Post creado exitosamente", user: req.user });
});

export default router;