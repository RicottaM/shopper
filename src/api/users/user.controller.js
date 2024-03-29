import { userService } from './user.service.js';

export const userController = {
  getAll: async (req, res) => {
    try {
      const users = await userService.getAll();

      res.json(users);
    } catch (error) {}
  },
};
