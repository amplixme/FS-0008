import * as postService from '../services/post.service.js';
import { success } from '../utils/response.js';

export const create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    const newPost = await postService.createPost(title, content, authorId);

    return success(res, newPost, 201);
  } catch (error) {
    next(error);
  }
};

// 1. NUEVA FUNCIÓN: Obtener todos los posts (público)
export const getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    const posts = await postService.getAllPosts(category);
    // Respondemos con código 200 (OK) y la lista de posts
    return success(res, posts, 200);
  } catch (error) {
    next(error);
  }
};

// 2. NUEVA FUNCIÓN: Obtener un post específico por su ID (público)
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params; // Sacamos el ID que viene en la URL (ej: /api/posts/5)
    const post = await postService.getPostById(id);

    // CRITERIO DE ACEPTACIÓN: Si el post no existe, devolvemos 404
    if (!post) {
      const error = new Error('El post solicitado no existe');
      error.status = 404;       // Para middlewares que leen .status
      error.statusCode = 404;   // Para middlewares que leen .statusCode
      return next(error);
    }

    // Si existe, respondemos con el post y código 200 (OK)
    return success(res, post, 200);
  } catch (error) {
    next(error);
  }
};

// 3. NUEVA FUNCIÓN: Actualizar un post (Solo autor o ADMIN)
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role; // El middleware de auth debería dejarnos el rol acá

    // 1. Verificamos si el post existe
    const post = await postService.getPostById(id);
    if (!post) {
      const error = new Error('Post no encontrado');
      error.status = 404;
      return next(error);
    }

    // 2. Verificamos si es el dueño o es ADMIN
    if (post.authorId !== userId && userRole !== 'ADMIN') {
      const error = new Error('No tienes permiso para modificar este post');
      error.status = 403;
      return next(error);
    }

    // 3. Si pasó los filtros, lo actualizamos
    const updatedPost = await postService.updatePost(id, title, content);
    return success(res, updatedPost, 200);

  } catch (error) {
    next(error);
  }
};

// 4. NUEVA FUNCIÓN: Eliminar un post (Solo autor o ADMIN)
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // 1. Verificamos si el post existe
    const post = await postService.getPostById(id);
    if (!post) {
      const error = new Error('Post no encontrado');
      error.status = 404;
      return next(error);
    }

    // 2. Verificamos si es el dueño o es ADMIN
    if (post.authorId !== userId && userRole !== 'ADMIN') {
      const error = new Error('No tienes permiso para modificar este post');
      error.status = 403;
      return next(error);
    }

    // 3. Si pasó los filtros, lo eliminamos
    await postService.deletePost(id);
    return success(res, { message: 'Post eliminado con éxito' }, 200);

  } catch (error) {
    next(error);
  }
};

