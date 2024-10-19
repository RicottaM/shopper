import { Router } from 'express';
import { unitController } from './unit.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

export const unitRouter = Router();

unitRouter.use(authMiddleware);

unitRouter.get('/', unitController.getAll);
