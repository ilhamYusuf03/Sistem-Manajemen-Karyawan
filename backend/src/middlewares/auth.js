const JWTHelper = require('../utils/jwt');
const ApiResponse = require('../utils/response');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.error(res, 'No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = JWTHelper.verifyToken(token);
    
    // Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    return ApiResponse.error(res, 'Invalid or expired token', 401);
  }
};

// Middleware untuk check role admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return ApiResponse.error(res, 'Access denied. Admin only', 403);
  }
  next();
};

module.exports = { authMiddleware, adminOnly };