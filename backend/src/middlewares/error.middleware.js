const { error } = require("../utils/response");

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

	// Manejo de errores genéricos
	const status = err.status || 500;
	const message = err.message || "Error interno del servidor";
	return error(res, message, status);
};

module.exports = errorHandler;
