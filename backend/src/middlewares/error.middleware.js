import multer from "multer";
import { error, success } from "../utils/response.js";

function errorHandler(err, req, res, next) {
  console.error(err);

  // Validando errores de Prisma para conflictos
  if (err.code === "P2002") {
    // Violacion de constraint unique
    const field = err.meta?.target?.join(", ") || "campo";
    return error(res, `Ya existe un registro con ese ${field}`, 409);
  }

  // Validando errores de Prisma para recursos no encontrados (404 not found)
  if (err.code === "P2025") {
    return error(res, "Recurso no encontrado", 404);
  }

  // Errores de multer: tipo de archivo invalido o tamano maximo excedido
  if (err instanceof multer.MulterError || err.code === "INVALID_FILE_TYPE") {
    return error(res, err.message, 400);
  }

  // Manejo de errores genéricos
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  return error(res, message, status);
}

export default errorHandler;
