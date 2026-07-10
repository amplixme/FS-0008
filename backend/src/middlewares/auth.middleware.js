import jwt from 'jsonwebtoken';
import { error } from '../utils/response.js'; // Importamos el helper centralizado

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'No autorizado', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  
    req.user = {
      id: decoded.userId, 
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (err) {
    // Corrección 2: Usar el helper centralizado en lugar de res.status()
    if (err.name === 'TokenExpiredError') {
      return error(res, 'Token expirado', 401);
    }
    return error(res, 'No autorizado', 401);
  }


};