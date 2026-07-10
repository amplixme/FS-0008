import authService from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await authService.createUser({ name, email, password });

  return success(res, { message: "Usuario registrado exitosamente" }, 201);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { token, user } = await authService.loginUser({ email, password });

  return success(res, { token, user }, 200);
};

export default { register, login };
