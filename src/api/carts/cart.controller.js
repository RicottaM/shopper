import { cartService } from './cart.service.js';

export const cartController = {
  getAll: async (req, res, next) => {
    try {
      const carts = await cartService.getAll();

      res.json(carts);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const cart = await cartService.getById(id);

      res.json(cart);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const message = await cartService.create(req.body);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      const message = await cartService.update(req.body, id);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;

      const message = await cartService.delete(id);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  getCartSections: async (req, res, next) => {
    try {
        const sections = await cartService.getCartSections();

        res.json(sections);
    } catch (error) {
        next(error);
    }
}
};
