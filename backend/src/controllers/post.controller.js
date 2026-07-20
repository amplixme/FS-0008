import * as postService from "../services/post.service.js";
import { success } from "../utils/response.js";

export const create = async (req, res, next) => {
  try {
    const { title, content, coverImage } = req.body;
    const authorId = req.user.id;

    const newPost = await postService.createPost(
      title,
      content,
      authorId,
      coverImage,
    );

    return success(res, newPost, 201);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los posts (público)
export const getAll = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    return success(res, posts, 200);
  } catch (error) {
    next(error);
  }
};

// Obtener un post específico por su ID (público)
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params; // Sacamos el ID que viene en la URL (ej: /api/posts/5)
    const post = await postService.getPostById(id);

    // Si el post no existe, devolvemos 404
    if (!post) {
      const error = new Error("El post solicitado no existe");
      error.status = 404;
      error.statusCode = 404;
      return next(error);
    }

    // Si existe, respondemos con el post y código 200 (OK)
    return success(res, post, 200);
  } catch (error) {
    next(error);
  }
};

// Actualizar un post (Solo autor o ADMIN)
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, coverImage } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role; // El middleware de auth debería dejarnos el rol acá

    // Verificamos si el post existe
    const post = await postService.getPostById(id);
    if (!post) {
      const error = new Error("Post no encontrado");
      error.status = 404;
      return next(error);
    }

    // Verificamos si es el dueño o es ADMIN
    if (post.authorId !== userId && userRole !== "ADMIN") {
      const error = new Error("No tienes permiso para modificar este post");
      error.status = 403;
      return next(error);
    }

    // Si pasó los filtros, lo actualizamos
    const updatedPost = await postService.updatePost(
      id,
      title,
      content,
      coverImage,
    );
    return success(res, updatedPost, 200);
  } catch (error) {
    next(error);
  }
};

// Eliminar un post (Solo autor o ADMIN)
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Verificamos si el post existe
    const post = await postService.getPostById(id);
    if (!post) {
      const error = new Error("Post no encontrado");
      error.status = 404;
      return next(error);
    }

    // Verificamos si es el dueño o es ADMIN
    if (post.authorId !== userId && userRole !== "ADMIN") {
      const error = new Error("No tienes permiso para modificar este post");
      error.status = 403;
      return next(error);
    }

    // Si pasó los filtros, lo eliminamos
    await postService.deletePost(id);
    return success(res, { message: "Post eliminado con éxito" }, 200);
  } catch (error) {
    next(error);
  }
};
