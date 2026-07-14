import * as postService from '../services/post.service.js';
// 1. IMPORTANTE: Importamos el helper success de tus utils
import { success } from '../utils/response.js';

export const create = async (req, res, next) => {
  try {
    // 1. Sacamos los datos que escribió el usuario
    const { title, content } = req.body;

    // 2. LA REGLA DE ORO DE SEGURIDAD: Sacamos el ID del usuario directamente del token
    const authorId = req.user.id;

    // 3. Le pasamos el pedido al post.service.js
    const newPost = await postService.createPost(title, content, authorId);

    // 4. MODIFICADO: Respondemos usando el helper oficial con el código 201
    return success(res, newPost, 201);
  } catch (error) {
    // 5. Si hay algún error, le tiramos el problema al errorHandler
    next(error);
  }
};