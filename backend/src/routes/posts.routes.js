import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema.js';

const router = Router();

// GET /api/posts - Ruta PÚBLICA para listar todos los posts
router.get('/', postController.getAll);

// GET /api/posts/:id - Ruta PÚBLICA para ver un post específico
router.get('/:id', postController.getById);

// POST /api/posts - Ruta protegida y validada
router.post(
  '/', 
  authMiddleware,               
  validate(createPostSchema),   
  postController.create        
);

// PUT /api/posts/:id - Ruta protegida (Actualizar: solo autor o ADMIN)
router.put('/:id', authMiddleware, validate(updatePostSchema), postController.update);

// DELETE /api/posts/:id - Ruta protegida (Eliminar: solo autor o ADMIN)
router.delete('/:id', authMiddleware, postController.remove);

export default router;

