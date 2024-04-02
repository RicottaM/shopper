import { userService } from './user.service.js';

export const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll();

      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const user = await userService.getById(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const message = await userService.create(req.body);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      const message = await userService.update(req.body, id);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;

      const message = await userService.delete(id);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
};
