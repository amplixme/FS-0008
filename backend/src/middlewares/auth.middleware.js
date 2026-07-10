import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'No autorizado' } });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajustamos para que coincida con lo que el servicio envía:
    req.user = {
      id: decoded.userId, // <--- Aquí está el ajuste crucial
      email: decoded.email,
      name: decoded.name,
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: { message: 'Token expirado' } });
    }
    return res.status(401).json({ error: { message: 'No autorizado' } });
  }
};