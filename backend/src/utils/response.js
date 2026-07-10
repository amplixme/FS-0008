/**
 * res: Envia una respuesta exitosa con formato consistente
 * data: Datos a devolver en la respuesta
 * status: Codigo de estado HTTP (por defecto 200)
 */
export function success(res, data, status = 200) {
  return res.status(status).json({ data });
}

/**
 * res: Envia una respuesta de error con formato consistente
 * message: Mensaje descriptivo del error
 * status: Codigo de estado HTTP (por defecto 500)
 */
export function error(res, message, status = 500) {
  return res.status(status).json({
    error: {
      message,
      status,
    },
  });
}
