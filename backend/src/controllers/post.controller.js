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
    const posts = await postService.getAllPosts();
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