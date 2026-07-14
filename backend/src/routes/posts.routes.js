import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema } from '../schemas/post.schema.js';

const router = Router();

// GET /api/posts - Ruta PÚBLICA para listar todos los posts
router.get('/', postController.getAll);

// GET /api/posts/:id - Ruta PÚBLICA para ver un post específico
router.get('/:id', postController.getById);


// POST /api/posts - Ruta protegida y validada
router.post(
  '/', 
  authMiddleware,               // 1. El middleware verifica el token
  validate(createPostSchema),   // 2. El validate verifica título y contenido
  postController.create         // 3. El controlador guarda el post
);

export default router;