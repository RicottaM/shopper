import { Router } from 'express';
import { categoryController } from './category.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

export const categoryRouter = Router();

categoryRouter.use(authMiddleware);

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/', categoryController.create);
categoryRouter.put('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);
categoryRouter.get('/:categoryId/products', categoryController.getProductsByCategoryId);
