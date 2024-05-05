import {locationService} from './location.service.js';

export const locationController = {
    getAll: async (req, res, next) => {
        try {
            const products = await locationService.getAll();

            res.json(products);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;

            const product = await locationService.getById(id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const message = await locationService.create(req.body);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await locationService.update(req.body, id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await locationService.delete(id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    getByCategoryId: async (req, res, next) => {
        try {
            const categoryId = req.params.categoryId;

            const products = await locationService.getByCategoryId(categoryId);

            res.json(products);
        } catch (error) {
            next(error);
        }
    },
};
