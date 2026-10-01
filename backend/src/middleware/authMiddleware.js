import { verifyToken } from '../utils/authUtils.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: { message: 'Authentication required. Missing or malformed Bearer token.' },
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid or expired authentication session. Please sign in again.' },
    });
  }

  req.user = decoded;
  next();
};
