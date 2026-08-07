import * as adminService from "../services/admin.service.js";
import * as userService from "../services/user.service.js";
import * as postService from "../services/post.service.js";
import commentService from "../services/comment.service.js";
import { success } from "../utils/response.js";

export const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getStats();
    return success(res, stats, 200);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return success(res, users, 200);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await userService.createUser({
      name,
      email,
      password,
      role,
    });
    return success(res, newUser, 201);
  } catch (error) {
    next(error);
  }
};

export const changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const requestingUserId = req.user.id;

    const updatedUser = await userService.changeUserRole(
      id,
      role,
      requestingUserId,
    );
    return success(res, updatedUser, 200);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await userService.updateUser(id, {
      name,
      email,
      role,
    });
    return success(res, updatedUser, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requestingUserId = req.user.id;

    const result = await userService.deleteUser(id, requestingUserId);
    return success(res, result, 200);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.deletePost(id);
    return success(res, { message: "Post eliminado correctamente" }, 200);
  } catch (error) {
    next(error);
  }
};

export const getRecentComments = async (req, res, next) => {
  try {
    const comments = await commentService.getRecentComments();
    return success(res, comments, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    await commentService.deleteComment({ commentId: id, user });
    return success(res, { message: "Comentario eliminado correctamente" }, 200);
  } catch (error) {
    next(error);
  }
};
