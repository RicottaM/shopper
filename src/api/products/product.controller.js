import {productService} from './product.service.js';

export const productController = {
    getAll: async (req, res, next) => {
        try {
            const products = await productService.getAll();

            res.json(products);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;

            const product = await productService.getById(id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const message = await productService.create(req.body);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await productService.update(req.body, id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;

            const message = await productService.delete(id);

            res.json(message);
        } catch (error) {
            next(error);
        }
    },
    getByCategoryId: async (req, res, next) => {
        try {
            const categoryId = req.params.categoryId;

            const products = await productService.getByCategoryId(categoryId);

            res.json(products);
        } catch (error) {
            next(error);
        }
    },
};
