import * as postService from '../services/post.service.js';

export const create = async (req, res, next) => {
  try {
    // 1. Sacamos los datos que escribió el usuario
    const { title, content } = req.body;

    // 2. LA REGLA DE ORO DE SEGURIDAD: Sacamos el ID del usuario directamente del token
    // (el authMiddleware ya lo decodificó y lo dejó guardado en req.user)
    const authorId = req.user.id;

    // 3. Le pasamos el pedido al post.service.js
    const newPost = await postService.createPost(title, content, authorId);

    // 4. Si todo salió bien, respondemos con el post creado y un código 201 (Created)
    res.status(201).json(newPost);
  } catch (error) {
    // 5. Si hay algún error, le tiramos el problema al errorHandler
    next(error);
  }
};