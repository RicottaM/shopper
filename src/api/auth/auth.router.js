import { Router } from 'express';
import { userController } from '../users/user.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

export const authRouter = Router();

// Authentication routes
authRouter.post('/register', userController.register);
authRouter.post('/login', userController.login);
authRouter.post('/logout', authMiddleware, userController.logout);
