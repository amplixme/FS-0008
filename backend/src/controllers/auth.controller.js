import authService from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await authService.createUser({ name, email, password });

  return success(res, { message: "Usuario registrado exitosamente" }, 201);
};
