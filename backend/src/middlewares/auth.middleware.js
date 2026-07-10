import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('No autorizado');
    error.status = 401;
    return next(error); // Pasamos el error al middleware central
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name,
    };
    
    next(); // Si todo está bien, pasamos al controlador normal
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = new Error('Token expirado');
      error.status = 401;
      return next(error); // Pasamos el error de expiración
    }
    
    const error = new Error('No autorizado');
    error.status = 401;
    return next(error); // Pasamos el error general de token inválido
  }
};