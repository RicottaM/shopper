import { Router } from 'express';
import { locationController } from './location.controller.js';

export const locationRouter = Router();

locationRouter.get('/', locationController.getAll);
locationRouter.get('/:id', locationController.getById);
locationRouter.post('/', locationController.create);
locationRouter.put('/:id', locationController.update);
locationRouter.delete('/:id', locationController.delete);
locationRouter.get('/category/:categoryId', locationController.getByCategoryId);
