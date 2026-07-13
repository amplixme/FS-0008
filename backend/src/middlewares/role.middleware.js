const requireRole =
  (...roles) =>
  (req, res, next) => {
    // conversion a mayusculas para evitar problemas de comparacion
    const userRole = req.user.role.toUpperCase();
    const allowedRoles = roles.map((role) => role.toUpperCase());

    if (!allowedRoles.includes(userRole)) {
      const roleError = new Error(
        "No tienes permisos para realizar esta acción",
      );
      roleError.status = 403;
      return next(roleError);
    }

    next();
  };

export default requireRole;
