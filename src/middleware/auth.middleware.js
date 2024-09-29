import jwt from 'jsonwebtoken';
import { ErrorWithStatus } from '../error/error-with-status.js';

export const authMiddleware = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    throw new ErrorWithStatus('Authentication required', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ErrorWithStatus('Invalid token', 401);
  }
};