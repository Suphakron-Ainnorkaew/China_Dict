const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRole) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);
    req.user = decoded;
    if (requiredRole) {
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(decoded.role)) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      } else {
        if (decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      }
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'please login again' });
  }
};

module.exports = authMiddleware;