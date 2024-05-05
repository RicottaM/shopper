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
  getProductsByCartId: async (req, res, next) => {
    try {
      const cartId = req.params.cartId;

      const products = await cartService.getProductsByCartId(cartId);

      res.json(products);
    } catch (error) {
      next(error);
    }
  },
  getUsersByCartId: async (req, res, next) => {
    try {
      const cartId = req.params.cartId;

      const users = await cartService.getUsersByCartId(cartId);

      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  deleteCartItems: async (req, res, next) => {
    try {
      const cartId = req.params.cartId;

      const message = await cartService.deleteCartItem(cartId);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  updateCartItems: async (req, res, next) => {
    try {
      const cartId = req.params.cartId;

      const message = await cartService.updateCartItem(req.body, cartId);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const cartItemId = req.params.cartItemId;

      const message = await cartService.deleteCartItem(cartItemId);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  addCartItem: async (req, res, next) => {
    try {
      const cartId = req.params.cartId;

      const message = await cartService.addCartItem(cartId, req.body);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
};
