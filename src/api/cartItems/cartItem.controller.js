import {cartItemService} from './cartItem.service.js';

export const cartItemController = {
    getAll: async (req, res, next) => {
        try {
            const products = await cartItemService.getAll();

            res.json(products);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;

            const product = await cartItemService.getById(id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const message = await cartItemService.create(req.body);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await cartItemService.update(req.body, id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await cartItemService.delete(id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
};
