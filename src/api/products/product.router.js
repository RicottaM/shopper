import { Router } from 'express';
import { productController } from './product.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

export const productRouter = Router();

productRouter.use(authMiddleware);

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', productController.create);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);
productRouter.get('/section/:sectionId', productController.getBySectionId);
productRouter.get('/category/:categoryId', productController.getByCategoryId);
productRouter.get('/:id/unit', productController.getUnit);
