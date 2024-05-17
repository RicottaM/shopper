import { sectionService } from './section.service.js';
import { productService } from '../products/product.service.js';

export const sectionController = {
    getAll: async (req, res, next) => {
        try {
            const categories = await sectionService.getAll();

            res.json(categories);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;

            const category = await sectionService.getById(id);

            res.json(category);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const message = await sectionService.create(req.body);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await sectionService.update(req.body, id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await sectionService.delete(id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
};
