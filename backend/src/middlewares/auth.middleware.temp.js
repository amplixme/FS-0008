/**
 * TEMPORAL — NO ES EL MIDDLEWARE DE AUTH DEFINITIVO.
 *
 * Implementacion minima para cumplir con el criterio de "incluir el rol en
 * req.user" del ticket FS0008-9, mientras el middleware de auth real
 * (FS0008-8) todavia no esta implementado.
 *
 * Al resolver FS0008-8:
 * 1. Crear src/middlewares/auth.middleware.js con la implementacion definitiva.
 * 2. Reemplazar el import de tempAuthMiddleware por authMiddleware en las rutas.
 * 3. Eliminar este archivo.
 */

import jwt from "jsonwebtoken";

export function tempAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token no proporcionado");
    error.status = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };

    next();
  } catch (err) {
    const error = new Error("Token invalido o expirado");
    error.status = 401;
    throw error;
  }
}