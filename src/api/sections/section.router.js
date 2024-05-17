import { Router } from 'express';
import { sectionController } from './section.controller.js';

export const sectionRouter = Router();

sectionRouter.get('/', sectionController.getAll);
sectionRouter.get('/:id', sectionController.getById);
sectionRouter.post('/', sectionController.create);
sectionRouter.put('/:id', sectionController.update);
sectionRouter.delete('/:id', sectionController.delete);