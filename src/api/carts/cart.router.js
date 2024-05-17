import { Router } from 'express';
import { cartController } from './cart.controller.js';

export const cartRouter = Router();

cartRouter.get('/', cartController.getAll);
cartRouter.get('/:id', cartController.getById);
cartRouter.post('/', cartController.create);
cartRouter.put('/:id', cartController.update);
cartRouter.delete('/:id', cartController.delete);
cartRouter.get('/:id/sections', cartController.getCartSections);

